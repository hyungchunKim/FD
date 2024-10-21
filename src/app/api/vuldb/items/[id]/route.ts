import { NextResponse } from 'next/server';
import { db } from "@/libs/firebase/firebaseDb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // URL에서 동적 id 가져옴
  console.log('id: ', id);

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Firebase에서 특정 컬렉션 내 문서를 id로 가져옴
    const docRef = db.collection('flawdb').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const data = doc.data();

    // 필요한 필드만 반환
    const responseData = {
      id: doc.id,
      title: data?.title || '',
      publishedTime: data?.publishedTime || '',
      savedTime: data?.savedTime || '',
      detailContent: data?.detailContent || '',
      isPinned: data?.isPinned || false,
      isClicked: data?.isClicked || 0,
      url: data?.url || '',
    };

    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://flaw-detector-fd.vercel.app'); // 특정 도메인만 허용
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://flaw-detector-fd.vercel.app'); // 특정 도메인만 허용

    return new NextResponse(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers,
    });
  }
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'https://flaw-detector-fd.vercel.app'); // 특정 도메인만 허용
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new NextResponse(null, { headers });
}
