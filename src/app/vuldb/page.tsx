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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<ItemsDataProps[]>([]);

  const handleMouseEnter = (id: string) => {
    setHoveredCardId(id);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch('api/getsummarydata');
        const result = await response.json();
        console.log(result);

        if(response.ok) {          
          const formattedItems =
            result.data.map((item: ItemsDataProps, index: number) => ({
              ...item,
              usePinIcon: true,
              useNewWindowIcon: true,
              chipLabel: index < 10 ? "HOT" : undefined
            })
          )

          setItems(formattedItems);
          setFilteredItems(formattedItems);
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

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredItems(items); // 검색어가 없으면 모든 데이터를 보여줌
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

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
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mb-[196px] mt-[27px] flex h-[2249px] w-[1313px] flex-col gap-[76px]">
      <div className="mx-auto box-border h-[2137px] w-[1313px]">
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
        <div className="w-[1313px] h-[82px] px-[24px] py-[25px] mb-[76px] mt-[76px] border border-primary-500 rounded-[14px]">
          <div className="w-full h-full flex justify-between">
            <input 
              className="w-[1223px] h-full outline-none subtitle-md-medium" 
              placeholder="검색어를 입력해주세요."
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <div className="w-8 h-8 flex justify-center items-center">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2078 25.2923L19.949 19.0348C21.7631 16.8569 22.6676 14.0635 22.4746 11.2357C22.2815 8.40789 21.0057 5.76337 18.9125 3.85226C16.8193 1.94116 14.0698 0.910614 11.2362 0.975014C8.4025 1.03941 5.70274 2.1938 3.69851 4.19802C1.69429 6.20225 0.539902 8.90201 0.475503 11.7357C0.411103 14.5694 1.44164 17.3188 3.35275 19.412C5.26385 21.5052 7.90838 22.781 10.7362 22.9741C13.564 23.1672 16.3574 22.2626 18.5353 20.4485L24.7928 26.7073C24.8857 26.8002 24.996 26.8739 25.1174 26.9242C25.2388 26.9745 25.3689 27.0004 25.5003 27.0004C25.6317 27.0004 25.7618 26.9745 25.8832 26.9242C26.0046 26.8739 26.1149 26.8002 26.2078 26.7073C26.3007 26.6144 26.3744 26.5041 26.4247 26.3827C26.475 26.2613 26.5008 26.1312 26.5008 25.9998C26.5008 25.8684 26.475 25.7383 26.4247 25.6169C26.3744 25.4955 26.3007 25.3852 26.2078 25.2923ZM2.50029 11.9998C2.50029 10.2198 3.02813 8.47971 4.01706 6.99966C5.00599 5.51962 6.4116 4.36607 8.05613 3.68488C9.70067 3.00369 11.5103 2.82546 13.2561 3.17273C15.0019 3.52 16.6056 4.37716 17.8642 5.63584C19.1229 6.89451 19.9801 8.49816 20.3274 10.244C20.6746 11.9898 20.4964 13.7994 19.8152 15.4439C19.134 17.0885 17.9805 18.4941 16.5004 19.483C15.0204 20.472 13.2803 20.9998 11.5003 20.9998C9.11415 20.9972 6.8265 20.0481 5.13925 18.3608C3.45199 16.6736 2.50293 14.3859 2.50029 11.9998Z" fill="#6100FF"/>
              </svg>
            </div>
          </div>
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
