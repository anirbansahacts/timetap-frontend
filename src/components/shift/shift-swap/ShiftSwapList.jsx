// src/components/shift-swap/ShiftSwapList.jsx
import React, { useState } from 'react';
import { Table, Spinner, Alert, Button, Form, Stack } from 'react-bootstrap';

/**
 * Reusable component to display a list of shift swap requests.
 * Can be used for both manager's view (reviewable) and employee's history (non-reviewable).
 * @param {string} title - The title for the list (e.g., "Pending Requests").
 * @param {Array<object>} requests - Array of shift swap request objects.
 * @param {boolean} loading - Loading state.
 * @param {string} error - Error message, if any.
 * @param {Function} onReviewSwap - Callback function for reviewing swaps (approve/reject).
 * @param {boolean} isReviewable - If true, displays action buttons for review.
 * @param {boolean} showEmployeeIdColumn - If true, displays the Employee ID column.
 */
function ShiftSwapList({ title, requests, loading, error, onReviewSwap, isReviewable, showEmployeeIdColumn = true }) {
    const [comments, setComments] = useState({});
    const [editingSwapId, setEditingSwapId] = useState(null);

    const handleCommentChange = (swapId, value) => {
        setComments(prev => ({ ...prev, [swapId]: value }));
    };

    const handleReviewClick = (swapId) => {
        setEditingSwapId(swapId);
    };

    const handleSubmitReview = (swapId, status, requestDetails) => {
        const comment = comments[swapId] || '';
        onReviewSwap(swapId, status, comment, requestDetails);
        setEditingSwapId(null); // Exit editing mode
        // Clear comment for this swapId after submission
        setComments(prev => {
            const newState = { ...prev };
            delete newState[swapId];
            return newState;
        });
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2 text-primary poppins-font">Loading {title.toLowerCase()}...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center my-4 poppins-font">Error: {error}</Alert>;
    }

    if (!Array.isArray(requests) || requests.length === 0) {
        return <Alert variant="info" className="text-center my-4 poppins-font">No {title.toLowerCase()} found.</Alert>;
    }

    return (
            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead className="bg-light">
                        <tr>
                            <th>Swap ID</th>
                            {showEmployeeIdColumn && <th>Employee ID</th>}
                            <th>Current Shift </th>
                            <th>Desired Shift </th>
                            <th>Request Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Manager Comment</th>
                            {isReviewable && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.swapId}>
                                <td>{request.swapId}</td>
                                {showEmployeeIdColumn && <td>{request.employeeId}</td>}
                                <td>{request.currentShiftId} - {request.currentShiftName}</td>
                                <td>{request.desiredShiftId} - {request.desiredShiftName}</td>
                                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                                <td>{request.reason}</td>
                                <td>
                                    {/* Status color should be green for APPROVED, red for REJECTED, and yellow for PENDING */}
                                    <span className={`badge ${
                                        request.status === 'APPROVED' ? 'bg-success' :
                                        request.status === 'REJECTED' ? 'bg-danger' :
                                        'bg-warning'
                                    } poppins-font`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td>{request.managerComment || 'N/A'}</td>
                                {isReviewable && (
                                    <td>
                                        {request.status === 'PENDING' ? (
                                            editingSwapId === request.swapId ? (
                                                <Stack gap={2}>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Add comment..."
                                                        value={comments[request.swapId] || ''}
                                                        onChange={(e) => handleCommentChange(request.swapId, e.target.value)}
                                                        className="poppins-font"
                                                    />
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        onClick={() => handleSubmitReview(request.swapId, 'APPROVED', request)}
                                                        className="poppins-font"
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleSubmitReview(request.swapId, 'REJECTED', request)}
                                                        className="poppins-font"
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => setEditingSwapId(null)}
                                                        className="poppins-font"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Stack>
                                            ) : (
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleReviewClick(request.swapId)}
                                                    className="poppins-font"
                                                >
                                                    Review
                                                </Button>
                                            )
                                        ) : (
                                            <small className="text-muted poppins-font">Reviewed</small>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
    );
}

export default ShiftSwapList;