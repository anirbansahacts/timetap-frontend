import React from "react";
import DashboardCard from "./DashboardCard"; // Adjust path as needed

const MetricCard = ({ title, value, unit, valueColorClass = "text-dark" }) => {
  return (
    <DashboardCard className="h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-uppercase fw-bold text-muted">{title}</span>
      </div>
      <div className="text-center mt-auto">
        <h2 className={`display-5 fw-bold mb-0 ${valueColorClass}`}>{value}</h2>
        <p className="text-muted">{unit}</p>
      </div>
    </DashboardCard>
  );
};

export default MetricCard;
