const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middlewares/validationMiddleware');

router.post('/', validateOrder, orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', validateOrder, orderController.updateOrder);

module.exports = router;
