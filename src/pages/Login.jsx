import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "../stylesheets/forms.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //   const { login } = useAuth();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setMessage("");
  //     const result = await login(email, password);
  //     if (!result.success) {
  //       setMessage(result.message);
  //     }
  //   };
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("logged in");
    navigate("/dashboard");
  };
  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      {message && <p className={styles.popupMessage}>{message}</p>}
      <div className={styles.formLinks}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
