import React, { useState, useEffect } from 'react';
import { Table, Alert, Form, InputGroup, Button, Pagination } from 'react-bootstrap';

const AllAssignmentsTable = ({ allAssignments, loading, error, currentPage, totalPages, onPageChange }) => {
  const [filterType, setFilterType] = useState('shiftIdentifier');
  const [filterValue, setFilterValue] = useState('');
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  useEffect(() => {
    let filtered = allAssignments;

    if (filterValue) {
      const val = filterValue.toLowerCase();
      if (filterType === 'shiftIdentifier') {
        filtered = filtered.filter(a =>
          a.shiftName.toLowerCase().includes(val) ||
          String(a.shiftId).includes(val)
        );
      } else if (filterType === 'employeeId') {
        filtered = filtered.filter(a =>
          String(a.employeeId).includes(val)
        );
      }
    }

    setFilteredAssignments(filtered);
  }, [filterType, filterValue, allAssignments]);

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterValue('');
          }}
          className="me-2"
        >
          <option value="shiftIdentifier">Shift Name / ID</option>
          <option value="employeeId">Employee ID</option>
        </Form.Select>
        <Form.Control
          placeholder="Enter filter value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={() => setFilterValue('')}>
          Clear
        </Button>
      </InputGroup>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Employee ID</th>
            <th>Shift Name</th>
            <th>Shift ID</th>
            <th>Start</th>
            <th>End</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="8" className="text-center">Loading...</td></tr>
          ) : filteredAssignments.length > 0 ? (
            filteredAssignments.map(a => (
              <tr key={a.assignmentId}>
                <td>{a.assignmentId}</td>
                <td>{a.employeeId}</td>
                <td>{a.shiftName}</td>
                <td>{a.shiftId}</td>
                <td>{a.startTime}</td>
                <td>{a.endTime}</td>
                <td>{a.assignedFromDate}</td>
                <td>{a.assignedToDate}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No assignments found</td></tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
        </Pagination>
      )}
    </>
  );
};

export default AllAssignmentsTable;