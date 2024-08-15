import React from 'react';

const ProgressBar = () => {
  const progress: number = 70; // 일단 사용한 더미데이터
  const progressClass = `w-[${progress}%]`; // progress 값을 데이터로 받아와서 반영하는 방식
  
  return (
    <>
      <div className= "w-[1392px] h-3 bg-line-light rounded-xl">
        <div className={ `${progressClass} h-full bg-accent-green rounded-xl`}></div>
      </div>   
    </>
  );
};

export default ProgressBar;