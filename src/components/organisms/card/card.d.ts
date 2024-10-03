import { ChipProps } from "@/components/atoms/chips/index";


export type CardBgColorType = "white" | "primary-light" | "primary-dark";
export type CardIconType = "pin" | "newWindow" | "share";

export type CardType = {
  chipLabel?: ChipProps;
  className?: string;
  useMenu?: boolean;
  menuList?: {
    key: string;
    label: string;
  }[];
  usePinIcon?: boolean;
  useNewWindowIcon?: boolean;
  useShareIcon?: boolean;
  isPinned?: boolean;
  handleClickIcon?: (iconType: CardIconType) => void;
  title?: string;
  subTitle?: string;
  summary?: string;
  createDate?: string;
  shadow?: boolean;
  backgroundColor?: CardBgColorType;
  smBackgroundColor?: CardBgColorType;
};
