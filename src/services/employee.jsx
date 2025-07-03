import api from './api'; // Re-using the axios instance

export const addEmployeeOrManager = async (employeeData) => {
  const response = await api.post('/api1/v1/sr-managers/create', employeeData);
  return response.data;
};

export const viewProfileById = async (employeeId) => {
  const response = await api.get(`/api1/v1/employee/${employeeId}`);
  return response.data;
};

export const viewAllMemberProfile = async () => {
  const response = await api.get('/api1/v1/sr-manager/all-details');
  return response.data;
};

export const viewAllEmployeeDetailsUnderTheManager = async (managerId) => {
  const response = await api.get(`/api1/v1/manager/all-details/${managerId}`);
  return response.data;
};