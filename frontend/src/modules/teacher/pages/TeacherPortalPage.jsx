import React from 'react';
import TeacherPortal from '../components/TeacherPortal';

export default function TeacherPortalPage({ onLogout, onNavigate }) {
  return (
    <TeacherPortal 
      onLogout={onLogout}
      onNavigate={onNavigate}
    />
  );
}
