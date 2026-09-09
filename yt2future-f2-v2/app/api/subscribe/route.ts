import { NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/serverPublicApi';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const backendUrl = getBackendApiUrl();
    const res = await fetch(`${backendUrl}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const contentType = res.headers.get('content-type') || '';
    let data: { message?: string } | null = null;
    if (contentType.includes('application/json')) {
      data = (await res.json().catch(() => null)) as { message?: string } | null;
    }

    if (!res.ok) {
      if (res.status === 409) {
        return NextResponse.json({ error: 'Duplicate email' }, { status: 409 });
      }
      return NextResponse.json(
        { error: data?.message || 'Error subscribing' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
