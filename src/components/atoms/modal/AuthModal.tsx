"use client";
import { twMerge } from "tailwind-merge";

export type PropTypes = { children: React.ReactNode; className?: string; isAuth: boolean; onClose: () => void };

export default function AuthModal({ children, className, isAuth, onClose }: PropTypes) {
  
  if(isAuth) return null;

  return (
    <>
      <div
        id="default-modal"
        aria-hidden={!isAuth}
        className={twMerge(
          "fixed inset-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgb(0,0,0,0.6)]",
          "flex",
          className,
        )}
        onClick={onClose}
      >
        <div
          className={`relative max-h-max min-h-max min-w-max max-w-[686px] rounded-[20px] bg-white p-8 text-center shadow-[0_0px_24.8px_0px_rgba(0,0,64,0.25)]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="mb-3 flex flex-col items-center justify-center text-center"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}