import api from './client';

export const getUsers = async () => (await api.get('/user')).data;

// INSERTAR
export const createUser = async (userData) => (await api.post('/user', userData)).data;

// BUSCAR POR ID
export const getUserById = async (id) => (await api.get(`/user/${id}`)).data;

export const updateUser = async (id, userData) => (await api.put(`/user/${id}`, userData)).data;
export const deleteUser = async (id) => (await api.delete(`/user/${id}`)).data;