"use client"

import React, { useState } from 'react';
import Pagenation from '@/components/atoms/pagenation/Pagenation';

const PagenationTest = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = 153;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 10;
  
  const handlePageChange = (pageNumber: number) => {
    
    setCurrentPage(pageNumber);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = Array.from({ length: totalItems }, (_, index) => index + 1).slice(startIndex, endIndex);

  return (
    <div>
      <div>
        {currentItems.map((item, index) => (
          <div key={index}>{`${item}입니다.`}</div>
        ))}
      </div>
      <Pagenation 
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroupSize={pageGroupSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PagenationTest;