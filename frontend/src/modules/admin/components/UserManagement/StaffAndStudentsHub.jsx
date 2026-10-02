import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, UserPlus } from 'lucide-react';
import TeachersManagementList from './TeachersManagementList';
import StudentsManagementList from './StudentsManagementList';

export default function StaffAndStudentsHub({
  defaultType = 'teachers',
  onRegisterNew,
  onViewProfile,
  onEditTeacher,
  onEditStudent,
  onResetPassword,
  showToast
}) {
  const [activeTab, setActiveTab] = useState(defaultType === 'students' ? 'students' : 'teachers');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* ── SEGMENTED DIRECTORY SWITCHER (STAFF & FACULTY VS STUDENTS) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-2xs flex items-center justify-between gap-4 max-w-xl mx-auto">
        <div className="flex items-center gap-1.5 w-full">
          <button
            type="button"
            onClick={() => setActiveTab('teachers')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'teachers'
                ? 'bg-forest-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Users className={`w-4 h-4 ${activeTab === 'teachers' ? 'text-gold-400' : 'text-gray-500'}`} />
            <span>Staff & Faculty</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              activeTab === 'teachers' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              Staff
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-forest-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'students' ? 'text-gold-400' : 'text-gray-500'}`} />
            <span>Students Directory</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              activeTab === 'students' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              Enrolled
            </span>
          </button>
        </div>
      </div>

      {/* ── ACTIVE DIRECTORY VIEW ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'teachers' ? (
          <motion.div
            key="teachers-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <TeachersManagementList
              onRegisterNew={() => onRegisterNew && onRegisterNew('teacher')}
              onViewProfile={(t) => onViewProfile && onViewProfile(t, 'TEACHER')}
              onEditTeacher={onEditTeacher}
              onResetPassword={(t) => onResetPassword && onResetPassword(t, 'TEACHER')}
              showToast={showToast}
            />
          </motion.div>
        ) : (
          <motion.div
            key="students-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <StudentsManagementList
              onRegisterNew={() => onRegisterNew && onRegisterNew('student')}
              onViewProfile={(s) => onViewProfile && onViewProfile(s, 'STUDENT')}
              onEditStudent={onEditStudent}
              onResetPassword={(s) => onResetPassword && onResetPassword(s, 'STUDENT')}
              showToast={showToast}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
