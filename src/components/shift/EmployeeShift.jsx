import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Card, Button, Alert, Table, Modal, Form, Spinner, Row, Col } from 'react-bootstrap';
import shiftAssignmentService from './shift-assignment/ShiftAssignmentService';
import ShiftSwapService from './shift-swap/ShiftSwapService';
import ShiftSwapRequestForm from './shift-swap/ShiftSwapRequestForm';
import ShiftSwapList from './shift-swap/ShiftSwapList';

const EmployeeShift = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [tokenError, setTokenError] = useState('');
  const [myAssignedShifts, setMyAssignedShifts] = useState([]);
  const [loadingAssignedShifts, setLoadingAssignedShifts] = useState(true);
  const [assignedShiftsError, setAssignedShiftsError] = useState('');
  const [mySwapRequests, setMySwapRequests] = useState([]);
  const [loadingMySwapRequests, setLoadingMySwapRequests] = useState(true);
  const [mySwapRequestsError, setMySwapRequestsError] = useState('');

  const [allShiftDetails, setAllShiftDetails] = useState([]);
  const [loadingShiftDetails, setLoadingShiftDetails] = useState(true);
  const [shiftDetailsError, setShiftDetailsError] = useState('');

  const [showSwapRequestModal, setShowSwapRequestModal] = useState(false);
  const [selectedShiftForSwap, setSelectedShiftForSwap] = useState(null);


  const decodeJwt = useCallback((token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding JWT:", e);
      return null;
    }
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken = decodeJwt(jwtToken);
      if (decodedToken && decodedToken.employeeId) {
        setEmployeeId(Number(decodedToken.employeeId));
      } else {
        setTokenError("Employee ID not found in JWT token.");
        setLoadingAssignedShifts(false);
        setLoadingMySwapRequests(false);
        setLoadingShiftDetails(false);
      }
    } else {
      setTokenError("No JWT token found in local storage. Please log in.");
      setLoadingAssignedShifts(false);
      setLoadingMySwapRequests(false);
      setLoadingShiftDetails(false);
    }
  }, [decodeJwt]);


  // Fetch all shift details on component mount
  useEffect(() => {
    const fetchAllShiftDetails = async () => {
      try {
        const data = await ShiftSwapService.getAllShiftDetails();
        setAllShiftDetails(data);
      } catch (err) {
        console.error('Error fetching all shift details:', err);
        // Display backend error message
        setShiftDetailsError(err || 'Failed to load shift details for swap history.');
      } finally {
        setLoadingShiftDetails(false);
      }
    };
    fetchAllShiftDetails();
  }, []);

  const enrichSwapRequests = useCallback((requests) => {
    if (!allShiftDetails.length) return requests;

    return requests.map(req => {
      const originalShift = allShiftDetails.find(shift => shift.shiftId === req.originalShiftId);
      const desiredShift = allShiftDetails.find(shift => shift.shiftId === req.requestedShiftId);
      return {
        ...req,
        currentShiftId: req.originalShiftId,
        currentShiftName: originalShift ? originalShift.shiftName : 'Unknown Shift',
        desiredShiftId: req.requestedShiftId,
        desiredShiftName: desiredShift ? desiredShift.shiftName : 'Unknown Shift',
        requestDate: req.swapDate,
      };
    });
  }, [allShiftDetails]);

  const fetchMyAssignedShifts = useCallback(async () => {
    if (!employeeId) {
      setMyAssignedShifts([]);
      setAssignedShiftsError('');
      setLoadingAssignedShifts(false);
      return;
    }

    setLoadingAssignedShifts(true);
    setAssignedShiftsError('');
    try {
      const response = await shiftAssignmentService.getAssignmentsByEmployee(employeeId);
      setMyAssignedShifts(response.data || []);
    } catch (err) {
      console.error('Error fetching my assigned shifts:', err);
      // Display backend error message directly
      setAssignedShiftsError(err || 'Failed to fetch assigned shifts.');
      setMyAssignedShifts([]);
    } finally {
      setLoadingAssignedShifts(false);
    }
  }, [employeeId]);

  const fetchMySwapRequests = useCallback(async () => {
    if (!employeeId) {
      setMySwapRequests([]);
      setMySwapRequestsError('');
      setLoadingMySwapRequests(false);
      return;
    }

    setLoadingMySwapRequests(true);
    setMySwapRequestsError('');
    try {
      const data = await ShiftSwapService.getEmployeeSwaps(employeeId);
      const enrichedData = enrichSwapRequests(data || []);
      setMySwapRequests(enrichedData);
    } catch (err) {
      console.error('Error fetching my swap requests:', err);
      // Display backend error message directly
      setMySwapRequestsError(err || 'Failed to fetch swap requests.');
      setMySwapRequests([]);
    } finally {
      setLoadingMySwapRequests(false);
    }
  }, [employeeId, enrichSwapRequests]);

  useEffect(() => {
    if (employeeId) {
      fetchMyAssignedShifts();
    }
  }, [employeeId, fetchMyAssignedShifts]);

  useEffect(() => {
    if (employeeId && !loadingShiftDetails) {
      fetchMySwapRequests();
    }
  }, [employeeId, fetchMySwapRequests, loadingShiftDetails]);

  const handleOpenSwapRequestModal = (shift) => {
    setSelectedShiftForSwap(shift);
    setShowSwapRequestModal(true);
  };

  const handleCloseSwapRequestModal = () => {
    setShowSwapRequestModal(false);
    setSelectedShiftForSwap(null);
  };

  const handleSwapRequestSubmitted = () => {
    fetchMySwapRequests();
    handleCloseSwapRequestModal();
  };

  return (
    <Container className="my-5">

      {employeeId && <Alert variant="success" className="text-center">
        Welcome, Employee ID: {employeeId}!
      </Alert>}

      {/* Card: My Assigned Shifts */}
      <Card className="shadow-sm mb-4 border-0 ">
        <Card.Header className="bg-info text-white py-3">
          <h4 className="mb-0 text-center">Your Assigned Shifts</h4>
        </Card.Header>
        <Card.Body>
          {loadingAssignedShifts ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-primary">Loading your assigned shift...</p>
            </div>
          ) : assignedShiftsError ? (
            <Alert variant="danger" className="text-center">{assignedShiftsError}</Alert>
          ) : myAssignedShifts.length === 0 ? (
            <Alert variant="info" className="text-center">No assigned shifts found for your Employee ID.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center"> {/* Added justify-content-center here */}
              {myAssignedShifts.map((shift) => (
                <Col key={shift.assignmentId}>
                  <Card className="h-100 shadow-sm border-primary">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-primary mb-3">
                        <i className="bi bi-calendar-check me-2"></i>Shift Name : {shift.shiftName}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"><strong>Assignment ID:</strong> {shift.assignmentId}</Card.Subtitle>
                      <Card.Text className="flex-grow-1">
                        <strong>Shift Timings :</strong> {shift.startTime} - {shift.endTime}<br />
                        <strong>Assigned Period:</strong> {shift.assignedFromDate} to {shift.assignedToDate}
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="w-100 mt-auto"
                        onClick={() => handleOpenSwapRequestModal(shift)}
                      >
                        <i className="bi bi-arrow-left-right me-2"></i>Request Swap
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Card: My Shift Swap History */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Header className="bg-warning text-white py-3">
          <h4 className="mb-0">My Shift Swap History</h4>
        </Card.Header>
        <Card.Body>
            {loadingMySwapRequests || loadingShiftDetails ? (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-primary">Loading your swap requests...</p>
                </div>
            ) : mySwapRequestsError || shiftDetailsError ? (
                // Display error directly as it comes from the service
                <Alert variant="danger" className="text-center">Error: {mySwapRequestsError || shiftDetailsError}</Alert>
            ) : mySwapRequests.length === 0 ? (
                <Alert variant="info" className="text-center">No swap requests found for your Employee ID.</Alert>
            ) : (
                <ShiftSwapList
                    title="Your Shift Swap Requests"
                    requests={mySwapRequests}
                    loading={loadingMySwapRequests}
                    error={mySwapRequestsError}
                    isReviewable={false}
                    showEmployeeIdColumn={false}
                />
            )}
        </Card.Body>
      </Card>

      {/* Shift Swap Request Modal */}
      <Modal show={showSwapRequestModal} onHide={handleCloseSwapRequestModal} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Request a Shift Swap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShiftSwapRequestForm
            initialEmployeeId={employeeId}
            initialOriginalShiftId={selectedShiftForSwap?.shiftId}
            onSwapRequestSuccess={handleSwapRequestSubmitted}
            onCancel={handleCloseSwapRequestModal} 
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmployeeShift;