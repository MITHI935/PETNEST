import api from '../config/api';

const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

const updateAppointment = async (id, updateData) => {
  const response = await api.put(`/appointments/${id}`, updateData);
  return response.data;
};

const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};

export default {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
};
