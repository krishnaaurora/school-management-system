import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Clock, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';

export default function StudentTeachers({ teachers = [] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Class 10-A Faculty Directory</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Assigned subject teachers, teaching periods, classroom venues, and student consultation hours.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Faculty
          </div>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((tea) => {
          const isOnLeave = tea.status?.includes('Leave');

          return (
            <div 
              key={tea.id}
              className={`bg-slate-900/70 backdrop-blur-md border rounded-2xl p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between ${
                isOnLeave ? 'border-amber-500/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                    {tea.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{tea.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">{tea.subject}</p>
                    <p className="text-[11px] text-slate-400">{tea.role}</p>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="pt-2">
                  <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                    isOnLeave 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  }`}>
                    {tea.status}
                  </span>
                </div>

                {/* Periods & Office */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> Teaching Periods:
                    </span>
                    <div className="flex gap-1">
                      {tea.periods.map(p => (
                        <span key={p} className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono text-[10px] font-bold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> Desk / Room:
                    </span>
                    <span className="font-medium text-slate-200">{tea.room}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> Consultation:
                    </span>
                    <span className="font-medium text-slate-200">{tea.officeHours}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
