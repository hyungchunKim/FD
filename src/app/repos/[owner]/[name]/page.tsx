"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import List from "@/components/atoms/list";
import VulnerabilityAnalysisCode from "@/components/pages/my-library/VulnerabilityAnalysisCode";
import Modal from "@/components/repos/select";
import Alert from "@/components/repos/ing1";
import useGitContentsStore from "@/store/useGitContentsStore";
import useGitRepoStore from "@/store/useGitRepoStore";
import CaretLeft from "@/assets/icons/CaretLeft.svg";

// Types
type TRepoContentItem = {
  name: string;
  path: string;
  download_url: string;
  sha: string;
  type: string;
  isChecked: boolean;
};

type FileStatus = "none" | "checking" | "checked" | "warning";

// Constants
const FOLDER_SCAN_BUTTON_TEXT = "선택 폴더 검사";
const API_EXPIRED_MESSAGE = "API 사용이 만료되었습니다.";

const VulnerabilityAnalysis: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const repoOwner = Array.isArray(params.owner)
    ? params.owner[0]
    : params.owner;
  const repoName = Array.isArray(params.name) ? params.name[0] : params.name;

  const { repoContents, fetchRepoContents, setRepoContents, fetchFileContent } =
    useGitContentsStore();
  const { gitToken } = useGitRepoStore();

  const [currentFile, setCurrentFile] = useState<TRepoContentItem | null>(null);
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<TRepoContentItem[]>([]);
  const [alertType, setAlertType] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [fileStatuses, setFileStatuses] = useState<Record<string, FileStatus>>(
    {},
  );
  const [checkingFiles, setCheckingFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      if (repoOwner && repoName && gitToken) {
        const contents = await fetchRepoContents({
          token: gitToken,
          owner: repoOwner,
          repo: repoName,
        });
        setRepoContents(contents);
      }
    };
    fetchContents();
  }, [repoOwner, repoName, gitToken, fetchRepoContents, setRepoContents]);

  const handleFolderScan = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalConfirm = useCallback(() => {
    setShowModal(false);
    setAlertType("error");
    setAlertMessage(API_EXPIRED_MESSAGE);
  }, []);

  const handleFileSelect = useCallback(
    (file: TRepoContentItem) => {
      setCurrentFile(file);
      setSelectedFiles((prevFiles) => {
        const isAlreadySelected = prevFiles.some((f) => f.path === file.path);
        if (isAlreadySelected) {
          return prevFiles.filter((f) => f.path !== file.path);
        } else {
          return [...prevFiles, file];
        }
      });

      if (file.type === "file") {
        fetchFileContent(file.download_url)
          .then((content) => setCurrentCode(content as string))
          .catch((error) => {
            console.error("파일 내용을 가져오는 중 오류 발생:", error);
            setAlertType("error");
            setAlertMessage("파일 내용을 불러오는 데 실패했습니다.");
          });
      }
    },
    [fetchFileContent],
  );

  const startInspection = useCallback(() => {
    if (selectedFiles.length === 0) {
      setAlertType("error");
      setAlertMessage("검사할 파일을 선택해주세요.");
      return;
    }
    setAlertType("error");
    setAlertMessage(API_EXPIRED_MESSAGE);
  }, [selectedFiles]);

  const getLanguageFromFileName = useMemo(
    () =>
      (fileName: string): string => {
        const extension = fileName.split(".").pop()?.toLowerCase();
        switch (extension) {
          case "js":
          case "jsx":
            return "javascript";
          case "ts":
          case "tsx":
            return "typescript";
          case "py":
            return "python";
          case "java":
            return "java";
          case "html":
            return "html";
          case "css":
            return "css";
          case "json":
            return "json";
          default:
            return "text";
        }
      },
    [],
  );

  return (
    <>
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

      {alertType && (
        <div className="fixed right-4 top-4 z-50">
          <Alert
            type="error"
            title={alertType === "error" ? "오류" : "알림"}
            message={alertMessage}
            buttonText="확인"
            onButtonClick={() => setAlertType(null)}
          />
        </div>
      )}

      <div className="flex h-[calc(100vh-150px)] w-[1761px] gap-7">
        <div className="flex w-[247px] flex-col gap-6">
          <Button
            rounded="xs"
            className="subtitle-md-bold mb-6 h-[107px] w-full"
            onClick={handleFolderScan}
          >
            {FOLDER_SCAN_BUTTON_TEXT}
          </Button>

          <div className="h-[500px] flex-1 overflow-y-auto">
            <List
              setCurrentFile={handleFileSelect}
              currentFile={currentFile}
              fileStatuses={fileStatuses}
              checkingFiles={checkingFiles}
              selectedFiles={selectedFiles}
            />
          </div>
        </div>

        <div className="w-full flex-grow">
          {currentCode && currentFile && (
            <div className="h-full flex-grow overflow-auto p-4">
              <h2 className="mb-4 text-xl font-bold">{currentFile.name}</h2>
              <VulnerabilityAnalysisCode
                code={currentCode}
                language={getLanguageFromFileName(currentFile.name)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex max-h-[1157px] min-h-max w-[1761px] gap-7 pb-6">
        <Button
          rounded="xs"
          className="subtitle-md-bold flex w-[247px]"
          onClick={startInspection}
          disabled={selectedFiles.length === 0}
        >
          검사하기
        </Button>
        9
      </div>

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
