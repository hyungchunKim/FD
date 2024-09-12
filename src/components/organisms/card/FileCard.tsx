import { CardType } from "./card.d";
import DefaultCard from "./DefualtCard";
import { twMerge } from "tailwind-merge";
import MoreVerti from "@/assets/icons/MoreVeri.svg";
import { CardDateFormat } from "@/utils";
import Button from "@/components/atoms/button";
import CareRightWhite from "@/assets/icons/CareRightWhite.svg";
import UnionWhite from "@/assets/icons/UnionWhite.svg";
import Star from "@/assets/icons/Star.svg";
import Chip from "@/components/atoms/chips";
import { useRouter } from "next/navigation";

type PropTypes = {
  id?: string;
  status?: "waiting" | "inspecting" | "complete"; //검사전, 검사중, 검사완료
  inspect?: boolean;
  url?: string; //파일 url
  fullName?: string;
  summaryClass?: string;
} & Pick<
  CardType,
  | "chipLabel"
  | "chipProps"
  | "title"
  | "subTitle"
  | "useMenu"
  | "className"
  | "createDate"
  | "summary"
  | "backgroundColor"
>;

const FileCard = ({
  chipLabel,
  chipProps,
  title,
  url,
  inspect = true,
  className,
  createDate = "",
  summary = "",
  summaryClass = "",
  backgroundColor = "white",
  status,
}: PropTypes) => {
  const router = useRouter();
  const handleReposPage = (url: string) => {
    router.push(url);
  };
  return (
    <>
      <div
        className={twMerge(
          "h-full w-full p-5",
          "rounded-[8px] border border-line-default hover:bg-background-purple-light",

          backgroundColor === "primary-light" && "bg-bg-primary_light",
          backgroundColor === "primary-dark" && "bg-bg-primary_dark",
          "h-[225px]",
          className,
        )}
      >
        <div className="flex h-full w-full flex-col gap-6">
          <div
            className={twMerge(
              "h-full w-full",
              "grid h-full grid-rows-[auto_1fr_auto] items-end",
            )}
          >
            <div className="flex justify-between">
              <div>
                {status === "waiting" && <></>}
                {status === "inspecting" && (
                  <Chip
                    text="검사중"
                    className="subtitle-sm-medium h-[38px] w-[66px] rounded-full bg-background-gray-light text-text-default"
                  />
                )}
                {status === "complete" && (
                  <Chip
                    text="검사완료"
                    className="subtitle-sm-medium h-[38px] w-[79px] rounded-full bg-primary-50 text-primary-500"
                  />
                )}
              </div>
              <div className="subtitle-md-medium text-ellipsis text-left text-black">
                {title}
              </div>
              <div>
                <Button className="w-min bg-inherit">
                  <Star />
                </Button>
              </div>
            </div>
            {inspect ? (
              <div
                className={twMerge(
                  "caption-xl-medium text-text-default",
                  "mt-[10px]",
                )}
              >
                <Button
                  className="h-10 w-[146.45px]"
                  onClick={() => handleReposPage(url as string)}
                >
                  <UnionWhite /> 검사하기 <CareRightWhite />
                </Button>
              </div>
            ) : (
              <div
                className={twMerge(
                  "caption-xl-medium bg-neutral-100 text-text-default",
                  "mt-[10px]",
                )}
              >
                <Button
                  onClick={() => handleReposPage(url as string)}
                  className="gap-[7px]"
                >
                  <UnionWhite /> 결과보기 <CareRightWhite />
                </Button>
              </div>
            )}
          </div>
          {summary && (
            <p
              className={twMerge(
                "card_summary caption-xs-regular flex-1 text-ellipsis text-text-default",
                summaryClass,
              )}
            >
              {summary}
            </p>
          )}
          {createDate && (
            <div className="flex justify-between align-bottom">
              <div className="flex gap-4"></div>
              <div>{createDate && CardDateFormat(createDate)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FileCard;
