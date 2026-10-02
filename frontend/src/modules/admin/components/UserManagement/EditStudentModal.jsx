import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, AlertCircle } from 'lucide-react';
import { adminApi } from '../../api';

export default function EditStudentModal({ isOpen, onClose, student, onUpdated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    className: '10',
    section: 'A',
    rollNumber: '',
    academicYear: '2026–2027',
    guardianName: '',
    guardianRelationship: 'Father',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    status: 'ACTIVE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        phoneNumber: student.phoneNumber || '',
        address: student.address || '',
        city: student.city || 'Bangalore',
        state: student.state || 'Karnataka',
        pincode: student.pincode || '',
        className: student.className || student.class || '10',
        section: student.section || 'A',
        rollNumber: student.rollNumber || student.rollNo || '',
        academicYear: student.academicYear || '2026–2027',
        guardianName: student.guardianName || student.parentName || '',
        guardianRelationship: student.guardianRelationship || 'Father',
        guardianPhone: student.guardianPhone || student.parentPhone || '',
        guardianEmail: student.guardianEmail || '',
        guardianAddress: student.guardianAddress || student.address || '',
        status: student.status || 'ACTIVE',
      });
    }
  }, [student]);

  if (!isOpen || !student) return null;

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
        className: formData.className.trim(),
        section: formData.section.trim().toUpperCase(),
        rollNumber: formData.rollNumber.trim(),
        academicYear: formData.academicYear.trim(),
        guardianName: formData.guardianName.trim(),
        guardianRelationship: formData.guardianRelationship.trim(),
        guardianPhone: formData.guardianPhone.trim(),
        guardianEmail: formData.guardianEmail.trim(),
        guardianAddress: formData.guardianAddress.trim(),
        status: formData.status,
      };

      const res = await adminApi.updateStudent(student.id, payload);
      if (onUpdated) onUpdated(res.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update student profile');
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
                EDIT STUDENT PROFILE &bull; {student.studentId}
              </span>
              <h3 className="font-serif text-lg font-bold">
                {student.firstName} {student.lastName}
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

            {/* Read-Only Role Banner */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-gray-500 font-medium">User Role:</span>
                <span className="ml-2 font-bold text-forest-900 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                  STUDENT (System Enforced)
                </span>
              </div>
              <div className="text-gray-500 font-mono">{student.email || student.studentId}</div>
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
                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                Academic Details
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Class</label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
                  >
                    {['1','2','3','4','5','6','7','8','9','10','11','12'].map((c) => (
                      <option key={c} value={c}>Grade {c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Section</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
                  >
                    {['A', 'B', 'C', 'D'].map((s) => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                Guardian Information
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Parent/Guardian Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Relationship</label>
                  <select
                    name="guardianRelationship"
                    value={formData.guardianRelationship}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Guardian Phone</label>
                  <input
                    type="text"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Guardian Email</label>
                  <input
                    type="email"
                    name="guardianEmail"
                    value={formData.guardianEmail}
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
