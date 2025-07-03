// src/components/dashboard/AttendanceCard.jsx

import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import DashboardCard from "./DashboardCard";
import Logo from "../../assets/logo.svg?react";

const AttendanceCard = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState(null);
  const [enteredHour, setEnteredHour] = useState("");
  const [enteredMinute, setEnteredMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [modalType, setModalType] = useState("checkin");
  const [message, setMessage] = useState({ type: "", text: "" });
  const resetModalState = () => {
    setEnteredHour("");
    setEnteredMinute("");
    setAmpm("AM");
  };

  const openModal = (type) => {
    resetModalState();
    setModalType(type);

    if (type === "checkin") {
      if (isCheckedIn) {
        showTempMessage("danger", "You are already Checked In!");
      } else {
        setShowCheckInModal(true);
      }
    } else {
      if (!isCheckedIn) {
        showTempMessage("danger", "No Check In Found! Please Check In First.");
      } else {
        setShowCheckOutModal(true);
      }
    }
  };

  const showTempMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleTimeSubmit = () => {
    if (!enteredHour || !enteredMinute) {
      showTempMessage("danger", "Please enter a complete time (HH:MM).");
      return;
    }

    let hour = parseInt(enteredHour);
    const minute = parseInt(enteredMinute);

    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 1 ||
      hour > 12 ||
      minute < 0 ||
      minute > 59
    ) {
      showTempMessage(
        "danger",
        "Invalid time format. Please use HH:MM (1-12)."
      );
      return;
    }

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const displayTime = `${String(enteredHour).padStart(2, "0")}:${String(
      enteredMinute
    ).padStart(2, "0")} ${ampm}`;

    if (modalType === "checkin") {
      setIsCheckedIn(true);
      setLastCheckInTime(displayTime);
      showTempMessage("success", `Checked In at ${displayTime}`);
      setShowCheckInModal(false);
    } else {
      setIsCheckedIn(false);
      setLastCheckInTime(null);
      showTempMessage("success", `Checked Out at ${displayTime}`);
      setShowCheckOutModal(false);
    }
  };

  return (
    <DashboardCard className="h-100 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center justify-content-center w-100 mb-3">
        <Logo className="mx-2" width={20} height={20} />
        <span className="text-uppercase fw-bold text-muted me-2">
          Attendance
        </span>
      </div>

      {message.text && (
        <Alert
          variant={message.type}
          onClose={() => setMessage({ type: "", text: "" })}
          dismissible
          className="mb-3 rounded-3 fw-bold border-0"
          data-bs-theme={message.type === "danger" ? "dark" : "light"}
        >
          {message.text}
        </Alert>
      )}
      <div className="d-grid gap-2 mb-3">
        <Button
          className={` btn btn-success py-3 d-flex align-items-center justify-content-center fw-bold rounded-3 shadow`}
          onClick={() => openModal("checkin")}
          disabled={isCheckedIn}
        >
          Check In
        </Button>

        <Button
          className={` btn btn-danger py-3 d-flex align-items-center justify-content-center fw-bold rounded-3 shadow`}
          onClick={() => openModal("checkout")}
          disabled={!isCheckedIn}
        >
          Check Out
        </Button>
      </div>

      <div className="text-center mt-auto">
        <small
          className={`fw-bold ${isCheckedIn ? "text-success" : "text-muted"}`}
        >
          <span
            className={`status-dot me-2 ${
              isCheckedIn ? "bg-success" : "bg-secondary"
            }`}
          ></span>
          {isCheckedIn ? "Currently Checked In" : "Currently Checked Out"}
        </small>
        {lastCheckInTime && isCheckedIn && (
          <p className="text-muted small mb-0">Since: {lastCheckInTime}</p>
        )}
      </div>

      <Modal
        show={modalType === "checkin" ? showCheckInModal : showCheckOutModal}
        onHide={() =>
          modalType === "checkin"
            ? setShowCheckInModal(false)
            : setShowCheckOutModal(false)
        }
        centered
      >
        <Modal.Header
          closeButton
          className="text-white border-0"
          style={{ backgroundColor: "var(--dark-blue)" }}
        >
          <Modal.Title>
            {modalType === "checkin"
              ? "Enter Check In Time"
              : "Enter Check Out Time"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Time (HH:MM)</Form.Label>
              <Row className="g-2">
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="HH"
                    min="1"
                    max="12"
                    value={enteredHour}
                    onChange={(e) => setEnteredHour(e.target.value)}
                    className="text-center"
                    autoComplete="off"
                  />
                </Col>
                <Col
                  xs="auto"
                  className="d-flex align-items-center p-0 text-muted fw-bold"
                >
                  :
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="MM"
                    min="0"
                    max="59"
                    value={enteredMinute}
                    onChange={(e) => setEnteredMinute(e.target.value)}
                    className="text-center"
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Form.Select
                    value={ampm}
                    onChange={(e) => setAmpm(e.target.value)}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0">
          <Button
            className="rounded-3 shadow btn"
            onClick={handleTimeSubmit}
            style={{ backgroundColor: "var(--dark-blue)" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardCard>
  );
};

export default AttendanceCard;
