// src/components/dashboard/CurrentTimeCard.jsx
import React, { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard"; // Adjust path as needed
import Clock from "../../assets/logo.svg?react"; // Example icon

const CurrentTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const dayOptions = { weekday: "long" };

  const formattedTime = currentTime.toLocaleTimeString("en-US", timeOptions);
  const formattedDate = currentTime.toLocaleDateString("en-US", dateOptions);
  const formattedDay = currentTime.toLocaleDateString("en-US", dayOptions);
  const ampm = formattedTime.slice(-2); // Extract AM/PM

  return (
    <DashboardCard
      className="h-100 d-flex flex-column text-white"
      style={{ backgroundColor: "#222C4C" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-uppercase fw-bold opacity-75 d-flex align-items-center">
          <Clock className="mx-4" width={20} height={20} /> Current Time
        </span>
      </div>
      <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold mb-0">{formattedTime.slice(0, -3)}</h1>
        <p className="fs-4 fw-bold opacity-75">{ampm}</p>
        <p className="fs-5 opacity-75 mb-0">{formattedDate}</p>
        <p className="fs-6 opacity-75">{formattedDay}</p>
      </div>
    </DashboardCard>
  );
};

export default CurrentTimeCard;
