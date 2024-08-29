import Button from "@/components/atoms/button";
import LoginMyLibrary from "@/components/pages/my-library/LoginMyLibrary";
import { twJoin, twMerge } from "tailwind-merge";

const isLogin = true;
const MyLibrary = () => {
  return (
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
          <LoginMyLibrary />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="title-xs-regular pb-[22px]">
              깃허브와 연동하여 내 코드 파일을 불러오세요.
            </p>
            <Button
              className="title-sm-regular font-thin"
              rounded="md"
              size="small"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyLibrary;
