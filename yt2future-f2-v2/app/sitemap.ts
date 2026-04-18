import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';
import { getCanonicalBaseUrl, seoNoindexEn } from '@/lib/seo';
import { getServerPublicApiBase } from '@/lib/serverPublicApi';

const baseUrl = getCanonicalBaseUrl();

async function fetchServiceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${getServerPublicApiBase()}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { success?: boolean; services?: { slug: string }[] };
    if (!data.success || !Array.isArray(data.services)) return [];
    return data.services.map((s) => s.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const indexLocales = seoNoindexEn() ? (['vi'] as const) : locales;

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

  const slugs = await fetchServiceSlugs();
  slugs.forEach((slug) => {
    const path = `/services/${slug}`;
    indexLocales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
        alternates: seoNoindexEn()
          ? {
              languages: {
                vi: `${baseUrl}/vi${path}`,
                'x-default': `${baseUrl}/vi${path}`,
              },
            }
          : {
              languages: {
                vi: `${baseUrl}/vi${path}`,
                en: `${baseUrl}/en${path}`,
                'x-default': `${baseUrl}/vi${path}`,
              },
            },
      });
    });
  });

  return sitemapEntries;
}
