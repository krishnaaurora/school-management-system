import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Users, 
  Sparkles, 
  MapPin, 
  Calendar,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function TeacherTimetable({ 
  timetable = [], 
  onMarkAttendance, 
  onViewClassStudents 
}) {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const totalTeaching = timetable.filter((t) => !t.isFree).length;
  const freePeriods = timetable.filter((t) => t.isFree).length;

  return (
    <div className="space-y-6">
      
      {/* ── HEADER & METRICS ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-800/15 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-gold-600" />
            <span>Academic Session 2026–27 &bull; Term 1</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Faculty Master Timetable & Daily Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Senior Secondary Mathematics Department &bull; Room & Lab Allocations
          </p>
        </div>

        {/* Timetable Metric Chips */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Teaching Periods</p>
            <p className="font-serif text-base font-bold text-forest-900">{totalTeaching} Periods</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <p className="text-[10px] text-emerald-800 uppercase font-bold">Prep / Free Slots</p>
            <p className="font-serif text-base font-bold text-emerald-900">{freePeriods} Slots</p>
          </div>
        </div>
      </div>

      {/* ── DAY SELECTOR TABS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedDay === day
                ? 'bg-[#0D3B2E] text-white shadow-xs'
                : 'bg-white text-charcoal-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {day} {day === 'Monday' && '• Today'}
          </button>
        ))}
      </div>

      {/* ── MASTER TIMETABLE TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        
        <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            <h3 className="font-serif text-sm font-bold text-forest-900">
              {selectedDay}'s 7-Period Institutional Matrix
            </h3>
          </div>
          <span className="text-[11px] text-gray-500 font-mono">
            Active Hours: 8:30 AM &ndash; 2:45 PM
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-forest-900 text-white uppercase text-[10px] tracking-wider border-b border-forest-800">
                <th className="py-3 px-4 font-bold">Period</th>
                <th className="py-3 px-4 font-bold">Time Window</th>
                <th className="py-3 px-4 font-bold">Class Section</th>
                <th className="py-3 px-4 font-bold">Subject & Topic</th>
                <th className="py-3 px-4 font-bold">Room Location</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {timetable.map((item) => {
                const isCompleted = item.status === 'Completed';
                const isNext = item.status === 'Next Up';
                const isFree = item.isFree;

                return (
                  <tr 
                    key={item.period}
                    className={`transition-colors ${
                      isNext 
                        ? 'bg-amber-50/80 font-medium' 
                        : isFree 
                        ? 'bg-gray-50/40 text-gray-400' 
                        : 'hover:bg-gray-50/80 text-charcoal-800'
                    }`}
                  >
                    {/* Period Number */}
                    <td className="py-3.5 px-4 font-serif font-bold text-forest-900 text-sm">
                      Period {item.period}
                    </td>

                    {/* Time Window */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                      {item.time}
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-4">
                      {isFree ? (
                        <span className="italic text-gray-400 text-xs">Research & Planning</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-forest-50 text-forest-900 font-bold border border-forest-800/20 text-xs">
                          Class {item.classId}
                        </span>
                      )}
                    </td>

                    {/* Subject & Topic */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-forest-900">{item.subject}</p>
                      {item.topic && (
                        <p className="text-[11px] text-[#8C6218] mt-0.5 line-clamp-1">
                          Topic: {item.topic}
                        </p>
                      )}
                    </td>

                    {/* Room */}
                    <td className="py-3.5 px-4 text-gray-600">
                      {item.room ? (
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-gold-600" />
                          <span>Room {item.room}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      )}
                      {isNext && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold text-[10.5px] border border-amber-300 shadow-2xs animate-pulse">
                          <span>Next Up</span>
                        </span>
                      )}
                      {!isCompleted && !isNext && !isFree && (
                        <span className="text-gray-500 font-semibold text-[11px] bg-gray-100 px-2 py-0.5 rounded-md">
                          Upcoming
                        </span>
                      )}
                      {isFree && (
                        <span className="text-gray-400 italic text-[11px]">
                          Available
                        </span>
                      )}
                    </td>

                    {/* Direct Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {!isFree ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onMarkAttendance?.(item.classId)}
                            className="px-2.5 py-1 rounded-lg bg-[#0D3B2E] hover:bg-[#07241B] text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                            title="Mark Attendance for this class"
                          >
                            <UserCheck className="w-3 h-3 text-gold-400" />
                            <span>Attendance</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onViewClassStudents?.(item.classId)}
                            className="px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-charcoal-700 text-[11px] font-bold transition-colors cursor-pointer"
                            title="View Class Students Roster"
                          >
                            <Users className="w-3 h-3 text-forest-900" />
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
