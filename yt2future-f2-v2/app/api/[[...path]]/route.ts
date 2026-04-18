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
  const internal = process.env.INTERNAL_API_ORIGIN?.trim();
  if (internal) {
    return internal.replace(/\/$/, '');
  }
  const pub = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (pub && /^https?:\/\//i.test(pub)) {
    try {
      const u = new URL(pub);
      const path = u.pathname.replace(/\/$/, '');
      if (path === '/api' || path.endsWith('/api')) {
        return u.origin;
      }
      if (path) return `${u.origin}${path}`;
      return u.origin;
    } catch {
      /* fallthrough */
    }
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

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual',
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
