"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import List from "@/components/atoms/list";
import VulnerabilityAnalysisCode from "@/components/pages/my-library/VulnerabilityAnalysisCode";
import InfoBox from "@/components/atoms/infobox/infobox";
import Modal from "@/components/repos/select";
import Alert from "@/components/repos/ing1";
import useGitContentsStore from "@/store/useGitContentsStore";
import useGitRepoStore from "@/store/useGitRepoStore";
import CaretLeft from "@/assets/icons/CaretLeft.svg";
import AlertTriangle from "@/assets/icons/Vector10.svg";
import YellowTriangle from "@/assets/icons/Polygon1.svg";
import CheckCircle from "@/assets/icons/Ellipse213.svg";

// 상수 정의
const FOLDER_SCAN_BUTTON_TEXT = "폴더 전체 검사";
const VULNERABILITY_TYPES = [
  { icon: AlertTriangle, text: "검출된 취약점" },
  { icon: YellowTriangle, text: "수정 제안" },
  { icon: CheckCircle, text: "문제 없음" },
];

// 취약점 범례 컴포넌트
const VulnerabilityLegend = () => (
  <div className="title-xs-medium mb-6 flex h-[116px] w-[247px] flex-col gap-3 rounded-lg px-2">
    {VULNERABILITY_TYPES.map(({ icon: Icon, text }) => (
      <p key={text} className="flex h-7">
        <Icon className="h-[25px] w-[25px]" />
        <span className="flex-1">{text}</span>
      </p>
    ))}
  </div>
);

// 레포지토리 헤더 컴포넌트
const RepoHeader = ({ repoName, onBack }) => (
  <div className="mb-12 flex gap-6">
    <Button
      rounded="md"
      variant="outline"
      className="h-[79px] w-[79px] border-4 border-primary-500"
      onClick={onBack}
    >
      <CaretLeft />
    </Button>
    <div className="flex h-[79px] w-[1665px] items-center justify-start rounded-full border-4 border-primary-500 bg-transparent px-8 py-5 text-primary-500">
      <span className="title-md-medium">{repoName}</span>
    </div>
  </div>
);

// 메인 컴포넌트
const VulnerabilityAnalysis = () => {
  // URL 파라미터 및 라우터 초기화
  const { owner, name } = useParams();
  const repoOwner = Array.isArray(owner) ? owner[0] : owner;
  const repoName = Array.isArray(name) ? name[0] : name;
  const router = useRouter();

  // 스토어에서 필요한 함수와 상태 가져오기
  const { fetchRepoContents, setRepoContents, fetchFileContent } = useGitContentsStore();
  const { gitToken } = useGitRepoStore();

  // 로컬 상태 관리
  const [currentFile, setCurrentFile] = useState();
  const [currentCode, setCurrentCode] = useState(null);
  const [currentStatus, setCurrentStatus] = useState();
  const [analysisResults, setAnalysisResults] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [alertType, setAlertType] = useState(null);

  // 레포지토리 컨텐츠 가져오기
  useEffect(() => {
    const fetchContents = async () => {
      if (repoOwner && repoName && gitToken) {
        const contents = await fetchRepoContents({ token: gitToken, owner: repoOwner, repo: repoName });
        setRepoContents(contents);
      }
    };
    fetchContents();
  }, [repoOwner, repoName, gitToken, fetchRepoContents, setRepoContents]);

  // 현재 선택된 파일의 내용 가져오기
  useEffect(() => {
    if (!currentFile) return;

    const fileDetails = selectedFiles.find((file) => file.path === currentFile.path);
    if (fileDetails?.status) setCurrentStatus(fileDetails.status);

    const fetchContent = async () => {
      try {
        const content = await fetchFileContent(currentFile.download_url);
        if (content) setCurrentCode(content);
      } catch (error) {
        console.error("파일 내용을 가져오는 중 오류 발생:", error);
        setAlertType("error");
      }
    };
    fetchContent();
  }, [currentFile, selectedFiles, fetchFileContent]);

  // 페이지 뒤로가기 핸들러
  const handlePage = useCallback(() => router.push("/repos"), [router]);

  // 파일 선택 핸들러
  const handleFileSelect = useCallback((file) => {
    setCurrentFile(file);
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      { name: file.name, subtitle: "선택된 파일", date: new Date().toLocaleDateString() },
    ]);
  }, []);

  // 코드 검사 시작 함수
  const startInspection = useCallback(async () => {
    setAlertType("inspecting");
    setIsAnalyzing(true);

    for (const file of selectedFiles) {
      try {
        const response = await fetch("/api/llama/analyze-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: currentCode }),
        });

        if (!response.ok) throw new Error("코드 분석에 실패했습니다");

        const result = await response.json();
        setAnalysisResults((prevResults) => ({
          ...prevResults,
          [file.name]: result,
        }));
        setAlertType("success");
      } catch (error) {
        console.error("코드 분석 중 오류 발생:", error);
        setAlertType("error");
      }
    }
    setIsAnalyzing(false);
  }, [selectedFiles, currentCode]);

  return (
    <>
      {/* 레포지토리 헤더 */}
      <RepoHeader repoName={`${repoName} - 1`} onBack={handlePage} />

      {/* 알림 메시지 */}
      <div className="fixed top-4 right-4 z-50">
        {alertType && (
          <Alert
            type={alertType}
            title={
              alertType === "info"
                ? "검사 대기중"
                : alertType === "inspecting"
                ? "검사중..."
                : alertType === "success"
                ? "검사 완료"
                : "오류"
            }
            message={
              alertType === "info"
                ? "순차적으로 파일 검사가 진행됩니다. 잠시만 대기해주세요."
                : alertType === "inspecting"
                ? "코드가 많을수록 처리시간이 길어집니다."
                : alertType === "success"
                ? "검사 결과를 확인해보세요."
                : "오류가 발생했습니다. 다시 시도해주세요."
            }
            buttonText={alertType === "success" ? "결과 보러가기" : alertType === "error" ? "다시 시도하기" : ""}
            onButtonClick={() => setAlertType(null)}
            onClose={() => setAlertType(null)}
          />
        )}
      </div>

      <div className="mb-6 flex max-h-[1065px] w-[1761px] gap-7">
        {/* 왼쪽 사이드바 */}
        <div className="gap-6">
          {/* 폴더 전체 검사 버튼 */}
          <Button
            rounded="xs"
            className="subtitle-md-bold mb-6 flex h-[107px] w-[247px]"
            onClick={() => setShowModal(true)}
          >
            {FOLDER_SCAN_BUTTON_TEXT}
          </Button>

          {/* 취약점 범례 */}
          <VulnerabilityLegend />

          {/* 파일 목록 */}
          <List setCurrentFile={handleFileSelect} />
        </div>

        {/* 오른쪽 메인 컨텐츠 */}
        <div className="w-full gap-7 rounded-lg">
          {/* 선택된 파일의 코드 표시 */}
          {currentCode && (
            <VulnerabilityAnalysisCode
              code={currentCode}
              className={currentStatus === "success" ? "h-[555px]" : ""}
            />
          )}

          {/* 분석 결과 표시 */}
          {Object.entries(analysisResults).map(([fileName, results]) => (
            <div key={fileName} className="w-[1486px] gap-5 rounded-lg mb-6">
              <div className="subtitle-md-bold">{fileName}의 분석 결과</div>
              {results.map((result, idx) => (
                <InfoBox
                  key={idx}
                  backgroundClass="bg-bg-red_light"
                  className="mb-5"
                  title={`문제점 ${idx + 1}: ${result.problem}`}
                  titleClass="font-bold"
                  description={[`수정 사항: ${result.solution}`]}
                  codeSnippet={{
                    language: "python",
                    code: result.code,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mb-6 flex max-h-[1157px] min-h-max w-[1761px] gap-7">
        <Button
          rounded="xs"
          className="subtitle-md-bold flex w-[247px]"
          onClick={startInspection}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "분석 중..." : "검사하기"}
        </Button>
      </div>

      {/* 파일 선택 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <Modal files={selectedFiles} onCancel={() => setShowModal(false)} onConfirm={startInspection} />
        </div>
      )}
    </>
  );
};

export default VulnerabilityAnalysis;