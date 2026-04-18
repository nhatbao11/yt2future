import type { NextFunction, Request, Response } from 'express';
import { createLog } from '../services/logService.js';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as serviceDb from '../modules/services/serviceDbService.js';
import type { ServiceCreateInput } from '../modules/services/serviceDbService.js';
import type { z } from 'zod';
import { createServiceBodySchema } from '../modules/services/serviceContentSchema.js';

type CreateServiceBody = z.infer<typeof createServiceBodySchema>;

function normalizeCreateBody(body: CreateServiceBody): ServiceCreateInput {
  const listTitleEn = body.listTitleEn?.trim();
  const listExcerptEn = body.listExcerptEn?.trim();
  const listImageUrlRaw = body.listImageUrl?.trim();
  const listImageUrl = listImageUrlRaw && listImageUrlRaw.length > 0 ? listImageUrlRaw : null;
  const catalogPills = (body.catalogPills ?? [])
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0)
    .slice(0, 3);
  return {
    slug: body.slug,
    sortOrder: body.sortOrder,
    published: body.published,
    listTitleVi: body.listTitleVi,
    listExcerptVi: body.listExcerptVi,
    listTitleEn: listTitleEn ? listTitleEn : null,
    listExcerptEn: listExcerptEn ? listExcerptEn : null,
    listImageUrl,
    catalogPills,
    contentVi: body.contentVi,
    contentEn: body.contentEn ?? null,
  };
}

export const listPublishedServices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await serviceDb.listPublishedServices();
    res.json({ success: true, services });
  } catch (error: unknown) {
    console.error('[ServiceController] listPublished failed:', getErrorMessage(error));
    next(new AppError('Không thể tải danh sách dịch vụ', 500, 'SERVICE_LIST_FAILED'));
  }
};

export const getPublishedServiceBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug as string;
    const service = await serviceDb.getPublishedBySlug(slug);
    if (!service) {
      return next(new AppError('Không tìm thấy dịch vụ', 404, 'SERVICE_NOT_FOUND'));
    }
    res.json({ success: true, service });
  } catch (error: unknown) {
    if (error instanceof AppError) return next(error);
    console.error('[ServiceController] getBySlug failed:', getErrorMessage(error));
    next(new AppError('Không thể tải dịch vụ', 500, 'SERVICE_FETCH_FAILED'));
  }
};

export const listServicesAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await serviceDb.listAllServicesAdmin();
    res.json({ success: true, services });
  } catch (error: unknown) {
    console.error('[ServiceController] listAdmin failed:', getErrorMessage(error));
    next(new AppError('Không thể tải dịch vụ (admin)', 500, 'SERVICE_ADMIN_LIST_FAILED'));
  }
};

export const getServiceAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const service = await serviceDb.getServiceById(id);
    if (!service) {
      return next(new AppError('Không tìm thấy dịch vụ', 404, 'SERVICE_NOT_FOUND'));
    }
    res.json({ success: true, service });
  } catch (error: unknown) {
    if (error instanceof AppError) return next(error);
    next(new AppError('Không thể tải dịch vụ', 500, 'SERVICE_FETCH_FAILED'));
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = normalizeCreateBody(req.body);
    const service = await serviceDb.createService(input);
    if (req.user) {
      await createLog(req.user, 'THÊM DỊCH VỤ', service.slug);
    }
    res.json({ success: true, service });
  } catch (error: unknown) {
    if (error instanceof AppError) return next(error);
    console.error('[ServiceController] create failed:', getErrorMessage(error));
    next(new AppError('Không thể tạo dịch vụ', 500, 'SERVICE_CREATE_FAILED'));
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const input = normalizeCreateBody(req.body);
    const service = await serviceDb.updateService(id, input);
    if (req.user) {
      await createLog(req.user, 'CẬP NHẬT DỊCH VỤ', service.slug);
    }
    res.json({ success: true, service });
  } catch (error: unknown) {
    if (error instanceof AppError) return next(error);
    console.error('[ServiceController] update failed:', getErrorMessage(error));
    next(new AppError('Không thể cập nhật dịch vụ', 500, 'SERVICE_UPDATE_FAILED'));
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const existing = await serviceDb.getServiceById(id);
    if (!existing) {
      return next(new AppError('Không tìm thấy dịch vụ', 404, 'SERVICE_NOT_FOUND'));
    }
    await serviceDb.deleteService(id);
    if (req.user) {
      await createLog(req.user, 'XÓA DỊCH VỤ', existing.slug);
    }
    res.json({ success: true, message: 'Đã xóa dịch vụ' });
  } catch (error: unknown) {
    if (error instanceof AppError) return next(error);
    next(new AppError('Không thể xóa dịch vụ', 500, 'SERVICE_DELETE_FAILED'));
  }
};
