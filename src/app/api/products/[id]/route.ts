import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = `${BACKEND_URL}/api/products/${id}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = `${BACKEND_URL}/api/products/${id}`;
  try {
    const body = await req.text();
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('cookie') || '',
      },
      body,
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = `${BACKEND_URL}/api/products/${id}`;
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Cookie': req.headers.get('cookie') || '',
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}
