import { v2 } from '@google-cloud/translate';

// v2.Translate 사용
const translate = new v2.Translate({
  keyFilename: '/Users/hyungjun/Documents/GitHub/FD/src/orbital-gantry-435220-e3-c971b94a8c24.json'
});

export async function translateText(text: string, targetLang: string = 'ko'): Promise<string> {
  try {
    // 번역 API 호출
    const [translation] = await translate.translate(text, targetLang);
    
    // 번역된 텍스트 반환
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}