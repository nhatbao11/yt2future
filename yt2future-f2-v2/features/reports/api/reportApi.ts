import apiClient from '@/services/apiClient';

export const reportService = {
  getPublicReports: async (page: number = 1, categoryId?: number, search: string = '') => {
    try {
      const response = await apiClient.get('/reports/public', {
        params: { page, categoryId, search },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      throw error;
    }
  },

  getAllReportsAdmin: async (page: number = 1) => {
    const response = await apiClient.get('/reports/admin-list', {
      params: { page },
    });
    return response.data;
  },

  addReport: async (formData: FormData) => {
    const response = await apiClient.post('/reports/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  createCategory: async (data: { name: string; slug: string }) => {
    const response = await apiClient.post('/categories/add', data);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },

  deleteReport: async (id: string) => {
    const response = await apiClient.delete(`/reports/${id}`);
    return response.data;
  },

  reviewReport: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await apiClient.post('/reports/review', { id, status });
    return response.data;
  },

  updateReport: async (id: string, formData: FormData) => {
    const response = await apiClient.put(`/reports/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
