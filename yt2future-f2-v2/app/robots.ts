import { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*/admin',
        '/*/admin/',
        '/*/profile',
        '/*/profile/',
        '/admin/',
        '/profile/',
        '/api',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ''),
  };
}
