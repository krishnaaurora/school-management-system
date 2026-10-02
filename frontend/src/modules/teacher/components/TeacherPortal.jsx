import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  CheckSquare, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  User,
  GraduationCap,
  RefreshCw,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  UserCheck,
  Award,
  Layers,
  Bot
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import GisAiAssistantLogo from '../../../components/ui/GisAiAssistantLogo';
import { useTeacherData } from '../hooks/useTeacherData';

// Subcomponents
import TeacherDashboard from './TeacherDashboard';
import TeacherTimetable from './TeacherTimetable';
import TeacherClasses from './TeacherClasses';
import TeacherStudents from './TeacherStudents';
import MarkAttendance from './MarkAttendance';
import SubmitLeave from './SubmitLeave';
import LeaveStatus from './LeaveStatus';
import SubstituteCoverage from './SubstituteCoverage';
import TeacherNotifications from './TeacherNotifications';
import TeacherProfile from './TeacherProfile';
import TeacherCopilotModal from './TeacherCopilotModal';
import LeaveLetterModal from '../../admin/components/LeaveLetterModal';

export default function TeacherPortal({ onLogout, onNavigate }) {
  const {
    profile,
    timetable,
    studentsRoster,
    leaves,
    notifications,
    loading,
    submitLeaveRequest,
    updateAttendance,
    bulkUpdateAttendance,
    setLeaves,
    setNotifications,
  } = useTeacherData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('10-A');
  const [viewingLeaveLetter, setViewingLeaveLetter] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;
  const pendingLeavesCount = leaves.filter(l => l.status === 'Pending').length;

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Categorized Navigation
  const navSections = [
    {
      title: 'Core Academic',
      items: [
        { id: 'dashboard', label: 'Faculty Dashboard', icon: Home },
        { id: 'timetable', label: 'My Timetable Matrix', icon: Calendar },
        { id: 'classes', label: 'My Classes & Syllabus', icon: BookOpen },
        { id: 'students', label: 'Student Roster', icon: Users },
        { id: 'attendance', label: 'Attendance Register', icon: CheckSquare },
      ]
    },
    {
      title: 'Leave & Substitutions',
      items: [
        { id: 'leave-request', label: 'Apply Formal Leave', icon: FileText, badge: 'AI Letter' },
        { id: 'leave-status', label: 'Leave Status & Letters', icon: Clock, badgeCount: pendingLeavesCount },
        { id: 'substitute', label: 'AI Substitute Coverage', icon: RefreshCw, badge: 'Live' },
      ]
    },
    {
      title: 'System & Account',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadNotificationsCount },
        { id: 'profile', label: 'Profile & Credentials', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-gray-900 flex flex-col font-sans selection:bg-forest-900 selection:text-gold-300">
      
      {/* ── TOP HEADER (GREENFIELD LUXURY HERITAGE DESIGN) ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Emblem, Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-forest-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <GisEmblem className="w-9 h-9" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-[#0B2E23] tracking-tight">
                    GREENFIELD
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Faculty Command Center
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider hidden sm:block">
                  Academic Session 2026–27 Live
                </p>
              </div>
            </div>
          </div>

          {/* Center: Greeting & Date */}
          <div className="hidden md:flex flex-col items-center">
            <span className="text-xs font-bold text-[#0B2E23]">
              {getGreeting()}, {profile.name}
            </span>
            <span className="text-[11px] text-gray-500">
              {currentDateFormatted}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* AI Assistant Quick Trigger */}
            <button
              type="button"
              onClick={() => setCopilotOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0B2E23] to-[#164e3f] text-gold-300 hover:text-gold-200 text-xs font-bold shadow-xs transition-all cursor-pointer border border-forest-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>AI Faculty Copilot</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl text-gray-600 hover:text-forest-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Profile Chip */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#C5A880]/40 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0B2E23] text-gold-300 font-bold text-xs flex items-center justify-center">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">{profile.name}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{profile.department}</p>
              </div>
            </div>

            {/* Sign Out */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign out of portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT: COLLAPSIBLE SIDEBAR + CONTENT ROUTER ── */}
      <div className="flex-1 flex relative min-h-[calc(100vh-4rem)]">
        
        {/* ── SIDEBAR NAVIGATION (STICKY WITH TOOLTIPS) ── */}
        <aside
          className={`bg-white border-r border-gray-200/80 hidden lg:flex flex-col justify-between py-5 px-3.5 shrink-0 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] z-30 ${
            sidebarCollapsed ? 'w-20 overflow-visible' : 'w-64 overflow-y-auto'
          }`}
        >
          <div className="space-y-5">
            
            {/* Collapse Toggle */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100">
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Faculty Navigation
                </span>
              )}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`p-1.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-forest-900 transition-colors cursor-pointer ${
                    sidebarCollapsed ? 'mx-auto' : ''
                  }`}
                >
                  {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                </button>
                {sidebarCollapsed && (
                  <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#0B2E23] text-gold-300 text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 z-50 border border-forest-700 flex items-center gap-1.5">
                    <span>Expand Sidebar</span>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0B2E23] rotate-45 border-l border-b border-forest-700" />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Groups */}
            {navSections.map((section, sIdx) => (
              <div key={sIdx}>
                {!sidebarCollapsed ? (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C6218] px-2 mb-2">
                    {section.title}
                  </p>
                ) : (
                  <div className="h-px bg-gray-200 my-2" />
                )}

                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <div key={item.id} className="relative group">
                        <button
                          type="button"
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center ${
                            sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
                          } py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#0D3B2E] text-white shadow-sm'
                              : 'text-gray-700 bg-[#FAF8F3] hover:bg-[#F2EFE8] hover:text-[#0B2E23] border border-[#C5A880]/20'
                          }`}
                        >
                          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-gold-400' : 'text-[#96661E]'}`} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                          </div>

                          {!sidebarCollapsed && item.badgeCount > 0 && (
                            <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                              {item.badgeCount}
                            </span>
                          )}

                          {!sidebarCollapsed && item.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isActive ? 'bg-white/20 text-gold-300' : 'bg-gold-100 text-[#8C6218] border border-gold-200'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>

                        {/* Collapsed Hover Tooltip */}
                        {sidebarCollapsed && (
                          <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0B2E23] text-gold-300 text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 z-50 border border-forest-700 flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badgeCount > 0 && (
                              <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded-full text-[9px] font-extrabold">
                                {item.badgeCount}
                              </span>
                            )}
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0B2E23] rotate-45 border-l border-b border-forest-700" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            ))}

          </div>

          {/* Quick Footer */}
          <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
            {!sidebarCollapsed && <span className="text-[11px]">GIS Faculty v2.4</span>}
            <div className="relative group mx-auto">
              <button 
                onClick={() => onNavigate?.('landing')} 
                className={`text-forest-800 hover:underline text-[11px] font-semibold ${sidebarCollapsed ? 'mx-auto' : ''}`}
              >
                {sidebarCollapsed ? '🌐' : 'Public Site →'}
              </button>
              {sidebarCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0B2E23] text-gold-300 text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 z-50 border border-forest-700 flex items-center gap-1.5">
                  <span>Public Site</span>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0B2E23] rotate-45 border-l border-b border-forest-700" />
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── MOBILE SIDEBAR DRAWER ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
                onClick={() => setMobileMenuOpen(false)} 
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="relative w-72 bg-white h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <GisEmblem className="w-8 h-8" />
                      <span className="font-serif font-bold text-sm text-[#0B2E23]">GIS Faculty</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-gray-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {navSections.map((sec, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C6218] px-2 mb-1.5">
                        {sec.title}
                      </p>
                      <nav className="space-y-1">
                        {sec.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                                isActive ? 'bg-[#0D3B2E] text-white' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-[#96661E]'}`} />
                                <span>{item.label}</span>
                              </div>
                              {item.badge && (
                                <span className="text-[10px] bg-gold-100 text-[#8C6218] px-1.5 py-0.5 rounded font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </nav>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ROUTER ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-18 right-8 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold text-white flex items-center gap-2.5 ${
                  toastMessage.type === 'error' ? 'bg-red-700' : 'bg-[#0B2E23] border border-gold-400/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>{toastMessage.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Dashboard View */}
          {activeTab === 'dashboard' && (
            <TeacherDashboard
              profile={profile}
              timetable={timetable}
              leaves={leaves}
              onNavigateTab={setActiveTab}
              onSelectClass={(cls) => {
                setSelectedClassId(cls);
                setActiveTab('attendance');
              }}
            />
          )}

          {/* 2. Timetable View */}
          {activeTab === 'timetable' && (
            <TeacherTimetable
              timetable={timetable}
              onMarkAttendance={(cls) => {
                setSelectedClassId(cls || '10-A');
                setActiveTab('attendance');
              }}
              onViewClassStudents={(cls) => {
                setSelectedClassId(cls || '10-A');
                setActiveTab('students');
              }}
            />
          )}

          {/* 3. My Classes & Curriculum */}
          {activeTab === 'classes' && (
            <TeacherClasses
              profile={profile}
              onSelectClass={(cls) => {
                setSelectedClassId(cls);
                setActiveTab('students');
              }}
              onMarkAttendance={(cls) => {
                setSelectedClassId(cls);
                setActiveTab('attendance');
              }}
            />
          )}

          {/* 4. Student Roster */}
          {activeTab === 'students' && (
            <TeacherStudents
              profile={profile}
              studentsRoster={studentsRoster}
              selectedClassId={selectedClassId}
              onSelectClass={setSelectedClassId}
              onMessageParent={(student) => {
                showToast(`Parent progress advisory sent to ${student.guardian} (${student.contact}).`);
              }}
            />
          )}

          {/* 5. Attendance Register */}
          {activeTab === 'attendance' && (
            <MarkAttendance
              profile={profile}
              studentsRoster={studentsRoster}
              selectedClassId={selectedClassId}
              onSelectClass={setSelectedClassId}
              onUpdateAttendance={updateAttendance}
              onBulkUpdateAttendance={bulkUpdateAttendance}
              onSaveSuccess={() => showToast('Attendance register saved successfully to central institutional records.')}
            />
          )}

          {/* 6. Apply Formal Leave */}
          {activeTab === 'leave-request' && (
            <SubmitLeave
              timetable={timetable}
              onSubmitLeave={async (form) => {
                const res = await submitLeaveRequest(form);
                showToast('Formal leave application submitted! AI substitute analysis initiated.');
                return res;
              }}
              onViewStatus={() => setActiveTab('leave-status')}
            />
          )}

          {/* 7. Leave Status & Formal Letters */}
          {activeTab === 'leave-status' && (
            <LeaveStatus
              leaves={leaves}
              onViewLeaveLetter={(leave) => setViewingLeaveLetter(leave)}
              onViewSubstitute={() => setActiveTab('substitute')}
            />
          )}

          {/* 8. AI Substitute Coverage */}
          {activeTab === 'substitute' && (
            <SubstituteCoverage
              leaves={leaves}
              teacherInfo={profile}
              onNavigateTimetable={() => setActiveTab('timetable')}
            />
          )}

          {/* 9. Notifications Hub */}
          {activeTab === 'notifications' && (
            <TeacherNotifications
              notifications={notifications}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                showToast('All notifications marked as read.');
              }}
              onClearNotifications={() => {
                setNotifications([]);
                showToast('Notifications cleared.');
              }}
              onNotificationClick={(item) => {
                setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
                if (item.type === 'leave-approved') setActiveTab('leave-status');
                if (item.type === 'substitute') setActiveTab('substitute');
                if (item.type === 'schedule') setActiveTab('timetable');
                if (item.type === 'attendance') setActiveTab('attendance');
              }}
            />
          )}

          {/* 10. Faculty Profile & Credentials */}
          {activeTab === 'profile' && (
            <TeacherProfile
              profile={profile}
            />
          )}

        </main>

      </div>

      {/* ── COMPLETE FORMAL LEAVE APPLICATION LETTER MODAL (EYE SYMBOL) ── */}
      <AnimatePresence>
        {viewingLeaveLetter && (
          <LeaveLetterModal
            leave={viewingLeaveLetter}
            onClose={() => setViewingLeaveLetter(null)}
            onProceedToSubstitute={() => {
              setViewingLeaveLetter(null);
              setActiveTab('substitute');
            }}
          />
        )}
      </AnimatePresence>

      {/* ── FLOATING STICKY AI COPILOT BUTTON (FACULTY ASSISTANT) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setCopilotOpen(true);
            setSidebarCollapsed(true);
          }}
          className="relative group p-0.5 rounded-full bg-white text-white shadow-2xl hover:shadow-emerald-500/30 border border-emerald-200/80 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
          title="Open GIS AI Faculty Copilot"
        >
          <GisAiAssistantLogo size="lg" animated={true} className="w-13 h-13 sm:w-14 sm:h-14" />
          
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white animate-ping pointer-events-none" />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white pointer-events-none" />

          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#0B2E23] text-gold-200 text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-gold-400/40">
            ✨ GIS Faculty Copilot
          </span>
        </button>
      </div>

      {/* ── DRAGGABLE / EXPANDABLE COPILOT MODAL ── */}
      <TeacherCopilotModal
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onNavigateTab={setActiveTab}
      />

    </div>
  );
}
