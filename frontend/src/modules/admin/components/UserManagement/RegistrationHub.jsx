import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCheck, GraduationCap, Users } from 'lucide-react';
import RegisterTeacherForm from './RegisterTeacherForm';
import RegisterStudentForm from './RegisterStudentForm';

export default function RegistrationHub({ defaultType = 'teacher', onSuccess, onCancel }) {
  const [activeType, setActiveType] = useState(defaultType); // 'teacher' | 'student'

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Registration Type Segmented Switcher */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-2xs flex items-center justify-between gap-4 max-w-xl mx-auto">
        <div className="flex items-center gap-1.5 w-full">
          <button
            type="button"
            onClick={() => setActiveType('teacher')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeType === 'teacher'
                ? 'bg-forest-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <UserPlus className={`w-4 h-4 ${activeType === 'teacher' ? 'text-gold-400' : 'text-gray-500'}`} />
            <span>Register Faculty / Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveType('student')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeType === 'student'
                ? 'bg-forest-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeType === 'student' ? 'text-gold-400' : 'text-gray-500'}`} />
            <span>Register Student</span>
          </button>
        </div>
      </div>

      {/* Active Form */}
      <AnimatePresence mode="wait">
        {activeType === 'teacher' ? (
          <motion.div
            key="teacher-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <RegisterTeacherForm
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          </motion.div>
        ) : (
          <motion.div
            key="student-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <RegisterStudentForm
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
