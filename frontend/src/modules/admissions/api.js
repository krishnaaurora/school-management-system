import ApiClient from '../../services/apiClient';

export const admissionsApi = {
  submitInquiry: async (data) => ApiClient.post('/admissions/inquire', data),
  getInquiries: async () => ApiClient.get('/admissions/inquiries'),
};
