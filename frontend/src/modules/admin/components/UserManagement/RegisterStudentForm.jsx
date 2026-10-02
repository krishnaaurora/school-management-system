import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Users2, Key, AlertCircle, 
  CheckCircle2, RefreshCw, UserPlus, Eye, EyeOff, Mail, Shield 
} from 'lucide-react';
import { adminApi } from '../../api';

export default function RegisterStudentForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    // 1. Student Personal
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    phoneNumber: '',
    personalEmail: '', // Optional personal email
    email: '', // Auto-created @gisedu.in login email
    address: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '',

    // 2. Academic Details
    studentId: '',
    admissionDate: new Date().toISOString().split('T')[0],
    className: '10',
    section: 'A',
    rollNumber: '',
    academicYear: '2026–2027',

    // 3. Guardian Details
    guardianName: '',
    guardianRelationship: 'Father',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',

    // 4. Account Details
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Helper to compute institutional email and password from student first & last name and academic year
  const computeCredentials = (first, last, acadYear) => {
    const cleanFirst = (first || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanLast = (last || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Auto institutional email with @gisedu.in
    const autoEmail = cleanFirst && cleanLast 
      ? `${cleanFirst}.${cleanLast}@gisedu.in`
      : cleanFirst 
        ? `${cleanFirst}@gisedu.in` 
        : '';

    // Auto password: [FirstName] + [first 4 letters of LastName] + [academic year]
    const trimmedFirst = (first || '').trim();
    const trimmedLast = (last || '').trim();
    const first4Last = trimmedLast.slice(0, 4);

    let yearSuffix = '2026';
    const aYear = acadYear || '2026-2027';
    if (aYear) {
      const match = String(aYear).match(/\d{4}/);
      if (match) {
        yearSuffix = match[0];
      }
    }

    const autoPassword = trimmedFirst ? `${trimmedFirst}${first4Last}${yearSuffix}` : '';

    return { autoEmail, autoPassword };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // When First Name, Last Name, or Academic Year changes, auto update institutional email and password
      if (name === 'firstName' || name === 'lastName' || name === 'academicYear') {
        const newFirst = name === 'firstName' ? value : prev.firstName;
        const newLast = name === 'lastName' ? value : prev.lastName;
        const newAcad = name === 'academicYear' ? value : prev.academicYear;
        const { autoEmail, autoPassword } = computeCredentials(newFirst, newLast, newAcad);

        updated.email = autoEmail;
        updated.username = autoEmail;
        updated.password = autoPassword;
        updated.confirmPassword = autoPassword;
      }

      return updated;
    });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';

    if (!formData.studentId.trim()) errors.studentId = 'Student ID / Admission Number is required';
    if (!formData.className.trim()) errors.className = 'Class is required';
    if (!formData.section.trim()) errors.section = 'Section is required';
    if (!formData.rollNumber.trim()) errors.rollNumber = 'Roll Number is required';

    if (!formData.guardianName.trim()) errors.guardianName = 'Guardian Name is required';
    if (!formData.guardianPhone.trim()) errors.guardianPhone = 'Guardian Phone is required';

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid institutional email (@gisedu.in) is required';
    }

    if (!formData.password || formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage('Please correct the highlighted errors in the form.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber.trim(),
        personalEmail: formData.personalEmail.trim().toLowerCase() || undefined,
        email: formData.email.trim().toLowerCase(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),

        studentId: formData.studentId.trim().toUpperCase(),
        admissionNumber: formData.studentId.trim().toUpperCase(),
        admissionDate: formData.admissionDate,
        className: formData.className.trim(),
        section: formData.section.trim().toUpperCase(),
        rollNumber: parseInt(formData.rollNumber.trim(), 10) || 1,
        academicYear: formData.academicYear.trim(),

        guardianName: formData.guardianName.trim(),
        guardianRelationship: formData.guardianRelationship.trim(),
        relationship: formData.guardianRelationship.trim(),
        guardianPhone: formData.guardianPhone.trim(),
        guardianEmail: formData.guardianEmail.trim().toLowerCase(),
        guardianAddress: (formData.guardianAddress.trim() || formData.address.trim()),

        username: (formData.username.trim() || formData.email.trim()).toLowerCase(),
        initialPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const res = await adminApi.createStudent(payload);

      if (res && res.data) {
        onSuccess({
          ...res.data,
          role: 'STUDENT',
          temporaryPassword: formData.password,
        });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to register student. Please verify details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs animate-in fade-in duration-200">
      
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#0B2E23] to-[#1A5340] p-6 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400 bg-gold-400/15 px-2.5 py-0.5 rounded-full border border-gold-400/30">
              ROLE: STUDENT
            </span>
            <span className="text-xs text-emerald-200 font-medium">Institutional Student Provisioning</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl mt-1.5 text-white">
            Register New Student
          </h2>
          <p className="text-xs text-emerald-100/70 mt-0.5">
            Auto-provisions <code className="text-gold-300">@gisedu.in</code> student account and initial login credentials.
          </p>
        </div>

        <div className="hidden sm:flex p-3 rounded-2xl bg-white/10 border border-white/20">
          <GraduationCap className="w-6 h-6 text-gold-400" />
        </div>
      </div>

      {/* Global Error Notice */}
      {errorMessage && (
        <div className="mx-6 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">

        {/* ── SECTION 1: STUDENT PERSONAL DETAILS ── */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
              Student Personal Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. Aarav"
                className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.firstName ? 'border-red-500 bg-red-50/50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.firstName && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.firstName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.lastName ? 'border-red-500 bg-red-50/50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.lastName && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.lastName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.dateOfBirth ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.dateOfBirth && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Student Phone (Optional)</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            {/* Optional Personal Email Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Personal Email ID <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="aarav.personal@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Residential Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="42 Palm Grove Road, Koramangala"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">City & State</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>
            </div>
          </div>
        </div>


        {/* ── SECTION 2: ACADEMIC DETAILS ── */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs">
              2
            </div>
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
              Academic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Student ID / Admission No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. STU-2026-001"
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-bold ${fieldErrors.studentId ? 'border-red-500 bg-red-50/50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.studentId && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.studentId}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Academic Year</label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="2026–2027"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Class / Grade <span className="text-red-500">*</span>
              </label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white font-semibold text-gray-800"
              >
                {['1','2','3','4','5','6','7','8','9','10','11','12'].map((c) => (
                  <option key={c} value={c}>Grade {c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white font-semibold text-gray-800"
              >
                {['A', 'B', 'C', 'D'].map((s) => (
                  <option key={s} value={s}>Section {s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="e.g. 1024"
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-bold ${fieldErrors.rollNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.rollNumber && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.rollNumber}</p>}
            </div>
          </div>
        </div>


        {/* ── SECTION 3: GUARDIAN DETAILS ── */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs">
              3
            </div>
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
              Guardian Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Parent / Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.guardianName ? 'border-red-500 bg-red-50/50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.guardianName && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.guardianName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Relationship</label>
              <select
                name="guardianRelationship"
                value={formData.guardianRelationship}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Legal Guardian</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Guardian Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="+91 98450 11223"
                className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.guardianPhone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
              />
              {fieldErrors.guardianPhone && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.guardianPhone}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Guardian Email</label>
              <input
                type="email"
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleChange}
                placeholder="rajesh.sharma@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Guardian Address (If different)</label>
              <input
                type="text"
                name="guardianAddress"
                value={formData.guardianAddress}
                onChange={handleChange}
                placeholder="Leave blank if same as residential address"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>
          </div>
        </div>


        {/* ── SECTION 4: AUTO-GENERATED ACCOUNT CREDENTIALS ── */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800 font-bold text-xs">
              4
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
                Account Credentials & Security
              </h3>
              <p className="text-[11px] text-gray-500">
                Institutional login email (<code className="text-forest-800">@gisedu.in</code>) and initial password auto-calculated from name.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F3] border border-[#C5A880]/40 rounded-2xl p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Auto Generated Institutional Email */}
              <div>
                <label className="block font-semibold text-gray-800 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-forest-800" />
                  <span>Institutional Login Email (@gisedu.in) <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="firstname.lastname@gisedu.in"
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-semibold text-forest-950 bg-white ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Auto-formatted as: <code className="font-bold text-forest-800">firstname.lastname@gisedu.in</code>
                </p>
                {fieldErrors.email && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Auto Generated Initial Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-700" />
                    <span>Initial Password <span className="text-red-500">*</span></span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="e.g. AaravShar"
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-bold text-gray-900 bg-white ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Auto-formatted as: <code className="font-bold text-amber-900">[FirstName] + [First 4 Letters of LastName] + [Academic Year]</code>
                </p>
                {fieldErrors.password && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.password}</p>}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Confirm Initial Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-bold text-gray-900 bg-white ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                {fieldErrors.confirmPassword && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.confirmPassword}</p>}
              </div>

              <div className="flex items-center">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2 w-full">
                  <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>The system will automatically assign <strong>STUDENT</strong> permissions and activate login access.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
                <span>Enrolling Student Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-gold-400" />
                <span>Register Student & Activate Account</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
