import type { CorsOptions } from 'cors';

const DEFAULT_ORIGINS = [
  'https://yt2future.com',
  'https://www.yt2future.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

/** Danh sách origin được phép — đọc từ CORS_ORIGINS (phân tách bằng dấu phẩy). Production: không khớp → từ chối. */
export function getCorsOptions(): CorsOptions {
  const raw = process.env.CORS_ORIGINS?.trim();
  const origins = raw
    ? raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : DEFAULT_ORIGINS;

  return {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (origins.includes(origin)) {
        callback(null, true);
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[CORS] cho phép origin (dev):', origin);
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  };
}
