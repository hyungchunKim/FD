import { CardType } from "./card.d";
import { twMerge } from "tailwind-merge";
import { CardDateFormat } from "@/utils";
import Button from "@/components/atoms/button";
import CareRightWhite from "@/assets/icons/CareRightWhite.svg";
import UnionWhite from "@/assets/icons/UnionWhite.svg";
import Star from "@/assets/icons/Star.svg";
import StarPurple from "@/assets/icons/StarPurple.svg";
import Chip from "@/components/atoms/chips";
import { useRouter } from "next/navigation";

type PropTypes = {
  id?: string;
  status?: "waiting" | "inspecting" | "complete"; //검사전, 검사중, 검사완료
  inspect?: boolean;
  url?: string; //파일 url
  fullName?: string;
  summaryClass?: string;
  isBookmarked: boolean;
  toggleBookmark: (id: string) => void;
} & Pick<
  CardType,
  | "title"
  | "subTitle"
  | "useMenu"
  | "className"
  | "createDate"
  | "summary"
  | "backgroundColor"
>;

const FileCard = ({
  id,
  title,
  url,
  inspect = true,
  className,
  createDate = "",
  summary = "",
  summaryClass = "",
  backgroundColor = "white",
  status,
  isBookmarked,
  toggleBookmark,
}: PropTypes) => {
  const router = useRouter();
  const handleReposPage = (url: string) => {
    const openedFiles = JSON.parse(localStorage.getItem("openedFiles") || "[]");

    const today = new Date().toISOString().split("T")[0];
    const updatedFiles = [...openedFiles, { id, openedDate: today }];

    const uniqueFiles = Array.from(
      new Set(updatedFiles.map((file) => file.id)),
    ).map((id) => updatedFiles.find((file) => file.id === id));

    localStorage.setItem("openedFiles", JSON.stringify(uniqueFiles));

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
                <Button
                  className="w-min bg-inherit"
                  onClick={() => toggleBookmark(id!)}
                >
                  {isBookmarked ? <StarPurple /> : <Star />}
                </Button>
                {isBookmarked}
              </div>
            </div>
            <div
              className={twMerge("caption-xl-medium flex gap-6", "mt-[10px]")}
            >
              {inspect ? (
                <div className={twMerge("text-text-default")}>
                  <Button
                    className="h-10 w-[146.45px]"
                    onClick={() => handleReposPage(url as string)}
                  >
                    <UnionWhite /> 검사하기 <CareRightWhite />
                  </Button>
                </div>
              ) : (
                <div className={twMerge("bg-neutral-100 text-text-default")}>
                  <Button
                    onClick={() => handleReposPage(url as string)}
                    className="gap-[7px]"
                  >
                    <UnionWhite /> 결과보기 <CareRightWhite />
                  </Button>
                </div>
              )}
              {createDate && (
                <div className="flex items-end">
                  {createDate && CardDateFormat(createDate)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FileCard;
