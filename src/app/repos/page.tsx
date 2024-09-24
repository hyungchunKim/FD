"use client";
import Button from "@/components/atoms/button";
import MyLibraryList from "@/components/pages/my-library/MyLibraryList";
import { auth } from "@/libs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CareRight from "@/assets/icons/CareRight.svg";
import RecentsFile from "@/assets/icons/RecentsFile.svg";
import BookmarkFolder from "@/assets/icons/BookmarkFolder.svg";
import { TUserInfo } from "@/types/my-library/vulnerability-analysis";
import useGitRepoStore from "@/store/useGitRepoStore";
import Image from "next/image";
import { isLoggedIn } from "@/utils/auth";

const DetectedFiles = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  const [user, setUser] = useState<TUserInfo>();
  const { repositories, fetchRepositories } = useGitRepoStore();
  const [showBookmarked, setShowBookmarked] = useState(false); // 북마크 필터 상태 관리
  const [bookmarkedRepos, setBookmarkedRepos] = useState<string[]>([]); // 북마크된 파일 id 저장

  useEffect(() => {
    const currentUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid as string,
          displayName: user.displayName as string,
          email: user.email as string,
          photoUrl: user.photoURL as string,
        });
      } else {
        setUser(undefined);
        console.log("No user is logged in.");
      }
    });
    return () => currentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRepositories();
    };

    fetchData();
  }, [fetchRepositories]);

  const reposData = repositories.flatMap((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    created_at: repo.created_at,
    owner: repo.owner.login,
    isBookmarked: bookmarkedRepos.includes(repo.id), // 북마크 여부 추가
  }));

  // 북마크
  const filteredRepos = showBookmarked
    ? reposData.filter((repo) => repo.isBookmarked) // 북마크된 리포지토리만 필터링
    : reposData; // 모든 리포지토리 보여줌

  const handleBookmarked = () => {
    setShowBookmarked((prevState) => !prevState);
  };

  const handleMePage = () => {
    router.push("/me");
  };

  return (
    <>
      <div className="mx-auto w-[1314px] gap-7">
        <div className="mb-12 flex flex-col items-center justify-center text-primary-500">
          <p className="title-xl-regular">containing code files</p>
          <h2 className="title-xl-regular mb-10 rounded-full border-4 border-primary-500 bg-white px-7 py-2">
            MY Library
          </h2>
        </div>
        <Button
          className="mb-7 flex h-[171px] w-full gap-11 rounded-[42px] border-neutral-5 bg-neutral-5 p-8"
          onClick={handleMePage}
        >
          <div>
            <div className="flex h-[107px] w-[107px] items-center justify-center overflow-hidden rounded-full bg-bg-gray_light">
              {user?.photoUrl && (
                <Image
                  width={107}
                  height={107}
                  src={user.photoUrl}
                  alt="프로필 이미지"
                />
              )}
            </div>
          </div>
          <p className="title-md-medium flex-1 text-left text-text-gray-dark">
            Hello,
            <br />
            {user?.email}
          </p>
          <div>
            <CareRight />
          </div>
        </Button>
        <div className="title-xs-medium mb-7 flex h-[60px] w-full gap-[21px]">
          <Button className="h-[60px] w-[644.5px] gap-[10px] rounded-xl border border-line-light bg-white p-4 text-black">
            <RecentsFile /> Recents Files
          </Button>
          <Button
            className="h-[60px] w-[644.5px] gap-[10px] rounded-xl border border-line-light bg-white p-4 text-black"
            onClick={handleBookmarked}
          >
            <BookmarkFolder /> {showBookmarked ? "전체 파일 보기" : "Bookmark"}
          </Button>
        </div>
        <MyLibraryList
          className="mb-[124px]"
          repos={filteredRepos}
          bookmarkedRepos={bookmarkedRepos}
          setBookmarkedRepos={setBookmarkedRepos}
        />
      </div>
    </>
  );
};

export default DetectedFiles;
