import Link from "next/link";
import React from "react";

const AgreementsPage = () => {
  return (
    <>
      <div className="content-w-full content-px-none">
        <div className="overflow-hidden bg-main-bg bg-[length:3856px_572px] bg-center">
          <div className="mx-auto flex h-[calc(100vh_-_572px)] w-full min-w-[1240px] max-w-[1920px] flex-col items-center justify-center align-bottom text-primary-500">
            <p className="title-md-bold mb-[10px] align-bottom">
              플로디텍터 일반 사용 약관
            </p>
            <p className="title-xs-regular mb-[30px] flex justify-center text-center">
              모든 사업 관계에서 귀하는 일련의 약관에 동의합니다. 본 약관은
              플로디텍터 사용에 대해 당사가 귀하와 체결한 계약입니다. 
              <br /> 발행일 : 2024.08.28
            </p>
          </div>
        </div>

        <div className="p-[97px]">
          <p className="title-sm-bold">제1조 (목적)</p>
          <p>
            이 약관은 회사가 제공하는 [플로디텍터] (이하 &quot;서비스&ldquo;)의 이용과
            관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로
            합니다.
          </p>

          <p className="title-sm-bold mt-3">제2조 (정의)</p>
          <p>
            1. &quot;서비스&ldquo;란 회사가 제공하는 웹사이트 및 애플리케이션을 통해
            이용자가 사용할 수 있는 모든 관련 서비스를 의미합니다.
          </p>
          <p>
            2. &quot;이용자&ldquo;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를
            말합니다.
          </p>
          <p>
            3. &quot;회원&ldquo;이란 회사의 서비스에 접속하여 본 약관에 동의하고,
            개인정보를 제공하여 회원 등록을 한 자를 의미합니다.
          </p>

          <p className="title-sm-bold mt-3">제3조 (약관의 게시 및 변경)</p>
          <p>
            1. 회사는 본 약관의 내용을 서비스 초기 화면이나 기타 방법으로
            게시합니다.
          </p>
          <p>
            2. 회사는 약관의 변경이 필요한 경우, 관련 법령에 따라 약관을 변경할
            수 있으며, 변경된 약관은 게시함으로써 효력이 발생합니다.
          </p>
          <p>
            3. 이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고
            회원 탈퇴를 요청할 수 있습니다. 변경된 약관의 효력 발생일 이후에도
            서비스를 계속 이용할 경우, 변경된 약관에 동의한 것으로 간주합니다.
          </p>

          <p className="title-sm-bold mt-3">제4조 (서비스 이용)</p>
          <p>
            1. 서비스는 회사의 운영 방침에 따라 정해진 시간 동안 제공됩니다.
            회사는 서비스의 내용과 방식, 이용시간 등을 변경할 수 있으며, 이 경우
            사전에 공지합니다.
          </p>
          <p>
            2. 이용자는 회사의 서비스 이용과 관련하여 법령 및 본 약관을
            준수하여야 합니다.
          </p>

          <p className="title-sm-bold mt-3">제5조 (이용자의 의무)</p>
          <p>1. 이용자는 다음 행위를 해서는 안 됩니다:</p>
          <ul className="p-3">
            <li>타인의 정보 도용</li>
            <li>회사의 지적 재산권 침해</li>
            <li>서비스 운영 방해</li>
            <li>법령에 위반되는 행위</li>
          </ul>
          <p>
            2. 이용자는 서비스 이용과 관련한 모든 행위에 대한 책임을 집니다.
          </p>

          <p className="title-sm-bold mt-3">제6조 (개인정보 보호)</p>
          <p>
            회사는 이용자의 개인정보를 적법하게 보호하며, 개인정보 처리방침에
            따라 처리합니다. 자세한 내용은{" "}
            <Link href="[개인정보 처리방침 링크]">개인정보 처리방침</Link>에서 확인할
            수 있습니다.
          </p>

          <p className="title-sm-bold mt-3">제7조 (서비스 중단)</p>
          <p>
            회사는 다음 각 호의 사유로 서비스 제공을 일시적으로 중단할 수
            있습니다:
          </p>
          <ul>
            <li>시스템 점검, 유지보수 또는 교체</li>
            <li>천재지변 또는 비상사태</li>
            <li>기타 불가피한 사유로 인한 서비스 중단</li>
          </ul>

          <p className="title-sm-bold mt-3">제8조 (계약 해지 및 이용 제한)</p>
          <p>
            1. 이용자는 언제든지 서비스 내의 탈퇴 기능을 통해 서비스 이용 계약을
            해지할 수 있습니다.
          </p>
          <p>
            2. 회사는 이용자가 본 약관 또는 관련 법령을 위반할 경우, 사전 통보
            없이 이용자의 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
          </p>

          <p className="title-sm-bold mt-3">제9조 (책임의 한계)</p>
          <p>
            1. 회사는 천재지변 또는 이용자의 과실로 인한 서비스 이용 장애에 대해
            책임을 지지 않습니다.
          </p>
          <p>
            2. 회사는 이용자가 서비스를 이용하면서 기대하는 이익을 얻지 못한
            것에 대하여 책임을 지지 않습니다.
          </p>

          <p className="title-sm-bold mt-3">제10조 (준거법 및 관할법원)</p>
          <p>
            본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여
            발생하는 모든 분쟁은 [회사 본사 소재지]의 관할 법원에 따릅니다.
          </p>

          <p className="title-sm-bold mt-3">부칙</p>
          <p>1. 이 약관은 [시행일]부터 적용됩니다.</p>
          <p>
            2. 본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
          </p>
        </div>
      </div>
    </>
  );
};

export default AgreementsPage;
