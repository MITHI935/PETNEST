const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { validatePet } = require('../middlewares/validationMiddleware');

router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', validatePet, petController.createPet);
router.put('/:id', validatePet, petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
