// src/components/shiftDetails/ShiftCreation.jsx
import React, { useState } from 'react';
import ShiftForm from './ShiftForm'; // Ensure ShiftForm.jsx is in the same directory
import shiftDetailsService from './shiftDetailsService'; // Ensure shiftDetailsService.js is in the same directory
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

const ShiftCreation = ({ onShiftCreated, onCancel }) => {
  const [loading, setLoading] = useState(false);
  // Removed successMessage state as it's now handled by toasts in ShiftDetails
  const [errorMessage, setErrorMessage] = useState(''); // Keep for inline form error if different from toast

  const handleCreateShift = async (shiftData) => {
    setLoading(true);
    // setSuccessMessage(''); // No longer needed
    setErrorMessage('');

    try {
      await shiftDetailsService.createShift(shiftData);
      // setSuccessMessage('Shift created successfully!'); // No longer needed
      if (onShiftCreated) {
        onShiftCreated('Shift created successfully!', 'success'); // Pass message and type for toast
      }
      // Removed setTimeout as Toast handles auto-hide
    } catch (error) {
      console.error('Error creating shift:', error);
      setErrorMessage(error); // Keep inline error for immediate feedback on form
      if (onShiftCreated) {
        onShiftCreated(`Error creating shift: ${error}`, 'danger'); // Pass error message and type to toast
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-info text-white py-2 d-flex justify-content-between align-items-center">
        Create New Shift
        {onCancel && (
          <Button variant="transparent" className="btn-close btn-close-white" aria-label="Close" onClick={onCancel}></Button>
        )}
      </Card.Header>
      <Card.Body>
        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" size="sm" role="status" className="me-2" />
            <span className="text-info">Creating shift...</span>
          </div>
        )}

        {/* Removed successMessage Alert as toasts are used */}

        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}

        <ShiftForm onSubmit={handleCreateShift} onCancel={onCancel} />
      </Card.Body>
    </Card>
  );
};

export default ShiftCreation;