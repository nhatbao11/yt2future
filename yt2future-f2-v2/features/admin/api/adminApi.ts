import api from '@/services/apiClient';

export type DashboardStatsPayload = {
  totalUsers: number;
  totalReports: number;
  pendingReports: number;
  totalCategories: number;
};

function normalizeStats(raw: unknown): DashboardStatsPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown>;
  const n = (k: string) => {
    const v = s[k];
    if (typeof v === 'number' && !Number.isNaN(v)) return v;
    if (typeof v === 'string') {
      const x = Number(v);
      return Number.isNaN(x) ? 0 : x;
    }
    return 0;
  };
  return {
    totalUsers: n('totalUsers'),
    totalReports: n('totalReports'),
    pendingReports: n('pendingReports'),
    totalCategories: n('totalCategories'),
  };
}

export const adminService = {
  getAllUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data.users;
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await api.put('/admin/users/role', { userId, role });
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  getAuditLogs: async (page: number = 1) => {
    const response = await api.get(`/admin/logs?page=${page}`);
    return response.data;
  },

  getPendingFeedbacks: async () => {
    const res = await api.get('/admin/feedback/pending');
    return res.data.feedbacks;
  },

  getAllFeedbacks: async () => {
    const res = await api.get('/admin/feedback/all');
    return res.data.feedbacks;
  },

  reviewFeedback: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const res = await api.post('/admin/feedback/review', { id, status });
    return res.data;
  },

  getHomeFeedbacks: async () => {
    const res = await api.get('/feedback/home');
    return res.data.feedbacks;
  },

  getDashboardStats: async (): Promise<{ success: boolean; stats?: DashboardStatsPayload }> => {
    const res = await api.get('/admin/stats');
    const body = res.data as { success?: boolean; stats?: unknown };
    const stats = normalizeStats(body.stats);
    if (body.success === true && stats) {
      return { success: true, stats };
    }
    return { success: false };
  },

  deleteFeedback: async (id: string) => {
    const res = await api.delete(`/admin/feedback/${id}`);
    return res.data;
  },
};
