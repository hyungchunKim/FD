type CardIconType = "pin" | "newWindow" | "share";

export type CardType = {
  chipLabel?: string;
  chipProps?: {
    chipType?: string;
    chipColor?: string;
  };
  className?: string;
  useMenu?: boolean;
  menuList?: {
    key: string;
    label: string;
  }[];
  usePinIcon?: boolean;
  useNewWindowIcon?: boolean;
  useShareIcon?: boolean;
  handleClickIcon?: (iconType: CardIconType) => void;
  title?: string;
  subTitle?: string;
  summary?: string;
  createDate?: string;
  shadow?: boolean;
};
