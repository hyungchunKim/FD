"use client";
import React from "react";
import { GithubAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import "firebase/auth";
import Button from "@/components/atoms/button";
import { useAuth } from "@/components/pages/layout/Login";

const LoginPage = () => {
  const router = useRouter();

  // Create a GitHub Auth provider instance
  const githubProvider = new GithubAuthProvider();

  //github로그인
  const { handleLogin } = useAuth();

  //github새탭
  const handleOpenNewTab = () => {
    window.open("https://github.com/", "_blank");
  };
  return (
    <div className="content-w-full content-px-none">
      <div className="overflow-hidden bg-main-bg bg-[length:3856px_1134px] bg-center">
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-[1423px] items-center justify-between gap-3 text-primary-500">
          <div className="title-xl-regular flex flex-col items-center justify-center">
            Find your Flaw
            <h2 className="title-xl-regular mb-10 w-[240px] rounded-full border-4 border-primary-500 bg-white px-7 py-2 text-center">
              Login
            </h2>
          </div>
          <Button
            className="title-sm-regular px-6 font-thin"
            rounded="md"
            onClick={handleLogin}
          >
            Github로 연동 로그인 하기
          </Button>
          <Button
            className="title-sm-regular px-6 font-thin"
            rounded="md"
            onClick={handleOpenNewTab}
          >
            Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
