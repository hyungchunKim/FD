"use client";
import { cva, VariantProps } from "class-variance-authority";
import { TListProps } from "@/types/list/list";
import { useState } from "react";
//<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->

export default function List({ type, status, user, children }: TListProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isclickedListId, setIsclickedListId] = useState(String);
  let clickedListId = "";
  const repositoryList: TListProps[] = Array.from(
    {
      length: 12,
    },
    (_, i) => ({
      id: `id_${i + 1}`,
      foldrName: `Folder ${i + 1}`,
      fileName: `file ${i + 1}`,
      status: "label",
      type: "file",
      isChecked: "false",
    }),
  );
  const selectIconVisible = (checked: boolean, id: string) => {
    setIsChecked(checked);
    setIsclickedListId(id);
  };

  return (
    <div className="relative flex items-center justify-center overflow-y-auto">
      <ul className="h-[994px] w-[247px] text-ellipsis rounded-xl border border-line-default bg-white text-2 font-normal leading-[19.36px] text-text-dark">
        {/* list header*/}
        <li className="group flex w-full items-center rounded-t-lg border-b border-line-default bg-primary-50 px-5 py-5 text-4 font-normal leading-[24.2px] text-black transition-all">
          <div className="mr-[10px] grid place-items-center">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              width="30"
              height="30"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
          <span className="overflow-hidden text-ellipsis">{user}</span>

          <div className="ml-auto grid place-items-center justify-self-end">
            <div className="relative grid select-none items-center px-2 py-1">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-[20px] w-[20px]"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
              </span>
            </div>
          </div>
        </li>
        {/* list*/}
        {repositoryList.map((list) => (
          <>
            <li
              className={`h-[44px] cursor-pointer border-b border-line-light p-[10px] hover:bg-bg-primary_light ${isChecked && isclickedListId === list.id && "bg-line-light hover:bg-line-light"}`}
              onClick={() => {
                selectIconVisible(list.isChecked, list.id);
                list.isChecked = !list.isChecked;
              }}
            >
              <div className="flex items-center space-x-4 text-2 font-normal text-text-dark rtl:space-x-reverse">
                <div className="flex">
                  {isChecked && isclickedListId === list.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="24"
                      height="24"
                      fill="#6100ff"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  )}
                  {list.type === "folder" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="24"
                      height="24"
                    >
                      <path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      width="24"
                      height="24"
                    >
                      <path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 overflow-hidden text-ellipsis">
                  <p className="truncate">{children}</p>
                </div>
                <div className="inline-flex items-center">
                  {list.status === "analyzing" && (
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="20"
                        height="20"
                        className="mr-1"
                      >
                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                      </svg>
                      분석중
                    </span>
                  )}
                  {list.status === "loading" && (
                    <span className="text-text-default">대기중..</span>
                  )}
                  {list.status === "success" && (
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="20"
                        height="20"
                        className="mr-1"
                        fill="#00C308"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      완료
                    </span>
                  )}
                  {list.status === "error" && (
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="20"
                        height="20"
                        className="mr-1"
                        fill="#FF6D6D"
                      >
                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                      </svg>
                      오류
                    </span>
                  )}
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
