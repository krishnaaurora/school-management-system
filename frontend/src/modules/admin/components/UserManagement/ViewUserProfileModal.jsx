import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, UserCheck, GraduationCap, Mail, Phone, MapPin, 
  Briefcase, Calendar, BookOpen, Shield, Key, Copy, Check, Eye, EyeOff, Lock
} from 'lucide-react';

export default function ViewUserProfileModal({ isOpen, onClose, user, role = 'TEACHER', onResetPassword, onEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !user) return null;

  const isTeacher = role.toUpperCase() === 'TEACHER';
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'N/A';
  const idValue = user.employeeId || user.studentId || user.id || 'N/A';
  const isActive = (user.status || 'ACTIVE').toUpperCase() === 'ACTIVE';

  // Auto-calculated initial password formula based on:
  // Teacher: [FirstName] + [first 4 letters of LastName] + gis[Year of Joining]
  // Student: [FirstName] + [first 4 letters of LastName] + [Academic Year]
  const firstNameClean = (user.firstName || (user.name ? user.name.split(' ')[0] : '')).trim();
  const lastNameClean = (user.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : '')).trim();
  const first4Last = lastNameClean.slice(0, 4);

  let calculatedInitialPassword = '';
  let passwordFormulaNote = '';

  if (isTeacher) {
    let joiningYear = '2026';
    const joinDate = user.joiningDate || user.createdAt;
    if (joinDate) {
      const parsedYear = new Date(joinDate).getFullYear();
      if (!isNaN(parsedYear) && parsedYear > 1900) {
        joiningYear = String(parsedYear);
      } else if (typeof joinDate === 'string' && joinDate.match(/\d{4}/)) {
        joiningYear = joinDate.match(/\d{4}/)[0];
      }
    }
    calculatedInitialPassword = firstNameClean 
      ? `${firstNameClean}${first4Last}gis${joiningYear}`
      : 'Teachergis2026';
    passwordFormulaNote = 'Formula: [FirstName] + [first 4 letters of LastName] + gis[Year of Joining]';
  } else {
    let acadYear = '2026';
    const rawAcad = user.academicYear || user.admissionYear || user.admissionDate;
    if (rawAcad) {
      const match = String(rawAcad).match(/\d{4}/);
      if (match) {
        acadYear = match[0];
      }
    }
    calculatedInitialPassword = firstNameClean 
      ? `${firstNameClean}${first4Last}${acadYear}`
      : 'Student2026';
    passwordFormulaNote = 'Formula: [FirstName] + [first 4 letters of LastName] + [Academic Year]';
  }

  const institutionalEmail = user.email || (
    firstNameClean && lastNameClean 
      ? `${firstNameClean.toLowerCase().replace(/[^a-z0-9]/g, '')}.${lastNameClean.toLowerCase().replace(/[^a-z0-9]/g, '')}@gisedu.in`
      : 'N/A'
  );

  const handleCopy = (fieldName, text) => {
    if (!text || text === 'N/A') return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200"
        >
          {/* Top Header */}
          <div className="bg-gradient-to-r from-[#0B2E23] to-[#154B3B] p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-gold-400 font-serif font-bold text-xl shadow-inner">
                {isTeacher ? <UserCheck className="w-7 h-7" /> : <GraduationCap className="w-7 h-7" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400 bg-gold-400/20 px-2 py-0.5 rounded-full border border-gold-400/30">
                    {role} PROFILE
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-red-500/20 text-red-300 border border-red-400/30'
                  }`}>
                    {isActive ? '● ACTIVE' : '○ INACTIVE'}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold">{fullName}</h3>
                <p className="text-xs text-emerald-100/70 font-mono">ID: {idValue}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Details Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            
            {/* ── 1. ACCOUNT CREDENTIALS & SECURITY CARD (AUTO-GENERATED CRITERIA) ── */}
            <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F3EEE2] border border-[#C5A880]/50 rounded-2xl p-4.5 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#C5A880]/30">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-forest-900" />
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                    Account Credentials & Security
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300/60">
                  Auto-Provisioned Credentials
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Institutional Login Email */}
                <div className="bg-white p-3 rounded-xl border border-[#C5A880]/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase">Institutional Login Email</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('email', institutionalEmail)}
                      className="text-forest-800 hover:text-forest-950 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono font-bold text-xs text-forest-950 truncate select-all">
                    {institutionalEmail}
                  </p>
                  <p className="text-[10px] text-gray-400">Formula: [firstname].[lastname]@gisedu.in</p>
                </div>

                {/* Initial Generated Password */}
                <div className="bg-white p-3 rounded-xl border border-[#C5A880]/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase">Initial Generated Password</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy('password', calculatedInitialPassword)}
                        className="text-forest-800 hover:text-forest-950 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                        title="Copy Password"
                      >
                        {copiedField === 'password' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="font-mono font-bold text-xs text-forest-950 tracking-wider">
                    {showPassword ? calculatedInitialPassword : '••••••••••••'}
                  </p>
                  <p className="text-[10px] text-gray-400">{passwordFormulaNote}</p>
                </div>

                {/* Personal Email */}
                {user.personalEmail && (
                  <div className="bg-white p-3 rounded-xl border border-gray-200 sm:col-span-2">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase block">Registered Personal Email</span>
                    <span className="font-medium text-gray-800">{user.personalEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ── 2. CONTACT INFORMATION ── */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-forest-800 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Phone</span>
                  <span className="font-semibold text-gray-900">{user.phoneNumber || user.parentPhone || user.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-forest-800 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Date of Birth / Joining</span>
                  <span className="font-semibold text-gray-900">{user.dateOfBirth || user.joiningDate || user.admissionDate || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 sm:col-span-2">
                <MapPin className="w-4 h-4 text-forest-800 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Residential Address</span>
                  <span className="font-medium text-gray-800">
                    {user.address ? `${user.address}, ${user.city || ''}, ${user.state || ''} ${user.pincode || ''}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 3. TEACHER SPECIFIC DETAILS ── */}
            {isTeacher && (
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200">
                  Academic & Department Details
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Department</span>
                    <span className="font-bold text-forest-900">{user.department || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Designation</span>
                    <span className="font-bold text-gray-900">{user.designation || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Qualification</span>
                    <span className="font-bold text-gray-900">{user.qualification || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Specialization</span>
                    <span className="font-bold text-gray-900">{user.specialization || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Experience</span>
                    <span className="font-bold text-gray-900">{user.experience || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Employment</span>
                    <span className="font-bold text-emerald-800">{user.employmentStatus || 'Full-time'}</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold block">Subjects Taught</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(Array.isArray(user.subjects) ? user.subjects : (user.subjects || 'General').split(',')).map((subj, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-forest-900 font-semibold text-[11px]">
                        {subj.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold block">Assigned Classes</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(Array.isArray(user.assignedClasses) ? user.assignedClasses : (user.assignedClasses || user.classes || 'N/A').split(',')).map((cls, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                        {cls.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── 4. STUDENT SPECIFIC DETAILS ── */}
            {!isTeacher && (
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200">
                  Academic & Enrollment Information
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Grade / Class</span>
                    <span className="font-bold text-forest-900 text-sm">Grade {user.className || user.classId || user.grade || '10'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Section</span>
                    <span className="font-bold text-forest-900 text-sm">{user.section || 'A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Roll Number</span>
                    <span className="font-mono font-bold text-gray-900 text-sm">{user.rollNumber || user.rollNo || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Academic Year</span>
                    <span className="font-bold text-gray-900">{user.academicYear || '2026–2027'}</span>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-1 border-b border-gray-200 pt-2">
                  Guardian Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Guardian Name</span>
                    <span className="font-bold text-gray-900">{user.guardianName || user.parentName || 'N/A'} ({user.guardianRelationship || 'Guardian'})</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Guardian Contact</span>
                    <span className="font-bold text-gray-900">{user.guardianPhone || user.parentPhone || 'N/A'}</span>
                  </div>
                  {user.guardianEmail && (
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 col-span-2">
                      <span className="text-[10px] text-gray-500 uppercase font-semibold block">Guardian Email</span>
                      <span className="font-medium text-gray-900">{user.guardianEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Audit Information */}
            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
              <span>Account Status: {isActive ? 'Active Login Enabled' : 'Deactivated'}</span>
              <span>Security: Standard Protected Profile</span>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onResetPassword) onResetPassword(user);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-700" />
              <span>Reset Password</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onEdit) onEdit(user);
                }}
                className="px-5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
