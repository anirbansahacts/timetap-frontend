import React from "react";
import PageHeader from "../components/common/PageHeader";
import AttendanceTable from "../components/attendance/AttendanceTable";

const AttendancePage = () => {
  return (
    <>
      <PageHeader label={"Attendance History"} />
      <br />
      <AttendanceTable employeeId={555} />
    </>
  );
};

export default AttendancePage;
