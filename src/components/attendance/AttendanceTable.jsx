import React from "react";
import { Table } from "react-bootstrap";

const AttendanceTable = ({ employeeId }) => {
  const staticSampleRecords = [
    {
      clockInDate: "2025/06/27",
      clockInTime: "09:00 AM",
      clockOutTime: "05:00 PM",
      workHours: "8.00",
    },
    {
      clockInDate: "2025/06/26",
      clockInTime: "09:10 AM",
      clockOutTime: "05:15 PM",
      workHours: "8.05",
    },
    {
      clockInDate: "2025/06/25",
      clockInTime: "08:58 AM",
      clockOutTime: "05:02 PM",
      workHours: "8.04",
    },
    {
      clockInDate: "2025/06/24",
      clockInTime: "09:05 AM",
      clockOutTime: "05:05 PM",
      workHours: "8.00",
    },
    {
      clockInDate: "2025/06/23",
      clockInTime: "09:00 AM",
      clockOutTime: "05:00 PM",
      workHours: "8.00",
    },
  ];

  return (
    <div className="attendance-table-container mt-3">
      <h5>
        Attendance Records for Employee ID:
        <span className="fw-bold">{employeeId || "N/A"}</span>
      </h5>
      {staticSampleRecords.length === 0 ? (
        <p>No sample attendance records available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
            </tr>
          </thead>
          <tbody>
            {staticSampleRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.clockInDate}</td>
                <td>{record.clockInTime || "—"}</td>
                <td>{record.clockOutTime || "—"}</td>
                <td>{record.workHours || "—"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AttendanceTable;
