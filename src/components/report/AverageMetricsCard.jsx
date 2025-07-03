import React from "react";
import DashboardCard from "../dashboard/DashboardCard";

const AverageMetricsCard = ({
  avgWorkingHours,
  avgClockInTime,
  avgClockOutTime,
}) => {
  return (
    <DashboardCard className="h-100 p-4">
      <h6 className="text-uppercase fw-bold text-muted mb-3">
        Average Metrics
      </h6>
      <dl className="row mb-0">
        <dt className="col-sm-6 text-muted text-start">
          Average working hours:
        </dt>
        <dd className="col-sm-6 text-end fw-bold">{avgWorkingHours}</dd>

        <dt className="col-sm-6 text-muted text-start">
          Average Clock in time:
        </dt>
        <dd className="col-sm-6 text-end fw-bold">{avgClockInTime}</dd>

        <dt className="col-sm-6 text-muted text-start">
          Average Clock out time:
        </dt>
        <dd className="col-sm-6 text-end fw-bold">{avgClockOutTime}</dd>
      </dl>
    </DashboardCard>
  );
};

export default AverageMetricsCard;
