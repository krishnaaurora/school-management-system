import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronDown, 
  Sparkles,
  Users,
  Building2,
  FileText
} from 'lucide-react';

export default function LeaveStatus({ leaves = [], onSelectLeave, onViewSubstitute }) {
  const [expandedLeaveId, setExpandedLeaveId] = useState(leaves[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedLeaveId(expandedLeaveId === id ? null : id);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            Pending Admin Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-6 h-6 text-emerald-400" />
              My Leave Requests & Coverage Status
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Track administrative review progress and period-by-period substitute assignments for your leaves.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Total Submissions: <strong className="text-white">{leaves.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Leave List / Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Submitted Leave History</h3>
          <span className="text-xs text-slate-400">Click row to view coverage & substitute breakdown</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {leaves.map((leave) => {
            const isExpanded = expandedLeaveId === leave.id;
            const isApproved = leave.status?.toLowerCase() === 'approved';
            const isPending = leave.status?.toLowerCase() === 'pending';

            return (
              <div key={leave.id} className="transition-colors hover:bg-slate-800/30">
                {/* Row Header */}
                <div 
                  onClick={() => toggleExpand(leave.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <button 
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white mt-1 sm:mt-0 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-base font-bold text-white">
                          {leave.date || leave.leave_date || `${leave.start_date || 'Oct 3'} – ${leave.end_date || 'Oct 3'}`}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {leave.duration || '1 Day'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Type: <strong className="text-slate-200 capitalize">{leave.reason || 'Personal'}</strong>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {leave.additional_notes || leave.notes || 'Routine faculty leave request submitted via Teacher Portal.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    {getStatusBadge(leave.status)}
                    <span className="text-xs text-slate-400 hidden sm:inline-block">
                      {leave.substitutes?.length ? `${leave.substitutes.length} Classes Covered` : 'No coverage recorded'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details / Coverage Card */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 bg-slate-950/40 border-t border-slate-800/50 space-y-4">
                    {isApproved ? (
                      <div className="space-y-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-emerald-300">
                              Your leave has been approved by the Administration.
                            </p>
                            <p className="text-xs text-emerald-200/80 mt-0.5">
                              The AI Substitute Dispatch Engine has assigned full coverage for your scheduled periods. No manual handover required.
                            </p>
                          </div>
                        </div>

                        {/* Substitute Grid */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              Covering Substitute Faculty Plan
                            </h4>
                            {onViewSubstitute && (
                              <button 
                                onClick={onViewSubstitute}
                                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium hover:underline flex items-center gap-1"
                              >
                                View full coverage board <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {leave.substitutes && leave.substitutes.length > 0 ? (
                              leave.substitutes.map((sub, idx) => (
                                <div 
                                  key={idx}
                                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        {sub.period}
                                      </span>
                                      <span className="text-xs text-slate-400 font-medium">
                                        Class: <strong className="text-white">{sub.class_name || sub.class}</strong>
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400">Subject</p>
                                    <p className="text-sm font-bold text-white mb-2">{sub.subject}</p>
                                  </div>

                                  <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                                      {sub.substitute?.[0] || 'S'}
                                    </div>
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-semibold text-slate-200 truncate">{sub.substitute}</p>
                                      <p className="text-[10px] text-emerald-400 font-medium">Covering Teacher</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-4 text-center text-xs text-slate-400">
                                No periods required coverage on this date.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : isPending ? (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-300">
                            Status: Pending Admin Review
                          </p>
                          <p className="text-xs text-amber-200/80 mt-0.5">
                            The administration is reviewing your request with AI timetable conflict matching. You will receive an instant notification once approved and substitutes are allotted.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-rose-300">
                            Status: Request Not Approved
                          </p>
                          <p className="text-xs text-rose-200/80 mt-0.5">
                            {leave.admin_remarks || 'Institutional conflict or critical examination duty on this date. Please consult the Vice Principal.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
