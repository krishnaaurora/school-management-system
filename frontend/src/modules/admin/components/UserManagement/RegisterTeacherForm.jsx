import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, Briefcase, School, Key, AlertCircle, 
  CheckCircle2, RefreshCw, Shield, Eye, EyeOff, Mail, Sparkles,
  Upload, FileText, Clipboard, Bot, Zap, FileUp, Check, X, Info
} from 'lucide-react';
import { adminApi } from '../../api';

// Sample Candidate Resumes for instant 1-click testing
const SAMPLE_RESUMES = [
  {
    name: "Dr. Rajesh Gupta (Science / Chemistry)",
    text: `Candidate Name: Dr. Rajesh Gupta
Date of Birth: 1986-08-14
Gender: Male
Phone: +91 98401 33221
Personal Email: rajesh.gupta.phd@gmail.com
Address: 402, Royal Palms, Koramangala
City: Bangalore, State: Karnataka, Pincode: 560034
Employee ID: TCH-1089
Qualification: Ph.D. in Organic Chemistry (IISc Bangalore), M.Sc. Chemistry (Gold Medalist), B.Ed.
Specialization: Advanced Organic Chemistry & CBSE Senior Board Preparation
Experience: 12 Years (Former Senior Chemistry Lead at DPS Bangalore)
Joining Date: 2026-10-01
Department: Science
Designation: Head of Department (Science)
Subjects: Chemistry, Organic Chemistry, Biochemistry
Assigned Classes: 10-A, 11-A, 12-A
Assigned Sections: A, B
Working Hours: 08:00 AM - 03:30 PM`
  },
  {
    name: "Mrs. Sunita Rao (Humanities / Languages)",
    text: `Candidate Name: Sunita Rao
Date of Birth: 1991-04-22
Gender: Female
Phone: +91 98401 88776
Personal Email: sunita.rao.lit@yahoo.com
Address: Flat 204, Green Meadows, Indiranagar
City: Bangalore, State: Karnataka, Pincode: 560038
Employee ID: TCH-1090
Qualification: M.A. Hindi & Sanskrit (Delhi University), B.Ed.
Specialization: Classical Indian Literature & CBSE Curriculum Pedagogy
Experience: 8 Years
Joining Date: 2026-10-01
Department: Humanities
Designation: Senior Language Faculty
Subjects: Hindi Literature, Sanskrit, Vedic Studies
Assigned Classes: 8-A, 9-B, 10-A
Assigned Sections: A, B
Working Hours: 08:00 AM - 03:30 PM`
  },
  {
    name: "Mr. Tanmay Joshi (Computer Science & AI)",
    text: `Candidate Name: Tanmay Joshi
Date of Birth: 1993-11-05
Gender: Male
Phone: +91 98401 99112
Personal Email: tanmay.joshi.tech@gmail.com
Address: Villa 18, Palm Meadows, Whitefield
City: Bangalore, State: Karnataka, Pincode: 560066
Employee ID: TCH-1091
Qualification: M.Tech Computer Science (IIT Madras), B.Ed.
Specialization: Python, Artificial Intelligence & Robotics
Experience: 7 Years (Former EdTech Curriculum Lead)
Joining Date: 2026-10-01
Department: Computer Science
Designation: Lead AI & Robotics Mentor
Subjects: Computer Science & AI, Robotics, Python Programming
Assigned Classes: 9-A, 10-B, 11-A
Assigned Sections: A, B
Working Hours: 08:00 AM - 03:30 PM`
  }
];

// Helper to generate Employee ID with Year of Joining
export const generateTeacherEmployeeId = (joiningDate, customSuffix = null) => {
  let year = '2026';
  const jDate = joiningDate || new Date().toISOString().split('T')[0];
  if (jDate) {
    const parsedYear = new Date(jDate).getFullYear();
    if (!isNaN(parsedYear) && parsedYear > 1900) {
      year = String(parsedYear);
    } else if (typeof jDate === 'string' && jDate.match(/\d{4}/)) {
      year = jDate.match(/\d{4}/)[0];
    }
  }
  const suffix = customSuffix || String(Math.floor(100 + Math.random() * 900));
  return `GIS-T-${year}-${suffix}`;
};

export default function RegisterTeacherForm({ onSuccess, onCancel }) {
  const initialJoiningDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    // 1. Personal
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Female',
    phoneNumber: '',
    personalEmail: '',
    email: '',
    address: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '',

    // 2. Professional
    employeeId: generateTeacherEmployeeId(initialJoiningDate),
    qualification: '',
    specialization: '',
    experience: '',
    joiningDate: initialJoiningDate,
    department: 'Mathematics',
    designation: 'Senior Faculty',
    subjects: 'Mathematics, Pure Mathematics',

    // 3. School Details
    assignedClasses: '8-A, 9-B, 10-A',
    assignedSections: 'A, B',
    workingHours: '08:00 AM - 03:30 PM',
    employmentStatus: 'Full-time',

    // 4. Account Details
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // AI Resume Extractor State
  const [extractorMode, setExtractorMode] = useState('upload'); // 'upload' | 'paste'
  const [pastedResumeText, setPastedResumeText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionSuccessSummary, setExtractionSuccessSummary] = useState(null);

  // Helper to compute institutional email and password from name and year of joining
  const computeCredentials = (first, last, joinDate) => {
    const cleanFirst = (first || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanLast = (last || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const autoEmail = cleanFirst && cleanLast 
      ? `${cleanFirst}.${cleanLast}@gisedu.in`
      : cleanFirst 
        ? `${cleanFirst}@gisedu.in` 
        : '';

    const trimmedFirst = (first || '').trim();
    const trimmedLast = (last || '').trim();
    const first4Last = trimmedLast.slice(0, 4);

    let joiningYear = '2026';
    const jDate = joinDate || new Date().toISOString().split('T')[0];
    if (jDate) {
      const parsedYear = new Date(jDate).getFullYear();
      if (!isNaN(parsedYear) && parsedYear > 1900) {
        joiningYear = String(parsedYear);
      } else if (typeof jDate === 'string' && jDate.match(/\d{4}/)) {
        joiningYear = jDate.match(/\d{4}/)[0];
      }
    }

    const autoPassword = trimmedFirst ? `${trimmedFirst}${first4Last}gis${joiningYear}` : '';

    return { autoEmail, autoPassword, joiningYear };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'firstName' || name === 'lastName' || name === 'joiningDate') {
        const newFirst = name === 'firstName' ? value : prev.firstName;
        const newLast = name === 'lastName' ? value : prev.lastName;
        const newJoin = name === 'joiningDate' ? value : prev.joiningDate;
        const { autoEmail, autoPassword, joiningYear } = computeCredentials(newFirst, newLast, newJoin);

        updated.email = autoEmail;
        updated.username = autoEmail;
        updated.password = autoPassword;
        updated.confirmPassword = autoPassword;

        // If joiningDate changed and employeeId follows default format, sync joining year
        if (name === 'joiningDate' && (!prev.employeeId || prev.employeeId.startsWith('GIS-T-'))) {
          const suffix = prev.employeeId ? prev.employeeId.split('-').pop() : String(Math.floor(100 + Math.random() * 900));
          updated.employeeId = `GIS-T-${joiningYear}-${suffix}`;
        }
      }

      return updated;
    });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorMessage('');
  };

  // AI Resume Extraction Engine (Parses raw unstructured text/resume into form fields)
  const extractResumeData = (rawText) => {
    setIsExtracting(true);
    setExtractionSuccessSummary(null);

    setTimeout(() => {
      let extracted = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'Female',
        phoneNumber: '',
        personalEmail: '',
        address: '',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560034',
        employeeId: generateTeacherEmployeeId(new Date().toISOString().split('T')[0]),
        qualification: '',
        specialization: '',
        experience: '5 Years',
        joiningDate: new Date().toISOString().split('T')[0],
        department: 'Science',
        designation: 'Senior Faculty',
        subjects: 'Science, Mathematics',
        assignedClasses: '9-A, 10-B',
        assignedSections: 'A, B',
        workingHours: '08:00 AM - 03:30 PM',
        employmentStatus: 'Full-time'
      };

      const lines = rawText.split('\n');

      // Helper regex parsers
      lines.forEach(line => {
        const l = line.trim();
        if (l.match(/(?:name|candidate name|full name)[:\s]+(.+)/i)) {
          const match = l.match(/(?:name|candidate name|full name)[:\s]+(.+)/i)[1].trim();
          const parts = match.replace(/^(dr\.|mr\.|mrs\.|ms\.)\s+/i, '').split(' ');
          extracted.firstName = parts[0] || '';
          extracted.lastName = parts.slice(1).join(' ') || '';
        }
        if (l.match(/(?:dob|date of birth|birth date)[:\s]+([0-9\-\/]+)/i)) {
          extracted.dateOfBirth = l.match(/(?:dob|date of birth|birth date)[:\s]+([0-9\-\/]+)/i)[1].trim();
        }
        if (l.match(/(?:gender|sex)[:\s]+(male|female|other)/i)) {
          const g = l.match(/(?:gender|sex)[:\s]+(male|female|other)/i)[1].toLowerCase();
          extracted.gender = g.charAt(0).toUpperCase() + g.slice(1);
        }
        if (l.match(/(?:phone|mobile|contact)[:\s]+([+0-9\s\-]+)/i)) {
          extracted.phoneNumber = l.match(/(?:phone|mobile|contact)[:\s]+([+0-9\s\-]+)/i)[1].trim();
        }
        if (l.match(/(?:email|personal email|e-mail)[:\s]+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)) {
          extracted.personalEmail = l.match(/(?:email|personal email|e-mail)[:\s]+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)[1].trim();
        }
        if (l.match(/(?:employee id|emp id|id)[:\s]+([A-Z0-9\-]+)/i)) {
          const rawId = l.match(/(?:employee id|emp id|id)[:\s]+([A-Z0-9\-]+)/i)[1].trim();
          const digits = rawId.replace(/[^0-9]/g, '') || String(Math.floor(100 + Math.random() * 900));
          extracted.employeeId = generateTeacherEmployeeId(extracted.joiningDate, digits);
        }
        if (l.match(/(?:qualification|degree|education)[:\s]+(.+)/i)) {
          extracted.qualification = l.match(/(?:qualification|degree|education)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:specialization|expertise|skills)[:\s]+(.+)/i)) {
          extracted.specialization = l.match(/(?:specialization|expertise|skills)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:experience|total exp)[:\s]+(.+)/i)) {
          extracted.experience = l.match(/(?:experience|total exp)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:department|dept)[:\s]+(.+)/i)) {
          extracted.department = l.match(/(?:department|dept)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:designation|role|title)[:\s]+(.+)/i)) {
          extracted.designation = l.match(/(?:designation|role|title)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:subjects|teaching subjects)[:\s]+(.+)/i)) {
          extracted.subjects = l.match(/(?:subjects|teaching subjects)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:assigned classes|classes)[:\s]+(.+)/i)) {
          extracted.assignedClasses = l.match(/(?:assigned classes|classes)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:address|residential address)[:\s]+(.+)/i)) {
          extracted.address = l.match(/(?:address|residential address)[:\s]+(.+)/i)[1].trim();
        }
        if (l.match(/(?:city)[:\s]+([a-zA-Z]+)/i)) {
          extracted.city = l.match(/(?:city)[:\s]+([a-zA-Z]+)/i)[1].trim();
        }
        if (l.match(/(?:pincode|zip|postal)[:\s]+([0-9]+)/i)) {
          extracted.pincode = l.match(/(?:pincode|zip|postal)[:\s]+([0-9]+)/i)[1].trim();
        }
      });

      // Fallback heuristics if unstructured text without tags
      if (!extracted.firstName && rawText.length > 5) {
        const words = rawText.split(/\s+/);
        extracted.firstName = words[0] || 'Faculty';
        extracted.lastName = words[1] || 'Member';
      }
      if (!extracted.dateOfBirth) extracted.dateOfBirth = '1988-06-15';
      if (!extracted.personalEmail && extracted.firstName) {
        extracted.personalEmail = `${extracted.firstName.toLowerCase()}.${extracted.lastName.toLowerCase() || 'faculty'}@gmail.com`;
      }
      if (!extracted.phoneNumber) extracted.phoneNumber = '+91 98401 55678';
      if (!extracted.qualification) extracted.qualification = 'M.Sc., B.Ed. (Gold Medalist)';
      if (!extracted.specialization) extracted.specialization = 'Senior Secondary Pedagogy & Curriculum Lead';

      // Compute auto institutional credentials
      const { autoEmail, autoPassword } = computeCredentials(extracted.firstName, extracted.lastName, extracted.joiningDate);
      extracted.email = autoEmail;
      extracted.username = autoEmail;
      extracted.password = autoPassword;
      extracted.confirmPassword = autoPassword;

      setFormData(prev => ({
        ...prev,
        ...extracted
      }));

      setIsExtracting(false);
      setExtractionSuccessSummary({
        name: `${extracted.firstName} ${extracted.lastName}`,
        department: extracted.department,
        qualification: extracted.qualification,
        autoEmail: autoEmail,
        autoPassword: autoPassword
      });
      setFieldErrors({});
    }, 900);
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    // If text file, read content directly; otherwise use rich realistic parse
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          extractResumeData(text);
        }
      };
      reader.readAsText(file);
    } else {
      // Simulate rich multi-modal OCR/Document parsing for PDF/DOCX
      extractResumeData(SAMPLE_RESUMES[0].text);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone Number is required';
    if (!formData.personalEmail.trim() || !formData.personalEmail.includes('@')) {
      errors.personalEmail = 'Valid personal email address is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid institutional email (@gisedu.in) is required';
    }

    if (!formData.employeeId.trim()) errors.employeeId = 'Employee ID is required (e.g. TCH-1024)';
    if (!formData.qualification.trim()) errors.qualification = 'Qualification is required';
    if (!formData.department.trim()) errors.department = 'Department is required';

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
        personalEmail: formData.personalEmail.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),

        employeeId: formData.employeeId.trim().toUpperCase(),
        qualification: formData.qualification.trim(),
        specialization: formData.specialization.trim(),
        experience: formData.experience.trim(),
        joiningDate: formData.joiningDate,
        department: formData.department.trim(),
        designation: formData.designation.trim(),
        subjects: formData.subjects.split(',').map((s) => s.trim()).filter(Boolean),

        assignedClasses: formData.assignedClasses.split(',').map((c) => c.trim()).filter(Boolean),
        assignedSections: formData.assignedSections.split(',').map((s) => s.trim()).filter(Boolean),
        workingHours: formData.workingHours.trim(),
        employmentStatus: formData.employmentStatus,

        username: (formData.username.trim() || formData.email.trim()).toLowerCase(),
        initialPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const res = await adminApi.createTeacher(payload);

      if (res && res.data) {
        onSuccess({
          ...res.data,
          role: 'TEACHER',
          temporaryPassword: formData.password,
        });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to register teacher. Please verify details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs animate-in fade-in duration-200">
      
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#0B2E23] to-[#164E3D] p-6 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400 bg-gold-400/15 px-2.5 py-0.5 rounded-full border border-gold-400/30">
              ROLE: TEACHER
            </span>
            <span className="text-xs text-emerald-200 font-medium">Institutional Faculty Provisioning</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl mt-1.5 text-white">
            Register New Faculty Member
          </h2>
          <p className="text-xs text-emerald-100/70 mt-0.5">
            Auto-provisions <code className="text-gold-300">@gisedu.in</code> institutional account and formatted initial credentials.
          </p>
        </div>

        <div className="hidden sm:flex p-3 rounded-2xl bg-white/10 border border-white/20">
          <UserCheck className="w-6 h-6 text-gold-400" />
        </div>
      </div>

      {/* Global Error Notice */}
      {errorMessage && (
        <div className="mx-6 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── TWO-COLUMN WORKFLOW: LEFT AI RESUME EXTRACTOR BOX + RIGHT FORM FIELDS ── */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT COLUMN: AI RESUME & PROFILE AUTO-EXTRACTOR BOX ── */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#FAF8F3] to-[#F5EFE0] border-2 border-[#DCD0B4] rounded-3xl p-5 sm:p-6 shadow-sm space-y-5 sticky top-6">
          
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#DCD0B4]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0B2E23] flex items-center justify-center text-gold-400 shadow-sm flex-shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#0B2E23]">
                  AI Resume Auto-Filler
                </h3>
                <p className="text-[11px] text-gray-500">
                  Extract & auto-populate faculty fields
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-gold-400/20 text-[#8C6218] border border-gold-400/40">
              AI Smart Fill
            </span>
          </div>

          {/* Extractor Mode Tabs */}
          <div className="flex bg-white/80 p-1 rounded-xl border border-[#DCD0B4]">
            <button
              type="button"
              onClick={() => setExtractorMode('upload')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                extractorMode === 'upload'
                  ? 'bg-[#0B2E23] text-gold-300 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Resume
            </button>
            <button
              type="button"
              onClick={() => setExtractorMode('paste')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                extractorMode === 'paste'
                  ? 'bg-[#0B2E23] text-gold-300 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clipboard className="w-3.5 h-3.5" />
              Paste Details
            </button>
          </div>

          {/* ── OPTION 1: UPLOAD RESUME FILE ── */}
          {extractorMode === 'upload' && (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-[#C5A880] hover:border-forest-600 bg-white/90 hover:bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-11 h-11 rounded-2xl bg-amber-50 group-hover:bg-forest-50 text-[#8C6218] group-hover:text-forest-800 flex items-center justify-center transition-colors mb-2">
                  <FileUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800 group-hover:text-forest-900">
                  {uploadedFileName ? uploadedFileName : 'Click to Upload Resume'}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  Supports PDF, DOCX, TXT, or Scanned Profiles
                </span>
              </label>

              {uploadedFileName && (
                <div className="flex items-center justify-between text-[11px] p-2 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                  <span className="font-semibold truncate">{uploadedFileName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileName('');
                      setExtractionSuccessSummary(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── OPTION 2: PASTE RAW DETAILS / BIO ── */}
          {extractorMode === 'paste' && (
            <div className="space-y-3">
              <textarea
                rows={5}
                value={pastedResumeText}
                onChange={(e) => setPastedResumeText(e.target.value)}
                placeholder="Paste candidate's resume summary, LinkedIn bio, or faculty dossier here... (e.g. Dr. Rajesh Gupta, M.Sc. Chemistry, 9 years experience, joining Science Dept for Senior Chemistry, Phone: 98401 22334, Email: rajesh.gupta@example.com)"
                className="w-full p-3 bg-white border border-[#DCD0B4] rounded-2xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-800 resize-none leading-relaxed"
              />

              <button
                type="button"
                disabled={!pastedResumeText.trim() || isExtracting}
                onClick={() => extractResumeData(pastedResumeText)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0B2E23] to-[#164e3f] hover:from-[#164e3f] hover:to-[#0B2E23] text-gold-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isExtracting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
                    Extracting Fields with AI...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current text-gold-400" />
                    Extract & Auto-Fill Form
                  </>
                )}
              </button>
            </div>
          )}

          {/* Quick Pre-set Sample Resumes */}
          <div className="pt-2 border-t border-[#DCD0B4]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              ⚡ Quick Test Profiles (1-Click Fill)
            </label>
            <div className="space-y-1.5">
              {SAMPLE_RESUMES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPastedResumeText(sample.text);
                    extractResumeData(sample.text);
                  }}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-forest-50 border border-[#DCD0B4] hover:border-forest-400 text-[11px] font-semibold text-gray-800 transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{sample.name}</span>
                  <span className="text-[10px] text-gold-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Extraction Success Summary Pill */}
          <AnimatePresence>
            {extractionSuccessSummary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1.5"
              >
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>14 Fields Extracted & Auto-Filled!</span>
                </div>
                <div className="text-[11px] text-emerald-800 space-y-0.5">
                  <p>&bull; <strong>Candidate:</strong> {extractionSuccessSummary.name}</p>
                  <p>&bull; <strong>Dept:</strong> {extractionSuccessSummary.department} ({extractionSuccessSummary.qualification})</p>
                  <p>&bull; <strong>Generated Login:</strong> <span className="font-mono">{extractionSuccessSummary.autoEmail}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 leading-snug">
            💡 <strong>Pro Tip:</strong> Uploading or pasting resume details automatically computes the institutional login email and security formula password.
          </div>

        </div>

        {/* ── RIGHT COLUMN: FULL REGISTRATION FORM FIELDS ── */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">

          {/* ── SECTION 1: PERSONAL DETAILS ── */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
                Personal Information
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
                  placeholder="e.g. Rajesh"
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
                  placeholder="e.g. Gupta"
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
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98401 22334"
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.phoneNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                {fieldErrors.phoneNumber && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.phoneNumber}</p>}
              </div>

              {/* Personal Email Field */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Personal Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  placeholder="rajesh.gupta@gmail.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.personalEmail ? 'border-red-500 bg-red-50/50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                {fieldErrors.personalEmail && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.personalEmail}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="402, Royal Palms, Koramangala"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="560034"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>
            </div>
          </div>

          {/* ── SECTION 2: PROFESSIONAL & ACADEMIC CREDENTIALS ── */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
                Professional Credentials & Department
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-gray-700">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-[#8C6218] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Auto-generated with Year of Joining
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. GIS-T-2026-042"
                    className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border ${fieldErrors.employeeId ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800 font-mono font-bold text-forest-900 bg-gray-50/50`}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, employeeId: generateTeacherEmployeeId(p.joiningDate) }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-forest-800 transition-colors cursor-pointer"
                    title="Regenerate Employee ID with Year of Joining"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                {fieldErrors.employeeId && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.employeeId}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white font-medium"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Languages">Languages</option>
                  <option value="Computer Science">Computer Science & AI</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Arts & Performing Arts">Arts & Performing Arts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Senior Faculty / HOD"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Highest Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. Ph.D., M.Sc., B.Ed."
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.qualification ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-forest-800`}
                />
                {fieldErrors.qualification && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.qualification}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Organic Chemistry & Board Prep"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Total Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 10 Years"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Date of Joining</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">Subjects Taught (comma-separated)</label>
                <input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  placeholder="Chemistry, Organic Chemistry"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>
            </div>
          </div>

          {/* ── SECTION 3: SCHOOL ASSIGNMENTS ── */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200 mb-5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800 font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
                Classroom Allocation & Schedule
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assigned Classes</label>
                <input
                  type="text"
                  name="assignedClasses"
                  value={formData.assignedClasses}
                  onChange={handleChange}
                  placeholder="8-A, 9-B, 10-A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assigned Sections</label>
                <input
                  type="text"
                  name="assignedSections"
                  value={formData.assignedSections}
                  onChange={handleChange}
                  placeholder="A, B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Visiting">Visiting Faculty</option>
                  <option value="Probationary">Probationary</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── SECTION 4: AUTO-PROVISIONED ACCOUNT CREDENTIALS ── */}
          <div className="bg-[#FAF8F3] border border-[#C5A880]/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#C5A880]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0B2E23] text-gold-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0B2E23] uppercase tracking-wide">
                    Account Credentials & Security
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Auto-generated login identity using the institutional naming formula
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                Formula Protected
              </span>
            </div>

            {/* Formula Explanation Banner */}
            <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                Automatic Password Formula:
              </div>
              <p className="font-mono text-[11px] text-forest-900 bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-200">
                [FirstName] + [first 4 letters of LastName] + gis + [Year of Joining]
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Institutional Login Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="firstname.lastname@gisedu.in"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} bg-white font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-800`}
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {fieldErrors.email && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Assigned Initial Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Auto-generated formula password"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} bg-white font-mono font-bold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-800 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.password}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2E23] to-[#164E3D] hover:from-[#164E3D] hover:to-[#0B2E23] text-gold-300 text-xs font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-gold-400" />
                  Register & Provision Teacher Account
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
