import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  User, 
  ShieldCheck, 
  Send,
  FileCheck,
  Building2
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function StudentReportCardModal({ 
  student = {}, 
  onClose,
  onForwardParent
}) {
  const printRef = useRef(null);

  const reportData = {
    schoolName: "GREENFIELD INTERNATIONAL SCHOOL",
    schoolSubtitle: "Senior Secondary (CBSE Affiliation No: 1930482 • School Code: 45210)",
    campusAddress: "Campus Boulevard, Knowledge City, Bangalore – 560034",
    academicSession: "Academic Session 2026–27",
    termTitle: "Term-1 Mid-Year Comprehensive Scholastic Assessment",
    studentName: student.name || "Aarav Kumar",
    admissionNo: "GIS-2024-884",
    rollNo: student.rollNo || "10A-01",
    classSection: "Grade 10 - Section A",
    dob: "14-Aug-2010",
    motherName: "Mrs. Sunita Kumar",
    fatherName: "Mr. Rajesh Kumar",
    attendance: "96.4% (87 of 90 Working Days)",
    scholasticMarks: [
      { code: "041", subject: "Mathematics", periodic: 19, termExam: 76, total: 95, grade: "A1", gp: "10.0", teacher: "Mrs. Ananya Sharma", remarks: "Exceptional analytical & algebraic aptitude" },
      { code: "086", subject: "Science (Chemistry & STEM)", periodic: 19, termExam: 74, total: 93, grade: "A1", gp: "10.0", teacher: "Dr. Rajesh Gupta", remarks: "High precision in chemical titration & lab practicals" },
      { code: "087", subject: "Physics & Mechanics", periodic: 18, termExam: 73, total: 91, grade: "A1", gp: "10.0", teacher: "Mr. Amitav Sen", remarks: "Consistent theoretical clarity and numerical accuracy" },
      { code: "184", subject: "English Language & Literature", periodic: 18, termExam: 73, total: 91, grade: "A1", gp: "10.0", teacher: "Mrs. Sunita Rao", remarks: "Eloquent prose, debating mastery & structured essays" },
      { code: "087", subject: "Social Science", periodic: 19, termExam: 75, total: 94, grade: "A1", gp: "10.0", teacher: "Mr. Vikram Singh", remarks: "In-depth historical synthesis & map skills" },
      { code: "417", subject: "Computer Science & AI", periodic: 20, termExam: 78, total: 98, grade: "A1", gp: "10.0", teacher: "Mr. Tanmay Joshi", remarks: "Outstanding algorithmic logic & Python project execution" },
    ],
    coScholastic: [
      { activity: "Work Education / Robotics Lab", grade: "A+", descriptiveIndicator: "Demonstrates creative engineering problem-solving" },
      { activity: "Visual & Performing Arts", grade: "A", descriptiveIndicator: "Active participation in institutional music ensemble" },
      { activity: "Health & Physical Education", grade: "A+", descriptiveIndicator: "Exemplary sportsmanship; Junior Football Captain" },
      { activity: "Discipline & Institutional Values", grade: "A+", descriptiveIndicator: "Courteous, punctual, and maintains highest ethics" },
    ],
    overallMarks: 562,
    maxMarks: 600,
    overallPercentage: "93.67%",
    cgpa: "10.0",
    overallGrade: "A1 (Outstanding)",
    classRank: "Rank 2 of 32 in Class 10-A",
    classTeacherRemarks: "Aarav is an outstanding student with remarkable intellectual curiosity, disciplined study habits, and exemplary leadership in STEM and co-curricular programs. He consistently maintains top performance across theoretical and laboratory disciplines.",
    principalRemarks: "Promoted with Highest Honors. Congratulations on an exemplary scholastic record.",
    issueDate: "October 02, 2026",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      
      {/* ── STYLES FOR CRISP A4 PAPER PRINTING ── */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report-card, #printable-report-card * {
            visibility: visible;
          }
          #printable-report-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            color: #000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ── MODAL CONTAINER (ANIMATED REPORT CARD REVEAL) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-[#FAF8F3] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#C5A880]/50 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none"
      >
        {/* Top Floating Control Bar */}
        <div className="no-print bg-[#0B2E23] text-white px-5 py-3.5 flex items-center justify-between border-b border-forest-700 shrink-0">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-gold-400" />
            <div>
              <span className="font-serif font-bold text-sm sm:text-base text-gold-200">
                Official CBSE Student Progress Report Card
              </span>
              <span className="hidden sm:inline-block text-xs text-white/70 ml-2">
                &bull; Term-1 (AY 2026&ndash;27)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download / Print A4 */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-forest-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Print or Save as Official A4 PDF Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download A4</span>
            </button>

            {/* Forward to Parent */}
            <button
              type="button"
              onClick={() => onForwardParent?.(reportData)}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs items-center gap-1.5 transition-all cursor-pointer"
              title="Forward official copy to registered guardian email"
            >
              <Send className="w-3.5 h-3.5 text-gold-300" />
              <span>Forward to Parents</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── REPORT CARD DOCUMENT BODY (STRUCTURED A4 SHEET) ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 print:p-0 print:overflow-visible">
          
          <div 
            id="printable-report-card"
            ref={printRef}
            className="bg-white rounded-2xl border-2 border-[#C5A880]/60 p-6 sm:p-8 shadow-sm relative overflow-hidden text-charcoal-900 font-sans"
          >
            {/* Elegant Double Border Frame */}
            <div className="absolute inset-1.5 border border-[#C5A880]/30 rounded-xl pointer-events-none" />

            {/* Subtle Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <img
                src="/gis-crest.jpg"
                alt="Watermark"
                className="w-96 h-96 object-contain"
              />
            </div>

            {/* ── 1. INSTITUTIONAL LETTERHEAD ── */}
            <div className="relative z-10 text-center pb-4 border-b-2 border-forest-900/20">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#FAF7F2] ring-2 ring-[#C5A880] p-1 shadow-sm flex items-center justify-center shrink-0">
                  <img
                    src="/gis-crest.jpg"
                    alt="Greenfield International School Crest"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="text-left sm:text-center">
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0B2E23] leading-none">
                    {reportData.schoolName}
                  </h1>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#8C6218] mt-1">
                    {reportData.schoolSubtitle}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                    {reportData.campusAddress}
                  </p>
                </div>
              </div>

              {/* Document Banner */}
              <div className="mt-3 inline-block px-5 py-1 rounded-full bg-[#FAF8F3] border border-[#C5A880] text-[#0B2E23] text-xs font-serif font-bold uppercase tracking-wider shadow-2xs">
                {reportData.termTitle} &bull; {reportData.academicSession}
              </div>
            </div>

            {/* ── 2. STUDENT BIO INFORMATION TABLE ── */}
            <div className="relative z-10 my-4 p-3.5 sm:p-4 bg-[#FAF8F3] rounded-xl border border-gray-200 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Student Name</span>
                  <span className="font-bold text-forest-900 text-sm font-serif">{reportData.studentName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Roll Number</span>
                  <span className="font-mono font-bold text-forest-900">{reportData.rollNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Admission / Reg No</span>
                  <span className="font-mono font-bold text-forest-900">{reportData.admissionNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Class & Section</span>
                  <span className="font-bold text-forest-900">{reportData.classSection}</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Date of Birth</span>
                  <span className="font-medium text-gray-800">{reportData.dob}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Mother's Name</span>
                  <span className="font-medium text-gray-800">{reportData.motherName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Father's Name</span>
                  <span className="font-medium text-gray-800">{reportData.fatherName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Cumulative Attendance</span>
                  <span className="font-bold text-emerald-800">{reportData.attendance}</span>
                </div>
              </div>
            </div>

            {/* ── 3. SCHOLASTIC ASSESSMENT DOMAIN (PART 1) ── */}
            <div className="relative z-10 space-y-2 my-4">
              <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                <span className="font-serif font-bold text-xs sm:text-sm text-forest-900 uppercase tracking-wide">
                  Part 1: Scholastic Areas (Academic Achievement)
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Grading Scale: A1 (91–100) &bull; A2 (81–90) &bull; B1 (71–80)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#0B2E23] text-white text-[10.5px] uppercase font-bold">
                      <th className="py-2.5 px-3 border border-forest-800">Code</th>
                      <th className="py-2.5 px-3 border border-forest-800">Subject Discipline</th>
                      <th className="py-2.5 px-3 border border-forest-800 text-center">IA / Periodic (20)</th>
                      <th className="py-2.5 px-3 border border-forest-800 text-center">Term Exam (80)</th>
                      <th className="py-2.5 px-3 border border-forest-800 text-center">Total (100)</th>
                      <th className="py-2.5 px-3 border border-forest-800 text-center">Grade</th>
                      <th className="py-2.5 px-3 border border-forest-800 text-center">Grade Point</th>
                      <th className="py-2.5 px-3 border border-forest-800">Faculty Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-sans">
                    {reportData.scholasticMarks.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="py-2 px-3 font-mono text-gray-500 border border-gray-200">{row.code}</td>
                        <td className="py-2 px-3 font-bold text-forest-900 border border-gray-200">
                          {row.subject}
                          <span className="block text-[10px] font-normal text-gray-500">{row.teacher}</span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono border border-gray-200">{row.periodic}</td>
                        <td className="py-2 px-3 text-center font-mono border border-gray-200">{row.termExam}</td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-forest-900 border border-gray-200">{row.total}</td>
                        <td className="py-2 px-3 text-center border border-gray-200">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 text-[10.5px]">
                            {row.grade}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-semibold border border-gray-200">{row.gp}</td>
                        <td className="py-2 px-3 text-[11px] text-gray-600 border border-gray-200">{row.remarks}</td>
                      </tr>
                    ))}
                    {/* Summary Row */}
                    <tr className="bg-[#FAF8F3] font-bold text-forest-900 border-t-2 border-forest-900">
                      <td colSpan={4} className="py-2.5 px-3 text-right uppercase border border-gray-300 font-serif">
                        Cumulative Grand Total & Academic Standing:
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-sm border border-gray-300 font-bold">
                        {reportData.overallMarks} / {reportData.maxMarks}
                      </td>
                      <td className="py-2.5 px-3 text-center border border-gray-300 text-emerald-900 font-extrabold">
                        {reportData.overallGrade}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono border border-gray-300">
                        {reportData.cgpa}
                      </td>
                      <td className="py-2.5 px-3 border border-gray-300 text-emerald-800 font-bold text-[11.5px]">
                        {reportData.overallPercentage} &bull; {reportData.classRank}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── 4. CO-SCHOLASTIC & DISCIPLINE (PART 2) ── */}
            <div className="relative z-10 space-y-2 my-4">
              <span className="font-serif font-bold text-xs sm:text-sm text-forest-900 uppercase tracking-wide block pb-1 border-b border-gray-200">
                Part 2: Co-Scholastic Activities & Institutional Discipline (3-Point Grading Scale: A, B, C)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {reportData.coScholastic.map((co, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F3] border border-gray-200 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-forest-900 text-[11.5px]">{co.activity}</p>
                      <p className="text-[10.5px] text-gray-600 mt-0.5">{co.descriptiveIndicator}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-forest-50 text-forest-900 font-bold border border-forest-800/20 text-xs">
                      {co.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. FACULTY REMARKS & PROMOTION STATUS ── */}
            <div className="relative z-10 my-4 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs space-y-1.5">
              <p className="font-serif font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Class Teacher's Evaluative Observation:</span>
              </p>
              <p className="text-charcoal-800 italic leading-relaxed text-[11.5px]">
                "{reportData.classTeacherRemarks}"
              </p>
            </div>

            {/* ── 6. SIGNATURES & OFFICIAL SEALS ── */}
            <div className="relative z-10 mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-3 gap-4 text-center text-xs">
              
              {/* Class Teacher */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic font-bold text-forest-800 text-sm">Ananya Sharma</span>
                </div>
                <div className="w-full border-t border-gray-400 pt-1">
                  <p className="font-bold text-gray-800 text-[11px]">Class Teacher</p>
                  <p className="text-[9.5px] text-gray-500">Grade 10-A Mentor</p>
                </div>
              </div>

              {/* Institutional Digital Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-forest-900/30 bg-[#FAF7F2] p-1 flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-8 h-8 text-forest-800" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6218] mt-1">
                  Official School Seal
                </span>
                <span className="text-[8.5px] text-gray-400 font-mono">Date: {reportData.issueDate}</span>
              </div>

              {/* Principal */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic font-bold text-forest-900 text-sm">Dr. Evelyn Vance</span>
                </div>
                <div className="w-full border-t border-gray-400 pt-1">
                  <p className="font-bold text-gray-800 text-[11px]">Principal / Head of School</p>
                  <p className="text-[9.5px] text-gray-500">Greenfield International School</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}
