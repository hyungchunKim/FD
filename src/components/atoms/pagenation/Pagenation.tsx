"use client"

import React, { useState } from 'react';

interface PagenationChildrenProps {
  children: React.ReactNode[];
  itemsPerPage: number;
  pageGroupSize: number;
  otherComponent?: React.ReactNode
  pageWidth: number;
  pageHeight: number;
}

const Pagenation = ({ children, itemsPerPage, pageGroupSize, otherComponent, pageWidth, pageHeight }: PagenationChildrenProps) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const totalPages = Math.ceil(children.length / itemsPerPage);

  const startPage = pageGroupStart;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const handlePrevGroup = () => {
    if (pageGroupStart > 1) {
      setPageGroupStart(pageGroupStart - 10);
    }
  }

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPageGroupStart(pageGroupStart + 10);
    }
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const selectedChildren = children.slice(startIdx, startIdx + itemsPerPage);
  
  return (
    <div style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}>
      <div className='flex mb-[76px] w-[1313px] h-[1450px]'>
        <div>{selectedChildren}</div>
        {otherComponent ? otherComponent : ""}
      </div>
      <div className='w-[575px] h-[36px] flex items-center justify-between caption-xl-regular mx-auto'>
        <div className='w-9 h-9 flex items-center justify-center'>
          <button 
            className='w-6 h-6 border border-transparent flex items-center justify-center'
            onClick={handlePrevGroup}
            disabled={pageGroupStart === 1}
          >
            <svg 
              className='rotate-180'
              width="9.5" 
              height="17.48" 
              viewBox="0 0 10 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.00032 17.7498C1.19938 17.7508 1.39043 17.6715 1.53032 17.5298L9.53032 9.52985C9.82277 9.23703 9.82277 8.76266 9.53032 8.46985L1.53032 0.469847C1.23481 0.194488 0.774307 0.202613 0.488695 0.488225C0.203083 0.773837 0.194958 1.23434 0.470317 1.52985L7.94032 8.99985L0.470317 16.4698C0.177863 16.7627 0.177863 17.237 0.470317 17.5298C0.610201 17.6715 0.80125 17.7508 1.00032 17.7498Z" fill="#3F3F3F"/>
            </svg>
          </button>
        </div>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button 
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className='w-9 h-9 border border-transparent'
          >
            {startPage + index}  
          </button>
        ))}
        <div className='w-9 h-9 flex items-center justify-center'>
          <button 
            className='w-6 h-6 border border-transparent flex items-center justify-center'
            onClick={handleNextGroup}
            disabled={endPage === totalPages}
          >
            <svg 
              width="9.5" 
              height="17.48" 
              viewBox="0 0 10 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.00032 17.7498C1.19938 17.7508 1.39043 17.6715 1.53032 17.5298L9.53032 9.52985C9.82277 9.23703 9.82277 8.76266 9.53032 8.46985L1.53032 0.469847C1.23481 0.194488 0.774307 0.202613 0.488695 0.488225C0.203083 0.773837 0.194958 1.23434 0.470317 1.52985L7.94032 8.99985L0.470317 16.4698C0.177863 16.7627 0.177863 17.237 0.470317 17.5298C0.610201 17.6715 0.80125 17.7508 1.00032 17.7498Z" fill="#3F3F3F"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagenation;