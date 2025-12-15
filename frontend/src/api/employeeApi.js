import httpClient from '../services/httpClient';

export const getEmployees = () =>
  httpClient.get('/employee');

export const getEmployeeById = (id) =>
  httpClient.get(`/employee/${id}`);

export const getEmployeesByDepartment = (departmentId) =>
  httpClient.get(`/employee/by-department/${departmentId}`);

export const createEmployee = (data) =>
  httpClient.post('/employee', data);

export const updateEmployee = (id, data) =>
  httpClient.put(`/employee/${id}`, data);

export const deleteEmployee = (id) =>
  httpClient.delete(`/employee/${id}`);
