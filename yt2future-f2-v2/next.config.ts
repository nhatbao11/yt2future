import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Docker / self-host: tạo `.next/standalone` + `server.js` */
  output: 'standalone',
  turbopack: {
    // Monorepo có nhiều lockfile, khóa root về đúng app FE
    root: projectRoot,
  },
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    // Dev: luôn proxy tới backend local.
    // Production: set `INTERNAL_API_ORIGIN` (vd. http://127.0.0.1:5000) nếu chạy monolith;
    // hoặc để Nginx proxy + `app/api/[[...path]]/route.ts` xử lý khi không dùng rewrite.
    const fromEnv = process.env.INTERNAL_API_ORIGIN?.trim().replace(/\/$/, '');
    const target =
      fromEnv || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');
    if (!target) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${target}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.yt2future.com' }],
        destination: 'https://yt2future.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
