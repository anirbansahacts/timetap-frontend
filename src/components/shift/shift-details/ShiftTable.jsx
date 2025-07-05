// src/components/shiftDetails/ShiftTable.jsx
import React from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const ShiftTable = ({ shifts, loading, error, onEdit, totalFilteredShifts }) => {
  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading shifts...</span>
        </Spinner>
        <p className="mt-2 text-primary poppins-font">Loading shifts...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center my-4 poppins-font">{error}</Alert>;
  }

  if (totalFilteredShifts === 0) {
    // Distinguish between no results from filter and genuinely no shifts at all
    if (!loading && !error && shifts.length === 0) {
        return (
            <Alert variant="info" className="text-center my-4 poppins-font">
                No shifts found in the system. Click "Add New Shift" to get started!
            </Alert>
        );
    }
    return <Alert variant="info" className="text-center my-4 poppins-font">No shifts found matching your criteria. Adjust your search!</Alert>;
  }

  return (
    <>
      <Table striped bordered hover responsive className="shadow-sm poppins-font">
        <thead className="bg-light">
          <tr>
            <th>ID</th>
            <th>Shift Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Shift Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.shiftId}>
              <td>{shift.shiftId}</td>
              {/* Optional: Add text-truncate for very long shift names if needed, requires max-width on parent */}
              <td>{shift.shiftName}</td>
              <td>{shift.shiftStartTime}</td>
              <td>{shift.shiftEndTime}</td>
              <td>{shift.shiftCount}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => onEdit(shift)} className="poppins-font d-flex align-items-center justify-content-center"> {/* Added d-flex classes for icon alignment */}
                  <i className="bi bi-pencil-square me-1"></i> Edit {/* Bootstrap Pencil Icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShiftTable;