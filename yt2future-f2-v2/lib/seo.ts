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
