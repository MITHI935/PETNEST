const express = require('express');
const router = express.Router();
const vetController = require('../controllers/vetController');
const { validateVet } = require('../middlewares/validationMiddleware');

router.get('/', vetController.getAllVets);
router.get('/:id', vetController.getVetById);
router.post('/', validateVet, vetController.createVet);
router.put('/:id', validateVet, vetController.updateVet);
router.delete('/:id', vetController.deleteVet);

module.exports = router;
