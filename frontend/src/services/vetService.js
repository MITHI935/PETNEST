import api from '../config/api';

const getAllVets = async (filters = {}) => {
  const response = await api.get('/vets', { params: filters });
  return response.data;
};

const getVetById = async (id) => {
  const response = await api.get(`/vets/${id}`);
  return response.data;
};

const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

export default {
  getAllVets,
  getVetById,
  bookAppointment,
};
