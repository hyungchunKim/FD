"use client";

import { useState } from "react";
import useGitContentsStore from "@/store/useGitContentsStore";

import ProgressBar from "../progressbar/ProgressBar";
import { twMerge } from "tailwind-merge";
import File from "@/assets/icons/File.svg";
import FolderOpen from "@/assets/icons/FolderOpen.svg";
import Check from "@/assets/icons/Check.svg";

export type TFileItemProps = {
  type: "file" | "dir";
  name: string;
  path: string;
};

const statusStyles = {
  none: { text: null, icon: null },
  analyzing: { text: null, icon: "loader-icon" },
  pending: { text: "대기중..", icon: null },
  completed: { text: null, icon: "check-circle-icon" },
  error: { text: null, icon: "alert-triangle" },
};

export default function ListItem({ type, name, path }: TFileItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedFiles } = useGitContentsStore();

  const fileDetails = selectedFiles.find((file) => file.path === path);
  const isChecked = !!fileDetails;
  const status = fileDetails?.status;

  const statusStyle = status && statusStyles[status];

  return (
    <div
      className={twMerge(
        "hover:bg-background-purpleLight flex flex-col p-[10px]",
        isChecked ? "bg-primary-50" : "bg-white",
      )}
    >
      <div
        className={twMerge("item-center flex justify-between text-base")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex">
          {type === "dir" ? (
            <div className="mr-[2px] h-5 w-5">
              <File />
            </div>
          ) : (
            <div className="mr-[4px] h-6 w-6">{isChecked && <Check />}</div>
          )}
          {type === "file" ? <File /> : <FolderOpen />}
          <span className="text-overflow tracking-tighter">{name}</span>
        </div>
        <div className="flex items-center">
          {!isHovered && statusStyle && (
            <div className="flex">
              {/* {statusStyle.icon && (
                <Image
                  src={`/images/${statusStyle.icon}.svg`}
                  alt={"error"}
                  width={20}
                  height={20}
                  className="ml-[10px]"
                />
              )} */}
              <span
                className={twMerge(
                  status === "pending" &&
                    "ml-[10px] tracking-tighter text-[#969696]",
                )}
              >
                {statusStyle.text}
              </span>
            </div>
          )}
          {/* {type === "file" && <BookmarkButton isHovered={isHovered} />} */}
        </div>
      </div>
      {/* {status === "completed" && <ProgressBar progress={0} />} */}
    </div>
  );
}
