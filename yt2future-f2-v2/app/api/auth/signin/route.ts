import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBackendApiUrl } from '@/lib/serverPublicApi';

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

interface BackendLoginResult {
  success?: boolean;
  message?: string;
  token?: string;
  user?: unknown;
  error?: {
    message?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and Password are required' }, { status: 400 });
    }

    // Call Backend API
    const backendApiUrl = getBackendApiUrl();
    const backendRes = await fetch(`${backendApiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const contentType = backendRes.headers.get('content-type') || '';
    let result: BackendLoginResult | null = null;
    if (contentType.includes('application/json')) {
      try {
        result = (await backendRes.json()) as BackendLoginResult;
      } catch {
        result = null;
      }
    } else {
      const errorText = await backendRes.text().catch(() => '');
      console.error(
        `Backend returned non-JSON response from ${backendApiUrl}/auth/login (status ${backendRes.status}):`,
        errorText.slice(0, 300)
      );
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          message:
            result?.message ||
            result?.error?.message ||
            (backendRes.status === 404
              ? 'Không tìm thấy API xác thực trên server'
              : `Đăng nhập thất bại (${backendRes.status})`),
        },
        { status: backendRes.status }
      );
    }

    // Set Cookie
    const token = result?.token;
    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('yt2future_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return NextResponse.json({
        message: result?.message || 'Login successful',
        token,
        user: result?.user,
      });
    } else {
      return NextResponse.json(
        { message: result?.message || 'Backend did not return token' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { message: getErrorMessage(error, 'Internal Server Error') },
      { status: 500 }
    );
  }
}
