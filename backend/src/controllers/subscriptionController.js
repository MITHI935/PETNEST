const subscriptionService = require('../services/subscriptionService');

const createSubscription = async (req, res) => {
  try {
    const newSubscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions
};
