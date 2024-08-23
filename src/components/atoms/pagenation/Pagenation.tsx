"use client"

import React, { useState } from 'react';

interface PagenationChildrenProps {
  pageGroupSize: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagenation = ({ totalPages, currentPage, pageGroupSize, onPageChange }: PagenationChildrenProps) => {
  
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const startPage = pageGroupStart;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const handlePrevGroup = () => {
    const prevGroupStart = startPage - pageGroupSize;
    
    if (prevGroupStart > 0) {
      setPageGroupStart(prevGroupStart);
    }
  }

  const handleNextGroup = () => {
    
    const nextGroupStart = startPage + pageGroupSize;
    
    if (nextGroupStart <= totalPages) {
      setPageGroupStart(nextGroupStart);
    }
  }
  
  return (
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
      {Array.from({ length: endPage - pageGroupStart + 1 }, (_, index) => (
        <button 
          key={pageGroupStart + index}
          onClick={() => onPageChange(pageGroupStart + index)}
          className={`w-9 h-9 border border-transparent ${currentPage === pageGroupStart + index ? 'font-bold' : ''}`}
        >
          {pageGroupStart + index}  
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
  );
};

export default Pagenation;