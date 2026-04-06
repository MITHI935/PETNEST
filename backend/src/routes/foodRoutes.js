const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { validateFood } = require('../middlewares/validationMiddleware');

router.get('/', foodController.getAllFood);
router.get('/:id', foodController.getFoodById);
router.post('/', validateFood, foodController.createFood);
router.put('/:id', validateFood, foodController.updateFood);
router.delete('/:id', foodController.deleteFood);

module.exports = router;
