"use client";

import { FileCard } from "@/components/organisms/card";
import Dropdown from "@/components/atoms/dropdown/Dropdown";
import { auth } from "@/libs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const FILTER_DROPDOWN = {
  dropStandard: "Type",
  dropWidth: 89,
  downMenus: [
    {
      menuTitle: "",
      isChecked: false,
    },
  ],
  isToggle: false,
};

const SORT_DROPDOWN = {
  dropStandard: "Sort",
  dropWidth: 89,
  downMenus: [
    {
      menuTitle: "",
      isChecked: false,
    },
  ],
  isToggle: false,
};

type TRepository = {
  id?: string;
  name?: string;
  description?: string;
  owner?: string;
  isBookmarked?: boolean;
  created_at?: string;
  uid?: string;
  email?: string;
  photoURL?: string;
};
type TLibraryFiles = {
  repos: TRepository[];
  bookmarkedRepos: string[]; // 북마크된 파일 목록
  setBookmarkedRepos: (repos: string[]) => void; // 북마크 상태 업데이트 함수
};
type TProps = {
  title?: string;
  useCardMenu?: boolean;
  className?: string;
};
export type PropTypes = TProps & TLibraryFiles & TRepository;

const MyLibraryList = ({
  useCardMenu = true,
  className,
  repos,
  bookmarkedRepos,
  setBookmarkedRepos,
}: PropTypes) => {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setEmail(user.email as string);
        setImgUrl(user.photoURL as string);
      } else {
        console.log("No user is logged in.");
      }
    });
  }, []);

  // 북마크 토글 함수
  const toggleBookmark = (repoId: string) => {
    setBookmarkedRepos(
      bookmarkedRepos.includes(repoId)
        ? bookmarkedRepos.filter((id) => id !== repoId) // 북마크 해제
        : [...bookmarkedRepos, repoId], // 북마크 추가
    );
  };

  return (
    <>
      <div className={className}>
        <div className="mb-12 flex justify-between">
          <h1 className="title-md-medium text-text-gray-dark"></h1>
          <div className="flex gap-5">
            <Dropdown dropdown={FILTER_DROPDOWN} />
            <Dropdown dropdown={SORT_DROPDOWN} />
          </div>
        </div>
        <div className="relative grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
          {repos.map((repo) => (
            <FileCard
              key={repo.id}
              id={repo.id}
              title={repo.name}
              useMenu={useCardMenu}
              url={`/repos/${repo.owner}/${repo.name}`}
              fullName={repo.name}
              isBookmarked={repo.isBookmarked!}
              toggleBookmark={toggleBookmark}
              className="h-[225px] w-[310px] border-primary-100"
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default MyLibraryList;
