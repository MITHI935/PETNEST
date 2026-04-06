const petService = require('../services/petService');
const asyncHandler = require('../utils/asyncHandler');

const getAllPets = asyncHandler(async (req, res) => {
  const filters = req.query;
  const pets = await petService.getAllPets(filters);
  res.status(200).json(pets);
});

const getPetById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pet = await petService.getPetById(id);
  if (!pet) {
    const error = new Error('Pet not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(pet);
});

const createPet = asyncHandler(async (req, res) => {
  const newPet = await petService.createPet(req.body);
  res.status(201).json(newPet);
});

const updatePet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedPet = await petService.updatePet(id, req.body);
  res.status(200).json(updatedPet);
});

const deletePet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await petService.deletePet(id);
  res.status(204).send();
});

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
};
