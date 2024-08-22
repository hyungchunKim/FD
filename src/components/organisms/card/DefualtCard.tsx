"use client";
import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import { CardDateFormat } from "@/utils";
import PushPin from "@/assets/icons/PushPin.svg";
import Share from "@/assets/icons/Share.svg";
import ShareFat from "@/assets/icons/ShareFat.svg";
import MoreVerti from "@/assets/icons/MoreVeri.svg";

export type PropTypes = {
  subTitleClass?: string;
  headerClass?: string;
  summaryClass?: string;
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
  headerClass = "",
  summaryClass = "",
  backgroundColor = "white",
}: PropTypes) => {
  return (
    <>
      <div
        className={twMerge(
          "h-full w-full p-7",
          "rounded-[8px] border border-line-default",
          backgroundColor === "primary-light" && "bg-bg-primary_light",
          backgroundColor === "primary-dark" && "bg-bg-primary_dark",
          shadow && "shadow-[0_2px_12px_0_#00000040]",
          className,
        )}
      >
        <div className="flex h-full w-full flex-col gap-6">
          <div className={twMerge("h-full w-full", headerClass)}>
            <div className="card_header-chip flex justify-between">
              <div>{chipLabel}</div>
              <div>
                {useMenu && (
                  <button>
                    <MoreVerti />
                  </button>
                )}
              </div>
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
                <span>{subTitle}</span>
              </div>
            )}
          </div>
          {summary && (
            <p
              className={twMerge(
                "card_summary caption-xs-regular flex-1 text-ellipsis text-text-default",
                summaryClass,
              )}
            >
              {summary}
            </p>
          )}
          {(usePinIcon || useNewWindowIcon || useShareIcon || createDate) && (
            <div className="flex justify-between align-bottom">
              <div className="flex gap-4">
                {usePinIcon && (
                  <button>
                    <PushPin />
                  </button>
                )}
                {useNewWindowIcon && (
                  <button>
                    <Share />
                  </button>
                )}
                {useShareIcon && (
                  <button>
                    <ShareFat />
                  </button>
                )}
              </div>
              <div>{createDate && CardDateFormat(createDate)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DefaultCard;
