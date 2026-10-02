import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  BarChart3, 
  Sparkles, 
  Award, 
  Search, 
  Printer, 
  ShieldCheck, 
  BookOpen, 
  SlidersHorizontal,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';

// Master Daily Attendance Database with calendar dates
const MOCK_DAILY_ATTENDANCE_LOGS = [
  // OCTOBER 2026
  {
    date: '2026-10-02',
    dayNum: 2,
    dateLabel: 'Friday, Oct 02, 2026',
    monthKey: '2026-10',
    monthLabel: 'October 2026',
    dayOfWeek: 'Friday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Algebraic Polynomials' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Ohm’s Law & Resistors' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Titration Analysis' },
      { period: 'P4 (11:00 - 11:45)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Poetry & Rhetoric' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Indian National Movement' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Python Data Structures' },
    ]
  },
  {
    date: '2026-10-01',
    dayNum: 1,
    dateLabel: 'Thursday, Oct 01, 2026',
    monthKey: '2026-10',
    monthLabel: 'October 2026',
    dayOfWeek: 'Thursday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Science (Biology)', code: 'SCI-10', teacher: 'Mr. Rahul Verma', room: 'Room 205', status: 'Present', note: 'Cell Division Mitosis' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Quadratic Equations' },
      { period: 'P3 (10:15 - 11:00)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Formal Letter Writing' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Kinematic Formulas' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Problem Solving Drill' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Physical Education', code: 'PE-10', teacher: 'Coach Vikram', room: 'Sports Ground', status: 'Present', note: 'Track Sprint 200m' },
    ]
  },

  // SEPTEMBER 2026
  {
    date: '2026-09-30',
    dayNum: 30,
    dateLabel: 'Wednesday, Sep 30, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Wednesday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Julius Caesar Act 3' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Optics & Reflection' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Coordinate Geometry' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Acids, Bases & Salts' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Federalism & Democracy' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Neural Networks Intro' },
    ]
  },
  {
    date: '2026-09-29',
    dayNum: 29,
    dateLabel: 'Tuesday, Sep 29, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Tuesday',
    dayPercentage: 83.3,
    status: 'Late',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Excused', note: 'Medical Leave (Slip #MED-942)' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Mr. Rahul Verma', room: 'Room 205', status: 'Late', note: 'Arrived at 09:22 AM (Clinic appointment)' },
      { period: 'P3 (10:15 - 11:00)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Grammar Comprehension' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Economic Sectors' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Physical Education', code: 'PE-10', teacher: 'Coach Vikram', room: 'Sports Complex', status: 'Present', note: 'Badminton Drills' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Recursion Logic' },
    ]
  },
  {
    date: '2026-09-28',
    dayNum: 28,
    dateLabel: 'Monday, Sep 28, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Monday',
    dayPercentage: 83.3,
    status: 'Absent',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Trigonometry Ratios' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Refraction & Lenses' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Periodic Trends' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Absent', note: 'Inter-School debate rehearsal' },
      { period: 'P5 (12:30 - 01:15)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Creative Writing' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Resources & Development' },
    ]
  },
  {
    date: '2026-09-25',
    dayNum: 25,
    dateLabel: 'Friday, Sep 25, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Friday',
    dayPercentage: 83.3,
    status: 'Absent',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Trigonometric Identities' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Ray Diagrams' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Absent', note: 'Sick Room Rest' },
      { period: 'P4 (11:00 - 11:45)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Grammar Clause analysis' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Nationalism in Europe' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Database Queries SQL' },
    ]
  },
  {
    date: '2026-09-24',
    dayNum: 24,
    dateLabel: 'Thursday, Sep 24, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Thursday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Science (Biology)', code: 'SCI-10', teacher: 'Mr. Rahul Verma', room: 'Room 205', status: 'Present', note: 'Life Processes' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Heights & Distances' },
      { period: 'P3 (10:15 - 11:00)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Speech Writing' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Magnetic Effects of Current' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Practice Worksheet #4' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Physical Education', code: 'PE-10', teacher: 'Coach Vikram', room: 'Sports Complex', status: 'Present', note: 'Basketball Training' },
    ]
  },
  {
    date: '2026-09-23',
    dayNum: 23,
    dateLabel: 'Wednesday, Sep 23, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Wednesday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Poetry Appreciation' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Lenses Formula' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Circles & Tangents' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Chemical Reactions' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Agriculture & Crops' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Arrays & Lists' },
    ]
  },
  {
    date: '2026-09-22',
    dayNum: 22,
    dateLabel: 'Tuesday, Sep 22, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Tuesday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Triangles Theorems' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Mr. Rahul Verma', room: 'Room 205', status: 'Present', note: 'Periodic Table' },
      { period: 'P3 (10:15 - 11:00)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Comprehension' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Federal Structure' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Physical Education', code: 'PE-10', teacher: 'Coach Vikram', room: 'Sports Complex', status: 'Present', note: 'Athletic Conditioning' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Flowcharts & Logic' },
    ]
  },
  {
    date: '2026-09-21',
    dayNum: 21,
    dateLabel: 'Monday, Sep 21, 2026',
    monthKey: '2026-09',
    monthLabel: 'September 2026',
    dayOfWeek: 'Monday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Arithmetic Progression' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Electricity' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Metals' },
      { period: 'P4 (11:00 - 11:45)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Problems' },
      { period: 'P5 (12:30 - 01:15)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Article Writing' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Development' },
    ]
  },

  // AUGUST 2026
  {
    date: '2026-08-28',
    dayNum: 28,
    dateLabel: 'Friday, Aug 28, 2026',
    monthKey: '2026-08',
    monthLabel: 'August 2026',
    dayOfWeek: 'Friday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Linear Equations in 2 Variables' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Electric Potential & Current' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Metals & Non-metals' },
      { period: 'P4 (11:00 - 11:45)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Literature Prose' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Water Resources' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Object Oriented Programming' },
    ]
  },

  // JULY 2026
  {
    date: '2026-07-24',
    dayNum: 24,
    dateLabel: 'Friday, Jul 24, 2026',
    monthKey: '2026-07',
    monthLabel: 'July 2026',
    dayOfWeek: 'Friday',
    dayPercentage: 100,
    status: 'Present',
    periods: [
      { period: 'P1 (08:30 - 09:15)', subject: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', status: 'Present', note: 'Real Numbers & Euclid Division' },
      { period: 'P2 (09:15 - 10:00)', subject: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', room: 'Room 204', status: 'Present', note: 'Fundamental Forces' },
      { period: 'P3 (10:15 - 11:00)', subject: 'Science (Chemistry)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta', room: 'Chemistry Lab', status: 'Present', note: 'Chemical Equations Balance' },
      { period: 'P4 (11:00 - 11:45)', subject: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', room: 'Room 102', status: 'Present', note: 'Letter of Enquiry' },
      { period: 'P5 (12:30 - 01:15)', subject: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', room: 'Room 105', status: 'Present', note: 'Power Sharing in Democracy' },
      { period: 'P6 (01:15 - 02:00)', subject: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', room: 'Computer Wing', status: 'Present', note: 'Basics of Computer Systems' },
    ]
  }
];

// Special Academic Calendar Holidays / School Closed Events
const ACADEMIC_CALENDAR_EVENTS = {
  '2026-10-02': { title: 'Gandhi Jayanti', isHoliday: false, note: 'Special Assembly & Term Inception Sessions' },
  '2026-10-18': { title: 'Annual Sports Day', isHoliday: false, note: 'Inter-House Athletic Meet' },
  '2026-10-24': { title: 'Diwali Break', isHoliday: true, note: 'Campus Closed' },
  '2026-09-05': { title: "Teachers' Day", isHoliday: false, note: 'Student Faculty Exchange Event' },
  '2026-08-15': { title: 'Independence Day', isHoliday: false, note: 'Grand Campus Flag Hoisting' },
};

// Monthly Master Ledger Summary
const MONTHLY_ATTENDANCE_SUMMARY = [
  {
    monthKey: '2026-10',
    monthName: 'October 2026',
    year: 2026,
    monthIndex: 9, // 0-indexed: 9 is October
    daysInMonth: 31,
    startDayOfWeek: 4, // Thursday (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
    totalWorkingDays: 2,
    totalSessions: 12,
    presentSessions: 12,
    absentSessions: 0,
    lateSessions: 0,
    excusedSessions: 0,
    percentage: 100.0,
    status: 'Stellar Compliance',
    highlight: 'Current Month'
  },
  {
    monthKey: '2026-09',
    monthName: 'September 2026',
    year: 2026,
    monthIndex: 8, // September
    daysInMonth: 30,
    startDayOfWeek: 2, // Tuesday
    totalWorkingDays: 24,
    totalSessions: 144,
    presentSessions: 138,
    absentSessions: 3,
    lateSessions: 2,
    excusedSessions: 1,
    percentage: 95.8,
    status: 'CBSE Compliant',
    highlight: 'Term 1 Core'
  },
  {
    monthKey: '2026-08',
    monthName: 'August 2026',
    year: 2026,
    monthIndex: 7, // August
    daysInMonth: 31,
    startDayOfWeek: 6, // Saturday
    totalWorkingDays: 22,
    totalSessions: 132,
    presentSessions: 128,
    absentSessions: 2,
    lateSessions: 1,
    excusedSessions: 1,
    percentage: 97.0,
    status: 'Stellar Compliance',
    highlight: 'Mid Term'
  },
  {
    monthKey: '2026-07',
    monthName: 'July 2026',
    year: 2026,
    monthIndex: 6, // July
    daysInMonth: 31,
    startDayOfWeek: 3, // Wednesday
    totalWorkingDays: 25,
    totalSessions: 150,
    presentSessions: 147,
    absentSessions: 1,
    lateSessions: 1,
    excusedSessions: 1,
    percentage: 98.0,
    status: 'Stellar Compliance',
    highlight: 'Session Onset'
  }
];

// Subject metrics
const SUBJECT_METRICS = [
  { id: 'all', name: 'All Subjects', short: 'All' },
  { id: 'math', name: 'Mathematics', code: 'MATH-10', teacher: 'Mrs. Ananya Sharma', present: 58, total: 60, percentage: 96.7 },
  { id: 'sci', name: 'Science (Chem & Bio)', code: 'SCI-10', teacher: 'Dr. Rajesh Gupta & Mr. Rahul Verma', present: 48, total: 50, percentage: 96.0 },
  { id: 'phy', name: 'Physics', code: 'PHY-10', teacher: 'Mr. Arjun Rao', present: 37, total: 40, percentage: 92.5 },
  { id: 'eng', name: 'English Core', code: 'ENG-10', teacher: 'Mrs. Sunita Rao', present: 39, total: 40, percentage: 97.5 },
  { id: 'sst', name: 'Social Science', code: 'HIST-10', teacher: 'Mr. Vikram Singh', present: 38, total: 40, percentage: 95.0 },
  { id: 'cs', name: 'Computer Science & AI', code: 'CS-10', teacher: 'Mr. Tanmay Joshi', present: 30, total: 30, percentage: 100.0 },
  { id: 'pe', name: 'Physical Education', code: 'PE-10', teacher: 'Coach Vikram', present: 20, total: 20, percentage: 100.0 },
];

export default function StudentAttendance({ attendance = {}, summary = {} }) {
  // Navigation View: 'calendar' (default) | 'daily' | 'monthly' | 'subjects'
  const [activeView, setActiveView] = useState('calendar');
  
  // Active calendar month key (e.g. '2026-10')
  const [calendarMonthKey, setCalendarMonthKey] = useState('2026-10');
  
  // Interactive Filters (Pills)
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected date on calendar for inspector
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-10-02');
  const [expandedDay, setExpandedDay] = useState('2026-10-02');

  // Find active calendar month meta
  const currentMonthMeta = useMemo(() => {
    return MONTHLY_ATTENDANCE_SUMMARY.find(m => m.monthKey === calendarMonthKey) || MONTHLY_ATTENDANCE_SUMMARY[0];
  }, [calendarMonthKey]);

  // Navigate calendar month
  const handlePrevMonth = () => {
    const idx = MONTHLY_ATTENDANCE_SUMMARY.findIndex(m => m.monthKey === calendarMonthKey);
    if (idx < MONTHLY_ATTENDANCE_SUMMARY.length - 1) {
      const nextKey = MONTHLY_ATTENDANCE_SUMMARY[idx + 1].monthKey;
      setCalendarMonthKey(nextKey);
      // Select first logged day in that month or 1st of month
      const logged = MOCK_DAILY_ATTENDANCE_LOGS.find(d => d.monthKey === nextKey);
      if (logged) setSelectedCalendarDate(logged.date);
    }
  };

  const handleNextMonth = () => {
    const idx = MONTHLY_ATTENDANCE_SUMMARY.findIndex(m => m.monthKey === calendarMonthKey);
    if (idx > 0) {
      const prevKey = MONTHLY_ATTENDANCE_SUMMARY[idx - 1].monthKey;
      setCalendarMonthKey(prevKey);
      const logged = MOCK_DAILY_ATTENDANCE_LOGS.find(d => d.monthKey === prevKey);
      if (logged) setSelectedCalendarDate(logged.date);
    }
  };

  // Map of daily attendance by date string for O(1) calendar lookups
  const attendanceMap = useMemo(() => {
    const map = {};
    MOCK_DAILY_ATTENDANCE_LOGS.forEach(log => {
      map[log.date] = log;
    });
    return map;
  }, []);

  // Filtered Daily Records (for list view)
  const filteredDailyLogs = useMemo(() => {
    return MOCK_DAILY_ATTENDANCE_LOGS.filter((day) => {
      if (calendarMonthKey !== 'all' && day.monthKey !== calendarMonthKey && activeView === 'calendar') {
        // Keep within active calendar month when in calendar mode
      }

      if (selectedSubject !== 'all') {
        const hasSubject = day.periods.some(p => p.subject.toLowerCase().includes(selectedSubject.toLowerCase()));
        if (!hasSubject) return false;
      }

      if (selectedStatus !== 'all') {
        const hasStatus = day.periods.some(p => p.status.toLowerCase() === selectedStatus.toLowerCase());
        if (!hasStatus) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesDate = day.dateLabel.toLowerCase().includes(q);
        const matchesSubject = day.periods.some(p => 
          p.subject.toLowerCase().includes(q) || 
          p.teacher.toLowerCase().includes(q) ||
          p.note.toLowerCase().includes(q)
        );
        if (!matchesDate && !matchesSubject) return false;
      }

      return true;
    });
  }, [calendarMonthKey, selectedSubject, selectedStatus, searchQuery, activeView]);

  // Aggregate dynamic metrics
  const currentFilteredMetrics = useMemo(() => {
    let totalPeriods = 0;
    let presentPeriods = 0;
    let absentPeriods = 0;
    let latePeriods = 0;
    let excusedPeriods = 0;

    MOCK_DAILY_ATTENDANCE_LOGS.forEach(day => {
      if (calendarMonthKey !== 'all' && day.monthKey !== calendarMonthKey) {
        return;
      }

      day.periods.forEach(p => {
        if (selectedSubject !== 'all' && !p.subject.toLowerCase().includes(selectedSubject.toLowerCase())) {
          return;
        }
        if (selectedStatus !== 'all' && p.status.toLowerCase() !== selectedStatus.toLowerCase()) {
          return;
        }

        totalPeriods++;
        if (p.status === 'Present') presentPeriods++;
        else if (p.status === 'Absent') absentPeriods++;
        else if (p.status === 'Late') latePeriods++;
        else if (p.status === 'Excused') excusedPeriods++;
      });
    });

    const calculatedPercentage = totalPeriods > 0 
      ? Math.round(((presentPeriods + latePeriods * 0.5 + excusedPeriods) / totalPeriods) * 1000) / 10 
      : 96.4;

    return {
      total: totalPeriods || 90,
      present: presentPeriods || 87,
      absent: absentPeriods || 2,
      late: latePeriods || 1,
      excused: excusedPeriods || 1,
      percentage: calculatedPercentage || 96.4
    };
  }, [calendarMonthKey, selectedSubject, selectedStatus]);

  // Selected date object for the inspector drawer
  const activeSelectedDayLog = attendanceMap[selectedCalendarDate];

  // Build Calendar Matrix for current month
  const calendarCells = useMemo(() => {
    const { daysInMonth, startDayOfWeek, year, monthIndex } = currentMonthMeta;
    const cells = [];

    // Empty padding cells for days before month start
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push({ isPadding: true, key: `pad-start-${i}` });
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(monthIndex + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${year}-${monthStr}-${dayStr}`;
      
      const dayOfWeekIdx = (startDayOfWeek + d - 1) % 7;
      const isSunday = dayOfWeekIdx === 0;
      const isSaturday = dayOfWeekIdx === 6;
      const log = attendanceMap[dateKey];
      const holidayEvent = ACADEMIC_CALENDAR_EVENTS[dateKey];

      cells.push({
        isPadding: false,
        dayNum: d,
        dateKey,
        isSunday,
        isSaturday,
        log,
        holidayEvent,
        key: dateKey
      });
    }

    // Trailing padding cells to complete 7-column grid
    const totalCells = cells.length;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remaining; i++) {
      cells.push({ isPadding: true, key: `pad-end-${i}` });
    }

    return cells;
  }, [currentMonthMeta, attendanceMap]);

  return (
    <div className="space-y-6">
      
      {/* ── TOP HERO BANNER: HERITAGE ACADEMIC ATTENDANCE ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-900/10 shadow-2xs relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>CBSE Statutory Compliance: 85.0% Mandatory Benchmark Satisfied</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23] tracking-tight">
            Academic Attendance & Calendar Ledger
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Interactive monthly calendar grid, daily period-by-period logs, proxy notes, and verified CBSE compliance tracker for Class 10-A (Session 2026–27).
          </p>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-semibold text-stone-500">Safe Margin:</span>
            <span className="text-xs font-bold text-[#0B2E23] px-2.5 py-0.5 rounded-lg bg-[#FAF8F3] border border-[#C5A880]/40">
              Up to 8 sessions can be missed before falling below 85%
            </span>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Calculated Rate</span>
            <span className="font-serif text-2xl font-bold text-emerald-800">{currentFilteredMetrics.percentage}%</span>
            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">🌟 Board Qualified</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Attended</span>
            <span className="font-serif text-2xl font-bold text-[#0B2E23]">{currentFilteredMetrics.present}</span>
            <span className="text-[10px] text-stone-500 block mt-0.5">Periods</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Late / Excused</span>
            <span className="font-serif text-2xl font-bold text-amber-800">{currentFilteredMetrics.late + currentFilteredMetrics.excused}</span>
            <span className="text-[10px] text-amber-700 block mt-0.5">Authorized</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Absent</span>
            <span className="font-serif text-2xl font-bold text-rose-700">{currentFilteredMetrics.absent}</span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Unexcused</span>
          </div>
        </div>

      </div>

      {/* ── VIEW SWITCHER TABS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Main View Mode Selector */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-amber-900/10 shadow-2xs flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveView('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'calendar'
                ? 'bg-[#0B2E23] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-[#0B2E23] hover:bg-stone-50'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Interactive Calendar Format</span>
            <span className="px-1.5 py-0.2 rounded-md bg-[#FAF8F3] text-[#0B2E23] text-[10px] font-bold">
              Visual Grid
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'daily'
                ? 'bg-[#0B2E23] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-[#0B2E23] hover:bg-stone-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Day-by-Day List Registry</span>
            <span className="px-1.5 py-0.2 rounded-md bg-[#FAF8F3] text-[#0B2E23] text-[10px] font-bold">
              {filteredDailyLogs.length} Days
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'monthly'
                ? 'bg-[#0B2E23] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-[#0B2E23] hover:bg-stone-50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Monthly Performance Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('subjects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'subjects'
                ? 'bg-[#0B2E23] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-[#0B2E23] hover:bg-stone-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Subject Percentage Meters</span>
          </button>
        </div>

        {/* Print / Export Action */}
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#0B2E23] border border-amber-900/20 text-xs font-bold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Print Attendance Statement</span>
        </button>

      </div>

      {/* ── INTERACTIVE FILTER PILL BAR ── */}
      <div className="bg-white rounded-2xl p-5 border border-amber-900/10 shadow-2xs space-y-4">
        
        {/* Filter Title & Quick Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B2E23]">
              Interactive Filters & Precision Selectors
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search date, topic, teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[#FAF8F3] border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#0B2E23] text-stone-800 placeholder-stone-400"
            />
          </div>
        </div>

        {/* 1. Month Selector Pills */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Select Academic Month:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {MONTHLY_ATTENDANCE_SUMMARY.map(m => (
              <button
                key={m.monthKey}
                type="button"
                onClick={() => setCalendarMonthKey(m.monthKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  calendarMonthKey === m.monthKey
                    ? 'bg-[#0B2E23] text-[#D4AF37] font-bold shadow-2xs'
                    : 'bg-[#FAF8F3] text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{m.monthName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  calendarMonthKey === m.monthKey ? 'bg-emerald-900 text-emerald-200' : 'bg-stone-200 text-stone-700'
                }`}>
                  {m.percentage}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Subject Filter Pills */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Filter Attendance by Subject:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-[#0B2E23] text-[#D4AF37] font-bold shadow-2xs'
                  : 'bg-[#FAF8F3] text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Subjects (6 Core + Labs)
            </button>

            {SUBJECT_METRICS.filter(s => s.id !== 'all').map(sub => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubject(sub.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSubject === sub.name
                    ? 'bg-[#0B2E23] text-[#D4AF37] font-bold shadow-2xs'
                    : 'bg-[#FAF8F3] text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  selectedSubject === sub.name ? 'bg-emerald-900 text-emerald-200' : 'bg-stone-200 text-stone-700'
                }`}>
                  {sub.percentage}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Status Filter Pills */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Filter By Status:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Statuses' },
              { id: 'Present', label: '✅ Present Only', count: '87' },
              { id: 'Late', label: '⏰ Late Arrival', count: '2' },
              { id: 'Absent', label: '❌ Absent', count: '3' },
              { id: 'Excused', label: '🏥 Medical / Excused', count: '1' }
            ].map(st => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStatus === st.id
                    ? 'bg-[#0B2E23] text-[#D4AF37] font-bold shadow-2xs'
                    : 'bg-[#FAF8F3] text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{st.label}</span>
                {st.count && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    selectedStatus === st.id ? 'bg-[#D4AF37] text-[#0B2E23]' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {st.count}
                  </span>
                )}
              </button>
            ))}

            {(selectedSubject !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-rose-700 hover:text-rose-800 hover:underline px-2 py-1 ml-auto cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 0: INTERACTIVE CALENDAR FORMAT (MAIN VIEW) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeView === 'calendar' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-amber-900/10 shadow-2xs overflow-hidden">
            
            {/* Calendar Header with Month Navigation */}
            <div className="p-5 bg-stone-50/80 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#0B2E23] cursor-pointer transition-colors"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-base font-bold text-[#0B2E23] px-3">
                    {currentMonthMeta.monthName}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-[#0B2E23] cursor-pointer transition-colors"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 hidden sm:inline-block">
                  Monthly Rate: {currentMonthMeta.percentage}%
                </span>
              </div>

              {/* Calendar Status Legend */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-stone-600">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Present (100%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Late / Partial</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Absent</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Medical Leave</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span>Weekend / Closed</span>
                </span>
              </div>
            </div>

            {/* Calendar Day of Week Header Grid */}
            <div className="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wider text-stone-500 bg-[#FAF8F3] border-b border-stone-200 py-2.5">
              <span className="text-rose-700">Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span className="text-stone-400">Sat</span>
            </div>

            {/* 7-Column Calendar Cells Grid */}
            <div className="grid grid-cols-7 gap-px bg-stone-200 p-px">
              {calendarCells.map((cell) => {
                if (cell.isPadding) {
                  return (
                    <div 
                      key={cell.key} 
                      className="bg-stone-50/60 min-h-[95px] sm:min-h-[115px] p-2"
                    />
                  );
                }

                const { dayNum, dateKey, isSunday, isSaturday, log, holidayEvent } = cell;
                const isSelected = selectedCalendarDate === dateKey;
                
                // Determine day attendance styling
                let bgClass = 'bg-white';
                let borderClass = 'border-transparent';
                let indicator = null;

                if (holidayEvent && holidayEvent.isHoliday) {
                  bgClass = 'bg-amber-50/40';
                  indicator = (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded truncate block mt-1">
                      {holidayEvent.title}
                    </span>
                  );
                } else if (isSunday) {
                  bgClass = 'bg-[#FAF8F3]/70';
                  indicator = (
                    <span className="text-[10px] font-semibold text-stone-400 block mt-1">
                      Weekend
                    </span>
                  );
                } else if (log) {
                  if (log.dayPercentage === 100) {
                    bgClass = isSelected ? 'bg-emerald-50/90' : 'bg-emerald-50/40 hover:bg-emerald-50';
                    indicator = (
                      <div className="mt-1 space-y-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          6/6 Present
                        </span>
                      </div>
                    );
                  } else if (log.status === 'Late') {
                    bgClass = isSelected ? 'bg-amber-50/90' : 'bg-amber-50/40 hover:bg-amber-50';
                    indicator = (
                      <div className="mt-1 space-y-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-amber-700" />
                          5/6 &bull; 1 Late
                        </span>
                      </div>
                    );
                  } else if (log.status === 'Absent') {
                    bgClass = isSelected ? 'bg-rose-50/90' : 'bg-rose-50/40 hover:bg-rose-50';
                    indicator = (
                      <div className="mt-1 space-y-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">
                          <XCircle className="w-3 h-3 text-rose-700" />
                          5/6 &bull; 1 Absent
                        </span>
                      </div>
                    );
                  }
                } else if (!isSaturday && !isSunday && dayNum <= 2) {
                  indicator = (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/60 px-1.5 py-0.5 rounded block mt-1">
                      Present
                    </span>
                  );
                } else if (isSaturday) {
                  bgClass = 'bg-[#FAF8F3]/50';
                  indicator = (
                    <span className="text-[10px] font-semibold text-stone-400 block mt-1">
                      Prep / Lab
                    </span>
                  );
                }

                return (
                  <div
                    key={cell.key}
                    onClick={() => {
                      setSelectedCalendarDate(dateKey);
                    }}
                    className={`min-h-[95px] sm:min-h-[115px] p-2.5 transition-all cursor-pointer relative flex flex-col justify-between ${bgClass} ${
                      isSelected 
                        ? 'ring-2 ring-[#0B2E23] ring-inset shadow-md z-10' 
                        : 'hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold font-serif ${
                        isSelected 
                          ? 'w-6 h-6 rounded-full bg-[#0B2E23] text-[#D4AF37] flex items-center justify-center' 
                          : isSunday ? 'text-rose-700' : 'text-stone-800'
                      }`}>
                        {dayNum}
                      </span>

                      {log && (
                        <span className={`text-[10px] font-bold ${
                          log.dayPercentage === 100 ? 'text-emerald-800' : 'text-amber-800'
                        }`}>
                          {log.dayPercentage}%
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {indicator}
                    </div>

                    {holidayEvent && !holidayEvent.isHoliday && (
                      <span className="text-[9px] text-[#8C6218] font-bold truncate block">
                        ★ {holidayEvent.title}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* ── SELECTED DAY INSPECTOR PANEL (PERIOD-BY-PERIOD DETAILS) ── */}
          {activeSelectedDayLog ? (
            <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif text-lg font-bold text-[#0B2E23]">
                      {activeSelectedDayLog.dateLabel}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Class 10-A Daily Attendance & Period Ledger &bull; {activeSelectedDayLog.periods.length} Periods Logged
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    activeSelectedDayLog.dayPercentage === 100 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {activeSelectedDayLog.dayPercentage === 100 ? '100% Full Attendance' : 'Partial Session Verified'}
                  </span>
                </div>
              </div>

              {/* Period Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {activeSelectedDayLog.periods.map((p, idx) => {
                  let badge = (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Present
                    </span>
                  );

                  if (p.status === 'Late') {
                    badge = (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        Late (Verified)
                      </span>
                    );
                  } else if (p.status === 'Absent') {
                    badge = (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-700" />
                        Absent
                      </span>
                    );
                  } else if (p.status === 'Excused') {
                    badge = (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        Medical Leave
                      </span>
                    );
                  }

                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 shadow-2xs flex flex-col justify-between gap-3 hover:border-[#0B2E23] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0B2E23] text-[#D4AF37]">
                              {p.period.split(' ')[0]}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-[#0B2E23]">
                              {p.subject}
                            </h4>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            {p.teacher} &bull; <span className="font-semibold text-stone-700">{p.room}</span>
                          </p>
                        </div>
                        {badge}
                      </div>

                      <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="italic truncate max-w-[180px]">
                          &ldquo;{p.note}&rdquo;
                        </span>
                        <span className="font-mono text-[10px] text-stone-400 shrink-0">
                          {p.period.match(/\((.*?)\)/)?.[1] || '08:30 AM'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-2xs text-center space-y-2">
              <p className="text-sm font-bold text-[#0B2E23]">
                Selected Date: {selectedCalendarDate}
              </p>
              <p className="text-xs text-stone-500">
                Click on any logged calendar day (e.g. Oct 1, Oct 2, Sep 30, Sep 29) to inspect period-by-period subject attendance details.
              </p>
            </div>
          )}

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 1: DAILY SUBJECT-BY-SUBJECT ATTENDANCE REGISTRY (LIST) ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeView === 'daily' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif text-lg font-bold text-[#0B2E23] flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
              <span>Day-by-Day Subject Period Registry</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredDailyLogs.length} logged school days
            </span>
          </div>

          {filteredDailyLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredDailyLogs.map((day) => {
                const isExpanded = expandedDay === day.date;
                const isFullAttendance = day.dayPercentage === 100;

                return (
                  <div 
                    key={day.date}
                    className="bg-white rounded-2xl border border-amber-900/10 shadow-2xs overflow-hidden transition-all"
                  >
                    <div 
                      onClick={() => setExpandedDay(isExpanded ? null : day.date)}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <button 
                          type="button"
                          className="p-1.5 rounded-xl bg-[#FAF8F3] border border-stone-200 text-stone-600 hover:text-[#0B2E23]"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="font-serif text-base font-bold text-[#0B2E23]">
                              {day.dateLabel}
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-semibold">
                              {day.dayOfWeek}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {day.periods.length} Scheduled Periods &bull; 100% Biometric & Faculty Verified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-stone-400 block">Daily Rate</span>
                          <span className={`font-serif text-base font-bold ${
                            isFullAttendance ? 'text-emerald-800' : 'text-amber-800'
                          }`}>
                            {day.dayPercentage}%
                          </span>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          isFullAttendance 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {isFullAttendance ? 'Full Day Present (6/6)' : 'Partial / Late (5/6)'}
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 pt-1 bg-[#FAF8F3]/50 border-t border-stone-100">
                        <div className="mb-3 flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                          <span>Period-by-Period Subject Log</span>
                          <span>Faculty & Status</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {day.periods.map((p, pIdx) => {
                            let statusBadge = (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                Present
                              </span>
                            );

                            if (p.status === 'Late') {
                              statusBadge = (
                                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                                  Late (Verified)
                                </span>
                              );
                            } else if (p.status === 'Absent') {
                              statusBadge = (
                                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5 text-rose-700" />
                                  Absent
                                </span>
                              );
                            } else if (p.status === 'Excused') {
                              statusBadge = (
                                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                                  Medical Leave
                                </span>
                              );
                            }

                            return (
                              <div 
                                key={pIdx}
                                className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between gap-2 hover:border-[#D4AF37]/50 transition-all"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0B2E23] text-[#D4AF37]">
                                        {p.period.split(' ')[0]}
                                      </span>
                                      <h5 className="font-serif text-sm font-bold text-[#0B2E23]">
                                        {p.subject}
                                      </h5>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1">
                                      {p.teacher} &bull; <span className="font-semibold text-stone-700">{p.room}</span>
                                    </p>
                                  </div>

                                  {statusBadge}
                                </div>

                                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                                  <span className="italic truncate max-w-[200px]">
                                    &ldquo;{p.note}&rdquo;
                                  </span>
                                  <span className="font-mono text-[10px] text-stone-400 shrink-0">
                                    {p.period.match(/\((.*?)\)/)?.[1] || '08:30 AM'}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-amber-900/10 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[#0B2E23]">No attendance records found matching filters</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try switching month pills, subject filters, or clearing your search term.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 2: MONTHLY ATTENDANCE MATRIX & TREND ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeView === 'monthly' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-[#0B2E23] mb-1">
              Monthly Attendance Performance Matrix
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Official monthly compliance evaluation required for CBSE Board Examination Admit Card eligibility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MONTHLY_ATTENDANCE_SUMMARY.map((m) => {
                const isCurrent = m.monthKey === '2026-10';

                return (
                  <div 
                    key={m.monthKey}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-[#FAF8F3] border-[#0B2E23] ring-2 ring-[#0B2E23]/10 shadow-md' 
                        : 'bg-white border-stone-200 shadow-2xs hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        {m.highlight}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.percentage >= 95 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#0B2E23]">{m.monthName}</h4>

                    <div className="my-4 flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-emerald-800">{m.percentage}%</span>
                      <span className="text-xs text-stone-500">Overall Rate</span>
                    </div>

                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                        style={{ width: `${m.percentage}%` }}
                      />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                      <div className="flex justify-between">
                        <span>Working Days:</span>
                        <span className="font-bold text-stone-900">{m.totalWorkingDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Sessions:</span>
                        <span className="font-bold text-stone-900">{m.totalSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Present Sessions:</span>
                        <span className="font-bold text-emerald-800">{m.presentSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Absences:</span>
                        <span className="font-bold text-rose-700">{m.absentSessions}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Comparison Table */}
          <div className="bg-white rounded-2xl border border-amber-900/10 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-[#0B2E23]">
                Subject-Wise Monthly Rate Comparison
              </h4>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                CBSE Threshold: 85% Minimum
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F3] text-stone-600 uppercase font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Jul 2026</th>
                    <th className="py-3 px-4">Aug 2026</th>
                    <th className="py-3 px-4">Sep 2026</th>
                    <th className="py-3 px-4">Oct 2026 (Cur)</th>
                    <th className="py-3 px-4">Term 1 Aggregate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {SUBJECT_METRICS.filter(s => s.id !== 'all').map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0B2E23]">
                        {sub.name}
                        <span className="block text-[10px] text-stone-400 font-normal">{sub.teacher}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800">98.0%</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800">97.5%</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800">95.0%</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800">100.0%</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {sub.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 3: SUBJECT PERCENTAGE METERS ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeView === 'subjects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif text-lg font-bold text-[#0B2E23] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>Subject Attendance Percentage & Statutory Metrics</span>
            </h3>
            <span className="text-xs text-emerald-800 font-bold px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
              100% Board Exam Qualified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBJECT_METRICS.filter(s => s.id !== 'all').map((sub) => {
              return (
                <div 
                  key={sub.id}
                  className="bg-white rounded-2xl p-5 border border-amber-900/10 shadow-2xs hover:border-[#D4AF37] transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                        {sub.code}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#0B2E23] mt-1">
                        {sub.name}
                      </h4>
                      <p className="text-xs text-stone-500">{sub.teacher}</p>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-emerald-800">
                        {sub.percentage}%
                      </span>
                      <span className="text-[10px] text-stone-400 block">
                        {sub.present} / {sub.total} Sessions
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                      <span>Attendance Progress</span>
                      <span className="text-emerald-800 font-bold">+11.7% above CBSE minimum</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-amber-600 z-10" title="85% CBSE Minimum" />
                      <div 
                        className="h-full bg-emerald-700 rounded-full"
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>0%</span>
                      <span className="text-amber-800 font-bold">85% Mandatory</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 flex items-center justify-between text-xs">
                    <span className="text-stone-600">Absences Allowed before 85%:</span>
                    <span className="font-bold text-[#0B2E23] bg-white px-2 py-0.5 rounded border border-stone-200">
                      3 more sessions
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
