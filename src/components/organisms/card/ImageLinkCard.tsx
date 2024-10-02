"use client";

import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import Link from "next/link";
import ArrowUp from "@/assets/icons/ArrowUp.svg";

type PropTypes = {
  link: string;
  backgroundImg: string;
  handleMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  handleMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  isHovered?: boolean;
} & Pick<CardType, "title" | "subTitle" | "className">;

const ImageLinkCard = ({
  link,
  title,
  subTitle,
  backgroundImg,
  className = "",
  handleMouseEnter,
  isHovered,
}: PropTypes) => {

  return (
    <>
      <Link href={link}>
        <div
          className={twMerge(
            "relative h-full w-full rounded-[20px] p-9",
            "bg-cover bg-center",
            "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-gradient-to-b before:from-white/0 before:to-[#00000070] before:content-['']",
            "flex items-end",
            className,
            isHovered ? "w-[625px] h-[390px]" : "w-[316px] h-[390px]",
            "transition-all duration-300 ease-in-out"
          )}
          style={{ backgroundImage: `url(${backgroundImg}`}}
          onMouseEnter={handleMouseEnter}
        >
          <div
            className={twMerge(
              "z-10 flex w-full justify-between text-white",
              isHovered === false && "gap-[40px]",
              isHovered === true && "gap-[65px]",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div>
              <h1
                className={twMerge(
                  "text-white",
                  isHovered === false && "subtitle-sm-bold w-[136px] h-auto leading-[25.4px]",
                  isHovered === true && "title-sm-bold w-[420px] h-auto leading-[39.2px]",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                {title}
              </h1>

              <p
                className={twMerge(
                  "text-text-light mt-[9px]",
                  isHovered === false && "caption-xl-medium leading-[22.4px]",
                  isHovered === true && "title-xs-medium leading-[28px]",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                {subTitle}
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/70 [&_path]:fill-black">
                <ArrowUp />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ImageLinkCard;
