import axios, { AxiosError } from 'axios';
import type { ApiEnvelope } from '@/types/api';

export class ApiClientError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const getLocale = () => {
  if (typeof window === 'undefined') return 'vi';
  const path = window.location.pathname;
  return path.startsWith('/en') ? 'en' : 'vi';
};

/**
 * Cookie `yt2future_token` được set trên **cùng origin** với Next (`/api/auth/signin`).
 * Gọi thẳng `http://localhost:5000/api` từ trình duyệt → cookie không gửi → 401 → thống kê admin = 0.
 * Mặc định trên client: `/api` (rewrite dev → BE). Server / test: `http://localhost:5000/api`.
 */
/** Dùng cho fetch thủ công (Navbar, FeedbackHome) — cùng logic với axios. */
export function getApiBaseURL(): string {
  const explicit = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (typeof window !== 'undefined') {
    // Local browser + cross-origin API URL => dễ rơi vào 401 do cookie không đi kèm.
    // Ưu tiên same-origin `/api` để Next rewrite/proxy chuyển tiếp đúng.
    if (explicit) {
      try {
        const parsed = new URL(explicit, window.location.origin);
        const isLocalBrowser =
          window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isCrossOrigin = parsed.origin !== window.location.origin;
        if (isLocalBrowser && isCrossOrigin) return '/api';
      } catch {
        return explicit;
      }
      return explicit;
    }
    return '/api';
  }

  if (explicit) return explicit;
  return 'http://localhost:5000/api';
}

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseURL();
  config.headers['Accept-Language'] = getLocale();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiEnvelope>) => {
    const status = error.response?.status;
    const payload = error.response?.data;
    const message =
      payload?.error?.message || payload?.message || error.message || 'Request failed';
    const code = payload?.error?.code;
    const details = payload?.error?.details;
    return Promise.reject(new ApiClientError(message, status, code, details));
  }
);

export default api;
