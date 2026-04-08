import express from 'express';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../../controllers/categoryController.js';
import { verifyToken, isAdmin } from '../../middlewares/authMiddleware.js';
import { z } from 'zod';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';

const router = express.Router();
const getCategoriesQuerySchema = z.object({
  order: z.enum(['asc', 'desc']).optional(),
});
const createCategoryBodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(150),
});
const categoryIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

router.get('/', validateQuery(getCategoriesQuerySchema), getAllCategories);
router.post('/add', verifyToken, isAdmin, validateBody(createCategoryBodySchema), createCategory);
router.delete('/:id', verifyToken, isAdmin, validateParams(categoryIdParamsSchema), deleteCategory);

export default router;
