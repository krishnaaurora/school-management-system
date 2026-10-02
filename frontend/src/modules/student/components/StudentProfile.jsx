import React from 'react';
import { 
  User, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  Mail, 
  Phone, 
  Heart, 
  Home, 
  Lock
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function StudentProfile({ student = {} }) {
  const subjects = student.subjects || ['Mathematics', 'Science', 'English', 'Physics', 'History', 'Physical Education'];

  return (
    <div className="space-y-6">
      {/* Profile Card Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-3xl">
                {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'AK'}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-lg border-2 border-slate-900" title="Active Student">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-white tracking-tight">{student.name || 'Aarav Kumar'}</h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Class {student.class || '10-A'}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Roll No: {student.rollNo || '24'}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">Academic Year: {student.academicYear || '2026–27'}</p>
            <p className="text-xs text-slate-400">Greenfield International School • Student ID: {student.id || 'GIS-STU-10A-024'}</p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Academic Records Locked</span>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Profile */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Enrolled Subjects & Curriculum</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Class 10-A Core Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <span 
                    key={sub} 
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">House Affiliation:</span>
                <strong className="text-emerald-400 font-semibold">{student.house || 'Emerald Lions'}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Admission Date:</span>
                <strong className="text-white">{student.admissionDate || 'June 10, 2021'}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Blood Group:</span>
                <strong className="text-white">{student.bloodGroup || 'B+'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Guardian & Institutional Contacts */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Home className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Guardian & Emergency Contact</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Parents / Legal Guardians</p>
              <p className="text-sm font-bold text-white">{student.guardianName || 'Sanjay & Sunita Kumar'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Primary Contact Number</p>
              <p className="text-sm font-bold text-slate-200">{student.guardianContact || '+91 98765 43210'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Student Institutional Email</p>
              <p className="text-xs font-mono font-semibold text-emerald-400">{student.email || 'student.aarav@greenfieldis.edu'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
