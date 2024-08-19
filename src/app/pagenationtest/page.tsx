import React from 'react';
import Pagenation from '@/components/atoms/pagenation/Pagenation';



const PagenationTest = () => {
  return (
    <>
      <Pagenation 
        pageWidth={1313}
        pageHeight={2028}
        itemsPerPage={3} 
        pageGroupSize={10}
      >
        {Array.from({ length: 53 }, (_, index) => (
          <div key={index}>
            `${index + 1}입니다.`
          </div>
        ))}
      </Pagenation>
    </>
  );
};

export default PagenationTest;