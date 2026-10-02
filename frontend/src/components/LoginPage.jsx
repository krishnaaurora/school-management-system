import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, LogOut, KeyRound
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
  },
  principal: {
    roleName: "Principal",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    name: "Dr. Ananya Rao",
    email: "principal.rao@greenfieldis.edu",
    id: "GIS-EXEC-01",
    permissions: ["Institutional Governance", "Academic Board Review", "Faculty Approvals", "Strategic Planning"],
  },
  viceprincipal: {
    roleName: "Vice Principal",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    name: "Mrs. Priya Sharma",
    email: "vp.sharma@greenfieldis.edu",
    id: "GIS-EXEC-02",
    permissions: ["Daily Academic Timetables", "Discipline Oversight", "Examination Protocols", "Student Council"],
  },
  teacher: {
    roleName: "Faculty / Educator",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    name: "Mr. Kiran Sharma",
    email: "teacher.kiran@greenfieldis.edu",
    id: "GIS-FAC-408",
    permissions: ["Classroom Attendance", "Gradebook & Evaluation", "Lesson Plan Management", "Parent Remarks"],
  },
  student: {
    roleName: "Student",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    name: "Ananya Reddy",
    email: "student.ananya@greenfieldis.edu",
    id: "GIS-2026-0421",
    permissions: ["Course Syllabus & LMS", "Library Book Renewals", "Digital Report Cards", "Clubs & Sports"],
  },
  parent: {
    roleName: "Parent / Guardian",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    name: "Mr. & Mrs. Reddy",
    email: "parent.verma@greenfieldis.edu",
    id: "GIS-PAR-9042",
    permissions: ["Ward Academic Progress", "Online Fee Payment", "Live Bus GPS Tracking", "PTA Consultations"],
  }
};

export default function LoginPage({ onNavigateHome, onLoginSuccess }) {
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
    if (raw.includes('admin') || raw.startsWith('adm') || raw === 'admingis@gmail.com') return INSTITUTIONAL_ACCOUNTS.admin;
    if (raw.includes('principal') || raw.includes('ananya.rao')) return INSTITUTIONAL_ACCOUNTS.principal;
    if (raw.includes('vp') || raw.includes('vice') || raw.includes('sharma')) return INSTITUTIONAL_ACCOUNTS.viceprincipal;
    if (raw.includes('teacher') || raw.includes('faculty') || raw.includes('kiran')) return INSTITUTIONAL_ACCOUNTS.teacher;
    if (raw.includes('parent') || raw.includes('guardian') || raw.includes('verma')) return INSTITUTIONAL_ACCOUNTS.parent;
    if (raw.includes('student') || raw.includes('gis-') || raw.includes('std')) return INSTITUTIONAL_ACCOUNTS.student;
    
    // Default fallback role for any entered institutional email/ID
    if (raw.includes('@')) {
      return {
        roleName: "Verified Greenfield User",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        name: raw.split('@')[0].replace('.', ' ').toUpperCase(),
        email: raw,
        id: "GIS-VERIFIED",
        permissions: ["Portal Services", "Institutional Directory", "Academic Resources"],
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
        roleName: "System Administrator",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        name: "Admin GIS Desk",
        email: identifier,
        id: "GIS-ADM-001",
        permissions: ["Full User Provisioning", "Security & Audit Logs", "Fee Master Configuration", "System Governance"],
      };

      if (onLoginSuccess) {
        onLoginSuccess('admin', user);
      } else {
        setLoggedInUser(user);
      }
      setLoading(false);
    }, 500);
  };


  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F5EF] relative overflow-x-hidden font-sans">
      
      {/* ── CLEAN TOP HEADER (Brand Only) ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        {/* Brand Link */}
        <div className="flex items-center gap-3 select-none">
          <GisEmblem size="md" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-black leading-tight">
              GREENFIELD
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-plus text-charcoal-700 font-semibold">
              International School
            </span>
          </div>
        </div>

        {/* Home / Return link for easy navigation if needed */}
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-charcoal-600 hover:text-forest-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            School Website &rarr;
          </button>
        )}
      </header>

      {/* ── MAIN SPLIT VIEW LAYOUT ── */}
      <div className="flex-1 pt-16 sm:pt-20 flex flex-col lg:flex-row relative min-h-[calc(100vh-64px)]">
        
        {/* Background Image across container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/greenfield-login-bg.jpg"
            alt="Greenfield International School Campus"
            className="w-full h-full object-cover object-center brightness-95"
          />
          {/* Soft atmospheric gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/75 via-forest-950/45 to-forest-950/70 lg:to-forest-950/50" />
        </div>

        {/* LEFT COLUMN: School Mission & Editorial Narrative */}
        <div className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 lg:py-16 text-ivory">
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
            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-lg drop-shadow-sm font-normal">
              A safe, inclusive and inspiring environment for holistic learning, intellectual rigor, and personal growth.
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Clean, Compact Login Card */}
        <div className="relative z-10 w-full lg:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[360px] sm:max-w-[375px] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 relative overflow-hidden"
          >
            
            {loggedInUser ? (
              /* ── LOGGED IN DASHBOARD VIEW ── */
              <div className="py-2 text-center">
                <div className="w-14 h-14 rounded-full bg-forest-50 border-2 border-forest-800/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-forest-800" />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border border-forest-800/20 bg-forest-50 text-forest-900">
                  {loggedInUser.roleName}
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0B2E23] mb-0.5">
                  Welcome, {loggedInUser.name}
                </h2>
                <p className="text-[11px] text-gray-500 mb-4 font-mono">
                  {loggedInUser.email} &bull; {loggedInUser.id}
                </p>

                {/* Role Permissions */}
                <div className="text-left bg-[#F8F5EF] p-3 rounded-xl border border-gray-200 mb-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0B2E23] mb-2">
                    Authorized Portal Modules:
                  </p>
                  <div className="space-y-1">
                    {loggedInUser.permissions.map((perm, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-charcoal-800">
                        <CheckCircle2 className="w-3 h-3 text-forest-700 flex-shrink-0" />
                        <span>{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => alert(`Redirecting to ${loggedInUser.roleName} Institutional Portal Workspace...`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Launch Portal Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>

                  <button
                    onClick={() => {
                      setLoggedInUser(null);
                      setIdentifier('');
                      setPassword('');
                    }}
                    className="w-full py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-charcoal-700 font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3 text-gray-500" />
                    <span>Switch User / Log Out</span>
                  </button>
                </div>
              </div>

            ) : (

              /* ── COMPACT LOGIN FORM (Matching Image 2) ── */
              <div>
                
                {/* Form Header with High-Clarity Crest Logo */}
                <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-white ring-2 ring-[#C5A880] shadow-md flex items-center justify-center p-1 mx-auto mb-2.5">
                    <img
                      src="/gis-crest.jpg"
                      alt="Greenfield International School Crest"
                      className="w-full h-full object-contain select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B2E23] tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Login to your Greenfield International School account
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-3.5">
                  
                  {/* Email / User ID field */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-800 mb-1">
                      Email / User ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or user ID"
                        className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-800 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-[11px] font-semibold text-forest-800 hover:text-forest-950 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Login</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                </form>

                {/* Administrative Registration Notice */}
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <p className="text-[11px] text-gray-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => alert("User account creation is managed centrally by the GIS Administration. Teachers, Principals, Vice Principals, Students, and Parents are provisioned through IT Administration.")}
                      className="font-bold text-forest-800 hover:text-forest-950 underline cursor-pointer"
                    >
                      Contact Administrator
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
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
