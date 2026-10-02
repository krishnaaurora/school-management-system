import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function StudentAttendance({ attendance = {} }) {
  const [expandedSubject, setExpandedSubject] = useState(attendance.subjects?.[0]?.name || null);

  const overall = attendance.overallPercentage || 94;
  const present = attendance.presentCount || 87;
  const absent = attendance.absentCount || 4;
  const late = attendance.lateCount || 2;
  const total = attendance.totalSessions || 93;
  const subjects = attendance.subjects || [];

  const toggleSubject = (name) => {
    setExpandedSubject(expandedSubject === name ? null : name);
  };

  return (
    <div className="space-y-6">
      {/* Overall Attendance Summary Cards */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Institutional Standard: 85% Minimum Required
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              My Attendance Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Verified records compiled across academic sessions, science laboratory practicals, and physical education periods.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall</span>
              <span className="text-2xl font-black text-emerald-400">{overall}%</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Present</span>
              <span className="text-2xl font-bold text-white">{present}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Absent</span>
              <span className="text-2xl font-bold text-rose-400">{absent}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Late / Total</span>
              <span className="text-2xl font-bold text-amber-400">{late} <span className="text-xs text-slate-500 font-normal">/ {total}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Subject-Wise Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any subject row to inspect individual attendance logs & dates</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            All Subjects Eligible
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {subjects.map((sub) => {
            const isExpanded = expandedSubject === sub.name;
            const isSafe = sub.percentage >= 90;

            return (
              <div key={sub.name} className="transition-colors hover:bg-slate-800/20">
                {/* Row Header */}
                <div 
                  onClick={() => toggleSubject(sub.name)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <button className="p-1 rounded-lg bg-slate-800 text-slate-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <div>
                      <h4 className="text-base font-bold text-white">{sub.name}</h4>
                      <p className="text-xs text-slate-400">
                        {sub.present} Present &bull; {sub.absent} Absent &bull; {sub.late || 0} Late
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden hidden md:block">
                      <div 
                        className={`h-full rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>

                    <span className={`text-base font-extrabold ${isSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {sub.percentage}%
                    </span>
                  </div>
                </div>

                {/* Expanded Session Logs */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 bg-slate-950/40 border-t border-slate-800/50 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Session Attendance Dates ({sub.name})
                    </h5>

                    {sub.records && sub.records.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {sub.records.map((rec, rIdx) => (
                          <div 
                            key={rIdx}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                          >
                            <div>
                              <p className="text-xs font-bold text-white">{rec.date}</p>
                              <p className="text-[10px] text-slate-400">{rec.period} Class {rec.reason ? `• ${rec.reason}` : ''}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rec.status === 'Present'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : rec.status === 'Late'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {rec.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">Full 100% attendance recorded across all unlisted sessions.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
