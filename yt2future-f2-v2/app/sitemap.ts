import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';
import { getCanonicalBaseUrl, seoNoindexEn } from '@/lib/seo';

const baseUrl = getCanonicalBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const indexLocales = seoNoindexEn() ? (['vi'] as const) : locales;

  // Common routes in the application
  // Không đưa signin/signup: trang auth thường noindex, không cần ưu tiên trong sitemap
  const routes = ['', '/about', '/services', '/contact', '/sector', '/dashboard'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    indexLocales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: seoNoindexEn()
          ? {
              languages: {
                vi: `${baseUrl}/vi${route}`,
                'x-default': `${baseUrl}/vi${route}`,
              },
            }
          : {
              languages: {
                vi: `${baseUrl}/vi${route}`,
                en: `${baseUrl}/en${route}`,
                'x-default': `${baseUrl}/vi${route}`,
              },
            },
      });
    });
  });

  return sitemapEntries;
}
