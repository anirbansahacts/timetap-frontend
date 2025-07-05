import React, { useState, useEffect, useMemo } from 'react';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ShiftSwapService from './ShiftSwapService';
import {debounce} from 'lodash';

/**
 * Form for an employee to request a shift swap.
 * It dynamically fetches current shift assignment and available shifts based on employee ID.
 * @param {Function} onSwapRequestSuccess - Callback function to execute on successful swap request.
 * @param {Function} onCancel - Callback function to execute when the cancel button is clicked.
 * @param {string} [initialEmployeeId] - Optional, pre-fills the employee ID if provided (e.g., from Employee dashboard).
 * @param {number} [initialOriginalShiftId] - Optional, pre-fills the original shift ID if provided.
 */
function ShiftSwapRequestForm({ onSwapRequestSuccess, onCancel, initialEmployeeId, initialOriginalShiftId }) {
    const [employeeIdInput, setEmployeeIdInput] = useState(initialEmployeeId || '');
    const [employeeId, setEmployeeId] = useState(initialEmployeeId || ''); // Actual ID used for API calls after debounce
    const [originalShiftId, setOriginalShiftId] = useState(initialOriginalShiftId || null);
    const [originalShiftName, setOriginalShiftName] = useState('');
    const [requestedShiftId, setRequestedShiftId] = useState('');
    const [swapDate, setSwapDate] = useState('');
    const [reason, setReason] = useState('');
    const [availableShifts, setAvailableShifts] = useState([]);
    const [loadingData, setLoadingData] = useState(false); // Loading for initial data fetch (shifts, assignments)
    const [dataError, setDataError] = useState(null); // Error for initial data fetch
    const [isSwapBlocked, setIsSwapBlocked] = useState(false); // State to block swap submission

    const [formSubmitMessage, setFormSubmitMessage] = useState(null); // Success message for form submission
    const [formSubmitError, setFormSubmitError] = useState(null); // Error message for form submission
    const [submittingSwapRequest, setSubmittingSwapRequest] = useState(false); // Loading for swap submission

    // Debounced function to update employeeId state after user stops typing
    const debouncedSetEmployeeId = useMemo(
        () =>
            debounce((id) => {
                setEmployeeId(id);
            }, 500), // 500ms debounce time
        []
    );

    // Effect to handle initial employee ID and fetch related data
    useEffect(() => {
      if (initialOriginalShiftId && initialEmployeeId) {
        // If initial props are provided, set them directly without debouncing
        setEmployeeIdInput(initialEmployeeId);
        setEmployeeId(initialEmployeeId);
        setOriginalShiftId(initialOriginalShiftId);
        // Data fetch will be triggered by the `employeeId` dependency below
      }
    }, [initialEmployeeId, initialOriginalShiftId]);

    // Effect to fetch current assignment and available shifts based on employeeId
    useEffect(() => {
        const fetchShiftAndAssignmentData = async () => {
            // Reset states when employeeId changes or becomes empty
            if (!employeeId || employeeId.length === 0 || isNaN(Number(employeeId))) {
                setDataError(null);
                setOriginalShiftId(null);
                setOriginalShiftName('');
                setAvailableShifts([]);
                setIsSwapBlocked(false);
                setRequestedShiftId('');
                return;
            }

            setLoadingData(true);
            setDataError(null);
            setIsSwapBlocked(false);
            setOriginalShiftId(null);
            setOriginalShiftName('');
            setAvailableShifts([]);
            setRequestedShiftId('');

            try {
                // Fetch current assignment for the employee
                const currentAssignment = await ShiftSwapService.getEmployeeCurrentAssignment(Number(employeeId));

                if (!currentAssignment || !currentAssignment.shiftId) {
                    throw new Error("No current shift assignment found for this employee.");
                }

                setOriginalShiftId(currentAssignment.shiftId);
                setOriginalShiftName(currentAssignment.shiftName);

                const currentShiftCount = currentAssignment.shiftCount; // Assuming shiftCount is part of currentAssignment

                // Frontend validation: Cannot swap from a shift with less than 3 people (immediate feedback)
                if (currentShiftCount < 3) {
                    setDataError(
                        `You are in "${currentAssignment.shiftName}" (ID: ${currentAssignment.shiftId}), which has only ${currentShiftCount} people. Swapping from shifts with less than 3 people is not allowed.`
                    );
                    setIsSwapBlocked(true);
                    setAvailableShifts([]); // No available shifts if blocked
                    return;
                }

                // Fetch all available shifts
                const allShifts = await ShiftSwapService.getAllShiftDetails();

                // Filter out the current shift and any full shifts
                const filteredShifts = allShifts.filter(shift =>
                    shift.shiftId !== currentAssignment.shiftId && // Cannot swap to own current shift
                    shift.shiftCount < 10 // Cannot swap to a full shift (assuming max capacity is 10)
                ).sort((a, b) => a.shiftId - b.shiftId); // Sort by shift ID for consistent order

                setAvailableShifts(filteredShifts);

                if (filteredShifts.length === 0) {
                    setDataError("No suitable shifts found for swap. All other shifts might be full or not available.");
                }

            } catch (error) {
                // Display the error message from the backend (already processed by ShiftSwapService)
                setDataError(error || "Failed to fetch employee's shift data. Please check Employee ID or network connection.");
                setOriginalShiftId(null);
                setOriginalShiftName('');
                setAvailableShifts([]);
                setIsSwapBlocked(true);
                setRequestedShiftId('');
            } finally {
                setLoadingData(false);
            }
        };

        // Trigger fetch only if employeeId is valid and not already set by initial props
        if (employeeId && !isNaN(Number(employeeId)) && (!initialEmployeeId || (initialEmployeeId && employeeId === initialEmployeeId))) {
          fetchShiftAndAssignmentData();
        } else if (!employeeId || isNaN(Number(employeeId))) {
          // Clear data if employeeId is invalid or empty
          setDataError(null);
          setOriginalShiftId(null);
          setOriginalShiftName('');
          setAvailableShifts([]);
          setIsSwapBlocked(false);
          setRequestedShiftId('');
        }

        // Cleanup function for debounce
        return () => {
            debouncedSetEmployeeId.cancel();
        };
    }, [employeeId, debouncedSetEmployeeId, initialEmployeeId, initialOriginalShiftId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittingSwapRequest(true);
        setFormSubmitMessage(null);
        setFormSubmitError(null);

        // Frontend validations that provide immediate feedback and prevent unnecessary API calls
        if (isSwapBlocked) {
            setFormSubmitError(dataError || "Swap is currently blocked due to original shift conditions.");
            setSubmittingSwapRequest(false);
            return;
        }

        if (!employeeId || !originalShiftId || !requestedShiftId || !swapDate || !reason) {
            setFormSubmitError("Please fill in all required fields.");
            setSubmittingSwapRequest(false);
            return;
        }

        // This check remains client-side as it's based on readily available data
        if (parseInt(requestedShiftId) === originalShiftId) {
            setFormSubmitError("Requested shift cannot be the same as your current shift.");
            setSubmittingSwapRequest(false);
            return;
        }

        // This check remains client-side as it's based on readily available data
        const selectedRequestedShift = availableShifts.find(shift => shift.shiftId === parseInt(requestedShiftId));
        if (!selectedRequestedShift) {
            setFormSubmitError("Invalid desired shift selected. Please choose from the available options.");
            setSubmittingSwapRequest(false);
            return;
        }
        // This check remains client-side for immediate feedback, though backend will also validate
        if (selectedRequestedShift.shiftCount >= 10) {
            setFormSubmitError("The selected desired shift is now full. Please choose another shift.");
            setSubmittingSwapRequest(false);
            return;
        }

        const swapRequestData = {
            employeeId: parseInt(employeeId),
            originalShiftId: originalShiftId,
            requestedShiftId: parseInt(requestedShiftId),
            swapDate: swapDate,
            reason: reason,
        };

        try {
            const response = await ShiftSwapService.requestShiftSwap(swapRequestData);
            setFormSubmitMessage(response || "Shift swap request submitted successfully!");
            // Clear form fields after successful submission, keeping initialEmployeeId if provided
            setEmployeeIdInput(initialEmployeeId || '');
            setEmployeeId(initialEmployeeId || '');
            setOriginalShiftId(initialOriginalShiftId || null);
            setOriginalShiftName('');
            setRequestedShiftId('');
            setSwapDate('');
            setReason('');
            setAvailableShifts([]); // Clear available shifts to re-fetch on next interaction
            setDataError(null);
            setIsSwapBlocked(false);

            if (onSwapRequestSuccess) {
                onSwapRequestSuccess(); // Notify parent to refresh history
            }
        } catch (error) {
            // Display the error message from the backend (already processed by ShiftSwapService)
            setFormSubmitError(error || "An unexpected error occurred during swap request.");
            console.error("Submission error:", error);
            setTimeout(() => setFormSubmitError(null), 5000); // Clear error message after 5 seconds
        } finally {
            setSubmittingSwapRequest(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formEmployeeId">
                <Form.Label column sm="4">Employee ID <span className="text-danger">*</span></Form.Label>
                <Col sm="8">
                    <Form.Control
                        type="number"
                        placeholder="Enter your Employee ID"
                        value={employeeIdInput}
                        onChange={(e) => {
                            setEmployeeIdInput(e.target.value);
                            if (!initialEmployeeId) {
                                debouncedSetEmployeeId(e.target.value);
                            }
                        }}
                        required
                        disabled={!!initialEmployeeId}
                    />
                </Col>
            </Form.Group>

            {loadingData && (
                <div className="text-center my-3">
                    <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                    <span className="text-primary">Loading shift data...</span>
                </div>
            )}

            {dataError && <Alert variant="danger">{dataError}</Alert>}

            {originalShiftId && !isSwapBlocked && (
                <Alert variant="info" className="mb-3">
                    Your Current Shift: <strong>{originalShiftName} (ID: {originalShiftId})</strong>
                </Alert>
            )}

            <Form.Group as={Row} className="mb-3" controlId="formRequestedShiftId">
                <Form.Label column sm="4">Desired Shift <span className="text-danger">*</span></Form.Label>
                <Col sm="8">
                    <Form.Control
                        as="select"
                        value={requestedShiftId}
                        onChange={(e) => setRequestedShiftId(e.target.value)}
                        required
                        disabled={!employeeId || isSwapBlocked || loadingData || availableShifts.length === 0 || isNaN(Number(employeeId))}
                    >
                        <option value="">Select a shift to swap to</option>
                        {availableShifts.map((shift) => (
                            <option
                                key={shift.shiftId}
                                value={shift.shiftId}
                                disabled={shift.shiftCount >= 10}
                            >
                                {`Shift ${shift.shiftId}: ${shift.shiftName} (${shift.shiftStartTime} - ${shift.shiftEndTime}) - Current People: ${shift.shiftCount} ${
                                    shift.shiftCount >= 10 ? '(FULL)' : ''
                                }`}
                            </option>
                        ))}
                    </Form.Control>
                    {availableShifts.length === 0 && !loadingData && !dataError && employeeId && !isSwapBlocked && (
                        <Form.Text className="text-muted">
                            No other suitable shifts available for swap at the moment.
                        </Form.Text>
                    )}
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formSwapDate">
                <Form.Label column sm="4">Swap Date <span className="text-danger">*</span></Form.Label>
                <Col sm="8">
                    <Form.Control
                        type="date"
                        value={swapDate}
                        onChange={(e) => setSwapDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        disabled={isSwapBlocked || !employeeId || loadingData || availableShifts.length === 0 || isNaN(Number(employeeId))}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formReason">
                <Form.Label column sm="4">Reason for Swap <span className="text-danger">*</span></Form.Label>
                <Col sm="8">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter reason for shift swap"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        disabled={isSwapBlocked || !employeeId || loadingData || availableShifts.length === 0 || isNaN(Number(employeeId))}
                    />
                </Col>
            </Form.Group>

            {formSubmitMessage && <Alert variant="success">{formSubmitMessage}</Alert>}
            {formSubmitError && <Alert variant="danger">{formSubmitError}</Alert>}

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={submittingSwapRequest}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSwapBlocked || !requestedShiftId || !swapDate || !reason || !employeeId || loadingData || submittingSwapRequest || isNaN(Number(employeeId))}
                >
                    Submit Shift Swap Request
                </Button>
            </div>
        </Form>
    );
}

export default ShiftSwapRequestForm;