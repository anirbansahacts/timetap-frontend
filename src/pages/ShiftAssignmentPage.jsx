// src/pages/ShiftAssignmentPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ShiftAssignment from '../components/shift/shift-assignment/ShiftAssignment'; // Adjust the path as per your project structure

const ShiftAssignmentPage = () => {
    // State to trigger a refresh in ShiftAssignment table after a successful assignment
    const [refreshAssignments, setRefreshAssignments] = useState(0);

    /**
     * Callback function passed to ShiftAssignment to trigger a re-fetch
     * of assignments when a new shift is successfully assigned.
     */
    const handleAssignmentSuccess = () => {
        setRefreshAssignments(prev => prev + 1);
    };

    // Optional: If you want to trigger a refresh when the page loads or becomes active
    useEffect(() => {
        // This effect will run once on component mount.
        // You might want to trigger a refresh here if the ShiftAssignment component
        // needs to load data immediately when this page is navigated to.
        setRefreshAssignments(prev => prev + 1);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Container fluid className="my-3 poppins-font">
            <Row className="justify-content-center">
                <Col lg={12}>
                    {/* Pass refreshTrigger and onAssignmentSuccess to ShiftAssignment */}
                    <ShiftAssignment 
                        onAssignmentSuccess={handleAssignmentSuccess} 
                        refreshTrigger={refreshAssignments} 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ShiftAssignmentPage;