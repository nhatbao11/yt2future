import type { Metadata } from 'next';

export function getCanonicalBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://yt2future.com';

  try {
    const url = new URL(raw);
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.replace(/^www\./, '');
    }
    url.pathname = '';
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return 'https://yt2future.com';
  }
}

/** Khớp `SEO_NOINDEX_EN` trong sitemap / layout — không index /en khi bật. */
export function seoNoindexEn(): boolean {
  return process.env.SEO_NOINDEX_EN === 'true' || process.env.NEXT_PUBLIC_SEO_NOINDEX_EN === 'true';
}

/**
 * path: '' (home), '/about', '/services' — không gồm locale.
 * Dùng cho `alternates.languages` (hreflang) trên từng URL công khai.
 */
export function buildLanguageAlternates(
  path: string
): NonNullable<Metadata['alternates']>['languages'] {
  const base = getCanonicalBaseUrl();
  const suffix = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  const vi = `${base}/vi${suffix}`;
  if (seoNoindexEn()) {
    return { vi, 'x-default': vi };
  }
  const en = `${base}/en${suffix}`;
  return { vi, en, 'x-default': vi };
}

export function absoluteUrl(locale: string, path: string): string {
  const base = getCanonicalBaseUrl();
  const suffix = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${base}/${locale}${suffix}`;
}
