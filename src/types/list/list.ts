export type TListProps = {
  user?: string;
  children?: string;
  type?: "folder" | "file";
  status?: "analyzing" | "loading" | "success" | "error";
  isChecked: boolean;
};
