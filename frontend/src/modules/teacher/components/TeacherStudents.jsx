import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Phone, Award, ShieldCheck, ArrowRight, UserCheck, X } from 'lucide-react';

export default function TeacherStudents({ 
  classes, 
  studentsRoster, 
  selectedClassId = '10-A' 
}) {
  const [currentClassId, setCurrentClassId] = useState(selectedClassId || '10-A');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const roster = studentsRoster[currentClassId] || [];

  const filtered = roster.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-800/15">
              Class Student Roster
            </span>
            <span className="text-xs text-gray-500 font-mono">
              Teacher View (Academic Info Only)
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            {currentClassId} &mdash; Mathematics
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {roster.length} Active Students &bull; Academic Year 2026&ndash;27
          </p>
        </div>

        {/* Section Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-charcoal-700">Select Section:</label>
          <select
            value={currentClassId}
            onChange={(e) => setCurrentClassId(e.target.value)}
            className="text-xs font-semibold bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-800 cursor-pointer"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.subject})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200/90 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
          />
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing {filtered.length} of {roster.length} students
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-forest-900 text-white uppercase text-[10.5px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Roll No</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Attendance</th>
                <th className="py-3 px-4 font-semibold">Recent Math Grade</th>
                <th className="py-3 px-4 font-semibold">Guardian / Contact</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-gray-500">
                    {student.rollNo}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-forest-950">
                    {student.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                    {student.attendance}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-bold text-[11px] border border-purple-200">
                      {student.recentGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{student.guardian}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{student.contact}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-900 font-semibold text-[11px] border border-forest-800/15 transition-colors cursor-pointer"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-50 border border-forest-800/20 flex items-center justify-center text-forest-900 font-bold font-serif">
                    {selectedStudent.name[0]}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest-900">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">
                      {selectedStudent.rollNo} &bull; Class {currentClassId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs bg-[#F8F5EF] p-4 rounded-xl border border-gray-200 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Attendance Rate:</span>
                  <strong className="text-emerald-700 font-mono">{selectedStudent.attendance}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mathematics Performance:</span>
                  <strong className="text-purple-700">{selectedStudent.recentGrade} (Grade Point: 4.0)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Parent/Guardian:</span>
                  <strong className="text-charcoal-900">{selectedStudent.guardian}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Emergency Phone:</span>
                  <strong className="font-mono text-forest-800">{selectedStudent.contact}</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 mb-4">
                <strong>Teacher Remark:</strong> Consistent engagement in problem solving. Submitted all assignments on time.
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
