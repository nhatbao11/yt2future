import type { PartnerLogo, SectionContent } from '@/features/services/types';
import { normalizePartnerLogoItem } from '@/features/services/partnerLogosDisplay';

export function emptySectionContent(): SectionContent {
  return {
    heroTag: '',
    heroTitle: '',
    heroDescription: '',
    heroStats: [],
    contextTitle: '',
    contextNarrative: [],
    contextImpacts: [],
    contextCoreLine: '',
    fitTitle: '',
    fitSellerLabel: '',
    fitBuyerLabel: '',
    fitSeller: [],
    fitBuyer: [],
    fitSellerHighlight: '',
    fitBuyerHighlight: '',
    benefitsTitle: '',
    benefitGroups: [],
    processTitle: '',
    processIntro: '',
    processSteps: [],
    partnersTitle: '',
    partnersSubtitle: '',
    partnersPlaceholder: '',
    partnerLogos: [],
    introVideoUrl: '',
    videoPreviewLabel: '',
    videoPreviewHint: '',
  };
}

function asStr(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function asStrArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

/** Tương thích dữ liệu cũ: string URL -> { name: '', logoUrl }. */
function asPartnerLogoArray(v: unknown): PartnerLogo[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => normalizePartnerLogoItem(x)).filter((x): x is PartnerLogo => Boolean(x));
}

function asBenefitGroups(v: unknown): SectionContent['benefitGroups'] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object')
    .map((g) => ({
      title: asStr(g.title),
      items: asStrArray(g.items),
    }));
}

/** Gộp JSON từ API / copy cũ vào state form an toàn. */
export function parseSectionContentUnknown(raw: unknown): SectionContent {
  const d = emptySectionContent();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const r = raw as Record<string, unknown>;
  return {
    heroTag: asStr(r.heroTag, d.heroTag),
    heroTitle: asStr(r.heroTitle, d.heroTitle),
    heroDescription: asStr(r.heroDescription, d.heroDescription),
    heroStats: asStrArray(r.heroStats),
    contextTitle: asStr(r.contextTitle, d.contextTitle),
    contextNarrative: asStrArray(r.contextNarrative),
    contextImpacts: asStrArray(r.contextImpacts),
    contextCoreLine: asStr(r.contextCoreLine, d.contextCoreLine),
    fitTitle: asStr(r.fitTitle, d.fitTitle),
    fitSellerLabel: asStr(r.fitSellerLabel, d.fitSellerLabel),
    fitBuyerLabel: asStr(r.fitBuyerLabel, d.fitBuyerLabel),
    fitSeller: asStrArray(r.fitSeller),
    fitBuyer: asStrArray(r.fitBuyer),
    fitSellerHighlight: asStr(r.fitSellerHighlight, d.fitSellerHighlight),
    fitBuyerHighlight: asStr(r.fitBuyerHighlight, d.fitBuyerHighlight),
    benefitsTitle: asStr(r.benefitsTitle, d.benefitsTitle),
    benefitGroups: asBenefitGroups(r.benefitGroups),
    processTitle: asStr(r.processTitle, d.processTitle),
    processIntro: asStr(r.processIntro, d.processIntro),
    processSteps: asStrArray(r.processSteps),
    partnersTitle: asStr(r.partnersTitle, d.partnersTitle),
    partnersSubtitle: asStr(r.partnersSubtitle, d.partnersSubtitle),
    partnersPlaceholder: asStr(r.partnersPlaceholder, d.partnersPlaceholder),
    partnerLogos: asPartnerLogoArray(r.partnerLogos),
    introVideoUrl: asStr(r.introVideoUrl, d.introVideoUrl),
    videoPreviewLabel: asStr(r.videoPreviewLabel, d.videoPreviewLabel),
    videoPreviewHint: asStr(r.videoPreviewHint, d.videoPreviewHint),
  };
}

function isBlank(s: string) {
  return !s.trim();
}

/** Toàn bộ trống → không gửi bản EN. */
export function isSectionContentEmpty(c: SectionContent): boolean {
  if (!isBlank(c.heroTag)) return false;
  if (!isBlank(c.heroTitle)) return false;
  if (!isBlank(c.heroDescription)) return false;
  if (c.heroStats.some((s) => !isBlank(s))) return false;
  if (!isBlank(c.contextTitle)) return false;
  if (c.contextNarrative.some((s) => !isBlank(s))) return false;
  if (c.contextImpacts.some((s) => !isBlank(s))) return false;
  if (!isBlank(c.contextCoreLine)) return false;
  if (!isBlank(c.fitTitle)) return false;
  if (!isBlank(c.fitSellerLabel)) return false;
  if (!isBlank(c.fitBuyerLabel)) return false;
  if (c.fitSeller.some((s) => !isBlank(s))) return false;
  if (c.fitBuyer.some((s) => !isBlank(s))) return false;
  if (!isBlank(c.fitSellerHighlight)) return false;
  if (!isBlank(c.fitBuyerHighlight)) return false;
  if (!isBlank(c.benefitsTitle)) return false;
  if (c.benefitGroups.some((g) => !isBlank(g.title) || g.items.some((it) => !isBlank(it))))
    return false;
  if (!isBlank(c.processTitle)) return false;
  if (!isBlank(c.processIntro)) return false;
  if (c.processSteps.some((s) => !isBlank(s))) return false;
  if (!isBlank(c.partnersTitle)) return false;
  if (!isBlank(c.partnersSubtitle)) return false;
  if (!isBlank(c.partnersPlaceholder)) return false;
  if (c.partnerLogos.some((p) => !isBlank(p.name) || !isBlank(p.logoUrl))) return false;
  if (!isBlank(c.videoPreviewLabel)) return false;
  if (!isBlank(c.videoPreviewHint)) return false;
  if (!isBlank(c.introVideoUrl)) return false;
  return true;
}

/** Chuẩn hoá trước khi gửi API (bỏ URL logo rỗng). */
export function normalizeSectionContentForSave(c: SectionContent): SectionContent {
  return {
    ...c,
    partnerLogos: (c.partnerLogos ?? [])
      .map((item) => normalizePartnerLogoItem(item))
      .filter((item): item is PartnerLogo => Boolean(item?.logoUrl)),
  };
}
