import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';
import { adminApi } from '../../api';

export default function EditTeacherModal({ isOpen, onClose, teacher, onUpdated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    qualification: '',
    specialization: '',
    experience: '',
    department: '',
    designation: '',
    subjects: '',
    assignedClasses: '',
    assignedSections: '',
    workingHours: '',
    employmentStatus: 'Full-time',
    status: 'ACTIVE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName || '',
        lastName: teacher.lastName || '',
        phoneNumber: teacher.phoneNumber || '',
        address: teacher.address || '',
        city: teacher.city || 'Bangalore',
        state: teacher.state || 'Karnataka',
        pincode: teacher.pincode || '',
        qualification: teacher.qualification || '',
        specialization: teacher.specialization || '',
        experience: teacher.experience || '',
        department: teacher.department || 'Mathematics',
        designation: teacher.designation || 'Senior Faculty',
        subjects: Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : (teacher.subjects || ''),
        assignedClasses: Array.isArray(teacher.assignedClasses) ? teacher.assignedClasses.join(', ') : (teacher.assignedClasses || ''),
        assignedSections: Array.isArray(teacher.assignedSections) ? teacher.assignedSections.join(', ') : (teacher.assignedSections || ''),
        workingHours: teacher.workingHours || '08:00 AM - 03:30 PM',
        employmentStatus: teacher.employmentStatus || 'Full-time',
        status: teacher.status || 'ACTIVE',
      });
    }
  }, [teacher]);

  if (!isOpen || !teacher) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        qualification: formData.qualification.trim(),
        specialization: formData.specialization.trim(),
        experience: formData.experience.trim(),
        department: formData.department.trim(),
        designation: formData.designation.trim(),
        subjects: formData.subjects.split(',').map((s) => s.trim()).filter(Boolean),
        assignedClasses: formData.assignedClasses.split(',').map((c) => c.trim()).filter(Boolean),
        assignedSections: formData.assignedSections.split(',').map((s) => s.trim()).filter(Boolean),
        workingHours: formData.workingHours.trim(),
        employmentStatus: formData.employmentStatus,
        status: formData.status,
      };

      const res = await adminApi.updateTeacher(teacher.id, payload);
      if (onUpdated) onUpdated(res.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update teacher profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-[#0B2E23] p-5 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                EDIT FACULTY PROFILE &bull; {teacher.employeeId}
              </span>
              <h3 className="font-serif text-lg font-bold">
                {teacher.firstName} {teacher.lastName}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Read-Only Role & Email Banner */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-gray-500 font-medium">User Role:</span>
                <span className="ml-2 font-bold text-forest-900 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                  TEACHER (System Enforced)
                </span>
              </div>
              <div className="text-gray-500 font-mono">{teacher.email}</div>
            </div>

            {/* Personal Details */}
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Account Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Login Allowed)</option>
                    <option value="INACTIVE">INACTIVE (Login Blocked)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                Professional & Department
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white font-semibold"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Languages">Languages</option>
                    <option value="Physical Education">Physical Education</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Employment Status</label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Visiting">Visiting</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Subjects (Comma separated)</label>
                  <input
                    type="text"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>
            </div>

            {/* School Details */}
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                Classes & Working Hours
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assigned Classes</label>
                  <input
                    type="text"
                    name="assignedClasses"
                    value={formData.assignedClasses}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Working Hours</label>
                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin text-gold-400" /> : <Save className="w-4 h-4 text-gold-400" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
