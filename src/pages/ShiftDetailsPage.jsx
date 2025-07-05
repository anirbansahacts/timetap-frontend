// src/pages/ShiftDetailsPage.jsx
import React from "react";
import { Container, Row, Col } from 'react-bootstrap'; // Assuming you still want Bootstrap layout for consistency
import ShiftDetails from '../components/shift/shift-details/ShiftDetails'; // Adjust the path as per your project structure

const ShiftDetailsPage = () => {
  return (
    <Container fluid className="my-3 poppins-font"> 
      <Row className="justify-content-center">
        <Col lg={12}>
          <ShiftDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftDetailsPage;