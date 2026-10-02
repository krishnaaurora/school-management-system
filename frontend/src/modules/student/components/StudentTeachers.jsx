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
  Calendar,
  Mail,
  UserCheck
} from 'lucide-react';

export default function StudentTeachers({ teachers = [] }) {
  const defaultTeachers = [
    { id: 't-1', name: 'Mrs. Ananya Sharma', subject: 'Mathematics (Class Mentor)', role: 'Senior Secondary Faculty', status: 'On Duty • Classroom 301', periods: ['P1', 'P3'], room: 'Faculty Wing B, Desk 14', officeHours: 'Mon–Fri 3:00–4:00 PM', email: 'teacher.ananya@greenfieldis.edu' },
    { id: 't-2', name: 'Dr. Rajesh Gupta', subject: 'Science (Chemistry & STEM)', role: 'Head of Department (Science)', status: 'On Duty • Chem Lab 1', periods: ['P3', 'P5'], room: 'Science Wing A, Desk 04', officeHours: 'Tue & Thu 3:00–4:15 PM', email: 'rajesh.gupta@gisedu.in' },
    { id: 't-3', name: 'Mr. Amitav Sen', subject: 'Physics & Mechanics', role: 'Senior Physics Lead', status: 'On Duty • Physics Lab', periods: ['P2', 'P6'], room: 'Science Wing A, Desk 08', officeHours: 'Wed & Fri 2:45–3:45 PM', email: 'amitav.sen@greenfieldis.edu' },
    { id: 't-4', name: 'Mrs. Sunita Rao', subject: 'English Language & Literature', role: 'Senior Languages Faculty', status: 'On Duty • Classroom 301', periods: ['P4'], room: 'Humanities Wing, Desk 02', officeHours: 'Mon & Wed 3:00–4:00 PM', email: 'sunita.rao@greenfieldis.edu' },
    { id: 't-5', name: 'Mr. Vikram Singh', subject: 'Social Science & Humanities', role: 'HOD Social Studies', status: 'On Duty • Classroom 301', periods: ['P5'], room: 'Humanities Wing, Desk 06', officeHours: 'Tue & Thu 3:00–4:00 PM', email: 'vikram.singh@greenfieldis.edu' },
    { id: 't-6', name: 'Mr. Tanmay Joshi', subject: 'Computer Science & AI', role: 'Lead AI & Robotics Mentor', status: 'On Duty • STEM Lab B', periods: ['P6'], room: 'Innovation Hub, Desk 01', officeHours: 'Mon–Fri 2:45–4:00 PM', email: 'tanmay.joshi@greenfieldis.edu' },
  ];

  const displayTeachers = teachers.length > 0 ? teachers : defaultTeachers;

  return (
    <div className="space-y-6">
      
      {/* ── TOP BANNER ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 border border-forest-800/15 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-gold-600" />
            <span>Class 10-A Faculty & Mentors</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Assigned Subject Instructors & Class Mentor
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Classroom venues, teaching periods, faculty contact desks, and student consultation hours.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Faculty Mentors</span>
        </div>
      </div>

      {/* ── FACULTY CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayTeachers.map((tea) => (
          <div 
            key={tea.id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-forest-800/30 p-5 space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#0B2E23] text-gold-300 flex items-center justify-center font-serif font-bold text-base shadow-sm shrink-0">
                  {tea.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-forest-900 leading-tight">{tea.name}</h3>
                  <p className="text-xs font-bold text-[#8C6218] mt-0.5">{tea.subject}</p>
                  <p className="text-[11px] text-gray-500">{tea.role}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  {tea.status || 'Active On Campus'}
                </span>
              </div>

              {/* Periods & Office */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-charcoal-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-600" /> Teaching Periods:
                  </span>
                  <div className="flex gap-1">
                    {(tea.periods || ['P1', 'P3']).map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded bg-forest-50 text-forest-900 border border-forest-800/15 font-mono text-[10px] font-bold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" /> Faculty Room:
                  </span>
                  <span className="font-semibold text-forest-900">{tea.room}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" /> Consultation:
                  </span>
                  <span className="font-medium text-gray-800">{tea.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            {tea.email && (
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span className="truncate">{tea.email}</span>
                <Mail className="w-3.5 h-3.5 text-gold-600 shrink-0 ml-1" />
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
