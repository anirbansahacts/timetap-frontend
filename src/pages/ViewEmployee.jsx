import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as employeeService from '../services/employee';
import styles from '../stylesheets/layouts.module.css';
import cardStyles from '../stylesheets/components.module.css'; // For card styling


const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await employeeService.viewProfileById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className={styles.loadingMessage}>Loading employee details...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!employee) {
    return <div className={styles.noDataMessage}>No employee found.</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <h2>Employee Details</h2>
      <div className={cardStyles.card}>
        {/* This div will be our grid container */}
        <div className={styles.employeeDetailGrid}>
          {/* Each label and value will be a grid item */}
          <span className={styles.detailLabel}>Employee ID:</span>
          <span className={styles.detailValue}>{employee.employeeId}</span>

          <span className={styles.detailLabel}>Name:</span>
          <span className={styles.detailValue}>{employee.employeeName}</span>

          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{employee.email}</span>

          <span className={styles.detailLabel}>Gender:</span>
          <span className={styles.detailValue}>{employee.gender}</span>

          <span className={styles.detailLabel}>Contact Number:</span>
          <span className={styles.detailValue}>{employee.contactNumber}</span>

          <span className={styles.detailLabel}>Manager ID:</span>
          <span className={styles.detailValue}>{employee.managerId || 'N/A'}</span>

          <span className={styles.detailLabel}>Role:</span>
          <span className={styles.detailValue}>{employee.role}</span>
        </div> {/* End of employeeDetailGrid */}

        <div className={styles.profileActions}>
          <Link to="/change-password" className={styles.changePasswordLink}>
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;