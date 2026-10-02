import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Phone, Award, ShieldCheck, ArrowRight, UserCheck, X, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function TeacherStudents({ 
  profile, 
  studentsRoster = {}, 
  selectedClassId = '10-A',
  onSelectClass,
  onMessageParent
}) {
  const [currentClassId, setCurrentClassId] = useState(selectedClassId || '10-A');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const assignedClasses = profile?.assignedClasses || [
    { id: "10-A", name: "Grade 10-A" },
    { id: "9-B", name: "Grade 9-B" },
    { id: "8-A", name: "Grade 8-A" },
    { id: "9-A", name: "Grade 9-A" }
  ];

  const roster = studentsRoster[currentClassId] || studentsRoster['10-A'] || [];

  const filtered = roster.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-forest-900 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
              Student Directory & Mentorship
            </span>
            <span className="text-xs text-gray-500 font-mono">
              Academic Roster
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
            Grade {currentClassId} &mdash; {profile?.subject || 'Mathematics'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {roster.length} Enrolled Students &bull; Term 1 Academic Performance Track
          </p>
        </div>

        {/* Section Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-700">Select Section:</label>
          <select
            value={currentClassId}
            onChange={(e) => {
              setCurrentClassId(e.target.value);
              if (onSelectClass) onSelectClass(e.target.value);
            }}
            className="text-xs font-bold bg-[#FAF8F3] border border-gray-300 rounded-xl px-3.5 py-2 text-gray-900 focus:ring-2 focus:ring-forest-800 outline-none cursor-pointer shadow-2xs"
          >
            {assignedClasses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name || `Grade ${c.id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F3] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 font-medium"
          />
        </div>

        <div className="text-xs text-gray-500 font-semibold flex items-center gap-3">
          <span>Showing <strong>{filtered.length}</strong> of {roster.length} students</span>
          <span className="text-gray-300">|</span>
          <span className="text-emerald-700 font-bold">Avg GPA: 3.82</span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Roll No</th>
                <th className="py-3.5 px-4 font-bold">Student Name</th>
                <th className="py-3.5 px-4 font-bold">Attendance</th>
                <th className="py-3.5 px-4 font-bold">Recent Grade</th>
                <th className="py-3.5 px-4 font-bold">Guardian & Contact</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                    {student.rollNo}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {student.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[11px] ${
                      parseInt(student.attendance) >= 90 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {student.attendance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-forest-50 text-forest-900 border border-forest-200 font-bold text-xs">
                      {student.recentGrade || 'A+'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div>
                      <span className="font-semibold text-gray-900 block">{student.guardian}</span>
                      <span className="text-[11px] text-gray-500 font-mono">{student.contact}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-forest-100 text-gray-700 hover:text-forest-900 font-semibold text-xs transition-colors"
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => onMessageParent?.(student)}
                        className="px-2.5 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                        title="Send Advisory Note to Parent"
                      >
                        <MessageSquare className="w-3 h-3 text-gold-400" />
                        <span>Advisory</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Quick Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0B2E23] text-gold-400 flex items-center justify-center font-bold text-xs">
                    {selectedStudent.rollNo}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-xs text-gray-500">Grade {currentClassId} &bull; Roll: {selectedStudent.rollNo}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Attendance Record:</span>
                    <strong className="text-emerald-700">{selectedStudent.attendance}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mathematics Performance:</span>
                    <strong className="text-forest-900">{selectedStudent.recentGrade || 'A+'} (Exemplary)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guardian Name:</span>
                    <strong className="text-gray-900">{selectedStudent.guardian}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Parent Phone:</span>
                    <strong className="text-gray-900 font-mono">{selectedStudent.contact}</strong>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      onMessageParent?.(selectedStudent);
                      setSelectedStudent(null);
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#0B2E23] text-gold-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Send Parent Advisory
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
