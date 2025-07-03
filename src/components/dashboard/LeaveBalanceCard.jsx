import React from "react";
import DashboardCard from "./DashboardCard";
import Logo from "../../assets/logo.svg?react";

const LeaveBalanceCard = ({ totalLeave, usedLeave }) => {
  const remainingLeave = totalLeave - usedLeave;
  const progress = (usedLeave / totalLeave) * 100;

  return (
    <DashboardCard className="h-100 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center justify-content-center w-100 mb-3">
        <Logo className="mx-2" width={20} height={20} />
        <span className="text-uppercase fw-bold text-muted me-2">
          Leave Balance
        </span>
      </div>
      <div className="text-center mt-auto">
        <h2 className="display-4 fw-bold mb-1">
          {usedLeave} <span className="text-muted fs-4">/ {totalLeave}</span>
        </h2>
        <p className="text-muted mb-3">Days Used</p>
        <div className="progress mb-2" style={{ height: "8px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%`, backgroundColor: "#3b82f6" }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="text-muted small mb-0">{remainingLeave} days remaining</p>
      </div>
    </DashboardCard>
  );
};

export default LeaveBalanceCard;
