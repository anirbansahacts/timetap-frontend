// src/components/shiftDetails/UpdateShiftModal.jsx
import React from 'react';
import ShiftForm from './ShiftForm';
import { Modal, Alert } from 'react-bootstrap';

const UpdateShiftModal = ({ show, onClose, shiftData, onSubmit, message }) => { // 'message' prop might be null now as toasts handle success/error
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white poppins-font">
        <Modal.Title>Update Shift Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* This Alert will only show if the 'message' prop is explicitly passed with content.
            Success/error feedback is primarily handled by Toasts in ShiftDetails.jsx now. */}
        {message && (
          <Alert variant={message.includes('successfully') ? 'success' : 'danger'} className="poppins-font">
            {message}
          </Alert>
        )}
        {shiftData ? (
          <ShiftForm onSubmit={onSubmit} shiftData={shiftData} onCancel={onClose} />
        ) : (
          <Alert variant="warning" className="poppins-font">No shift data available for editing.</Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateShiftModal;