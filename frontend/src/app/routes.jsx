import React, { useState, useEffect } from 'react';
import LandingPage from '../modules/landing/pages/LandingPage';
import LoginPage from '../modules/auth/pages/LoginPage';
import AdminPortalPage from '../modules/admin/pages/AdminPortalPage';
import TeacherPortalPage from '../modules/teacher/pages/TeacherPortalPage';
import StudentPortalPage from '../modules/student/pages/StudentPortalPage';
import SchoolAssistantModal from '../modules/assistant/components/SchoolAssistantModal';
import AdmissionsModal from '../modules/admissions/components/AdmissionsModal';
import { useAuth } from '../modules/auth/hooks/useAuth';

export const ROUTES = {
  HOME: 'landing',
  LOGIN: 'login',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export function AppRouter() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState(ROUTES.HOME);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const currentUser = user || (() => {
        try {
          const stored = localStorage.getItem('gis_user');
          return stored ? JSON.parse(stored) : null;
        } catch {
          return null;
        }
      })();

      const userRole = (currentUser?.role || '').toUpperCase();

      if (hash === '#admin') {
        if (!currentUser) {
          window.location.hash = '#login';
          setCurrentView(ROUTES.LOGIN);
        } else if (userRole === 'ADMIN') {
          setCurrentView(ROUTES.ADMIN);
        } else if (userRole === 'TEACHER') {
          window.location.hash = '#teacher';
          setCurrentView(ROUTES.TEACHER);
        } else {
          window.location.hash = '#student';
          setCurrentView(ROUTES.STUDENT);
        }
      } else if (hash === '#teacher') {
        if (!currentUser) {
          window.location.hash = '#login';
          setCurrentView(ROUTES.LOGIN);
        } else if (userRole === 'TEACHER' || userRole === 'ADMIN') {
          setCurrentView(ROUTES.TEACHER);
        } else {
          window.location.hash = '#student';
          setCurrentView(ROUTES.STUDENT);
        }
      } else if (hash === '#student') {
        if (!currentUser) {
          window.location.hash = '#login';
          setCurrentView(ROUTES.LOGIN);
        } else {
          setCurrentView(ROUTES.STUDENT);
        }
      } else if (hash === '#login') {
        setCurrentView(ROUTES.LOGIN);
      } else {
        setCurrentView(ROUTES.HOME);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const navigateTo = (view, hash = '') => {
    setCurrentView(view);
    if (hash) {
      window.location.hash = hash;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigateTo(ROUTES.LOGIN, '#login');
  };

  return (
    <>
      {currentView === ROUTES.ADMIN && (
        <AdminPortalPage
          onLogout={handleLogout}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onNavigateTeacher={() => navigateTo(ROUTES.TEACHER, '#teacher')}
          onNavigateStudent={() => navigateTo(ROUTES.STUDENT, '#student')}
        />
      )}

      {currentView === ROUTES.TEACHER && (
        <TeacherPortalPage
          onLogout={handleLogout}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onNavigateAdmin={() => navigateTo(ROUTES.ADMIN, '#admin')}
          onNavigateStudent={() => navigateTo(ROUTES.STUDENT, '#student')}
        />
      )}

      {currentView === ROUTES.STUDENT && (
        <StudentPortalPage
          onLogout={handleLogout}
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
        />
      )}

      {currentView === ROUTES.LOGIN && (
        <LoginPage
          onNavigateHome={() => navigateTo(ROUTES.HOME, '#home')}
          onLoginSuccess={(role, loggedUser) => {
            const userRole = (role || loggedUser?.role || '').toUpperCase();
            if (userRole === 'ADMIN') {
              navigateTo(ROUTES.ADMIN, '#admin');
            } else if (userRole === 'TEACHER') {
              navigateTo(ROUTES.TEACHER, '#teacher');
            } else {
              navigateTo(ROUTES.STUDENT, '#student');
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
