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
import ShiftPage from "../pages/ShiftPage.jsx"
import ReportPage from "../pages/ReportPage.jsx";
import Login from "../pages/Login.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import ReportDashboard from "../pages/ReportDashboard.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ViewEmployee from "../pages/ViewEmployee.jsx";
import AddEmployeePage from "../pages/AddEmployeePage.jsx";
import ViewTeamPage from "../pages/ViewTeamPage.jsx"
import ShiftDetailsPage from "../pages/ShiftDetailsPage.jsx";
import ShiftAssignmentPage from "../pages/ShiftAssignmentPage.jsx";
import ShiftRequestsPage from "../pages/ShiftRequestsPage.jsx"

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave/apply" element={<LeaveApplyPage />} />
          <Route path="/leave/balance" element={<LeaveBalancePage />} />
          <Route path="/leave/history" element={<LeaveHistoryPage />} />
          <Route path="/shift" element={<ShiftPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/employees/:id" element={<ViewEmployee />}></Route>
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/report-dash" element={<ReportDashboard />} />
          <Route path="/employee/add" element={<AddEmployeePage />} />
          <Route path="/employee/view" element={<ViewTeamPage />} />
          <Route path="/shift/details" element={<ShiftDetailsPage />} />
          <Route path="/shift/assignment" element={<ShiftAssignmentPage />} />
          <Route path="/shift/requests" element={<ShiftRequestsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
