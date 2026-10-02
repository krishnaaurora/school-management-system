import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Bell, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  AlertCircle,
  MapPin,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  Award,
  User,
  Printer
} from 'lucide-react';

export default function StudentDashboard({
  student = {},
  summary = {},
  notifications = [],
  announcements = [],
  onNavigateTab,
  onViewReportCard
}) {
  const nextClass = {
    period: 3,
    time: '10:15 – 11:00 AM',
    subject: 'Science (Chemistry & STEM)',
    room: 'Chem Lab 1',
    teacher: 'Dr. Rajesh Gupta',
    topic: 'Redox Titrations & Chemical Reactions',
    status: 'Next Up'
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      
      {/* ── TOP HERO SUMMARY METRICS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today's Classes */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onNavigateTab?.('timetable')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-forest-800/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">Today's Classes</span>
            <div className="p-2 rounded-xl bg-forest-50 text-forest-800 border border-forest-800/15 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 text-gold-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-forest-900">7 Periods</span>
            <span className="text-xs text-[#8C6218] font-bold flex items-center gap-1">
              Class 10-A <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

        {/* Card 2: Attendance */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => onNavigateTab?.('attendance')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-forest-800/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">Attendance</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-emerald-900">96.4%</span>
            <span className="text-xs text-gray-500 font-medium">87 / 90 Days</span>
          </div>
        </motion.div>

        {/* Card 3: Academic Report Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onViewReportCard}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-forest-800/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">CBSE Term-1 Grade</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-forest-900">93.7%</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              Grade A1 &bull; Rank 2 <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

        {/* Card 4: Pre-Board Exam */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => onNavigateTab?.('exams')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-forest-800/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">Next Assessment</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-xl font-bold text-forest-900 truncate">Mathematics</span>
            <span className="text-xs text-forest-800 font-bold">Oct 08</span>
          </div>
        </motion.div>

      </div>

      {/* ── TODAY'S NEXT CLASS PROMINENT BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-[#0B2E23] to-[#144d3d] text-white rounded-2xl p-6 shadow-md relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-[11px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>Next Upcoming Class &bull; Today</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Period {nextClass.period} &bull; {nextClass.time}
            </h2>
            
            <p className="text-xs sm:text-sm text-ivory/80">
              Subject: <strong className="text-gold-200">{nextClass.subject}</strong> &bull; Faculty: <strong className="text-white">{nextClass.teacher}</strong> &bull; Room: <strong className="text-white">{nextClass.room}</strong>
            </p>
            
            <p className="text-xs text-gold-300/90 font-medium pt-0.5">
              Topic: <em>{nextClass.topic}</em>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab?.('timetable')}
              className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Full Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onViewReportCard}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-gold-300" />
              <span>Report Card</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── QUICK SHORTCUTS & ANNOUNCEMENTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Grid */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-serif text-base font-bold text-forest-900">
            Quick Academic Actions
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab?.('timetable')}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Class 10-A Timetable</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Weekly 7-period matrix</p>
            </button>

            <button
              type="button"
              onClick={onViewReportCard}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <Award className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Official Report Card</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Print / Download A4</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.('exams')}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Pre-Board Schedule</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Hall ticket & syllabus</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.('teachers')}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <UserCheck className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Faculty Mentors</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Contact teacher desks</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.('attendance')}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Monthly Attendance</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Subject-wise logs</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.('subjects')}
              className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200 hover:border-forest-800/30 text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-bold text-forest-900">Syllabus & Units</p>
              <p className="text-[10.5px] text-gray-500 mt-0.5">Curricular progress</p>
            </button>
          </div>
        </div>

        {/* School Circulars / Announcements Notice Box */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="font-serif text-sm font-bold text-forest-900 flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-gold-600" />
              <span>Campus Circulars</span>
            </h4>
            <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#8C6218]">CBSE Examination Cell</span>
              <p className="font-bold text-forest-900">Pre-Board 1 Timetable Released</p>
              <p className="text-gray-500 text-[11px]">Assessments commence Oct 08. Hall tickets distributed by Class Mentors.</p>
            </div>

            <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#8C6218]">STEM & Robotics Club</span>
              <p className="font-bold text-forest-900">Annual Science Exhibition Registration</p>
              <p className="text-gray-500 text-[11px]">Senior secondary project submissions open till Oct 15 in STEM Lab B.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
