import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Link from "next/link";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

type PropTypes = {
  uid: string;
  email: string;
  imgUrl?: string;
};
const LoginMyLibrary = ({ uid, email, imgUrl }: PropTypes) => {
  const router = useRouter();
  const logout = async () => {
    try {
      console.error("Logout ");
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <div className="mx-auto my-[124px] w-[1315px] items-center">
      <div className="mb-20 flex gap-11 border-b border-[#BABABA] pb-20">
        <div>
          <div className="flex h-[107px] w-[107px] items-center justify-center overflow-hidden rounded-full bg-bg-gray_light">
            <img width="100%" src={imgUrl} alt="프로필 이미지" />
          </div>
        </div>
        <p className="title-md-medium flex-1 text-text-gray-dark">
          Hello,
          <br />
          {email}
        </p>
        <div>
          <Button
            variant="filled"
            className="bg-primary-50 text-primary-500"
            onClick={logout}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <div className="mb-20 flex gap-11 border-b border-[#BABABA] pb-20">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="subtitle-md-bold min-w-0 flex-1 flex-shrink-0">
            내 정보
            <p className="subtitle-md-medium mt-[60px] max-h-[140px] overflow-y-auto">
              계정 &#40;깃허브 연동&#41;
            </p>
            <p className="subtitle-md-medium mt-4 max-h-[140px] overflow-y-auto">
              <Input disabled={true} value={email} />
            </p>
          </div>
        </div>
      </div>
      <div className="mb-20 flex gap-11 border-b border-[#BABABA] pb-20">
        <div className="items-center space-x-4 rtl:space-x-reverse">
          <div className="subtitle-md-medium flex max-h-[147px] min-w-0 flex-col gap-4">
            <Link href="">스크랩</Link>
            <Link href="/me/settings">설정</Link>
            <Link href="">문의하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginMyLibrary;
