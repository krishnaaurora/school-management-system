import ApiClient from '../../services/apiClient';

export const teacherApi = {
  getProfile: async () => ApiClient.get('/teachers/T-107'),
  getTimetable: async () => ApiClient.get('/timetables'),
  getLeaves: async () => ApiClient.get('/leaves'),
  submitLeave: async (data) => ApiClient.post('/leaves', data),
  getSubstitutions: async () => ApiClient.get('/substitutions'),
  getStudents: async () => ApiClient.get('/students'),
};
