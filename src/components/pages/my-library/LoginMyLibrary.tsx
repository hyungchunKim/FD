import Button from "@/components/atoms/button";
import Dropdown from "@/components/atoms/dropdown/Dropdown";
import MyLibraryList from "./MyLibraryList";

type PropTypes = {
  email: string;
  id: string;
  imgUrl?: string;
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

      <MyLibraryList title="My Library" />
    </div>
  );
};
export default LoginMyLibrary;
