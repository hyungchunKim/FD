"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import { RotateCw } from 'lucide-react';

// Types
type TRepoContentItem = {
  name: string;
  path: string;
  download_url: string;
  sha: string;
  type: string;
  isChecked: boolean;
};

type AnalysisResult = {
  type: "vulnerability" | "suggestion" | "no_issue";
  problem?: string;
  solution?: string;
  modifiedCode?: string;
};

type FileStatus = 'none' | 'checking' | 'checked';

// Constants
const FOLDER_SCAN_BUTTON_TEXT = "폴더 전체 검사";

const VulnerabilityAnalysis: React.FC = () => {
  const params = useParams();
  const owner = params.owner as string;
  const name = params.name as string;
  const repoOwner = Array.isArray(owner) ? owner[0] : owner;
  const repoName = Array.isArray(name) ? name[0] : name;
  const router = useRouter();

  const { fetchRepoContents, setRepoContents, fetchFileContent } = useGitContentsStore();
  const { gitToken } = useGitRepoStore();

  const [currentFile, setCurrentFile] = useState<TRepoContentItem | null>(null);
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, AnalysisResult[]>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<TRepoContentItem[]>([]);
  const [alertType, setAlertType] = useState<string | null>(null);
  const [fileStatuses, setFileStatuses] = useState<Record<string, FileStatus>>({});
  const [checkingFiles, setCheckingFiles] = useState<string[]>([]);
  const [fileResultCounts, setFileResultCounts] = useState<Record<string, number>>({});

  // 총 결과 카운트
  const totalResultCounts = {
    noIssue: 0,
    suggestion: 0,
    vulnerability: 0
  };

  // 파일별 결과 카운트를 합산하여 총 결과 카운트에 반영
  Object.values(fileResultCounts).forEach(count => {
    if (count === 0) totalResultCounts.noIssue++;
    else if (count === 1) totalResultCounts.suggestion++;
    else totalResultCounts.vulnerability += count;
  });

  // 결과 업데이트 함수
  const updateResultCounts = useCallback((filePath: string, results: AnalysisResult[]) => {
    const issueCount = results.filter(r => r.type !== "no_issue").length; // 'no_issue'를 제외한 문제의 개수 카운트
    setFileResultCounts(prev => ({
      ...prev,
      [filePath]: issueCount
    }));
    console.log(`updateResultCounts - filePath: ${filePath}, issueCount: ${issueCount}`, results); // 디버깅용 로그
  }, []);

  // 파일 상태 아이콘 표시 함수
  const getFileStatusIcon = useCallback((filePath: string) => {
    const status = fileStatuses[filePath];
    const count = fileResultCounts[filePath] ?? -1; // 값이 없는 경우 -1로 설정

    console.log(`getFileStatusIcon - filePath: ${filePath}, status: ${status}, count: ${count}`); // 디버깅용 로그

    if (status === 'checking') {
      return <RotateCw className="h-[20px] w-[20px] animate-spin text-blue-500" />;
    } else if (status === 'checked') {
      if (count === 0) {
        return <CheckCircle className="h-[20px] w-[20px] text-green-500" />; // 문제 없음
      } else if (count === 1) {
        return <YellowTriangle className="h-[20px] w-[20px] text-yellow-500" />; // 수정 제안
      } else if (count > 1) {
        return <AlertTriangle className="h-[20px] w-[20px] text-red-500" />; // 검출된 취약점
      }
    }
    return null;
  }, [fileStatuses, fileResultCounts]);

  // 검사 시작 함수
  const startInspection = useCallback(async () => {
    if (!currentFile || !currentCode) {
      setAlertType("info");
      console.warn("startInspection - currentFile or currentCode is missing"); // 디버깅용 로그
      return;
    }

    setAlertType("inspecting");
    setIsAnalyzing(true);
    setCheckingFiles([currentFile.path]);
    setFileStatuses(prev => ({ ...prev, [currentFile.path]: 'checking' }));

    try {
      const response = await fetch("/api/llama/analyze-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: currentCode }),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const result: AnalysisResult[] = await response.json();

      // If no issues found, add a "no_issue" result
      if (result.length === 0) {
        result.push({ type: "no_issue" });
      }

      console.log('startInspection - analysis result:', result); // 디버깅용 로그

      setAnalysisResults((prevResults) => ({
        ...prevResults,
        [currentFile.path]: result,
      }));

      updateResultCounts(currentFile.path, result);

      setFileStatuses(prev => ({ 
        ...prev, 
        [currentFile.path]: 'checked'
      }));
      setAlertType("success");
    } catch (error) {
      console.error("분석 중 오류 발생:", error);
      setFileStatuses(prev => ({ ...prev, [currentFile.path]: 'none' }));
      setAlertType("error");
    }

    setIsAnalyzing(false);
    setCheckingFiles([]);
  }, [currentFile, currentCode, updateResultCounts]);

  const handleFolderScan = useCallback(() => {
    const uniqueFiles = selectedFiles.filter(
      (file, index, self) => index === self.findIndex((f) => f.path === file.path)
    );
    setSelectedFiles(uniqueFiles);
    setShowModal(true);
  }, [selectedFiles]);

  const handleModalConfirm = useCallback(() => {
    if (!currentFile && selectedFiles.length === 0) {
      setAlertType("info");
      return;
    }
    setShowModal(false);
    startInspection();
  }, [startInspection, selectedFiles, currentFile]);

  const handleResultNavigation = useCallback(() => {
    if (currentFile) {
      document.getElementById(currentFile.name)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentFile]);

  useEffect(() => {
    const fetchContents = async () => {
      if (repoOwner && repoName && gitToken) {
        const contents = await fetchRepoContents({ token: gitToken, owner: repoOwner, repo: repoName });
        setRepoContents(contents);
        console.log('fetchContents - fetched contents:', contents); // 디버깅용 로그
      }
    };
    fetchContents();
  }, [repoOwner, repoName, gitToken, fetchRepoContents, setRepoContents]);

  useEffect(() => {
    if (!currentFile) return;

    const fetchContent = async () => {
      try {
        const content = await fetchFileContent(currentFile.download_url);
        if (content) setCurrentCode(content);
        console.log('fetchContent - current file content:', content); // 디버깅용 로그
      } catch (error) {
        console.error("파일 내용을 가져오는 중 오류 발생:", error);
        setAlertType("error");
      }
    };
    fetchContent();
  }, [currentFile, fetchFileContent]);

  const handleFileSelect = useCallback((file: TRepoContentItem) => {
    setCurrentFile(file);
    setSelectedFiles((prevFiles) => [
      ...prevFiles.filter((prevFile) => prevFile.path !== file.path),
      file,
    ]);
  }, []);

  const selectedAnalysisResults = currentFile ? analysisResults[currentFile.path] : null;

  return (
    <>
      {/* Repository Header */}
      <div className="mb-12 flex gap-6">
        <Button
          rounded="md"
          variant="outline"
          className="h-[79px] w-[79px] border-4 border-primary-500"
          onClick={() => router.push("/repos")}
        >
          <CaretLeft />
        </Button>
        <div className="flex h-[79px] w-full items-center justify-start rounded-full border-4 border-primary-500 bg-transparent px-8 py-5 text-primary-500">
          <span className="title-md-medium">{`${repoName} - 1`}</span>
        </div>
      </div>

      {/* Alert */}
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
                ? "파일을 선택한 후 검사를 시작하세요."
                : alertType === "inspecting"
                ? "분석 중입니다. 잠시 기다려주세요."
                : alertType === "success"
                ? "결과를 확인하세요."
                : "오류가 발생했습니다."
            }
            buttonText={alertType === "success" ? "결과 보러가기" : "다시 시도"}
            onButtonClick={() => {
              if (alertType === "success") {
                handleResultNavigation();
              }
            }}
          />
        )}
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-150px)] w-[1761px] gap-7">
        {/* Left Column: File List and Scan Button */}
        <div className="flex flex-col gap-6 w-[247px]">
          <Button
            rounded="xs"
            className="subtitle-md-bold mb-6 h-[107px] w-full"
            onClick={handleFolderScan}
          >
            {FOLDER_SCAN_BUTTON_TEXT}
          </Button>

          {/* Vulnerability Legend */}
          <div className="title-xs-medium mb-6 flex h-[116px] w-[247px] flex-col gap-3 rounded-lg px-2">
            <p className="flex h-7 items-center">
              <AlertTriangle className="mr-2 h-[25px] w-[25px] text-red-500" />
              <span className="flex-1">검출된 취약점 ({totalResultCounts.vulnerability})</span>
            </p>
            <p className="flex h-7 items-center">
              <YellowTriangle className="mr-2 h-[25px] w-[25px] text-yellow-500" />
              <span className="flex-1">수정 제안 ({totalResultCounts.suggestion})</span>
            </p>
            <p className="flex h-7 items-center">
              <CheckCircle className="mr-2 h-[25px] w-[25px] text-green-500" />
              <span className="flex-1">문제 없음 ({totalResultCounts.noIssue})</span>
            </p>
          </div>

          <div className="flex-1 overflow-y-auto h-[500px]">
            <List
              setCurrentFile={handleFileSelect}
              getStatusIcon={getFileStatusIcon}
              currentFile={currentFile}
              fileStatuses={fileStatuses}
              checkingFiles={checkingFiles}
              selectedFiles={selectedFiles}
            />
          </div>
        </div>

        {/* Right Column: Code View and Analysis Results */}
        <div className="w-full flex-grow">
          {currentCode && (
            <div className={`flex-grow overflow-auto ${selectedAnalysisResults ? "h-[50vh]" : "h-full"}`}>
              <VulnerabilityAnalysisCode code={currentCode} />
            </div>
          )}

          {/* Analysis Results */}
          {selectedAnalysisResults && (
            <div className="flex-grow overflow-auto h-[35vh] mt-5 pt-5">
              <div className="subtitle-md-bold">{currentFile?.name}의 분석 결과</div>
              {selectedAnalysisResults.length === 0 || selectedAnalysisResults.every(r => r.type === "no_issue") ? (
                <InfoBox
                  backgroundClass="bg-bg-green_light"
                  title="검출된 문제점이 없어요."
                  description={["새로 업데이트할 경우 파일을 다시 검사해주세요."]}
                />
              ) : (
                selectedAnalysisResults
                  .filter(result => result.type !== "no_issue")
                  .map((result, idx) => (
                    <InfoBox
                      key={idx}
                      backgroundClass={result.type === "vulnerability" ? "bg-bg-red_light" : "bg-bg-yellow_light"}
                      title={`${result.type === "vulnerability" ? "취약점" : "수정 제안"} ${idx + 1}: ${result.problem || "문제 설명 없음"}`}
                      description={[`수정 사항: ${result.solution || "제공된 수정 사항 없음"}`]}
                      codeSnippet={result.modifiedCode ? {
                        language: "python",
                        code: result.modifiedCode,
                      } : undefined}
                    />
                  ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scan Button */}
      <div className="mt-auto flex max-h-[1157px] min-h-max w-[1761px] gap-7 pb-6">
        <Button 
          rounded="xs" 
          className="subtitle-md-bold flex w-[247px]" 
          onClick={startInspection} 
          disabled={isAnalyzing || !currentFile}
        >
          {isAnalyzing ? "분석 중..." : "검사하기"}
        </Button>
      </div>

      {/* File Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <Modal
            files={selectedFiles}
            onCancel={() => setShowModal(false)}
            onConfirm={handleModalConfirm}
          />
        </div>
      )}
    </>
  );
};

export default VulnerabilityAnalysis;
