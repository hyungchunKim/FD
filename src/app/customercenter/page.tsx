const CustomerCenter = () => {
  return (
    <>
      <div className='border border-box border-transparent mt-[72px] mb-[124px]'>
        <div className="w-[562px] h-[79px] flex text-primary-500 border-4 border-primary-500 text-[40px] rounded-[999px] mx-auto">
          <div className="flex gap-6 mx-auto">
            <div className="flex items-center">
              <svg width="14.63" height="25.88" viewBox="0 0 16 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6939 23.5439C15.0109 23.861 15.189 24.2909 15.189 24.7393C15.189 25.1876 15.0109 25.6176 14.6939 25.9346C14.3769 26.2516 13.9469 26.4297 13.4986 26.4297C13.0503 26.4297 12.6203 26.2516 12.3033 25.9346L1.05328 14.6846C0.895956 14.5278 0.771132 14.3415 0.68596 14.1364C0.600788 13.9313 0.556946 13.7114 0.556946 13.4893C0.556946 13.2672 0.600788 13.0472 0.68596 12.8421C0.771132 12.637 0.895956 12.4507 1.05328 12.2939L12.3033 1.04394C12.6203 0.726926 13.0503 0.548828 13.4986 0.548828C13.9469 0.548828 14.3769 0.726926 14.6939 1.04394C15.0109 1.36096 15.189 1.79093 15.189 2.23925C15.189 2.68758 15.0109 3.11755 14.6939 3.43457L4.64062 13.4878L14.6939 23.5439Z" fill="#6100FF"/>
              </svg>
            </div>
            <div className="flex items-center">
              Customer Service center
            </div>
          </div>
        </div>
        <div className="w-[1538px] h-[817px] flex justify-between mt-[124px] mx-auto">
          <div className="w-[429px] h-[808px] flex flex-col justify-between">
            <div>
              <div className="w-full h-[180px] text-primary-500 title-xl-bold">
                서비스이용에
                <br/>
                문제가 생겼나요?
              </div>
              <div className="w-full h-[56px] text-text-default title-xs-medium mt-[30px]">
                이용하면서 문제가 생겼다면 언제든지 문의해주세요.
                <br/>
                서비스 개발과 성장에 큰 도움이 됩니다.
              </div>
            </div>
            <div className="w-[260px] h-[181px] flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="w-full h-[30px] title-xs-medium">
                  Email
                </div>
                <div className="w-full h-[27px] subtitle-sm-regular text-text-default">
                  justin@floatfactory.kr
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-[30px] title-xs-medium">
                  Address
                </div>
                <div className="w-full h-[27px] subtitle-sm-regular text-text-default">
                  서울 강서구 마곡중앙2로 11 305호
                </div>
              </div>
            </div>
          </div>
          <div className="w-[985px] h-[817px] border border-primary-500 rounded-[40px] flex flex-col items-center">
            <div className="w-[866px] h-[83px] flex flex-col justify-between mt-[60px] mb-8">
              <div className="w-[88px] h-9 subtitle-md-bold">문의하기</div>
              <div className="w-[524px] h-[24px] label-md-medium text-[#8f8f8f]">
                문의하고 싶은 내용을 구체적으로 작성해주셔야 패드백이 정상적으로 반영됩니다.
              </div>
            </div>
            <div className="w-[866px] h-[86px] flex flex-col justify-between mb-8">
              <div className="subtitle-sm-medium">Name</div>
              <input 
                className="w-[866px] h-[51px] border border-line-light subtitle-sm-medium indent-3 rounded-lg"
                placeholder="이름을 적어주세요."
              />
            </div>
            <div className="w-[866px] h-[86px] flex flex-col justify-between mb-8">
              <div className="subtitle-sm-medium">Email</div>
              <input 
                className="w-[866px] h-[51px] border border-line-light subtitle-sm-medium indent-3 rounded-lg text-[#c5c5c5]"
                value="justin@factory.kr"
                disabled
              />
            </div>
            <div className="w-[866px] h-[261px] flex flex-col justify-between mb-8">
              <div className="subtitle-sm-medium">Message</div>
              <textarea 
                className="w-[866px] h-[226px] border border-line-light subtitle-sm-medium indent-3 rounded-lg leading-[60px]"
                placeholder="내용을 적어주세요."
              />
            </div>
            <button className="w-[866px] h-[53px] bg-primary-500 rounded-lg text-white font-semibold text-3">문의 보내기</button>
          </div>
        </div>
      </div> 
    </>
  );
};

export default CustomerCenter;