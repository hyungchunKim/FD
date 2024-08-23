import { TModal } from "@/types/modal/modal";

export default function ModalExplanation({
  explanationText,
  helpTextText,
}: TModal) {
  return (
    <>
      {explanationText !== "" && (
        <p
          className={`mb-[10px] h-[39px] overflow-y-auto p-[10px] text-2 font-normal leading-[19.36px] text-text-default`}
        >
          {explanationText}
        </p>
      )}
      {helpTextText !== "" && (
        <p className="mb-[10px] h-[35px] overflow-y-auto p-[10px] text-0 font-normal leading-[14.52px] text-text-default">
          {helpTextText}
        </p>
      )}
    </>
  );
}
