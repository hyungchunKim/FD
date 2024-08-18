import Button from "@/components/atoms/button";
//import Switch from "@/components/atoms/switch";

export default function setting() {
  return (
    <>
      <div className="mt-[72px] grid place-items-center">
        <Button
          variant={"outline"}
          color="primary"
          className="h-[79px] w-[233px] rounded-full border-[4px] border-primary-500 text-[40px] font-normal leading-[48.41px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="36"
            height="36"
            className="mr-[12px]"
            fill="#6100FF"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          Setting
        </Button>
        <ul className="my-[124px] h-[652px] w-[1314px] gap-20 divide-y divide-gray-200">
          <li className="h-[187px] pb-20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="mr-11 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="107"
                  height="107"
                >
                  <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[40px] font-medium leading-[48.41px]">
                  Hello, <br />
                  marry@gamil.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold">
                <Button
                  variant={"outline"}
                  rounded={"xs"}
                  size={"medium"}
                  color="primary"
                  className="h-[61px] w-[128px] border-2 border-primary-500 text-5 font-light leading-[29.05px] text-primary-500"
                >
                  로그아웃
                </Button>
              </div>
            </div>
          </li>
          <li className="h-[189px] py-20 text-5 leading-[29.05px]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 font-semibold">계정 유형</div>
              <div className="min-w-0 flex-1">
                <p className="font-normal">깃허브 연동</p>
              </div>
            </div>
          </li>
          <li className="h-[276px] py-20 text-5 leading-[29.05px]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="min-w-0 flex-1 flex-shrink-0 font-semibold">
                알림
                <p className="mt-[60px] truncate font-normal">
                  이메일로 알림 받기
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold">
                {/* <Switch></Switch> */}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
