import React, { useState } from 'react';
import { Star, CheckCircle, RotateCw, AlertTriangle, FileText, Folder, ChevronDown } from 'lucide-react';

interface FileItemProps {
  name: string;
  status?: 'starred' | 'checked' | 'syncing' | 'warning' | 'none';
  type: 'file' | 'folder';
  onClick: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ name, status = 'none', type, onClick }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'starred': return <Star className="w-4 h-4 text-purple-500" />;
      case 'checked': return <CheckCircle className="w-4 h-4 text-teal-500" />;
      case 'syncing': return <RotateCw className="w-4 h-4 text-purple-500 animate-spin" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-2 px-4 hover:bg-purple-50 cursor-pointer ${
        status !== 'none' ? 'bg-purple-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {type === 'folder' ? <Folder className="w-4 h-4 text-gray-600" /> : <FileText className="w-4 h-4 text-gray-500" />}
        <span className="text-sm text-gray-700 truncate">{name}</span>
      </div>
      {getStatusIcon()}
    </div>
  );
};

interface FileListProps {
  onFileSelect: (file: string) => void;
}

const FileList: React.FC<FileListProps> = ({ onFileSelect }) => {
  const [currentPath, setCurrentPath] = useState<string[]>(['public']);
  const [files, setFiles] = useState<FileItemProps[]>([
    { name: 'src', type: 'folder', onClick: () => {} },
    { name: '.eslintrc.json', type: 'file', status: 'checked', onClick: () => {} },
    { name: 'package.json', type: 'file', status: 'starred', onClick: () => {} },
    { name: 'tsconfig.json', type: 'file', onClick: () => {} },
    { name: 'README.md', type: 'file', status: 'warning', onClick: () => {} },
  ]);

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    // TODO: Fetch folder contents
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      // TODO: Fetch parent folder contents
    }
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
        {currentPath.length > 1 && (
          <FileItem name=".." type="folder" onClick={navigateUp} />
        )}
        {files.map((file, index) => (
          <FileItem
            key={index}
            {...file}
            onClick={() => file.type === 'folder' ? navigateToFolder(file.name) : onFileSelect(file.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;