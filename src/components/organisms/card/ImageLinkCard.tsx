"use client";

import { twMerge } from "tailwind-merge";
import { CardType } from "./card.d";
import Link from "next/link";

type PropTypes = {
  link: string;
  backgroundImg: string;
  size?: "small" | "large";
} & Pick<CardType, "title" | "subTitle" | "className">;

const ImageLinkCard = ({
  link,
  title,
  subTitle,
  backgroundImg,
  size = "small",
  className = "",
}: PropTypes) => {
  console.log(backgroundImg);
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
          )}
          style={{ backgroundImage: `url('${backgroundImg}'` }}
        >
          <div
            className={twMerge(
              "z-10 flex items-center justify-between text-white",
            )}
          >
            <div>
              <h1
                className={twMerge(
                  "text-white",
                  size === "small" && "subtitle-sm-bold",
                  size === "large" && "title-sm-bold",
                )}
              >
                {title}
              </h1>

              <p
                className={twMerge(
                  "text-text-light",
                  size === "small" && "caption-md-medium",
                  size === "large" && "title-xs-medium",
                )}
              >
                {subTitle}
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ImageLinkCard;
