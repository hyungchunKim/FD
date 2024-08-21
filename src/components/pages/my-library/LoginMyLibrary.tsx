import Button from "@/components/atoms/button";
import Dropdown from "@/components/atoms/dropdown/Dropdown";
import MyLibraryList from "./MyLibraryList";
import CaretLeft from "@/assets/icons/CaretLeft.svg";

type PropTypes = {
  email: string;
  id: string;
  imgUrl?: string;
};

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

const LoginMyLibrary = () => {
  return (
    <div className="mx-auto my-[124px] w-[1315px] items-center">
      <div className="mb-20 flex gap-11 border-b border-[#BABABA] pb-20">
        <div>
          <div className="flex h-[107px] w-[107px] items-center justify-center overflow-hidden rounded-full bg-bg-gray_light">
            <img width="100%" />
          </div>
        </div>
        <p className="title-md-medium flex-1 text-text-gray-dark">
          Hello,
          <br />
          marry@gmail.com
        </p>
        <div>
          <Button variant="outline">프로필 정보</Button>
        </div>
      </div>
      <div className="mb-12 flex justify-between">
        <h1 className="title-md-medium text-text-gray-dark">My Library</h1>
        <div className="flex gap-5">
          <Dropdown dropdown={FILTER_DROPDOWN} />
          <Dropdown dropdown={SORT_DROPDOWN} />
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
        <MyLibraryList />
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
export default LoginMyLibrary;
