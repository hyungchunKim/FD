import { TRepoContentItem } from "@/store/useGitContentsStore";

export type TListProps = {
  setCurrentFile: (item: TRepoContentItem) => void;
};
