import { NextResponse } from 'next/server';
import { db } from '../../../libs/firebase/firebaseDb'; // Firebase 초기화가 된 파일 경로

export async function GET() {
  try {
    // Firestore에서 'flawdb' 컬렉션의 데이터를 가져옴, 'savedTime' 기준으로 최신순으로 정렬
    const snapshot = await db.collection('flawdb')
      .orderBy('savedTime', 'desc') // 최신순으로 정렬
      .select('id', 'title', 'summary', 'savedTime') // 필요한 필드만 선택
      .get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id, // 문서의 ID
      ...doc.data() // 문서의 데이터
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error retrieving data from Firestore:', error);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}