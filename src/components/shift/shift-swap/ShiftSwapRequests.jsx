import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Card, Alert, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'; // Import icons
import ShiftSwapList from './ShiftSwapList';
import ShiftSwapService from './ShiftSwapService';

/**
 * Component for managers to view and review shift swap requests.
 * Displays pending requests with action buttons, and can toggle to view all requests.
 * @param {Function} onPendingCountChange - Callback to update the count of pending requests for the parent tab.
 */
const ShiftSwapRequests = ({ onPendingCountChange }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewAll, setViewAll] = useState(false); // State to toggle between pending and all requests
  const [actionMessage, setActionMessage] = useState(''); // Message for approve/reject actions

  // State for the success/error modal
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [outcomeMessage, setOutcomeMessage] = useState('');
  const [outcomeType, setOutcomeType] = useState(''); // 'success' or 'error'

  // State for all shift details (to get names for swap history)
  const [allShiftDetails, setAllShiftDetails] = useState([]);
  const [loadingShiftDetails, setLoadingShiftDetails] = useState(true);
  const [shiftDetailsError, setShiftDetailsError] = useState('');

  // Fetch all shift details on component mount
  useEffect(() => {
    const fetchAllShiftDetails = async () => {
      try {
        const data = await ShiftSwapService.getAllShiftDetails();
        setAllShiftDetails(data);
      } catch (err) {
        console.error('Error fetching all shift details:', err);
        // Display backend error message directly
        setShiftDetailsError(err || 'Failed to load shift details for swap requests.');
      } finally {
        setLoadingShiftDetails(false);
      }
    };
    fetchAllShiftDetails();
  }, []);

  // Helper function to enrich swap requests with shift names and correct date field
  const enrichSwapRequests = useCallback((requestsData) => {
    if (!allShiftDetails.length) return requestsData;

    return requestsData.map(req => {
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

  // Fetches swap requests based on the 'viewAll' state
  const fetchRequests = useCallback(async () => {
    if (loadingShiftDetails) {
      setLoading(true);
      return;
    }

    setLoading(true);
    setError('');
    setActionMessage('');
    try {
      const data = viewAll
        ? await ShiftSwapService.getAllSwapRequests()
        : await ShiftSwapService.getAllPendingSwapRequests();

      const enrichedData = enrichSwapRequests(data || []);
      setRequests(enrichedData);

      const pendingCount = enrichedData.filter(req => req.status && req.status.toLowerCase() === 'pending').length;
      onPendingCountChange(pendingCount);

    } catch (err) {
      console.error('Error fetching swap requests:', err);
      // Display backend error message directly
      setError(err || 'Failed to load swap requests.');
      setRequests([]);
      onPendingCountChange(0);
    } finally {
      setLoading(false);
    }
  }, [viewAll, onPendingCountChange, enrichSwapRequests, loadingShiftDetails]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Handle approving or rejecting a swap request
  const handleReviewSwap = async (swapId, status, managerComment) => {
    try {
      const reviewData = { swapId, status, comment: managerComment };
      const result = await ShiftSwapService.reviewShiftSwap(reviewData);

      if (result) {
        setOutcomeType('success');
        setOutcomeMessage(`Shift swap request ${swapId} has been successfully ${status.toLowerCase()}.`);
        fetchRequests(); // Re-fetch requests to update the list and pending count
      } else {
        setOutcomeType('error');
        setOutcomeMessage(`Failed to ${status.toLowerCase()} shift swap request ${swapId}. Please try again.`);
      }
    } catch (err) {
      // Display backend error message directly
      setOutcomeType('error');
      setOutcomeMessage(`Error ${status.toLowerCase()} swap request ${swapId}: ${err || 'An unexpected error occurred.'}`);
      console.error(`Error reviewing swap request ${swapId}:`, err);
    } finally {
        setShowOutcomeModal(true); // Always show modal after review attempt
    }
  };

  const handleCloseOutcomeModal = () => {
    setShowOutcomeModal(false);
    setOutcomeMessage('');
    setOutcomeType('');
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col className="text-end">
          <Button
            variant={viewAll ? "secondary" : "primary"}
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? 'View Pending Requests' : 'View All Swap Requests'}
          </Button>
        </Col>
      </Row>

      {actionMessage && (
        <Alert variant={actionMessage.includes('successfully') ? 'success' : 'danger'} className="text-center mb-3">
          {actionMessage}
        </Alert>
      )}

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-info text-white py-2">
        {viewAll ? 'All Shift Swap Requests' : 'Pending Shift Swap Requests'}
        </Card.Header>
        <Card.Body>
          {loading || loadingShiftDetails ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-primary">Loading swap requests...</p>
            </div>
          ) : error || shiftDetailsError ? (
            // Display error directly as it comes from the service
            <Alert variant="danger" className="text-center">Error: {error || shiftDetailsError}</Alert>
          ) : requests.length === 0 ? (
            <Alert variant="info" className="text-center">No {viewAll ? 'total' : 'pending'} swap requests found.</Alert>
          ) : (
            <ShiftSwapList
              requests={requests}
              loading={loading}
              error={error}
              onReviewSwap={handleReviewSwap}
              isReviewable={!viewAll}
              showEmployeeIdColumn={true}
            />
          )}
        </Card.Body>
      </Card>

      {/* Outcome Modal */}
      <Modal show={showOutcomeModal} onHide={handleCloseOutcomeModal} centered>
        <Modal.Header closeButton className={`text-white ${outcomeType === 'success' ? 'bg-success' : 'bg-danger'}`}>
          <Modal.Title>{outcomeType === 'success' ? 'Success!' : 'Error!'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {outcomeType === 'success' ? (
            <CheckCircleFill size={60} className="text-success mb-3" />
          ) : (
            <XCircleFill size={60} className="text-danger mb-3" />
          )}
          <p>{outcomeMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOutcomeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShiftSwapRequests;