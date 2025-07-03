import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AttendancePage from "../pages/AttendancePage.jsx";
import LeaveApplyPage from "../pages/LeaveApplyPage.jsx";
import LeaveBalancePage from "../pages/LeaveBalancePage.jsx";
import LeaveHistoryPage from "../pages/LeaveHistoryPage.jsx";
import ShiftDetailsPage from "../pages/ShiftDetailsPage.jsx";
import ShiftSwapPage from "../pages/ShiftSwapPage.jsx";
import ShiftSwapStatusPage from "../pages/ShiftSwapStatusPage.jsx";
import ReportPage from "../pages/ReportPage.jsx";
import Login from "../pages/Login.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import ReportDashboard from "../pages/ReportDashboard.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave/apply" element={<LeaveApplyPage />} />
          <Route path="/leave/balance" element={<LeaveBalancePage />} />
          <Route path="/leave/history" element={<LeaveHistoryPage />} />
          <Route path="/shift/details" element={<ShiftDetailsPage />} />
          <Route path="/shift/swap" element={<ShiftSwapPage />} />
          <Route path="/shift/swap-status" element={<ShiftSwapStatusPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/report-dash" element={<ReportDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
