"use client";

import Button from "@/components/atoms/button";
import { TUserInfo } from "@/types/my-library/vulnerability-analysis";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeCookie } from "@/utils/cookies";

export default function Setting() {
  const router = useRouter();
  const [user, setUser] = useState<TUserInfo>();
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
  const logout = async () => {
    try {
      await auth.signOut();
      removeCookie();
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <>
      <div className="mt-[72px] grid place-items-center">
        <div className="mx-auto flex w-full min-w-[1240px] max-w-[1920px] flex-col items-center justify-center">
          <h2 className="title-xl-regular mb-10 rounded-full border-4 border-primary-500 bg-white px-7 py-2 text-primary-500">
            Setting
          </h2>
        </div>
        <ul className="my-[124px] h-[652px] w-[1314px] gap-20 divide-y divide-gray-200">
          <li className="h-[187px] pb-20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="mr-11 h-[107px] w-[107px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-gray_light">
                {user?.photoUrl && (
                  <Image
                    width={107}
                    height={107}
                    src={user.photoUrl}
                    alt="프로필 이미지"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text- title-md-medium truncate text-text-dark">
                  Hello, <br />
                  {user?.email}
                </p>
              </div>
              <div className="inline-flex items-center">
                <Button
                  variant={"outline"}
                  size={"medium"}
                  rounded={"xs"}
                  color="primary"
                  className="title-xs-regular h-[61px] w-[128px] border-2 border-primary-500 text-primary-500"
                  onClick={logout}
                >
                  로그아웃
                </Button>
              </div>
            </div>
          </li>
          <li className="h-[189px] py-20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="subtitle-md-bold flex-shrink-0">계정 유형</div>
              <div className="min-w-0 flex-1">
                <p className="subtitle-md-regular">깃허브 연동</p>
              </div>
            </div>
          </li>
          <li className="h-[276px] py-20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="subtitle-md-bold min-w-0 flex-1 flex-shrink-0">
                알림
                <p className="subtitle-md-medium mt-[60px] max-h-[140px] overflow-y-auto">
                  이메일로 알림
                </p>
              </div>
              <div className="inline-flex items-center text-base">
                {/* <Switch></Switch> */}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
