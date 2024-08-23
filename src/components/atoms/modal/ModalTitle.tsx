import { TModal } from "@/types/modal/modal";

export default function ModalTitle({ titleText }: TModal) {
  return (
    <>
      <p className="mb-[10px] h-11 p-[10px] text-4 font-semibold leading-[24.2px]">
        {titleText}
      </p>
    </>
  );
}
