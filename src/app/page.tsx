"use client";

import Button from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase/firebaseConfig";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "@/components/atoms/modal";
import Bug from "@/assets/icons/Bug.png";
import CaretDoubleDown from "@/assets/icons/CaretDoubleDown.svg";
import { twMerge } from "tailwind-merge";
import HomeCard from "@/components/organisms/card/HomeCard";

export default function Page() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
        router.push("/");
      }
    });
  }, [isLogin, router]);

  const handleLoginPage = () => {
    router.push("/login");
  };
  const handleReposPage = () => {
    router.push("/repos");
  };
  //문의하기 관련
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 추가
  const [modalContent, setModalContent] = useState({
    message: "",
    success: false,
  });

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 섹션을 위한 ref 생성
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleHome = () => {
    router.push("/");
    setIsModalOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setModalContent({ message: data.message, success: true });
        setResponseMessage("문의가 성공적으로 전송되었습니다.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setModalContent({ message: data.message, success: false });

        setResponseMessage(`오류 발생: ${data.message}`);
      }
      setIsModalOpen(true);
    } catch (error) {
      setModalContent({
        message: "서버와의 통신 중 오류가 발생했습니다.",
        success: false,
      });
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  // 다음 섹션으로 이동하는 함수
  const handleDown = (index: number) => {
    if (sectionRefs.current[index + 1]) {
      sectionRefs.current[index + 1]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((sectionRef, index) => {
      if (sectionRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible(false); // 3번째 섹션
                setIsCardVisible(false); // 4번째 섹션
              } else {
                setIsVisible(true); // 3번째 섹션
                setIsCardVisible(true); // 4번째 섹션
              }
            });
          },
          { threshold: 0.5 },
        );
        observer.observe(sectionRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const cards = [
    { src: "/homeCard/home_card1.png", alt: "home_card1" },
    { src: "/homeCard/home_card2.png", alt: "home_card2" },
    { src: "/homeCard/home_card3.png", alt: "home_card3" },
    { src: "/homeCard/home_card4.png", alt: "home_card4" },
  ];
  return (
    <div className="content-w-full content-px-none">
      <div
        className="transform overflow-hidden bg-main-bg bg-[length:3856px_1134px] bg-center transition-transform duration-500"
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
      >
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
          <CaretDoubleDown
            className="mt-20 animate-bounce cursor-pointer"
            onClick={() => handleDown(0)}
          />
        </div>
      </div>
      <div
        className="bg-primary-50"
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
      >
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
          <div className="flex items-end">
            <CaretDoubleDown
              className="mb-20 animate-bounce cursor-pointer"
              onClick={() => handleDown(1)}
            />
          </div>
          <div className="relative right-0 flex w-[680px] items-center bg-main-rect-icon bg-[length:auto_100%] bg-[center_right_0] bg-no-repeat">
            <div className="animate-flip flex h-[380px] w-[380px] flex-col items-center justify-center bg-white shadow-[0px_60px_60px_-24px] shadow-primary-500/40">
              <Image src={Bug} alt="Logo Icon" width={191} height={196} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] items-stretch justify-between overflow-hidden px-32 text-primary-500"
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
      >
        <div
          className={twMerge(
            "relative top-[192px] transition-transform duration-700",
            isVisible ? "animate-slide-up" : "opacity-0",
          )}
        >
          <Image
            src="/home_detect_image.png"
            alt="detect sample image"
            width={1920}
            height={136}
          />
        </div>
        <div className="flex items-end">
          <CaretDoubleDown
            className="mb-20 animate-bounce cursor-pointer"
            onClick={() => handleDown(2)}
          />
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
      <div
        className="bg-primary-500"
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
      >
        <div className="mx-auto flex h-[calc(100vh_-_136px)] w-full min-w-[1022px] max-w-[1920px] flex-col items-center gap-[121px] py-[192px] text-primary-500">
          <h1 className="title-xl-bold text-center font-extrabold text-white">
            안전과 보호를 우선으로 하는
            <br />
            프로세스를 제공합니다.
          </h1>
          <div
            className={twMerge(
              "flex h-[700px] justify-between",
              isCardVisible ? "animate-slide-up" : "opacity-0",
            )}
          >
            {cards.map((card, index) => (
              <HomeCard key={index} src={card.src} alt={card.alt} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center">
        <CaretDoubleDown
          className="animate-bounce cursor-pointer"
          onClick={() => handleDown(3)}
        />
      </div>
      <div
        className="mx-auto w-full min-w-[1022px] max-w-[1920px] items-center py-[192px] text-primary-500"
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
      >
        <div className="border-box mt-[72px] border border-transparent">
          <div className="mx-auto mt-[124px] flex w-[1538px] justify-between">
            <div className="flex h-[808px] w-[479px] flex-col justify-between">
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
              <div className="flex h-[181px] w-[280px] flex-col justify-between">
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
                <div className="subtitle-md-bold h-9 w-[128px]">문의하기</div>
                <div className="label-md-medium h-[24px] w-[591px] text-[#8f8f8f]">
                  문의하고 싶은 내용을 구체적으로 작성해주셔야 패드백이
                  정상적으로 반영됩니다.
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-8 flex h-[86px] w-[866px] flex-col justify-between">
                  <div className="subtitle-sm-medium">Name</div>
                  <input
                    className="subtitle-sm-medium h-[51px] w-[866px] rounded-lg border border-line-light indent-3"
                    placeholder="이름을 적어주세요."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-8 flex h-[86px] w-[866px] flex-col justify-between">
                  <div className="subtitle-sm-medium">Email</div>
                  <input
                    className="subtitle-sm-medium h-[51px] w-[866px] rounded-lg border border-line-light indent-3 text-[#c5c5c5]"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-8 flex h-[261px] w-[866px] flex-col justify-between">
                  <div className="subtitle-sm-medium">Message</div>
                  <textarea
                    className="subtitle-sm-medium h-[226px] w-[866px] rounded-lg border border-line-light indent-3 leading-[60px]"
                    placeholder="내용을 적어주세요."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className="h-[53px] w-[866px] rounded-lg bg-primary-500 text-3 font-semibold text-white"
                  type="submit"
                >
                  문의 보내기
                </button>
                {responseMessage && <p>{responseMessage}</p>}
              </form>
            </div>
            {isModalOpen && (
              <Modal className="">
                <p className="title-md-bold mb-3 w-[985px]">
                  {modalContent.success
                    ? "문의를 보냈어요!"
                    : "오류가 발생했어요!"}
                </p>
                {modalContent.message}
                <Button className="mt-3" onClick={handleHome}>
                  홈으로 가기
                </Button>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
