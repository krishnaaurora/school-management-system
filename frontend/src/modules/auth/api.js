import ApiClient from '../../services/apiClient';

export const authApi = {
  login: async (email, password) => {
    return ApiClient.post('/auth/login', { email, password });
  },
  getMe: async () => {
    return ApiClient.get('/auth/me');
  },
  logout: async () => {
    return ApiClient.post('/auth/logout', {});
  },
};
