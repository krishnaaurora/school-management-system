import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, Check, X, Clock, Users, CheckCircle2, 
  Sparkles, Save, RefreshCw, Calendar, ArrowRight, UserCheck 
} from 'lucide-react';

export default function MarkAttendance({ 
  profile, 
  studentsRoster = {}, 
  selectedClassId = '10-A', 
  onSelectClass,
  onUpdateAttendance,
  onBulkUpdateAttendance,
  onSaveSuccess
}) {
  const [currentClassId, setCurrentClassId] = useState(selectedClassId || '10-A');
  const [selectedPeriod, setSelectedPeriod] = useState('Period 3 (10:15 - 11:00)');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [saving, setSaving] = useState(false);

  const assignedClasses = profile?.assignedClasses || [
    { id: "10-A", name: "Grade 10-A" },
    { id: "9-B", name: "Grade 9-B" },
    { id: "8-A", name: "Grade 8-A" },
    { id: "9-A", name: "Grade 9-A" }
  ];

  const roster = studentsRoster[currentClassId] || studentsRoster['10-A'] || [];

  const presentCount = roster.filter(s => s.status === 'Present').length;
  const absentCount = roster.filter(s => s.status === 'Absent').length;
  const lateCount = roster.filter(s => s.status === 'Late').length;
  const attendancePercentage = roster.length > 0 ? Math.round((presentCount / roster.length) * 100) : 100;

  const handleToggle = (studentId, newStatus) => {
    onUpdateAttendance(currentClassId, studentId, newStatus);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      if (onSaveSuccess) onSaveSuccess();
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-forest-900 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
              Daily Attendance Register
            </span>
            <span className="text-xs text-emerald-700 font-bold">
              ● Live Roster Session
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
            Mark Attendance &mdash; Grade {currentClassId}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Subject: <strong>{profile?.subject || 'Mathematics'}</strong> &bull; Period: {selectedPeriod}
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2E23] to-[#164e3f] text-gold-300 font-bold text-xs flex items-center gap-2 shadow-md hover:from-[#164e3f] hover:to-[#0B2E23] transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
              <span>Saving Register...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-gold-400" />
              <span>Save & Publish Attendance</span>
            </>
          )}
        </button>
      </div>

      {/* Control Bar & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Select Class Section
          </label>
          <select
            value={currentClassId}
            onChange={(e) => {
              setCurrentClassId(e.target.value);
              if (onSelectClass) onSelectClass(e.target.value);
            }}
            className="w-full bg-[#FAF8F3] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-forest-800 outline-none"
          >
            {assignedClasses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name || `Grade ${c.id}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Class Period / Timing
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full bg-[#FAF8F3] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-forest-800 outline-none"
          >
            <option value="Period 1 (08:30 - 09:15)">Period 1 (08:30 - 09:15)</option>
            <option value="Period 2 (09:15 - 10:00)">Period 2 (09:15 - 10:00)</option>
            <option value="Period 3 (10:15 - 11:00)">Period 3 (10:15 - 11:00)</option>
            <option value="Period 4 (11:00 - 11:45)">Period 4 (11:00 - 11:45)</option>
            <option value="Period 5 (12:30 - 01:15)">Period 5 (12:30 - 01:15)</option>
            <option value="Period 6 (01:15 - 02:00)">Period 6 (01:15 - 02:00)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Attendance Date
          </label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full bg-[#FAF8F3] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-forest-800 outline-none"
          />
        </div>
      </div>

      {/* Summary Metrics & Bulk Action Bar */}
      <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span>Present: <strong className="text-emerald-800 font-bold">{presentCount}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span>Absent: <strong className="text-rose-800 font-bold">{absentCount}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span>Late: <strong className="text-amber-800 font-bold">{lateCount}</strong></span>
          </div>
          <div className="text-gray-500 font-medium">
            Attendance Rate: <strong className="text-forest-900 font-bold">{attendancePercentage}%</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onBulkUpdateAttendance(currentClassId, 'Present')}
            className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            Mark All Present
          </button>
        </div>
      </div>

      {/* Roster Register Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Roll No</th>
                <th className="py-3.5 px-4 font-bold">Student Name</th>
                <th className="py-3.5 px-4 font-bold">Guardian Contact</th>
                <th className="py-3.5 px-4 text-center font-bold">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {roster.map((student) => {
                const status = student.status || 'Present';

                return (
                  <tr key={student.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                      {student.rollNo}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {student.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                      {student.contact}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex rounded-xl p-1 bg-[#FAF8F3] border border-gray-200">
                        <button
                          type="button"
                          onClick={() => handleToggle(student.id, 'Present')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            status === 'Present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-600 hover:text-emerald-700'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(student.id, 'Late')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            status === 'Late'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-gray-600 hover:text-amber-700'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(student.id, 'Absent')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            status === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-600 hover:text-rose-700'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
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
