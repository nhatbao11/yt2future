import { reportService } from '@/features/reports/api/reportApi';

export const categoryApi = {
  getCategories: reportService.getCategories,
  createCategory: reportService.createCategory,
  deleteCategory: reportService.deleteCategory,
};
