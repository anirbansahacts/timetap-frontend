// src/components/ManagerShift.jsx
import React, { useState } from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';

// Import manager-specific components
import ShiftDetails from './shift-details/ShiftDetails';
import ShiftAssignment from './shift-assignment/ShiftAssignment';
import ShiftSwapRequests from './shift-swap/ShiftSwapRequests'; // Manager's view of swap requests

/**
 * ManagerShift component acts as a dashboard for shift management.
 * It uses Bootstrap Tabs to organize different functionalities:
 * Shift Details, Shift Assignment, and Shift Swap Requests.
 */
function ManagerShift() {
    // State to trigger a refresh in ShiftAssignment table after a successful assignment
    const [refreshAssignments, setRefreshAssignments] = useState(0);
    // State to hold the count of pending swap requests for the tab badge
    const [pendingSwapRequestCount, setPendingSwapRequestCount] = useState(0);

    /**
     * Callback function passed to ShiftAssignment to trigger a re-fetch
     * of assignments when a new shift is successfully assigned.
     */
    const handleAssignmentSuccess = () => {
        setRefreshAssignments(prev => prev + 1);
    };

    /**
     * Callback function passed to ShiftSwapRequests to update the
     * pending swap request count, which is displayed on the tab header.
     * @param {number} count - The current number of pending swap requests.
     */
    const handlePendingSwapCountChange = (count) => {
        setPendingSwapRequestCount(count);
    };

    return (
        <Container fluid className="my-3 poppins-font">
            <h1 className="text-center mb-4">Manager Dashboard</h1>
            <Tabs
                //defaultActiveKey="shiftAssignment" // Set Shift Assignment as the default active tab
                id="manager-dashboard-tabs"
                className="mb-4 custom-tabs" // Apply custom-tabs class
                fill // Ensures tabs take full width
                onSelect={(key) => {
                    if (key === 'shiftAssignment') {
                      // Trigger data reload when Shift Assignment tab is clicked
                      setRefreshAssignments(prev => prev + 1);
                    }
                  }}
                >
                    
                {/* --- Tab 1: Shift Details --- */}
                <Tab eventKey="shiftDetails" title="Shift Details">
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <ShiftDetails />
                        </Col>
                    </Row>
                </Tab>

                {/* --- Tab 2: Shift Assignment --- */}
                <Tab eventKey="shiftAssignment" title="Shift Assignment">
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            {/* Pass refreshTrigger to ShiftAssignment to control its data re-fetch */}
                            <ShiftAssignment onAssignmentSuccess={handleAssignmentSuccess} refreshTrigger={refreshAssignments} />
                        </Col>
                    </Row>
                </Tab>

                {/* --- Tab 3: Shift Swap Requests --- */}
                <Tab
                    eventKey="shiftSwapRequests"
                    title={
                        <span>
                            Shift Swap Requests
                            {/* Display red dot badge if there are pending requests */}
                            {pendingSwapRequestCount > 0 && (
                                <span className="ms-2 badge bg-danger rounded-pill poppins-font">
                                    {pendingSwapRequestCount}
                                </span>
                            )}
                        </span>
                    }
                >
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            {/* Pass callback to receive pending count updates */}
                            <ShiftSwapRequests onPendingCountChange={handlePendingSwapCountChange} />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default ManagerShift;