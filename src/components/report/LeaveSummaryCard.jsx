import React from "react";
import DashboardCard from "../dashboard/DashboardCard";

const LeaveSummaryCard = ({ medicalLeaves, personalLeaves }) => {
  return (
    <DashboardCard className="h-100 p-4">
      <h6 className="text-uppercase fw-bold text-muted mb-3">
        Leave Breakdown
      </h6>
      <dl className="row mb-0">
        <dt className="col-sm-6 text-muted text-start">Medical leaves:</dt>
        <dd className="col-sm-6 text-end fw-bold">{medicalLeaves}</dd>

        <dt className="col-sm-6 text-muted text-start">Personal leaves:</dt>
        <dd className="col-sm-6 text-end fw-bold">{personalLeaves}</dd>
      </dl>
    </DashboardCard>
  );
};

export default LeaveSummaryCard;
