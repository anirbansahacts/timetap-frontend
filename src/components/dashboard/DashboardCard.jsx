import React from "react";

const DashboardCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`card shadow-sm border-0 rounded-4 p-4 ${className}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
