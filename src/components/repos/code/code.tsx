import React from 'react';
import { FileText } from 'lucide-react';

interface CodeProps {
  fileName: string;
  content: string;
}

const Code: React.FC<CodeProps> = ({ fileName, content }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center space-x-2 p-4 bg-gray-100 border-b border-gray-200">
        <FileText className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">{fileName}</h2>
      </div>
      <pre className="flex-grow p-4 overflow-auto bg-white">
        <code className="text-sm">{content}</code>
      </pre>
    </div>
  );
};

export default Code;