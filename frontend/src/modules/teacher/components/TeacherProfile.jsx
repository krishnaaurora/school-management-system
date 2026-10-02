import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  Award
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function TeacherProfile({ teacherInfo = {} }) {
  const teacher = {
    name: teacherInfo.name || 'Ananya Sharma',
    role: teacherInfo.role || 'Mathematics Faculty',
    employeeId: teacherInfo.employeeId || 'GIS-T-023',
    department: teacherInfo.department || 'Senior Secondary Mathematics',
    email: teacherInfo.email || 'teacher.ananya@greenfieldis.edu',
    phone: teacherInfo.phone || '+91 98450 12345',
    workingHours: teacherInfo.workingHours || '8:00 AM – 4:00 PM',
    assignedClasses: teacherInfo.assignedClasses || ['8-A', '9-B', '10-A'],
    subjects: teacherInfo.subjects || ['Mathematics', 'Advanced Calculus'],
    experience: '8 Years (Greenfield IS)',
    qualifications: 'M.Sc. Mathematics, B.Ed (Gold Medalist)',
    officeRoom: 'Faculty Wing B, Desk 14'
  };

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-3xl">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-lg border-2 border-slate-900" title="Active Faculty">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-white tracking-tight">{teacher.name}</h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {teacher.employeeId}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Permanent Faculty
              </span>
            </div>
            <p className="text-sm font-medium text-emerald-400">{teacher.role}</p>
            <p className="text-xs text-slate-400">{teacher.department} • {teacher.officeRoom}</p>
          </div>

          <div className="shrink-0 flex sm:flex-col gap-2">
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Classes</p>
              <p className="text-lg font-bold text-white">{teacher.assignedClasses.length}</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Attendance Rate</p>
              <p className="text-lg font-bold text-emerald-400">96%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic & Timetable Metadata */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Assigned Teaching Responsibilities</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Assigned Classes</p>
              <div className="flex flex-wrap gap-2">
                {teacher.assignedClasses.map((cls) => (
                  <span 
                    key={cls} 
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-white flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    Class {cls}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Primary Subject Disciplines</p>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((sub) => (
                  <span 
                    key={sub} 
                    className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Institutional Working Hours:</span>
                <strong className="text-white font-mono">{teacher.workingHours}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Academic Experience:</span>
                <strong className="text-white">{teacher.experience}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Degrees & Qualifications:</span>
                <strong className="text-white">{teacher.qualifications}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Substitute Engine & Contact Matrix */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Institutional & Contact Details</h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Institutional Email</p>
                <p className="text-xs font-semibold text-slate-200">{teacher.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Direct Phone</p>
                <p className="text-xs font-semibold text-slate-200">{teacher.phone}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Award className="w-4 h-4" />
                AI Substitute Engine Role
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This profile data is indexed in the Greenfield IS AI Timetable Engine. Whenever a Math or Science teacher requires emergency leave, your free periods are prioritized for proxy compensation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
