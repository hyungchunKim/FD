import InfoBox from "@/components/atoms/infobox/infobox";

const Page = () => {
  return (
    <div >
      <InfoBox
        backgroundClass="bg-background-red-light"
        title="문제 코드"
        titleClass="text-accent-red" // 문제 코드 텍스트 색상
        description="컬러 코드를 설정할 때 이렇게 하게 되면 이런 오류가 생기기 때문에 이렇게 하지 않는게 좋다."
        positionLinkText="위치보기"
        positionLinkClass="bg-background-red-light border-accent-red text-accent-red"
      />
      <InfoBox
        backgroundClass="bg-background-purple-light"
        title="문제 코드"
        titleClass="text-primary-puple-500" // 문제 코드 텍스트 색상
        description="컬러 코드를 설정할 때 이렇게 하게 되면 이런 오류가 생기기 때문에 이렇게 하지 않는게 좋다."
        positionLinkText="위치보기"
        positionLinkClass="bg-background-purple-light border-primary-puple-500 text-primary-puple-500"
      />
      <InfoBox
        backgroundClass="bg-background-gray-light"
        title="문제 코드"
        titleClass="text-text-gray-dark" // 문제 코드 텍스트 색상
        description="컬러 코드를 설정할 때 이렇게 하게 되면 이런 오류가 생기기 때문에 이렇게 하지 않는게 좋다."
        positionLinkText="위치보기"
        positionLinkClass="bg-background-gray-light border-text-gray-dark text-text-gray-dark"
      />
    </div>
  );
};

export default Page;
