import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, GraduationCap, UserCheck, Shield } from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { DEMO_ACCOUNTS } from '../hooks/useAuth';

export default function LoginForm({ onSubmit, loading, onForgotPassword, onQuickDemoLogin }) {
  const [identifier, setIdentifier] = useState('rajesh.gupta@gisedu.in');
  const [password, setPassword] = useState('RajeshGuptgis2026');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    onSubmit?.(identifier, password);
  };

  const handleFillDemo = (accountKey) => {
    const acc = DEMO_ACCOUNTS[accountKey];
    if (acc) {
      setIdentifier(acc.email);
      setPassword(acc.password);
    }
  };

  return (
    <div>
      {/* Form Header with High-Clarity, Prominent Crest Logo */}
      <div className="flex flex-col items-center text-center mb-3.5">
        <div className="relative mb-2">
          <div className="absolute inset-0 rounded-full bg-[#C5A880]/25 blur-md transform scale-110" />
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#FAF7F2] ring-[2.5px] ring-[#C5A880] shadow-md flex items-center justify-center p-1">
            <img
              src="/gis-crest.jpg"
              alt="Greenfield International School Crest"
              className="w-full h-full object-contain mix-blend-multiply scale-105 select-none pointer-events-none drop-shadow-xs"
              draggable={false}
            />
          </div>
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B2E23] tracking-tight leading-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Login to your Greenfield International School account
        </p>
      </div>

      {/* ── 1-CLICK DEMO FILL CHIPS ── */}
      <div className="mb-3.5 p-2 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/40">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6218] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-600" />
            Quick Demo Autofill
          </span>
          <span className="text-[9.5px] text-gray-400">Click to fill</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo('STUDENT')}
            className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
              identifier.includes('aarav') || identifier.includes('student')
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border-gray-200'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('TEACHER')}
            className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
              identifier.includes('rajesh') || identifier.includes('teacher')
                ? 'bg-[#0D3B2E] text-white border-forest-950 shadow-xs'
                : 'bg-white text-gray-700 hover:bg-forest-50 border-gray-200'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            <span>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('ADMIN')}
            className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
              identifier.includes('admin')
                ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                : 'bg-white text-gray-700 hover:bg-amber-50 border-gray-200'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
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
              placeholder="e.g. rajesh.gupta@gisedu.in"
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400 font-sans"
            />
          </div>
        </div>

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
              placeholder="e.g. RajeshGuptgis2026"
              className="w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400 font-mono"
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

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[11px] font-semibold text-forest-800 hover:text-forest-950 transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Login to Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Administrative Registration Notice */}
      <div className="mt-3.5 pt-2.5 border-t border-gray-100 text-center">
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
  );
}
