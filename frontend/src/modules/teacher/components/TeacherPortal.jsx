import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { useTeacherData } from '../hooks/useTeacherData';

// Tab Components
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

export default function TeacherPortal({ onLogout, onNavigate }) {
  const {
    loading,
    teacher,
    summary,
    timetable,
    classes,
    students,
    leaves,
    notifications,
    activeTab,
    selectedClass,
    selectedPeriod,
    handleTabChange,
    handleSelectClass,
    handleSaveAttendance,
    handleSubmitLeave,
    handleMarkNotificationRead,
    handleMarkAllNotificationsRead,
    handleClearNotifications,
    handleOpenClassStudents,
    handleOpenClassAttendance
  } = useTeacherData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

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
    { id: 'timetable', label: 'My Timetable', icon: Calendar },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { type: 'divider', label: 'Leave & Coverage' },
    { id: 'leave-request', label: 'Leave Request', icon: FileText, badge: '⭐' },
    { id: 'leave-status', label: 'Leave Status', icon: Clock, badge: leaves.length ? String(leaves.length) : null },
    { id: 'substitute', label: 'Substitute', icon: RefreshCw, badge: 'AI' },
    { type: 'divider', label: 'System' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadNotificationsCount },
    { id: 'profile', label: 'Profile & Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <GisEmblem size={34} />
              <div>
                <span className="text-base font-bold text-white tracking-tight hidden sm:inline-block">
                  Greenfield IS
                </span>
                <span className="text-xs font-semibold text-emerald-400 block -mt-1 sm:mt-0">
                  Teacher Portal
                </span>
              </div>
            </div>
          </div>

          {/* Center Greeting & Current Date */}
          <div className="hidden md:flex flex-col items-center">
            <span className="text-sm font-bold text-white">
              {getGreeting()}, {teacher.name.split(' ')[0]}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentDateFormatted}
            </span>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => handleTabChange('notifications')}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Profile Chip */}
            <div 
              onClick={() => handleTabChange('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{teacher.name}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{teacher.employeeId}</p>
              </div>
            </div>

            {/* Sign Out */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Sign out of portal"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
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
                <span className="font-bold text-sm text-white">GIS Faculty</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1">
              {navItems.map((item, idx) => {
                if (item.type === 'divider') {
                  return (
                    <div key={idx} className="pt-4 pb-1">
                      <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
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
                {teacher.employeeId.slice(-3)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{teacher.role}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Active on Campus
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <TeacherDashboard
              teacher={teacher}
              summary={summary}
              nextClass={summary.nextClass}
              onNavigateTab={handleTabChange}
              onMarkAttendance={(period) => {
                handleOpenClassAttendance(period?.class || '10-A', period?.period || 'Period 3');
              }}
              onViewClass={(cls) => {
                handleOpenClassStudents(cls || '9-B');
              }}
            />
          )}

          {activeTab === 'timetable' && (
            <TeacherTimetable
              timetable={timetable}
              onMarkAttendance={(period) => {
                handleOpenClassAttendance(period.class, `Period ${period.period}`);
              }}
              onViewStudents={(period) => {
                handleOpenClassStudents(period.class);
              }}
            />
          )}

          {activeTab === 'classes' && (
            <TeacherClasses
              classes={classes}
              onViewClass={(cls) => {
                handleOpenClassStudents(cls.className);
              }}
              onMarkAttendance={(cls) => {
                handleOpenClassAttendance(cls.className, 'Period 1');
              }}
            />
          )}

          {activeTab === 'students' && (
            <TeacherStudents
              classes={classes}
              studentsData={students}
              selectedClass={selectedClass}
              onSelectClass={handleSelectClass}
            />
          )}

          {activeTab === 'attendance' && (
            <MarkAttendance
              classes={classes}
              studentsData={students}
              selectedClass={selectedClass}
              selectedPeriod={selectedPeriod}
              onSaveAttendance={handleSaveAttendance}
              onSelectClass={handleSelectClass}
            />
          )}

          {activeTab === 'leave-request' && (
            <SubmitLeave
              teacher={teacher}
              onSubmitLeave={handleSubmitLeave}
              onViewHistory={() => handleTabChange('leave-status')}
            />
          )}

          {activeTab === 'leave-status' && (
            <LeaveStatus
              leaves={leaves}
              onViewSubstitute={() => handleTabChange('substitute')}
            />
          )}

          {activeTab === 'substitute' && (
            <SubstituteCoverage
              leaves={leaves}
              teacherInfo={teacher}
            />
          )}

          {activeTab === 'notifications' && (
            <TeacherNotifications
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
              onClearNotifications={handleClearNotifications}
              onNotificationClick={(item) => {
                handleMarkNotificationRead(item.id);
                if (item.type === 'leave_approved') handleTabChange('leave-status');
                if (item.type === 'substitute_assigned') handleTabChange('substitute');
                if (item.type === 'schedule_update') handleTabChange('timetable');
              }}
            />
          )}

          {activeTab === 'profile' && (
            <TeacherProfile
              teacherInfo={teacher}
            />
          )}
        </main>
      </div>
    </div>
  );
}
