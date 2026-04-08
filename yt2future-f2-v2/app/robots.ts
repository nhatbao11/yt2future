import { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/profile/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
