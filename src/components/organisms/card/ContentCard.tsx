import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";

const ContentCard = ({
  backgroundColor = "white",
  ...props
}: Omit<CardType, "useMemu">) => {
  return (
    <>
      <DefaultCard
        headerClass="flex gap-x-1 flex-wrap items-center "
        subTitleClass="w-full  subtitle-md-regular"
        summaryClass={twMerge(
          "bg-bg-gray_light rounded-[16px] p-[10px]",
          backgroundColor === "primary-light" && "bg-white",
        )}
        backgroundColor={backgroundColor}
        {...props}
      ></DefaultCard>
    </>
  );
};
export default ContentCard;
