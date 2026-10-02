import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, X, Printer, Download, Sparkles, CheckCircle2, 
  Calendar, Clock, Building2, User, Mail, Phone, ArrowRight, ShieldCheck 
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function LeaveLetterModal({ leave, onClose, onProceedToSubstitute }) {
  if (!leave) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto relative"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 no-print">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-100 text-forest-900 border border-forest-200">
              Official Institutional Document
            </span>
            <span className="text-xs text-gray-400 font-mono">Ref: {leave.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-500 hover:text-forest-900 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Print Official Letter"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── FORMAL LEAVE APPLICATION LETTER (LETTERHEAD DESIGN) ── */}
        <div className="p-6 sm:p-8 bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl shadow-xs font-serif text-gray-900 space-y-6">
          
          {/* Header & Emblem */}
          <div className="text-center pb-5 border-b border-[#DCD0B4]">
            <div className="flex items-center justify-center gap-3 mb-2">
              <GisEmblem className="w-9 h-9" />
              <div className="text-left">
                <h1 className="text-base font-bold text-[#0B2E23] tracking-tight uppercase">
                  Greenfield International School
                </h1>
                <p className="text-[10px] font-sans text-gray-500 tracking-wider uppercase">
                  Faculty Administration & Academic Governance &bull; CBSE Affiliation #1930482
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-0.5 bg-[#0B2E23] text-gold-300 font-sans text-[10px] font-bold uppercase tracking-widest rounded-md mt-1">
              Formal Faculty Leave Application
            </div>
          </div>

          {/* Metadata Block */}
          <div className="font-sans text-xs flex flex-col sm:flex-row sm:items-center justify-between text-gray-600 gap-2 pb-2">
            <div>
              <span className="font-semibold text-gray-900">Application Date: </span>
              <span>{leave.appliedOn || 'October 1, 2026'}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Leave Category: </span>
              <span className="font-bold text-amber-800">{leave.type || 'Personal Leave'}</span>
            </div>
          </div>

          {/* Addressee Block */}
          <div className="font-sans text-xs text-gray-800 space-y-0.5 leading-relaxed">
            <p className="font-bold text-gray-900">To,</p>
            <p className="font-semibold text-forest-950">The Principal & Academic Dean,</p>
            <p className="text-gray-600">Greenfield International School, Main Campus,</p>
            <p className="text-gray-600">Bangalore, Karnataka, India.</p>
          </div>

          {/* Subject Line */}
          <div className="font-sans text-xs bg-white/80 p-3 rounded-xl border border-[#DCD0B4] font-bold text-[#0B2E23]">
            Subject: Application for {leave.type || 'Leave of Absence'} on {leave.leaveDateFormatted} &bull; Reg.
          </div>

          {/* Formal Body */}
          <div className="font-serif text-xs sm:text-sm text-gray-800 leading-relaxed space-y-3.5">
            <p>Respected Principal Madam / Sir,</p>
            
            <p>
              I am writing this formal application to request permission for <strong>{leave.type || 'leave'}</strong> for <strong>1 instructional day</strong> on <strong>{leave.leaveDateFormatted}</strong> ({leave.leaveDate}).
            </p>

            <div className="p-3.5 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl font-sans text-xs text-gray-800 space-y-1">
              <span className="font-bold text-amber-950 uppercase tracking-wider text-[10px] block">
                Primary Reason for Absence:
              </span>
              <p className="italic text-gray-900">
                "{leave.reason}"
              </p>
            </div>

            <p>
              During my absence, <strong>{leave.classesAffectedCount} scheduled classroom periods</strong> will require subject instructional coverage. I have outlined the syllabus topics below and prepared lesson study materials for the designated substitute teachers:
            </p>

            {/* Handover Table */}
            <div className="font-sans overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#0B2E23] text-gold-300 font-bold uppercase text-[9px]">
                  <tr>
                    <th className="p-2">Period & Time</th>
                    <th className="p-2">Grade & Sec</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Handover Lesson Topic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {leave.affectedPeriods?.map((slot, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/30">
                      <td className="p-2 font-bold text-forest-900">{slot.period} ({slot.time})</td>
                      <td className="p-2 font-semibold">Grade {slot.classId}</td>
                      <td className="p-2">{slot.subject}</td>
                      <td className="p-2 italic text-gray-600">{slot.topic || 'Curriculum Practice Exercises'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              I assure you that I will resume my regular teaching duties promptly upon return and ensure all coursework continuity. I kindly request you to approve my leave application and initiate the AI faculty substitute allocation.
            </p>

            <p className="pt-2">Thanking you sincerely,</p>
          </div>

          {/* Signature & Applicant Info */}
          <div className="font-sans pt-4 border-t border-[#DCD0B4] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={leave.avatar}
                alt={leave.teacherName}
                className="w-11 h-11 rounded-full object-cover border-2 border-forest-800/20"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">{leave.teacherName}</p>
                <p className="text-[11px] text-gray-500">{leave.department} Faculty &bull; ID: {leave.teacherId}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Verified Digital Institutional Submission</p>
              </div>
            </div>

            <div className="text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
              <div className="font-serif italic text-sm text-[#0B2E23] font-bold tracking-wider">
                {leave.teacherName}
              </div>
              <p className="text-[10px] text-gray-400 font-mono">Digital Signature Hash &bull; GIS-AUTH-2026</p>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close Letter
          </button>

          <button
            onClick={() => {
              onClose();
              if (onProceedToSubstitute) onProceedToSubstitute(leave);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0B2E23] hover:bg-[#164e3f] text-gold-300 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            Proceed to AI Substitute Allocation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
