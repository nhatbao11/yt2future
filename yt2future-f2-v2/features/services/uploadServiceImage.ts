export type ServiceImageUploadFolder = 'services/catalog' | 'services/partners';

const MAX_BYTES = 6 * 1024 * 1024;

/** Upload ảnh lên Cloudinary qua `/api/upload/image` (cookie đăng nhập). Trả về `secure_url`. */
export async function uploadServiceImage(
  file: File,
  folder: ServiceImageUploadFolder
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('INVALID_IMAGE_TYPE');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('IMAGE_TOO_LARGE');
  }
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`/api/upload/image?folder=${encodeURIComponent(folder)}`, {
    method: 'POST',
    body: fd,
    credentials: 'same-origin',
  });
  const data = (await res.json()) as { message?: string; url?: string; success?: boolean };
  if (!res.ok) {
    throw new Error(data.message || 'UPLOAD_FAILED');
  }
  if (!data.url) {
    throw new Error('NO_URL');
  }
  return data.url;
}
