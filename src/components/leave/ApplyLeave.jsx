import React, { useState } from "react";
import { applyLeave } from "../../services/leaveService";
import LeaveType from "../../enums/leaveTypes";
import DatePicker from "react-datepicker";
import { Card, Button, Form, Toast, ToastContainer } from "react-bootstrap";

const ApplyLeave = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState(LeaveType.PERSONAL);
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dateError, setDateError] = useState("");

  const today = new Date().setHours(0, 0, 0, 0);

  const isDateInvalid =
    leaveStartDate &&
    leaveEndDate &&
    new Date(leaveEndDate) < new Date(leaveStartDate);

  const isPastDateInvalid =
    (leaveStartDate && new Date(leaveStartDate).setHours(0, 0, 0, 0) < today) ||
    (leaveEndDate && new Date(leaveEndDate).setHours(0, 0, 0, 0) < today);

  const isReasonInvalid = reason && reason.length < 10;

  const isFormValid = () =>
    employeeId &&
    parseInt(employeeId) > 0 &&
    leaveStartDate &&
    leaveEndDate &&
    reason.length >= 10 &&
    !isDateInvalid &&
    !isPastDateInvalid;

  const showToastMessage = (msg, type) => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMsg("");
    setToastMessage("");
    setShowToast(false);

    if (isDateInvalid) {
      showToastMessage("❌ End date cannot be before start date.", "danger");
      return;
    }

    if (isPastDateInvalid) {
      showToastMessage("❌ You cannot apply for past dates.", "danger");
      return;
    }

    if (isReasonInvalid) {
      showToastMessage("❌ Reason must be at least 10 characters.", "danger");
      return;
    }

    try {
      const response = await applyLeave({
        employeeId: parseInt(employeeId),
        leaveType,
        leaveStartDate,
        leaveEndDate,
        reason,
      });

      // ✅ Backend should return 200, now check status explicitly
      if (response.status === 200 || response.status === 201) {
        setSuccessMsg("✅ Leave applied successfully!");
        setEmployeeId("");
        setLeaveType(LeaveType.PERSONAL);
        setLeaveStartDate("");
        setLeaveEndDate("");
        setReason("");

        setTimeout(() => setSuccessMsg(""), 3000); // Auto hide
      } else {
        showToastMessage("❌ Failed to apply leave.", "danger");
      }
    } catch (error) {
      console.error("Apply leave error:", error);
      const backendMessage = error?.response?.data?.message;
      showToastMessage(
        `❌ ${backendMessage || "Failed to apply leave."}`,
        "danger"
      );
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Form onSubmit={handleApply}>
            {/* <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="number"
                className={!employeeId ? "is-invalid" : ""}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                className={
                  !employeeId || parseInt(employeeId) <= 0 ? "is-invalid" : ""
                }
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid positive Employee ID.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                {Object.values(LeaveType).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>From Date :</Form.Label>
              <DatePicker
                id="fromDate"
                selected={leaveStartDate}
                onChange={(date) => {
                  setLeaveStartDate(date);
                  if (leaveEndDate && date && leaveEndDate < date) {
                    setLeaveEndDate(null);
                    setDateError(
                      `"To Date" was reset as it's earlier than new "From Date".`
                    );
                  } else {
                    setDateError("");
                  }
                }}
                selectsStart
                startDate={leaveStartDate}
                endDate={leaveEndDate}
                placeholderText="Select start date"
                className={
                  isDateInvalid || isPastDateInvalid
                    ? "is-invalid form-control"
                    : "form-control"
                }
                dateFormat="yyyy/MM/dd"
                isClearable
                autoComplete="off"
                value={leaveStartDate}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>To Date :</Form.Label>
              <DatePicker
                id="toDate"
                selected={leaveEndDate}
                onChange={(date) => {
                  setLeaveEndDate(date);
                  if (leaveStartDate && date && date < leaveStartDate) {
                    setDateError(
                      `"To Date" cannot be earlier than "From Date".`
                    );
                  } else {
                    setDateError("");
                  }
                }}
                selectsEnd
                startDate={leaveStartDate}
                endDate={leaveEndDate}
                minDate={leaveStartDate}
                placeholderText="Select end date"
                className={
                  isDateInvalid || isPastDateInvalid
                    ? "is-invalid form-control"
                    : "form-control"
                }
                dateFormat="yyyy/MM/dd"
                isClearable
                autoComplete="off"
                value={leaveEndDate}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason (min 10 characters)</Form.Label>
              <Form.Control
                as="textarea"
                className={isReasonInvalid ? "is-invalid" : ""}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={!isFormValid()}>
              Apply Leave
            </Button>

            {/* ✅ React-based success message */}
            {successMsg && (
              <p className="mt-3 fw-bold text-success">{successMsg}</p>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Toasts */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1055 }}
      >
        <Toast
          show={showToast}
          bg={toastType}
          onClose={() => setShowToast(false)}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ApplyLeave;
