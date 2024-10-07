import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
export type TRepoContentItem = {
  name: string;
  path: string;
  sha: string;
  type: "file" | "dir";
  content?: string;
  download_url: string | null;
  url: string;  // Added url property
  git_url: string;  // Added git_url property
  html_url: string;  // Added html_url property
  size: number;  // Added size property
  status?: "analyzing" | "loading" | "success" | "error";
  isChecked: boolean;
};

type TFetchRepoContentsOptions = {
  token: string;
  owner: string;
  repo: string;
  path?: string;
};

export type Tstatus = "none" | "pending" | "completed" | "error" | "analyzing";

type TSelectedFile = {
  path: string;
  progress: number;
  status: Tstatus;
  repoName: string;
};

type GitContentsStore = {
  repoContents: TRepoContentItem[];
  error: string | null;
  selectedFiles: TSelectedFile[];
  isLoading: boolean;
  fetchRepoContents: (
    options: TFetchRepoContentsOptions,
  ) => Promise<TRepoContentItem[]>;
  fetchFileContent: (url: string) => Promise<string | void>;
  setRepoContents: (contents: TRepoContentItem[]) => void;
  toggleFileSelection: ({
    file,
    repoName,
  }: {
    file: TRepoContentItem;
    repoName: string;
  }) => void;
};

const useGitContentsStore = create(
  subscribeWithSelector<GitContentsStore>((set, get) => ({
    repoContents: [],
    isLoading: false,
    error: null,
    selectedFiles: [],

    setRepoContents: (contents: TRepoContentItem[]) =>
      set({ repoContents: contents }),

    fetchRepoContents: async ({
      token,
      owner,
      repo,
      path = "",
    }: TFetchRepoContentsOptions) => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repository contents");
        }
        console.log("response = ", response);
        const contents = await response.json();

        const updatedContents = contents.map((item: TRepoContentItem) => ({
          ...item,
          status: "none",
          isChecked: false,
        }));

        return updatedContents;
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
        console.error("레포지토리 내용을 불러오는데 실패했습니다.");
      }
    },

    toggleFileSelection: ({
      file,
      repoName,
    }: {
      file: TRepoContentItem;
      repoName: string;
    }) => {
      const { selectedFiles } = get();
      const index = selectedFiles.findIndex((item) => item.path === file.path);
      if (index === -1) {
        set({
          selectedFiles: [
            ...selectedFiles,
            {
              path: file.path,
              status: "none",
              progress: 0,
              repoName,
            },
          ],
        });
      } else {
        set({
          selectedFiles: selectedFiles.filter((_, i) => i !== index),
        });
      }
    },

    fetchFileContent: async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("파일을 불러오는데 실패했습니다.");
        }

        const content = await response.text();

        return content;
      } catch (error) {
        console.error("파일을 불러오는데 실패했습니다.", error);
      }
    },
  })),
);

export default useGitContentsStore;
