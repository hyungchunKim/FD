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

const DetectedFiles = () => {
  const [user, setUser] = useState<TUserInfo>();
  const { repositories, fetchRepositories } = useGitRepoStore();
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
  }));

  const router = useRouter();
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
              <img width="100%" src={user?.photoUrl} alt="프로필 이미지" />
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
          <Button className="h-[60px] w-[644.5px] gap-[10px] rounded-xl border border-line-light bg-white p-4 text-black">
            <BookmarkFolder /> Bookmark
          </Button>
        </div>
        <MyLibraryList className="mb-[124px]" repos={reposData} />
      </div>
    </>
  );
};
export default DetectedFiles;
