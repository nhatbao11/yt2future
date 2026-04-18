import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';
import type { SectionContentInput } from './serviceContentSchema.js';

export type ServiceCreateInput = {
  slug: string;
  sortOrder: number;
  published: boolean;
  listTitleVi: string;
  listExcerptVi: string;
  listTitleEn: string | null;
  listExcerptEn: string | null;
  listImageUrl: string | null;
  catalogPills: string[];
  contentVi: SectionContentInput;
  contentEn: SectionContentInput | null;
};

function toJson(val: SectionContentInput): Prisma.InputJsonValue {
  return val as unknown as Prisma.InputJsonValue;
}

export async function listPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      slug: true,
      sortOrder: true,
      listTitleVi: true,
      listExcerptVi: true,
      listTitleEn: true,
      listExcerptEn: true,
      listImageUrl: true,
      catalogPills: true,
      contentVi: true,
      contentEn: true,
    },
  });
}

export async function getPublishedBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, published: true },
  });
}

export async function listAllServicesAdmin() {
  return prisma.service.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

export async function createService(input: ServiceCreateInput) {
  const existing = await prisma.service.findUnique({ where: { slug: input.slug } });
  if (existing) {
    throw new AppError('Slug đã tồn tại!', 400, 'SERVICE_SLUG_EXISTS');
  }
  return prisma.service.create({
    data: {
      slug: input.slug,
      sortOrder: input.sortOrder,
      published: input.published,
      listTitleVi: input.listTitleVi,
      listExcerptVi: input.listExcerptVi,
      listTitleEn: input.listTitleEn,
      listExcerptEn: input.listExcerptEn,
      listImageUrl: input.listImageUrl,
      catalogPills: input.catalogPills,
      contentVi: toJson(input.contentVi),
      contentEn: input.contentEn ? toJson(input.contentEn) : Prisma.DbNull,
    },
  });
}

export async function updateService(id: string, input: ServiceCreateInput) {
  const current = await prisma.service.findUnique({ where: { id } });
  if (!current) {
    throw new AppError('Không tìm thấy dịch vụ', 404, 'SERVICE_NOT_FOUND');
  }
  if (input.slug !== current.slug) {
    const clash = await prisma.service.findUnique({ where: { slug: input.slug } });
    if (clash) {
      throw new AppError('Slug đã tồn tại!', 400, 'SERVICE_SLUG_EXISTS');
    }
  }
  return prisma.service.update({
    where: { id },
    data: {
      slug: input.slug,
      sortOrder: input.sortOrder,
      published: input.published,
      listTitleVi: input.listTitleVi,
      listExcerptVi: input.listExcerptVi,
      listTitleEn: input.listTitleEn,
      listExcerptEn: input.listExcerptEn,
      listImageUrl: input.listImageUrl,
      catalogPills: input.catalogPills,
      contentVi: toJson(input.contentVi),
      contentEn: input.contentEn ? toJson(input.contentEn) : Prisma.DbNull,
    },
  });
}

export async function deleteService(id: string) {
  const current = await prisma.service.findUnique({ where: { id } });
  if (!current) {
    throw new AppError('Không tìm thấy dịch vụ', 404, 'SERVICE_NOT_FOUND');
  }
  await prisma.service.delete({ where: { id } });
}
