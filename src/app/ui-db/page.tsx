import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import PinIcon from '@/assets/icons/Pin.svg';
import Share2Icon from '@/assets/icons/Share2.svg';
import InterfaceEssentialIcon from '@/assets/icons/Interface essential.svg';

const chipVariants = cva(
  'inline-flex items-center justify-center text-sm transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        input: 'bg-background-purple-light text-text-gray-dark rounded-lg',
        assist: 'bg-white border border-line-defalt rounded-full',
        filter: 'bg-white border border-line-defalt rounded-lg',
        suggestion: 'rounded-full',
      },
      size: {
        default: 'h-[35px] w-[221px]',
        small: 'h-[35px] w-[148px]',
        assist: 'h-[30px] min-w-[60px] text-xs px-3',
        filter1: 'h-[44px] px-4',
        filter2: 'h-[44px] w-[100px]',
        suggestion: 'h-[24px] w-[60px] text-xs px-2',
      },
    },
    defaultVariants: {
      variant: 'input',
      size: 'default',
    },
  }
);

interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  text: string;
  color?: string;
}

const Chip: React.FC<ChipProps> = ({
  className,
  variant,
  size,
  text,
  color,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        chipVariants({ variant, size }),
        color,
        className
      )}
      {...props}
    >
      <span className="truncate">{text}</span>
    </div>
  );
};

type VulnerabilityData = {
  id: number;
  name: string;
  cnnvd: string;
  cve: string;
  risk: '매우 위험함' | '위험';
  link: string;
};

const VulnerabilityHeader: React.FC = () => (
  <div className="mb-8 border-b border-line-defalt pb-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-grow">
        <Chip
          text="HOT"
          variant="suggestion"
          size="suggestion"
          color="bg-accent-red text-white"
          className="mb-2"
        />
        <h1 className="text-3xl font-bold text-text-gray-dark pr-8">
          [취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서
        </h1>
      </div>
      <div className="flex items-start space-x-2">
        <PinIcon />
        <Share2Icon />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-text-gray-defalt">취약성 뉴스 세부정보</span>
      <span className="text-text-gray-defalt">출시시간 | 2024.03.08 13:30:24</span>
    </div>
  </div>
);

const VulnerabilityContent: React.FC = () => (
  <div className="text-text-gray-dark mb-8 relative">
    <div className="flex items-start">
      <div className="flex-grow pr-12">
        <p className="mb-4">
          최근 Microsoft는 다양한 보안 취약점에 대한 공지를 공식적으로 발표했으며, 이 취약점 공지에는 총 80개의 취약점 패치가 발표되었습니다.
        </p>
        <p className="mb-4">
          Microsoft Azure 사이트 복구 보안 취약점(CNNVD-202402-1061, CVE-2024-21364), Microsoft Azure Kubernetes 보안 취약점(CNNVD-202402-1050, CVE-2024-21376) 및 기타 취약점을 포함합니다.
        </p>
        <p className="mb-8">
          위 취약점 악용에 성공한 공격자는 대상 시스템에서 임의 코드를 실행하고, 사용자 데이터를 획득하고, 권한을 상승시키는 등의 작업을 수행할 수 있습니다. 여러 Microsoft 제품 및 시스템이 이 취약점의 영향을 받습니다. 현재 마이크로소프트는 해당 취약점을 수정하기 위한 패치를 공식 출시하였으므로, 사용자들은 해당 취약점의 영향을 받는지 즉시 확인하고 조속히 패치 조치를 취할 것을 권고합니다.
        </p>
        <p className="mb-4">
          1. 취약점 소개
        </p>
        <p className="mb-4">
          2024년 2월 13일 Microsoft는 총 80개의 취약점에 대한 패치가 포함된 2024년 2월 보안 업데이트를 출시했습니다. CNNVD에는 이러한 취약점이 포함되어 있습니다. 이 업데이트는 주로 Microsoft Windows 및 Windows 구성 요소, Microsoft Azure Connected Machine Agent, Microsoft Hyper-V, Microsoft Azure, Microsoft Windows USB 직렬 드라이버, Microsoft Exchange Server 등에 적용됩니다. CNNVD는 매우 중요한 취약점 8개, 고위험 취약점 57개, 중간 위험 취약점 15개를 포함한 위험 수준을 평가했습니다. 여러 Microsoft 제품 및 시스템 버전이 이 취약점의 영향을 받습니다. 영향의 구체적인 범위는 Microsoft 공식 웹사이트에서 확인할 수 있습니다.
        </p>
        <a href="https://portal.msrc.microsoft.com/zh-cn/security-guidance" className="text-primary-puple-500 hover:underline block mb-8">
          https://portal.msrc.microsoft.com/zh-cn/security-guidance
        </a>
        <p className="mb-4">
          2. 취약점 세부정보
        </p>
        <p className="mb-4">
          이번 업데이트에는 매우 심각한 취약점 6개, 고위험 취약점 53개, 중간 위험 취약점 14개 등 새로운 취약점에 대한 총 73개의 패치가 포함되어 있습니다.
        </p>
      </div>
    </div>
    <div className="absolute bottom-0 right-0">
      
    </div>
    <div className="border-t border-line-defalt my-8"></div>
  </div>
);

const VulnerabilityTable: React.FC<{ data: VulnerabilityData[] }> = ({ data }) => {
  const headers = ['일련번호', '취약점 이름', 'CNNVD 번호', 'CVE 번호', '위험 수준', '공식 링크'];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b border-line-defalt">
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 text-left">
                <Chip
                  text={header}
                  variant="assist"
                  size="assist"
                  color="bg-white text-text-gray-dark border border-text-gray-dark"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-line-defalt">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-gray-dark">{row.id}</td>
              <td className="px-6 py-4 whitespace-normal text-sm text-text-gray-dark">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-gray-dark">{row.cnnvd}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-gray-dark">{row.cve}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-gray-dark">{row.risk}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-puple-500 hover:underline">
                <a href={row.link} target="_blank" rel="noopener noreferrer">링크</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RelatedArticleCard: React.FC<{ article: { tag: string; title: string; content: string; daysAgo: number } }> = ({ article }) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
    <div className="rounded-lg bg-white border border-line-defalt p-6 flex flex-col h-full">
      <Chip
        text={article.tag}
        variant="suggestion"
        size="suggestion"
        color={article.tag === 'HOT' ? 'bg-accent-red text-white' : 'bg-accent-blue text-white'}
        className="mb-2"
      />
      <h3 className="text-xl font-medium mt-2 mb-2 text-black">{article.title}</h3>
      <p className="text-text-gray-defalt mb-4 flex-grow">{article.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <PinIcon className="w-8 h-8" />
          <Share2Icon className="w-8 h-8" />
        </div>
        <span className="text-text-gray-defalt">{article.daysAgo}일 전</span>
      </div>
    </div>
  </div>
);

const UIDBPage: React.FC = () => {
  const vulnerabilityData: VulnerabilityData[] = [
    { id: 1, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1061', cve: 'CVE-2024-21364', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 2, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1050', cve: 'CVE-2024-21410', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 3, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1034', cve: 'CVE-2024-21413', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 4, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1032', cve: 'CVE-2023-50387', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 5, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1030', cve: 'CVE-2024-20667', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 6, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1028', cve: 'CVE-2024-20673', risk: '매우 위험함', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 7, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1127', cve: 'CVE-2024-21315', risk: '위험', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 8, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1097', cve: 'CVE-2024-21327', risk: '위험', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 9, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1096', cve: 'CVE-2024-21328', risk: '위험', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
    { id: 10, name: 'Microsoft Azure 사이트 복구 보안 취약점', cnnvd: 'CNNVD-202402-1091', cve: 'CVE-2024-21329', risk: '위험', link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21364' },
  ];

  const relatedArticles = [
    { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
    { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
    { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
    { tag: 'HOT', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
    { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
    { tag: 'NEW', title: '[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의..', content: '간략한 글 내용', daysAgo: 2 },
  ];

  return (
    <div className="bg-white min-h-screen font-inter">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <VulnerabilityHeader />
        <VulnerabilityContent />
        <VulnerabilityTable data={vulnerabilityData} />
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">비슷한 정보글</h2>
          <div className="flex flex-wrap -mx-4 gap-y-6">
            {relatedArticles.map((article, index) => (
              <RelatedArticleCard key={index} article={article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UIDBPage;