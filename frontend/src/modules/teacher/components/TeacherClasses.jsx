import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export default function TeacherClasses({ 
  classes, 
  onSelectClass 
}) {
  return (
    <div className="space-y-5">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-900">
            My Assigned Classes
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Teaching load: 4 sections &bull; 125 total students &bull; Mathematics Department
          </p>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-serif font-bold text-forest-900">
                  {cls.name} &mdash; {cls.subject}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-forest-50 text-forest-800 text-[10px] font-bold border border-forest-800/15">
                  Room {cls.room}
                </span>
              </div>

              {/* Class Metrics */}
              <div className="space-y-2 text-xs text-charcoal-700 bg-[#F8F5EF] p-3 rounded-xl border border-gray-200/80 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-forest-700" />
                    <span>Total Students:</span>
                  </span>
                  <strong className="font-semibold text-charcoal-900">{cls.studentsCount} Students</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Average Attendance:</span>
                  </span>
                  <strong className="font-semibold text-emerald-700">{cls.attendanceAvg}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Today's Class:</span>
                  </span>
                  <strong className="font-semibold text-charcoal-900">{cls.todayPeriod}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => onSelectClass?.(cls.id, 'students')}
                className="flex-1 py-2 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>View Students</span>
                <ArrowRight className="w-3 h-3 text-gold-400" />
              </button>

              <button
                onClick={() => onSelectClass?.(cls.id, 'attendance')}
                className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-800/20 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Mark Attendance for this section"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Attendance</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
