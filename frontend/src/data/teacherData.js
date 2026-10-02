export const TEACHER_PROFILE_DATA = {
  id: "GIS-T-2026-089",
  name: "Dr. Rajesh Gupta",
  salutation: "Dr.",
  email: "rajesh.gupta@gisedu.in",
  subject: "Chemistry & STEM",
  department: "Department of Science & Chemistry",
  role: "Head of Department (Science & Chemistry)",
  workingHours: "8:00 AM – 3:30 PM",
  experience: "12 Years (Former Senior Chemistry Lead)",
  qualification: "Ph.D. in Organic Chemistry (IISc Bangalore), M.Sc. (Gold Medalist), B.Ed.",
  joiningYear: "2026",
  officeRoom: "Senior Secondary Science Wing A, Desk 04",
  assignedClasses: [
    { id: "10-A", name: "Grade 10-A", subject: "Chemistry", studentsCount: 32, attendanceAvg: "96%", room: "301", todayPeriod: "Period 3 (10:15–11:00)" },
    { id: "11-A", name: "Grade 11-A", subject: "Organic Chemistry", studentsCount: 28, attendanceAvg: "94%", room: "Chem Lab 1", todayPeriod: "Period 1 (8:30–9:15)" },
    { id: "12-A", name: "Grade 12-A", subject: "Advanced Biochemistry", studentsCount: 26, attendanceAvg: "98%", room: "Chem Lab 2", todayPeriod: "Period 2 (9:15–10:00)" },
    { id: "9-B", name: "Grade 9-B", subject: "General Science", studentsCount: 30, attendanceAvg: "92%", room: "204", todayPeriod: "Period 5 (12:00–12:45)" },
  ],
};

export const ANANYA_SHARMA_PROFILE = {
  id: "GIS-T-023",
  name: "Ananya Sharma",
  salutation: "Mrs.",
  email: "teacher.ananya@greenfieldis.edu",
  subject: "Mathematics",
  department: "Department of Mathematics & STEM",
  role: "Senior Secondary Faculty",
  workingHours: "8:00 AM – 4:00 PM",
  experience: "8 Years",
  qualification: "M.Sc. Applied Mathematics, B.Ed (Gold Medalist)",
  joiningYear: "2024",
  officeRoom: "Senior Secondary Faculty Wing B, Desk 14",
  assignedClasses: [
    { id: "10-A", name: "Grade 10-A", subject: "Mathematics", studentsCount: 32, attendanceAvg: "94%", room: "301", todayPeriod: "Period 3 (10:15–11:00)" },
    { id: "9-B", name: "Grade 9-B", subject: "Mathematics", studentsCount: 30, attendanceAvg: "91%", room: "204", todayPeriod: "Period 2 (9:15–10:00)" },
    { id: "8-A", name: "Grade 8-A", subject: "Mathematics", studentsCount: 35, attendanceAvg: "96%", room: "201", todayPeriod: "Period 1 (8:30–9:15)" },
    { id: "9-A", name: "Grade 9-A", subject: "Mathematics", studentsCount: 28, attendanceAvg: "95%", room: "202", todayPeriod: "Period 5 (12:00–12:45)" },
  ],
};

export const TEACHER_TODAY_TIMETABLE = [
  { period: 1, time: "8:30–9:15", classId: "11-A", subject: "Organic Chemistry", room: "Chem Lab 1", status: "Completed", isFree: false, topic: "Electrophilic Aromatic Substitution & Benzene Mechanisms" },
  { period: 2, time: "9:15–10:00", classId: "12-A", subject: "Biochemistry", room: "Chem Lab 2", status: "Completed", isFree: false, topic: "Peptide Bond Formation & Protein Tertiary Structure" },
  { period: 3, time: "10:15–11:00", classId: "10-A", subject: "Chemistry", room: "301", status: "Next Up", isFree: false, topic: "Chemical Reactions & Redox Titrations" },
  { period: 4, time: "11:00–11:45", classId: "Free", subject: "—", room: "Faculty Lounge", status: "Free Period", isFree: true, topic: "CBSE Practicals Lab Preparation" },
  { period: 5, time: "12:00–12:45", classId: "9-B", subject: "General Science", room: "204", status: "Upcoming", isFree: false, topic: "Atomic Structure & Periodic Table Trends" },
  { period: 6, time: "1:30–2:15", classId: "10-A", subject: "Science Lab", room: "Science Wing Lab", status: "Upcoming", isFree: false, topic: "Salt Analysis & Flame Tests Practical" },
];

export const CLASS_STUDENTS_ROSTER = {
  "10-A": [
    { id: "S-101", rollNo: "10A-01", name: "Aarav Kumar", attendance: "96%", status: "Present", recentGrade: "A+", guardian: "Mr. R. Kumar", contact: "+91 98765 11001" },
    { id: "S-102", rollNo: "10A-02", name: "Diya Sharma", attendance: "94%", status: "Present", recentGrade: "A", guardian: "Mrs. S. Sharma", contact: "+91 98765 11002" },
    { id: "S-103", rollNo: "10A-03", name: "Rahul Singh", attendance: "88%", status: "Absent", recentGrade: "B+", guardian: "Mr. V. Singh", contact: "+91 98765 11003" },
    { id: "S-104", rollNo: "10A-04", name: "Meera Patel", attendance: "97%", status: "Present", recentGrade: "A+", guardian: "Dr. A. Patel", contact: "+91 98765 11004" },
    { id: "S-105", rollNo: "10A-05", name: "Vihaan Joshi", attendance: "91%", status: "Present", recentGrade: "A-", guardian: "Mrs. K. Joshi", contact: "+91 98765 11005" },
    { id: "S-106", rollNo: "10A-06", name: "Ananya Reddy", attendance: "99%", status: "Present", recentGrade: "A+", guardian: "Mr. B. Reddy", contact: "+91 98765 11006" },
    { id: "S-107", rollNo: "10A-07", name: "Ishaan Verma", attendance: "92%", status: "Late", recentGrade: "B", guardian: "Mrs. P. Verma", contact: "+91 98765 11007" },
    { id: "S-108", rollNo: "10A-08", name: "Saanvi Iyer", attendance: "98%", status: "Present", recentGrade: "A+", guardian: "Mr. N. Iyer", contact: "+91 98765 11008" },
  ],
  "9-B": [
    { id: "S-201", rollNo: "9B-01", name: "Aditya Nair", attendance: "92%", status: "Present", recentGrade: "A", guardian: "Mr. M. Nair", contact: "+91 98765 22001" },
    { id: "S-202", rollNo: "9B-02", name: "Bhavya Chawla", attendance: "95%", status: "Present", recentGrade: "A+", guardian: "Mrs. T. Chawla", contact: "+91 98765 22002" },
    { id: "S-203", rollNo: "9B-03", name: "Chirag Deshmukh", attendance: "89%", status: "Absent", recentGrade: "B", guardian: "Mr. H. Deshmukh", contact: "+91 98765 22003" },
    { id: "S-204", rollNo: "9B-04", name: "Divya Kapoor", attendance: "97%", status: "Present", recentGrade: "A+", guardian: "Dr. R. Kapoor", contact: "+91 98765 22004" },
  ],
  "8-A": [
    { id: "S-301", rollNo: "8A-01", name: "Eshan Sengupta", attendance: "96%", status: "Present", recentGrade: "A", guardian: "Mr. S. Sengupta", contact: "+91 98765 33001" },
    { id: "S-302", rollNo: "8A-02", name: "Fatima Khan", attendance: "98%", status: "Present", recentGrade: "A+", guardian: "Mrs. Z. Khan", contact: "+91 98765 33002" },
    { id: "S-303", rollNo: "8A-03", name: "Gaurav Malhotra", attendance: "94%", status: "Present", recentGrade: "A", guardian: "Mr. K. Malhotra", contact: "+91 98765 33003" },
  ],
  "9-A": [
    { id: "S-401", rollNo: "9A-01", name: "Harsh Vardhan", attendance: "95%", status: "Present", recentGrade: "A", guardian: "Mr. J. Vardhan", contact: "+91 98765 44001" },
    { id: "S-402", rollNo: "9A-02", name: "Isha Sundaram", attendance: "99%", status: "Present", recentGrade: "A+", guardian: "Mrs. L. Sundaram", contact: "+91 98765 44002" },
  ]
};

export const INITIAL_TEACHER_LEAVES = [
  {
    id: "LV-T-2026-003",
    dateRange: "03 Oct 2026",
    fromDate: "2026-10-03",
    toDate: "2026-10-03",
    duration: "1 day",
    type: "Personal Leave",
    reason: "Family Function / Sister's Wedding Reception",
    status: "Approved",
    appliedOn: "2026-09-28",
    adminRemarks: "Approved by Principal Dr. Ananya Rao. AI substitute allocation confirmed.",
    substitutesCovered: [
      { period: "P1", time: "8:30–9:15", classId: "8-A", subject: "Mathematics", substitute: "Mr. Rahul Verma", substituteId: "GIS-FAC-412", room: "201", status: "Confirmed" },
      { period: "P2", time: "9:15–10:00", classId: "9-B", subject: "Mathematics", substitute: "Mrs. Priya Nair", substituteId: "GIS-FAC-415", room: "204", status: "Confirmed" },
      { period: "P3", time: "10:15–11:00", classId: "10-A", subject: "Mathematics", substitute: "Mr. Rahul Verma", substituteId: "GIS-FAC-412", room: "301", status: "Confirmed" },
    ]
  },
  {
    id: "LV-T-2026-002",
    dateRange: "18 Sep 2026",
    fromDate: "2026-09-18",
    toDate: "2026-09-18",
    duration: "1 day",
    type: "Duty Leave",
    reason: "CBSE Regional Mathematics Pedagogy Workshop",
    status: "Approved",
    appliedOn: "2026-09-12",
    adminRemarks: "Academic duty leave sanctioned.",
    substitutesCovered: [
      { period: "P2", time: "9:15–10:00", classId: "9-B", subject: "Mathematics", substitute: "Mr. Amitav Sen", substituteId: "GIS-FAC-105", room: "204", status: "Completed" },
      { period: "P5", time: "12:00–12:45", classId: "9-A", subject: "Mathematics", substitute: "Mrs. Kavita Verma", substituteId: "GIS-FAC-104", room: "202", status: "Completed" },
    ]
  },
  {
    id: "LV-T-2026-001",
    dateRange: "12 Aug – 13 Aug 2026",
    fromDate: "2026-08-12",
    toDate: "2026-08-13",
    duration: "2 days",
    type: "Casual Leave",
    reason: "Out of station personal travel",
    status: "Rejected",
    appliedOn: "2026-08-05",
    adminRemarks: "Term Exam evaluation period in progress. Leave cannot be granted during examination week.",
    substitutesCovered: []
  }
];

export const TEACHER_NOTIFICATIONS = [
  {
    id: "NOTIF-1",
    title: "Leave Approved & Substitutes Assigned",
    description: "Your leave request for October 3, 2026 has been approved by the Administration. 3 class substitutions are confirmed.",
    time: "10 mins ago",
    unread: true,
    type: "leave-approved",
  },
  {
    id: "NOTIF-2",
    title: "Substitute Assigned: Rahul Verma",
    description: "Rahul Verma has been assigned to your 8-A Mathematics class during Period 1 on Oct 03.",
    time: "25 mins ago",
    unread: true,
    type: "substitute",
  },
  {
    id: "NOTIF-3",
    title: "Class 10-A Monthly Attendance Summary",
    description: "Grade 10-A achieved 94% average attendance for the month of September. Grade report generated.",
    time: "2 hours ago",
    unread: false,
    type: "attendance",
  },
  {
    id: "NOTIF-4",
    title: "Schedule Update",
    description: "Your Period 3 class in Room 301 will utilize STEM Smart Board for the Trigonometry workshop.",
    time: "1 day ago",
    unread: false,
    type: "schedule",
  }
];
