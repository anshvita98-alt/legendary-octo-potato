
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const ipfsUrl = `https://ipfs.io/ipfs/${path}`;

  try {
    const res = await fetch(ipfsUrl);

    if (!res.ok) {
      return new NextResponse('Failed to fetch from IPFS', { status: res.status });
    }

    const contentType = res.headers.get('content-type');
    const body = await res.arrayBuffer();

    const headers = new Headers();
    if (contentType) {
      headers.set('Content-Type', contentType);
    }
    
    return new NextResponse(body, { status: 200, headers });

  } catch (error) {
    console.error(`Error fetching from IPFS: ${error}`);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
