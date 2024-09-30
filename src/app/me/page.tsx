"use client";
import Button from "@/components/atoms/button";
import LoginMyLibrary from "@/components/pages/my-library/LoginMyLibrary";
import { twJoin, twMerge } from "tailwind-merge";

import "firebase/auth";
import { auth } from "@/libs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";

const MyLibrary = () => {
  const [isLogin, setLogin] = useState(false);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
        setUid(user.uid);
        setEmail(user.email as string);
        setImgUrl(user.photoURL as string);
      } else {
        setLogin(false);
      }
    });
  });

  const handleLoginPage = () => {
    router.push("/login");
  };
  return (
    <>
      <div
        className={twJoin(
          "min-h-full",
          "before:absolute before:left-0 before:z-[-1] before:h-[650px] before:w-full",
          "before:bg-main-bg before:bg-[length:3856px_1134px] before:bg-[center_top] before:bg-no-repeat before:content-['']",
          "before:[mask-image:linear-gradient(#ffffff_70%,#ffffff00_90%)]",
          isLogin ? "" : "h-full",
        )}
      >
        <div
          className={twMerge(
            "flex flex-col items-center justify-center",
            isLogin ? "pb-[124px] pt-12" : "h-full gap-[60px]",
          )}
        >
          <div className="mx-auto flex w-full min-w-[1240px] max-w-[1920px] flex-col items-center justify-center">
            <h2 className="title-xl-regular mb-10 rounded-full border-4 border-primary-500 bg-white px-7 py-2 text-primary-500">
              Profile Information
            </h2>
          </div>
          {isLogin ? (
            <LoginMyLibrary uid={uid} email={email} imgUrl={imgUrl} />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="title-xs-regular pb-[22px]">
                깃허브와 연동하여 내 코드 파일을 불러오세요.
              </p>
              <Button
                className="title-sm-regular font-thin"
                rounded="md"
                size="small"
                onClick={handleLoginPage}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyLibrary;
