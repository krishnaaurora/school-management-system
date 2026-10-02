import React, { useState } from 'react';
import { 
  Users, UserPlus, UserCheck, 
  ShieldAlert, Sparkles, CheckCircle2 
} from 'lucide-react';
import StaffAndStudentsHub from './StaffAndStudentsHub';
import RegistrationHub from './RegistrationHub';
import CredentialSuccessModal from './CredentialSuccessModal';
import EditTeacherModal from './EditTeacherModal';
import EditStudentModal from './EditStudentModal';
import ViewUserProfileModal from './ViewUserProfileModal';
import ResetPasswordConfirmModal from './ResetPasswordConfirmModal';

export default function UserManagementModule({ defaultSubTab = 'staff-students', showToast }) {
  // Normalize subTab
  const isReg = defaultSubTab === 'registration' || defaultSubTab === 'register-teacher' || defaultSubTab === 'register-student';
  const initialSubTab = isReg ? 'registration' : 'staff-students';
  
  const [subTab, setSubTab] = useState(initialSubTab); // 'staff-students' | 'registration'
  const [initialRegType, setInitialRegType] = useState(
    defaultSubTab === 'register-student' ? 'student' : 'teacher'
  );
  const [initialDirectoryType, setInitialDirectoryType] = useState(
    defaultSubTab === 'students' ? 'students' : 'teachers'
  );
  
  // Modals state
  const [credentialModalData, setCredentialModalData] = useState(null);
  const [isCredentialReset, setIsCredentialReset] = useState(false);
  
  const [viewingUser, setViewingUser] = useState(null);
  const [viewingRole, setViewingRole] = useState('TEACHER');

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [resetTargetRole, setResetTargetRole] = useState('TEACHER');

  const handleRegistrationSuccess = (data) => {
    setIsCredentialReset(false);
    setCredentialModalData(data);
    if (showToast) {
      showToast(`${data.role === 'TEACHER' ? 'Faculty' : 'Student'} account created successfully!`);
    }
  };

  const handleResetSuccess = (data) => {
    setIsCredentialReset(true);
    setCredentialModalData(data);
    if (showToast) {
      showToast(`Temporary password generated for ${data.fullName || data.name}!`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Main Views */}
      {subTab === 'staff-students' && (
        <StaffAndStudentsHub
          defaultType={initialDirectoryType}
          onRegisterNew={(type) => {
            setInitialRegType(type || 'teacher');
            setSubTab('registration');
          }}
          onViewProfile={(u, role) => {
            setViewingUser(u);
            setViewingRole(role);
          }}
          onEditTeacher={(t) => setEditingTeacher(t)}
          onEditStudent={(s) => setEditingStudent(s)}
          onResetPassword={(u, role) => {
            setResetTargetUser(u);
            setResetTargetRole(role);
          }}
          showToast={showToast}
        />
      )}

      {subTab === 'registration' && (
        <RegistrationHub
          defaultType={initialRegType}
          onSuccess={handleRegistrationSuccess}
          onCancel={() => setSubTab('staff-students')}
        />
      )}

      {/* ── ALL USER MANAGEMENT MODALS ── */}

      {/* 1. One-Time Credential Display Modal */}
      <CredentialSuccessModal
        isOpen={!!credentialModalData}
        data={credentialModalData}
        isReset={isCredentialReset}
        onClose={() => {
          setCredentialModalData(null);
          if (!isCredentialReset) {
            setSubTab(credentialModalData?.role === 'TEACHER' ? 'teachers' : 'students');
          }
        }}
        onRegisterAnother={() => {
          const role = credentialModalData?.role;
          setCredentialModalData(null);
          setInitialRegType(role === 'TEACHER' ? 'teacher' : 'student');
          setSubTab('registration');
        }}
      />

      {/* 2. View Complete Profile Modal */}
      <ViewUserProfileModal
        isOpen={!!viewingUser}
        user={viewingUser}
        role={viewingRole}
        onClose={() => setViewingUser(null)}
        onEdit={(u) => {
          if (viewingRole === 'TEACHER') setEditingTeacher(u);
          else setEditingStudent(u);
        }}
        onResetPassword={(u) => {
          setResetTargetUser(u);
          setResetTargetRole(viewingRole);
        }}
      />

      {/* 3. Edit Teacher Modal */}
      <EditTeacherModal
        isOpen={!!editingTeacher}
        teacher={editingTeacher}
        onClose={() => setEditingTeacher(null)}
        onUpdated={(updated) => {
          if (showToast) showToast('Faculty profile updated successfully!');
        }}
      />

      {/* 4. Edit Student Modal */}
      <EditStudentModal
        isOpen={!!editingStudent}
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onUpdated={(updated) => {
          if (showToast) showToast('Student profile updated successfully!');
        }}
      />

      {/* 5. Reset Password Confirmation Modal */}
      <ResetPasswordConfirmModal
        isOpen={!!resetTargetUser}
        targetUser={resetTargetUser}
        role={resetTargetRole}
        onClose={() => setResetTargetUser(null)}
        onSuccess={handleResetSuccess}
      />

    </div>
  );
}
