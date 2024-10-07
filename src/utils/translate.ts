import { v2 } from '@google-cloud/translate';
import dotenv from 'dotenv';
import { TranslationServiceClient } from '@google-cloud/translate';

dotenv.config();

// v2.Translate 인스턴스 생성 시 자격 증명 정보 직접 전달
const translate = new v2.Translate({
  credentials: {
    type: process.env.TRANSLATE_KEY_TYPE,
    project_id: process.env.TRANSLATE_PROJECT_ID,
    private_key_id: process.env.TRANSLATE_PRIVATE_KEY_ID,
    client_email: process.env.TRANSLATE_CLIENT_EMAIL,
    client_id: process.env.TRANSLATE_CLIENT_ID,
    private_key: process.env.TRANSLATE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // 줄바꿈 복원
  },
});

// 번역 함수 정의
export async function translateText(text: string, targetLang: string = 'ko'): Promise<string> {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}

export default translate;


