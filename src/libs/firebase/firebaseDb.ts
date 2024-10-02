import admin from 'firebase-admin';
import serviceAccount from '../../fd-6aea3-firebase-adminsdk-t7blu-a3caea7018.json'; // JSON 파일을 import

interface TranslationData {
  title: string;
  publishedTime?: string;
  savedTime: string;
  summary?: string;
  detailContent?: string;
  url?: string;
}

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // 타입 캐스팅 추가
  });
}

// Firestore 데이터베이스에 접근
export const db = admin.firestore();

export async function saveToFirestore(data: TranslationData): Promise<void> {
  try {
    // 중복 확인: title 또는 url로 검색
    const existingDocs = await db.collection('flawdb')
      .where('title', '==', data.title) // title 필드를 기준으로 중복 검사
      .get();

    // 만약 같은 title을 가진 데이터가 이미 존재하면 저장하지 않음
    if (!existingDocs.empty) {
      console.log(`Duplicate data found for title: ${data.title}. Skipping save.`);
      return;
    }

    // 중복이 없다면 새 문서 생성 후 저장
    const docRef = db.collection('flawdb').doc();
    const docId = docRef.id;
    await docRef.set({ ...data, id: docId });
    console.log(`Data saved successfully for title: ${data.title}`);
    
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
}