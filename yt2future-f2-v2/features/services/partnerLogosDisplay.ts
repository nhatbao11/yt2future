import type { PartnerLogo } from './types';

/**
 * Chuẩn hoá URL logo:
 * - Giữ nguyên `/...`, `//...`, `http(s)://...`
 * - Domain không kèm protocol (vd `res.cloudinary.com/...`) => tự thêm `https://`
 */
export function normalizePartnerLogoUrl(s: string): string {
  const t = s.trim();
  if (t.length < 4) return '';
  if (t.startsWith('/')) return t;
  if (t.startsWith('//')) return t;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/.*)?$/i.test(t)) return `https://${t}`;
  return '';
}

/** Chỉ coi là URL logo hợp lệ khi chuẩn hoá ra URL dùng được. */
export function isLikelyPartnerLogoUrl(s: string): boolean {
  return normalizePartnerLogoUrl(s).length > 0;
}

export function normalizePartnerLogoItem(raw: unknown): PartnerLogo | null {
  if (typeof raw === 'string') {
    const logoUrl = normalizePartnerLogoUrl(raw);
    return logoUrl ? { name: '', logoUrl } : null;
  }

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const name = typeof r.name === 'string' ? r.name.trim() : '';
  const rawUrl = typeof r.logoUrl === 'string' ? r.logoUrl : typeof r.url === 'string' ? r.url : '';
  const logoUrl = normalizePartnerLogoUrl(rawUrl);

  if (!name && !logoUrl) return null;
  return { name, logoUrl };
}

export function getPartnerLogoItemsFromLogos(
  partnerLogos: unknown[] | undefined | null
): PartnerLogo[] {
  return (partnerLogos ?? [])
    .map((item) => normalizePartnerLogoItem(item))
    .filter((item): item is PartnerLogo => Boolean(item?.logoUrl));
}

export function getPartnerLogoUrlsFromLogos(partnerLogos: unknown[] | undefined | null): string[] {
  return getPartnerLogoItemsFromLogos(partnerLogos).map((item) => item.logoUrl);
}
