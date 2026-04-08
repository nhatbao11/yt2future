import type { NextFunction, Request, Response } from 'express';
import { createLog } from '../services/logService.js';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as categoryService from '../modules/categories/categoryService.js';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.query.order === 'desc' ? 'desc' : 'asc';
    const categories = await categoryService.listCategories(order);
    res.json({ success: true, categories });
  } catch (error: unknown) {
    console.error('[CategoryController] getAllCategories failed:', getErrorMessage(error));
    next(new AppError('Không thể lấy danh mục!', 500, 'CATEGORY_FETCH_FAILED'));
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug } = req.body;

    const cat = await categoryService.createCategory({ name, slug });

    if (req.user) {
      await createLog(req.user, 'THÊM DANH MỤC', name);
    }

    res.json({ success: true, category: cat });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error('[CategoryController] createCategory failed:', getErrorMessage(error));
    next(
      new AppError('Lỗi tạo danh mục!', 500, 'CATEGORY_CREATE_FAILED', {
        reason: getErrorMessage(error),
      })
    );
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(Number(id));
    res.json({ success: true, message: 'Xóa danh mục thành công!' });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error('[CategoryController] deleteCategory failed:', getErrorMessage(error));
    next(new AppError('Không thể xóa danh mục!', 500, 'CATEGORY_DELETE_FAILED'));
  }
};
