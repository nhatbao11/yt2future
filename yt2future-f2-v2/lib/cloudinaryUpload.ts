/**
 * Tải file trực tiếp từ trình duyệt lên Cloudinary bằng Signed Upload.
 * Giải pháp này vượt qua giới hạn cứng 4.5MB của Vercel Serverless Function,
 * cho phép tải file PDF báo cáo lớn (10MB, 20MB, 50MB+) mà không bao giờ gặp lỗi 413 Content Too Large.
 */
export async function uploadToCloudinaryDirect(
  file: File,
  folder: 'yt_reports/pdf' | 'yt_reports/thumbnails' | string,
  resourceType: 'raw' | 'image' | 'auto' = 'auto'
): Promise<string> {
  // 1. Xin chữ ký bảo mật từ Next.js Route Handler
  const signRes = await fetch('/api/cloudinary/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });

  if (!signRes.ok) {
    const errorData = await signRes.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Không thể tạo chữ ký tải lên Cloudinary');
  }

  const { signature, timestamp, apiKey, cloudName } = await signRes.json();

  // 2. Gửi file trực tiếp từ browser lên Cloudinary CDN
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    const errorData = await uploadRes.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Lỗi khi tải file lên Cloudinary');
  }

  const data = await uploadRes.json();
  return data.secure_url as string;
}
