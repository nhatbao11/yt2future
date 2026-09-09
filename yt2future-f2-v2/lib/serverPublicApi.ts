/**
 * Lấy API Base URL của backend Express khi gọi từ Server (Server Component / Route Handler / Metadata).
 * Tự động ưu tiên INTERNAL_API_ORIGIN, LOCAL_API_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_BE_URL.
 * Luôn chuẩn hóa có đuôi `/api` và không bị thừa/thiếu gạch chéo.
 */
export function getServerPublicApiBase(): string {
  const candidates = [
    process.env.INTERNAL_API_ORIGIN,
    process.env.LOCAL_API_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_BE_URL,
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim();
    if (!trimmed || !/^https?:\/\//i.test(trimmed)) continue;
    const withoutSlash = trimmed.replace(/\/+$/, '');
    return withoutSlash.endsWith('/api') ? withoutSlash : `${withoutSlash}/api`;
  }

  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return 'https://yt2future-backend.vercel.app/api';
  }

  return 'http://localhost:5000/api';
}

export const getBackendApiUrl = getServerPublicApiBase;
