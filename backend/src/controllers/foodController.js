const asyncHandler = require('../utils/asyncHandler');
const foodService = require('../services/foodService');

const getAllFood = asyncHandler(async (req, res) => {
  const filters = req.query;
  const food = await foodService.getAllFood(filters);
  res.status(200).json(food);
});

const getFoodById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const food = await foodService.getFoodById(id);
  if (!food) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(food);
});

const createFood = asyncHandler(async (req, res) => {
  const newFood = await foodService.createFood(req.body);
  res.status(201).json(newFood);
});

const updateFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedFood = await foodService.updateFood(id, req.body);
  if (!updatedFood) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(updatedFood);
});

const deleteFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await foodService.deleteFood(id);
  res.status(204).send();
});

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
