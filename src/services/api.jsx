import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090', // Your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
    
  },
  withCredentials:true
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;