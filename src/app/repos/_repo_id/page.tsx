import Button from "@/components/atoms/button";
import CaretLeft from "@/assets/icons/CaretLeft.svg";
import AlertTriangle from "@/assets/icons/Vector10.svg";
import YellowTriangle from "@/assets/icons/Polygon1.svg";
import CheckCircle from "@/assets/icons/Ellipse213.svg";
import List from "@/components/atoms/list";
import VulnerabilityAnalysisCode from "@/components/pages/my-library/VulnerabilityAnalysisCode";
import InfoBox from "@/components/atoms/infobox/infobox";
import { TAnalysisListProps } from "@/types/my-library/vulnerability-analysis";

const isLogin = true;
export type TAnlaysisCode = {
  type: string; //원본 파일, 분석 파일 분류
  content: string; //파일 내용
  status: string; // 분석중, 성공
};
//상단의 분석중인 파일
const analysisList: TAnalysisListProps[] = Array.from(
  {
    length: 10,
  },
  (_, i) => ({
    id: `id_${i + 1}`,
    fileName: `file ${i + 1}`,
    iconShow: "false",
  }),
);
const VulnerabilityAnalysis = ({ status }: TAnlaysisCode) => {
  return (
    <>
      <div className="mb-12 flex gap-6">
        <Button
          rounded="md"
          variant="outline"
          className="h-[79px] w-[79px] border-4 border-primary-500"
        >
          <CaretLeft />
        </Button>
        <div className="flex h-[79px] w-[1665px] items-center justify-start rounded-full border-4 border-primary-500 bg-transparent px-8 py-5 text-primary-500">
          <span className="title-md-medium">sfacweb - 1</span>
        </div>
      </div>
      <div className="mb-6 flex max-h-[1065px] w-[1761px] gap-7">
        <div className="gap-6">
          <Button
            rounded={"xs"}
            className="subtitle-md-bold mb-6 flex h-[107px] w-[247px]"
          >
            폴더 전체 검사
          </Button>
          <div className="title-xs-medium mb-6 flex h-[116px] w-[247px] flex-col gap-3 rounded-lg px-2">
            <p className="flex h-7">
              <AlertTriangle className="flex h-[25px] w-[25px] items-center justify-center" />
              <span className="flex-1">검출된 취약점</span>
              <span className="inline-flex"></span>
            </p>
            <p className="flex h-7">
              <YellowTriangle className="h-[25px] w-[25px]" />
              <span className="flex-1">수정 제안</span>
              <span className="inline-flex"></span>
            </p>
            <p className="flex h-7">
              <CheckCircle className="h-[25px] w-[25px]" />
              <span className="flex-1">문제 없음</span>
              <span className="inline-flex"></span>
            </p>
          </div>
          <List className="mb-6"></List>
        </div>
        {/* 코드 */}
        <div className="w-full gap-7 rounded-lg">
          <VulnerabilityAnalysisCode
            className={`${status === "success" && "h-[555px]"}`}
          ></VulnerabilityAnalysisCode>
          {/* 수정된 코드 */}
          {status === "success" && (
            <div className="w-[1486px] gap-5 rounded-lg">
              <div className="subtitle-md-bold">수정된 코드</div>
              <div className="overflow-x-hidden">
                <InfoBox
                  backgroundClass="bg-bg-red_light"
                  className="mb-5"
                ></InfoBox>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-6 flex max-h-[1157px] min-h-max w-[1761px] gap-7">
        <div className="gap-6">
          <Button rounded={"xs"} className="subtitle-md-bold flex w-[247px]">
            검사하기
          </Button>
        </div>
      </div>
    </>
  );
};
export default VulnerabilityAnalysis;
