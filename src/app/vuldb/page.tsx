"use client";

import React, { useState } from "react";
import Pagenation from "@/components/atoms/pagenation/Pagenation";
import ImageLinkCard from "@/components/organisms/card/ImageLinkCard";
import Chip from "@/components/atoms/chips";
import { ContentCard } from "@/components/organisms/card";
import { PropTypes } from "@/components/organisms/card/DefualtCard";

const topics = [
  "Topic",
  "웹뷰",
  "허프만 코딩 구현",
  "테스크 커버리지",
  "코드형 인프라(IaC)",
  "클린 아키텍쳐",
  "UI 라이브러리 개발",
  "AWS Personalize",
  "키클락",
  "클린 코어",
];

const issueItems: PropTypes[] = [
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
    summaryClass:
      "caption-xl-regular bg-bg-primary_lingt p-[20px] text-[#797979]",
  },
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
  },
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
  },
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
  },
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
  },
  {
    chipLabel: "chip",
    title: "[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서",
    summary:
      "최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..",
    usePinIcon: true,
    useNewWindowIcon: true,
  },
];

const VulDbPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = issueItems.length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 1;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = issueItems.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mb-[19px] mt-[27px] flex h-[2028px] w-[1313px] flex-col gap-[76px]">
      <div className="mx-auto box-border h-[1916px] w-[1313px]">
        <div className="mb-[76px] flex h-[390px] w-full gap-[28px]">
          <ImageLinkCard
            link={""}
            backgroundImg={"/images/dbcardlarge.png"}
            size="large"
            title="[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서"
            className="h-[390px] w-[625px]"
            subTitle="2024.03.08 13:30:24"
          />
          <ImageLinkCard
            link={""}
            backgroundImg={"/images/dbcardsmall1.png"}
            size="small"
            title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
            className="h-[390px] w-[316px]"
            subTitle="2024.03.08 13:30:24"
          />
          <ImageLinkCard
            link={""}
            backgroundImg={"/images/dbcardsmall2.png"}
            size="small"
            title="[취약성 보고서] CISCO IOS XE 소프트웨어의 보안 취약점에 대한 CNNVD의 보고서"
            className="h-[390px] w-[316px]"
            subTitle="2024.03.08 13:30:24"
          />
        </div>
        <div className="flex h-[1450px] w-[1313px] gap-[102px]">
          <div className="h-[1450px] w-[865px]">
            <div className="subtitle-md-bold mb-4 h-[29px] w-[105px]">
              취약점 DB
            </div>
            <div className="mb-4 flex h-[38px] w-[129px] gap-3">
              <Chip
                text={"HOT"}
                color={"bg-accent-red"}
                className="text-white w-[57px] h-[38px] body-md-bold rounded-[999px]"
              />
              <Chip
                text={"NEW"}
                color={"bg-[#E8E8E8]"}
                className="text-line-dark w-[60px] h-[38px] body-md-bold rounded-[999px]"
              />
            </div>
            <div className="flex h-[1354px] w-full flex-col gap-4">
              {currentItems.map((currentItem, index) => (
                <ContentCard
                  className="h-[258px] w-[865px]"
                  key={index}
                  title={currentItem.title}
                  summary={currentItem.summary}
                  usePinIcon={currentItem.usePinIcon}
                  useNewWindowIcon={currentItem.useNewWindowIcon}
                />
              ))}
            </div>
          </div>
          <div className="flex h-[664px] w-[346px] flex-col gap-[26px]">
            <div className="flex h-[68px] w-[156px] flex-col justify-between">
              <div className="subtitle-md-bold h-[29px] w-[134px]">
                실시간 Topic
              </div>
              <div className="subtitle-sm-medium h-[22px] w-full text-text-gray-defalt">
                03.08 10:00시 기준
              </div>
            </div>
            <div className="flex h-[580px] w-[346px] flex-col items-center justify-center rounded-lg border border-line-default px-5">
              {topics.map((topic, idx) => (
                <div
                  className="subtitle-sm-medium flex h-[54px] w-full items-center border-b border-line-light text-text-gray-dark"
                  key={idx}
                >{`${idx + 1}. ${topic}`}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroupSize={pageGroupSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VulDbPage;
