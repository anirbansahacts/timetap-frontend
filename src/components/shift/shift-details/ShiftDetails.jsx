// src/components/shiftDetails/ShiftDetails.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ShiftCreation from './ShiftCreation';
import ShiftTable from './ShiftTable';
import UpdateShiftModal from './UpdateShiftModal';
import shiftDetailsService from './shiftDetailsService';
import { Container, Button, Card, Alert, Form, Row, Col, InputGroup, Toast, ToastContainer } from 'react-bootstrap'; // Added InputGroup, Toast, ToastContainer

const ShiftDetails = () => {
  const [allShifts, setAllShifts] = useState([]);
  const [loadingShifts, setLoadingShifts] = useState(true);
  const [fetchError, setFetchError] = useState('');
  // Removed updateMessage state as it's now handled by toasts

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentShiftToEdit, setCurrentShiftToEdit] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [toastMessage, setToastMessage] = useState({ show: false, message: '', type: 'success' }); 

  const fetchAllShifts = async () => {
    setLoadingShifts(true);
    setFetchError('');
    try {
      const data = await shiftDetailsService.getAllShifts();
      setAllShifts(data || []);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      setFetchError(error); // Keep fetchError for table's error display if preferred
      setToastMessage({ show: true, message: `Error fetching shifts: ${error}`, type: 'danger' }); // Also show as toast
    } finally {
      setLoadingShifts(false);
    }
  };

  useEffect(() => {
    fetchAllShifts();
  }, []);

  const filteredShifts = useMemo(() => {
    return allShifts.filter(shift =>
      shift.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(shift.shiftId).includes(searchTerm)
    );
  }, [allShifts, searchTerm]);

  const handleEditClick = (shift) => {
    setCurrentShiftToEdit(shift);
    // setUpdateMessage(''); // No longer needed
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    if (!currentShiftToEdit || !currentShiftToEdit.shiftId) {
      setToastMessage({ show: true, message: 'Error: No shift selected for update.', type: 'danger' });
      return;
    }

    // setUpdateMessage(''); // No longer needed
    try {
      await shiftDetailsService.updateShift(currentShiftToEdit.shiftId, updatedData);
      setToastMessage({ show: true, message: 'Shift updated successfully!', type: 'success' });
      setShowUpdateModal(false);
      setCurrentShiftToEdit(null);
      fetchAllShifts(); // Refresh the list
    } catch (error) {
      console.error('Error updating shift:', error);
      setToastMessage({ show: true, message: `Error updating shift: ${error}`, type: 'danger' });
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setCurrentShiftToEdit(null);
    // setUpdateMessage(''); // No longer needed
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Callback from ShiftCreation
  const handleCreationDone = (message, type) => { // Updated to receive message and type
    fetchAllShifts(); // Refresh the list
    setShowCreateForm(false); // Hide the form after creation
    setToastMessage({ show: true, message: message, type: type }); // Show creation toast
  };

  return (
    <Container className="mt-4 poppins-font">
      {/* Toast Container to hold toasts */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => setToastMessage({ ...toastMessage, show: false })}
          show={toastMessage.show}
          delay={3000}
          autohide
          bg={toastMessage.type === 'success' ? 'success' : 'danger'}
        >
          <Toast.Header>
            <strong className="me-auto text-white">Dear Employee...</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <Form.Group controlId="searchShiftName">
            <InputGroup> {/* Wrap with InputGroup for the clear button */}
              <Form.Control
                type="text"
                placeholder="Search by Shift Name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="poppins-font"
              />
              {searchTerm && ( // Only show clear button if there's text
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  <i className="bi bi-x-lg"></i> {/* Bootstrap X icon */}
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} className="text-end">
          <Button
            variant="primary"
            onClick={handleToggleCreateForm}
            className="poppins-font"
             // Custom style is okay here, but consider moving to CSS variable
          >
            {showCreateForm ? (
                <>
                    <i className="bi bi-eye-slash me-2"></i> Hide Create Form {/* Hide Icon */}
                </>
            ) : (
                <>
                    <i className="bi bi-plus-circle me-2"></i> Add New Shift {/* Plus Icon */}
                </>
            )}
          </Button>
        </Col>
      </Row>

      {showCreateForm && (
        <ShiftCreation
          onShiftCreated={handleCreationDone} // Pass updated callback
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {showCreateForm && <hr className="my-5" />}

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-info text-white py-2"> 
        All Shifts
        </Card.Header>
        <Card.Body>
            {/* Removed direct Alert for updateMessage, as it's now a toast */}
          <ShiftTable
            shifts={filteredShifts}
            loading={loadingShifts}
            error={fetchError} // Error for fetching can still be an Alert if preferred, or also a Toast
            onEdit={handleEditClick}
            totalFilteredShifts={filteredShifts.length}
          />
        </Card.Body>
      </Card>

      <UpdateShiftModal
        show={showUpdateModal}
        onClose={handleCloseUpdateModal}
        shiftData={currentShiftToEdit}
        onSubmit={handleUpdateSubmit}
        message={null} // Pass null as success/error will be toast
      />
    </Container>
  );
};

export default ShiftDetails;