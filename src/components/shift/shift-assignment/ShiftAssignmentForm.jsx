// src/components/shift-assignment/ShiftAssignmentForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import shiftAssignmentService from './ShiftAssignmentService';

function ShiftAssignmentForm({ onAssignmentSuccess, onCancel }) {
    const [employeeIdsInput, setEmployeeIdsInput] = useState(''); // For comma-separated employee IDs
    const [shifts, setShifts] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState('');
    const [assignedFromDate, setAssignedFromDate] = useState('');    // First date input
    const [assignedToDate, setAssignedToDate] = useState('');        // Second date input
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchingShifts, setFetchingShifts] = useState(true);
    const [shiftsError, setShiftsError] = useState(''); // This will now always be a string

    useEffect(() => {
        const fetchShiftData = async () => {
            setFetchingShifts(true);
            setShiftsError('');
            try {
                const shiftsData = await shiftAssignmentService.getAllShiftDetails();
                setShifts(shiftsData || []);
            } catch (err) {
                console.error("Error fetching shift data:", err);
                // Ensure the error message is a string before setting state
                setShiftsError(err.message || String(err)); // Use err.message or convert to string
            } finally {
                setFetchingShifts(false);
            }
        };
        fetchShiftData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const parsedEmployeeIds = employeeIdsInput.split(',')
                                            .map(id => parseInt(id.trim()))
                                            .filter(id => !isNaN(id));

        if (parsedEmployeeIds.length === 0) {
            setErrorMessage('Please enter one or more valid Employee IDs');
            setLoading(false);
            return;
        }

        if (!selectedShiftId || !assignedFromDate || !assignedToDate) {
            setErrorMessage('Please select a Shift, Assigned From Date, and Assigned To Date.');
            setLoading(false);
            return;
        }

        if (new Date(assignedFromDate) > new Date(assignedToDate)) {
            setErrorMessage('Assigned From Date cannot be after Assigned To Date.');
            setLoading(false);
            return;
        }

        const request = {
            employeeIds: parsedEmployeeIds, // Changed to employeeIds to match service function signature
            shiftId: parseInt(selectedShiftId),
            assignedFromDate: assignedFromDate,
            assignedToDate: assignedToDate,
        };

        try {
            // Corrected service method name based on ShiftAssignmentService.js
            await shiftAssignmentService.assignShift(request.employeeIds, request.shiftId, request.assignedFromDate, request.assignedToDate);
            setSuccessMessage('Shift assigned successfully!');
            setEmployeeIdsInput('');
            setSelectedShiftId('');
            setAssignedFromDate('');
            setAssignedToDate('');
            if (onAssignmentSuccess) {
                onAssignmentSuccess();
            }
            setTimeout(() => {
                setSuccessMessage('');
                if (onCancel) onCancel();
            }, 2000);
        } catch (error) {
            console.error('Error assigning shift:', error);
            // The getErrorMessage helper in your service already returns a string.
            // When re-thrown from the service, it's typically caught as a string directly.
            // However, to be safe, convert it to a string.
            setErrorMessage(String(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-info text-white py-2 d-flex justify-content-between align-items-center">
                Assign New Shift
                {onCancel && (
                    <Button variant="transparent" className="btn-close btn-close-white" aria-label="Close" onClick={onCancel}></Button>
                )}
            </Card.Header>
            <Card.Body>
                {fetchingShifts && (
                    <div className="text-center my-3">
                        <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                        <span className="text-primary poppins-font">Loading shifts...</span>
                    </div>
                )}
                {/* Always ensure shiftsError is a string before rendering */}
                {shiftsError && (
                    <Alert variant="danger" className="text-center poppins-font">
                        {shiftsError}
                    </Alert>
                )}

                {loading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" size="sm" role="status" variant="primary" className="me-2" />
                        <span className="text-primary poppins-font">Assigning shift...</span>
                    </div>
                )}

                {successMessage && (
                    <Alert variant="success" className="text-center poppins-font">
                        {successMessage}
                    </Alert>
                )}

                {/* Always ensure errorMessage is a string before rendering */}
                {errorMessage && (
                    <Alert variant="danger" className="text-center poppins-font">
                        {errorMessage}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} className="poppins-font">
                    <Form.Group className="mb-3" controlId="formEmployeeIds">
                        <Form.Label>Employee IDs (comma-separated)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Employee IDs, e.g., 101, 102, 105"
                            value={employeeIdsInput}
                            onChange={(e) => setEmployeeIdsInput(e.target.value)}
                            required
                            className="poppins-font"
                        />
                        <Form.Text className="text-muted">
                            Enter multiple employee IDs separated by commas.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formShiftId">
                        <Form.Label>Shift</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedShiftId}
                            onChange={(e) => setSelectedShiftId(e.target.value)}
                            required
                            disabled={fetchingShifts}
                            className="poppins-font"
                        >
                            <option value="">Select Shift</option>
                            {shifts.map(shift => (
                                <option key={shift.shiftId} value={shift.shiftId}>
                                    {`Shift ${shift.shiftId}: ${shift.shiftName} (${shift.shiftStartTime} - ${shift.shiftEndTime}) - People: ${shift.shiftCount}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formAssignedFromDate">
                                <Form.Label>Assigned From Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={assignedFromDate}
                                    onChange={(e) => setAssignedFromDate(e.target.value)}
                                    required
                                    className="poppins-font"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formAssignedToDate">
                                <Form.Label>Assigned To Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={assignedToDate}
                                    onChange={(e) => setAssignedToDate(e.target.value)}
                                    required
                                    className="poppins-font"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="primary" type="submit" className="me-2 poppins-font" disabled={loading || fetchingShifts}>
                            Assign Shift
                        </Button>
                        {onCancel && (
                            <Button variant="secondary" onClick={onCancel} className="poppins-font" disabled={loading}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ShiftAssignmentForm;