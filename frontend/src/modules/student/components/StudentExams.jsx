import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp,
  Download,
  Printer,
  Eye,
  Send,
  BookOpen
} from 'lucide-react';
import StudentReportCardModal from './StudentReportCardModal';

export default function StudentExams({ exams = {}, student = {} }) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [forwardSuccessToast, setForwardSuccessToast] = useState(false);

  const results = exams.results || [
    { subject: 'Mathematics', code: '041', marks: 95, maxMarks: 100, periodic: 19, term: 76, grade: 'A1', gp: '10.0', teacher: 'Mrs. Ananya Sharma', remarks: 'Exceptional analytical & algebraic aptitude' },
    { subject: 'Science (Chemistry & STEM)', code: '086', marks: 93, maxMarks: 100, periodic: 19, term: 74, grade: 'A1', gp: '10.0', teacher: 'Dr. Rajesh Gupta', remarks: 'High precision in chemical titration & lab practicals' },
    { subject: 'Physics & Mechanics', code: '087', marks: 91, maxMarks: 100, periodic: 18, term: 73, grade: 'A1', gp: '10.0', teacher: 'Mr. Amitav Sen', remarks: 'Consistent theoretical clarity and numerical accuracy' },
    { subject: 'English Language & Literature', code: '184', marks: 91, maxMarks: 100, periodic: 18, term: 73, grade: 'A1', gp: '10.0', teacher: 'Mrs. Sunita Rao', remarks: 'Eloquent prose, debating mastery & structured essays' },
    { subject: 'Social Science', code: '087', marks: 94, maxMarks: 100, periodic: 19, term: 75, grade: 'A1', gp: '10.0', teacher: 'Mr. Vikram Singh', remarks: 'In-depth historical synthesis & map skills' },
    { subject: 'Computer Science & AI', code: '417', marks: 98, maxMarks: 100, periodic: 20, term: 78, grade: 'A1', gp: '10.0', teacher: 'Mr. Tanmay Joshi', remarks: 'Outstanding algorithmic logic & Python project execution' },
  ];

  const schedule = exams.upcomingSchedule || [
    { subject: 'Advanced Mathematics (Pre-Board)', date: 'Oct 08, 2026', time: '9:00 AM – 12:00 PM', room: 'Exam Hall 3 (Senior Wing)', syllabus: 'Full Term-1 CBSE Syllabus (Chapters 1–7)' },
    { subject: 'Physics & Chemistry Theory', date: 'Oct 11, 2026', time: '9:00 AM – 12:00 PM', room: 'Exam Hall 3 (Senior Wing)', syllabus: 'Chemical Reactions, Light & Electricity' },
    { subject: 'Social Science & Humanities', date: 'Oct 14, 2026', time: '9:00 AM – 12:00 PM', room: 'Exam Hall 3 (Senior Wing)', syllabus: 'History, Civics, Geography & Economics' },
    { subject: 'Computer Science & AI Practical', date: 'Oct 16, 2026', time: '1:00 PM – 3:30 PM', room: 'STEM Lab B', syllabus: 'Python OOP & Machine Learning Models' },
  ];

  const overallPct = exams.overallPercentage || 93.67;
  const grade = exams.overallGrade || 'A1 (Outstanding)';
  const term = exams.term || 'Term-1 Mid-Year Scholastic Assessment';

  const handleForwardToParent = () => {
    setForwardSuccessToast(true);
    setTimeout(() => setForwardSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* ── TOAST NOTIFICATION FOR PARENT FORWARD ── */}
      {forwardSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-900 text-white text-xs font-bold shadow-xl border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-gold-400" />
            <span>Official A4 Progress Report Card successfully forwarded to registered parent email: <strong>rajesh.kumar@parent.gisedu.in</strong>.</span>
          </div>
        </div>
      )}

      {/* ── PROMINENT REPORT CARD HERO BANNER ── */}
      <div className="bg-gradient-to-r from-[#0B2E23] via-[#0D3B2E] to-[#164e3f] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        
        {/* Subtle Watermark */}
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-4 border-gold-400" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>Official CBSE Scholastic Evaluation</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {term} &bull; AY 2026–27
            </h2>
            
            <p className="text-xs sm:text-sm text-ivory/80 max-w-xl">
              Certified academic evaluation with standardized CBSE grading scales, scholastic subject breakdowns, co-scholastic domains, and digital seal verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* View Full Report Card Modal */}
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Official Report Card</span>
            </button>

            {/* Print/Download A4 format directly */}
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gold-300" />
              <span>A4 Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15 text-xs">
          <div>
            <span className="text-[10.5px] text-ivory/60 uppercase font-bold block">Overall Percentage</span>
            <span className="font-serif text-2xl font-bold text-gold-300">{overallPct}%</span>
          </div>
          <div>
            <span className="text-[10.5px] text-ivory/60 uppercase font-bold block">Grand Total Marks</span>
            <span className="font-serif text-2xl font-bold text-white">562 / 600</span>
          </div>
          <div>
            <span className="text-[10.5px] text-ivory/60 uppercase font-bold block">Scholastic Grade</span>
            <span className="font-serif text-2xl font-bold text-emerald-300">{grade}</span>
          </div>
          <div>
            <span className="text-[10.5px] text-ivory/60 uppercase font-bold block">Class Standing</span>
            <span className="font-serif text-2xl font-bold text-gold-300">Rank 2 in 10-A</span>
          </div>
        </div>

      </div>

      {/* ── SUBJECT-WISE MARKS & GRADES TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold-600" />
            <h3 className="font-serif text-sm font-bold text-forest-900">
              Subject-Wise Scholastic Marks Breakdown
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            CBSE Class 10 Standardized Curriculum
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-forest-900 text-white uppercase text-[10.5px] tracking-wider border-b border-forest-800">
                <th className="py-3 px-4 font-bold">Subject Discipline</th>
                <th className="py-3 px-4 font-bold text-center">IA / Periodic (20)</th>
                <th className="py-3 px-4 font-bold text-center">Term Exam (80)</th>
                <th className="py-3 px-4 font-bold text-center">Total (100)</th>
                <th className="py-3 px-4 font-bold text-center">Grade</th>
                <th className="py-3 px-4 font-bold">Faculty Observation & Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {results.map((res, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-forest-900">
                    <div>
                      <span>{res.subject}</span>
                      <span className="block text-[10.5px] font-normal text-gray-500">
                        {res.teacher} &bull; Code {res.code}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                    {res.periodic || 19}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                    {res.term || 76}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-forest-900 text-sm">
                    {res.marks}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 text-[11px]">
                      {res.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-charcoal-700 max-w-sm">
                    {res.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── UPCOMING EXAMINATION SCHEDULE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-base font-bold text-forest-900">
              Upcoming Pre-Board & Assessment Timetable
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Hall Ticket Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedule.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30 hover:border-forest-800/40 transition-all shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-forest-900 text-sm">{item.subject}</h4>
                <span className="font-mono text-xs font-bold text-forest-800 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {item.date}
                </span>
              </div>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                <span>{item.time}</span>
                <span>&bull;</span>
                <span className="font-semibold text-forest-900">{item.room}</span>
              </p>
              {item.syllabus && (
                <p className="text-[11px] text-gray-500 pt-1 border-t border-gray-200/80">
                  Syllabus: <em>{item.syllabus}</em>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL: OFFICIAL CBSE PROGRESS REPORT CARD (A4 FORMAT) ── */}
      {reportModalOpen && (
        <StudentReportCardModal
          student={student}
          onClose={() => setReportModalOpen(false)}
          onForwardParent={handleForwardToParent}
        />
      )}

    </div>
  );
}
