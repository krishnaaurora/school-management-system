import ApiClient from '../../services/apiClient';

export const adminApi = {
  getTeachers: async () => ApiClient.get('/teachers'),
  getStudents: async () => ApiClient.get('/students'),
  getTimetables: async () => ApiClient.get('/timetables'),
  getLeaves: async () => ApiClient.get('/leaves'),
  getSubstitutions: async () => ApiClient.get('/substitutions'),
  updateLeaveStatus: async (id, data) => ApiClient.patch(`/leaves/${id}/status`, data),
  assignSubstitute: async (id, data) => ApiClient.patch(`/substitutions/${id}/assign`, data),
  analyzeLeaveImpact: async (data) => ApiClient.post('/ai/analyze-leave', data),
  getInquiries: async () => ApiClient.get('/admissions/inquiries'),
};
