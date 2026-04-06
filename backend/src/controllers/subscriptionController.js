const asyncHandler = require('../utils/asyncHandler');
const subscriptionService = require('../services/subscriptionService');

const createSubscription = asyncHandler(async (req, res) => {
  const newSubscription = await subscriptionService.createSubscription(req.body);
  res.status(201).json(newSubscription);
});

const getAllSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await subscriptionService.getAllSubscriptions();
  res.status(200).json(subscriptions);
});

module.exports = {
  createSubscription,
  getAllSubscriptions
};
