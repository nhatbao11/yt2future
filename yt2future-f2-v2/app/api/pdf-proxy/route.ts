import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

const ALLOWED_HOSTS = new Set(['res.cloudinary.com', 'api.cloudinary.com']);

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

function resolveCloudinaryFetchUrl(target: URL): string {
  // If target is already an authorized api.cloudinary.com download URL, use directly
  if (target.hostname === 'api.cloudinary.com') {
    return target.toString();
  }

  // Parse Cloudinary delivery URL: /<cloud_name>/<resource_type>/upload/(v<version>/)?<public_id>
  const match = target.pathname.match(
    /^\/([^\/]+)\/([^\/]+)\/upload\/(?:s--[^\/]+--\/)?(?:v\d+\/)?(.+)$/
  );
  if (!match) {
    return target.toString();
  }

  const [, cloudName, resourceType, rawPublicId] = match;
  const publicId = decodeURIComponent(rawPublicId);

  const cloud = process.env.CLOUDINARY_CLOUD_NAME || cloudName || 'da0gdcrzn';
  const apiKey = process.env.CLOUDINARY_API_KEY || '359258493484855';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'x04Jd8IGiI9HRIifLzIPEeV5OBM';

  cloudinary.config({
    cloud_name: cloud,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    return cloudinary.utils.private_download_url(publicId, '', {
      resource_type: resourceType,
      type: 'upload',
    });
  } catch {
    return target.toString();
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
  const fetchUrl = resolveCloudinaryFetchUrl(target);

  let upstream = await fetch(fetchUrl, {
    headers: range ? { Range: range } : undefined,
    cache: range ? 'no-store' : 'force-cache',
  });

  // Fallback to original URL if signed url fails
  if (!upstream.ok && upstream.status !== 206 && fetchUrl !== target.toString()) {
    upstream = await fetch(target.toString(), {
      headers: range ? { Range: range } : undefined,
      cache: range ? 'no-store' : 'force-cache',
    });
  }

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
