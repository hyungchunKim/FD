"use client";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Button from "../button";
import { useState } from "react";
import ModalList from "./ModalList";

export type TModalList = {
  id?: string;
  fileName?: string;
  fileSubTitle?: string;
  updateDate?: string;
};
export interface IModalList {
  list: TModalList[];
}
type TModal = {
  title: true | boolean; //title 존재여부
  explanation: false | boolean;
  helpText: false | boolean;
  size: "small" | "large"; //modal에 list가 없을 때 small, 있을 때 large
  textPosition: "top" | "bottom"; //modal에 list가 있을 때 text 위치
  titleContent?: string; //title의 text
  explanationContent?: string;
  helpTextContent?: string;
  smallBtnText?: string; //modal에 list가 없을 때 button text
  largeBtnText1?: string; //modal에 list가 있을 때 button text
  largeBtnText2?: string;
};

type TButtonProps = React.ComponentPropsWithoutRef<"button">;

export type PropTypes = TButtonProps & TModal & TModalList;

export default function Modal(
  {
    title,
    explanation,
    helpText,
    size,
    textPosition,
    titleContent,
    explanationContent,
    helpTextContent,
    smallBtnText,
    largeBtnText1,
    largeBtnText2,
    fileName,
    fileSubTitle,
    updateDate,
  }: PropTypes,
  list: TModalList,
) {
  return (
    <>
      <div className="fixed inset-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgb(0,0,0,0.6)]">
        {title &&
          (size === "small" ? (
            <div
              className={` ${explanation ? (helpText ? "h-[259px]" : "h-[224px]") : "h-[185px]"} relative inset-x-[40%] inset-y-[25%] w-[380px] rounded-[20px] bg-white pt-8 text-center shadow-[0_0px_24.8px_0px_rgba(0,0,64,0.25)]`}
            >
              <p
                className={`${!explanation && "mb-[10px]"} h-11 p-[10px] text-4 font-semibold leading-[24.2px]`}
              >
                {titleContent}
              </p>
              {/* 설명 있는 경우 */}
              {explanation && (
                <p
                  className={`${!helpText && "mb-[10px]"}" text-text-default" h-[39px] p-[10px] text-2 font-normal leading-[19.36px]`}
                >
                  {explanationContent}
                </p>
              )}

              {/* help text 있는 경우 */}
              {helpText && (
                <p className="mb-[10px] h-[35px] p-[10px] text-0 font-normal leading-[14.52px] text-text-default">
                  {helpText}
                </p>
              )}

              <Button
                data-modal-hide="popup-modal"
                variant={"filled"}
                className="inline-flex h-[53px] w-[121px] items-center rounded-full px-[12px] py-[24px] text-center text-5 font-light text-white"
                color="primary"
              >
                {smallBtnText}
              </Button>
            </div>
          ) : (
            // large size
            <div
              className={` ${explanation ? (helpText ? "h-[558px]" : "h-[553px]") : "h-[482px]"} relative inset-x-[30%] inset-y-[17%] w-[686px] rounded-[20px] bg-white p-12 text-center`}
            >
              {textPosition === "top" && (
                <p className="mb-[10px] h-[49px] p-[10px] text-5 font-semibold leading-[29.05px]">
                  {titleContent}
                </p>
              )}
              <ModalList {...list}></ModalList>

              {textPosition === "bottom" && (
                <p className="mb-[10px] h-[49px] p-[10px] text-5 font-semibold leading-[29.05px]">
                  {titleContent}
                </p>
              )}
              {/* 설명 있는 경우 */}
              {explanation && (
                <p
                  className={`${!helpText && "mb-[10px]"} h-[39px] overflow-y-auto p-[10px] text-2 font-normal leading-[19.36px] text-text-default`}
                >
                  {explanationContent}
                </p>
              )}

              {/* help text 있는 경우 */}
              {helpText && (
                <p className="mb-[10px] h-[35px] overflow-y-auto p-[10px] text-0 font-normal leading-[14.52px] text-text-default">
                  {helpText}
                </p>
              )}

              <Button
                variant={"outline"}
                className="mr-3 inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light"
                color="primary"
              >
                {largeBtnText1}
              </Button>
              <Button
                variant={"filled"}
                className="inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light text-white"
                color="primary"
              >
                {largeBtnText2}
              </Button>
            </div>
          ))}

        {/* title 없고 설명만 있는 경우 */}
        {!title &&
          explanation &&
          (size === "small" ? (
            <div
              className={` ${helpText ? "h-[215px]" : "h-[180px]"} relative inset-x-[40%] inset-y-[25%] w-[380px] rounded-[20px] bg-white pt-8 text-center shadow-[0_0px_24.8px_0px_rgba(0,0,64,0.25)]`}
            >
              <p
                className={`${!explanation && "mb-[10px]"} text-text-default" h-[39px] p-[10px] text-2 font-normal leading-[19.36px]`}
              >
                {explanationContent}
              </p>
              {/* 설명 있는 경우 */}
              {explanation && (
                <p className="mb-[10px] h-[35px] p-[10px] text-0 font-normal leading-[14.52px] text-text-default">
                  {helpText}
                </p>
              )}
              {size === "small" ? (
                <Button
                  data-modal-hide="popup-modal"
                  variant={"filled"}
                  className="inline-flex h-[53px] w-[121px] items-center rounded-full px-[12px] py-[24px] text-center text-5 font-light text-white"
                  color="primary"
                >
                  {smallBtnText}
                </Button>
              ) : (
                <>
                  <Button
                    variant={"outline"}
                    className="mr-3 inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light"
                    color="primary"
                  >
                    {largeBtnText1}
                  </Button>
                  <Button
                    variant={"filled"}
                    className="inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light text-white"
                    color="primary"
                  >
                    {largeBtnText2}
                  </Button>
                </>
              )}
            </div>
          ) : (
            // large size
            <div
              className={` ${helpText ? "h-[507px]" : "h-[472px]"} relative inset-x-[30%] inset-y-[17%] w-[686px] rounded-[20px] bg-white p-12 text-center`}
            >
              <ModalList {...list}></ModalList>

              {/* 설명 있는 경우 */}
              {explanation && (
                <p
                  className={`${!helpText && "mb-[10px]"} h-[39px] overflow-y-auto p-[10px] text-2 font-normal leading-[19.36px] text-text-default`}
                >
                  {explanationContent}
                </p>
              )}

              {/* help text 있는 경우 */}
              {helpText && (
                <p className="mb-[10px] h-[35px] overflow-y-auto p-[10px] text-0 font-normal leading-[14.52px] text-text-default">
                  {helpText}
                </p>
              )}

              <Button
                variant={"outline"}
                className="mr-3 inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light"
                color="primary"
              >
                {largeBtnText1}
              </Button>
              <Button
                variant={"filled"}
                className="inline-flex h-[53px] w-[121px] items-center rounded-xl px-[12px] py-[24px] text-center text-5 font-light text-white"
                color="primary"
              >
                {largeBtnText2}
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}
