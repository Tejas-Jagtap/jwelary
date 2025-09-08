import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(req: NextRequest) {
  const url = `${BACKEND_URL}/api/auth/me`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
      },
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    // Backend returns the user object directly; forward as-is
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}
