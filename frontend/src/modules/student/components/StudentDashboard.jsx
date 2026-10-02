import React from 'react';
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
  Megaphone
} from 'lucide-react';

export default function StudentDashboard({
  student = {},
  summary = {},
  notifications = [],
  announcements = [],
  onNavigateTab,
  onViewTimetable
}) {
  const nextClass = summary.nextClass || {};
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* ── Welcome Greeting & Metadata ── */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/80 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">👋</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Good morning, {student.name ? student.name.split(' ')[0] : 'Aarav'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                Class {student.class || '10-A'}
              </span>
              <span>•</span>
              <span>Roll No: <strong className="text-slate-200">{student.rollNo || '24'}</strong></span>
              <span>•</span>
              <span>Academic Year <strong className="text-slate-200">{student.academicYear || '2026–27'}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab?.('timetable')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Full Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Top Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Classes */}
        <div 
          onClick={() => onNavigateTab?.('timetable')}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today's Classes</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{summary.todayClasses || 5}</span>
            <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              Mon Schedule <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Overall Attendance */}
        <div 
          onClick={() => onNavigateTab?.('attendance')}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Attendance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400">{summary.overallAttendance || '94%'}</span>
            <span className="text-xs text-slate-400 font-medium">87 / 93 Present</span>
          </div>
        </div>

        {/* Upcoming Exam */}
        <div 
          onClick={() => onNavigateTab?.('exams')}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Upcoming Exam</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white truncate max-w-[130px]">
              {summary.upcomingExam?.subject || 'Mathematics'}
            </span>
            <span className="text-xs text-amber-400 font-semibold">Oct 08</span>
          </div>
        </div>

        {/* Unread Notifications */}
        <div 
          onClick={() => onNavigateTab?.('notifications')}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Notifications</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              )}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{unreadCount}</span>
            <span className="text-xs text-purple-400 font-semibold flex items-center gap-1">
              Active Updates <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Today's Next Class + Signature Workflow Alert ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Class Hero Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Today's Next Class
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {nextClass.time || '10:15 AM – 11:00 AM'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {nextClass.subject || 'Mathematics'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  {nextClass.periodLabel || 'Period 3'}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Room: <strong className="text-white">{nextClass.room || '301'}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Status: <strong className="text-white">{nextClass.status || 'Upcoming'}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab?.('timetable')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>View Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Connected Teacher & Substitute Assignment Notification */}
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Faculty & Coverage Status
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                AI Handover Confirmed
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
              <div>
                <p className="text-slate-400 text-[11px]">Regular Instructor</p>
                <p className="font-semibold text-slate-300">{nextClass.teacher || 'Ananya Sharma'} <span className="text-slate-500">(On Leave)</span></p>
              </div>
              <div className="sm:text-right">
                <p className="text-emerald-400 text-[11px] font-bold">Assigned Substitute Faculty</p>
                <p className="font-bold text-white text-sm flex items-center sm:justify-end gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  {nextClass.substitute || 'Rahul Verma'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates & Announcements Feed */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                Recent Updates
              </h3>
              <button 
                onClick={() => onNavigateTab?.('notifications')}
                className="text-xs text-emerald-400 hover:underline font-medium"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-800/60 mt-2">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="py-3 first:pt-1 last:pb-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-200 hover:text-white transition-colors line-clamp-1">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-slate-500 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onNavigateTab?.('announcements')}
              className="w-full py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
            >
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Announcements</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
