"use client";

import React, { useState } from "react";
import { TDropdown } from "@/types/dropdown/dropdown";

interface DropdownProps {
  dropdown: TDropdown
}

const Dropdown = ({dropdown}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(dropdown.downMenus);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (index: number) => {
    setIsSelected((prevMenus) =>
      prevMenus.map((menu, idx) =>
        idx === index
          ? { ...menu, isChecked: !menu.isChecked } // 현재 클릭한 메뉴의 상태를 토글함
          : { ...menu, isChecked: false }
      )
    );
  };

  return (
    <div
      className="border border-box border-transparent flex flex-col"
      style={{ width: `${dropdown.dropWidth}px` }}
    >
      <div className="w-full py-[10px] h-[44px] border border-line-default rounded-lg flex items-center">
        <div className="flex justify-center items-center mx-auto gap-1">
          <div className="text-5">{dropdown.dropStandard}</div>
          <div
            className="w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <svg
              width="16.5"
              height="9"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0312 1.53063L9.53122 9.03063C9.46156 9.10036 9.37885 9.15568 9.2878 9.19342C9.19675 9.23116 9.09915 9.25059 9.00059 9.25059C8.90203 9.25059 8.80443 9.23116 8.71339 9.19342C8.62234 9.15568 8.53962 9.10036 8.46997 9.03063L0.969966 1.53063C0.864957 1.42573 0.793432 1.29204 0.764444 1.14648C0.735456 1.00092 0.750309 0.850025 0.807124 0.712907C0.863938 0.57579 0.960159 0.458613 1.0836 0.37621C1.20705 0.293807 1.35217 0.249883 1.50059 0.25H16.5006C16.649 0.249883 16.7941 0.293807 16.9176 0.37621C17.041 0.458613 17.1372 0.57579 17.1941 0.712907C17.2509 0.850025 17.2657 1.00092 17.2367 1.14648C17.2078 1.29204 17.1362 1.42573 17.0312 1.53063Z"
                fill="#343330"
              />
            </svg>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full mt-2 rounded-lg shadow-[0px_2px_16px_0px_rgba(0,0,0,0.25)] cursor-pointer">
          {isSelected.map((downMenu, idx) => (
            <div
              key={idx}
              className={`h-[39px] text-4 text-center bg-white hover:bg-bg-primary_dark leading-[39px] overflow-hidden ${
                idx === 0 ? "rounded-t-lg" : ""
              } ${
                isSelected.length - 1 === idx ? "rounded-b-lg" : ""
              }`}
              onClick={() => handleMenuClick(idx)}
            >
              <div className="flex justify-center items-center mx-auto gap-1">
                {downMenu.isChecked && (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      width="19.51"
                      height="14.25"
                      viewBox="0 0 20 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.2969 2.04597L7.29687 14.046C7.19236 14.1509 7.06816 14.2341 6.93142 14.2909C6.79467 14.3476 6.64806 14.3769 6.5 14.3769C6.35193 14.3769 6.20532 14.3476 6.06858 14.2909C5.93183 14.2341 5.80764 14.1509 5.70312 14.046L0.453123 8.79598C0.348476 8.69133 0.265466 8.56709 0.208831 8.43037C0.152196 8.29364 0.123047 8.14709 0.123047 7.9991C0.123047 7.85111 0.152196 7.70456 0.208831 7.56783C0.265465 7.43111 0.348476 7.30687 0.453123 7.20223C0.55777 7.09758 0.682004 7.01457 0.818733 6.95793C0.955461 6.9013 1.10201 6.87215 1.25 6.87215C1.39799 6.87215 1.54454 6.9013 1.68126 6.95793C1.81799 7.01457 1.94223 7.09758 2.04687 7.20223L6.50094 11.6563L17.705 0.4541C17.9163 0.242755 18.203 0.124023 18.5019 0.124023C18.8008 0.124023 19.0874 0.242755 19.2987 0.4541C19.5101 0.665444 19.6288 0.952089 19.6288 1.25098C19.6288 1.54986 19.5101 1.83651 19.2987 2.04785L19.2969 2.04597Z"
                        fill="#343330"
                      />
                    </svg>
                  </div>
                )}
                {downMenu.menuTitle}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;