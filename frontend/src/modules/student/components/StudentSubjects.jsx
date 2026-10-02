import React from 'react';
import { 
  BookOpen, 
  User, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function StudentSubjects({ subjects = [], onSelectSubject }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Academic Subjects</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Curriculum disciplines, assigned faculty masters, classroom venues, and syllabus milestones for Class 10-A.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Total Disciplines: <strong className="text-white">{subjects.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((sub) => (
          <div 
            key={sub.id}
            className="bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {sub.code}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{sub.name}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {sub.attendance} Att.
                </span>
              </div>

              {/* Faculty & Venue */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> Teacher
                  </span>
                  <p className="font-bold text-slate-200 mt-0.5">{sub.teacher}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> Classroom
                  </span>
                  <p className="font-bold text-slate-200 mt-0.5">Room {sub.room}</p>
                </div>
              </div>

              {/* Syllabus Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Curriculum Progress</span>
                  <span className="font-bold text-emerald-400">{sub.syllabusProgress}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{ width: sub.syllabusProgress.split('%')[0] + '%' }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Subject Announcement */}
            {sub.recentAnnouncement && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Teacher Notice
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{sub.recentAnnouncement}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
