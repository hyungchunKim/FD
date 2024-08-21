import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";
import { twMerge } from "tailwind-merge";

type PropTypes = Pick<
  CardType,
  "chipLabel" | "chipProps" | "title" | "subTitle" | "useMenu" | "className"
>;

const FileCard = ({
  chipLabel,
  chipProps,
  title,
  subTitle,
  useMenu,
  className,
}: PropTypes) => {
  return (
    <>
      <DefaultCard
        subTitleClass="mt-[10px]"
        chipLabel={chipLabel}
        chipProps={chipProps}
        title={title}
        subTitle={subTitle}
        useMenu={useMenu}
        className={twMerge("h-[200px]", className)}
        headerClass="grid grid-rows-[auto_1fr_auto] h-full items-end"
      ></DefaultCard>
    </>
  );
};
export default FileCard;
