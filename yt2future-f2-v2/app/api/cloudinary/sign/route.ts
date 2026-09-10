import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('yt2future_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const folder = (body.folder as string) || 'yt_reports/pdf';

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'da0gdcrzn';
    const apiKey = process.env.CLOUDINARY_API_KEY || '359258493484855';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'x04Jd8IGiI9HRIifLzIPEeV5OBM';

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (error) {
    console.error('[cloudinary/sign] Error:', error);
    return NextResponse.json({ message: 'Failed to sign upload request' }, { status: 500 });
  }
}
