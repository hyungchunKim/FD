import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";

type PropTypes = {
  imgUrl: string;
} & Omit<CardType, "useMemu">;

const InnerImageCard = ({
  imgUrl,
  backgroundColor = "white",
  className,
  ...props
}: PropTypes) => {
  return (
    <>
      {/* @ts-ignore */}
      <div style={{ "--image-url": `url(${imgUrl})` }}>
        <DefaultCard
          subTitleClass="w-full  subtitle-md-regular"
          summaryClass={twMerge(
            "bg-bg-gray_light rounded-[16px] p-[10px]",
            backgroundColor === "primary-light" && "bg-white",
          )}
          backgroundColor={backgroundColor}
          className={twMerge(
            "relative bg-center before:h-full before:w-[320px] before:overflow-hidden before:rounded-[8px] before:bg-[image:var(--image-url)] before:bg-cover before:content-['']",
            "relative grid grid-cols-[auto_1fr] gap-6",
            className,
          )}
          {...props}
        ></DefaultCard>
      </div>
    </>
  );
};
export default InnerImageCard;
