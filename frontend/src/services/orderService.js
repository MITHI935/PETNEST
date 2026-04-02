import api from '../config/api';

const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

const updateOrder = async (id, updateData) => {
  const response = await api.put(`/orders/${id}`, updateData);
  return response.data;
};

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
};
