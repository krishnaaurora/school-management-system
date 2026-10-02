import ApiClient from '../../services/apiClient';

export const adminApi = {
  // Legacy / existing endpoints
  getTimetables: async () => ApiClient.get('/timetables'),
  getLeaves: async () => ApiClient.get('/leaves'),
  getSubstitutions: async () => ApiClient.get('/substitutions'),
  updateLeaveStatus: async (id, data) => ApiClient.patch(`/leaves/${id}/status`, data),
  assignSubstitute: async (id, data) => ApiClient.patch(`/substitutions/${id}/assign`, data),
  analyzeLeaveImpact: async (data) => ApiClient.post('/ai/analyze-leave', data),
  getInquiries: async () => ApiClient.get('/admissions/inquiries'),

  // Teacher Management endpoints
  getTeachers: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.department && params.department !== 'All') query.append('department', params.department);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    const queryString = query.toString();
    return ApiClient.get(`/admin/teachers${queryString ? `?${queryString}` : ''}`);
  },
  getTeacher: async (id) => ApiClient.get(`/admin/teachers/${id}`),
  createTeacher: async (data) => ApiClient.post('/admin/teachers', data),
  updateTeacher: async (id, data) => ApiClient.put(`/admin/teachers/${id}`, data),
  updateTeacherStatus: async (id, status) => ApiClient.patch(`/admin/teachers/${id}/status`, { status }),
  resetTeacherPassword: async (id) => ApiClient.post(`/admin/teachers/${id}/reset-password`, {}),

  // Student Management endpoints
  getStudents: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.class_name && params.class_name !== 'All') query.append('class_name', params.class_name);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    const queryString = query.toString();
    return ApiClient.get(`/admin/students${queryString ? `?${queryString}` : ''}`);
  },
  getStudent: async (id) => ApiClient.get(`/admin/students/${id}`),
  createStudent: async (data) => ApiClient.post('/admin/students', data),
  updateStudent: async (id, data) => ApiClient.put(`/admin/students/${id}`, data),
  updateStudentStatus: async (id, status) => ApiClient.patch(`/admin/students/${id}/status`, { status }),
  resetStudentPassword: async (id) => ApiClient.post(`/admin/students/${id}/reset-password`, {}),
};
