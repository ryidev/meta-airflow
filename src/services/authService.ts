import { apiService } from './api';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', data);
  },

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/me');
  },

  async logout(): Promise<void> {
    return apiService.post<void>('/auth/logout');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiService.put<User>('/auth/profile', data);
  },

  async uploadAvatar(formData: FormData): Promise<{ avatarUrl: string }> {
    return apiService.uploadFormData<{ avatarUrl: string }>('/auth/avatar', formData);
  },
};
