"use client"

import React, { useEffect, useState } from 'react';
import PinIcon from '@/assets/icons/Pin.svg';
import Share2Icon from '@/assets/icons/Share2.svg';
import Chip from '@/components/atoms/chips';
import DefaultCard from '@/components/organisms/card';
import { useParams } from 'next/navigation';

interface DetailContentDataProps {
  title: string;
  savedTime: string;
  publishedTime: string;
  detailContent: string;
}

const relatedArticles = [
  { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
  { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
  { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
  { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
  { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
  { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', day: "2024년 9월 19일" },
];

const UIDBPage: React.FC<{ article: { tag: string; title: string; content: string; daysAgo: number } }> = ()  => {
  
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState<DetailContentDataProps | null>(null);

  useEffect(() => {
    const fetchContentData = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3000/api/vuldb/items/${id}`);
          console.log('Response:', response);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log('Fetched data for ID:', id);
          console.log('Data:', data);
          setData(data);
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      }
    };
  
    fetchContentData();
  }, [id]);

  return (
    <div className="w-[1314px] h-full font-inter mx-auto">
      <main className="w-full mx-auto">
        <div className="mb-8 border-b border-line-defalt pb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-grow">
              <Chip
                text="HOT"
                color="bg-accent-red text-white"
                className="text-white w-[57px] h-[38px] body-md-bold rounded-[999px] mb-2"
              />
              <h1 className="text-3xl font-bold text-text-gray-dark pr-8">
                {data?.title}
              </h1>
            </div>
          <div className="flex items-start space-x-2">
            <PinIcon />
            <Share2Icon />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-text-gray-defalt">취약성 뉴스 세부정보</span>
          <span className="text-text-gray-defalt">업로드시간 | {data?.savedTime}</span>
          <span className="text-text-gray-defalt">출시시간 | {data?.publishedTime}</span>
        </div>
        </div>
        <div className="text-text-gray-dark mb-8 relative">
          <div className="flex items-start">
            <div className="flex-grow pr-12">
              {data?.detailContent}
            </div>
          </div>
          <div className="border-t border-line-defalt my-8"></div>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">비슷한 정보글</h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {relatedArticles.map((article, index) => (
              <DefaultCard
                key={index}
                className='w-[414px] h-[278px] rounded-[20px]'
                title={article.title}
                chipLabel={<Chip text={article.tag} color="bg-accent-red text-white" className="text-white w-[57px] h-[38px] body-md-bold rounded-[999px] mb-2"/>}
                usePinIcon={true}
                useNewWindowIcon={true}
                createDate={article.day}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UIDBPage;