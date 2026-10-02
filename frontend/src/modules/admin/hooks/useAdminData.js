import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import {
  INITIAL_LEAVE_REQUESTS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_TIMETABLE_PERIODS,
} from '../../../data/adminData';

export function useAdminData() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [leaves, setLeaves] = useState(INITIAL_LEAVE_REQUESTS);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE_PERIODS);
  const [loading, setLoading] = useState(false);

  // Attempt to fetch from FastAPI backend, fallback to initial state seamlessly
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [teachersRes, studentsRes, leavesRes, timetableRes] = await Promise.allSettled([
          adminApi.getTeachers(),
          adminApi.getStudents(),
          adminApi.getLeaves(),
          adminApi.getTimetables(),
        ]);

        if (teachersRes.status === 'fulfilled' && Array.isArray(teachersRes.value)) {
          setTeachers(teachersRes.value);
        }
        if (studentsRes.status === 'fulfilled' && Array.isArray(studentsRes.value)) {
          setStudents(studentsRes.value);
        }
        if (leavesRes.status === 'fulfilled' && Array.isArray(leavesRes.value)) {
          setLeaves(leavesRes.value);
        }
        if (timetableRes.status === 'fulfilled' && Array.isArray(timetableRes.value)) {
          setTimetable(timetableRes.value);
        }
      } catch (err) {
        console.warn('Backend offline, using local state store');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return {
    teachers,
    setTeachers,
    students,
    setStudents,
    leaves,
    setLeaves,
    timetable,
    setTimetable,
    loading,
  };
}
