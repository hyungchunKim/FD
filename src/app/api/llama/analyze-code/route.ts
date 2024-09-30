// src/app/api/lama/analyze-code/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { get_llama_analysis, extract_analysis_and_fix } from '@/libs/llama-utils';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ message: '코드가 제공되지 않았습니다.' }, { status: 400 });
    }

    const llamaResponse = await get_llama_analysis(code);

    if (!llamaResponse) {
      return NextResponse.json({ message: 'Llama API 응답을 받지 못했습니다.' }, { status: 500 });
    }

    const analysisResults = extract_analysis_and_fix(llamaResponse);
    return NextResponse.json(analysisResults);
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
