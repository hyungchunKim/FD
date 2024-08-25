"use client"

import React, { useState } from 'react';
import Pagination from '@/components/atoms/pagination/Pagination';
import Chip from '@/components/atoms/chips/Chip';
import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import InfoBox from '@/components/atoms/infobox/InfoBox';
import Switch from '@/components/atoms/switch/Switch';
import Dropdown from '@/components/atoms/dropdown/Dropdown';
import { ContentCard } from '@/components/organisms/card/ContentCard';
import { ImageLinkCard } from '@/components/organisms/card/ImageLinkCard';
import { PropTypes } from '@/components/organisms/card/DefaultCard';

// 상수 정의
const TOPICS = [
  'Topic', '웹뷰', '허프만 코딩 구현', '테스크 커버리지', '코드형 인프라(IaC)',
  '클린 아키텍쳐', 'UI 라이브러리 개발', 'AWS Personalize', '키클락', '클린 코어'
];

const ISSUE_ITEMS: PropTypes[] = [
  {
    chipLabel: 'chip',
    title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서',
    summary: '최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점..',
    usePinIcon: true,
    useNewWindowIcon: true,
    summaryClass: 'caption-xl-regular bg-bg-primary_light p-[20px] text-[#797979]'
  },
  // ... (나머지 5개 아이템 복사)
];

const FlawDbPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownState, setDropdownState] = useState({ dropWidth: 200, dropStandard: '정렬 기준', downMenus: [] });
  
  const totalItems = ISSUE_ITEMS.length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 1;
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = ISSUE_ITEMS.slice(startIndex, endIndex);

  return (
    <div className='w-[1313px] h-[2028px] flex flex-col gap-[76px] mt-[27px] mb-[19px]'>
      <div className='w-[1313px] h-[1916px] mx-auto box-border'>
        <div className='w-full h-[390px] flex gap-[28px] mb-[76px]'>
          <ImageLinkCard link={''} backgroundImg={''} size='large' title='[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서' className='w-[625px] h-[390px]'/>
          <ImageLinkCard link={''} backgroundImg={''} size='small' title='2023년 12월 CNNVD 호환 서비스 신제품 발표' className='w-[316px] h-[390px]'/>
          <ImageLinkCard link={''} backgroundImg={''} size='small' title='[취약성 보고서] CISCO IOS XE 소프트웨어의 보안 취약점에 대한 CNNVD의 보고서' className='w-[316px] h-[390px]'/>
        </div>
        <div className='w-[1313px] h-[1450px] flex gap-[102px]'>
          <div className='w-[865px] h-[1450px]'>
            <div className='w-[105px] h-[29px] subtitle-md-bold mb-4'>취약점 DB</div>
            <div className='w-[133px] h-[35px] flex gap-3 mb-4'>
              <Chip text='HOT' color='bg-accent-red' size='suggestion' variant='suggestion' className='text-white'/>
              <Chip text='NEW' color='bg-[#E8E8E8]' size='suggestion' variant='suggestion' className='text-line-dark'/>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <Input placeholder="검색어를 입력하세요" className="w-[300px]" />
              <Dropdown dropdown={dropdownState} />
            </div>
            <div className='w-full h-[1354px] gap-4 flex flex-col'>
              {currentItems.map((currentItem, index) => (
                <ContentCard 
                  className='w-[865px] h-[258px]'
                  key={index} 
                  title={currentItem.title}
                  summary={currentItem.summary}
                  usePinIcon={currentItem.usePinIcon}
                  useNewWindowIcon={currentItem.useNewWindowIcon} 
                />
              ))}
            </div>
          </div>
          <div className='w-[346px] h-[664px] flex flex-col gap-4'>
            <div className='w-[156px] h-[68px] flex flex-col'>
              <div className='w-[134px] h-[29px] subtitle-md-bold mb-[17px]'>실시간 Topic</div>
              <div className='w-full h-[22px] subtitle-sm-medium text-text-gray-default'>03.08 10:00시 기준</div>
            </div>
            <div className='w-[346px] h-[580px] border border-line-default rounded-lg flex flex-col justify-center items-center px-5'>
              {TOPICS.map((topic, idx) => (
                <div className='w-full h-[54px] border-b border-line-light flex items-center subtitle-sm-medium text-text-gray-dark' key={idx}>{`${idx+1}. ${topic}`}</div>
              ))}
            </div>    
          </div>
        </div>
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroupSize={pageGroupSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FlawDbPage;