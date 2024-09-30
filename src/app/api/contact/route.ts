import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../../../nodemailerConfig";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json(); // 요청의 JSON 데이터를 가져옵니다.
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "모든 필드를 채워주세요." },
        { status: 400 },
      );
    }

    try {
      const mailHtml = `
        <h1>문의 내용</h1>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong></p>
        <p>${message}</p>
      `;

      // 보내는 이메일 주소를 자신이나 관리자 이메일로 변경
      await sendMail("t2409181602@gmail.com", "새로운 문의 요청", mailHtml);

      return NextResponse.json(
        { message: "문의가 성공적으로 전송되었습니다." },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "메일 전송 중 오류가 발생했습니다.", error },
        { status: 500 },
      );
    }
  } else {
    // 다른 메서드가 호출된 경우 405 에러 반환
    return NextResponse.json(
      { message: "허용되지 않은 메서드입니다." },
      { status: 405 },
    );
  }
}
