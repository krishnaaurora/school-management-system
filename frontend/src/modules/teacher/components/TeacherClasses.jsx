import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, ArrowRight, UserCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function TeacherClasses({ 
  profile, 
  onSelectClass,
  onMarkAttendance 
}) {
  const assignedClasses = profile?.assignedClasses || [
    { id: "10-A", name: "Grade 10-A", subject: "Mathematics", studentsCount: 32, attendanceAvg: "94%", room: "301", todayPeriod: "Period 3 (10:15–11:00)", syllabusProgress: 72 },
    { id: "9-B", name: "Grade 9-B", subject: "Mathematics", studentsCount: 30, attendanceAvg: "91%", room: "204", todayPeriod: "Period 2 (9:15–10:00)", syllabusProgress: 65 },
    { id: "8-A", name: "Grade 8-A", subject: "Mathematics", studentsCount: 35, attendanceAvg: "96%", room: "201", todayPeriod: "Period 1 (8:30–9:15)", syllabusProgress: 80 },
    { id: "9-A", name: "Grade 9-A", subject: "Mathematics", studentsCount: 28, attendanceAvg: "95%", room: "202", todayPeriod: "Period 5 (12:00–12:45)", syllabusProgress: 68 },
  ];

  const totalStudents = assignedClasses.reduce((acc, c) => acc + (c.studentsCount || 30), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-50 text-forest-900 px-2.5 py-0.5 rounded-full border border-forest-200">
              Curriculum & Class Allocation
            </span>
            <span className="text-xs text-gray-500 font-mono">
              Academic Year 2026–27
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
            My Assigned Classes & Syllabus
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Teaching load: {assignedClasses.length} class sections &bull; {totalStudents} enrolled students &bull; {profile.department}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-gray-200 text-xs">
            <span className="text-gray-500">Weekly Lecture Load: </span>
            <strong className="text-forest-900 font-bold">24 Periods / Week</strong>
          </div>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {assignedClasses.map((cls, idx) => {
          const progress = cls.syllabusProgress || (idx === 0 ? 74 : idx === 1 ? 68 : idx === 2 ? 82 : 60);

          return (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-serif font-bold text-[#0B2E23] block">
                      {cls.name || `Grade ${cls.id}`} &mdash; {cls.subject || profile.subject}
                    </span>
                    <span className="text-xs text-gray-500">Class Room: {cls.room || 'Room 301'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-forest-50 text-forest-900 text-xs font-bold border border-forest-200">
                    Grade {cls.id}
                  </span>
                </div>

                {/* Metrics Box */}
                <div className="space-y-2.5 text-xs text-gray-700 bg-[#FAF8F3] p-4 rounded-xl border border-gray-200/80 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-forest-700" />
                      <span>Total Students:</span>
                    </span>
                    <strong className="font-bold text-gray-900">{cls.studentsCount || 32} Students</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Attendance Rate:</span>
                    </span>
                    <strong className="font-bold text-emerald-700">{cls.attendanceAvg || '94%'}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Today's Slot:</span>
                    </span>
                    <strong className="font-semibold text-gray-900">{cls.todayPeriod || 'Period 3 (10:15–11:00)'}</strong>
                  </div>
                </div>

                {/* Syllabus Progress Meter */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-gold-600" />
                      <span>Syllabus Completion (Term 1)</span>
                    </span>
                    <strong className="font-bold text-[#0B2E23]">{progress}%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-forest-800 to-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">
                    6 of 8 Chapters Completed &bull; Next Unit: Trigonometry Applications
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => onSelectClass?.(cls.id)}
                  className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#0B2E23] hover:bg-[#164e3f] text-gold-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Student Roster</span>
                  <ArrowRight className="w-3 h-3 text-gold-400" />
                </button>

                <button
                  type="button"
                  onClick={() => onMarkAttendance?.(cls.id)}
                  className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Mark Attendance for this section"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mark Attendance</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
