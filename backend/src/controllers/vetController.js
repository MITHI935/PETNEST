const vetService = require('../services/vetService');

const getAllVets = async (req, res) => {
  try {
    const filters = req.query;
    const vets = await vetService.getAllVets(filters);
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVetById = async (req, res) => {
  try {
    const { id } = req.params;
    const vet = await vetService.getVetById(id);
    if (!vet) return res.status(404).json({ message: 'Veterinarian not found' });
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVet = async (req, res) => {
  try {
    const newVet = await vetService.createVet(req.body);
    res.status(201).json(newVet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVet = await vetService.updateVet(id, req.body);
    res.status(200).json(updatedVet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVet = async (req, res) => {
  try {
    const { id } = req.params;
    await vetService.deleteVet(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVets,
  getVetById,
  createVet,
  updateVet,
  deleteVet
};
