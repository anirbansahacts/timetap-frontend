import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../stylesheets/forms.module.css';

const ChangePassword = () => {
  const { user, changePassword } = useAuth(); // Assuming useAuth provides changePassword and user.email

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm new password do not match.');
      return;
    }

    if (!user || !user.email) {
      setMessage('User information not available. Please log in.');
      // You might want to redirect to login here
      return;
    }

    try {
      // No need to pass the token explicitly to changePassword anymore,
      // as the api.js interceptor will handle it from localStorage.
      const result = await changePassword(user.email, currentPassword, newPassword);
      setMessage(result.message || 'Password changed successfully!'); // Provide a default message
      if (result.message && result.message.includes("success")) { // Or check for a specific success field
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
      }
    } catch (error) {
        // More robust error handling
        if (error.response && error.response.data && error.response.data.error) {
            setMessage(error.response.data.error);
        } else {
            setMessage('Failed to change password. Please try again.');
            console.error("Change password error:", error);
        }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Change Password</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ChangePassword;