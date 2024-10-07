import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Firebase Admin SDK 초기화

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,  // project_id 확인
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // 줄바꿈 복원
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientX509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

  // 서비스 계정 객체가 유효한지 확인
if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
  console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
  console.log('Firebase Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
  console.log('Firebase Private Key:', process.env.FIREBASE_PRIVATE_KEY);
  throw new Error('Firebase service account must include projectId, privateKey, and clientEmail');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();


interface TranslationData {
  title: string;
  publishedTime?: string;
  savedTime: string;
  summary?: string;
  detailContent?: string;
  url?: string;
  usePinIcon?: boolean;
  useNewWindowIcon?: boolean;
  isClicked?: number;
  isPinned?: boolean;
}

export async function saveToFirestore(data: TranslationData): Promise<void> {
  try {
    // 중복 확인: title 또는 url로 검색
    const existingDocs = await db.collection('flawdb')
      .where('title', '==', data.title)
      .get();

    // 중복 데이터가 있을 경우 저장하지 않음
    if (!existingDocs.empty) {
      console.log(`Duplicate data found for title: ${data.title}. Skipping save.`);
      return;
    }

    // 새 문서 생성 및 저장
    const docRef = db.collection('flawdb').doc();
    const docId = docRef.id;
    await docRef.set({ ...data, id: docId });
    console.log(`Data saved successfully for title: ${data.title}`);
    
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
}
