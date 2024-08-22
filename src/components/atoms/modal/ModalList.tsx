"use client";
import { TModalList } from "@/types/modal/modal";
import React, { useState } from "react";

export default function ModalList() {
  const [isList, setisList] = useState<TModalList[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <ul className="mb-[10px] h-[220px] w-[590px] divide-gray-200 overflow-y-auto rounded-lg border-[1px] border-[#BCBCBC]">
        {isList.map((list) => (
          <li
            key={list.index}
            className={`${isChecked && "bg-blue-200 hover:bg-blue-200"} h-11 cursor-pointer border-b border-line-default p-[10px] hover:bg-bg-primary_light`}
            onClick={() => {}}
          >
            <div className="over flex items-center space-x-4">
              <div className="flex max-w-[112px] truncate text-2 font-normal leading-[19.36px] text-black">
                <span className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width={20}
                    height={20}
                    className="mr-[10px]"
                  >
                    <path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
                  </svg>
                </span>
                <span className="flex">{list.fileName}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-center text-0 font-normal leading-[14.52px] text-[#9e9e9e]">
                  {list.fileSubTitle}
                </p>
              </div>
              <div className="inline-flex items-center truncate text-center text-0 font-normal leading-[14.52px] text-[#9e9e9e]">
                {list.updateDate}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
