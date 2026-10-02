import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';

export default function LoginForm({ onSubmit, loading, onForgotPassword }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    onSubmit?.(identifier, password);
  };

  return (
    <div>
      {/* Form Header with High-Clarity, Prominent Crest Logo */}
      <div className="flex flex-col items-center text-center mb-4 sm:mb-4.5">
        <div className="relative mb-2.5">
          <div className="absolute inset-0 rounded-full bg-[#C5A880]/25 blur-md transform scale-110" />
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-[#FAF7F2] ring-[2.5px] ring-[#C5A880] shadow-lg flex items-center justify-center p-1">
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
        <p className="text-xs text-gray-500 mt-1">
          Login to your Greenfield International School account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
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
  );
}
