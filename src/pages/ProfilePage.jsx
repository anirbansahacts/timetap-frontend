// src/components/ViewEmployee.jsx
import React from "react"; // Removed useState, useEffect imports as they are commented out in the provided code
import { Link, useParams } from "react-router-dom";
// import * as employeeService from "../../services/employee";
import styles from "../stylesheets/layouts.module.css";
import cardStyles from "../stylesheets/components.module.css";

const ViewEmployee = () => {
  // Using hardcoded employee data as the fetching logic is commented out
  const employee = {
    employeeId: 555,
    employeeName: "Harvey Spectre",
    email: "harvey@gmail.com",
    gender: "MALE",
    contactNumber: "9830782222",
    managerId: 1,
    role: "EMPLOYEE",
  };

  // The commented-out fetching logic (useEffect, useState, etc.) is retained as-is
  // for future use, but not actively used in the current component state.
  // const { id } = useParams();
  // const [employee, setEmployee] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchEmployee = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await employeeService.viewProfileById(id);
  //       setEmployee(data);
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Failed to fetch employee details."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchEmployee();
  // }, [id]);

  // if (loading) {
  //   return (
  //     <div className={styles.loadingMessage}>Loading employee details...</div>
  //   );
  // }

  // if (error) {
  //   return <div className={styles.errorMessage}>{error}</div>;
  // }

  // if (!employee) {
  //   return <div className={styles.noDataMessage}>No employee found.</div>;
  // }

  return (
    <div className={styles.detailContainer}>
      <h2>Employee Details</h2>
      {/* Added p-4 for padding inside the card, consistent with other dashboard cards. */}
      <div className={`${cardStyles.card} p-4`}>
        <dl className="row mb-0">
          <dt className="col-sm-4 text-muted">Employee ID:</dt>
          <dd className="col-sm-8">{employee.employeeId}</dd>
          <dt className="col-sm-4 text-muted">Name:</dt>
          <dd className="col-sm-8">{employee.employeeName}</dd>
          <dt className="col-sm-4 text-muted">Email:</dt>
          <dd className="col-sm-8">{employee.email}</dd>
          <dt className="col-sm-4 text-muted">Gender:</dt>
          <dd className="col-sm-8">{employee.gender}</dd>
          <dt className="col-sm-4 text-muted">Contact Number:</dt>
          <dd className="col-sm-8">{employee.contactNumber}</dd>
          <dt className="col-sm-4 text-muted">Manager ID:</dt>
          <dd className="col-sm-8">{employee.managerId || "N/A"}</dd>
          <dt className="col-sm-4 text-muted">Role:</dt>
          <dd className="col-sm-8">{employee.role}</dd>
        </dl>

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
