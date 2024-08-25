export type TListProps = {
  user?: string;
  id: string;
  foldrName: string;
  fileName: string;
  children?: string;
  type?: "folder" | "file";
  status?: "analyzing" | "loading" | "success" | "error";
  isChecked: boolean;
};
