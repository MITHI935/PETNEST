const asyncHandler = require('../utils/asyncHandler');
const vetService = require('../services/vetService');

const getAllVets = asyncHandler(async (req, res) => {
  const filters = req.query;
  const vets = await vetService.getAllVets(filters);
  res.status(200).json(vets);
});

const getVetById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vet = await vetService.getVetById(id);
  if (!vet) {
    const error = new Error('Veterinarian not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(vet);
});

const createVet = asyncHandler(async (req, res) => {
  const newVet = await vetService.createVet(req.body);
  res.status(201).json(newVet);
});

const updateVet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedVet = await vetService.updateVet(id, req.body);
  if (!updatedVet) {
    const error = new Error('Veterinarian not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(updatedVet);
});

const deleteVet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await vetService.deleteVet(id);
  res.status(204).send();
});

module.exports = {
  getAllVets,
  getVetById,
  createVet,
  updateVet,
  deleteVet
};
