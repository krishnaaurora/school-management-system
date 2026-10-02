import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, RefreshCw, Eye, Edit, 
  UserX, UserCheck, Key, Shield, Building2, BookOpen 
} from 'lucide-react';
import { adminApi } from '../../api';
import { TEACHERS_LIST } from '../../../../data/adminData';

export default function TeachersManagementList({ 
  onRegisterNew, 
  onViewProfile, 
  onEditTeacher, 
  onResetPassword,
  showToast 
}) {
  const [teachers, setTeachers] = useState(TEACHERS_LIST || []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTeachers({
        search: search.trim() || undefined,
        department: departmentFilter !== 'All' ? departmentFilter : undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
      });
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setTeachers(res.data);
      } else {
        // Apply client side filters on TEACHERS_LIST if backend returned empty
        let filtered = [...TEACHERS_LIST];
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          filtered = filtered.filter(t => 
            (t.name || `${t.firstName} ${t.lastName}`).toLowerCase().includes(q) ||
            (t.email || '').toLowerCase().includes(q) ||
            (t.id || '').toLowerCase().includes(q)
          );
        }
        if (departmentFilter !== 'All') {
          filtered = filtered.filter(t => t.department === departmentFilter);
        }
        if (statusFilter !== 'All') {
          filtered = filtered.filter(t => (t.status || 'ACTIVE').toUpperCase() === statusFilter.toUpperCase());
        }
        setTeachers(filtered);
      }
    } catch (err) {
      console.warn('Backend API offline, using local directory data:', err);
      let filtered = [...TEACHERS_LIST];
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(t => 
          (t.name || `${t.firstName} ${t.lastName}`).toLowerCase().includes(q) ||
          (t.email || '').toLowerCase().includes(q) ||
          (t.id || '').toLowerCase().includes(q)
        );
      }
      if (departmentFilter !== 'All') {
        filtered = filtered.filter(t => t.department === departmentFilter);
      }
      if (statusFilter !== 'All') {
        filtered = filtered.filter(t => (t.status || 'ACTIVE').toUpperCase() === statusFilter.toUpperCase());
      }
      setTeachers(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [departmentFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTeachers();
  };

  const handleToggleStatus = async (teacher) => {
    const isCurrentlyActive = (teacher.status || 'ACTIVE').toUpperCase() === 'ACTIVE';
    const newStatus = isCurrentlyActive ? 'INACTIVE' : 'ACTIVE';
    setActionLoadingId(teacher.id);

    try {
      await adminApi.updateTeacherStatus(teacher.id, newStatus);
      setTeachers((prev) =>
        prev.map((t) => (t.id === teacher.id ? { ...t, status: newStatus } : t))
      );
      if (showToast) {
        showToast(
          `Faculty ${teacher.firstName} ${teacher.lastName} is now ${newStatus === 'ACTIVE' ? 'Activated (Login Enabled)' : 'Deactivated (Login Blocked)'}`,
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
            Faculty & Teacher Accounts
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage provisioned faculty profiles, department assignments, and login permissions.
          </p>
        </div>

        <button
          onClick={onRegisterNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Register New Teacher</span>
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
            placeholder="Search by name, ID (e.g. TCH-1024), email..."
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
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F3] border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest-800"
          >
            <option value="All">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Humanities">Humanities</option>
            <option value="Languages">Languages</option>
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
            onClick={fetchTeachers}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-forest-900' : ''}`} />
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px]">
                <th className="py-3.5 px-5">Teacher</th>
                <th className="py-3.5 px-4">Employee ID</th>
                <th className="py-3.5 px-4">Department & Role</th>
                <th className="py-3.5 px-4">Subjects</th>
                <th className="py-3.5 px-3 text-center">Account Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-forest-800 mb-2" />
                    <span>Loading faculty directory...</span>
                  </td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    <Building2 className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    <p className="font-semibold text-gray-700">No faculty members found</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {search || departmentFilter !== 'All' ? 'Try adjusting your search filters.' : 'Click "Register New Teacher" to provision the first faculty account.'}
                    </p>
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => {
                  const isActive = (teacher.status || 'ACTIVE').toUpperCase() === 'ACTIVE';
                  const fullName = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.name || 'Faculty Member';
                  const subjectsList = Array.isArray(teacher.subjects) 
                    ? teacher.subjects.join(', ') 
                    : (teacher.subjects || 'General');

                  return (
                    <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest-900/10 text-forest-900 border border-forest-900/20 flex items-center justify-center font-bold text-xs">
                            {fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{fullName}</div>
                            <div className="text-[11px] text-gray-500">{teacher.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Employee ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-forest-900">
                        {teacher.employeeId || 'N/A'}
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{teacher.department || 'Academic'}</div>
                        <div className="text-[11px] text-gray-500">{teacher.designation || 'Faculty'}</div>
                      </td>

                      {/* Subjects */}
                      <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate" title={subjectsList}>
                        {subjectsList}
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
                        {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : 'Active Term'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* View Profile */}
                          <button
                            onClick={() => onViewProfile(teacher)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-forest-900 transition-colors cursor-pointer"
                            title="View Complete Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Profile */}
                          <button
                            onClick={() => onEditTeacher(teacher)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                            title="Edit Profile Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Activate / Deactivate Toggle */}
                          <button
                            onClick={() => handleToggleStatus(teacher)}
                            disabled={actionLoadingId === teacher.id}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isActive 
                                ? 'hover:bg-red-50 text-gray-500 hover:text-red-700' 
                                : 'hover:bg-emerald-50 text-gray-500 hover:text-emerald-700'
                            }`}
                            title={isActive ? 'Deactivate (Block Login)' : 'Activate (Enable Login)'}
                          >
                            {actionLoadingId === teacher.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
                            ) : isActive ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => onResetPassword(teacher)}
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
