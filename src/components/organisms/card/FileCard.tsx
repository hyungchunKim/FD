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
        className={twMerge(
          "[& h2]:flex-1 [&>div]:grid [&>div]:h-full [&>div]:grid-rows-[auto_1fr_auto] [&>div]:items-end",
          className,
        )}
      ></DefaultCard>
    </>
  );
};
export default FileCard;
