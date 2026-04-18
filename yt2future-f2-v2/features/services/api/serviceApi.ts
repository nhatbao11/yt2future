import apiClient from '@/services/apiClient';
import type { ServiceDetailRecord, ServiceListItem } from '../types';

export type ServiceUpsertBody = {
  slug: string;
  sortOrder: number;
  published: boolean;
  listTitleVi: string;
  listExcerptVi: string;
  listTitleEn?: string;
  listExcerptEn?: string;
  listImageUrl?: string;
  /** Tối đa 3 chuỗi; rỗng được lọc khi lưu. */
  catalogPills?: string[];
  contentVi: unknown;
  contentEn?: unknown | null;
};

export const serviceApi = {
  listPublished: async () => {
    const res = await apiClient.get('/services');
    return res.data as { success: boolean; services: ServiceListItem[] };
  },

  getBySlug: async (slug: string) => {
    const res = await apiClient.get(`/services/${encodeURIComponent(slug)}`);
    return res.data as { success: boolean; service: ServiceDetailRecord };
  },

  listAdmin: async () => {
    const res = await apiClient.get('/admin/services');
    return res.data as { success: boolean; services: ServiceDetailRecord[] };
  },

  getAdmin: async (id: string) => {
    const res = await apiClient.get(`/admin/services/${encodeURIComponent(id)}`);
    return res.data as { success: boolean; service: ServiceDetailRecord };
  },

  create: async (body: ServiceUpsertBody) => {
    const res = await apiClient.post('/admin/services', body);
    return res.data as { success: boolean; service: ServiceDetailRecord };
  },

  update: async (id: string, body: ServiceUpsertBody) => {
    const res = await apiClient.put(`/admin/services/${encodeURIComponent(id)}`, body);
    return res.data as { success: boolean; service: ServiceDetailRecord };
  },

  delete: async (id: string) => {
    const res = await apiClient.delete(`/admin/services/${encodeURIComponent(id)}`);
    return res.data as { success: boolean; message?: string };
  },
};
