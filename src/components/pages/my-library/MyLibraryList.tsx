"use client";

import { FileCard } from "@/components/organisms/card";
import { LibraryType } from "./libraryTypes";
import Dropdown from "@/components/atoms/dropdown/Dropdown";
import CaretLeft from "@/assets/icons/CaretLeft.svg";

const FILTER_DROPDOWN = {
  dropStandard: "Type",
  dropWidth: 89,
  downMenus: [
    {
      menuTitle: "",
      isChecked: false,
    },
  ],
  isToggle: false,
};

const SORT_DROPDOWN = {
  dropStandard: "Sort",
  dropWidth: 89,
  downMenus: [
    {
      menuTitle: "",
      isChecked: false,
    },
  ],
  isToggle: false,
};

type PropTypes = {
  title?: string;
  useCardMenu?: boolean;
  className?: string;
};

const MyLibraryList = ({
  title = "Library",
  useCardMenu = true,
  className,
}: PropTypes) => {
  const libraryList: LibraryType[] = Array.from(
    {
      length: 12,
    },
    (_, i) => ({
      id: `id_${i + 1}`,
      foldrName: `Folder ${i + 1}`,
      caption: `folder ${i + 1} caption`,
      status: "label",
    }),
  );

  return (
    <div className={className}>
      <div className="mb-12 flex justify-between">
        <h1 className="title-md-medium text-text-gray-dark">{title}</h1>
        <div className="flex gap-5">
          <Dropdown dropdown={FILTER_DROPDOWN} />
          <Dropdown dropdown={SORT_DROPDOWN} />
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
        {libraryList.map((library) => (
          <FileCard
            key={library.id}
            title={library.foldrName}
            chipLabel={library.status}
            useMenu={useCardMenu}
            subTitle={library.caption}
            className="h-[200px] border-primary-100"
          />
        ))}
        <div className="absolute left-[-26px] top-[50%] flex h-0 w-[calc(100%_+_52px)] items-center justify-between">
          <button className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-text-gray-dark bg-white">
            <CaretLeft className="[&_path]:fill-text-gray-dark" />
          </button>
          <button className="flex h-[52px] w-[52px] rotate-180 items-center justify-center rounded-full border border-text-gray-dark bg-white">
            <CaretLeft className="[&_path]:fill-text-gray-dark" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyLibraryList;
