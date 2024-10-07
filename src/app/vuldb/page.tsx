"use client";

import React, { useEffect, useState } from "react";
import Pagenation from "@/components/atoms/pagenation/Pagenation";
import ImageLinkCard from "@/components/organisms/card/ImageLinkCard";
import Chip from "@/components/atoms/chips";
import { ContentCard } from "@/components/organisms/card";
import TopicCarousel from "@/components/organisms/topicCarousel/TopicCarousel";
import { db, updateIsPinnedInFirebase } from "@/libs/firebase/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { CardDateDifference } from "@/utils/dateUtils";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/atoms/modal/AuthModal";

interface ItemsDataProps {
  id: string;
  chipLabel: string | undefined;
  title: string;
  summary: string;
  usePinIcon: boolean;
  useNewWindowIcon: boolean;
  savedTime: string;
  isPinned: boolean;
  isClicked: number;
  url: string;
}

interface HeaderItemsProps {
  id: string;
  title: string;
  savedTime: string;
}

interface TopicCarouselProps {
  id: number;
  name: string;
  link: string;
}

const topics: TopicCarouselProps[] = [
  {
    id: 1,
    name: "Cisoco Talos Blog",
    link: "https://blog.talosintelligence.com",
  },
  {
    id: 2,
    name: "보안 뉴스",
    link: "https://m.boannews.com/html",
  },
  {
    id: 3,
    name: "Microsoft Security",
    link: "https://www.microsoft.com/en-us/security/blog/threat-intelligence/threat-actors",
  },
  {
    id: 4,
    name: "EST Security",
    link: "https://blog.alyac.co.kr/",
  },
  {
    id: 5,
    name: "SmokeScreen",
    link: "https://www.smokescreen.io/blog",
  },
  {
    id: 6,
    name: "Threat Analysis Group",
    link: "https://blog.google/threat-analysis-group",
  },
  {
    id: 7,
    name: "AhnLab (안랩)",
    link: "https://asec.ahnlab.com/ko",
  },
  {
    id: 8,
    name: "S2W",
    link: "https://medium.com/s2wblog",
  },
  {
    id: 9,
    name: "Kaspersky",
    link: "https://www.kaspersky.com/blog",
  },
  {
    id: 10,
    name: "Mandiant",
    link: "https://www.mandiant.kr",
  },
];

const VulDbPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ItemsDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerItems, setHeaderItems] = useState<HeaderItemsProps[]>([]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<ItemsDataProps[]>([]);
  const [filteredPinnedItems, setFilteredPinnedItems] = useState<
    ItemsDataProps[]
  >([]);
  const [pinned, setPinned] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCopyLink = async (id: string): Promise<void> => {
    try {
      console.log("전달된 id", id);
      // id에 맞는 링크를 찾아서 복사
      const copiedLink = items.find((item) => item.id === id)?.url;
      console.log(copiedLink);
      if (!copiedLink) {
        console.error("해당 ID에 해당하는 링크가 없습니다.");
        alert("해당 링크를 찾을 수 없습니다.");
        return;
      }

      if (navigator.clipboard) {
        // 클립보드에 링크 복사
        await navigator.clipboard.writeText(copiedLink);
        console.log("링크 복사 완료:", copiedLink);
        alert("링크가 클립보드에 복사되었습니다!");
      } else {
        throw new Error("클립보드를 사용할 수 없습니다.");
      }
    } catch (error) {
      console.error("링크 복사 실패:", error);
      alert("클립보드 복사에 실패했습니다.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/"); // 로그인되지 않았을 경우 로그인 페이지로 리디렉션
  };

  const handleMouseEnter = (id: string) => {
    setHoveredCardId(id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePinIconClick = async (id: string) => {
    if (isLoggedIn()) {
      setIsAuth(true);
      console.log("isAuth는: ", isAuth);
    } else {
      setIsAuth(false);
      console.log("isAuth는: ", isAuth);
    }

    console.log("pinned 클릭됨");
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, isPinned: !item.isPinned };
        console.log("업데이트된 항목:", updatedItem); // 로그 추가
        return updatedItem;
      }
      return item;
    });

    // Firebase 업데이트
    try {
      const updatedItem = updatedItems.find((item) => item.id === id)!;
      console.log("Firebase에 업데이트할 값 : ", updatedItem);
      await updateIsPinnedInFirebase(id, updatedItem.isPinned);
      setItems(updatedItems);
      setFilteredItems(updatedItems);
    } catch (error) {
      console.error("Error updating state after Firebase update:", error);
    }
  };

  const showPinnedButton = async () => {
    try {
      if (pinned === false) {
        console.log("Pinned 클릭됨");

        const q = query(
          collection(db, "flawdb"), // Firestore 컬렉션 이름으로 변경
          where("isPinned", "==", true), // isPinned가 true인 항목 필터링
          orderBy("savedTime", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const pinnedItems: ItemsDataProps[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as ItemsDataProps[];

        setPinned(true);
        setFilteredPinnedItems(pinnedItems);
        setItems(pinnedItems); // Pin이 활성화되면 필터링된 항목으로 업데이트
      } else {
        setPinned(false);

        const allItemsQuery = query(
          collection(db, "flawdb"),
          orderBy("savedTime", "desc"), // 또는 필요한 다른 정렬 기준
        );

        const allItemsSnapshot = await getDocs(allItemsQuery);
        const allItems: ItemsDataProps[] = allItemsSnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as ItemsDataProps[];

        setFilteredPinnedItems([]); // 초기화
        setItems(allItems); // 모든 항목으로 업데이트
      }
    } catch (error) {
      console.error("Error fetching pinned items:", error);
    }
  };

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch("api/getsummarydata");
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setItems(result.data);
          setFilteredItems(result.data);
          setHeaderItems([result.data[0], result.data[1], result.data[2]]);
          console.log(items);
        } else {
          console.error("Data Fetching Error", result.error);
        }
      } catch (error) {
        console.error("Data Fetching Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredItems(items); // 검색어가 없으면 모든 데이터를 보여줌
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        setIsAuth(false);
        console.log("isAuth는: ", false); // loggedIn이 false일 때
      } else {
        setIsAuth(true);
        console.log("isAuth는: ", true); // loggedIn이 true일 때
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    console.log("isAuth가 변경되었습니다: ", isAuth);
  }, [isAuth]);

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
      <AuthModal isAuth={isAuth} onClose={closeModal}>
        <h2 className="text-lg font-semibold">접근 불가</h2>
        <p className="mt-2">로그인이 필요합니다..!</p>
        <p className="mt-2">창을 닫으면 잠시후 홈화면으로 이동합니다.</p>
        <button
          className="mt-8 cursor-pointer rounded-[10px] bg-purple-600 px-4 py-2 text-white"
          onClick={closeModal}
        >
          닫기
        </button>
      </AuthModal>
      <div className="mx-auto box-border h-[2137px] w-[1313px]">
        <div className="mb-[76px] flex h-[390px] w-full gap-[28px]">
          {headerItems.map((headerItem, idx) => (
            <ImageLinkCard
              key={idx}
              link={`vuldb/items/${headerItem.id}`}
              backgroundImg="/images/dbcardlarge.png"
              title={headerItem.title}
              subTitle={headerItem.savedTime}
              handleMouseEnter={() => handleMouseEnter(headerItem.id)}
              isHovered={hoveredCardId === headerItem.id}
            />
          ))}
        </div>
        <div className="mb-[76px] mt-[76px] h-[82px] w-[1313px] rounded-[14px] border border-primary-500 px-[24px] py-[25px]">
          <div className="flex h-full w-full justify-between">
            <input
              className="subtitle-md-medium h-full w-[1223px] outline-none"
              placeholder="검색어를 입력해주세요."
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <div className="flex h-8 w-8 items-center justify-center">
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.2078 25.2923L19.949 19.0348C21.7631 16.8569 22.6676 14.0635 22.4746 11.2357C22.2815 8.40789 21.0057 5.76337 18.9125 3.85226C16.8193 1.94116 14.0698 0.910614 11.2362 0.975014C8.4025 1.03941 5.70274 2.1938 3.69851 4.19802C1.69429 6.20225 0.539902 8.90201 0.475503 11.7357C0.411103 14.5694 1.44164 17.3188 3.35275 19.412C5.26385 21.5052 7.90838 22.781 10.7362 22.9741C13.564 23.1672 16.3574 22.2626 18.5353 20.4485L24.7928 26.7073C24.8857 26.8002 24.996 26.8739 25.1174 26.9242C25.2388 26.9745 25.3689 27.0004 25.5003 27.0004C25.6317 27.0004 25.7618 26.9745 25.8832 26.9242C26.0046 26.8739 26.1149 26.8002 26.2078 26.7073C26.3007 26.6144 26.3744 26.5041 26.4247 26.3827C26.475 26.2613 26.5008 26.1312 26.5008 25.9998C26.5008 25.8684 26.475 25.7383 26.4247 25.6169C26.3744 25.4955 26.3007 25.3852 26.2078 25.2923ZM2.50029 11.9998C2.50029 10.2198 3.02813 8.47971 4.01706 6.99966C5.00599 5.51962 6.4116 4.36607 8.05613 3.68488C9.70067 3.00369 11.5103 2.82546 13.2561 3.17273C15.0019 3.52 16.6056 4.37716 17.8642 5.63584C19.1229 6.89451 19.9801 8.49816 20.3274 10.244C20.6746 11.9898 20.4964 13.7994 19.8152 15.4439C19.134 17.0885 17.9805 18.4941 16.5004 19.483C15.0204 20.472 13.2803 20.9998 11.5003 20.9998C9.11415 20.9972 6.8265 20.0481 5.13925 18.3608C3.45199 16.6736 2.50293 14.3859 2.50029 11.9998Z"
                  fill="#6100FF"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex h-[1450px] w-[1313px] gap-[102px]">
          <div className="h-[1450px] w-[865px]">
            <div className="subtitle-md-bold mb-4 h-[29px] w-full">
              취약점 DB
            </div>
            <div className="mb-4 flex h-[38px] w-full cursor-pointer justify-start gap-3">
              {pinned ? (
                <Chip
                  text={"All"}
                  color={"bg-primary-300"}
                  className="body-md-bold h-[38px] w-[100px] rounded-full text-white"
                  onClick={showPinnedButton}
                />
              ) : (
                <Chip
                  text={"Pinned"}
                  color={"bg-primary-500"}
                  className="body-md-bold h-[38px] w-[100px] rounded-full text-white"
                  onClick={showPinnedButton}
                />
              )}
            </div>
            <div
              className={`flex h-[1354px] w-full flex-col gap-4 ${isAuth ? "" : "pointer-events-none blur"}`}
            >
              {currentItems.map((currentItem: ItemsDataProps) => (
                <ContentCard
                  className="h-[258px] w-[865px]"
                  title={currentItem.title}
                  summary={currentItem.summary}
                  usePinIcon={currentItem.usePinIcon}
                  useNewWindowIcon={currentItem.useNewWindowIcon}
                  createDate={currentItem.savedTime}
                  smBackgroundColor="primary-light"
                  isPinned={currentItem.isPinned}
                  handlePinIconClick={() => handlePinIconClick(currentItem.id)}
                  handleCopyLink={() => handleCopyLink(currentItem.id)}
                  id={currentItem.id}
                  key={currentItem.id}
                  url={currentItem.url}
                  chipLabel={
                    currentItem.isClicked > 20 ? (
                      <Chip
                        text="HOT"
                        color="bg-accent-red text-white"
                        className="body-md-bold h-[38px] w-[57px] rounded-[999px] text-white"
                      />
                    ) : (CardDateDifference(currentItem.savedTime) as number) <
                      1 ? (
                      <Chip
                        text="New"
                        color="bg-accent-orange text-white"
                        className="body-md-bold h-[38px] w-[57px] rounded-[999px] text-white"
                      />
                    ) : (
                      <Chip
                        text=""
                        color="bg-white text-white"
                        className="body-md-bold h-[38px] w-[4px] rounded-[999px] text-white"
                      />
                    )
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex h-[664px] w-[346px] flex-col gap-[26px]">
            <div className="flex h-[68px] w-full flex-col justify-between">
              <div className="subtitle-md-bold h-[29px] w-full">
                보안 관련 사이트 링크
              </div>
              <div className="subtitle-sm-medium h-[22px] w-full text-primary-500 opacity-60">
                Flaw Detector&#39;s Pick
              </div>
            </div>
            <TopicCarousel topics={topics} />
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
