import { Router } from 'express';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
import * as adminController from '../controllers/adminController.js';
import serviceAdminRoutes from '../modules/services/serviceAdminRoutes.js';
import { z } from 'zod';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.js';

const router = Router();
const auditLogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
});
const updateRoleBodySchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['ADMIN', 'CTV', 'MEMBER', 'USER']),
});
const userIdParamsSchema = z.object({
  id: z.string().uuid(),
});

// Tất cả route admin đều phải qua 2 lớp bảo vệ
router.use(verifyToken, isAdmin);

router.use('/services', serviceAdminRoutes);

router.get('/logs', validateQuery(auditLogsQuerySchema), adminController.getAuditLogs);
router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.listUsers);
router.put('/users/role', validateBody(updateRoleBodySchema), adminController.updateRole);
router.delete('/users/:id', validateParams(userIdParamsSchema), adminController.removeUser);

export default router;
