import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";

const ContentCard = ({
  backgroundColor = "white",
  smBackgroundColor = "white",
  ...props
}: Omit<CardType, "useMemu">) => {
  return (
    <>
      <DefaultCard
        headerClass="flex gap-x-1 flex-wrap items-center "
        subTitleClass="w-full  subtitle-md-regular"
        summaryClass={twMerge(
          "bg-bg-gray_light rounded-[16px] p-[20px] w-[809px] h-[62px] overflow-hidden whitespace-nowrap truncate leading-[4px]",
          smBackgroundColor === "primary-light" && "bg-bg-primary_light",
        )}
        backgroundColor={backgroundColor}
        smBackgroundColor={smBackgroundColor}
        {...props}
      ></DefaultCard>
    </>
  );
};
export default ContentCard;
