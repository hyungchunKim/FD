"use client";

import React, { useState } from "react";
import Modal from "@/components/repos/select"; // 방금 짠 Modal 컴포넌트 불러오기

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // 모달에서 보여줄 파일 리스트 예시
  const files = [
    { name: "file name", subtitle: "file sub title", date: "4 months ago" },
    { name: "file name", subtitle: "file sub title", date: "4 months ago" },
    { name: "file name", subtitle: "file sub title", date: "4 months ago" },
    { name: "file name", subtitle: "file sub title", date: "4 months ago" },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    alert("검사하기 버튼이 클릭되었습니다!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      {isModalOpen && (
        <Modal files={files} onCancel={handleCancel} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default Page;
