import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';

export async function listCategories(order: 'asc' | 'desc') {
  return prisma.category.findMany({
    orderBy: { name: order },
  });
}

export async function createCategory(input: { name: string; slug: string }) {
  const existing = await prisma.category.findUnique({ where: { slug: input.slug } });
  if (existing) {
    throw new AppError('Slug này đã tồn tại sếp ơi!', 400, 'CATEGORY_SLUG_EXISTS');
  }
  return prisma.category.create({
    data: { name: input.name, slug: input.slug },
  });
}

export async function deleteCategory(id: number) {
  try {
    await prisma.category.delete({ where: { id } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003') {
      throw new AppError(
        'Không thể xóa danh mục đang gắn với báo cáo!',
        400,
        'CATEGORY_DELETE_IN_USE'
      );
    }
    throw e;
  }
}
