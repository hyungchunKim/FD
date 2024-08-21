"use client"

import React, { useState } from 'react';
import Pagenation from '@/components/atoms/pagenation/Pagenation';
import ImageLinkCard from '@/components/organisms/card/ImageLinkCard';

const FlawDbPage = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = 153;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 10;
  
  const handlePageChange = (pageNumber: number) => {
    
    setCurrentPage(pageNumber);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = Array.from({ length: totalItems }, (_, index) => index + 1).slice(startIndex, endIndex);

  return (
    <>
      <div className='w-[1313px] h-[1880px] mt-[27px] mb-[76px] mx-auto border border-black'>
        <div className='w-full h-[390px] flex gap-[28px] mb-[76px]'>
          <ImageLinkCard link={''} backgroundImg={''} size='small' title='[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서' className='w-[625px] h-[390px]'/>
          <ImageLinkCard link={''} backgroundImg={''} size='small' title='2023년 12월 CNNVD 호환 서비스 신제품 발표' className='w-[316pxpx] h-[390px]'/>
          <ImageLinkCard link={''} backgroundImg={''} size='small' title='[취약성 보고서] CISCO IOS XE 소프트웨어의 보안 취약점에 대한 CNNVD의 보고서' className='w-[316px] h-[390px]'/>
        </div>
        <div>
          <div>
            <div className='w-[105px] h-[29px] subtitle-md-bold mb-4'>취약점 DB</div>
            <div className='w-[133px] h-[35px] flex gap-3 mb-4'>
              chips
              chips
            </div>
            <div className='w-full h-[1354px] gap-4 flex flex-col'>
              {currentItems.map((item, index) => (
                <div key={index}>{`${item}입니다.`}</div>
              ))}
            </div>
          </div>
          
          <div></div>
        </div>
      </div>
      <Pagenation 
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroupSize={pageGroupSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FlawDbPage;