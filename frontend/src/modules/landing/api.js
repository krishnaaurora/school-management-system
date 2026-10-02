import ApiClient from '../../services/apiClient';

export const landingApi = {
  submitContactInquiry: async (data) => ApiClient.post('/admissions/inquire', data),
};
