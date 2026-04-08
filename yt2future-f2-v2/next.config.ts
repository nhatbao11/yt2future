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
    // Chỉ dùng rewrite khi development (local)
    // Production sẽ dùng Nginx làm reverse proxy
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ];
    }
    return [];
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
