import { z } from 'zod';

const benefitGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string()),
});

const partnerLogoSchema = z.union([
  z
    .string()
    .max(2000)
    .transform((logoUrl) => ({ name: '', logoUrl })),
  z
    .object({
      name: z.string().max(160).optional().default(''),
      logoUrl: z.string().max(2000).optional().default(''),
      url: z.string().max(2000).optional(),
    })
    .transform((item) => ({
      name: item.name,
      logoUrl: item.logoUrl || item.url || '',
    })),
]);

export const sectionContentSchema = z.object({
  heroTag: z.string().min(1),
  heroTitle: z.string().min(1),
  heroDescription: z.string().min(1),
  heroStats: z.array(z.string()),
  contextTitle: z.string().min(1),
  contextNarrative: z.array(z.string()),
  contextImpacts: z.array(z.string()),
  contextCoreLine: z.string().min(1),
  fitTitle: z.string().min(1),
  fitSellerLabel: z.string().min(1),
  fitBuyerLabel: z.string().min(1),
  fitSeller: z.array(z.string()),
  fitBuyer: z.array(z.string()),
  fitSellerHighlight: z.string().min(1),
  fitBuyerHighlight: z.string().min(1),
  benefitsTitle: z.string().min(1),
  benefitGroups: z.array(benefitGroupSchema),
  processTitle: z.string().min(1),
  processIntro: z.string().min(1),
  processSteps: z.array(z.string()),
  partnersTitle: z.string().min(1),
  /** Admin / nội dung có thể để trống — trước đây `.min(1)` khiến cả `contentVi` fail parse → không lưu được `partnerLogos` và các field khác. */
  partnersSubtitle: z.string().max(2000).default(''),
  partnersPlaceholder: z.string().max(8000).default(''),
  partnerLogos: z.array(partnerLogoSchema).optional().default([]),
  /** Link YouTube (watch/embed/short) hoặc URL file .mp4/.webm (https hoặc đường dẫn /...). Để trống = video mặc định site. */
  introVideoUrl: z.string().max(2000).default(''),
  videoPreviewLabel: z.string().min(1),
  videoPreviewHint: z.string().min(1),
});

export type SectionContentInput = z.infer<typeof sectionContentSchema>;

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ gồm chữ thường, số và dấu gạch ngang');

export const createServiceBodySchema = z.object({
  slug: slugSchema,
  sortOrder: z.coerce.number().int().optional().default(0),
  published: z.coerce.boolean().optional().default(false),
  listTitleVi: z.string().trim().min(1),
  listExcerptVi: z.string().trim().min(1),
  listTitleEn: z.string().max(500).optional(),
  listExcerptEn: z.string().max(4000).optional(),
  listImageUrl: z.string().max(2000).optional(),
  catalogPills: z.array(z.string().max(160)).max(3).optional().default([]),
  contentVi: sectionContentSchema,
  contentEn: z.union([sectionContentSchema, z.null()]).optional(),
});

export const serviceIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const serviceSlugParamsSchema = z.object({
  slug: z.string().trim().min(1).max(120),
});
