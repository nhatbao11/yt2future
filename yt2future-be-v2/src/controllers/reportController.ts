import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as reportService from '../modules/reports/reportService.js';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, categoryId, description, status } = req.body;
    const userId = req.user!.id;

    if (!title) {
      return next(new AppError(req.t('report.titleRequired'), 400, 'REPORT_TITLE_REQUIRED'));
    }

    const newReport = await reportService.createReport({
      userId,
      title,
      categoryId: Number(categoryId),
      description,
      status,
      files: req.files,
    });

    res.json({ success: true, report: newReport, message: req.t('report.createSuccess') });
  } catch (error: unknown) {
    console.error('[ReportController] createReport failed:', getErrorMessage(error));
    next(
      new AppError(
        req.t('report.createError', { error: getErrorMessage(error) }),
        500,
        'REPORT_CREATE_FAILED'
      )
    );
  }
};

export const getAllReportsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 1);
    const result = await reportService.getAllReportsAdmin(page);
    res.json({
      success: true,
      reports: result.reports,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error: unknown) {
    console.error('[ReportController] getAllReportsAdmin failed:', getErrorMessage(error));
    next(new AppError(req.t('report.fetchError'), 500, 'REPORT_ADMIN_LIST_FAILED'));
  }
};

export const reviewReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, status } = req.body as { id: string; status: string };
    const updated = await reportService.reviewReport(id, status);
    res.json({ success: true, report: updated });
  } catch (error: unknown) {
    console.error('[ReportController] reviewReport failed:', getErrorMessage(error));
    next(
      new AppError(req.t('report.reviewError'), 500, 'REPORT_REVIEW_FAILED', {
        reason: getErrorMessage(error),
      })
    );
  }
};

export const getPublicReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      categoryId,
      search = '',
    } = req.query as unknown as {
      page: number;
      categoryId?: number;
      search?: string;
    };
    const result = await reportService.getPublicReports({
      page: Number(page),
      search: String(search ?? ''),
      ...(categoryId != null ? { categoryId: Number(categoryId) } : {}),
    });
    res.json({
      success: true,
      reports: result.reports,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error: unknown) {
    console.error('[ReportController] getPublicReports failed:', getErrorMessage(error));
    next(
      new AppError(
        req.t('report.publicFetchError', { error: getErrorMessage(error) }),
        500,
        'REPORT_PUBLIC_FETCH_FAILED'
      )
    );
  }
};

export const deleteReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await reportService.deleteReport(id!);
    res.json({ success: true, message: req.t('report.deleteSuccess') });
  } catch (error: unknown) {
    console.error('[ReportController] deleteReport failed:', getErrorMessage(error));
    next(new AppError(req.t('report.deleteError'), 500, 'REPORT_DELETE_FAILED'));
  }
};

export const updateReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, categoryId, description } = req.body;

    const updatedReport = await reportService.updateReport({
      id: id!,
      title,
      categoryId: Number(categoryId),
      description,
      files: req.files,
    });

    if (!updatedReport) {
      return next(new AppError(req.t('report.notFound'), 404, 'REPORT_NOT_FOUND'));
    }

    res.json({ success: true, report: updatedReport, message: req.t('report.updateSuccess') });
  } catch (error: unknown) {
    console.error('[ReportController] updateReport failed:', getErrorMessage(error));
    next(new AppError(req.t('report.updateError'), 500, 'REPORT_UPDATE_FAILED'));
  }
};
