import axios, { AxiosError } from 'axios';
import type { ApiEnvelope } from '@/types/api';
import { getServerPublicApiBase } from '@/lib/serverPublicApi';

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
 * Khi chạy trên trình duyệt (client), BẮT BUỘC luôn gọi same-origin `/api` để:
 * 1. Trình duyệt tự động đính kèm cookie `yt2future_token` trong mọi request (admin stats, audit logs, v.v.).
 * 2. Next.js rewrite / proxy route handler chuyển tiếp an toàn sang Backend kèm Cookie.
 * Nếu gọi trực tiếp sang domain khác (vd yt2future-backend.vercel.app), trình duyệt sẽ chặn cookie do cross-origin, gây lỗi 401.
 */
/** Dùng cho fetch thủ công (Navbar, FeedbackHome) — cùng logic với axios. */
export function getApiBaseURL(): string {
  if (typeof window !== 'undefined') {
    return '/api';
  }

  return getServerPublicApiBase();
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
