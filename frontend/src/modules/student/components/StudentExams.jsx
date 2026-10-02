import React from 'react';
import { 
  FileText, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp,
  Download
} from 'lucide-react';

export default function StudentExams({ exams = {} }) {
  const results = exams.results || [];
  const schedule = exams.upcomingSchedule || [];
  const overallPct = exams.overallPercentage || 85.5;
  const grade = exams.overallGrade || 'A';
  const term = exams.term || 'Mid-Term Examination 2026';

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">{term} Results</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Verified evaluation report with standardized letter grades and faculty remarks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Score</span>
              <span className="text-xl font-black text-amber-400">{overallPct}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Grade</span>
              <span className="text-xl font-black text-emerald-400">{grade}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Subject-Wise Marks & Grades</h3>
          <span className="text-xs text-slate-400 font-medium">{exams.rank || '4th in Class 10-A'}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase bg-slate-950/40">
                <th className="py-3.5 px-6">Subject</th>
                <th className="py-3.5 px-6">Marks Obtained</th>
                <th className="py-3.5 px-6">Grade</th>
                <th className="py-3.5 px-6">Faculty Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {results.map((res, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-bold text-white text-sm">
                    {res.subject}
                  </td>
                  <td className="py-4 px-6 font-mono text-sm font-bold text-slate-200">
                    {res.marks} <span className="text-xs text-slate-500 font-normal">/ {res.maxMarks || 100}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      res.grade.startsWith('A')
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {res.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-xs max-w-xs">
                    {res.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Examination Schedule */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Upcoming Examination Schedule</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Term-1 Assessments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schedule.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-white">{item.subject}</h4>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                  <span className="text-emerald-400 font-medium">{item.date}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">{item.room}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
                Hall Ticket Ready
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
