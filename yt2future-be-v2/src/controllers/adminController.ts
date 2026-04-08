import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { Role } from '@prisma/client';
import { createLog } from '../services/logService.js';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as adminService from '../modules/admin/adminService.js';

export const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: (req: Request) => ({ message: req.t('admin.rateLimitExceeded') }),
});

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.listUsers();
    res.json({ success: true, users });
  } catch (error: unknown) {
    console.error('[AdminController] listUsers failed:', getErrorMessage(error));
    throw new AppError(req.t('user.listError'), 500, 'ADMIN_USERS_LIST_FAILED');
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body as { userId: string; role: Role };
  try {
    const updatedUser = await adminService.updateUserRole(userId, role);

    const logDetail = req.t('admin.roleUpdated', { email: updatedUser.email, role });
    await createLog(req.user, 'CẬP NHẬT VAI TRÒ', logDetail);

    res.json({ success: true, user: updatedUser, message: req.t('user.roleUpdated') });
  } catch (error: unknown) {
    console.error('[AdminController] updateRole failed:', getErrorMessage(error));
    throw new AppError(req.t('user.roleUpdateError'), 400, 'ADMIN_USER_ROLE_UPDATE_FAILED');
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminId = req.user!.id;

  try {
    const result = await adminService.removeUser(id!, adminId);

    if (!result.ok) {
      if (result.code === 'NOT_FOUND') {
        throw new AppError(req.t('user.userNotExists'), 404, 'ADMIN_USER_NOT_FOUND');
      }
      if (result.code === 'SELF') {
        throw new AppError(req.t('user.cannotDeleteSelf'), 400, 'ADMIN_CANNOT_DELETE_SELF');
      }
      if (result.code === 'ADMIN_TARGET') {
        throw new AppError(req.t('user.cannotDeleteAdmin'), 403, 'ADMIN_CANNOT_DELETE_ADMIN');
      }
      throw new AppError(req.t('user.deleteError'), 400, 'ADMIN_USER_DELETE_FAILED');
    }

    const logDetail = req.t('admin.userDeleted', { email: result.email });
    await createLog(req.user, 'XÓA NGƯỜI DÙNG', logDetail);

    res.json({ success: true, message: req.t('success.deleted') });
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    console.error('[AdminController] removeUser failed:', getErrorMessage(error));
    throw new AppError(req.t('user.deleteError'), 400, 'ADMIN_USER_DELETE_FAILED');
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const { logs, totalPages, currentPage } = await adminService.getAuditLogsPage(page);
    res.json({
      success: true,
      logs,
      totalPages,
      currentPage,
    });
  } catch (error: unknown) {
    console.error('[AdminController] getAuditLogs failed:', getErrorMessage(error));
    throw new AppError(req.t('admin.logsError'), 500, 'ADMIN_LOGS_FETCH_FAILED');
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json({
      success: true,
      stats,
    });
  } catch (error: unknown) {
    const reason = getErrorMessage(error);
    console.error('[AdminController] getDashboardStats failed:', reason);

    if (reason.includes('max clients') || reason.includes('MaxClientsInSessionMode')) {
      throw new AppError(
        'Database đang quá tải kết nối. Vui lòng thử lại sau ít giây.',
        503,
        'DB_CONNECTION_LIMIT',
        { reason }
      );
    }

    throw new AppError('Không thể tải thống kê dashboard.', 500, 'ADMIN_STATS_FETCH_FAILED', {
      reason,
    });
  }
};
