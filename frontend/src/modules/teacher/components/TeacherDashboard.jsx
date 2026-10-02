import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Calendar, Clock, CheckCircle2, 
  ArrowRight, Sparkles, AlertCircle, FileText, Check, ChevronRight, UserCheck
} from 'lucide-react';

export default function TeacherDashboard({ 
  profile, 
  timetable, 
  leaves, 
  onNavigateTab,
  onSelectClass
}) {
  const todayClassesCount = timetable.filter((t) => !t.isFree).length;
  const activeLeave = leaves[0];
  const nextClass = timetable.find((t) => t.status === "Next Up") || timetable[2];

  return (
    <div className="space-y-6">
      
      {/* ── TOP SUMMARY METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Today's Classes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Today's Classes
            </p>
            <h3 className="text-3xl font-serif font-bold text-forest-900 mt-1">
              {todayClassesCount}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>2 Completed &bull; 3 Upcoming</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-800/15 flex items-center justify-center text-forest-800">
            <BookOpen className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 2: Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Student Attendance
            </p>
            <h3 className="text-3xl font-serif font-bold text-forest-900 mt-1">
              96%
            </h3>
            <p className="text-[11px] text-charcoal-600 font-medium mt-1">
              Across 4 assigned sections
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-800/15 flex items-center justify-center text-emerald-800">
            <UserCheck className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 3: Leave Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Leave Status
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeLeave?.status === 'Approved' 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {activeLeave?.status || 'No Active Leaves'}
              </span>
            </div>
            <p className="text-[11px] text-charcoal-500 font-medium mt-1">
              {activeLeave?.dateRange || 'All quotas available'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-800/15 flex items-center justify-center text-amber-800">
            <Calendar className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* ── TODAY'S NEXT CLASS PROMINENT BANNER ── */}
      {nextClass && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-[#0D3B2E] to-[#134e3e] text-white rounded-2xl p-6 shadow-md relative overflow-hidden"
        >
          {/* Subtle background crest / watermark */}
          <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
            <div className="w-48 h-48 rounded-full border-4 border-gold-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-[11px] font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                <span>Today's Next Class</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Period {nextClass.period} &bull; {nextClass.time}
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80">
                Class: <strong className="text-gold-200">{nextClass.classId}</strong> &bull; Subject: <strong className="text-white">{nextClass.subject}</strong> &bull; Room: <strong className="text-white">{nextClass.room}</strong> &bull; 32 Students Enrolled
              </p>
              {nextClass.topic && (
                <p className="text-xs text-gold-300/90 font-medium pt-1">
                  Topic: <em>{nextClass.topic}</em>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  onSelectClass?.(nextClass.classId);
                  onNavigateTab('attendance');
                }}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Mark Attendance</span>
                <Check className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectClass?.(nextClass.classId);
                  onNavigateTab('classes');
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Class</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── QUICK ACTIONS GRID ── */}
      <div>
        <h3 className="font-serif text-base font-bold text-forest-900 mb-3 flex items-center gap-2">
          <span>Quick Actions</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          <button
            onClick={() => onNavigateTab('attendance')}
            className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200/80 hover:border-forest-800/30 text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-charcoal-900 group-hover:text-forest-900">
              Mark Attendance
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">
              Instant 1-click status
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('timetable')}
            className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200/80 hover:border-forest-800/30 text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-charcoal-900 group-hover:text-forest-900">
              View Timetable
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">
              Today's 6 periods
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('leave-request')}
            className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200/80 hover:border-forest-800/30 text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-charcoal-900 group-hover:text-forest-900">
              Submit Leave
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">
              Auto AI coverage match
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('students')}
            className="p-4 rounded-xl bg-white hover:bg-forest-50/60 border border-gray-200/80 hover:border-forest-800/30 text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-charcoal-900 group-hover:text-forest-900">
              My Students
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">
              Roster & performance
            </p>
          </button>

        </div>
      </div>

    </div>
  );
}
