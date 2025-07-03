// src/components/dashboard/DonutChart.jsx
import React from "react";
import DashboardCard from "../dashboard/DashboardCard"; // Adjust path as needed

const DonutChart = ({ percentage1, percentage2, label1, label2, title }) => {
  // Simple SVG donut chart representation
  // This is a static visual, not a dynamic chart library.
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash1 = (percentage1 / 100) * circumference;
  const dash2 = (percentage2 / 100) * circumference;

  return (
    <DashboardCard className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h6 className="text-uppercase fw-bold text-muted mb-3">{title}</h6>
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#e0e0e0" // Light gray background for the donut
          strokeWidth="15"
        />
        {/* Segment 1 (larger) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#0d6efd" // Bootstrap primary blue
          strokeWidth="15"
          strokeDasharray={`${dash1} ${circumference - dash1}`}
          strokeDashoffset={circumference / 4} // Start at top
        />
        {/* Segment 2 (smaller, on top of segment 1) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#fd7e14" // Bootstrap orange (warning)
          strokeWidth="15"
          strokeDasharray={`${dash2} ${circumference - dash2}`}
          strokeDashoffset={circumference / 4 - dash1} // Offset to start after first segment
        />
        {/* Text labels inside (optional, but in image) */}
        <text
          x="50"
          y="45"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fw-bold fs-6 text-dark"
        >
          {label1}
        </text>
        <text
          x="50"
          y="65"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fw-bold fs-6 text-dark"
        >
          {label2}
        </text>
      </svg>
    </DashboardCard>
  );
};

export default DonutChart;
