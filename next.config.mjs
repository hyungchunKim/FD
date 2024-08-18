/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // React의 Strict Mode를 활성화하여 잠재적인 문제를 감지
  
    webpack: (config) => {
      // Webpack 설정을 커스터마이징하기 위해 기존 설정에 새로운 규칙을 추가
      config.module.rules.push({
        test: /\.svg$/, // `.svg` 파일을 찾는 정규식
        use: ["@svgr/webpack"], // `@svgr/webpack` 로더를 사용하여 SVG를 React 컴포넌트로 변환
      });
  
      return config; // 수정된 Webpack 설정을 반환
    },
  };
  
  export default nextConfig;
  