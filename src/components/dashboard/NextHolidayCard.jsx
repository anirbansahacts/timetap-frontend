import React from "react";
import DashboardCard from "./DashboardCard";
import Logo from "../../assets/logo.svg?react";

const NextHolidayCard = ({
  holidayName,
  holidayDate,
  holidayDay,
  daysUntilHoliday,
}) => {
  return (
    <DashboardCard className="h-100 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center justify-content-center w-100 mb-3">
        <Logo className="mx-2" width={20} height={20} />
        <span className="text-uppercase fw-bold text-muted me-2">
          Next Holiday
        </span>
      </div>
      <div className="text-center mt-auto">
        <h3 className="fw-bold mb-1">{holidayName}</h3>
        <p className="text-muted mb-0">{holidayDate}</p>
        <p className="text-muted fw-bold small mb-3">{holidayDay}</p>
        <span className="badge bg-info-subtle text-info fw-bold py-2 px-3 rounded-pill">
          In {daysUntilHoliday} days
        </span>
      </div>
    </DashboardCard>
  );
};

export default NextHolidayCard;
