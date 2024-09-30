// InfoBox.tsx
"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

// 컴포넌트 프롭스 타입 정의
interface InfoBoxProps {
  backgroundClass: string;
  title: string;
  titleClass?: string;
  description: string[];
  positionLink?: {
    text: string;
    class?: string;
  };
  className?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

// 재사용 가능한 버튼 컴포넌트
const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="flex items-center gap-2.5 text-[#D6D6D6]">
    {children}
  </button>
);

// 재사용 가능한 코드 블록 컴포넌트
const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("코드가 복사되었습니다."); // 복사 완료 알림 추가
  };

  return (
    <div className="bg-[#333333] rounded-[10px] overflow-hidden">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-600">
        <span className="text-[#D6D6D6]">{language}</span>
        <Button onClick={copyToClipboard}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          코드복사
        </Button>
      </div>
      <pre className="p-5 text-white overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 메인 InfoBox 컴포넌트
const InfoBox: React.FC<InfoBoxProps> = ({
  backgroundClass,
  title,
  titleClass = "", // 기본값 설정
  description,
  positionLink,
  className = "", // 기본값 설정
  codeSnippet,
}) => {
  const descriptionClass = "relative text-lg tracking-[0.015em] text-text-gray-dark"; // 스타일 상수화

  return (
    <div
      className={twMerge(
        `w-full max-w-[1486px] rounded-xl ${backgroundClass} flex flex-col items-start justify-start p-5 box-border gap-8`,
        className
      )}
    >
      <div className="flex flex-col gap-2.5 w-full">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className={twMerge("text-2xl leading-[140%] font-semibold", titleClass)}>{title}</div>
          {positionLink && (
            <div
              className={twMerge(
                `rounded-2xl border-[2px] border-solid box-border h-[29px] flex flex-col items-center justify-center py-0 px-2 text-base`,
                positionLink.class
              )}
            >
              <div className="relative tracking-[-0.01em] font-semibold">
                {positionLink.text}
              </div>
            </div>
          )}
        </div>
        {description.map((desc, index) => (
          <div key={index} className={descriptionClass}>
            {desc}
          </div>
        ))}
      </div>

      {/* codeSnippet이 존재할 때만 CodeBlock을 렌더링 */}s
      {codeSnippet && (
        <div className="w-full max-w-[687px]">
          <div className="text-2xl font-semibold mb-2.5">수정된 코드</div>
          <CodeBlock language={codeSnippet.language} code={codeSnippet.code} />
        </div>
      )}
    </div>
  );
};

export default InfoBox;