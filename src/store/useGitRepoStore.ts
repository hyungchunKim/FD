import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type TRepository = {
  id: string;
  name: string;
  description: string;
  owner: { login: string };
  isBookmarked?: boolean;
  created_at: string;
};

type TRepoStore = {
  repositories: TRepository[];
  isLoading: boolean;
  error: string | null;
  gitToken: string | null;
  setGitToken: (token: string) => void;
  fetchRepositories: () => Promise<void>;
  toggleBookmark: (repoId: string) => void;
};

const useGitRepoStore = create(
  persist(
    subscribeWithSelector<TRepoStore>((set, get) => ({
      repositories: [],
      isLoading: false,
      error: null,
      gitToken: null,

      setGitToken: (token: string) => set({ gitToken: token }),

      fetchRepositories: async () => {
        set({ isLoading: true, error: null });

        try {
          const gitToken = get().gitToken;

          if (!gitToken) {
            throw new Error("Git token is not available");
          }
          const response = await fetch(
            "https://api.github.com/user/repos?visibility=public",
            {
              headers: {
                Authorization: `token ${gitToken}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch repos");
          }

          const repositories = await response.json();

          set({ repositories, isLoading: false });
          console.log("레포지토리 데이터를 불러오는데 성공했습니다.");
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          console.error("레포지토리 데이터를 불러오는데 실패했습니다.");
        }
      },

      toggleBookmark: (repoId: string) => {
        set((state) => ({
          repositories: state.repositories.map((repo) =>
            repo.id === repoId
              ? { ...repo, isLiked: !repo.isBookmarked }
              : repo,
          ),
        }));
      },
    })),
    {
      name: "git-repo-store",
      partialize: (state) => ({ gitToken: state.gitToken }),
    },
  ),
);

export default useGitRepoStore;
