import httpClient from '../services/httpClient';

export const getDepartments = () =>
  httpClient.get('/department');

export const getDepartmentById = (id) =>
  httpClient.get(`/department/${id}`);

export const createDepartment = (data) =>
  httpClient.post('/department', data);

export const updateDepartment = (id, data) =>
  httpClient.put(`/department/${id}`, data);

export const deleteDepartment = (id) =>
  httpClient.delete(`/department/${id}`);