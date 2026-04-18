export type PartnerLogo = {
  name: string;
  logoUrl: string;
};

export type SectionContent = {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  heroStats: string[];
  contextTitle: string;
  contextNarrative: string[];
  contextImpacts: string[];
  contextCoreLine: string;
  fitTitle: string;
  fitSellerLabel: string;
  fitBuyerLabel: string;
  fitSeller: string[];
  fitBuyer: string[];
  fitSellerHighlight: string;
  fitBuyerHighlight: string;
  benefitsTitle: string;
  benefitGroups: Array<{ title: string; items: string[] }>;
  processTitle: string;
  processIntro: string;
  processSteps: string[];
  partnersTitle: string;
  partnersSubtitle: string;
  partnersPlaceholder: string;
  /** Danh sách đối tác: tên đi cùng logo. Dữ liệu cũ dạng string URL được parser chuyển đổi. */
  partnerLogos: PartnerLogo[];
  /** Video ngắn giới thiệu: URL YouTube hoặc file mp4/webm. Rỗng = video mặc định trang chủ. */
  introVideoUrl: string;
  videoPreviewLabel: string;
  videoPreviewHint: string;
};

export type ServiceListItem = {
  id: string;
  slug: string;
  sortOrder: number;
  listTitleVi: string;
  listExcerptVi: string;
  listTitleEn: string | null;
  listExcerptEn: string | null;
  /** Ảnh thẻ catalog; null / thiếu = placeholder gradient. */
  listImageUrl?: string | null;
  /** Tối đa 3 dòng pill trên thẻ /services (cùng ngôn ngữ cho mọi locale). */
  catalogPills?: string[];
  /** Nội dung chi tiết — dùng preview thẻ catalog (cùng API sau khi BE mở select). */
  contentVi?: unknown;
  contentEn?: unknown | null;
};

export type ServiceDetailRecord = ServiceListItem & {
  published: boolean;
  contentVi: unknown;
  contentEn: unknown | null;
  createdAt: string;
  updatedAt: string;
};
