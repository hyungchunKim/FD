import React from 'react';
import InfoBox from '@/components/atoms/infobox/infobox'; // InfoBox 컴포넌트의 경로를 수정했습니다

const TS4Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TypeScript 4.0 새로운 기능</h1>
      
      <InfoBox
        backgroundClass="bg-[#FFF3F3]"
        title="변수 및 속성의 타입 추론 개선"
        titleClass="text-[#FF6D6D]"
        description={[
          "TypeScript 4.0에서는 변수와 속성의 타입 추론이 개선되었습니다.",
          "이전 버전에서 발생하던 일부 타입 추론 오류가 해결되었습니다."
        ]}
        positionLink={{
          text: "관련 문서",
          class: "border-[#FF6D6D] text-[#FF6D6D]"
        }}
        codeSnippet={{
          language: "typescript",
          code: `
// TypeScript 4.0 이전
const obj = {
  prop: {
    nested: {
      value: 10
    }
  }
};
// 'value'의 타입이 명확하지 않을 수 있었습니다.

// TypeScript 4.0
const obj = {
  prop: {
    nested: {
      value: 10 as const // 'value'가 리터럴 타입 '10'으로 추론됩니다.
    }
  }
};
          `
        }}
      />

      <InfoBox
        backgroundClass="bg-[#F3F3FF]"
        title="Variadic Tuple Types"
        titleClass="text-[#6D6DFF]"
        description={[
          "TypeScript 4.0에서는 Variadic Tuple Types라는 새로운 기능이 도입되었습니다.",
          "이를 통해 튜플 타입을 더욱 유연하게 조작할 수 있게 되었습니다."
        ]}
        codeSnippet={{
          language: "typescript",
          code: `
type Strings = [string, string];
type Numbers = [number, number];

// 이전에는 불가능했던 작업
type StringsAndNumbers = [...Strings, ...Numbers];

// StringsAndNumbers는 이제 [string, string, number, number] 타입입니다.
          `
        }}
      />

      {/* 필요에 따라 더 많은 InfoBox 컴포넌트를 추가할 수 있습니다 */}
    </div>
  );
};

export default TS4Page;