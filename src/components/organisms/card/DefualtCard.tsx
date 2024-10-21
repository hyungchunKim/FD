"use client";
import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import { CardDateFormat } from "@/utils/dateUtils";
import PushPin from "@/assets/icons/PushPin.svg";
import Share from "@/assets/icons/Share.svg";
import ShareFat from "@/assets/icons/ShareFat.svg";
import MoreVerti from "@/assets/icons/MoreVeri.svg";
import PinIcon from "@/assets/icons/Pin.svg";
import { useEffect } from "react";
import Link from "next/link";

export type PropTypes = {
  subTitleClass?: string;
  headerClass?: string;
  summaryClass?: string;
  handlePinIconClick?: (id: string) => Promise<void>; // 핀 아이콘 클릭 핸들러 추가
  handleCopyLink?: (id: string) => Promise<void>;
  isPinned: boolean;
  id: string;
  isStackedLocation: boolean;
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
  isPinned = false,
  createDate = "",
  subTitleClass = "",
  headerClass = "",
  summaryClass = "",
  backgroundColor = "white",
  smBackgroundColor = "white",
  handlePinIconClick, // 핀 아이콘 클릭 핸들러 추가
  handleCopyLink,
  id,
  isStackedLocation,
}: PropTypes) => {
  
  useEffect(() => {
    console.log('isPinned : ', isPinned);
  }, [isPinned])
  
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
        <div className="flex h-full w-full flex-col gap-9">
          <Link href={isStackedLocation ? `${id}` : `/vuldb/items/${id}`}>
            <div className={twMerge("h-full w-full", headerClass)}>
              <div className="flex justify-between">
                <div>{chipLabel}</div>
                <div>
                  {useMenu && (
                    <button>
                      <MoreVerti />
                    </button>
                  )}
                </div>
              </div>
              <h2 
                className="subtitle-md-medium text-ellipsis ml-2 text-black leading-[30px] overflow-hidden whitespace-nowrap truncate"
                title={title}
              >
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
          </Link>
          {summary && (
            <p
              className={twMerge(
                "card_summary caption-xs-regular flex-1 text-ellipsis text-text-default",
                summaryClass,
                smBackgroundColor,
              )}
            >
              {summary}
            </p>
          )}
          {(usePinIcon || useNewWindowIcon || useShareIcon || createDate) && (
            <div className="flex justify-between align-bottom">
              <div className="flex gap-4">
                {usePinIcon && (
                  <button 
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 중단
                    if (handlePinIconClick) { // 조건문으로 체크
                      handlePinIconClick(id); // 직접 호출
                    }
                  }}
                  >
                    {isPinned ? <PushPin /> : <PinIcon />}
                  </button>
                )}
                {useNewWindowIcon && (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    if (handleCopyLink) {
                      handleCopyLink(id);
                    }
                  }}>
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
