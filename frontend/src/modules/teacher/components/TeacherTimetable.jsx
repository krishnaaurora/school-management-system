import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ArrowRight, UserCheck, Users, Sparkles, MapPin } from 'lucide-react';

export default function TeacherTimetable({ 
  timetable, 
  onMarkAttendance, 
  onViewClassStudents 
}) {
  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900">
            Today's Timetable &mdash; Monday
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Senior Secondary Mathematics Schedule &bull; Term 1 (AY 2026&ndash;27)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-800/15">
          <Clock className="w-3.5 h-3.5 text-gold-600" />
          <span>Active Academic Hours: 8:30 AM &ndash; 2:45 PM</span>
        </div>
      </div>

      {/* Master Timetable Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-forest-900 text-white uppercase text-[10.5px] tracking-wider border-b border-forest-800">
                <th className="py-3 px-4 font-semibold">Period</th>
                <th className="py-3 px-4 font-semibold">Time</th>
                <th className="py-3 px-4 font-semibold">Class</th>
                <th className="py-3 px-4 font-semibold">Subject</th>
                <th className="py-3 px-4 font-semibold">Room</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {timetable.map((item, idx) => {
                const isCompleted = item.status === 'Completed';
                const isNext = item.status === 'Next Up';
                const isFree = item.isFree;

                return (
                  <tr 
                    key={item.period}
                    className={`transition-colors ${
                      isNext 
                        ? 'bg-amber-50/70 font-semibold' 
                        : isFree 
                        ? 'bg-gray-50/50 text-gray-400' 
                        : 'hover:bg-gray-50/80 text-charcoal-800'
                    }`}
                  >
                    {/* Period */}
                    <td className="py-3.5 px-4 font-bold text-forest-900">
                      P{item.period}
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                      {item.time}
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-4">
                      {isFree ? (
                        <span className="italic text-gray-400">Free Period</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-forest-50 text-forest-900 font-bold border border-forest-800/15">
                          {item.classId}
                        </span>
                      )}
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-4 font-medium">
                      {item.subject}
                    </td>

                    {/* Room */}
                    <td className="py-3.5 px-4 text-gray-600">
                      {item.room ? `Room ${item.room}` : '—'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Done</span>
                        </span>
                      )}
                      {isNext && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10.5px] border border-amber-300 animate-pulse">
                          <span>Next Up</span>
                        </span>
                      )}
                      {!isCompleted && !isNext && !isFree && (
                        <span className="text-gray-500 font-medium text-[11px]">
                          Upcoming
                        </span>
                      )}
                      {isFree && (
                        <span className="text-gray-400 italic text-[11px]">
                          Available
                        </span>
                      )}
                    </td>

                    {/* Quick Direct Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {!isFree ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onMarkAttendance?.(item.classId)}
                            className="px-2.5 py-1 rounded-lg bg-[#0D3B2E] hover:bg-[#07241B] text-white text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                            title="Mark Attendance for this class"
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>Attendance</span>
                          </button>
                          <button
                            onClick={() => onViewClassStudents?.(item.classId)}
                            className="px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-charcoal-700 text-[11px] font-medium transition-colors cursor-pointer"
                            title="View Student Roster"
                          >
                            <Users className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-[11px]">&mdash;</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
