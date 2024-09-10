import admin from 'firebase-admin';

interface TranslationData {
  title: string;
  publishedTime: string;
  summary: string;
}

// 환경 변수에서 서비스 계정 키 JSON 문자열을 불러와 파싱
const serviceAccount = require('../../fd-6aea3-firebase-adminsdk-t7blu-a3caea7018.json')

// Firebase Admin SDK 초기화 (환경 변수에서 불러온 서비스 계정 키 사용)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firestore 데이터베이스에 접근
export const db = admin.firestore();

export async function saveToFirestore(data: TranslationData): Promise<void> {
  const docRef = db.collection('flawdb').doc();
  await docRef.set(data);
}