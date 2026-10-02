import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, UserCheck, GraduationCap, Award, Users, BookOpen, 
  Layers, LogOut, ArrowLeft, Info, KeyRound
} from 'lucide-react';
import GisEmblem from './GisEmblem';

// Pre-configured Institutional Accounts for Role Detection
const INSTITUTIONAL_ACCOUNTS = {
  admin: {
    roleName: "System Administrator",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    name: "IT Administration Desk",
    email: "admin@greenfieldis.edu",
    id: "GIS-ADM-001",
    permissions: ["Full User Provisioning", "Security & Audit Logs", "Fee Master Configuration", "System Governance"],
    stats: { users: "2,450 Active", systems: "100% Operational", backups: "Realtime Synced" }
  },
  principal: {
    roleName: "Principal",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    name: "Dr. Ananya Rao",
    email: "principal.rao@greenfieldis.edu",
    id: "GIS-EXEC-01",
    permissions: ["Institutional Governance", "Academic Board Review", "Faculty Approvals", "Strategic Planning"],
    stats: { campusRank: "#1 in Region", facultyCount: "140 Educators", boardResults: "99.4% Pass Rate" }
  },
  viceprincipal: {
    roleName: "Vice Principal",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    name: "Mrs. Priya Sharma",
    email: "vp.sharma@greenfieldis.edu",
    id: "GIS-EXEC-02",
    permissions: ["Daily Academic Timetables", "Discipline Oversight", "Examination Protocols", "Student Council"],
    stats: { todayAttendance: "98.2%", activeExams: "Term 1 Pre-boards", eventsThisWeek: "4 Scheduled" }
  },
  teacher: {
    roleName: "Faculty / Educator",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    name: "Mr. Kiran Sharma",
    email: "teacher.kiran@greenfieldis.edu",
    id: "GIS-FAC-408",
    permissions: ["Classroom Attendance", "Gradebook & Evaluation", "Lesson Plan Management", "Parent Remarks"],
    stats: { activeClasses: "Grade 10-A, 11-B", submissionsPending: "18 Assignments", nextClass: "Physics @ 11:30 AM" }
  },
  student: {
    roleName: "Student",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    name: "Ananya Reddy",
    email: "student.ananya@greenfieldis.edu",
    id: "GIS-2026-0421",
    permissions: ["Course Syllabus & LMS", "Library Book Renewals", "Digital Report Cards", "Clubs & Sports"],
    stats: { attendanceRate: "97.8%", gpa: "3.94 / 4.0", pendingHomework: "Physics Lab Report" }
  },
  parent: {
    roleName: "Parent / Guardian",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    name: "Mr. & Mrs. Reddy",
    email: "parent.verma@greenfieldis.edu",
    id: "GIS-PAR-9042",
    permissions: ["Ward Academic Progress", "Online Fee Payment", "Live Bus GPS Tracking", "PTA Consultations"],
    stats: { feeStatus: "Paid (Term 1)", busRoute: "Bus #14 (On Time)", nextPTA: "Oct 15, 2026" }
  }
};

export default function LoginPage({ onNavigateHome, onOpenAdmissions, onOpenAssistant }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Automatic Role Detection from Email / User ID
  const detectRole = (input) => {
    const raw = (input || '').trim().toLowerCase();
    if (!raw) return null;
    if (raw.includes('admin') || raw.startsWith('adm')) return INSTITUTIONAL_ACCOUNTS.admin;
    if (raw.includes('principal') || raw.includes('ananya.rao')) return INSTITUTIONAL_ACCOUNTS.principal;
    if (raw.includes('vp') || raw.includes('vice') || raw.includes('sharma')) return INSTITUTIONAL_ACCOUNTS.viceprincipal;
    if (raw.includes('teacher') || raw.includes('faculty') || raw.includes('kiran')) return INSTITUTIONAL_ACCOUNTS.teacher;
    if (raw.includes('parent') || raw.includes('guardian') || raw.includes('verma')) return INSTITUTIONAL_ACCOUNTS.parent;
    if (raw.includes('student') || raw.includes('gis-') || raw.includes('std')) return INSTITUTIONAL_ACCOUNTS.student;
    
    // Default fallback role based on generic patterns
    if (raw.includes('@')) {
      return {
        roleName: "Verified Greenfield User",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        name: raw.split('@')[0].replace('.', ' ').toUpperCase(),
        email: raw,
        id: "GIS-VERIFIED",
        permissions: ["Portal Services", "Institutional Directory", "Notifications"],
        stats: { status: "Active SSO", access: "Standard" }
      };
    }
    return null;
  };

  const detectedRole = detectRole(identifier);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const user = detectedRole || {
        roleName: "Institutional User",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier,
        id: "GIS-USER-" + Math.floor(1000 + Math.random() * 9000),
        permissions: ["Portal Access", "Academic Resources"],
        stats: { status: "Active" }
      };
      setLoggedInUser(user);
      setLoading(false);
    }, 600);
  };

  const handleQuickDemoFill = (roleKey) => {
    const account = INSTITUTIONAL_ACCOUNTS[roleKey];
    if (!account) return;
    setIdentifier(account.email);
    setPassword('••••••••••••');
    setLoading(true);
    setTimeout(() => {
      setLoggedInUser(account);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F5EF] relative overflow-x-hidden font-sans">
      
      {/* ── TOP HEADER / NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        {/* Brand Link */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <GisEmblem size="md" className="group-hover:scale-105 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-black leading-tight">
              GREENFIELD
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-plus text-charcoal-700 font-semibold">
              International School
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-charcoal-700">
          <button onClick={onNavigateHome} className="hover:text-forest-900 transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={onNavigateHome} className="hover:text-forest-900 transition-colors cursor-pointer">
            About
          </button>
          <button onClick={onNavigateHome} className="hover:text-forest-900 transition-colors cursor-pointer">
            Academics
          </button>
          <button onClick={onNavigateHome} className="hover:text-forest-900 transition-colors cursor-pointer">
            Campus
          </button>
          <button onClick={onNavigateHome} className="hover:text-forest-900 transition-colors cursor-pointer">
            Contact
          </button>
        </nav>

        {/* Back to Portal / Assistant */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-800/15 rounded-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span className="hidden sm:inline">Assistant</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-charcoal-700 hover:text-forest-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
        </div>
      </header>

      {/* ── MAIN SPLIT VIEW LAYOUT ── */}
      <div className="flex-1 pt-20 flex flex-col lg:flex-row relative min-h-[calc(100vh-80px)]">
        
        {/* Background Image across container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/greenfield-login-bg.jpg"
            alt="Greenfield International School Campus"
            className="w-full h-full object-cover object-center brightness-95"
          />
          {/* Subtle gradient to provide high readability on the left text and right card */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-forest-950/40 to-forest-950/70 lg:to-forest-950/50" />
        </div>

        {/* LEFT COLUMN: School Mission & Editorial Narrative */}
        <div className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-20 text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Value Tagline */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-gold-300 drop-shadow-sm">
                DISCIPLINE &bull; KNOWLEDGE &bull; CHARACTER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-4 drop-shadow-md">
              Nurturing <br />
              <span className="italic text-gold-200">Brighter Tomorrows</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-lg mb-8 drop-shadow-sm font-normal">
              A safe, inclusive and inspiring environment for holistic learning, intellectual rigor, and personal growth.
            </p>

            {/* Role-Based Unified Sign-On Information */}
            <div className="p-4 rounded-xl bg-forest-950/60 backdrop-blur-md border border-gold-400/25 max-w-lg shadow-lg">
              <div className="flex items-center gap-2.5 mb-2 text-gold-300">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Unified Role-Based SSO</span>
              </div>
              <p className="text-xs text-ivory/80 leading-relaxed">
                Log in with your assigned institutional email or User ID. The system automatically detects your role permissions for <strong className="text-ivory">Administrators, Principals, Vice Principals, Faculty, Students, and Parents</strong>.
              </p>
            </div>

            {/* Quick Demo Selector */}
            <div className="mt-6 pt-6 border-t border-white/15">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300/90 mb-3">
                Quick Role Demo Login:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'admin', label: 'Admin' },
                  { key: 'principal', label: 'Principal' },
                  { key: 'viceprincipal', label: 'Vice Principal' },
                  { key: 'teacher', label: 'Teacher' },
                  { key: 'student', label: 'Student' },
                  { key: 'parent', label: 'Parent' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleQuickDemoFill(item.key)}
                    className="px-3 py-1 text-xs rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-ivory transition-all cursor-pointer backdrop-blur-xs hover:border-gold-300 hover:text-gold-200"
                  >
                    ✦ {item.label}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: Clean, Elegant Login Card */}
        <div className="relative z-10 w-full lg:w-2/5 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-7 sm:p-9 relative overflow-hidden"
          >
            
            {loggedInUser ? (
              /* ── LOGGED IN DASHBOARD VIEW ── */
              <div className="py-2 text-center">
                <div className="w-16 h-16 rounded-full bg-forest-50 border-2 border-forest-800/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 text-forest-800" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-forest-800/20 bg-forest-50 text-forest-900">
                  {loggedInUser.roleName}
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#0B2E23] mb-1">
                  Welcome, {loggedInUser.name}
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-mono">
                  {loggedInUser.email} &bull; {loggedInUser.id}
                </p>

                {/* Role Permissions & Features */}
                <div className="text-left bg-[#F8F5EF] p-4 rounded-xl border border-gray-200 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0B2E23] mb-2.5">
                    Authorized Portal Modules:
                  </p>
                  <div className="space-y-1.5">
                    {loggedInUser.permissions.map((perm, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                        <span>{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => alert(`Redirecting to ${loggedInUser.roleName} Institutional Portal Workspace...`)}
                    className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Launch Portal Workspace</span>
                    <ArrowRight className="w-4 h-4 text-gold-400" />
                  </button>

                  <button
                    onClick={() => {
                      setLoggedInUser(null);
                      setIdentifier('');
                      setPassword('');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-charcoal-700 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5 text-gray-500" />
                    <span>Switch User / Log Out</span>
                  </button>
                </div>
              </div>

            ) : (

              /* ── STANDARD LOGIN FORM (No Role Buttons, Matching Image 2) ── */
              <div>
                
                {/* Form Header with Crest Logo from Hero */}
                <div className="flex flex-col items-center text-center mb-6">
                  {/* Exact Hero Crest Emblem */}
                  <div className="mb-3">
                    <GisEmblem size="lg" className="ring-2 ring-gold-500/50 shadow-md" />
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23] tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Login to your Greenfield International School account
                  </p>
                </div>

                {/* Detected Role Notification Badge */}
                <AnimatePresence>
                  {detectedRole && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-between ${detectedRole.badgeColor}`}>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Detected: {detectedRole.roleName}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Auto-Auth</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  
                  {/* Email / User ID field */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                      Email / User ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or user ID"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-xs font-semibold text-forest-800 hover:text-forest-950 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Login</span>
                        <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                </form>

                {/* Single Sign-On Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                    <span className="bg-white px-3">Or Continue With</span>
                  </div>
                </div>

                {/* Google & Microsoft SSO */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('teacher')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-charcoal-700 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('student')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-charcoal-700 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z"/>
                      <path fill="#81bc06" d="M12 1h10v10H12z"/>
                      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                      <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    <span>Microsoft</span>
                  </button>
                </div>

                {/* Registration note as specified by user */}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500">
                    Accounts are managed by GIS Admin.{' '}
                    <button
                      type="button"
                      onClick={() => alert("User account registration is restricted. Teachers, Principals, Vice Principals, Students, and Parents are registered through the Central IT Administrator.")}
                      className="font-bold text-forest-800 hover:text-forest-950 underline cursor-pointer"
                    >
                      Registration Info
                    </button>
                  </p>
                </div>

              </div>
            )}

          </motion.div>

        </div>

      </div>

      {/* ── FORGOT PASSWORD MODAL ── */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-forest-50 border border-forest-800/20 flex items-center justify-center text-forest-800">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0B2E23]">Password Assistance</h3>
                <p className="text-xs text-gray-500">GIS Central Identity & Access Management</p>
              </div>
            </div>

            <p className="text-xs text-charcoal-700 leading-relaxed mb-4">
              For security compliance, passwords for faculty, staff, students, and parents are provisioned directly by the <strong>GIS Administrative Office</strong>.
            </p>

            <div className="bg-[#F8F5EF] p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5 mb-6">
              <div className="font-bold text-forest-900">Contact IT Support Desk:</div>
              <div>&bull; Email: <span className="font-mono text-forest-800">it.support@greenfieldis.edu</span></div>
              <div>&bull; Admin Helpline: <span className="font-mono text-forest-800">+91 40 8920 4400 (Ext. 102)</span></div>
              <div>&bull; Office Hours: Mon &ndash; Fri, 8:00 AM &ndash; 4:30 PM</div>
            </div>

            <button
              onClick={() => setForgotPasswordOpen(false)}
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
