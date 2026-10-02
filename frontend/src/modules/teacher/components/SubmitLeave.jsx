import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  ShieldCheck,
  Eye,
  FileCheck2,
  BookOpen
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function SubmitLeave({ 
  timetable = [], 
  onSubmitLeave, 
  onViewStatus,
  onViewLeaveLetter
}) {
  const [fromDate, setFromDate] = useState('2026-10-03');
  const [toDate, setToDate] = useState('2026-10-03');
  const [reasonCategory, setReasonCategory] = useState('Personal');
  const [reasonDetail, setReasonDetail] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedLeave, setSubmittedLeave] = useState(null);
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  // Calculate affected periods from timetable
  const activePeriods = timetable.filter((t) => !t.isFree);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const fullReason = reasonDetail.trim() 
      ? `${reasonCategory}: ${reasonDetail}` 
      : `${reasonCategory} Leave Application`;

    const leavePayload = {
      fromDate,
      toDate,
      duration: fromDate === toDate ? '1 day' : '2+ days',
      type: `${reasonCategory} Leave`,
      reason: fullReason,
      additionalNotes: additionalNote,
    };

    setTimeout(async () => {
      const result = await onSubmitLeave(leavePayload);
      setSubmittedLeave(result);
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Faculty Leave & AI Proxy Workflow</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Apply for Formal Faculty Leave
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">
          Generates an institutional leave application letter, maps scheduled teaching periods, and initiates administrative proxy allocation.
        </p>
      </div>

      {submittedLeave ? (
        /* Submission Confirmation Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-lg text-center space-y-5"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600/30 flex items-center justify-center mx-auto text-emerald-800">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              Status: Pending Administrative Authorization
            </span>
            <h3 className="font-serif text-2xl font-bold text-forest-900 mt-2">
              Formal Leave Application Dispatched!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Application ID: <strong className="font-mono text-forest-800">{submittedLeave.id}</strong> &bull; {submittedLeave.dateRange} ({submittedLeave.duration})
            </p>
          </div>

          {/* AI Workflow Insight Box */}
          <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#C5A880]/40 text-left text-xs space-y-3">
            <div className="flex items-center gap-2 font-serif font-bold text-forest-900 text-sm">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Automated Timetable Coverage Pipeline</span>
            </div>
            <p className="text-charcoal-700 leading-relaxed text-xs">
              Your <strong>{activePeriods.length} teaching periods</strong> on {submittedLeave.dateRange} have been forwarded to the Admin AI Substitution Console for certified faculty proxy assignment.
            </p>
            <div className="space-y-1.5 pt-1">
              {activePeriods.slice(0, 4).map((p) => (
                <div key={p.period} className="flex items-center justify-between text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="font-semibold text-forest-900">Period {p.period} &bull; Class {p.classId} ({p.subject})</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[10px] border border-amber-200">
                    AI Match In-Flight
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onViewStatus}
              className="py-2.5 px-5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Track Leave Status</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>

            <button
              type="button"
              onClick={() => setSubmittedLeave(null)}
              className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-charcoal-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </motion.div>

      ) : (

        /* Leave Application Form */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Date Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Leave From Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 font-sans cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5">
                  Leave To Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 font-sans cursor-pointer"
                />
              </div>
            </div>

            {/* Reason Category Pills */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1.5">
                Leave Category <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Personal', 'Medical', 'Academic Duty', 'Emergency'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setReasonCategory(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      reasonCategory === cat
                        ? 'bg-forest-900 text-white border-forest-950 shadow-xs'
                        : 'bg-gray-50 text-charcoal-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Reason / Purpose */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1.5">
                Specific Purpose / Reason <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Attending national mathematics pedagogy seminar / Urgent family commitment"
                value={reasonDetail}
                onChange={(e) => setReasonDetail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 placeholder:text-gray-400"
              />
            </div>

            {/* Additional Notes & Syllabus Handover */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1.5 flex items-center justify-between">
                <span>Substitute Handover & Syllabus Instructions</span>
                <span className="text-[11px] font-normal text-gray-500">Optional</span>
              </label>
              <textarea
                rows={3}
                placeholder="Provide instructions or exercise references for the substitute teacher (e.g. Class 10-A: Chapter 4 Exercise 4.2 practice problems 1–15; Class 9-B: Pythagoras theorem proof worksheet)..."
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 placeholder:text-gray-400"
              />
            </div>

            {/* Live Affected Timetable Preview */}
            <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Timetable Impact Analysis</span>
              </div>
              <p className="text-[11.5px] text-amber-900">
                Applying for this date will notify the administration to arrange substitute coverage for your <strong>{activePeriods.length} scheduled periods</strong>:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activePeriods.map((p) => (
                  <span key={p.period} className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-950 text-[11px] font-bold">
                    P{p.period}: Class {p.classId} ({p.subject})
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Institutional Leave Application</span>
                    <Send className="w-4 h-4 text-gold-400" />
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      )}

    </div>
  );
}
