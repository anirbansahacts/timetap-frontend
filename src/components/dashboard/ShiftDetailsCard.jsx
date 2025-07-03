import React from "react";
import DashboardCard from "./DashboardCard";
import Logo from "../../assets/logo.svg?react";

const ShiftDetailsCard = ({
  shiftDay,
  shiftName,
  shiftStartTime,
  shiftEndTime,
  shiftDuration,
}) => {
  return (
    <DashboardCard className="h-100 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center justify-content-center w-100 mb-3">
        <Logo className="mx-2" width={20} height={20} />
        <span className="text-uppercase fw-bold text-muted me-2">
          Today's Shift
        </span>
      </div>
      <div className="text-center">
        <h3 className="fw-bold mb-1">{shiftDay}</h3>
        <p className="text-primary fw-bold mb-2">{shiftName}</p>
        <p className="fs-5 fw-bold mb-0">
          {shiftStartTime} <span className="text-muted">to</span> {shiftEndTime}
        </p>
        <p className="text-muted small mt-2">{shiftDuration} scheduled</p>
      </div>
    </DashboardCard>
  );
};

export default ShiftDetailsCard;
