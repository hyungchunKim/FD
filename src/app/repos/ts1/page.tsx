"use client";

import React, { useState } from 'react';
import { Search, ChevronLeft } from "lucide-react";
import FileList from "@/components/repos/list";
import Code from "@/components/repos/code/code";
import Button from "@/components/atoms/button";

export default function ProjectFilesPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    // TODO: Fetch file content
    setFileContent(`// This is the content of ${fileName}\n// Replace this with actual file content fetching logic`);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Header Section */}
      <header className="w-full max-w-7xl px-4 py-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50" aria-label="뒤로 가기">
            <ChevronLeft className="w-8 h-8 text-primary-500" />
          </button>
          <h1 className="flex-grow py-4 px-8 text-3xl md:text-4xl font-semibold text-primary-500 bg-white border-4 rounded-full border-primary-500">
            Project-1
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row w-full max-w-7xl flex-grow p-4 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex flex-col bg-white border border-gray-300 rounded-xl overflow-hidden">
          {/* 전체 품질 검사 버튼 */}
          <div className="p-4">
            <Button 
              size="large" 
              color="primary" 
              className="w-full text-sm whitespace-nowrap"
            >
              전체 품질 검사
            </Button>
          </div>

          {/* 취약점, 수정 제안, 문제 없음 정보 */}
          <div className="px-4 py-2 space-y-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                검출된 취약점
              </span>
              <span>12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                수정 제안
              </span>
              <span>8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                문제 없음
              </span>
              <span>23</span>
            </div>
          </div>

          {/* File List */}
          <div className="flex-grow overflow-hidden">
            <FileList onFileSelect={handleFileSelect} />
          </div>

          {/* 검사하기 버튼 */}
          <div className="p-4">
            <Button size="large" color="primary" className="w-full">
              검사하기
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow bg-white border border-gray-300 rounded-xl overflow-hidden">
          {selectedFile ? (
            <Code fileName={selectedFile} content={fileContent} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Search className="w-16 h-16 text-primary-500 mb-4" />
              <p className="text-2xl text-primary-500">파일을 선택하세요</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}