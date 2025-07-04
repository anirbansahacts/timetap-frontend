import React, { useState } from "react";
import * as employeeService from "../services/employee";
import styles from "../stylesheets/forms.module.css";

const AddEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    gender: "",
    email: "",
    contactNumber: "",
    managerId: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await employeeService.addEmployeeOrManager(employeeData);
      setMessage(response);
      setEmployeeData({
        employeeName: "",
        gender: "",
        email: "",
        contactNumber: "",
        managerId: "",
        role: "",
      }); // Clear form
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add employee/manager"
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Employee or Manager</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={employeeData.employeeName}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={employeeData.gender}
            onChange={handleChange}
            required
            className={styles.selectField}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={employeeData.contactNumber}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="managerId">
            Manager ID (Optional for Senior Manager):
          </label>
          <input
            type="number"
            id="managerId"
            name="managerId"
            value={employeeData.managerId}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            required
            className={styles.selectField}
          >
            <option value="">Select Role</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Employee/Manager
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddEmployeePage;
