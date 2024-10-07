"use client";
import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
type TContactFormData = {
  name: string;
  email: string;
  message: string;
};
const CustomerCenter = () => {
  const router = useRouter();
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
  return (
    <>
      <div className="border-box mb-[124px] mt-[72px] border border-transparent">
        <div className="mx-auto flex h-[79px] w-[562px] rounded-[999px] border-4 border-primary-500 text-[40px] text-primary-500">
          <div className="mx-auto flex gap-6">
            <div className="flex items-center">
              <svg
                width="14.63"
                height="25.88"
                viewBox="0 0 16 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6939 23.5439C15.0109 23.861 15.189 24.2909 15.189 24.7393C15.189 25.1876 15.0109 25.6176 14.6939 25.9346C14.3769 26.2516 13.9469 26.4297 13.4986 26.4297C13.0503 26.4297 12.6203 26.2516 12.3033 25.9346L1.05328 14.6846C0.895956 14.5278 0.771132 14.3415 0.68596 14.1364C0.600788 13.9313 0.556946 13.7114 0.556946 13.4893C0.556946 13.2672 0.600788 13.0472 0.68596 12.8421C0.771132 12.637 0.895956 12.4507 1.05328 12.2939L12.3033 1.04394C12.6203 0.726926 13.0503 0.548828 13.4986 0.548828C13.9469 0.548828 14.3769 0.726926 14.6939 1.04394C15.0109 1.36096 15.189 1.79093 15.189 2.23925C15.189 2.68758 15.0109 3.11755 14.6939 3.43457L4.64062 13.4878L14.6939 23.5439Z"
                  fill="#6100FF"
                />
              </svg>
            </div>
            <div className="flex items-center">Customer Service center</div>
          </div>
        </div>
        <div className="mx-auto mt-[124px] flex h-[817px] w-[1538px] justify-between">
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
                문의하고 싶은 내용을 구체적으로 작성해주셔야 패드백이 정상적으로
                반영됩니다.
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
        </div>
      </div>
      {isModalOpen && (
        <Modal className="">
          <p className="title-md-bold mb-3 w-[985px]">
            {modalContent.success ? "문의를 보냈어요!" : "오류가 발생했어요!"}
          </p>
          {modalContent.message}
          <Button className="mt-3" onClick={handleHome}>
            홈으로 가기
          </Button>
        </Modal>
      )}
    </>
  );
};

export default CustomerCenter;
