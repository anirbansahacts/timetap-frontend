// import axios from "axios";
// const BASE_URL = 'http://localhost:8081/api3/v1/employee';

// export const applyLeave = async (leaveData, token) => {
//   return axios.post(`${BASE_URL}/leave/request`, leaveData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const getLeaveBalance = async (employeeId, token) => {
//   return axios.get(`${BASE_URL}/leave-balance/${employeeId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const getLeaveHistory = async (employeeId, token) => {
//   return axios.get(`${BASE_URL}/leave/leave-history/${employeeId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


import axios from "axios";
const BASE_URL = 'http://localhost:9090/api3/v1/employee';

// ✅ TEMPORARY fallback for frontend testing without login
// const employeeId = localStorage.getItem('employeeId') || 'TEMP123';
// const token = localStorage.getItem('token') || 'temp-token';
 
export const applyLeave = async (leaveData) => {
return axios.post(`${BASE_URL}/leave/request`, leaveData, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};
 
export const getLeaveBalance = async (employeeId) => {
  return axios.get(`${BASE_URL}/leave-balance/${employeeId}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};
 
export const getLeaveHistory = async (employeeId) => {
  return axios.get(`${BASE_URL}/leave/leave-history/${employeeId}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};