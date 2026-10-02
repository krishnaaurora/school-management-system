import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Users, 
  Award, 
  Megaphone, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight, 
  GraduationCap,
  Printer,
  FileCheck,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { useStudentData } from '../hooks/useStudentData';

// Tab Components
import StudentDashboard from './StudentDashboard';
import StudentTimetable from './StudentTimetable';
import StudentAttendance from './StudentAttendance';
import StudentSubjects from './StudentSubjects';
import StudentTeachers from './StudentTeachers';
import StudentExams from './StudentExams';
import StudentAnnouncements from './StudentAnnouncements';
import StudentNotifications from './StudentNotifications';
import StudentProfile from './StudentProfile';
import StudentReportCardModal from './StudentReportCardModal';

export default function StudentPortal({ onLogout, onNavigateHome }) {
  const {
    loading,
    activeTab,
    student,
    summary,
    timetable,
    attendance,
    subjects,
    teachers,
    exams,
    announcements,
    notifications,
    selectedDay,
    setSelectedDay,
    handleTabChange,
    handleMarkNotificationRead,
    handleMarkAllNotificationsRead,
    handleClearNotifications,
  } = useStudentData();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reportCardModalOpen, setReportCardModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navSections = [
    {
      title: "Academics & Schedule",
      items: [
        { id: 'dashboard', label: 'Student Dashboard', icon: Home },
        { id: 'timetable', label: 'Class 10-A Timetable', icon: Calendar, badge: 'Matrix' },
        { id: 'exams', label: 'Examinations & Results', icon: Award },
        { id: 'attendance', label: 'Attendance Record', icon: BarChart3 },
      ]
    },
    {
      title: "Courses & Faculty",
      items: [
        { id: 'subjects', label: 'My Subjects', icon: BookOpen },
        { id: 'teachers', label: 'Faculty & Mentors', icon: Users },
        { id: 'announcements', label: 'School Notices', icon: Megaphone },
        { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadCount },
      ]
    },
    {
      title: "Student Account",
      items: [
        { id: 'profile', label: 'Student Profile', icon: User },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-charcoal-900 flex flex-col font-sans selection:bg-forest-800 selection:text-white">
      
      {/* ── TOP HEADER (WARM CREAM & FOREST GREEN HERITAGE STYLE) ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & Emblem */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-forest-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 select-none">
              <GisEmblem className="w-9 h-9" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-[#0B2E23] tracking-tight">
                    GREENFIELD
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Student Portal
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider hidden sm:block">
                  Class 10-A &bull; Academic Session 2026–27
                </p>
              </div>
            </div>
          </div>

          {/* Center Greeting & Current Date */}
          <div className="hidden md:flex flex-col items-center">
            <span className="text-xs font-bold text-[#0B2E23]">
              {getGreeting()}, {student.name.split(' ')[0]}
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Roll 10A-01 &bull; {currentDateFormatted}
            </span>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick Report Card Action */}
            <button
              type="button"
              onClick={() => setReportCardModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-800/30 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="View Official CBSE Student Progress Report Card"
            >
              <Award className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Report Card</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => handleTabChange('notifications')}
              className="relative p-2 rounded-xl text-gray-600 hover:text-forest-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Chip */}
            <div 
              onClick={() => handleTabChange('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#C5A880]/40 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0B2E23] text-gold-300 font-bold text-xs flex items-center justify-center">
                {student.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">{student.name}</p>
                <p className="text-[10px] text-gray-500 leading-tight">Class {student.class || '10-A'}</p>
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

      {/* ── MAIN LAYOUT: COLLAPSIBLE SIDEBAR + WORKSPACE ── */}
      <div className="flex-1 flex relative min-h-[calc(100vh-4rem)]">
        
        {/* ── SIDEBAR NAVIGATION (STICKY WITH HOVER TOOLTIPS) ── */}
        <aside
          className={`bg-white border-r border-gray-200 hidden lg:flex flex-col justify-between py-5 px-3.5 shrink-0 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] z-30 ${
            sidebarCollapsed ? 'w-20 overflow-visible' : 'w-64 overflow-y-auto'
          }`}
        >
          <div className="space-y-5">
            
            {/* Collapse Toggle */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100">
              {!sidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Student Navigation
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
                  </div>
                )}
              </div>
            </div>

            {/* Nav Groups */}
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
                          onClick={() => handleTabChange(item.id)}
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
                            <span className="text-[10px] bg-forest-50 text-forest-900 border border-forest-800/20 px-1.5 py-0.5 rounded font-bold">
                              {item.badge}
                            </span>
                          )}
                        </button>

                        {/* Collapsed Tooltip */}
                        {sidebarCollapsed && (
                          <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0B2E23] text-gold-300 text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 z-50 border border-forest-700">
                            {item.label}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            ))}

          </div>

          {/* Bottom Student Card */}
          <div className="pt-4 border-t border-gray-200">
            {!sidebarCollapsed ? (
              <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B2E23] text-gold-300 flex items-center justify-center font-bold text-xs">
                  10A
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-forest-900 truncate">{student.name}</p>
                  <p className="text-[10px] text-gray-500">Roll No: {student.rollNo || '10A-01'}</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 mx-auto rounded-lg bg-[#0B2E23] text-gold-300 flex items-center justify-center font-bold text-xs">
                10A
              </div>
            )}
          </div>
        </aside>

        {/* ── MOBILE DRAWER ── */}
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
                      <span className="font-serif font-bold text-sm text-[#0B2E23]">GIS Student</span>
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
                                handleTabChange(item.id);
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
                className="fixed top-18 right-8 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold text-white flex items-center gap-2.5 bg-[#0B2E23] border border-gold-400/40"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Dashboard */}
          {activeTab === 'dashboard' && (
            <StudentDashboard
              student={student}
              summary={summary}
              notifications={notifications}
              announcements={announcements}
              onNavigateTab={handleTabChange}
              onViewReportCard={() => setReportCardModalOpen(true)}
            />
          )}

          {/* 2. Timetable (Authentic Weekly Matrix) */}
          {activeTab === 'timetable' && (
            <StudentTimetable
              timetable={timetable}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          )}

          {/* 3. Examinations & Report Cards */}
          {activeTab === 'exams' && (
            <StudentExams
              exams={exams}
              student={student}
            />
          )}

          {/* 4. Attendance */}
          {activeTab === 'attendance' && (
            <StudentAttendance
              attendance={attendance}
              summary={summary}
            />
          )}

          {/* 5. Subjects */}
          {activeTab === 'subjects' && (
            <StudentSubjects
              subjects={subjects}
            />
          )}

          {/* 6. Teachers */}
          {activeTab === 'teachers' && (
            <StudentTeachers
              teachers={teachers}
            />
          )}

          {/* 7. Announcements */}
          {activeTab === 'announcements' && (
            <StudentAnnouncements
              announcements={announcements}
            />
          )}

          {/* 8. Notifications */}
          {activeTab === 'notifications' && (
            <StudentNotifications
              notifications={notifications}
              onMarkRead={handleMarkNotificationRead}
              onMarkAllRead={handleMarkAllNotificationsRead}
              onClearAll={handleClearNotifications}
            />
          )}

          {/* 9. Profile */}
          {activeTab === 'profile' && (
            <StudentProfile
              student={student}
              summary={summary}
              onViewReportCard={() => setReportCardModalOpen(true)}
            />
          )}

        </main>

      </div>

      {/* ── GLOBAL REPORT CARD MODAL ── */}
      <AnimatePresence>
        {reportCardModalOpen && (
          <StudentReportCardModal
            student={student}
            onClose={() => setReportCardModalOpen(false)}
            onForwardParent={(rep) => {
              showToast(`Official A4 Report Card forwarded to ${student.guardian || 'Parent'} (${student.contact || 'rajesh.kumar@parent.gisedu.in'}).`);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
