import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy các request `/api/*` không có Route Handler riêng (vd. `/api/services`, `/api/admin/...`)
 * tới backend Express.
 *
 * - Dev: thường đã có rewrite trong `next.config.ts`; route này là lưới an toàn.
 * - Production (`next start`): bắt buộc nếu không dùng Nginx — mặc định `http://127.0.0.1:5000`.
 *
 * Ghi đè bằng `INTERNAL_API_ORIGIN` (vd. Docker: `http://api:5000`).
 */
function resolveBackendOrigin(): string {
  const candidates = [
    process.env.INTERNAL_API_ORIGIN,
    process.env.LOCAL_API_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_BE_URL,
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim();
    if (!trimmed || !/^https?:\/\//i.test(trimmed)) continue;
    try {
      const u = new URL(trimmed);
      return u.origin;
    } catch {
      /* fallthrough */
    }
  }

  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return 'https://yt2future-backend.vercel.app';
  }

  return 'http://127.0.0.1:5000';
}

function hopByHopHeaders(): Set<string> {
  return new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'host',
  ]);
}

async function proxy(req: NextRequest, pathSegments: string[] | undefined): Promise<Response> {
  const segments = pathSegments ?? [];
  const suffix = segments.length ? segments.map(encodeURIComponent).join('/') : '';
  const url = new URL(req.url);
  const targetUrl = `${resolveBackendOrigin()}/api/${suffix}${url.search}`;

  const headers = new Headers(req.headers);
  for (const h of hopByHopHeaders()) {
    headers.delete(h);
  }

  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    headers.set('cookie', cookieHeader);
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual',
    cache: 'no-store',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const buf = await req.arrayBuffer();
    if (buf.byteLength > 0) {
      init.body = buf;
    }
  }

  const res = await fetch(targetUrl, init);

  const outHeaders = new Headers(res.headers);
  outHeaders.delete('transfer-encoding');

  if ('getSetCookie' in res.headers && typeof res.headers.getSetCookie === 'function') {
    const setCookies = res.headers.getSetCookie();
    if (setCookies && setCookies.length > 0) {
      outHeaders.delete('set-cookie');
      for (const sc of setCookies) {
        outHeaders.append('set-cookie', sc);
      }
    }
  }

  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: outHeaders,
  });
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}
