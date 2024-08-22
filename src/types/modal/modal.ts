export type TModal = {
  titleText: string;
  explanationText: string;
  helpTextText: string;
};

export type TModalList = {
  index: number;
  fileName: string;
  fileSubTitle: string;
  updateDate: string;
  isChecked: boolean;
};

export interface IModalList {
  list: TModalList[];
}
