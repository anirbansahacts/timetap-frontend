// src/pages/ReportPage.jsx

import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const employeeId = 555;
  const employeeName = "Harvey Spectre";
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dateError, setDateError] = useState("");

  const handleGenerateReport = (event) => {
    event.preventDefault();

    if (!fromDate || !toDate) {
      setDateError('Please select both a "From" and "To" date.');
      return;
    }

    if (toDate < fromDate) {
      setDateError('"To Date" cannot be earlier than "From Date".');
      return;
    }

    setDateError("");

    // --- IMPORTANT CHANGE HERE: Pass data via the 'state' object ---
    navigate("/report-dash", {
      state: {
        fromDate: fromDate.toISOString(), // Convert Date object to ISO string
        toDate: toDate.toISOString(), // Convert Date object to ISO string
        employeeId: employeeId,
        employeeName: employeeName,
      },
    });

    // Removed the alert here, as the ReportDashboard will now display the info
    console.log(
      "Generating report for Employee ID:",
      employeeId,
      "Name:",
      employeeName,
      "from:",
      fromDate,
      "to:",
      toDate,
      "Redirecting to /report-dash"
    );
  };

  return (
    <>
      <PageHeader label={"Generate Attendance and Leave Report"} />{" "}
      <div className="container mt-4">
        <div className="card p-4 shadow-sm border-0">
          <h3 className="mb-4">Generate Report</h3>{" "}
          <form onSubmit={handleGenerateReport}>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="employeeIdInput" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeIdInput"
                  className="form-control"
                  value={employeeId}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="employeeNameInput" className="form-label">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employeeNameInput"
                  className="form-control"
                  value={employeeName}
                  readOnly
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label me-2">
                  From Date
                </label>
                <DatePicker
                  id="fromDate"
                  selected={fromDate}
                  onChange={(date) => {
                    setFromDate(date);
                    if (toDate && date && toDate < date) {
                      setToDate(null);
                      setDateError(
                        `"To Date" was reset as it's earlier than new "From Date".`
                      );
                    } else {
                      setDateError("");
                    }
                  }}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText="Select start date"
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                  isClearable
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="toDate" className="form-label me-2">
                  To Date
                </label>
                <DatePicker
                  id="toDate"
                  selected={toDate}
                  onChange={(date) => {
                    setToDate(date);
                    if (fromDate && date && date < fromDate) {
                      setDateError(
                        `"To Date" cannot be earlier than "From Date".`
                      );
                    } else {
                      setDateError("");
                    }
                  }}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  placeholderText="Select end date"
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                  isClearable
                  autoComplete="off"
                />
              </div>
            </div>

            {dateError && (
              <div className="alert alert-danger mt-3" role="alert">
                {dateError}
              </div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!fromDate || !toDate}
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
