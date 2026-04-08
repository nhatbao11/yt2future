import express from 'express';
import * as reportController from '../../controllers/reportController.js';
import { verifyToken, isAdmin, isCTVOrAdmin } from '../../middlewares/authMiddleware.js';
import { z } from 'zod';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';

const router = express.Router();
const getPublicReportsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  categoryId: z.coerce.number().int().positive().optional(),
  search: z.string().trim().max(200).optional().default(''),
});
const reviewReportBodySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
});
const reportIdParamsSchema = z.object({
  id: z.string().uuid(),
});

// 1. ROUTE CÔNG KHAI
router.get(
  '/public',
  validateQuery(getPublicReportsQuerySchema),
  reportController.getPublicReports
);

// 2. ROUTE QUẢN LÝ: Danh sách cho Admin
router.get('/admin-list', verifyToken, isAdmin, reportController.getAllReportsAdmin);

// 3. ROUTE DUYỆT BÀI
router.post(
  '/review',
  verifyToken,
  isAdmin,
  validateBody(reviewReportBodySchema),
  reportController.reviewReport
);

// 4. ROUTE THÊM BÀI
router.post('/add', verifyToken, isCTVOrAdmin, reportController.createReport);

// 5. ROUTE SỬA/XÓA
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  validateParams(reportIdParamsSchema),
  reportController.deleteReport
);
router.put(
  '/:id',
  verifyToken,
  isCTVOrAdmin,
  validateParams(reportIdParamsSchema),
  reportController.updateReport
);

export default router;
