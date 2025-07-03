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
import LeaveStatusPage from "../pages/LeaveStatusPage.jsx";
import LeaveHistoryPage from "../pages/LeaveHistoryPage.jsx";
import ShiftDetailsPage from "../pages/ShiftDetailsPage.jsx";
import ShiftSwapPage from "../pages/ShiftSwapPage.jsx";
import ShiftSwapStatusPage from "../pages/ShiftSwapStatusPage.jsx";
import ReportPage from "../pages/ReportPage.jsx";
import Login from "../pages/Login.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import ReportDashboard from "../pages/ReportDashboard.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ForgotPassword  from "../pages/ForgotPassword.jsx";
import ViewEmployee from "../pages/ViewEmployee.jsx";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />


        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave/apply" element={<LeaveApplyPage />} />
          <Route path="/leave/status" element={<LeaveStatusPage />} />
          <Route path="/leave/history" element={<LeaveHistoryPage />} />
          <Route path="/shift/details" element={<ShiftDetailsPage />} />
          <Route path="/shift/swap" element={<ShiftSwapPage />} />
          <Route path="/shift/swap-status" element={<ShiftSwapStatusPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/employees/:id" element={<ViewEmployee/>}></Route>
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/report-dash" element={<ReportDashboard />} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
