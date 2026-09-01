import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 409) {
        return NextResponse.json({ error: 'Duplicate email' }, { status: 409 });
      }
      return NextResponse.json(
        { error: data.message || 'Error subscribing' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
