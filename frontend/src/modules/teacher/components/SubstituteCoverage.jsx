import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  BookOpen,
  MapPin,
  RefreshCw
} from 'lucide-react';

export default function SubstituteCoverage({ leaves = [], teacherInfo = {} }) {
  // Find approved leaves with coverage
  const coveredLeaves = leaves.filter(l => l.status?.toLowerCase() === 'approved' && l.substitutes?.length > 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated Proxy & Coverage Matrix
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Substitute Assignments
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              When your leave is approved, the GIS AI engine and administration automatically reassign your periods to qualified, free teachers. You don't have to scramble for proxy arrangements.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Coverage</p>
              <p className="text-lg font-bold text-white">
                {coveredLeaves.reduce((acc, curr) => acc + (curr.substitutes?.length || 0), 0)} Classes Covered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Coverage Cards */}
      {coveredLeaves.length > 0 ? (
        coveredLeaves.map((leave, lIdx) => (
          <div key={leave.id || lIdx} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
            {/* Leave Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Leave on {leave.date || leave.leave_date || 'October 3, 2026'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Reason: <span className="capitalize text-slate-200">{leave.reason}</span> • Duration: {leave.duration || '1 Day'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {leave.substitutes?.length || 0} classes covered
                </span>
              </div>
            </div>

            {/* Substitution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {leave.substitutes.map((sub, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-5 transition-all shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {sub.period}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {sub.time || 'Scheduled Period'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Class Section</span>
                        <span className="text-sm font-bold text-white">{sub.class_name || sub.class}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Subject</span>
                        <span className="text-sm font-semibold text-emerald-400">{sub.subject}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Room</span>
                        <span className="text-xs font-medium text-slate-300">{sub.room || 'Room 204'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {sub.substitute?.split(' ').map(n => n[0]).join('') || 'ST'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {sub.substitute}
                        </p>
                        <p className="text-[10px] text-emerald-400 font-medium">Assigned Substitute</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 text-slate-500 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white">No Active Substitute Requirements</h3>
            <p className="text-xs text-slate-400 mt-1">
              You currently have no scheduled absences requiring substitute coverage. When you submit a leave request and it is approved, your substitute roster will appear here.
            </p>
          </div>
        </div>
      )}

      {/* Workflow Information Box */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          How Greenfield IS Substitution Works
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
            <strong className="text-white block mb-1">1. AI Timetable Match</strong>
            Our conflict engine scans all faculty timetables to find certified teachers who have a free period during your absence.
          </div>
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
            <strong className="text-white block mb-1">2. Admin Authorization</strong>
            The Principal or Vice Principal reviews the automated substitution plan and approves with one click.
          </div>
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
            <strong className="text-white block mb-1">3. Instant Notification</strong>
            Both you and the substitute faculty receive instant notification with class materials and room details.
          </div>
        </div>
      </div>
    </div>
  );
}
