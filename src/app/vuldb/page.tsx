"use client";

import React, { useEffect, useState } from "react";
import Pagenation from "@/components/atoms/pagenation/Pagenation";
import ImageLinkCard from "@/components/organisms/card/ImageLinkCard";
import Chip from "@/components/atoms/chips";
import { ContentCard } from "@/components/organisms/card";
import Link from "next/link";

interface ItemsDataProps {
  id: string;
  chipLabel: string | undefined;
  title: string;
  summary: string;
  usePinIcon: boolean;
  useNewWindowIcon: boolean;
  savedTime: string;
}

interface HeaderItemsProps {
  id: string;
  title: string;
  savedTime: string;
}

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

const VulDbPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ItemsDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerItems, setHeaderItems] = useState<HeaderItemsProps[]>([]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setHoveredCardId(id);
  }

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch('api/getsummarydata');
        const result = await response.json();
        console.log(result);

        if(response.ok) {          
          setItems(
            result.data.map((item: ItemsDataProps, index: number) => ({
              ...item,
              usePinIcon: true,
              useNewWindowIcon: true,
              chipLabel: index < 10 ? "HOT" : undefined
            }))
          );
          setHeaderItems([...headerItems, result.data[0], result.data[1], result.data[2]])
          console.log(items);
        } else {
          console.error('Data Fetching Error', result.error);
        }
      } catch (error) {
        console.error('Data Fetching Error', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummaryData();

  }, [])

  useEffect (() => {
    console.log(items);
  }, [items])

  useEffect(() => {
    if (headerItems.length > 0) {
      setHoveredCardId(headerItems[0].id);
    }
  }, [headerItems]);

  const totalItems = items.length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mb-[19px] mt-[27px] flex h-[2028px] w-[1313px] flex-col gap-[76px]">
      <div className="mx-auto box-border h-[1916px] w-[1313px]">
        <div className="mb-[76px] flex h-[390px] w-full gap-[28px]">
          {headerItems.map((headerItem, idx) => (
            <ImageLinkCard
              key={idx}
              link=""
              backgroundImg= "/images/dbcardlarge.png"
              title= {headerItem.title}
              subTitle= {headerItem.savedTime}
              handleMouseEnter= {() => handleMouseEnter(headerItem.id)}
              isHovered= {hoveredCardId === headerItem.id}
            />
          ))}
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
              {currentItems.map((currentItem) => (
                <Link href={`vuldb/items/${currentItem.id}`} key={currentItem.id}>
                  <ContentCard
                    className="h-[258px] w-[865px]"
                    title={currentItem.title}
                    summary={currentItem.summary}
                    usePinIcon={currentItem.usePinIcon}
                    useNewWindowIcon={currentItem.useNewWindowIcon}
                    createDate={currentItem.savedTime}
                    smBackgroundColor= "primary-light"
                  />
                </Link>
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
