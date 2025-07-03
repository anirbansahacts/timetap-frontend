import api from './api'; // Re-using the axios instance


export const login = async (email, password) => {
  const response = await api.post('/api1/auth/login', { email, password });
  return response.data; // Should contain token and message
};

export const forgotPassword = async (email) => {
  const response = await api.post('/api1/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post('/api1/auth/reset-password', { token, newPassword });
  return response.data;
};

export const changePassword = async (email, currentPassword, newPassword) => {
  const response = await api.post('/api1/auth/change-password', { email, currentPassword, newPassword }
     
  );
  return response.data;
};

export const logout = async (token) => {
  // Pass the token in the Authorization header for logout
  const response = await api.post('/api/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};