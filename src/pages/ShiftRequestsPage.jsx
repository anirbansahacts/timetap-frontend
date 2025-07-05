// src/pages/ShiftRequestsPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for layout
import ShiftSwapRequests from '../components/shift/shift-swap/ShiftSwapRequests'; // Adjust the path as per your project structure

const ShiftRequestsPage = () => {
    // State to hold the count of pending swap requests.
    // Although not displayed as a badge on this standalone page,
    // it's maintained to satisfy the prop contract of ShiftSwapRequests.
    const [pendingSwapRequestCount, setPendingRequestCount] = useState(0);

    /**
     * Callback function passed to ShiftSwapRequests to update the
     * pending swap request count. This function will be called by
     * ShiftSwapRequests internally whenever the count changes.
     * @param {number} count - The current number of pending swap requests.
     */
    const handlePendingSwapCountChange = (count) => {
        setPendingRequestCount(count);
        // You could potentially use this 'count' for other purposes here
        // (e.g., showing a notification, logging) if needed in the future.
    };

    return (
        <Container fluid className="my-3 poppins-font">
            <Row className="justify-content-center">
                <Col lg={12}>
                    {/* Pass the callback function to ShiftSwapRequests */}
                    <ShiftSwapRequests onPendingCountChange={handlePendingSwapCountChange} />
                </Col>
            </Row>
        </Container>
    );
};

export default ShiftRequestsPage;