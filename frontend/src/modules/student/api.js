import apiClient from '../../services/apiClient';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_STUDENT_SUMMARY,
  INITIAL_STUDENT_TIMETABLE,
  INITIAL_STUDENT_ATTENDANCE,
  INITIAL_STUDENT_SUBJECTS,
  INITIAL_STUDENT_TEACHERS,
  INITIAL_STUDENT_EXAMS,
  INITIAL_STUDENT_ANNOUNCEMENTS,
  INITIAL_STUDENT_NOTIFICATIONS
} from '../../data/studentData';

export const studentApi = {
  getProfile: async () => {
    try {
      const res = await apiClient.get('/students/profile');
      return res.data || INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  },

  getTimetable: async () => {
    try {
      const res = await apiClient.get('/students/timetable');
      return res.data || INITIAL_STUDENT_TIMETABLE;
    } catch {
      return INITIAL_STUDENT_TIMETABLE;
    }
  },

  getAttendance: async () => {
    try {
      const res = await apiClient.get('/students/attendance');
      return res.data || INITIAL_STUDENT_ATTENDANCE;
    } catch {
      return INITIAL_STUDENT_ATTENDANCE;
    }
  },

  getExams: async () => {
    try {
      const res = await apiClient.get('/students/exams');
      return res.data || INITIAL_STUDENT_EXAMS;
    } catch {
      return INITIAL_STUDENT_EXAMS;
    }
  },

  getAnnouncements: async () => {
    try {
      const res = await apiClient.get('/students/announcements');
      return res.data || INITIAL_STUDENT_ANNOUNCEMENTS;
    } catch {
      return INITIAL_STUDENT_ANNOUNCEMENTS;
    }
  },

  getNotifications: async () => {
    try {
      const res = await apiClient.get('/students/notifications');
      return res.data || INITIAL_STUDENT_NOTIFICATIONS;
    } catch {
      return INITIAL_STUDENT_NOTIFICATIONS;
    }
  }
};
