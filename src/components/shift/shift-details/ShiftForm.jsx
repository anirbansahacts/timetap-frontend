// src/components/shiftDetails/ShiftForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ShiftForm = ({ onSubmit, shiftData, onCancel }) => {
  const [shiftName, setShiftName] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [validated, setValidated] = useState(false); // New state for validation

  useEffect(() => {
    if (shiftData) {
      setShiftName(shiftData.shiftName);
      setShiftStartTime(shiftData.shiftStartTime);
      setShiftEndTime(shiftData.shiftEndTime);
    } else {
      setShiftName('');
      setShiftStartTime('');
      setShiftEndTime('');
    }
    setValidated(false); // Reset validation state when shiftData changes or form is new/re-opened
  }, [shiftData]);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Custom validation for start/end time
      if (shiftStartTime && shiftEndTime && shiftStartTime >= shiftEndTime) {
        e.preventDefault();
        e.stopPropagation();
        // The `isInvalid` prop with `Form.Control.Feedback` will show the specific error message
      } else {
        e.preventDefault(); // Prevent default HTML form submission
        onSubmit({ shiftName, shiftStartTime, shiftEndTime });
      }
    }
    setValidated(true); // Set validated to true to show validation feedback
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="poppins-font"> {/* Added noValidate and validated */}
      <Row className="mb-3"> {/* Added mb-3 for vertical spacing */}
        <Col md={4}>
          <Form.Group controlId="formShiftName" className="mb-3">
            <Form.Label>Shift Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shift name"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              required
              className="poppins-font"
            />
            <Form.Control.Feedback type="invalid">
              Shift Name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formShiftStartTime" className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={shiftStartTime}
              onChange={(e) => setShiftStartTime(e.target.value)}
              required
              className="poppins-font"
            />
            <Form.Control.Feedback type="invalid">
              Start Time is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formShiftEndTime" className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={shiftEndTime}
              onChange={(e) => setShiftEndTime(e.target.value)}
              required
              isInvalid={shiftStartTime && shiftEndTime && shiftStartTime >= shiftEndTime} // Example inline validation for time logic
              className="poppins-font"
            />
            <Form.Control.Feedback type="invalid">
              {shiftStartTime && shiftEndTime && shiftStartTime >= shiftEndTime ? "End Time must be after Start Time." : "End Time is required."}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" type="submit" className="me-2 poppins-font">
          {shiftData ? 'Update Shift' : 'Create Shift'}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="poppins-font">
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ShiftForm;