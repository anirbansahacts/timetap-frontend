import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ShiftAssignmentForm from './ShiftAssignmentForm';
import AllAssignmentsTable from './AllAssignmentsTable';
import ShiftAssignmentService from './ShiftAssignmentService';

const ShiftAssignment = ({ refreshTrigger }) => {
  const [showForm, setShowForm] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const loadAssignments = async (page = 1, term = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await ShiftAssignmentService.getAllAssignments(page - 1, 10, term);
      setAssignments(res.content || []);
      setTotalPages(res.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reload data whenever refreshTrigger changes (tab clicked)
    loadAssignments();
  }, [refreshTrigger]);

  const handlePageChange = (page) => {
    loadAssignments(page, searchTerm);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    loadAssignments(1, term);
  };

  const handleAssignmentDone = () => {
    loadAssignments(currentPage, searchTerm);
    setShowForm(false);
  };

  return (
    <Container className="mt-4 poppins-font">
      <Row className="mb-4">
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Assign Form' : 'Assign New Shift'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col>
            <ShiftAssignmentForm onShiftAssigned={handleAssignmentDone} />
          </Col>
        </Row>
      )}

      <Card>
        <Card.Header className="bg-info text-white py-2">Assigned Shifts</Card.Header>
        <Card.Body>
          <AllAssignmentsTable
            allAssignments={assignments}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ShiftAssignment;
