"use client";

import Button from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase/firebaseConfig";
import { useState } from "react";

export default function Page() {
  
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  // const handleGithubLogin = async () => {
  //   const loginResult = await signInWithGithub();

  //   if (loginResult?.user) {
  //     return loginResult?.user;
  //   } else if (loginResult?.error) {
  //     console.error("Login failed:", loginResult.error);
  //     return false;
  //   }
  // };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogin(true);
      console.log("User is logged in:", user.uid);
    } else {
      setIsLogin(false);
      router.push("/");
      console.log("not login");
    }
  });

  const handleLoginPage = () => {
    router.push("/login");
  };
  const handleReposPage = () => {
    router.push("/repos");
  };
  return (
    <div className="content-w-full content-px-none">
      <div className="overflow-hidden bg-main-bg bg-[length:3856px_1134px] bg-center">
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1240px] max-w-[1920px] flex-col items-center justify-center text-primary-500">
          <p className="title-xl-regular">Find your Flaw,</p>
          <h2 className="title-xl-regular mb-10 rounded-full border-4 border-primary-500 bg-white px-7 py-2">
            FlawDetector
          </h2>
          <p className="title-xs-regular mb-[100px]">
            인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게
            해결하세요.
          </p>
          {isLogin ? (
            <Button
              className="title-sm-regular px-6 font-thin"
              rounded="md"
              onClick={handleReposPage}
            >
              파일 분석하러 가기
            </Button>
          ) : (
            <Button
              className="title-sm-regular px-6 font-thin"
              rounded="md"
              onClick={handleLoginPage}
            >
              로그인
            </Button>
          )}
          <svg
            width="56"
            height="57"
            viewBox="0 0 56 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-20"
          >
            <path
              d="M46.7381 27.2619C46.9008 27.4244 47.0299 27.6174 47.118 27.8299C47.206 28.0423 47.2514 28.27 47.2514 28.5C47.2514 28.73 47.206 28.9577 47.118 29.1701C47.0299 29.3826 46.9008 29.5756 46.7381 29.7381L29.2381 47.2381C29.0756 47.4008 28.8826 47.5299 28.6701 47.618C28.4577 47.706 28.23 47.7514 28 47.7514C27.77 47.7514 27.5423 47.706 27.3299 47.618C27.1174 47.5299 26.9244 47.4008 26.7619 47.2381L9.26187 29.7381C8.9335 29.4098 8.74902 28.9644 8.74902 28.5C8.74902 28.0356 8.9335 27.5902 9.26187 27.2619C9.59024 26.9335 10.0356 26.749 10.5 26.749C10.9644 26.749 11.4098 26.9335 11.7381 27.2619L28 43.5259L44.2619 27.2619C44.4244 27.0992 44.6174 26.9701 44.8298 26.882C45.0423 26.7939 45.27 26.7486 45.5 26.7486C45.73 26.7486 45.9577 26.7939 46.1701 26.882C46.3826 26.9701 46.5756 27.0992 46.7381 27.2619ZM26.7619 29.7381C26.9244 29.9008 27.1174 30.0299 27.3299 30.118C27.5423 30.206 27.77 30.2514 28 30.2514C28.23 30.2514 28.4577 30.206 28.6701 30.118C28.8826 30.0299 29.0756 29.9008 29.2381 29.7381L46.7381 12.2381C47.0665 11.9098 47.251 11.4644 47.251 11C47.251 10.5356 47.0665 10.0902 46.7381 9.76187C46.4098 9.4335 45.9644 9.24902 45.5 9.24902C45.0356 9.24902 44.5902 9.4335 44.2619 9.76187L28 26.0259L11.7381 9.76187C11.4098 9.4335 10.9644 9.24902 10.5 9.24902C10.0356 9.24902 9.59024 9.4335 9.26187 9.76187C8.9335 10.0902 8.74902 10.5356 8.74902 11C8.74902 11.4644 8.9335 11.9098 9.26187 12.2381L26.7619 29.7381Z"
              fill="#6100FF"
            />
          </svg>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] items-stretch justify-between pl-32 text-primary-500">
          <div className="flex flex-col justify-center">
            <h1 className="title-xl-bold mb-10 font-extrabold">
              쉽고 편하게 <br /> 취약점을 발견하다
            </h1>
            <h3 className="title-md-bold mb-8 font-extrabold text-text-dark">
              코드 보안
              <br />
              어떻게 관리하시나요?
            </h3>
            <p className="title-xs-bold text-text-default">
              플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로,
              <br />
              코드의 보안 취약점을 사전에 수정함으로써
              <br />
              개발자들에게 편의와 안전한 개발 환경을 제공합니다.
            </p>
          </div>
          <div className="relative right-0 flex w-[680px] items-center bg-main-rect-icon bg-[length:auto_100%] bg-[center_right_0] bg-no-repeat">
            <div className="flex h-[380px] w-[380px] flex-col justify-center bg-white shadow-[0px_60px_60px_-24px] shadow-primary-500/40"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] items-stretch justify-between overflow-hidden px-32 text-primary-500">
        <div className="relative top-[192px]">
          <img src="/home_detect_image.png" alt="detect sample image" />
        </div>
        <div className="flex flex-col justify-center text-right">
          <h1 className="title-md-bold mb-8 font-extrabold">
            최신 보안 동향을
            <br />
            실시간으로 확인하세요.
          </h1>
          <p className="title-xs-bold text-text-default">
            실시간으로 최신 보안 동향을 제공하여
            <br />
            개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
            <br />
            보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="bg-primary-500">
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] flex-col items-center gap-[121px] py-[192px] text-primary-500">
          <h1 className="title-xl-bold text-center font-extrabold text-white">
            안전과 보호를 우선으로 하는
            <br />
            프로세스를 제공합니다.
          </h1>
          <img
            src="/home_service_card.png"
            width={1920}
            alt="flaw service image"
          />
        </div>
      </div>
      <div className="mx-auto w-full min-w-[1022px] max-w-[1920px] items-center py-[192px] text-primary-500">
        <div className="border-box mt-[72px] border border-transparent">
          <div className="mx-auto mt-[124px] flex w-[1538px] justify-between">
            <div className="flex h-[808px] w-[429px] flex-col justify-between">
              <div>
                <div className="title-xl-bold h-[180px] w-full text-primary-500">
                  서비스이용에
                  <br />
                  문제가 생겼나요?
                </div>
                <div className="title-xs-medium mt-[30px] h-[56px] w-full text-text-default">
                  이용하면서 문제가 생겼다면 언제든지 문의해주세요.
                  <br />
                  서비스 개발과 성장에 큰 도움이 됩니다.
                </div>
              </div>
              <div className="flex h-[181px] w-[260px] flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="title-xs-medium h-[30px] w-full">Email</div>
                  <div className="subtitle-sm-regular h-[27px] w-full text-text-default">
                    justin@floatfactory.kr
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="title-xs-medium h-[30px] w-full">Address</div>
                  <div className="subtitle-sm-regular h-[27px] w-full text-text-default">
                    서울 강서구 마곡중앙2로 11 305호
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[817px] w-[985px] flex-col items-center rounded-[40px] border border-primary-500">
              <div className="mb-8 mt-[60px] flex h-[83px] w-[866px] flex-col justify-between">
                <div className="subtitle-md-bold h-9 w-[88px]">문의하기</div>
                <div className="label-md-medium h-[24px] w-[524px] text-[#8f8f8f]">
                  문의하고 싶은 내용을 구체적으로 작성해주셔야 패드백이
                  정상적으로 반영됩니다.
                </div>
              </div>
              <div className="mb-8 flex h-[86px] w-[866px] flex-col justify-between">
                <div className="subtitle-sm-medium">Name</div>
                <input
                  className="subtitle-sm-medium h-[51px] w-[866px] rounded-lg border border-line-light indent-3"
                  placeholder="이름을 적어주세요."
                />
              </div>
              <div className="mb-8 flex h-[86px] w-[866px] flex-col justify-between">
                <div className="subtitle-sm-medium">Email</div>
                <input
                  className="subtitle-sm-medium h-[51px] w-[866px] rounded-lg border border-line-light indent-3 text-[#c5c5c5]"
                  value="justin@factory.kr"
                  disabled
                />
              </div>
              <div className="mb-8 flex h-[261px] w-[866px] flex-col justify-between">
                <div className="subtitle-sm-medium">Message</div>
                <textarea
                  className="subtitle-sm-medium h-[226px] w-[866px] rounded-lg border border-line-light indent-3 leading-[60px]"
                  placeholder="내용을 적어주세요."
                />
              </div>
              <button className="h-[53px] w-[866px] rounded-lg bg-primary-500 text-3 font-semibold text-white">
                문의 보내기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
