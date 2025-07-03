import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../stylesheets/forms.module.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage('No reset token found in URL.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    if (!token) {
      setMessage('No valid reset token available.');
      return;
    }

    const result = await resetPassword(token, newPassword);
    setMessage(result.message);
    if (result.success) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Reset Password</h2>
      {token ? (
        <form onSubmit={handleSubmit} className={styles.form}>
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
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Reset Password</button>
        </form>
      ) : (
        <p>Please use the reset link sent to your email.</p>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ResetPassword;