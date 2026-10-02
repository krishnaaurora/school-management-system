import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ChevronRight,
  User,
  ShieldCheck,
  Filter
} from 'lucide-react';

export default function StudentTimetable({ timetable = {}, selectedDay = 'Mon', onSelectDay }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [activeDay, setActiveDay] = useState(selectedDay || 'Mon');
  const [selectedClassModal, setSelectedClassModal] = useState(null);

  const periods = timetable.periods || [
    { period: 1, time: '8:30 – 9:15 AM' },
    { period: 2, time: '9:15 – 10:00 AM' },
    { period: 3, time: '10:15 – 11:00 AM' },
    { period: 4, time: '11:00 – 11:45 AM' },
    { period: 5, time: '12:00 – 12:45 PM' },
  ];

  const schedule = timetable.schedule || {};

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">Class 10-A Timetable</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Weekly schedule with real-time room shifts and AI-dispatched substitute faculty updates.
            </p>
          </div>

          {/* Substitute Notice Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Proxy Sync Active</span>
          </div>
        </div>
      </div>

      {/* Day Selector (Tabs for mobile & fast navigation) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isToday = day === 'Mon';
          const isSelected = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => {
                setActiveDay(day);
                onSelectDay?.(day);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{day === 'Mon' ? 'Monday' : day === 'Tue' ? 'Tuesday' : day === 'Wed' ? 'Wednesday' : day === 'Thu' ? 'Thursday' : 'Friday'}</span>
              {isToday && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                  isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Daily Breakdown for Selected Day */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {activeDay === 'Mon' ? 'Monday' : activeDay === 'Tue' ? 'Tuesday' : activeDay === 'Wed' ? 'Wednesday' : activeDay === 'Thu' ? 'Thursday' : 'Friday'} Schedule
            </h3>
            <span className="text-xs text-slate-400 font-medium">({(schedule[activeDay] || []).length} Periods)</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block">Click any period for detailed session notes</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {(schedule[activeDay] || []).map((item, idx) => {
            const periodTime = periods.find(p => p.period === item.period)?.time || 'Period ' + item.period;
            const isSub = item.isSubstitute;

            return (
              <div
                key={idx}
                onClick={() => setSelectedClassModal(item)}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer hover:bg-slate-800/40 ${
                  isSub ? 'bg-emerald-950/10 border-l-4 border-emerald-500' : ''
                }`}
              >
                {/* Period & Subject */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 border ${
                    isSub 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-slate-800 text-white border-slate-700'
                  }`}>
                    <span className="text-[10px] uppercase text-slate-400">P{item.period}</span>
                    <span className="text-xs font-mono">{periodTime.split('–')[0]?.trim()}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-white">{item.subject}</h4>
                      {isSub && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          Substitute Assigned
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        Room {item.room}
                      </span>
                      <span>•</span>
                      <span>{periodTime}</span>
                    </p>
                  </div>
                </div>

                {/* Teacher / Substitute info */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                  <div className="text-left sm:text-right">
                    {isSub ? (
                      <div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-300">{item.substitute}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">(Substitute)</span>
                        </div>
                        <p className="text-[10px] text-slate-500">Regular: {item.teacher} (On Leave)</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-semibold text-slate-200">{item.teacher}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">Faculty Instructor</p>
                      </div>
                    )}
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    item.status === 'Completed'
                      ? 'bg-slate-800 text-slate-400 border-slate-700'
                      : item.status === 'Upcoming'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Weekly Full Grid Overview (Desktop) ── */}
      <div className="hidden lg:block bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Weekly Master Timetable Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                <th className="py-3 px-3">Period</th>
                {days.map(d => (
                  <th key={d} className="py-3 px-3">{d === 'Mon' ? 'Monday' : d === 'Tue' ? 'Tuesday' : d === 'Wed' ? 'Wednesday' : d === 'Thu' ? 'Thursday' : 'Friday'}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {periods.map(p => (
                <tr key={p.period} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                    P{p.period}
                    <span className="block text-[10px] text-slate-500 font-normal">{p.time.split('–')[0]}</span>
                  </td>
                  {days.map(d => {
                    const cell = schedule[d]?.find(c => c.period === p.period);
                    if (!cell) return <td key={d} className="py-3 px-3 text-slate-600">—</td>;
                    return (
                      <td key={d} className="py-3 px-3">
                        <div className={`p-2 rounded-lg border ${
                          cell.isSubstitute
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-slate-950/60 border-slate-800'
                        }`}>
                          <p className="font-bold text-slate-200 truncate">{cell.subject}</p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {cell.isSubstitute ? (
                              <span className="text-emerald-400 font-semibold">{cell.substitute} (Sub)</span>
                            ) : (
                              cell.teacher
                            )}
                          </p>
                          <p className="text-[9px] text-slate-500">Rm {cell.room}</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Detail Modal */}
      {selectedClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Period {selectedClassModal.period}</span>
                <h3 className="text-xl font-bold text-white">{selectedClassModal.subject}</h3>
              </div>
              <button 
                onClick={() => setSelectedClassModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Classroom Location:</span>
                <strong className="text-white">Room {selectedClassModal.room}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Instructor:</span>
                  <strong className="text-white">{selectedClassModal.teacher}</strong>
                </div>
                {selectedClassModal.isSubstitute && (
                  <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-emerald-400 font-bold">
                    <span>Assigned Substitute:</span>
                    <span>{selectedClassModal.substitute} (Covering)</span>
                  </div>
                )}
              </div>

              {selectedClassModal.note && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  {selectedClassModal.note}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedClassModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
