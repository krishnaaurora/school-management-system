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
  FileText,
  Eye,
  ShieldCheck,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

export default function LeaveStatus({ 
  leaves = [], 
  onViewLeaveLetter, 
  onViewSubstitute 
}) {
  const [expandedLeaveId, setExpandedLeaveId] = useState(leaves[0]?.id || null);

  const toggleExpand = (id) => {
    setExpandedLeaveId(expandedLeaveId === id ? null : id);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved by Admin
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Not Approved
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Leave Requests & AI Proxy Tracking</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            My Leave Requests & Coverage Status
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl">
            Track administrative approvals, institutional letter generation, and period-by-period substitute assignments in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Submissions</p>
            <p className="font-serif text-xl font-bold text-forest-900">{leaves.length} Applications</p>
          </div>
        </div>
      </div>

      {/* Leave Requests List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        
        <div className="p-4 sm:p-5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-serif text-sm font-bold text-forest-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold-600" />
            <span>Formal Leave History & AI Handover Registry</span>
          </h3>
          <span className="text-[11px] text-gray-500 hidden sm:inline-block">
            Click row to expand substitute roster &bull; Click eye for formal letter
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {leaves.map((leave) => {
            const isExpanded = expandedLeaveId === leave.id;
            const isApproved = leave.status?.toLowerCase() === 'approved';
            const isPending = leave.status?.toLowerCase() === 'pending';

            return (
              <div key={leave.id} className="transition-colors hover:bg-gray-50/60">
                
                {/* Row Summary */}
                <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div 
                    onClick={() => toggleExpand(leave.id)}
                    className="flex items-start sm:items-center gap-3.5 flex-1 cursor-pointer"
                  >
                    <button 
                      type="button"
                      className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-forest-900 mt-0.5 sm:mt-0 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-serif text-base font-bold text-forest-900">
                          {leave.dateRange || leave.date || leave.leave_date || `${leave.start_date || 'Oct 3'} – ${leave.end_date || 'Oct 3'}`}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-forest-50 text-forest-800 font-bold border border-forest-800/20">
                          {leave.duration || '1 Day'}
                        </span>
                        <span className="text-xs font-semibold text-gray-600">
                          Category: <strong className="text-forest-900">{leave.type || leave.reason || 'Personal'}</strong>
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {leave.additional_notes || leave.additionalNotes || leave.notes || 'Formal faculty leave application submitted via Teacher Portal.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    
                    {getStatusBadge(leave.status)}

                    {/* EYE ICON: View Complete Formal Institutional Leave Letter */}
                    <button
                      type="button"
                      onClick={() => onViewLeaveLetter?.(leave)}
                      className="px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-800/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                      title="View Complete Formal Leave Letter with Institutional Letterhead"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-600" />
                      <span>View Letter</span>
                    </button>

                  </div>

                </div>

                {/* Expanded Details & Substitutes Breakdown */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-3 bg-[#FAF8F3]/60 border-t border-gray-100 space-y-4">
                    
                    {isApproved ? (
                      <div className="space-y-4">
                        
                        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-emerald-900">
                              Leave Authorized by Vice Principal &bull; Digital Seal Attached
                            </p>
                            <p className="text-xs text-emerald-800/90 mt-0.5">
                              The AI Substitute Dispatch Engine has assigned full coverage for your teaching periods. Handover materials have been synchronized.
                            </p>
                          </div>
                        </div>

                        {/* Substitute Coverage Roster */}
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                              <span>Covering Substitute Faculty Plan</span>
                            </h4>
                            {onViewSubstitute && (
                              <button 
                                type="button"
                                onClick={onViewSubstitute}
                                className="text-xs font-bold text-forest-800 hover:text-forest-950 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>Full proxy board</span>
                                <ChevronRight className="w-3 h-3 text-gold-600" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {leave.substitutes && leave.substitutes.length > 0 ? (
                              leave.substitutes.map((sub, idx) => (
                                <div 
                                  key={idx}
                                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:border-forest-800/30 transition-all"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-forest-50 text-forest-900 border border-forest-800/20">
                                        Period {sub.period}
                                      </span>
                                      <span className="text-xs text-gray-600 font-semibold">
                                        Class <strong className="text-forest-900">{sub.class_name || sub.class || sub.classId}</strong>
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-gray-500">Subject</p>
                                    <p className="text-xs sm:text-sm font-bold text-forest-900 mb-2">{sub.subject}</p>
                                  </div>

                                  <div className="pt-2.5 border-t border-gray-100 flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-[#0B2E23] text-gold-300 font-bold text-xs flex items-center justify-center">
                                      {sub.substitute?.[0] || 'S'}
                                    </div>
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-bold text-gray-900 truncate">{sub.substitute}</p>
                                      <p className="text-[10px] text-emerald-700 font-semibold">Assigned Substitute</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-4 text-center text-xs text-gray-400">
                                No scheduled teaching periods required substitute coverage on this date.
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : isPending ? (
                      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-amber-900">
                            Status: Awaiting Principal Review
                          </p>
                          <p className="text-xs text-amber-800/90 mt-0.5">
                            The administrative office has received your formal application. Automated timetable conflict matching is active. You will receive a notification upon approval.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-rose-900">
                            Status: Application Not Approved
                          </p>
                          <p className="text-xs text-rose-800/90 mt-0.5">
                            {leave.admin_remarks || 'Institutional conflict or mandatory examination duty on this date. Please consult the Vice Principal.'}
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
