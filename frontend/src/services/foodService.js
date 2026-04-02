import api from '../config/api';

const getAllFood = async (filters = {}) => {
  const response = await api.get('/food', { params: filters });
  return response.data;
};

const getFoodById = async (id) => {
  const response = await api.get(`/food/${id}`);
  return response.data;
};

const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

const createFood = async (foodData) => {
  const response = await api.post('/food', foodData);
  return response.data;
};

const updateFood = async (id, updateData) => {
  const response = await api.put(`/food/${id}`, updateData);
  return response.data;
};

const deleteFood = async (id) => {
  const response = await api.delete(`/food/${id}`);
  return response.data;
};

export default {
  getAllFood,
  getFoodById,
  placeOrder,
  createFood,
  updateFood,
  deleteFood,
};
