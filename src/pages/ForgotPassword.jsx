import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../stylesheets/forms.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await forgotPassword(email);
    setMessage(result.message);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Send Reset Link</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;