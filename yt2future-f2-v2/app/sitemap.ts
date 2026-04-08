import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';
import { getCanonicalBaseUrl } from '@/lib/seo';

const baseUrl = getCanonicalBaseUrl();

function seoNoindexEn(): boolean {
  return process.env.SEO_NOINDEX_EN === 'true' || process.env.NEXT_PUBLIC_SEO_NOINDEX_EN === 'true';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const indexLocales = seoNoindexEn() ? (['vi'] as const) : locales;

  // Common routes in the application
  const routes = ['', '/about', '/investment', '/contact', '/sector', '/signin', '/signup'];

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
              },
            },
      });
    });
  });

  return sitemapEntries;
}
