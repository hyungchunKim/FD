import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Link from "next/link";
import { db, auth } from "@/libs/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeCookie } from "@/utils/cookies";
import { useState } from "react";
import Modal from "@/components/atoms/modal";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type PropTypes = {
  uid: string;
  email: string;
  imgUrl?: string;
};
const LoginMyLibrary = ({ uid, email, imgUrl }: PropTypes) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 추가

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const logout = async () => {
    try {
      console.error("Logout ");
      await auth.signOut();

      removeCookie();
      const docRef = collection(db, "users");
      const findUser = query(docRef, where("email", "==", email));
      const userId = (await getDocs(findUser)).docs[0]?.id;
      console.log("userId= ", userId);
      await deleteDoc(doc(db, "users", userId));
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
            {imgUrl && (
              <Image
                width={107}
                height={107}
                src={imgUrl}
                alt="프로필 이미지"
              />
            )}
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
            onClick={handleModal}
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
            <Link href="/me/settings">설정</Link>
            <Link href="/me/customercenter">문의하기</Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal className="">
          <p className="title-md-bold mb-3 w-[985px]">정말 로그아웃 할까요?</p>
          <p className="title-xs-medium mb-3">
            소스코드 보안을 위하여 모든 히스토리와 코드 저장 내역이 삭제됩니다.
            <br />
            아래 버튼을 누르면 모든 데이터를 삭제하게 되고 로그아웃 처리가
            됩니다.
          </p>
          <div className="mt-3 flex h-[58px] w-[712px] gap-4">
            <Button variant={"outline"} className="w-1/2" onClick={handleClose}>
              닫기
            </Button>
            <Button className="w-1/2" onClick={logout}>
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default LoginMyLibrary;
