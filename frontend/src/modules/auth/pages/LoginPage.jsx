import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, LogOut, KeyRound, AlertCircle, Sparkles, GraduationCap, UserCheck, Shield } from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import LoginForm from '../components/LoginForm';
import { useAuth, DEMO_ACCOUNTS } from '../hooks/useAuth';

export default function LoginPage({ onNavigateHome, onLoginSuccess }) {
  const { user: loggedInUser, loading, login, logout } = useAuth();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (identifier, password) => {
    setErrorMessage(null);
    try {
      const res = await login(identifier, password);
      const user = res?.user || res?.data?.user;
      const role = (user?.role || '').toUpperCase();

      if (onLoginSuccess && user) {
        onLoginSuccess(role, user);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password');
    }
  };

  const handleQuickDemoLaunch = (roleKey) => {
    const demo = DEMO_ACCOUNTS[roleKey];
    if (demo) {
      handleLogin(demo.email, demo.password);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F5EF] relative overflow-x-hidden font-sans">
      
      {/* ── TRANSPARENT TOP HEADER (Brand Only) ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-transparent border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <GisEmblem size="md" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-white leading-tight drop-shadow-sm">
              GREENFIELD
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-plus text-gold-300 font-semibold drop-shadow-sm">
              International School
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-white/85 hover:text-white transition-all px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 cursor-pointer"
            >
              School Website &rarr;
            </button>
          )}
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/55 to-forest-950/75 lg:to-forest-950/60" />
        </div>

        {/* LEFT COLUMN: School Mission & Quick Demo Launch Hub */}
        <div className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-8 lg:py-14 text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl space-y-4"
          >
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-gold-300 drop-shadow-sm">
                DISCIPLINE &bull; KNOWLEDGE &bull; CHARACTER
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
              Nurturing <br />
              <span className="italic text-gold-200">Brighter Tomorrows</span>
            </h1>

            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-lg drop-shadow-sm font-normal">
              A safe, inclusive and inspiring environment for holistic learning, intellectual rigor, and personal growth.
            </p>

            {/* ── 1-CLICK DEMO PORTAL SHORTCUTS ── */}
            <div className="pt-4 border-t border-white/15 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Instant 1-Click Demo Portal Launch</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. Student Portal */}
                <button
                  type="button"
                  onClick={() => handleQuickDemoLaunch('STUDENT')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all backdrop-blur-md group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <GraduationCap className="w-4 h-4 text-emerald-300" />
                    <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      Class 10-A
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-gold-200">
                    Student Portal
                  </p>
                  <p className="text-[10.5px] text-ivory/70">
                    Aarav Kumar
                  </p>
                </button>

                {/* 2. Teacher Portal (Dr. Rajesh Gupta) */}
                <button
                  type="button"
                  onClick={() => handleQuickDemoLaunch('TEACHER')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all backdrop-blur-md group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <UserCheck className="w-4 h-4 text-gold-300" />
                    <span className="text-[10px] text-gold-300 font-bold bg-amber-950/60 px-1.5 py-0.2 rounded border border-gold-500/30">
                      Faculty
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-gold-200">
                    Teacher Portal
                  </p>
                  <p className="text-[10.5px] text-ivory/70">
                    Dr. Rajesh Gupta
                  </p>
                </button>

                {/* 3. Admin Portal */}
                <button
                  type="button"
                  onClick={() => handleQuickDemoLaunch('ADMIN')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all backdrop-blur-md group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Shield className="w-4 h-4 text-amber-300" />
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30">
                      Central
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-gold-200">
                    Admin Portal
                  </p>
                  <p className="text-[10.5px] text-ivory/70">
                    Administrator
                  </p>
                </button>
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: Clean, Balanced Login Card */}
        <div className="relative z-10 w-full lg:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6 relative overflow-hidden"
          >
            {errorMessage && (
              <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {loggedInUser ? (
              <div className="py-2 text-center">
                <div className="w-14 h-14 rounded-full bg-forest-50 border-2 border-forest-800/30 flex items-center justify-center mx-auto mb-2.5">
                  <CheckCircle2 className="w-8 h-8 text-forest-800" />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border border-forest-800/20 bg-forest-50 text-forest-900">
                  {loggedInUser.role}
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0B2E23] mb-0.5">
                  Welcome, {loggedInUser.name}
                </h2>
                <p className="text-[11px] text-gray-500 mb-3.5 font-mono">
                  {loggedInUser.email}
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const role = (loggedInUser.role || '').toUpperCase();
                      if (onLoginSuccess) onLoginSuccess(role, loggedInUser);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Launch Portal Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>

                  <button
                    onClick={() => logout()}
                    className="w-full py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-charcoal-700 font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-gray-500" />
                    <span>Switch User / Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                onForgotPassword={() => setForgotPasswordOpen(true)}
              />
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
