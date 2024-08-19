"use client";
import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import { CardDateFormat } from "@/utils";

type PropTypes = {
  children?: React.ReactNode;
  subTitleClass?: string;
} & CardType;

const DefaultCard = ({
  title = "",
  subTitle,
  className,
  chipLabel,
  shadow = false,
  useMenu = false,
  summary = "",
  usePinIcon = false,
  useNewWindowIcon = false,
  useShareIcon = false,
  createDate = "",
  subTitleClass = "",
}: PropTypes) => {
  return (
    <>
      <div
        className={twMerge(
          "h-full w-full p-7",
          "rounded-[8px] border border-line-default",
          "flex flex-col gap-6",
          shadow && "shadow-[0_2px_12px_0_#00000040]",
          className,
        )}
      >
        <div>
          <div className="flex justify-between">
            <div>{chipLabel}</div>
            <div>{useMenu && <>*</>}</div>
          </div>
          <h2 className="subtitle-md-medium line-clamp-2 text-ellipsis text-black">
            {title}
          </h2>
          {subTitle && (
            <div
              className={twMerge(
                "caption-xl-medium text-text-default",
                subTitleClass,
              )}
            >
              {subTitle}
            </div>
          )}
        </div>
        {summary && (
          <p className="title-xs-regular text-ellipsis text-text-default">
            {summary}
          </p>
        )}
        {(usePinIcon || useNewWindowIcon || useShareIcon || createDate) && (
          <div className="flex justify-between">
            <div className="flex gap-4">
              {usePinIcon && "pin"}
              {useNewWindowIcon && "newWindow"}
              {useShareIcon && "shareIcon"}
            </div>
            <div>{createDate && CardDateFormat(createDate)}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default DefaultCard;
