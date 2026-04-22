import api from './client';

export const getTasks = async () => {
  const response = await api.get('/task');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/task', taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/task/${id}`);
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/task/${id}`, taskData);
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/task/${id}`);
  return response.data;
};