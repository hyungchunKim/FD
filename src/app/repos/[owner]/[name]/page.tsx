"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import List from "@/components/atoms/list";
import VulnerabilityAnalysisCode from "@/components/pages/my-library/VulnerabilityAnalysisCode";
import Modal from "@/components/repos/select";
import Alert from "@/components/repos/ing1";
import useGitContentsStore, { TRepoContentItem } from "@/store/useGitContentsStore";
import useGitRepoStore from "@/store/useGitRepoStore";
import CaretLeft from "@/assets/icons/CaretLeft.svg";

type FileStatus = 'none' | 'checking' | 'checked' | 'warning';
type AlertType = 'error' | 'info' | 'inspecting' | 'success';

// Constants
const FOLDER_SCAN_BUTTON_TEXT = "선택 폴더 검사";
const API_EXPIRED_MESSAGE = "API 사용이 만료되었습니다.";

const VulnerabilityAnalysis: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const repoOwner = params?.owner ? (Array.isArray(params.owner) ? params.owner[0] : params.owner) : undefined;
  const repoName = params?.name ? (Array.isArray(params.name) ? params.name[0] : params.name) : undefined;

  const { repoContents, fetchRepoContents, setRepoContents, fetchFileContent } =
    useGitContentsStore();
  const { gitToken } = useGitRepoStore();

  const [currentFile, setCurrentFile] = useState<TRepoContentItem | null>(null);
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<TRepoContentItem[]>([]);
  
  const [alertState, setAlertState] = useState<{ type: AlertType; message: string } | null>(null);
  const [fileStatuses, setFileStatuses] = useState<Record<string, FileStatus>>({});

  const [alertType, setAlertType] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
 
  const [checkingFiles, setCheckingFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      if (repoOwner && repoName && gitToken) {
        
        try {
          const contents = await fetchRepoContents({ token: gitToken, owner: repoOwner, repo: repoName });
          setRepoContents(contents);
        } catch (error) {
          console.error('Failed to fetch repo contents:', error);
          setAlertState({ type: 'error', message: '저장소 내용을 불러오는 데 실패했습니다.' });
        }
      }
    };
    fetchContents();
  }, [repoOwner, repoName, gitToken, fetchRepoContents, setRepoContents]);

  const handleFolderScan = useCallback(() => 
    setShowModal(true)
  , []);

  const handleModalConfirm = useCallback(() => {
    setShowModal(false);
    setAlertState({ type: 'error', message: API_EXPIRED_MESSAGE });
  }, []);

  const handleFileSelect = useCallback((file: TRepoContentItem) => {
    setCurrentFile(file);
    setSelectedFiles(prevFiles => {
      const isAlreadySelected = prevFiles.some(f => f.path === file.path);
      return isAlreadySelected
        ? prevFiles.filter(f => f.path !== file.path)
        : [...prevFiles, file];
    });

    if (file.type === 'file' && file.download_url) {
      fetchFileContent(file.download_url)
        .then(content => setCurrentCode(content as string))
        .catch(() => {
          setAlertState({ type: 'error', message: "파일 내용을 불러오는 데 실패했습니다." });
        });
    }
  }, [fetchFileContent]);

  const startInspection = useCallback(() => {
    if (selectedFiles.length === 0) {
      setAlertState({ type: 'info', message: "검사할 파일을 선택해주세요." });
      return;
    }
    setAlertState({ type: 'error', message: API_EXPIRED_MESSAGE });
  }, [selectedFiles]);

  const getLanguageFromFileName = useMemo(() => (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: 'javascript', jsx: 'javascript',
      ts: 'typescript', tsx: 'typescript',
      py: 'python',
      java: 'java',
      html: 'html',
      css: 'css',
      json: 'json'
    };
    return languageMap[extension ?? ''] || 'text';
  }, []);


  if (!repoOwner || !repoName) {
    return <div>Repository information is missing</div>;
  }


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

      {alertState && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            type={alertState.type}
            title={alertState.type === "error" ? "오류" : "알림"}
            message={alertState.message}
            buttonText="확인"
            onButtonClick={() => setAlertState(null)}
          />
        </div>
      )}

      <div className="flex h-[calc(100vh-150px)] w-[1761px] gap-7">
        
      <div className="flex flex-col gap-6 w-[247px]">
        <Button
  rounded="xs"
  className="subtitle-md-bold mb-6 h-[107px] w-[247px]"
  onClick={handleFolderScan}
>
  {FOLDER_SCAN_BUTTON_TEXT}
</Button>

          <div className="h-[500px] flex-1 overflow-y-auto">
            <List
              setCurrentFile={handleFileSelect}
              currentFile={currentFile}
              fileStatuses={fileStatuses}
              checkingFiles={[]}
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
