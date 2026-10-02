import { useState, useEffect } from 'react';
import {
  TEACHER_PROFILE_DATA,
  TEACHER_TODAY_TIMETABLE,
  CLASS_STUDENTS_ROSTER,
  INITIAL_TEACHER_LEAVES,
  TEACHER_NOTIFICATIONS,
} from '../../../data/teacherData';
import { teacherApi } from '../api';

export function useTeacherData() {
  const [profile, setProfile] = useState(TEACHER_PROFILE_DATA);
  const [timetable, setTimetable] = useState(TEACHER_TODAY_TIMETABLE);
  const [studentsRoster, setStudentsRoster] = useState(CLASS_STUDENTS_ROSTER);
  const [leaves, setLeaves] = useState(INITIAL_TEACHER_LEAVES);
  const [notifications, setNotifications] = useState(TEACHER_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gis_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.role === 'TEACHER' || parsed.email?.includes('teacher') || parsed.email?.includes('rajesh') || parsed.email?.includes('gisedu'))) {
          setProfile(prev => ({
            ...prev,
            ...parsed,
            name: parsed.name || prev.name,
            email: parsed.email || prev.email,
            department: parsed.department || prev.department,
            role: parsed.role_title || parsed.role || prev.role,
            id: parsed.id || parsed.profileId || prev.id,
          }));
        }
      }
    } catch {}
  }, []);

  // Submit leave request and automatically compute affected periods
  const submitLeaveRequest = async (leaveForm) => {
    // Generate affected classes from timetable
    const affectedPeriods = timetable
      .filter((t) => !t.isFree)
      .map((t) => ({
        period: `Period ${t.period} (${t.time})`,
        class_name: `Grade ${t.classId}`,
        room: `Room ${t.room}`,
        status: "Unassigned",
      }));

    const newLeave = {
      id: `LV-T-2026-${String(leaves.length + 1).padStart(3, '0')}`,
      dateRange: `${leaveForm.fromDate} to ${leaveForm.toDate}`,
      fromDate: leaveForm.fromDate,
      toDate: leaveForm.toDate,
      duration: leaveForm.duration || "1 day",
      type: leaveForm.type || "Personal Leave",
      reason: leaveForm.reason || "Personal reason",
      additionalNotes: leaveForm.additionalNotes || "",
      status: "Pending",
      appliedOn: new Date().toISOString().slice(0, 10),
      adminRemarks: "Pending Admin Review. AI substitution engine analyzing available faculty...",
      substitutesCovered: [],
      affectedClasses: affectedPeriods,
    };

    setLeaves((prev) => [newLeave, ...prev]);

    // Add notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: "Leave Request Submitted",
      description: `Your leave request for ${newLeave.dateRange} has been submitted for Admin approval.`,
      time: "Just now",
      unread: true,
      type: "leave-submitted",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Attempt backend sync
    try {
      await teacherApi.submitLeave({
        teacher_id: profile.id,
        teacher_name: profile.name,
        subject: profile.subject,
        department: profile.department,
        dates: newLeave.dateRange,
        reason: newLeave.reason,
        type: newLeave.type,
        affected_classes: affectedPeriods,
      });
    } catch {
      // Offline fallback state already set
    }

    return newLeave;
  };

  // Mark student attendance in roster
  const updateAttendance = (classId, studentId, status) => {
    setStudentsRoster((prev) => {
      const classList = prev[classId] || [];
      const updated = classList.map((s) => (s.id === studentId ? { ...s, status } : s));
      return { ...prev, [classId]: updated };
    });
  };

  const bulkUpdateAttendance = (classId, status) => {
    setStudentsRoster((prev) => {
      const classList = prev[classId] || [];
      const updated = classList.map((s) => ({ ...s, status }));
      return { ...prev, [classId]: updated };
    });
  };

  return {
    profile,
    timetable,
    studentsRoster,
    leaves,
    notifications,
    loading,
    submitLeaveRequest,
    updateAttendance,
    bulkUpdateAttendance,
    setLeaves,
    setNotifications,
  };
}
