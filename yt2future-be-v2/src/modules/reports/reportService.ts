import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import type { FileArray, UploadedFile } from 'express-fileupload';
import _slugify from 'slugify';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';

const slugify = _slugify as unknown as (string: string, options?: any) => string;

function getSingleFile(file: UploadedFile | UploadedFile[] | undefined): UploadedFile | undefined {
  if (file == null) return undefined;
  return Array.isArray(file) ? file[0] : file;
}

async function uploadThumbnail(file: UploadedFile): Promise<string> {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'yt_reports/thumbnails',
  });
  fs.unlink(file.tempFilePath, () => {});
  return result.secure_url;
}

async function uploadPdf(file: UploadedFile): Promise<string> {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'yt_reports/pdf',
    resource_type: 'raw',
    use_filename: true,
    unique_filename: false,
  });
  fs.unlink(file.tempFilePath, () => {});
  return result.secure_url;
}

function buildSlugFromTitle(title: string): string {
  const rawSlug = slugify(title, {
    lower: true,
    locale: 'vi',
    strict: true,
  });
  return `${rawSlug}-${Date.now()}`;
}

export async function createReport(input: {
  userId: string;
  title: string;
  categoryId: number;
  description: string | null | undefined;
  status?: string;
  files: FileArray | null | undefined;
}) {
  const { userId, title, categoryId, description, status } = input;
  const slug = buildSlugFromTitle(title);

  let thumbnail = '';
  let pdfUrl = '';

  if (input.files) {
    const thumb = getSingleFile(input.files.thumbnail);
    if (thumb) {
      thumbnail = await uploadThumbnail(thumb);
    }
    const pdf = getSingleFile(input.files.pdfFile);
    if (pdf) {
      pdfUrl = await uploadPdf(pdf);
    }
  }

  return prisma.report.create({
    data: {
      title,
      slug,
      description: description ?? null,
      thumbnail,
      pdfUrl: pdfUrl || '',
      status: status || 'PENDING',
      categoryId,
      userId,
    },
  });
}

export async function getAllReportsAdmin(page: number) {
  const limit = 5;
  const skip = (page - 1) * limit;

  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      include: {
        category: { select: { name: true } },
        user: { select: { fullName: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.report.count(),
  ]);

  return {
    reports,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function reviewReport(id: string, status: string) {
  return prisma.report.update({
    where: { id },
    data: { status },
  });
}

export async function getPublicReports(input: {
  page: number;
  categoryId?: number;
  search: string;
}) {
  const { page, categoryId, search } = input;
  const limit = 6;
  const skip = (page - 1) * limit;

  const whereCondition: Prisma.ReportWhereInput = {
    status: 'APPROVED',
    ...(categoryId != null ? { categoryId } : {}),
    ...(search
      ? {
          title: { contains: search, mode: 'insensitive' },
        }
      : {}),
  };

  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      where: whereCondition,
      include: {
        category: { select: { name: true } },
        user: { select: { fullName: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.report.count({ where: whereCondition }),
  ]);

  return {
    reports,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function deleteReport(id: string) {
  return prisma.report.delete({ where: { id } });
}

export async function updateReport(input: {
  id: string;
  title: string;
  categoryId: number;
  description: string | null | undefined;
  files: FileArray | null | undefined;
}) {
  const { id, title, categoryId, description, files } = input;

  const oldReport = await prisma.report.findUnique({ where: { id } });
  if (!oldReport) {
    return null;
  }

  const data: Prisma.ReportUncheckedUpdateInput = {
    title,
    description: description ?? null,
    categoryId,
  };

  if (title && title !== oldReport.title) {
    data.slug = buildSlugFromTitle(title);
  }

  if (files) {
    const thumb = getSingleFile(files.thumbnail);
    if (thumb) {
      data.thumbnail = await uploadThumbnail(thumb);
    }
    const pdf = getSingleFile(files.pdfFile);
    if (pdf) {
      data.pdfUrl = await uploadPdf(pdf);
    }
  }

  return prisma.report.update({
    where: { id },
    data,
  });
}
