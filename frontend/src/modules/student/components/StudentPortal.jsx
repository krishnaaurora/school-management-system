import React, { useState } from 'react';
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
  GraduationCap
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'timetable', label: 'My Timetable', icon: Calendar, badge: 'AI Sync' },
    { id: 'attendance', label: 'My Attendance', icon: BarChart3 },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'teachers', label: 'My Teachers', icon: Users },
    { type: 'divider', label: 'Academic & Updates' },
    { id: 'exams', label: 'Examinations', icon: Award },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadCount },
    { type: 'divider', label: 'Account' },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3 select-none">
              <GisEmblem size={34} />
              <div>
                <span className="text-base font-bold text-white tracking-tight hidden sm:inline-block">
                  Greenfield IS
                </span>
                <span className="text-xs font-semibold text-emerald-400 block -mt-1 sm:mt-0">
                  Student Portal
                </span>
              </div>
            </div>
          </div>

          {/* Center Greeting & Current Date */}
          <div className="hidden md:flex flex-col items-center">
            <span className="text-sm font-bold text-white">
              {getGreeting()}, {student.name.split(' ')[0]} 👋
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Class {student.class} • {currentDateFormatted}
            </span>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => handleTabChange('notifications')}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Chip */}
            <div 
              onClick={() => handleTabChange('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{student.name}</p>
                <p className="text-[10px] text-slate-400 leading-tight">Class {student.class}</p>
              </div>
            </div>

            {/* Sign Out */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Sign out of portal"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Body: Sidebar + Dynamic Workspace ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900/95 lg:bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Sidebar Brand header for mobile */}
            <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GisEmblem size={28} />
                <span className="font-bold text-sm text-white">GIS Student</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1">
              {navItems.map((item, idx) => {
                if (item.type === 'divider') {
                  return (
                    <div key={idx} className="pt-4 pb-1">
                      <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  );
                }

                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleTabChange(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badgeCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {item.badgeCount}
                      </span>
                    )}

                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Info */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                10A
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{student.name}</p>
                <p className="text-[10px] text-emerald-400 font-medium">Roll No: {student.rollNo}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <StudentDashboard
              student={student}
              summary={summary}
              notifications={notifications}
              announcements={announcements}
              onNavigateTab={handleTabChange}
              onViewTimetable={() => handleTabChange('timetable')}
            />
          )}

          {activeTab === 'timetable' && (
            <StudentTimetable
              timetable={timetable}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          )}

          {activeTab === 'attendance' && (
            <StudentAttendance
              attendance={attendance}
            />
          )}

          {activeTab === 'subjects' && (
            <StudentSubjects
              subjects={subjects}
            />
          )}

          {activeTab === 'teachers' && (
            <StudentTeachers
              teachers={teachers}
            />
          )}

          {activeTab === 'exams' && (
            <StudentExams
              exams={exams}
            />
          )}

          {activeTab === 'announcements' && (
            <StudentAnnouncements
              announcements={announcements}
            />
          )}

          {activeTab === 'notifications' && (
            <StudentNotifications
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationRead}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
              onClearNotifications={handleClearNotifications}
              onNavigateTab={handleTabChange}
            />
          )}

          {(activeTab === 'profile' || activeTab === 'settings') && (
            <StudentProfile
              student={student}
            />
          )}
        </main>
      </div>
    </div>
  );
}
