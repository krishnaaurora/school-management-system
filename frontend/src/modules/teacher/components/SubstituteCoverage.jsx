import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Check, 
  FileText, 
  UserCheck, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function SubstituteCoverage({ 
  leaves = [], 
  teacherInfo = {}, 
  onNavigateTimetable 
}) {
  const [activeTab, setActiveTab] = useState('my-covered'); // 'my-covered' | 'my-duties'

  // Approved leaves with substitute coverage
  const coveredLeaves = leaves.filter(
    (l) => l.status?.toLowerCase() === 'approved' && l.substitutes?.length > 0
  );

  // Colleague proxy duties assigned to current teacher
  const assignedProxyDuties = [
    {
      id: 'duty-1',
      date: 'Thursday, Oct 8, 2026',
      period: 'P3',
      time: '10:00 AM – 10:45 AM',
      class: 'Class 9-C',
      subject: 'Mathematics (Substitution)',
      room: 'Room 205 (Senior Wing)',
      absentTeacher: 'Dr. Rajesh Verma',
      syllabusHandover: 'Chapter 5: Arithmetic Progressions. Guide students through textbook exercise 5.2, questions 1 to 10.',
      status: 'Confirmed'
    },
    {
      id: 'duty-2',
      date: 'Friday, Oct 9, 2026',
      period: 'P6',
      time: '1:15 PM – 2:00 PM',
      class: 'Class 8-B',
      subject: 'Foundational Algebra (Substitution)',
      room: 'Room 108 (Middle Wing)',
      absentTeacher: 'Mrs. Sangeeta Rao',
      syllabusHandover: 'Algebraic Identities practice worksheet. Worksheets are kept on the teacher podium in Room 108.',
      status: 'Upcoming'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Automated Proxy & Coverage Matrix</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Substitute Assignments & Proxy Registry
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            When approved for leave, the Greenfield IS AI engine maps your periods to free certified colleagues without manual scramble.
          </p>
        </div>

        {/* Coverage Metric Summary */}
        <div className="flex items-center gap-3 bg-[#FAF8F3] p-4 rounded-xl border border-[#C5A880]/30 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-300 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Active Coverage</p>
            <p className="font-serif text-lg font-bold text-forest-900">
              {coveredLeaves.reduce((acc, curr) => acc + (curr.substitutes?.length || 0), 0)} Classes Assigned
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('my-covered')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'my-covered'
              ? 'bg-[#0D3B2E] text-white shadow-xs'
              : 'bg-white text-charcoal-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          My Classes Covered by Colleagues ({coveredLeaves.reduce((acc, c) => acc + (c.substitutes?.length || 0), 0)})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my-duties')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'my-duties'
              ? 'bg-[#0D3B2E] text-white shadow-xs'
              : 'bg-white text-charcoal-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Colleague Classes I Am Covering ({assignedProxyDuties.length})
        </button>
      </div>

      {/* Tab 1: My Classes Covered by Colleagues */}
      {activeTab === 'my-covered' && (
        <div className="space-y-4">
          {coveredLeaves.length > 0 ? (
            coveredLeaves.map((leave, lIdx) => (
              <div 
                key={leave.id || lIdx} 
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800 border border-forest-800/15">
                      <Calendar className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-forest-900">
                        Leave Schedule &bull; {leave.dateRange || leave.date || 'Oct 3, 2026'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Category: <span className="font-semibold text-forest-900 capitalize">{leave.type || leave.reason}</span> &bull; Duration: {leave.duration || '1 Day'}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{leave.substitutes?.length || 0} Periods Covered</span>
                  </span>
                </div>

                {/* Substitute Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {leave.substitutes.map((sub, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#FAF8F3] border border-[#C5A880]/30 rounded-xl p-4 flex flex-col justify-between hover:border-forest-800/40 transition-all shadow-2xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-forest-900 text-gold-300">
                            Period {sub.period}
                          </span>
                          <span className="text-[11px] font-mono text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {sub.time || 'Scheduled Slot'}
                          </span>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500 uppercase font-semibold">Class & Subject</p>
                          <p className="text-sm font-serif font-bold text-forest-900">
                            Class {sub.class_name || sub.class} &bull; {sub.subject}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gold-600" />
                            {sub.room || 'Room 204'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0B2E23] text-gold-300 flex items-center justify-center text-xs font-bold">
                            {sub.substitute?.split(' ').map((n) => n[0]).join('') || 'ST'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-forest-900 truncate">
                              {sub.substitute}
                            </p>
                            <p className="text-[10px] text-emerald-700 font-semibold">Assigned Substitute</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-900">No Active Substitute Requirements</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                You currently have no scheduled absences requiring substitute coverage. When you submit a leave request and it is approved, assigned proxies appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Colleague Classes I Am Covering (Proxy Duties) */}
      {activeTab === 'my-duties' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-serif text-base font-bold text-forest-900">
                  Upcoming Assigned Proxy Duties
                </h3>
                <p className="text-xs text-gray-500">
                  You have been matched by the AI engine to cover for colleagues during your free slots.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                2 Assigned Periods
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignedProxyDuties.map((duty) => (
                <div 
                  key={duty.id}
                  className="bg-[#FAF8F3] border border-[#C5A880]/40 rounded-2xl p-5 space-y-3 hover:border-forest-800/40 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0D3B2E] text-white">
                        {duty.period} &bull; {duty.time}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {duty.status}
                      </span>
                    </div>

                    <div>
                      <p className="font-serif text-base font-bold text-forest-900">
                        {duty.class} &mdash; {duty.subject}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-600" />
                        <span>{duty.room}</span> &bull; <span>Covering for: <strong className="text-forest-900">{duty.absentTeacher}</strong></span>
                      </p>
                    </div>

                    {/* Syllabus / Instruction Box */}
                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs space-y-1">
                      <p className="font-bold text-forest-900 flex items-center gap-1 text-[11px]">
                        <BookOpen className="w-3.5 h-3.5 text-gold-600" />
                        <span>Handover Notes from {duty.absentTeacher}:</span>
                      </p>
                      <p className="text-charcoal-700 leading-relaxed text-[11.5px]">
                        {duty.syllabusHandover}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500">
                      {duty.date}
                    </span>
                    <button
                      type="button"
                      onClick={onNavigateTimetable}
                      className="text-xs font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>View in Timetable</span>
                      <ChevronRight className="w-3 h-3 text-gold-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workflow Explainer Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
        <h4 className="font-serif text-sm font-bold text-forest-900 flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-gold-600" />
          <span>How Greenfield IS Automated Substitution Works</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#C5A880]/30">
            <strong className="text-forest-900 block mb-1 font-serif text-sm">1. Conflict-Free Timetable Matching</strong>
            The AI engine scans institutional schedules to identify certified faculty members who are free during affected periods.
          </div>
          <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#C5A880]/30">
            <strong className="text-forest-900 block mb-1 font-serif text-sm">2. Admin Authorization</strong>
            The Vice Principal reviews the automated proxy dispatch matrix and authorizes the assignment with digital audit seals.
          </div>
          <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#C5A880]/30">
            <strong className="text-forest-900 block mb-1 font-serif text-sm">3. Instant Synchronization</strong>
            Syllabus notes, room locations, and attendance registers are automatically shared with covering teachers.
          </div>
        </div>
      </div>

    </div>
  );
}
