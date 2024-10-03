"use client"

import React, { useEffect, useState } from 'react';
import PinIcon from '@/assets/icons/Pin.svg';
import Share from '@/assets/icons/Share.svg';
import Chip from '@/components/atoms/chips';
import DefaultCard from '@/components/organisms/card';
import { useParams } from 'next/navigation';
import { db, updateIsPinnedInFirebase } from '@/libs/firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore';
import PushPin from '@/assets/icons/PushPin.svg';
import { isLoggedIn } from '@/utils/auth';
import AuthModal from '@/components/atoms/modal/AuthModal';
import { useRouter } from 'next/navigation';

interface DetailContentDataProps {
  id: string;
  title: string;
  savedTime: string;
  publishedTime: string;
  detailContent: string;
  isPinned: boolean;
  isClicked: number;
  url: string;
}

interface HotDataProps {
  id: string;
  title: string;
  usePinIcon: boolean;
  useNewWindowIcon: boolean;
  savedTime: string;
  isPinned: boolean;
  url: string;
  isClicked: number;
}

const UIDBPage: React.FC<DetailContentDataProps & HotDataProps> = ()  => {
  
  const { id } = useParams();
  const validId = Array.isArray(id) ? id[0] : id;
  console.log(id);
  const [data, setData] = useState<DetailContentDataProps | null>(null);
  const [hotDatas, setHotDatas] = useState<HotDataProps[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/"); // 로그인되지 않았을 경우 로그인 페이지로 리디렉션
  }

  useEffect(() => {
    const fetchContentData = async () => {
      if (validId) {
        try {
          const response = await fetch(`http://localhost:3000/api/vuldb/items/${validId}`);
          console.log('Response:', response);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log('Fetched data for ID:', id);
          console.log('Data:', data);
          setData(data);

          const docRef = doc(db, 'flawdb', validId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const docData = docSnap.data();
            const currentClickCount = docData.isClicked || 0;

            // isClicked 값을 +1로 업데이트
            await updateDoc(docRef, {
            isClicked: currentClickCount + 1
          });
          console.log('isClicked 값이 업데이트 되었습니다.');
        } else {
          console.error('해당 ID의 문서가 존재하지 않습니다.');
        }

        } catch (error) {
          console.error('Error fetching article:', error);
        }
      }
    };
  
    fetchContentData();
  }, [validId]);

  useEffect(() => {
    const fetchHotDatas = async () => {
      try {
        const q = query(
          collection(db, 'flawdb'), // Firestore 컬렉션 이름으로 변경
          orderBy('isClicked', 'desc'),
          limit(7)
        ); // isClicked가 높은 순서로 정렬하고 상위 7개 가져오기
  
        const querySnapshot = await getDocs(q);
        const snapHotDatas: HotDataProps[] = querySnapshot.docs.map(doc => {
          const hotData = doc.data() || {}; // 데이터 가져오기
  
          return {
            id: hotData.id, // Firestore 문서 ID 사용
            title: hotData.title || '',
            usePinIcon: true, // 고정값
            useNewWindowIcon: true, // 고정값
            savedTime: hotData.savedTime || '',
            isPinned: hotData.isPinned || false,
            isClicked: hotData.isClicked || 0,
            url: hotData.url || ''
          } as HotDataProps;
        });
        
        if (snapHotDatas.length === 7) {
          const filteredHotDatas = snapHotDatas.filter(hotData => hotData.id !== validId);
          setHotDatas(filteredHotDatas);
        } else {
            setHotDatas(snapHotDatas);
        }

      } catch (error) {
        console.error('Error fetching related articles:', error);
      }
    };
  
    fetchHotDatas();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      setIsAuth(loggedIn);
      console.log('isAuth는: ', loggedIn);
    };
  
      checkAuth();
  }, []);

  const handlePinIconClick = async (id: string): Promise<void> => {
    console.log('pinned 클릭됨');
    
    // hotDatas 배열에서 핀 상태 및 클릭 수 업데이트
    const updatedItems = hotDatas.map((hotData) => {
      if (hotData.id === id) {
        console.log('id', id);
        console.log('hotDataId', hotData.id);
        const updatedItem = { 
          ...hotData, 
          isPinned: !hotData.isPinned, 
        };
        console.log('업데이트된 항목:', updatedItem);
        return updatedItem;
      }
      return hotData;
    });
  
    // Firebase 업데이트
    try {
      // updatedItems에서 id와 일치하는 항목 찾기
      const updatedItem = updatedItems.find(item => item.id === id);
      
      if (updatedItem) {
        console.log('Firebase에 업데이트할 값 : ', updatedItem);
        await updateIsPinnedInFirebase(id, updatedItem.isPinned);
        
        // 상태 업데이트
        setHotDatas(updatedItems);
      } else {
        console.error("Updated item not found in updatedItems array");
      }
    } catch (error) {
      console.error("Error updating state after Firebase update:", error);
    }
  
    // 디버깅을 위한 로그 추가
    console.log("hotDatas:", hotDatas);
    console.log("updatedItems:", updatedItems);
  };

  const handlePin = async (id: string): Promise<void> => {
    console.log('위의 pinned 클릭됨');

    // id가 일치하는지 확인
    if (data && data.id === id) {
        // isPinned 값을 반전
        const updatedData = { ...data, isPinned: !data.isPinned };

        // Firebase 업데이트
        try {
            await updateIsPinnedInFirebase(id, updatedData.isPinned);
            setData(updatedData); // 상태 업데이트
        } catch (error) {
            console.error("Error updating state after Firebase update:", error);
        }
    } else {
        console.error("Data is null or ID does not match.");
    }
  };

  const handleCopyLink = async (id: string): Promise<void> => {

    // id가 일치하는지 확인
    if (data && data.id === id) {

      const copiedLink = data.url

      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(copiedLink)
          .then(() => {
              console.log('링크 복사 완료');
              alert('링크가 클립보드에 복사되었습니다!')
          })
        }
      } catch (error) {
          console.error("Error updating state after Firebase update:", error);
      }
    } 
  };

  useEffect(() => {
    console.log(hotDatas);
  }, [hotDatas])

  return (
    <div className="w-[1314px] h-full font-inter mx-auto">
      <AuthModal isAuth={isAuth} onClose={closeModal}>
        <h2 className="text-lg font-semibold">접근 불가</h2>
        <p className="mt-2">로그인이 필요합니다..!</p>
        <p className="mt-2">창을 닫으면 잠시후 홈화면으로 이동합니다.</p>
        <button
          className="mt-8 px-4 py-2 bg-purple-600 text-white rounded-[10px] cursor-pointer"
          onClick={closeModal}
        >
          닫기
        </button>
      </AuthModal>
      <main className="w-full mx-auto">
        <div className="mb-8 border-b border-line-defalt pb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-text-gray-dark pr-8">
                {data?.title}
              </h1>
            </div>
          <div className="flex items-start space-x-2">
            <div className='cursor-pointer' onClick={(e) => { e.stopPropagation; handlePin(validId);}}>
              {data?.isPinned ? <PushPin/> : <PinIcon/>}
            </div>
            <div className='cursor-pointer' onClick={(e) => { e.stopPropagation; handleCopyLink(data?.id as string) }} >
              <Share />
            </div>
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
            <div className="flex-grow pr-12 whitespace-pre-wrap">
              <div dangerouslySetInnerHTML={{ __html: data?.detailContent || "" }} />
            </div>
          </div>
          <div className="border-t border-line-defalt my-8"></div>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">최신 정보글</h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {hotDatas.map((hotData, index) => (
              <DefaultCard
                key={index}
                className='w-[414px] h-[278px] rounded-[20px]'
                title={hotData.title}
                chipLabel={<Chip text={"New"} color="bg-accent-orange text-white" className="text-white w-[57px] h-[38px] body-md-bold rounded-[999px] mb-2"/>}
                usePinIcon={true}
                useNewWindowIcon={true}
                createDate={hotData.savedTime}
                isPinned={hotData.isPinned}
                id={hotData.id}
                headerClass="mt-1 mb-10 flex flex-col justify-start"
                handlePinIconClick={() => handlePinIconClick(hotData.id)}
                isStackedLocation={true}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UIDBPage;
