import type { SectionContent, ServiceListItem } from './types';
import { parseSectionContentUnknown } from '@/features/services/admin/sectionContentModel';
import { getPartnerLogoItemsFromLogos } from '@/features/services/partnerLogosDisplay';

export function parseSectionContent(raw: unknown): SectionContent {
  return parseSectionContentUnknown(raw);
}

/** API / Prisma đôi khi trả JSON dạng object hoặc chuỗi — chuẩn hóa để thẻ catalog đọc được contentVi. */
export function normalizeServiceJsonField(raw: unknown): Record<string, unknown> | null {
  if (raw == null) return null;
  if (typeof raw === 'object' && !Array.isArray(raw)) return raw as Record<string, unknown>;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return null;
    try {
      const v = JSON.parse(t) as unknown;
      if (v != null && typeof v === 'object' && !Array.isArray(v))
        return v as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  return null;
}

function nonEmptyPartnerLogoItems(logos: SectionContent['partnerLogos'] | undefined) {
  return getPartnerLogoItemsFromLogos(logos);
}

/** EN có ít nhất một URL logo riêng (không dùng fallback từ VI). */
export function enHasOwnPartnerLogos(contentEn: SectionContent): boolean {
  return nonEmptyPartnerLogoItems(contentEn.partnerLogos).length > 0;
}

/**
 * Cùng quy tắc `pickDetailPresentation`: nếu EN không có URL logo thì dùng danh sách VI.
 * Dùng trong admin (tab EN) để thấy / sửa logo đã lưu ở bản Việt.
 */
export function mergePartnerLogosForAdminDetail(
  contentEn: SectionContent,
  contentVi: SectionContent
): SectionContent['partnerLogos'] {
  const en = contentEn.partnerLogos ?? [];
  if (nonEmptyPartnerLogoItems(en).length > 0) return en;
  return contentVi.partnerLogos ?? [];
}

/** Tiếng Anh tùy chọn: nếu thiếu `contentEn` thì hiển thị bản Việt, nhãn UI theo ngôn ngữ nội dung đang hiển thị. */
export function pickDetailPresentation(
  routeLocale: string,
  service: { contentVi: unknown; contentEn?: unknown | null }
): { content: SectionContent; uiLang: 'vi' | 'en' } {
  const vi = parseSectionContentUnknown(service.contentVi);
  const hasEn =
    service.contentEn != null &&
    typeof service.contentEn === 'object' &&
    !Array.isArray(service.contentEn);
  if (routeLocale === 'en' && hasEn) {
    const en = parseSectionContentUnknown(service.contentEn);
    const sharedPartnerLogos =
      nonEmptyPartnerLogoItems(vi.partnerLogos).length > 0 ? vi.partnerLogos : en.partnerLogos;
    return { content: { ...en, partnerLogos: [...(sharedPartnerLogos ?? [])] }, uiLang: 'en' };
  }
  if (hasEn) {
    const en = parseSectionContentUnknown(service.contentEn);
    const sharedPartnerLogos =
      nonEmptyPartnerLogoItems(vi.partnerLogos).length > 0 ? vi.partnerLogos : en.partnerLogos;
    return { content: { ...vi, partnerLogos: [...(sharedPartnerLogos ?? [])] }, uiLang: 'vi' };
  }
  return { content: { ...vi, partnerLogos: [...(vi.partnerLogos ?? [])] }, uiLang: 'vi' };
}

export function pickListCard(
  routeLocale: string,
  row: Pick<ServiceListItem, 'listTitleVi' | 'listExcerptVi' | 'listTitleEn' | 'listExcerptEn'>
): { title: string; excerpt: string } {
  const title = routeLocale === 'en' && row.listTitleEn?.trim() ? row.listTitleEn : row.listTitleVi;
  const excerpt =
    routeLocale === 'en' && row.listExcerptEn?.trim() ? row.listExcerptEn : row.listExcerptVi;
  return { title, excerpt };
}

/** Đồng bộ `yt2future-be-v2` `DEFAULT_CATALOG_PILLS` — dùng khi DB chưa có cột / bản ghi cũ. */
const FALLBACK_CATALOG_PILLS: readonly string[] = [
  'Thu tiền sớm sau giao hàng',
  'Giảm giam vốn 30-90 ngày',
  'Không cần tài sản đảm bảo',
];

/**
 * Pill trên thẻ /services = cùng dữ liệu với «Các thẻ số liệu / heroStats» trên trang chi tiết (theo locale).
 * Thứ tự: heroStats (bản VI hoặc EN tùy `routeLocale`) → cột `catalogPills` (legacy) → mặc định seed.
 */
export function pickCatalogPillsForCard(
  routeLocale: string,
  svc: Pick<ServiceListItem, 'catalogPills' | 'contentVi' | 'contentEn'>
): string[] {
  const { content } = pickDetailPresentation(routeLocale, {
    contentVi: svc.contentVi ?? {},
    contentEn: svc.contentEn ?? null,
  });
  const fromHero = (content.heroStats ?? [])
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0)
    .slice(0, 3);
  if (fromHero.length > 0) return fromHero;

  const legacy = (svc.catalogPills ?? [])
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0)
    .slice(0, 3);
  if (legacy.length > 0) return legacy;

  return [...FALLBACK_CATALOG_PILLS];
}
