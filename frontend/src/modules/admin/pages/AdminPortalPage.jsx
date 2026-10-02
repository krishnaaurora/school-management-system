import React from 'react';
import AdminPortal from '../components/AdminPortal';

export default function AdminPortalPage({ onLogout, onNavigateHome }) {
  return (
    <AdminPortal
      onLogout={onLogout}
      onNavigateHome={onNavigateHome}
    />
  );
}
