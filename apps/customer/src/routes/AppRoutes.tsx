import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@my-project/auth';
import LoginPage from '../pages/LoginPage';
import RoleSelectionPage from '../pages/RoleSelectionPage';
import EnterpriseRegistrationPage from '../pages/EnterpriseRegistrationPage';
import PendingApprovalPage from '../pages/PendingApprovalPage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes: React.FC = () => {
  const { user, databaseUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // If the user is authenticated, but we don't have their data yet, show loading.
  if (!databaseUser) {
    return <div>Loading...</div>;
  }

  // User is authenticated, but has not selected a role yet
  if (!databaseUser.profile) {
    return (
      <Routes>
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="*" element={<Navigate to="/select-role" replace />} />
      </Routes>
    );
  }

  if (databaseUser.role === 'ENTERPRISE') {
    if (databaseUser.profile.applicationStatus === 'PENDING') {
      // User has selected enterprise, but not completed registration
      if (!databaseUser.profile.companyName) {
        return (
          <Routes>
            <Route
              path="/register-enterprise"
              element={<EnterpriseRegistrationPage />}
            />
            <Route
              path="*"
              element={<Navigate to="/register-enterprise" replace />}
            />
          </Routes>
        );
      }
      // User has registered as enterprise and is awaiting approval
      return (
        <Routes>
          <Route path="/pending-approval" element={<PendingApprovalPage />} />
          <Route
            path="*"
            element={<Navigate to="/pending-approval" replace />}
          />
        </Routes>
      );
    }
  }

  // User is fully registered and approved
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
