import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, GraduationCap, Building2, Calendar, 
  ClipboardCheck, Mail, Sparkles, RefreshCw, Bell, BarChart3, 
  Settings, LogOut, CheckCircle2, AlertTriangle, Clock, ArrowRight, 
  Search, Filter, ChevronRight, X, UserCheck, Shield, ChevronDown,
  Check, FileText, Bot, AlertCircle, ArrowUpRight, Phone, Award
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { 
  INITIAL_LEAVE_REQUESTS, TEACHERS_LIST, STUDENTS_LIST, 
  TIMETABLE_SCHEDULE, AI_SAMPLE_QUERIES 
} from '../../../data/adminData';

export default function AdminPortal({ onLogout, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'students' | 'teachers' | 'classes' | 'timetable' | 'attendance' | 'leaves' | 'ai-insights' | 'substitute-planner' | 'notifications' | 'reports' | 'settings'
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [leaveFilter, setLeaveFilter] = useState('Pending'); // 'Pending' | 'Approved' | 'Rejected'
  const [notificationToast, setNotificationToast] = useState(null);

  // Search and filter states
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('All');
  const [timetableClassFilter, setTimetableClassFilter] = useState('8-A');
  const [timetableDayFilter, setTimetableDayFilter] = useState('Monday');
  const [aiQueryInput, setAiQueryInput] = useState('');
  const [aiCustomAnswers, setAiCustomAnswers] = useState([]);

  // Toast Notification Helper
  const showToast = (message, type = 'success') => {
    setNotificationToast({ message, type });
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Leave Approval Action
  const handleApproveLeave = (leaveId) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === leaveId ? { ...req, status: 'Approved' } : req))
    );
    setSelectedLeave(null);
    showToast(`Leave Request ${leaveId} Approved & Live Substitutions Activated!`);
  };

  // Leave Rejection Action
  const handleRejectLeave = (leaveId) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === leaveId ? { ...req, status: 'Rejected' } : req))
    );
    setSelectedLeave(null);
    showToast(`Leave Request ${leaveId} Rejected.`, 'error');
  };

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved');
  const rejectedLeaves = leaveRequests.filter((l) => l.status === 'Rejected');

  // AI Query Handler
  const handleAskAI = (queryText) => {
    const q = queryText || aiQueryInput;
    if (!q.trim()) return;

    const matched = AI_SAMPLE_QUERIES.find((item) =>
      item.query.toLowerCase().includes(q.toLowerCase().slice(0, 10))
    );

    const answerObj = {
      id: Date.now(),
      query: q,
      answer: matched
        ? matched.answer
        : `Verified Institutional Record: Query processed across 68 faculty and 1,248 student profiles. No active compliance or timetable bottlenecks recorded for '${q}'.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiCustomAnswers([answerObj, ...aiCustomAnswers]);
    setAiQueryInput('');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1C2826] font-sans flex flex-col antialiased">
      
      {/* ── 1. TRANSPARENT / GLASSMORPHIC ADMIN TOP NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#C5A880]/30 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        
        {/* Left: Brand + Command Center Badge */}
        <div className="flex items-center gap-3.5">
          <div className="cursor-pointer flex items-center gap-3" onClick={() => setActiveTab('dashboard')}>
            <GisEmblem size="md" className="ring-1.5 ring-gold-500/50 shadow-sm" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#0B2E23] leading-tight">
                GREENFIELD
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-plus text-[#8C6218] font-semibold">
                Operations Command Center
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Academic Session 2026–27 Live</span>
          </div>
        </div>

        {/* Right: Notifications, Assistant, Admin Profile & Sign Out */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Notifications Icon with pending badge */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-xl bg-white/80 hover:bg-white text-gray-700 hover:text-[#0B2E23] border border-gray-200/80 transition-all cursor-pointer shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingLeaves.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {pendingLeaves.length}
              </span>
            )}
          </button>

          {/* AI Intelligence quick access */}
          <button
            onClick={() => setActiveTab('ai-insights')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>AI Insights</span>
          </button>

          {/* Admin User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#0D3B2E] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-gray-900 leading-tight">Admin GIS</span>
              <span className="text-[10px] text-gray-500">Super Administrator</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors ml-1 cursor-pointer"
              title="Logout from Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ── 2. MAIN LAYOUT: SIDEBAR + CONTENT AREA ── */}
      <div className="flex-1 pt-16 flex overflow-hidden">
        
        {/* ── SIDEBAR ── */}
        <aside className="w-64 bg-white border-r border-gray-200/80 flex flex-col justify-between py-6 px-4 shrink-0 overflow-y-auto hidden md:flex">
          <div className="space-y-6">
            
            {/* Main Menu */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Main
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'students', label: 'Students', icon: GraduationCap },
                  { id: 'teachers', label: 'Teachers', icon: Users },
                  { id: 'classes', label: 'Classes & Sections', icon: Building2 },
                  { id: 'timetable', label: 'Timetable', icon: Calendar },
                  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0D3B2E] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Operations Menu (HIGHLIGHTED / PROMINENT) */}
            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C6218]">
                  Operations & Leave AI
                </p>
                {pendingLeaves.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                    {pendingLeaves.length}
                  </span>
                )}
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'leaves', label: 'Leave Requests', icon: Mail, badge: pendingLeaves.length },
                  { id: 'ai-insights', label: 'AI Leave Analysis', icon: Sparkles },
                  { id: 'substitute-planner', label: 'Substitute Planner', icon: RefreshCw },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0D3B2E] text-white shadow-sm'
                          : 'text-gray-700 bg-[#FAF8F3] hover:bg-[#F2EFE8] hover:text-[#0B2E23] border border-[#C5A880]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-[#96661E]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Reports & System */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Reports & System
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
                  { id: 'settings', label: 'School Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0D3B2E] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

          </div>

          {/* Quick Footer */}
          <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
            <span className="text-[11px]">GIS Portal v2.4</span>
            <button onClick={onNavigateHome} className="text-forest-800 hover:underline text-[11px] font-semibold">
              Public Site &rarr;
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ROUTER ── */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Toast Notification */}
          <AnimatePresence>
            {notificationToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-18 right-8 z-50 px-4 py-3 rounded-xl shadow-xl text-xs font-bold text-white flex items-center gap-2.5 ${
                  notificationToast.type === 'error' ? 'bg-red-700' : 'bg-forest-900 border border-gold-400/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>{notificationToast.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Tab Quick Nav */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-3 mb-4 scrollbar-none">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'leaves', label: `Leaves (${pendingLeaves.length})` },
              { id: 'substitute-planner', label: 'Substitute Planner' },
              { id: 'teachers', label: 'Teachers' },
              { id: 'students', label: 'Students' },
              { id: 'timetable', label: 'Timetable' },
              { id: 'ai-insights', label: 'AI Insights' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-forest-900 text-white' : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── 1. DASHBOARD VIEW ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Greeting */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                  Good morning, Administrator 👋
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Here's what's happening across Greenfield International School today.
                </p>
              </div>

              {/* 4 Key Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: "Total Students", value: "1,248", icon: GraduationCap, trend: "+12 this term", color: "text-blue-700", bg: "bg-blue-50/80" },
                  { label: "Faculty & Teachers", value: "68", icon: Users, trend: "4 on leave/sub", color: "text-emerald-700", bg: "bg-emerald-50/80" },
                  { label: "Active Classes", value: "42", icon: Building2, trend: "Grades 1 to 12", color: "text-purple-700", bg: "bg-purple-50/80" },
                  { label: "Pending Leave Requests", value: pendingLeaves.length.toString(), icon: AlertCircle, trend: "Requires action today", color: "text-amber-700", bg: "bg-amber-50/80" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-500">{stat.label}</span>
                        <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        {stat.trend}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ⚠️ ACTION REQUIRED: Leave Requests Need Attention */}
              {pendingLeaves.length > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-xs">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                            ACTION REQUIRED
                          </span>
                          <span className="text-xs text-amber-800 font-semibold">
                            {pendingLeaves.length} teacher leave requests need your review
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">
                          Ananya Sharma, Vikram Sengupta and Pooja Hegde have submitted leaves affecting 9 scheduled periods. AI substitute impact analysis is ready.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('leaves')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                    >
                      <span>Review Leave Requests</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2 Column Operations Grid: Today's Schedule & Attendance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Today's Schedule Overview (2 Cols) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-base text-gray-900">Today's Class Schedule & Coverage</h3>
                      <p className="text-xs text-gray-500">Live period status across campus</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('timetable')}
                      className="text-xs font-semibold text-forest-800 hover:underline cursor-pointer"
                    >
                      View Timetable &rarr;
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { period: "Period 1 (08:30 - 09:15)", status: "Active & Covered", badge: "✓ On Schedule", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
                      { period: "Period 2 (09:15 - 10:00)", status: "Active & Covered", badge: "✓ On Schedule", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
                      { period: "Period 3 (10:15 - 11:00)", status: "Substitution Active", badge: "⚠ Sub: Suresh Menon", color: "bg-amber-50 text-amber-800 border-amber-200" },
                      { period: "Period 4 (11:00 - 11:45)", status: "Upcoming Session", badge: "Scheduled", color: "bg-gray-50 text-gray-700 border-gray-200" },
                      { period: "Period 5 (12:30 - 01:15)", status: "Upcoming Session", badge: "Scheduled", color: "bg-gray-50 text-gray-700 border-gray-200" },
                      { period: "Period 6 (01:15 - 02:00)", status: "Upcoming Session", badge: "Scheduled", color: "bg-gray-50 text-gray-700 border-gray-200" },
                    ].map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs">
                        <span className="font-semibold text-gray-800">{p.period}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 hidden sm:inline">{p.status}</span>
                          <span className={`px-2.5 py-1 rounded-md font-bold text-[11px] border ${p.color}`}>
                            {p.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance Overview (1 Col) */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-gray-900 mb-1">Attendance Overview</h3>
                    <p className="text-xs text-gray-500 mb-5">Today's campus telemetry</p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-700">Present</span>
                          <span className="text-gray-900">94% (1,173)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-red-700">Absent</span>
                          <span className="text-gray-900">4% (52)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '4%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-amber-700">Late / Excused</span>
                          <span className="text-gray-900">2% (23)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '2%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6">
                    <button
                      onClick={() => setActiveTab('attendance')}
                      className="w-full py-2.5 rounded-xl border border-forest-800/30 text-forest-900 hover:bg-forest-50 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Full Attendance Log &rarr;
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ── 2. LEAVE REQUESTS & AI LEAVE IMPACT ANALYSIS (CORE SHOWCASE) ── */}
          {activeTab === 'leaves' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                    Teacher Leave Requests & AI Intelligence
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Evaluate teacher leaves, analyze class impact, and approve AI-recommended substitute schedules.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  {[
                    { id: 'Pending', label: `Pending (${pendingLeaves.length})` },
                    { id: 'Approved', label: `Approved (${approvedLeaves.length})` },
                    { id: 'Rejected', label: `Rejected (${rejectedLeaves.length})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setLeaveFilter(f.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        leaveFilter === f.id
                          ? 'bg-[#0D3B2E] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Leave Requests */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4 sm:px-6">Teacher</th>
                        <th className="py-3.5 px-4">Department</th>
                        <th className="py-3.5 px-4">Leave Date</th>
                        <th className="py-3.5 px-4 text-center">Classes Affected</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leaveRequests
                        .filter((l) => l.status === leaveFilter)
                        .map((leave) => (
                          <tr
                            key={leave.id}
                            className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                            onClick={() => setSelectedLeave(leave)}
                          >
                            <td className="py-3.5 px-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <img
                                  src={leave.avatar}
                                  alt={leave.teacherName}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <span className="font-bold text-gray-900 block">{leave.teacherName}</span>
                                  <span className="text-[11px] text-gray-500 font-mono">{leave.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-gray-700">{leave.department}</td>
                            <td className="py-3.5 px-4 font-medium text-gray-800">{leave.leaveDateFormatted}</td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold text-[11px]">
                                {leave.classesAffectedCount} Classes
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                  leave.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-800'
                                    : leave.status === 'Approved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {leave.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLeave(leave);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                                <span>AI Impact Analysis</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {leaveRequests.filter((l) => l.status === leaveFilter).length === 0 && (
                  <div className="py-12 text-center text-gray-500 text-xs">
                    No {leaveFilter.toLowerCase()} leave requests found.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ── 3. SUBSTITUTE PLANNER MATRIX VIEW ── */}
          {activeTab === 'substitute-planner' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                    Daily Substitute Master Matrix
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Visual timetable distribution for October 3, 2026 showing teacher absence and substitution slots.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-forest-900 shadow-2xs">
                  📅 Date: October 3, 2026 (Tomorrow)
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-700 font-bold uppercase text-[11px]">
                        <th className="py-3 px-4 text-left">Teacher</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">P1 (08:30)</th>
                        <th className="py-3 px-3">P2 (09:15)</th>
                        <th className="py-3 px-3">P3 (10:15)</th>
                        <th className="py-3 px-3">P4 (11:00)</th>
                        <th className="py-3 px-3">P5 (12:30)</th>
                        <th className="py-3 px-3">P6 (01:15)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      
                      {/* Absent Teacher 1 */}
                      <tr className="bg-red-50/40">
                        <td className="py-3 px-4 text-left font-bold text-red-900">
                          Ananya Sharma (Math)
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-bold">
                            ABSENT
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-400">Free</td>
                        <td className="py-3 px-3 font-bold text-red-700 bg-red-100/60 rounded">8-A Math ⚠</td>
                        <td className="py-3 px-3 text-gray-400">Free</td>
                        <td className="py-3 px-3 font-bold text-red-700 bg-red-100/60 rounded">9-B Math ⚠</td>
                        <td className="py-3 px-3 text-gray-400">Free</td>
                        <td className="py-3 px-3 font-bold text-red-700 bg-red-100/60 rounded">10-A Math ⚠</td>
                      </tr>

                      {/* Substitute 1: Rahul Verma */}
                      <tr className="hover:bg-emerald-50/30">
                        <td className="py-3 px-4 text-left font-bold text-gray-900">
                          Rahul Verma (Math/Phys)
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            COVERING
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium">8-A</td>
                        <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-100 rounded border border-emerald-300">
                          SUB: 8-A (Math)
                        </td>
                        <td className="py-3 px-3 font-medium">9-A</td>
                        <td className="py-3 px-3 text-emerald-700 font-semibold">Free</td>
                        <td className="py-3 px-3 font-medium">10-B</td>
                        <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-100 rounded border border-emerald-300">
                          SUB: 10-A (Math)
                        </td>
                      </tr>

                      {/* Substitute 2: Priya Nair */}
                      <tr className="hover:bg-emerald-50/30">
                        <td className="py-3 px-4 text-left font-bold text-gray-900">
                          Priya Nair (Math/Comp)
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            COVERING
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium">7-B</td>
                        <td className="py-3 px-3 font-medium">8-C</td>
                        <td className="py-3 px-3 text-emerald-700 font-semibold">Free</td>
                        <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-100 rounded border border-emerald-300">
                          SUB: 9-B (Math)
                        </td>
                        <td className="py-3 px-3 font-medium">9-A</td>
                        <td className="py-3 px-3 font-medium">10-B</td>
                      </tr>

                      {/* Other Faculty */}
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-left font-bold text-gray-900">
                          Suresh Menon (Science)
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 text-[10px] font-bold">
                            REGULAR
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-100 rounded border border-emerald-300">
                          SUB: 10-B (Phys)
                        </td>
                        <td className="py-3 px-3 font-medium">8-A</td>
                        <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-100 rounded border border-emerald-300">
                          SUB: 9-A (Phys)
                        </td>
                        <td className="py-3 px-3 font-medium">8-A</td>
                        <td className="py-3 px-3 text-gray-400">Free</td>
                        <td className="py-3 px-3 font-medium">10-A</td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-left font-bold text-gray-900">
                          Arun Kulkarni (Humanities)
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 text-[10px] font-bold">
                            REGULAR
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium">10-A</td>
                        <td className="py-3 px-3 font-medium">7-A</td>
                        <td className="py-3 px-3 font-medium">8-B</td>
                        <td className="py-3 px-3 font-medium">9-C</td>
                        <td className="py-3 px-3 text-gray-400">Free</td>
                        <td className="py-3 px-3 font-medium">8-A</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ── 4. TEACHERS DIRECTORY VIEW ── */}
          {activeTab === 'teachers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                    Faculty & Teachers Directory
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Manage 68 faculty members, qualifications, assigned workloads, and availability matrices.
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    placeholder="Search teacher by name or subject..."
                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-800 w-64 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {TEACHERS_LIST
                  .filter((t) =>
                    t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                    t.subject.toLowerCase().includes(teacherSearch.toLowerCase())
                  )
                  .map((teacher) => (
                    <div
                      key={teacher.id}
                      onClick={() => setSelectedTeacher(teacher)}
                      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-gold-400/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-forest-800/15"
                          />
                          <div>
                            <h3 className="font-bold text-sm text-gray-900 leading-tight">{teacher.name}</h3>
                            <p className="text-xs text-forest-800 font-semibold">{teacher.subject}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-gray-600 bg-[#FAF8F3] p-3 rounded-xl mb-4">
                          <div className="flex justify-between">
                            <span>Classes:</span>
                            <strong className="text-gray-900">{teacher.classes}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekly Load:</span>
                            <strong className="text-gray-900">{teacher.weeklyPeriods} Periods</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Attendance:</span>
                            <strong className="text-emerald-700">{teacher.attendance}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          teacher.status.includes('Leave') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {teacher.status}
                        </span>
                        <span className="text-forest-800 font-semibold">View Profile &rarr;</span>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ── 5. STUDENTS DIRECTORY VIEW ── */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                    Students Directory
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Overview of 1,248 enrolled students across all grades and sections.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      placeholder="Search student by name..."
                      className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-800 w-56 shadow-2xs"
                    />
                  </div>

                  <select
                    value={studentClassFilter}
                    onChange={(e) => setStudentClassFilter(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-800 shadow-2xs"
                  >
                    <option value="All">All Classes</option>
                    <option value="10-A">Grade 10-A</option>
                    <option value="9-B">Grade 9-B</option>
                    <option value="8-A">Grade 8-A</option>
                    <option value="8-B">Grade 8-B</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F3] border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px]">
                      <th className="py-3.5 px-6">Roll No</th>
                      <th className="py-3.5 px-4">Student Name</th>
                      <th className="py-3.5 px-4">Class & Section</th>
                      <th className="py-3.5 px-4">Attendance</th>
                      <th className="py-3.5 px-4">GPA</th>
                      <th className="py-3.5 px-4">Guardian Contact</th>
                      <th className="py-3.5 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {STUDENTS_LIST
                      .filter((s) =>
                        (studentClassFilter === 'All' || s.classId === studentClassFilter) &&
                        s.name.toLowerCase().includes(studentSearch.toLowerCase())
                      )
                      .map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <td className="py-3.5 px-6 font-mono font-bold text-gray-600">{student.rollNo}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">{student.name}</td>
                          <td className="py-3.5 px-4 font-semibold text-forest-800">{student.classId}</td>
                          <td className="py-3.5 px-4">
                            <span className={`font-bold ${parseInt(student.attendance) < 80 ? 'text-red-600' : 'text-emerald-700'}`}>
                              {student.attendance}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-semibold">{student.gpa}</td>
                          <td className="py-3.5 px-4 text-gray-600">
                            {student.parentName} ({student.parentPhone})
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              student.status === 'Warning' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ── 6. TIMETABLE VIEW ── */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                    Master Timetable Matrix
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Live schedule filterable by grade, teacher, and day of the week.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={timetableClassFilter}
                    onChange={(e) => setTimetableClassFilter(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-2xs"
                  >
                    <option value="8-A">Grade 8-A</option>
                    <option value="9-B">Grade 9-B</option>
                    <option value="10-A">Grade 10-A</option>
                  </select>

                  <select
                    value={timetableDayFilter}
                    onChange={(e) => setTimetableDayFilter(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-2xs"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-gray-900">
                    Schedule for {timetableClassFilter} &bull; {timetableDayFilter}
                  </h3>
                  <span className="text-xs text-gray-500">6 Periods Scheduled</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(TIMETABLE_SCHEDULE[timetableClassFilter]?.[timetableDayFilter] || []).map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF8F3] border border-gray-200/80 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="font-bold uppercase tracking-wider text-forest-800">
                          Period {idx + 1}
                        </span>
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                      </div>
                      <div className="font-bold text-sm text-gray-900">{slot}</div>
                      <div className="mt-3 pt-2 border-t border-gray-200/60 text-[11px] text-gray-500 flex justify-between">
                        <span>Status: Live</span>
                        <span className="text-emerald-700 font-semibold">Covered</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── 7. AI INSIGHTS & ANALYTICS VIEW ── */}
          {activeTab === 'ai-insights' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E23]">
                  AI School Operations Insights
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Query authorized academic records, faculty workloads, leave impact, and attendance telemetry.
                </p>
              </div>

              {/* Natural Language Query Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskAI(aiQueryInput);
                  }}
                  className="flex gap-2.5"
                >
                  <div className="relative flex-1">
                    <Sparkles className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-600" />
                    <input
                      type="text"
                      value={aiQueryInput}
                      onChange={(e) => setAiQueryInput(e.target.value)}
                      placeholder="Ask AI: e.g. Which teachers have free periods tomorrow? or Attendance trends..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                </form>

                {/* Preset Suggestions */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="text-gray-400 text-[11px] font-semibold py-1">Sample Queries:</span>
                  {AI_SAMPLE_QUERIES.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskAI(q.query)}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-forest-50 hover:text-forest-900 text-gray-700 text-[11px] transition-colors cursor-pointer"
                    >
                      &ldquo;{q.query}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Answers Stream */}
              <div className="space-y-4">
                {aiCustomAnswers.map((ans) => (
                  <div key={ans.id} className="bg-white p-5 rounded-2xl border border-gold-300/40 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0B2E23]">
                      <Bot className="w-4 h-4 text-gold-600" />
                      <span>{ans.query}</span>
                      <span className="text-gray-400 text-[10px] ml-auto">{ans.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#FAF8F3] p-4 rounded-xl border border-gray-200">
                      {ans.answer}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ── 8. OTHER TABS (Classes, Attendance, Notifications, Reports, Settings) ── */}
          {(activeTab === 'classes' || activeTab === 'attendance' || activeTab === 'notifications' || activeTab === 'reports' || activeTab === 'settings') && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-xl text-[#0B2E23] capitalize">
                {activeTab.replace('-', ' ')} Hub
              </h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                Live institutional feeds for {activeTab.replace('-', ' ')} are synced with central database. Use the primary <strong>Leave Requests & AI Substitute Engine</strong> for active operations.
              </p>
              <button
                onClick={() => setActiveTab('leaves')}
                className="px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                Go to Leave Requests
              </button>
            </div>
          )}

        </main>

      </div>

      {/* ── 3. DETAILED AI LEAVE IMPACT ANALYSIS MODAL (CORE SHOWCASE) ── */}
      <AnimatePresence>
        {selectedLeave && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto relative"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedLeave.avatar}
                    alt={selectedLeave.teacherName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-forest-800/20"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Leave Impact Assessment
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#0B2E23] mt-1">
                      {selectedLeave.teacherName}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {selectedLeave.subject} &bull; {selectedLeave.leaveDateFormatted} &bull; {selectedLeave.type}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLeave(null)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Leave Reason Note */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 mb-6">
                <strong>Reason:</strong> {selectedLeave.reason}
              </div>

              {/* Section 1: Classes Affected */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>Scheduled Classes Requiring Substitute Coverage ({selectedLeave.affectedPeriods.length} Periods)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedLeave.affectedPeriods.map((slot, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-red-50/70 border border-red-200/80 text-xs">
                      <div className="flex justify-between font-bold text-red-900 mb-1">
                        <span>{slot.period} ({slot.time})</span>
                        <span>{slot.classId}</span>
                      </div>
                      <div className="font-semibold text-gray-800">{slot.subject}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{slot.room} &bull; {slot.topic}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: AI Constraint & Conflict Checks */}
              <div className="mb-6 bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-gold-300/40">
                <div className="flex items-center gap-2 mb-3 text-[#0B2E23]">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <h3 className="font-serif font-bold text-sm">AI Substitution Constraint Engine</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs mb-3">
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free Schedule Validated</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Subject Match Verified</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>0 Timetable Conflicts</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Workload Balanced</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">
                  {selectedLeave.aiAnalysis.aiExplanation}
                </p>
              </div>

              {/* Section 3: Recommended Substitution Plan */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>AI Recommended Substitution Schedule</span>
                </h3>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold text-[11px]">
                        <th className="py-2.5 px-4">Period</th>
                        <th className="py-2.5 px-4">Class</th>
                        <th className="py-2.5 px-4">Subject</th>
                        <th className="py-2.5 px-4">Assigned Substitute</th>
                        <th className="py-2.5 px-4">Match Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedLeave.aiAnalysis.recommendedPlan.map((plan, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/40">
                          <td className="py-2.5 px-4 font-bold text-forest-900">{plan.period}</td>
                          <td className="py-2.5 px-4 font-semibold">{plan.classId}</td>
                          <td className="py-2.5 px-4 text-gray-600">{plan.subject}</td>
                          <td className="py-2.5 px-4 font-bold text-emerald-800">{plan.teacherName}</td>
                          <td className="py-2.5 px-4 text-gray-600">{plan.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4: Admin Decision Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleRejectLeave(selectedLeave.id)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Reject Leave
                </button>

                <button
                  onClick={() => alert("Simulation adjustments active. You can re-assign specific periods in the substitute planner.")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Modify Plan
                </button>

                <button
                  onClick={() => handleApproveLeave(selectedLeave.id)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-[#07241B] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-gold-400" />
                  <span>Approve & Activate Live Substitutions</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. TEACHER PROFILE MODAL ── */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <img
                src={selectedTeacher.avatar}
                alt={selectedTeacher.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-forest-800"
              />
              <h3 className="font-serif font-bold text-xl text-[#0B2E23]">{selectedTeacher.name}</h3>
              <p className="text-xs text-forest-800 font-semibold">{selectedTeacher.subject} &bull; {selectedTeacher.department}</p>
            </div>

            <div className="space-y-2 text-xs bg-[#FAF8F3] p-4 rounded-xl border border-gray-200 mb-5">
              <div className="flex justify-between">
                <span>Qualifications:</span>
                <strong className="text-gray-900">{selectedTeacher.qualifications}</strong>
              </div>
              <div className="flex justify-between">
                <span>Assigned Classes:</span>
                <strong className="text-gray-900">{selectedTeacher.classes}</strong>
              </div>
              <div className="flex justify-between">
                <span>Free Slots Tomorrow:</span>
                <strong className="text-emerald-700">{selectedTeacher.freePeriodsTomorrow.join(', ')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Contact Email:</span>
                <strong className="text-gray-900 font-mono">{selectedTeacher.email}</strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedTeacher(null)}
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
