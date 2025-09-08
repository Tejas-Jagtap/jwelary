import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req: NextRequest) {
  const url = `${BACKEND_URL}/api/auth/login`;
  const body = await req.text();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
      },
      body,
      redirect: 'manual',
    });
    const data = await res.json().catch(() => ({}));

    // Forward any Set-Cookie from backend to client
    const response = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) response.headers.set('set-cookie', setCookie);
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Upstream login failed' }, { status: 502 });
  }
}
