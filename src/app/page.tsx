import Button from "@/components/atoms/button";

export default function page() {
  return (
    <div className="content-w-full content-px-none">
      <div className="bg-main-bg overflow-hidden bg-[length:3856px_1134px] bg-center">
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1240px] max-w-[1920px] flex-col items-center justify-center text-primary-500">
          <p className="title-xl-regular">Find your Flaw,</p>
          <h2 className="title-xl-regular mb-10 rounded-full border-4 border-primary-500 bg-white px-7 py-2">
            FlawDetector
          </h2>
          <p className="title-xs-regular mb-[100px]">
            인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게
            해결하세요.
          </p>
          <Button className="title-sm-regular px-6 font-thin" rounded="md">
            파일 분석하러 가기
          </Button>
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
          <div className="bg-main-rect-icon relative right-0 flex w-[680px] items-center bg-[length:auto_100%] bg-[center_right_0] bg-no-repeat">
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
      <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] items-center gap-[124px] py-[192px] text-primary-500"></div>

    </div>
  );
};

export default Page;
