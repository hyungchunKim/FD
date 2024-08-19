import React from "react";
import { twMerge } from "tailwind-merge";

interface InfoBoxProps {
  backgroundClass: string; // 배경색 클래스
  title: string; // 문제 코드 텍스트
  titleClass: string; // 문제 코드 텍스트 색상 및 기타 스타일 클래스
  description: string; // 설명 텍스트
  positionLinkText?: string; // 위치보기 텍스트 (optional)
  positionLinkClass?: string; // 위치보기 텍스트 색상 및 기타 스타일 클래스 (optional)
  className?: string; // 추가적인 사용자 지정 클래스 (optional)
}

const InfoBox: React.FC<InfoBoxProps> = ({
  backgroundClass,
  title,
  titleClass,
  description,
  positionLinkText,
  positionLinkClass,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `w-[1486px] rounded-xl ${backgroundClass} flex flex-col items-start justify-start p-5 box-border gap-2.5`,
        className
      )}
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <div className={twMerge("relative leading-[140%] font-semibold", titleClass)}>{title}</div>
        {positionLinkText && (
          <div
            className={twMerge(
              `rounded-2xl border-[2px] border-solid box-border h-[29px] flex flex-col items-center justify-center py-0 px-2 text-base`,
              positionLinkClass
            )}
          >
            <div className="relative tracking-[-0.01em] font-semibold">
              {positionLinkText}
            </div>
          </div>
        )}
      </div>
      <div className="relative text-lg tracking-[-0.01em] text-text-gray-dark">
        {description}
      </div>
    </div>
  );
};

export default InfoBox;
