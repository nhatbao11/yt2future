import enMessages from '@/messages/en.json';
import viMessages from '@/messages/vi.json';

/**
 * Copy cho admin dịch vụ — đọc thẳng từ JSON để tránh MISSING_MESSAGE với next-intl 4.x
 * khi dùng namespace lồng nhau (admin.servicesPage.form…).
 */
export function getAdminServicesPageCopy(locale: string) {
  const bundle = locale === 'en' ? enMessages : viMessages;
  const s = bundle.admin.servicesPage;
  const toast = s.toast as { uploadImageError?: string; uploadImageTooLarge?: string } | undefined;
  const form = bundle.admin.servicesPage.form as
    | {
        catalogPillLinePlaceholder?: string;
        detail?: { placeholders?: Record<string, string> };
      }
    | undefined;
  const placeholders = form?.detail?.placeholders;
  return {
    englishDetailHelp: s.englishDetailHelp ?? '',
    partnerLogosIntro: s.partnerLogosIntro ?? '',
    addPartnerLogo: s.addPartnerLogo ?? '',
    partnerLogosSectionTitle: s.partnerLogosSectionTitle ?? '',
    partnerLogosEmpty: s.partnerLogosEmpty ?? '',
    partnerLogosAddFirst: s.partnerLogosAddFirst ?? s.addPartnerLogo ?? '',
    partnerLogoUrlPlaceholder: placeholders?.partnerLogoUrl ?? '',
    imageUploadButton: s.imageUploadButton ?? '',
    imageUrlOrUploadHint: s.imageUrlOrUploadHint ?? '',
    partnerRowUploadButton: s.partnerRowUploadButton ?? '',
    toastUploadImageError: toast?.uploadImageError ?? '',
    toastUploadImageTooLarge: toast?.uploadImageTooLarge ?? '',
    /** Pill trên thẻ catalog (đồng bộ heroStats) — tránh MISSING_MESSAGE next-intl namespace form.* */
    catalogPillLinePlaceholder:
      form?.catalogPillLinePlaceholder ?? placeholders?.catalogPillLine ?? '',
  };
}
