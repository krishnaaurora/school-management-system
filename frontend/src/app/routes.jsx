import React, { useState, useEffect } from 'react';
import LandingPage from '../modules/landing/pages/LandingPage';
import LoginPage from '../modules/auth/pages/LoginPage';
import AdminPortalPage from '../modules/admin/pages/AdminPortalPage';
import TeacherPortalPage from '../modules/teacher/pages/TeacherPortalPage';
import StudentPortalPage from '../modules/student/pages/StudentPortalPage';
import SchoolAssistantModal from '../modules/assistant/components/SchoolAssistantModal';
import AdmissionsModal from '../modules/admissions/components/AdmissionsModal';

export const ROUTES = {
  HOME: 'landing',
  LOGIN: 'login',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export function AppRouter() {
  const [currentView, setCurrentView] = useState(ROUTES.HOME);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView(ROUTES.ADMIN);
      } else if (hash === '#teacher') {
        setCurrentView(ROUTES.TEACHER);
      } else if (hash === '#student') {
        setCurrentView(ROUTES.STUDENT);
      } else if (hash === '#login') {
        setCurrentView(ROUTES.LOGIN);
      } else {
        setCurrentView(ROUTES.HOME);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, hash = '') => {
    setCurrentView(view);
    if (hash) {
      window.location.hash = hash;
    }
  };

  return (
    <>
      {currentView === ROUTES.ADMIN && (
        <AdminPortalPage
          onLogout={() => navigateTo(ROUTES.LOGIN, '#login')}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onNavigateTeacher={() => navigateTo(ROUTES.TEACHER, '#teacher')}
          onNavigateStudent={() => navigateTo(ROUTES.STUDENT, '#student')}
        />
      )}

      {currentView === ROUTES.TEACHER && (
        <TeacherPortalPage
          onLogout={() => navigateTo(ROUTES.LOGIN, '#login')}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onNavigateAdmin={() => navigateTo(ROUTES.ADMIN, '#admin')}
          onNavigateStudent={() => navigateTo(ROUTES.STUDENT, '#student')}
        />
      )}

      {currentView === ROUTES.STUDENT && (
        <StudentPortalPage
          onLogout={() => navigateTo(ROUTES.LOGIN, '#login')}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
        />
      )}

      {currentView === ROUTES.LOGIN && (
        <LoginPage
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onLoginSuccess={(role, user) => {
            const userRole = role || user?.role || '';
            const email = (user?.email || '').toLowerCase();
            
            if (userRole === 'student' || email.includes('student') || email.includes('aarav')) {
              navigateTo(ROUTES.STUDENT, '#student');
            } else if (userRole === 'teacher' || email.includes('teacher') || email.includes('ananya')) {
              navigateTo(ROUTES.TEACHER, '#teacher');
            } else {
              // Default to admin portal for admin/management
              navigateTo(ROUTES.ADMIN, '#admin');
            }
          }}
          onOpenAdmissions={() => setAdmissionsOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
        />
      )}

      {currentView === ROUTES.HOME && (
        <LandingPage
          onOpenAdmissions={() => setAdmissionsOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
          onOpenLogin={() => navigateTo(ROUTES.LOGIN, '#login')}
          onOpenAdmin={() => navigateTo(ROUTES.ADMIN, '#admin')}
          onOpenTeacher={() => navigateTo(ROUTES.TEACHER, '#teacher')}
          onOpenStudent={() => navigateTo(ROUTES.STUDENT, '#student')}
        />
      )}

      {/* Global Modals for Assistant & Admissions */}
      <SchoolAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onOpenAdmissions={() => {
          setAssistantOpen(false);
          setAdmissionsOpen(true);
        }}
      />

      <AdmissionsModal
        isOpen={admissionsOpen}
        onClose={() => setAdmissionsOpen(false)}
      />
    </>
  );
}

export default AppRouter;
