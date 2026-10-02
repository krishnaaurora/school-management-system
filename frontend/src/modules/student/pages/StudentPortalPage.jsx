import React from 'react';
import StudentPortal from '../components/StudentPortal';

export default function StudentPortalPage({ onLogout, onNavigateHome }) {
  return (
    <StudentPortal
      onLogout={onLogout}
      onNavigateHome={onNavigateHome}
    />
  );
}
