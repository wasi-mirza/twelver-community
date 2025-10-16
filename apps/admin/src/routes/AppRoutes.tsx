import { AdminAuthProvider } from '@my-project/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { EnterpriseApplicationsPage } from '../pages/EnterpriseApplicationsPage';
import { BroadcastsPage } from '../pages/BroadcastsPage';
import { BookingsPage } from '../pages/BookingsPage';
import { ReviewsPage } from '../pages/ReviewsPage';

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminAuthProvider>
            <DashboardPage />
          </AdminAuthProvider>
        }
      >
        <Route path="users" element={<UserManagementPage />} />
        <Route
          path="applications"
          element={<EnterpriseApplicationsPage />}
        />
        <Route path="broadcasts" element={<BroadcastsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>
    </Routes>
  );
}

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}
