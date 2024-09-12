// "use client";

// import React, { useState } from 'react';
// import { Search, ChevronLeft } from "lucide-react";
// import FileList from "@/components/repos/list";
// import Code from "@/components/repos/code/code";
// import Button from "@/components/atoms/button";
// import AlertsDemo from "@/components/repos/ing1"; // 추가된 AlertsDemo

// export default function ProjectFilesPage() {
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [fileContent, setFileContent] = useState<string>("");
//   const [analysisStatus, setAnalysisStatus] = useState<"info" | "error" | "inspecting" | "success">("info");
//   const [alertMessage, setAlertMessage] = useState<string>("");

//   const handleFileSelect = (fileName: string) => {
//     setSelectedFile(fileName);
//     setFileContent(`// This is the content of ${fileName}\n// Replace this with actual file content fetching logic`);
//   };

//   // 여기 handleInspection 함수 추가
//   const handleInspection = async () => {
//     // 파일 선택 여부 확인
//     if (!selectedFile) {
//       setAlertMessage("파일을 먼저 선택해주세요.");
//       return;
//     }

//     // 검사 시작
//     setAnalysisStatus("inspecting");
//     setAlertMessage("코드가 많을수록 처리시간이 길어집니다.");
    
//     try {
//       // Python API 호출
//       const response = await fetch("/api/lama", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_code: fileContent }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // 성공적으로 처리된 경우
//         setAnalysisStatus("success");
//         setAlertMessage("검사 결과를 확인해보세요.");
//       } else {
//         // 오류 발생 시
//         setAnalysisStatus("error");
//         setAlertMessage(data.error || "오류가 발생했습니다.");
//       }

//     } catch (error) {
//       // 네트워크 오류 처리
//       setAnalysisStatus("error");
//       setAlertMessage("서버와 통신 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-white">
//       {/* Header Section */}
//       <header className="w-full max-w-7xl px-4 py-6">
//         <div className="flex items-center gap-4">
//           <button className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50" aria-label="뒤로 가기">
//             <ChevronLeft className="w-8 h-8 text-primary-500" />
//           </button>
//           <h1 className="flex-grow py-4 px-8 text-3xl md:text-4xl font-semibold text-primary-500 bg-white border-4 rounded-full border-primary-500">
//             Project-1
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col md:flex-row w-full max-w-7xl flex-grow p-4 gap-6">
//         {/* Sidebar */}
//         <aside className="w-full md:w-64 flex flex-col bg-white border border-gray-300 rounded-xl overflow-hidden">
//           {/* 전체 품질 검사 버튼 */}
//           <div className="p-4">
//             <Button 
//               size="large" 
//               color="primary" 
//               className="w-full text-sm whitespace-nowrap"
//               onClick={handleInspection} // 검사 버튼에 이벤트 연결
//             >
//               전체 품질 검사
//             </Button>
//           </div>

//           {/* File List */}
//           <div className="flex-grow overflow-hidden">
//             <FileList onFileSelect={handleFileSelect} />
//           </div>

//           {/* 검사하기 버튼 */}
//           <div className="p-4">
//             <Button size="large" color="primary" className="w-full" onClick={handleInspection}>
//               검사하기
//             </Button>
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <section className="flex-grow bg-white border border-gray-300 rounded-xl overflow-hidden">
//           {selectedFile ? (
//             <Code fileName={selectedFile} content={fileContent} />
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full">
//               <Search className="w-16 h-16 text-primary-500 mb-4" />
//               <p className="text-2xl text-primary-500">파일을 선택하세요</p>
//             </div>
//           )}

//           {/* Alert Section */}
//           <AlertsDemo type={analysisStatus} message={alertMessage} />
//         </section>
//       </main>
//     </div>
//   );
// }
