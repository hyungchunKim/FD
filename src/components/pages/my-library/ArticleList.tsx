"use client";

import { FileCard } from "@/components/organisms/card";
import { LibraryType } from "./libraryTypes";
import Dropdown from "@/components/atoms/dropdown/Dropdown";
import Plus from "@/assets/icons/Plus.svg";
import Button from "@/components/atoms/button";

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

type PropTypes = {};

const ArticleList = ({}: PropTypes) => {
  const articleList: LibraryType[] = Array.from(
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
    <div className="mb-[124px]">
      <div className="mb-12 flex justify-between">
        <h1 className="title-md-medium text-text-gray-dark">Library</h1>
        <div className="flex gap-5">
          <Dropdown dropdown={FILTER_DROPDOWN} />
          <Dropdown dropdown={SORT_DROPDOWN} />
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-[24px]">
        {articleList.map((library) => (
          <FileCard
            key={library.id}
            title={library.foldrName}
            chipLabel={library.status}
            subTitle={library.caption}
            className="h-[200px]"
          />
        ))}
      </div>
      <div className="mt-[80px] flex items-center justify-center">
        <Button variant="outline">
          <div className="flex">
            <span>더보기</span>
            <Plus />
          </div>
        </Button>
      </div>
    </div>
  );
};
export default ArticleList;
