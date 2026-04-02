const foodService = require('../services/foodService');

const getAllFood = async (req, res) => {
  try {
    const filters = req.query;
    const food = await foodService.getAllFood(filters);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodService.getFoodById(id);
    if (!food) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const newFood = await foodService.createFood(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFood = await foodService.updateFood(id, req.body);
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    await foodService.deleteFood(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
