// Seed database for Greenfield International School Admin Operations Command Center

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: "LR-2026-101",
    teacherId: "T-01",
    teacherName: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Mathematics",
    subject: "Mathematics",
    leaveDate: "2026-10-03",
    leaveDateFormatted: "October 3, 2026 (Tomorrow)",
    type: "Personal Leave",
    reason: "Attending family graduation ceremony in Bangalore",
    status: "Pending", // "Pending" | "Approved" | "Rejected"
    appliedOn: "2026-10-01",
    classesAffectedCount: 3,
    affectedPeriods: [
      { period: "P2", time: "09:15 - 10:00", classId: "8-A", subject: "Mathematics", room: "Room 204", topic: "Quadratic Equations" },
      { period: "P4", time: "11:00 - 11:45", classId: "9-B", subject: "Mathematics", room: "Room 302", topic: "Coordinate Geometry" },
      { period: "P6", time: "01:15 - 02:00", classId: "10-A", subject: "Mathematics", room: "Room 401", topic: "Trigonometric Identities" },
    ],
    aiAnalysis: {
      workloadImpactScore: 82, // out of 100
      conflictRisk: "Low",
      summary: "Ananya Sharma has 3 scheduled high-impact classes on Oct 3. 10-A is preparing for board pre-assessment; expert substitute coverage is recommended.",
      eligibleSubstitutes: [
        {
          teacherId: "T-02",
          name: "Rahul Verma",
          subject: "Mathematics & Physics",
          department: "Mathematics",
          periodsFree: ["P1", "P2", "P4", "P6"],
          assignedPeriod: "P2 (8-A) & P6 (10-A)",
          matchScore: 98,
          reasons: ["Free during P2 & P6", "Teaches Senior Mathematics", "Zero timetable conflicts", "Low workload day (only 2 regular classes)"]
        },
        {
          teacherId: "T-03",
          name: "Priya Nair",
          subject: "Mathematics & Computing",
          department: "Mathematics",
          periodsFree: ["P3", "P4", "P5"],
          assignedPeriod: "P4 (9-B)",
          matchScore: 94,
          reasons: ["Free during P4", "Direct subject specialist for Grade 9", "No overlapping duty"]
        },
        {
          teacherId: "T-05",
          name: "Vikram Sengupta",
          subject: "Physics",
          department: "Science",
          periodsFree: ["P2", "P3", "P6"],
          assignedPeriod: "Backup Option",
          matchScore: 78,
          reasons: ["STEM background", "Free during P2 & P6", "Backup teacher"]
        }
      ],
      recommendedPlan: [
        { period: "P2", classId: "8-A", subject: "Mathematics", teacherName: "Rahul Verma", teacherId: "T-02", status: "Optimal Match", reason: "Free + Mathematics specialist" },
        { period: "P4", classId: "9-B", subject: "Mathematics", teacherName: "Priya Nair", teacherId: "T-03", status: "Optimal Match", reason: "Free + Grade 9 Math syllabus lead" },
        { period: "P6", classId: "10-A", subject: "Mathematics", teacherName: "Rahul Verma", teacherId: "T-02", status: "Optimal Match", reason: "Free + Senior Board Examiner" }
      ],
      aiExplanation: "The system evaluated 68 active faculty members across 6 timetable periods. Rahul Verma and Priya Nair have zero conflict slots, teach Mathematics at the required grade level, and their assignment maintains balanced faculty workload without exceeding the 5 periods/day threshold."
    }
  },
  {
    id: "LR-2026-102",
    teacherId: "T-05",
    teacherName: "Vikram Sengupta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Science",
    subject: "Physics",
    leaveDate: "2026-10-03",
    leaveDateFormatted: "October 3, 2026 (Tomorrow)",
    type: "Medical Leave",
    reason: "Scheduled medical consultation and diagnostics",
    status: "Pending",
    appliedOn: "2026-10-02",
    classesAffectedCount: 2,
    affectedPeriods: [
      { period: "P1", time: "08:30 - 09:15", classId: "10-B", subject: "Physics", room: "Lab 2", topic: "Optics & Reflection" },
      { period: "P3", time: "10:15 - 11:00", classId: "9-A", subject: "Physics", room: "Room 301", topic: "Work & Energy" },
    ],
    aiAnalysis: {
      workloadImpactScore: 65,
      conflictRisk: "Low",
      summary: "Vikram Sengupta has 2 laboratory & classroom physics sessions on Oct 3. Lab assistance required for P1.",
      eligibleSubstitutes: [
        {
          teacherId: "T-04",
          name: "Suresh Menon",
          subject: "Physics & Chemistry",
          department: "Science",
          periodsFree: ["P1", "P3", "P5"],
          assignedPeriod: "P1 (10-B) & P3 (9-A)",
          matchScore: 96,
          reasons: ["Free in P1 and P3", "Physics Lab Safety Certified", "Zero conflict"]
        }
      ],
      recommendedPlan: [
        { period: "P1", classId: "10-B", subject: "Physics", teacherName: "Suresh Menon", teacherId: "T-04", status: "Optimal Match", reason: "Free + Physics Lab Safety Lead" },
        { period: "P3", classId: "9-A", subject: "Physics", teacherName: "Suresh Menon", teacherId: "T-04", status: "Optimal Match", reason: "Free + Direct Subject Teacher" }
      ],
      aiExplanation: "Suresh Menon has free blocks during both Period 1 and Period 3 and holds current physics lab supervision credentials."
    }
  },
  {
    id: "LR-2026-103",
    teacherId: "T-06",
    teacherName: "Pooja Hegde",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Humanities",
    subject: "English Literature",
    leaveDate: "2026-10-04",
    leaveDateFormatted: "October 4, 2026",
    type: "Conference Leave",
    reason: "Attending National CBSE English Pedagogy Workshop",
    status: "Pending",
    appliedOn: "2026-10-01",
    classesAffectedCount: 4,
    affectedPeriods: [
      { period: "P1", time: "08:30 - 09:15", classId: "7-A", subject: "English", room: "Room 105", topic: "Creative Writing" },
      { period: "P2", time: "09:15 - 10:00", classId: "8-B", subject: "English", room: "Room 205", topic: "Shakespeare Sonnets" },
      { period: "P4", time: "11:00 - 11:45", classId: "10-B", subject: "English", room: "Room 402", topic: "Grammar Analysis" },
      { period: "P5", time: "12:30 - 01:15", classId: "9-A", subject: "English", room: "Room 301", topic: "Reading Comprehension" }
    ],
    aiAnalysis: {
      workloadImpactScore: 90,
      conflictRisk: "Medium",
      summary: "High volume of classes (4 periods). Distributed substitution across 2 faculty members recommended.",
      eligibleSubstitutes: [
        {
          teacherId: "T-07",
          name: "Arun Kulkarni",
          subject: "English & Social Studies",
          department: "Humanities",
          periodsFree: ["P1", "P2", "P6"],
          assignedPeriod: "P1 & P2",
          matchScore: 92,
          reasons: ["Free P1 & P2", "English faculty", "Zero conflict"]
        },
        {
          teacherId: "T-08",
          name: "Meera Sen",
          subject: "English",
          department: "Humanities",
          periodsFree: ["P4", "P5"],
          assignedPeriod: "P4 & P5",
          matchScore: 95,
          reasons: ["Free P4 & P5", "Senior English teacher", "Zero conflict"]
        }
      ],
      recommendedPlan: [
        { period: "P1", classId: "7-A", subject: "English", teacherName: "Arun Kulkarni", teacherId: "T-07", status: "Optimal Match", reason: "Free + English Department" },
        { period: "P2", classId: "8-B", subject: "English", teacherName: "Arun Kulkarni", teacherId: "T-07", status: "Optimal Match", reason: "Free + Grade 8 English faculty" },
        { period: "P4", classId: "10-B", subject: "English", teacherName: "Meera Sen", teacherId: "T-08", status: "Optimal Match", reason: "Free + Senior Secondary Specialist" },
        { period: "P5", classId: "9-A", subject: "English", teacherName: "Meera Sen", teacherId: "T-08", status: "Optimal Match", reason: "Free + Grade 9 English faculty" }
      ],
      aiExplanation: "Splitting the 4 periods between Arun Kulkarni (P1, P2) and Meera Sen (P4, P5) ensures that no substitute teacher exceeds their maximum daily instructional load."
    }
  }
];

export const TEACHERS_LIST = [
  {
    id: "T-01",
    name: "Ananya Sharma",
    department: "Mathematics",
    subject: "Mathematics",
    classes: "8A, 9B, 10A",
    weeklyPeriods: 24,
    status: "On Leave (Tomorrow)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    email: "ananya.sharma@greenfieldis.edu",
    phone: "+91 98401 22311",
    experience: "8 Years",
    qualifications: "M.Sc. Mathematics (Delhi University), B.Ed.",
    attendance: "96.4%",
    freePeriodsTomorrow: ["P1", "P3", "P5"]
  },
  {
    id: "T-02",
    name: "Rahul Verma",
    department: "Mathematics",
    subject: "Mathematics & Physics",
    classes: "7A, 8B, 10B",
    weeklyPeriods: 22,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "rahul.verma@greenfieldis.edu",
    phone: "+91 98401 55672",
    experience: "11 Years",
    qualifications: "M.Sc., B.Ed. (Gold Medalist)",
    attendance: "98.9%",
    freePeriodsTomorrow: ["P2", "P4", "P6"]
  },
  {
    id: "T-03",
    name: "Priya Nair",
    department: "Mathematics",
    subject: "Mathematics & Computing",
    classes: "9A, 10A, 11A",
    weeklyPeriods: 20,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "priya.nair@greenfieldis.edu",
    phone: "+91 98401 77890",
    experience: "6 Years",
    qualifications: "B.Tech, B.Ed. (Mathematics)",
    attendance: "97.2%",
    freePeriodsTomorrow: ["P1", "P3", "P4", "P5"]
  },
  {
    id: "T-04",
    name: "Suresh Menon",
    department: "Science",
    subject: "Physics & Chemistry",
    classes: "9B, 10B, 11B",
    weeklyPeriods: 22,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    email: "suresh.menon@greenfieldis.edu",
    phone: "+91 98401 44332",
    experience: "14 Years",
    qualifications: "M.Sc. Physics (IIT Madras), B.Ed.",
    attendance: "99.1%",
    freePeriodsTomorrow: ["P1", "P3", "P5"]
  },
  {
    id: "T-05",
    name: "Vikram Sengupta",
    department: "Science",
    subject: "Physics",
    classes: "9A, 10B, 12A",
    weeklyPeriods: 25,
    status: "On Leave (Tomorrow)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "vikram.sengupta@greenfieldis.edu",
    phone: "+91 98401 99881",
    experience: "9 Years",
    qualifications: "M.Sc. Applied Physics, B.Ed.",
    attendance: "95.5%",
    freePeriodsTomorrow: ["P2", "P4", "P6"]
  },
  {
    id: "T-06",
    name: "Pooja Hegde",
    department: "Humanities",
    subject: "English Literature",
    classes: "7A, 8B, 9A, 10B",
    weeklyPeriods: 24,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "pooja.hegde@greenfieldis.edu",
    phone: "+91 98401 11223",
    experience: "7 Years",
    qualifications: "M.A. English, B.Ed. (EFL University)",
    attendance: "98.0%",
    freePeriodsTomorrow: ["P3", "P6"]
  },
  {
    id: "T-07",
    name: "Arun Kulkarni",
    department: "Humanities",
    subject: "Social Sciences & History",
    classes: "8A, 9B, 10A",
    weeklyPeriods: 21,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    email: "arun.kulkarni@greenfieldis.edu",
    phone: "+91 98401 33445",
    experience: "10 Years",
    qualifications: "M.A. History, B.Ed.",
    attendance: "97.5%",
    freePeriodsTomorrow: ["P1", "P2", "P5"]
  },
  {
    id: "T-08",
    name: "Meera Sen",
    department: "Humanities",
    subject: "English Literature",
    classes: "9B, 10A, 11B",
    weeklyPeriods: 20,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    email: "meera.sen@greenfieldis.edu",
    phone: "+91 98401 66778",
    experience: "12 Years",
    qualifications: "M.A. English (Oxford), B.Ed.",
    attendance: "99.0%",
    freePeriodsTomorrow: ["P2", "P4", "P5"]
  }
];

export const STUDENTS_LIST = [
  { id: "S-101", rollNo: "10A-01", name: "Aarav Kumar", classId: "10-A", section: "A", attendance: "94%", status: "Active", parentName: "Sanjay Kumar", parentPhone: "+91 98111 22334", gpa: "3.85" },
  { id: "S-102", rollNo: "10A-02", name: "Diya Sharma", classId: "10-A", section: "A", attendance: "91%", status: "Active", parentName: "Manish Sharma", parentPhone: "+91 98111 44556", gpa: "3.92" },
  { id: "S-103", rollNo: "10A-03", name: "Ananya Reddy", classId: "10-A", section: "A", attendance: "98%", status: "Active", parentName: "Kishore Reddy", parentPhone: "+91 98111 66778", gpa: "3.98" },
  { id: "S-104", rollNo: "9B-12", name: "Rohan Singh", classId: "9-B", section: "B", attendance: "78%", status: "Warning", parentName: "Harpreet Singh", parentPhone: "+91 98111 88990", gpa: "3.10" },
  { id: "S-105", rollNo: "9B-13", name: "Sanya Gupta", classId: "9-B", section: "B", attendance: "96%", status: "Active", parentName: "Vikrant Gupta", parentPhone: "+91 98111 11223", gpa: "3.75" },
  { id: "S-106", rollNo: "8A-05", name: "Kabir Varma", classId: "8-A", section: "A", attendance: "89%", status: "Active", parentName: "Rajesh Varma", parentPhone: "+91 98111 33445", gpa: "3.60" },
  { id: "S-107", rollNo: "8A-06", name: "Zoya Akhtar", classId: "8-A", section: "A", attendance: "95%", status: "Active", parentName: "Farhan Akhtar", parentPhone: "+91 98111 55667", gpa: "3.88" },
  { id: "S-108", rollNo: "8B-09", name: "Devansh Patel", classId: "8-B", section: "B", attendance: "92%", status: "Active", parentName: "Nitin Patel", parentPhone: "+91 98111 77889", gpa: "3.70" }
];

export const TIMETABLE_SCHEDULE = {
  "8-A": {
    "Monday": ["Maths (Ananya)", "English (Pooja)", "Science (Suresh)", "History (Arun)", "Maths (Ananya)", "PE (Coach)"],
    "Tuesday": ["Science (Suresh)", "Maths (Ananya)", "English (Pooja)", "Computers (Priya)", "Music (Rao)", "Art (Kiran)"],
    "Wednesday": ["English (Pooja)", "Maths (Ananya)", "History (Arun)", "Science (Suresh)", "Library", "Games"],
    "Thursday": ["Maths (Ananya)", "Science (Suresh)", "English (Pooja)", "Hindi (Gupta)", "Maths (Ananya)", "Robotics"],
    "Friday": ["History (Arun)", "English (Pooja)", "Maths (Ananya)", "Science (Suresh)", "Maths (Ananya)", "Clubs"]
  },
  "9-B": {
    "Monday": ["Science (Suresh)", "History (Arun)", "Maths (Ananya)", "English (Meera)", "PE (Coach)", "Computers (Priya)"],
    "Tuesday": ["English (Meera)", "Science (Suresh)", "Maths (Ananya)", "History (Arun)", "Maths (Ananya)", "Library"],
    "Wednesday": ["Maths (Ananya)", "Physics (Vikram)", "English (Meera)", "Art", "Science (Suresh)", "Games"],
    "Thursday": ["Science (Suresh)", "English (Meera)", "Physics (Vikram)", "Maths (Ananya)", "History (Arun)", "Coding"],
    "Friday": ["Maths (Ananya)", "English (Meera)", "Science (Suresh)", "Physics (Vikram)", "Clubs", "PE"]
  },
  "10-A": {
    "Monday": ["Physics (Vikram)", "Maths (Ananya)", "Chemistry (Suresh)", "English (Meera)", "History (Arun)", "Maths (Ananya)"],
    "Tuesday": ["Maths (Ananya)", "Physics (Vikram)", "English (Meera)", "Chemistry (Suresh)", "Biology", "Library"],
    "Wednesday": ["English (Meera)", "Chemistry (Suresh)", "Maths (Ananya)", "Physics (Vikram)", "Maths (Ananya)", "Sports"],
    "Thursday": ["Physics (Vikram)", "Maths (Ananya)", "English (Meera)", "Chemistry (Suresh)", "Computers", "Seminar"],
    "Friday": ["Maths (Ananya)", "Physics (Vikram)", "English (Meera)", "Chemistry (Suresh)", "Maths (Ananya)", "Counseling"]
  }
};

export const AI_SAMPLE_QUERIES = [
  {
    query: "Which classes have attendance below 75% this month?",
    answer: "Only Grade 9-B currently shows an attendance dip with 4 students below 75% threshold (notably Rohan Singh at 78% and Tanvi Shah at 72%). Automated SMS alert was sent to guardians.",
    category: "Attendance Alert"
  },
  {
    query: "Which teachers have the highest number of free periods tomorrow?",
    answer: "Tomorrow (Oct 3), Mr. Rahul Verma (3 free periods: P2, P4, P6) and Mrs. Priya Nair (4 free periods: P1, P3, P4, P5) have the highest availability. Both are qualified to cover STEM classes.",
    category: "Faculty Workload"
  },
  {
    query: "How many students were absent today across all grades?",
    answer: "Today's campus absence rate is 4.2% (52 out of 1,248 students). This is well within our normal operational baseline of 94–96% daily attendance.",
    category: "Daily Snapshot"
  },
  {
    query: "Show workload distribution across STEM faculty.",
    answer: "Average STEM faculty workload is 22.4 periods/week. Mrs. Ananya Sharma (24 periods) and Mr. Vikram Sengupta (25 periods) are currently operating near maximum capacity.",
    category: "Workload Analytics"
  }
];
