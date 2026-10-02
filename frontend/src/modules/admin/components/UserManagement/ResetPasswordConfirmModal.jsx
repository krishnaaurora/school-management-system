import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, AlertTriangle, RefreshCw, X, ShieldAlert } from 'lucide-react';
import { adminApi } from '../../api';

export default function ResetPasswordConfirmModal({
  isOpen,
  onClose,
  targetUser,
  role = 'TEACHER',
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !targetUser) return null;

  const isTeacher = role.toUpperCase() === 'TEACHER';
  const roleName = isTeacher ? 'Teacher' : 'Student';
  const userName = targetUser.firstName 
    ? `${targetUser.firstName} ${targetUser.lastName}` 
    : targetUser.name || 'User';
  const idValue = targetUser.employeeId || targetUser.studentId || targetUser.id;

  const handleReset = async () => {
    setLoading(true);
    setError('');

    try {
      let res;
      if (isTeacher) {
        res = await adminApi.resetTeacherPassword(targetUser.id);
      } else {
        res = await adminApi.resetStudentPassword(targetUser.id);
      }

      if (res && res.data) {
        onSuccess({
          ...targetUser,
          fullName: userName,
          role: role.toUpperCase(),
          temporaryPassword: res.data.temporaryPassword,
        });
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
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
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base">Reset Account Password</h3>
                <p className="text-[11px] text-amber-100">Provision a new temporary credential</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                {error}
              </div>
            )}

            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Account:</span>
                <span className="font-bold text-gray-900">{userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ID:</span>
                <span className="font-mono font-bold text-forest-900">{idValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Role:</span>
                <span className="font-bold text-emerald-800">{roleName}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Resetting will immediately invalidate the current password and generate a new cryptographically strong temporary password.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                <span>Generate New Password</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
