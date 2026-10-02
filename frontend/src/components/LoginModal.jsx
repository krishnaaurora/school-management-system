import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import GisEmblem from './GisEmblem';

export default function LoginModal({ isOpen, onClose }) {
  const [role, setRole] = useState('parent'); // 'parent' | 'student' | 'staff'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 600);
  };

  const handleDemoLogin = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'parent') {
      setIdentifier('parent.anand@greenfieldis.edu');
    } else if (selectedRole === 'student') {
      setIdentifier('GIS-2026-0421');
    } else {
      setIdentifier('faculty.kiran@greenfieldis.edu');
    }
    setPassword('••••••••••••');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 500);
  };

  const handleReset = () => {
    setLoggedIn(false);
    setIdentifier('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-ivory-border overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-forest-900 text-ivory p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-ivory/70 hover:text-ivory hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <GisEmblem size="sm" />
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory leading-tight">
                Greenfield Portal Login
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                Single Sign-On (SSO) Gateway
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {loggedIn ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-forest-50 border border-forest-800/20 text-forest-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-forest-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950 mb-1">
                Welcome to Greenfield Portal
              </h3>
              <p className="text-xs text-charcoal-600 mb-6">
                Authenticated successfully as <strong className="capitalize">{role}</strong> ({identifier || 'Demo User'}).
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 hover:bg-forest-800 rounded-md transition-colors"
                >
                  Enter Dashboard
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
                >
                  Sign Out / Switch Account
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-ivory-dark p-1 rounded-lg mb-5 text-xs font-semibold text-charcoal-700">
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`py-1.5 rounded-md transition-all ${
                    role === 'parent'
                      ? 'bg-forest-900 text-ivory shadow-sm'
                      : 'hover:text-forest-900'
                  }`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-1.5 rounded-md transition-all ${
                    role === 'student'
                      ? 'bg-forest-900 text-ivory shadow-sm'
                      : 'hover:text-forest-900'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  className={`py-1.5 rounded-md transition-all ${
                    role === 'staff'
                      ? 'bg-forest-900 text-ivory shadow-sm'
                      : 'hover:text-forest-900'
                  }`}
                >
                  Staff
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    {role === 'student'
                      ? 'Student ID / Roll No'
                      : role === 'parent'
                      ? 'Registered Parent Email'
                      : 'Faculty / Staff ID'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
                      {role === 'parent' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </span>
                    <input
                      type={role === 'parent' ? 'email' : 'text'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder={
                        role === 'parent'
                          ? 'parent@example.com'
                          : role === 'student'
                          ? 'e.g. GIS-2026-0421'
                          : 'e.g. FAC-BIO-108'
                      }
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-ivory/50 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-forest-800 hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-ivory/50 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 hover:bg-forest-800 rounded-md shadow-sm transition-all"
                  >
                    <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                </div>
              </form>

              {/* Demo Quick Logins */}
              <div className="mt-5 pt-4 border-t border-ivory-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                    Quick Demo Access:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('parent')}
                    className="flex-1 py-1.5 text-[10px] font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-800/15 rounded transition-colors"
                  >
                    Demo Parent
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student')}
                    className="flex-1 py-1.5 text-[10px] font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-800/15 rounded transition-colors"
                  >
                    Demo Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('staff')}
                    className="flex-1 py-1.5 text-[10px] font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-800/15 rounded transition-colors"
                  >
                    Demo Staff
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
