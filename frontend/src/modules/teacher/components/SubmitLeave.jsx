import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, AlertTriangle, CheckCircle2, 
  Send, Sparkles, FileText, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function SubmitLeave({ 
  timetable, 
  onSubmitLeave, 
  onViewStatus 
}) {
  const [fromDate, setFromDate] = useState('2026-10-03');
  const [toDate, setToDate] = useState('2026-10-03');
  const [reasonCategory, setReasonCategory] = useState('Personal');
  const [reasonDetail, setReasonDetail] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedLeave, setSubmittedLeave] = useState(null);

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
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Faculty Leave & AI Coverage Workflow</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Submit Leave Request
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          The AI engine will automatically map your timetable and propose substitute coverage to the Admin Office.
        </p>
      </div>

      {submittedLeave ? (
        /* Submission Confirmation Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 border-2 border-emerald-500/30 shadow-lg text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600/30 flex items-center justify-center mx-auto text-emerald-700">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              Status: Pending Admin Review
            </span>
            <h3 className="font-serif text-xl font-bold text-forest-900 mt-2">
              Leave Request Submitted Successfully!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Application Ref: <strong className="font-mono text-forest-800">{submittedLeave.id}</strong> &bull; {submittedLeave.dateRange} ({submittedLeave.duration})
            </p>
          </div>

          {/* AI Workflow Insight Box */}
          <div className="bg-[#F8F5EF] p-4 rounded-xl border border-gray-200 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-forest-900">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Automated Timetable Coverage Pipeline</span>
            </div>
            <p className="text-charcoal-700 leading-relaxed">
              Your <strong>{activePeriods.length} teaching periods</strong> on {submittedLeave.dateRange} have been forwarded to the Admin AI Substitution Console.
            </p>
            <div className="space-y-1 pt-1">
              {activePeriods.slice(0, 3).map((p) => (
                <div key={p.period} className="flex items-center justify-between text-[11px] text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                  <span>Period {p.period} &bull; Class {p.classId} ({p.subject})</span>
                  <span className="font-semibold text-amber-700">AI Match Pending</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onViewStatus}
              className="py-2.5 px-5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Track Leave Status</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>

            <button
              onClick={() => setSubmittedLeave(null)}
              className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-charcoal-700 font-medium text-xs transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </motion.div>

      ) : (

        /* Leave Submission Form */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Date Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-800 mb-1">
                  Leave From <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 font-sans cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-800 mb-1">
                  Leave To <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 font-sans cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reason Category */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">
                Reason Category <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Personal', 'Medical', 'Duty', 'Other'].map((cat) => (
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
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">
                Specific Reason / Purpose
              </label>
              <input
                type="text"
                placeholder="e.g. Sister's wedding ceremony / Medical consultation / Conference"
                value={reasonDetail}
                onChange={(e) => setReasonDetail(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 placeholder:text-gray-400"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">
                Additional Note / Lesson Plan Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Share any special instructions for the substitute teacher (e.g. Chapter 4 Exercise 4.2 practice questions assigned to Class 10-A)..."
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 placeholder:text-gray-400"
              />
            </div>

            {/* Affected Timetable Preview */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Timetable Impact Detection:</strong>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Submitting this request will automatically flag {activePeriods.length} teaching periods (8-A, 9-B, 10-A, 9-A) for intelligent substitute allocation.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-6 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Leave Request</span>
                  <Send className="w-4 h-4 text-gold-400" />
                </>
              )}
            </button>

          </form>
        </motion.div>
      )}

    </div>
  );
}
