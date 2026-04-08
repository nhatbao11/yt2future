import apiClient from '@/services/apiClient';
import type { ApiEnvelope } from '@/types/api';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  avatarUrl?: string | null;
};

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await apiClient.post<ApiEnvelope>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterPayload) => {
    const response = await apiClient.post<ApiEnvelope>('/auth/register', data);
    return response.data;
  },

  grantGoogleRole: async (profile: { email: string; name: string; picture: string }) => {
    const response = await apiClient.post<ApiEnvelope>('/auth/grant-google-role', profile);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get<ApiEnvelope>('/auth/me');
    return response.data;
  },
};
