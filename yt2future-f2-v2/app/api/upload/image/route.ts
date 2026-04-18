import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';

const MAX_BYTES = 6 * 1024 * 1024;

const ALLOWED_FOLDERS = new Set(['services/catalog', 'services/partners']);

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

function resolveBackendApiBase(): string {
  const candidates = [
    process.env.INTERNAL_API_ORIGIN,
    process.env.LOCAL_API_URL,
    process.env.NEXT_PUBLIC_API_URL,
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim();
    if (!trimmed || !/^https?:\/\//i.test(trimmed)) continue;
    const withoutSlash = trimmed.replace(/\/$/, '');
    return withoutSlash.endsWith('/api') ? withoutSlash : `${withoutSlash}/api`;
  }

  return 'http://localhost:5000/api';
}

async function requireAdmin(token: string): Promise<NextResponse | null> {
  const authRes = await fetch(`${resolveBackendApiBase()}/auth/me`, {
    headers: { Cookie: `yt2future_token=${token}` },
    cache: 'no-store',
  });

  if (!authRes.ok) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = (await authRes.json()) as { user?: { role?: string } };
  if (data.user?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('yt2future_token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const authError = await requireAdmin(token);
    if (authError) return authError;

    const folderParam = req.nextUrl.searchParams.get('folder') ?? 'services/catalog';
    if (!ALLOWED_FOLDERS.has(folderParam)) {
      return NextResponse.json({ message: 'Invalid folder' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: 'Missing file' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ message: 'Only image files are allowed' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ message: 'File too large (max 6MB)' }, { status: 400 });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = (await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderParam,
          upload_preset: 'yt2future',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result?.secure_url) resolve(result);
          else reject(new Error('Cloudinary upload returned no URL'));
        }
      );
      stream.end(buffer);
    })) as { secure_url: string };

    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error: unknown) {
    console.error('[upload/image]', error);
    return NextResponse.json({ message: getErrorMessage(error, 'Upload failed') }, { status: 500 });
  }
}
