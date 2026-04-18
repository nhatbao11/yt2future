import { prisma } from '../lib/prisma.js';
import {
  DEFAULT_CATALOG_PILLS,
  DEFAULT_CONTENT_EN,
  DEFAULT_CONTENT_VI,
  DEFAULT_LIST,
  DEFAULT_SERVICE_SLUG,
} from '../modules/services/defaultServiceContent.js';

async function main() {
  const existing = await prisma.service.findUnique({ where: { slug: DEFAULT_SERVICE_SLUG } });
  if (existing) {
    console.log('[seedDefaultService] Default slug already exists, skip.');
    return;
  }
  await prisma.service.create({
    data: {
      slug: DEFAULT_SERVICE_SLUG,
      sortOrder: 0,
      published: true,
      listTitleVi: DEFAULT_LIST.listTitleVi,
      listExcerptVi: DEFAULT_LIST.listExcerptVi,
      listTitleEn: DEFAULT_LIST.listTitleEn,
      listExcerptEn: DEFAULT_LIST.listExcerptEn,
      listImageUrl: DEFAULT_LIST.listImageUrl,
      catalogPills: [...DEFAULT_CATALOG_PILLS],
      contentVi: DEFAULT_CONTENT_VI,
      contentEn: DEFAULT_CONTENT_EN,
    },
  });
  console.log('[seedDefaultService] Inserted default service:', DEFAULT_SERVICE_SLUG);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
