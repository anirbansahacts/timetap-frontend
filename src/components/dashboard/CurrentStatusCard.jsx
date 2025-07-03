// src/components/report/CurrentStatusCard.jsx

import React from "react";
import DashboardCard from "./DashboardCard";
import WifiIcon from "../../assets/wifi.svg?react"; // Import the Wi-Fi icon component
import CheckedIn from "../../assets/checkedin.svg?react"; // Import the Checked-In person icon component

const CurrentStatusCard = ({
  statusText,
  isActiveSession,
  sessionStartTime,
}) => {
  return (
    <DashboardCard className="h-100 d-flex flex-column justify-content-between p-3">
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <span
          className="text-uppercase text-muted"
          style={{
            fontSize: "0.8rem",
            fontWeight: "600",
            letterSpacing: "0.05em",
          }}
        >
          Current Status
        </span>
        <WifiIcon height={20} width={20} />
      </div>

      {/* Main Status Section: Checked-In/Out text with icon */}
      {/* Centered content, icon above text */}
      <div className="text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {/* Person Checked-In Icon styling */}
        <CheckedIn className="mb-2" width={20} height={20} />
        <h3
          className="mb-2 text-success fw-semibold"
          style={{ fontSize: "1.8rem" }}
        >
          {statusText}
        </h3>
      </div>

      {/* Session Details */}
      <div className="text-center">
        {/* "Active/Inactive Session" text with a small green dot */}
        <p
          className="text-muted mb-1 d-flex align-items-center justify-content-center"
          style={{ fontSize: "0.9rem", fontWeight: "500" }}
        >
          {/* Small green dot styling */}
          <span className="status-dot me-2 bg-success"></span>
          {isActiveSession ? "Active Session" : "Inactive Session"}
        </p>
        {/* "Since..." time text styling */}
        {isActiveSession && (
          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
            Since {sessionStartTime}
          </p>
        )}
      </div>
    </DashboardCard>
  );
};

export default CurrentStatusCard;
