// src/pages/ReportDashboard.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader.jsx";

// Import dashboard components
import ReportMetricCard from "../components/report/ReportMetricCard.jsx";
import AverageMetricsCard from "../components/report/AverageMetricsCard.jsx";
import LeaveSummaryCard from "../components/report/LeaveSummaryCard.jsx";
import DonutChart from "../components/report/DonutChart.jsx";

const ReportDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fromDate, toDate, employeeId, employeeName } = location.state || {};

  const [reportData, setReportData] = useState(null);
  // FIX: Change 'const [loading, setLoading] = true;' to 'const [loading, setLoading] = useState(true);'
  const [loading, setLoading] = useState(true); // Corrected line
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      setError("");

      if (!fromDate || !toDate || !employeeId) {
        setError(
          "Report parameters not found. Redirecting to report generation page..."
        );
        setTimeout(() => {
          navigate("/reports");
        }, 2000);
        setLoading(false);
        return;
      }

      // --- Using static sample data for demonstration ---
      setTimeout(() => {
        setReportData({
          totalWorkingDays: 64,
          presentDays: 56,
          absentDays: 8,
          totalLeavesTaken: 8,
          avgWorkingHours: "10:02:39",
          avgClockInTime: "08:31:39",
          avgClockOutTime: "18:33:09",
          medicalLeaves: 6,
          personalLeaves: 2,
          attendancePercentage: { present: 100.0, absent: 0.0 },
          leavePercentage: { taken: 50.0, remaining: 40.0 },
        });
        setLoading(false);
      }, 500);
      // --- End of static data simulation ---
    };

    fetchReportData();
  }, [fromDate, toDate, employeeId, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">
          {error || `Generating report for ${employeeName || employeeId}...`}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger mt-5 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        {error}
      </div>
    );
  }

  if (!reportData) {
    return (
      <div
        className="alert alert-info mt-5 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        No report data available for the selected period.
      </div>
    );
  }

  return (
    <>
      <PageHeader
        label={`Report Dashboard for ${employeeName || employeeId}`}
      />

      {/* Display selected dates */}
      <div className="container mt-4">
        <div className="card p-3 shadow-sm">
          <p className="mb-0">
            <strong>Report Period:</strong>{" "}
            {fromDate ? new Date(fromDate).toLocaleDateString() : "N/A"} to{" "}
            {toDate ? new Date(toDate).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>

      <div className="container-fluid mt-5">
        {/* Row 1: Top Metric Cards (No Change) */}
        <div className="row g-4 mb-4">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <ReportMetricCard
              title="Total working days"
              value={reportData.totalWorkingDays}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <ReportMetricCard
              title="Present Days"
              value={reportData.presentDays}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <ReportMetricCard
              title="Absent Days"
              value={reportData.absentDays}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <ReportMetricCard
              title="Total Leaves taken"
              value={reportData.totalLeavesTaken}
            />
          </div>
        </div>

        {/* Row 2: Average Metrics (Left) & Donut Charts (Right, Side-by-side) */}
        <div className="row g-4 mb-4">
          {/* Left Column: Average Metrics Card - takes 1/2 width on extra-large screens, full on others */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-12">
            <AverageMetricsCard
              avgWorkingHours={reportData.avgWorkingHours}
              avgClockInTime={reportData.avgClockInTime}
              avgClockOutTime={reportData.avgClockOutTime}
            />
          </div>

          {/* Right Columns: Donut Charts - take 1/4 width each on extra-large screens, stack on smaller */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <DonutChart
              title="Attendance"
              percentage1={reportData.attendancePercentage.present}
              label1={`${reportData.attendancePercentage.present}%`}
              percentage2={reportData.attendancePercentage.absent}
              label2={`${reportData.attendancePercentage.absent}%`}
            />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <DonutChart
              title="Leave Usage"
              percentage1={reportData.leavePercentage.taken}
              label1={`${reportData.leavePercentage.taken}%`}
              percentage2={reportData.leavePercentage.remaining}
              label2={`${reportData.leavePercentage.remaining}%`}
            />
          </div>
        </div>

        {/* Row 3: Leave Summary (Left) & Empty space (Right) */}
        <div className="row g-4 mb-4">
          {/* Left Column: Leave Summary Card - takes 1/2 width on extra-large screens, full on others */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-12">
            <LeaveSummaryCard
              medicalLeaves={reportData.medicalLeaves}
              personalLeaves={reportData.personalLeaves}
            />
          </div>
          {/* Right Column: Intentionally left empty as per your diagram */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-12">
            {/* This column is intentionally left empty */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDashboard;
