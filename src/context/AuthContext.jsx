import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth'; // Import your auth service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Basic decoding for roles/email
        setUser({
          email: decodedToken.sub, // 'sub' is usually the subject (email in your case)
          role: decodedToken.role, // 'role' should be added by your JWT generation
          employeeId: decodedToken.employeeId // 'employeeId' should be added by your JWT generation
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const token = response.token;
      localStorage.setItem('token', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({
        email: decodedToken.sub,
        role: decodedToken.role,
        employeeId: decodedToken.employeeId
      });
      console.log(decodedToken.role);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authService.logout(token);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Failed to send reset link' };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await authService.resetPassword(token, newPassword);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Failed to reset password' };
    }
  };

  const changePassword = async (email, currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword(email, currentPassword, newPassword);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Failed to change password' };
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, forgotPassword, resetPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);