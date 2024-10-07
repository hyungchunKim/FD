"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, FileText, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import useGitContentsStore, { TRepoContentItem } from "@/store/useGitContentsStore";
import useGitRepoStore from "@/store/useGitRepoStore";
import { useParams } from "next/navigation";

type FileStatus = 'none' | 'checking' | 'checked' | 'warning';

interface FileItemProps {
  item: TRepoContentItem;
  status: FileStatus;
  isSelected: boolean;
  onClick: () => void;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ 
  item, 
  status, 
  isSelected, 
  onClick, 
  onToggleExpand,
  isExpanded 
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'checking': return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'checked': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <div className="w-4 h-4 bg-red-500 rounded-full" />;
      default: return null;
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-2 px-4 hover:bg-purple-50 cursor-pointer ${
        isSelected ? 'bg-purple-100 font-bold' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {item.type === 'dir' ? (
          <div className="flex items-center">
            {onToggleExpand && (
              <div onClick={(e) => { e.stopPropagation(); onToggleExpand(); }} className="mr-1">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            )}
            <Folder className="w-5 h-5 text-yellow-500" />
          </div>
        ) : (
          <FileText className="w-5 h-5 text-gray-500" />
        )}
        <span className="text-sm text-gray-700 truncate">{item.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        {isSelected && <CheckCircle className="w-4 h-4 text-purple-500" />}
        {getStatusIcon()}
      </div>
    </div>
  );
};

interface FileListProps {
  setCurrentFile: (file: TRepoContentItem) => void;
  currentFile: TRepoContentItem | null;
  fileStatuses: Record<string, FileStatus>;
  checkingFiles: string[];
  selectedFiles: TRepoContentItem[];
}

const FileList: React.FC<FileListProps> = ({ 
  setCurrentFile, 
  currentFile, 
  fileStatuses,
  checkingFiles,
  selectedFiles
}) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const { owner, name } = useParams();
  const repoOwner = Array.isArray(owner) ? owner[0] : owner;
  const repoName = Array.isArray(name) ? name[0] : name;

  const { repoContents, fetchRepoContents, setRepoContents, toggleFileSelection } = useGitContentsStore();
  const { gitToken } = useGitRepoStore();

  const [expandedDirs, setExpandedDirs] = useState<{ [key: string]: boolean }>({});
  const [dirContents, setDirContents] = useState<{ [key: string]: TRepoContentItem[] }>({});

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

  const handleDirectoryClick = async (item: TRepoContentItem) => {
    const { path } = item;
    const isExpanded = expandedDirs[path];

    setExpandedDirs((prevState) => ({
      ...prevState,
      [path]: !isExpanded,
    }));

    if (!isExpanded && !dirContents[path] && gitToken) {
      const children = await fetchRepoContents({
        token: gitToken,
        owner: repoOwner,
        repo: repoName,
        path: path,
      });

      if (children) {
        setDirContents((prevState) => ({
          ...prevState,
          [path]: children,
        }));
      }
    }

    setCurrentPath([...currentPath, item.name]);
  };

  const handleFileClick = (item: TRepoContentItem) => {
    toggleFileSelection({ file: item, repoName });
    setCurrentFile(item);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const getFileStatus = (item: TRepoContentItem): FileStatus => {
    if (checkingFiles.includes(item.path)) {
      return 'checking';
    }
    return fileStatuses[item.path] || 'none';
  };

  const isFileSelected = (item: TRepoContentItem) => {
    return selectedFiles.some(file => file.path === item.path);
  };

  const renderFileItem = (item: TRepoContentItem) => (
    <FileItem
      key={item.path}
      item={item}
      status={getFileStatus(item)}
      isSelected={isFileSelected(item)}
      onClick={() => item.type === 'file' ? handleFileClick(item) : handleDirectoryClick(item)}
      onToggleExpand={item.type === 'dir' ? () => handleDirectoryClick(item) : undefined}
      isExpanded={expandedDirs[item.path]}
    />
  );

  const renderDirItem = (item: TRepoContentItem) => {
    const isExpanded = expandedDirs[item.path];
    const children = dirContents[item.path];

    return (
      <div key={item.path}>
        {renderFileItem(item)}
        {isExpanded && children && (
          <div className="ml-4">
            {children.map((childItem) => (
              childItem.type === 'file' ? renderFileItem(childItem) : renderDirItem(childItem)
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-purple-50">
        <h2 className="text-lg font-semibold">Files</h2>
        <ChevronDown className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex items-center space-x-2 p-2 bg-gray-100 border-y border-gray-200">
        {currentPath.map((folder, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400">/</span>}
            <span
              className={`text-sm ${index === currentPath.length - 1 ? 'text-purple-500' : 'text-gray-600 cursor-pointer'}`}
              onClick={() => index < currentPath.length - 1 && setCurrentPath(currentPath.slice(0, index + 1))}
            >
              {folder}
            </span>
          </React.Fragment>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto">
        {currentPath.length > 0 && (
          <FileItem 
            item={{ name: "..", type: "dir", path: "" }} 
            onClick={navigateUp}
            isSelected={false}
            status="none"
          />
        )}
        {repoContents.map((item) => (
          item.type === 'file' ? renderFileItem(item) : renderDirItem(item)
        ))}
      </div>
      {selectedFiles.length > 0 && (
        <div className="p-4 bg-purple-50 border-t border-gray-200">
          <h3 className="text-sm font-semibold mb-2">선택된 파일 ({selectedFiles.length})</h3>
          <ul className="text-xs">
            {selectedFiles.map(file => (
              <li key={file.path} className="truncate">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileList;