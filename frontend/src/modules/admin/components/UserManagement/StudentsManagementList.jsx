import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, RefreshCw, Eye, Edit, 
  UserX, UserCheck, Key, GraduationCap, BookOpen 
} from 'lucide-react';
import { adminApi } from '../../api';
import { STUDENTS_LIST } from '../../../../data/adminData';

export default function StudentsManagementList({ 
  onRegisterNew, 
  onViewProfile, 
  onEditStudent, 
  onResetPassword,
  showToast 
}) {
  const [students, setStudents] = useState(STUDENTS_LIST || []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getStudents({
        search: search.trim() || undefined,
        class_name: classFilter !== 'All' ? classFilter : undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
      });
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setStudents(res.data);
      } else {
        let filtered = [...STUDENTS_LIST];
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          filtered = filtered.filter(s => 
            (s.name || `${s.firstName} ${s.lastName}`).toLowerCase().includes(q) ||
            (s.email || '').toLowerCase().includes(q) ||
            (s.id || '').toLowerCase().includes(q)
          );
        }
        if (classFilter !== 'All') {
          filtered = filtered.filter(s => s.grade === classFilter || s.class === classFilter);
        }
        if (statusFilter !== 'All') {
          filtered = filtered.filter(s => (s.status || 'ACTIVE').toUpperCase() === statusFilter.toUpperCase());
        }
        setStudents(filtered);
      }
    } catch (err) {
      console.warn('Backend API offline, using local roster data:', err);
      let filtered = [...STUDENTS_LIST];
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(s => 
          (s.name || `${s.firstName} ${s.lastName}`).toLowerCase().includes(q) ||
          (s.email || '').toLowerCase().includes(q) ||
          (s.id || '').toLowerCase().includes(q)
        );
      }
      if (classFilter !== 'All') {
        filtered = filtered.filter(s => s.grade === classFilter || s.class === classFilter);
      }
      if (statusFilter !== 'All') {
        filtered = filtered.filter(s => (s.status || 'ACTIVE').toUpperCase() === statusFilter.toUpperCase());
      }
      setStudents(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleToggleStatus = async (student) => {
    const isCurrentlyActive = (student.status || 'ACTIVE').toUpperCase() === 'ACTIVE';
    const newStatus = isCurrentlyActive ? 'INACTIVE' : 'ACTIVE';
    setActionLoadingId(student.id);

    try {
      await adminApi.updateStudentStatus(student.id, newStatus);
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? { ...s, status: newStatus } : s))
      );
      if (showToast) {
        showToast(
          `Student ${student.firstName} ${student.lastName} is now ${newStatus === 'ACTIVE' ? 'Activated (Login Enabled)' : 'Deactivated (Login Blocked)'}`,
          newStatus === 'ACTIVE' ? 'success' : 'error'
        );
      }
    } catch (err) {
      if (showToast) showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0B2E23]">
            Student Accounts & Roster
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage student registrations, academic class assignments, and individual portal access.
          </p>
        </div>

        <button
          onClick={onRegisterNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID (e.g. STU-2026-001), email..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F3] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-800"
          />
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-gold-600" />
            <span>Filters:</span>
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F3] border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest-800"
          >
            <option value="All">All Grades</option>
            {['1','2','3','4','5','6','7','8','9','10','11','12'].map((c) => (
              <option key={c} value={c}>Grade {c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F3] border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest-800"
          >
            <option value="All">All Account Statuses</option>
            <option value="ACTIVE">Active (Can Login)</option>
            <option value="INACTIVE">Inactive (Blocked)</option>
          </select>

          <button
            onClick={fetchStudents}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-forest-900' : ''}`} />
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px]">
                <th className="py-3.5 px-5">Student Name</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Guardian Contact</th>
                <th className="py-3.5 px-3 text-center">Account Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-forest-800 mb-2" />
                    <span>Loading student roster...</span>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    <GraduationCap className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    <p className="font-semibold text-gray-700">No students found</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {search || classFilter !== 'All' ? 'Try adjusting your search filters.' : 'Click "Register New Student" to enroll the first student account.'}
                    </p>
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const isActive = (student.status || 'ACTIVE').toUpperCase() === 'ACTIVE';
                  const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.name || 'Enrolled Student';
                  const classSection = `Grade ${student.className || student.classId || '10'} - ${student.section || 'A'}`;

                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest-900/10 text-forest-900 border border-forest-900/20 flex items-center justify-center font-bold text-xs">
                            {fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{fullName}</div>
                            <div className="text-[11px] text-gray-500">{student.email || `${student.studentId?.toLowerCase()}@greenfieldis.edu`}</div>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-forest-900">
                        {student.studentId || 'N/A'}
                      </td>

                      {/* Class & Section */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-forest-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          {classSection}
                        </span>
                      </td>

                      {/* Roll Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-700">
                        {student.rollNumber || student.rollNo || 'N/A'}
                      </td>

                      {/* Guardian */}
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="font-semibold text-gray-900">{student.guardianName || student.parentName || 'Parent'}</div>
                        <div className="text-[11px] text-gray-500">{student.guardianPhone || student.parentPhone || 'N/A'}</div>
                      </td>

                      {/* Account Status Badge */}
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                        {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Active Term'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* View Profile */}
                          <button
                            onClick={() => onViewProfile(student)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-forest-900 transition-colors cursor-pointer"
                            title="View Complete Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Profile */}
                          <button
                            onClick={() => onEditStudent(student)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                            title="Edit Profile Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Activate / Deactivate Toggle */}
                          <button
                            onClick={() => handleToggleStatus(student)}
                            disabled={actionLoadingId === student.id}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isActive 
                                ? 'hover:bg-red-50 text-gray-500 hover:text-red-700' 
                                : 'hover:bg-emerald-50 text-gray-500 hover:text-emerald-700'
                            }`}
                            title={isActive ? 'Deactivate (Block Login)' : 'Activate (Enable Login)'}
                          >
                            {actionLoadingId === student.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
                            ) : isActive ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => onResetPassword(student)}
                            className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-500 hover:text-amber-700 transition-colors cursor-pointer"
                            title="Reset Temporary Password"
                          >
                            <Key className="w-4 h-4" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
