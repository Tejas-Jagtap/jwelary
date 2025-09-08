import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req: NextRequest) {
  const url = `${BACKEND_URL}/api/auth/logout`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });
    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) response.headers.set('set-cookie', setCookie);
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Upstream logout failed' }, { status: 502 });
  }
}
