import api from '../config/api';

const getAllPets = async (filters = {}) => {
  const response = await api.get('/pets', { params: filters });
  return response.data;
};

const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}`);
  return response.data;
};

const createPetListing = async (petData) => {
  const response = await api.post('/pets', petData);
  return response.data;
};

const updatePetListing = async (id, updateData) => {
  const response = await api.put(`/pets/${id}`, updateData);
  return response.data;
};

const deletePetListing = async (id) => {
  const response = await api.delete(`/pets/${id}`);
  return response.data;
};

export default {
  getAllPets,
  getPetById,
  createPetListing,
  updatePetListing,
  deletePetListing,
};
