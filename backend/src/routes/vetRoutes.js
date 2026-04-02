const express = require('express');
const router = express.Router();
const vetController = require('../controllers/vetController');

router.get('/', vetController.getAllVets);
router.get('/:id', vetController.getVetById);
router.post('/', vetController.createVet);
router.put('/:id', vetController.updateVet);
router.delete('/:id', vetController.deleteVet);

module.exports = router;
