import api from './api'; // Re-using the axios instance

export const addEmployeeOrManager = async (employeeData) => {
  const response = await api.post('/api/v1/employee/create', employeeData);
  return response.data;
};

export const viewProfileById = async (employeeId) => {
  const response = await api.get(`/api/v1/employee/view?employeeId=${employeeId}`);
  return response.data;
};

export const viewAllMemberProfile = async () => {
  const response = await api.get('/api/v1/employee/all-details');
  return response.data;
};

export const viewAllEmployeeDetailsUnderTheManager = async (managerId) => {
  const response = await api.get(`/api/v1/employee/get-employees?managerId=${managerId}`);
  return response.data;
};