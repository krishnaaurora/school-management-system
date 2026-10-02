import { useState, useEffect } from 'react';
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
} from '../../../data/studentData';
import { studentApi } from '../api';

export function useStudentData() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [student, setStudent] = useState(INITIAL_STUDENT_PROFILE);
  const [summary, setSummary] = useState(INITIAL_STUDENT_SUMMARY);
  const [timetable, setTimetable] = useState(INITIAL_STUDENT_TIMETABLE);
  const [attendance, setAttendance] = useState(INITIAL_STUDENT_ATTENDANCE);
  const [subjects, setSubjects] = useState(INITIAL_STUDENT_SUBJECTS);
  const [teachers, setTeachers] = useState(INITIAL_STUDENT_TEACHERS);
  const [exams, setExams] = useState(INITIAL_STUDENT_EXAMS);
  const [announcements, setAnnouncements] = useState(INITIAL_STUDENT_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState(INITIAL_STUDENT_NOTIFICATIONS);

  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return {
    loading,
    activeTab,
    student,
    summary,
    timetable,
    attendance,
    subjects,
    teachers,
    exams,
    announcements,
    notifications,
    selectedDay,
    selectedSubjectDetail,
    setSelectedDay,
    setSelectedSubjectDetail,
    handleTabChange,
    handleMarkNotificationRead,
    handleMarkAllNotificationsRead,
    handleClearNotifications,
  };
}
