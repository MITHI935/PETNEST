const asyncHandler = require('../utils/asyncHandler');
const orderService = require('../services/orderService');

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = await orderService.createOrder(req.body);
  res.status(201).json(newOrder);
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(order);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json(orders);
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedOrder = await orderService.updateOrder(id, req.body);
  if (!updatedOrder) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(updatedOrder);
});

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder
};
