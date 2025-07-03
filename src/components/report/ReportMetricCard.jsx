import React from "react";
import DashboardCard from "../dashboard/DashboardCard";

const ReportMetricCard = ({ title, value }) => {
  return (
    <DashboardCard className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h6 className="text-uppercase fw-bold text-muted mb-2">{title}</h6>
      <h2 className="display-4 fw-bold mb-0">{value}</h2>
    </DashboardCard>
  );
};

export default ReportMetricCard;
