import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, X, Clock, Search, CheckCircle2, UserCheck, 
  Save, AlertCircle, Sparkles, Filter 
} from 'lucide-react';

export default function MarkAttendance({ 
  classes, 
  studentsRoster, 
  selectedClassId = '10-A', 
  onSaveAttendance 
}) {
  const [currentClassId, setCurrentClassId] = useState(selectedClassId || '10-A');
  const [selectedPeriod, setSelectedPeriod] = useState('Period 3 (10:15–11:00)');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local student attendance state for immediate interaction
  const [roster, setRoster] = useState(studentsRoster[currentClassId] || []);

  const handleClassChange = (newClassId) => {
    setCurrentClassId(newClassId);
    setRoster(studentsRoster[newClassId] || []);
    setSavedSuccess(false);
  };

  const handleStatusChange = (studentId, status) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
    setSavedSuccess(false);
  };

  const handleSelectAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, status: 'Present' })));
    setSavedSuccess(false);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    onSaveAttendance?.(currentClassId, roster);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  const filteredStudents = roster.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = roster.filter((s) => s.status === 'Present').length;
  const absentCount = roster.filter((s) => s.status === 'Absent').length;
  const lateCount = roster.filter((s) => s.status === 'Late').length;

  return (
    <div className="space-y-5">
      
      {/* Top Header Controls */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-800/15">
              Live Attendance Register
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            {currentClassId} &mdash; Mathematics
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {selectedPeriod} &bull; {roster.length} Students Enrolled
          </p>
        </div>

        {/* Section Picker */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold text-charcoal-700">Class Section:</label>
          <select
            value={currentClassId}
            onChange={(e) => handleClassChange(e.target.value)}
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

      {/* Attendance Stats & Search Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200/90 shadow-2xs">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or roll no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-800"
          />
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
            Present: {presentCount}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 font-semibold border border-rose-200">
            Absent: {absentCount}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">
            Late: {lateCount}
          </span>

          <button
            onClick={handleSelectAllPresent}
            className="text-[11px] font-bold text-forest-900 hover:text-forest-950 underline px-2 py-1 cursor-pointer"
          >
            ☑ Mark All Present
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>✓ Attendance successfully recorded for {currentClassId} ({selectedPeriod}). Backend synchronization complete.</span>
          </div>
          <span className="text-[10.5px] text-emerald-700 font-mono">Sync: OK</span>
        </motion.div>
      )}

      {/* Student Roster Attendance Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-forest-900 text-white uppercase text-[10.5px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Roll No</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Avg Attendance</th>
                <th className="py-3 px-4 font-semibold text-center">Status Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                const isPresent = student.status === 'Present';
                const isAbsent = student.status === 'Absent';
                const isLate = student.status === 'Late';

                return (
                  <tr key={student.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-gray-500">
                      {student.rollNo}
                    </td>

                    <td className="py-3 px-4 font-semibold text-charcoal-900">
                      {student.name}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block font-mono font-medium text-forest-800">
                        {student.attendance}
                      </span>
                    </td>

                    {/* Quick 1-Click Status Toggles */}
                    <td className="py-2.5 px-4 text-center">
                      <div className="inline-flex items-center bg-gray-100 p-1 rounded-xl gap-1 border border-gray-200">
                        <button
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isPresent
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          Present
                        </button>

                        <button
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isAbsent
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-600 hover:text-rose-700 hover:bg-rose-50'
                          }`}
                        >
                          Absent
                        </button>

                        <button
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isLate
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer with Save Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Records automatically saved to student SIS portal and teacher daily report.
          </p>

          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-gold-400" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

    </div>
  );
}
