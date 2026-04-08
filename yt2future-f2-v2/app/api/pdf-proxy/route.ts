import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set(['res.cloudinary.com']);

function isAllowedPdfUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    if (!ALLOWED_HOSTS.has(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  if (!raw) {
    return NextResponse.json({ message: 'Missing url' }, { status: 400 });
  }

  const target = isAllowedPdfUrl(raw);
  if (!target) {
    return NextResponse.json({ message: 'Invalid pdf url' }, { status: 400 });
  }

  const range = req.headers.get('range');
  const upstream = await fetch(target.toString(), {
    headers: range ? { Range: range } : undefined,
    cache: range ? 'no-store' : 'force-cache',
  });

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ message: 'Cannot fetch pdf' }, { status: upstream.status });
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', 'inline; filename="report.pdf"');
  headers.set('Accept-Ranges', upstream.headers.get('accept-ranges') || 'bytes');
  headers.set('Vary', 'Range');
  headers.set(
    'Cache-Control',
    range ? 'private, no-store, max-age=0' : 'public, max-age=600, s-maxage=600'
  );

  const contentLength = upstream.headers.get('content-length');
  if (contentLength) headers.set('Content-Length', contentLength);

  const contentRange = upstream.headers.get('content-range');
  if (contentRange) headers.set('Content-Range', contentRange);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}
