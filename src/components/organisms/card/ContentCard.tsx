import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";

interface ContentCardProps extends Omit<CardType, "useMemu"> {
  handlePinIconClick?: (id: string) => Promise<void>; // handlePinIconClick 추가
  handleCopyLink?: (id: string) => Promise<void>;
  url?: string;
  isPinned: boolean;
  id: string;
}

const ContentCard = ({
  backgroundColor = "white",
  smBackgroundColor = "white",
  handlePinIconClick,
  handleCopyLink,
  isPinned,
  id,
  url,
  ...props
}: ContentCardProps) => {
  return (
    <>
      <DefaultCard
        headerClass="flex items-center"
        subTitleClass="w-full  subtitle-md-regular"
        summaryClass={twMerge(
          "bg-bg-gray_light rounded-[16px] p-[20px] w-[809px] h-[62px] overflow-hidden whitespace-nowrap truncate leading-[18px]",
          smBackgroundColor === "primary-light" && "bg-bg-primary_light",
        )}
        backgroundColor={backgroundColor}
        smBackgroundColor={smBackgroundColor}
        handlePinIconClick={handlePinIconClick}
        handleCopyLink={handleCopyLink}
        isPinned={isPinned}
        id={id}
        isStackedLocation={false}
        {...props}
      />
    </>
  );
};

export default ContentCard;
