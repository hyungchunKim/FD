"use client";

import { FileCard } from "@/components/organisms/card";
import { LibraryType } from "./libraryTypes";

const MyLibraryList = () => {
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
    <>
      {libraryList.map((library) => (
        <FileCard
          key={library.id}
          title={library.foldrName}
          chipLabel={library.status}
          useMenu={true}
          subTitle={library.caption}
          className="h-[200px]"
        />
      ))}
    </>
  );
};
export default MyLibraryList;
