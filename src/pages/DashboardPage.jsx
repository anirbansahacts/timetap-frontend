import React, { useState } from "react";
import Greeting from "../components/dashboard/Greeting";
import CurrentTimeCard from "../components/dashboard/CurrentTimeCard";
import CurrentStatusCard from "../components/dashboard/CurrentStatusCard";
import ShiftDetailsCard from "../components/dashboard/ShiftDetailsCard";
import LeaveBalanceCard from "../components/dashboard/LeaveBalanceCard";
import NextHolidayCard from "../components/dashboard/NextHolidayCard";
import AttendanceCard from "../components/dashboard/AttendanceCard";

const DashboardPage = () => {
  const [isCheckedIn, setisCheckIn] = useState(false);
  return (
    <div>
      <Greeting />

      <div className="container-fluid py-4">
        {/* First Row of Cards */}
        <div className="row g-4 mb-4">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <CurrentTimeCard />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <AttendanceCard />
          </div>
        </div>
        {/* Second Row of Cards */}
        <div className="row g-4 mb-4">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <CurrentStatusCard
              statusText="Checked-In"
              isActiveSession={false}
              sessionStartTime="9:02 AM"
            />
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <ShiftDetailsCard
              shiftDay="Tuesday"
              shiftName="Morning Shift"
              shiftStartTime="9:00 AM"
              shiftEndTime="5:00 PM"
              shiftDuration="8 hours"
            />
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <LeaveBalanceCard totalLeave={25} usedLeave={10} />
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <NextHolidayCard
              holidayName="Durga Puja"
              holidayDate="October 1, 2025"
              holidayDay="Wednesday"
              daysUntilHoliday={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
