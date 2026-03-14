const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/auth');

// Public
router.get('/', vehicleController.getAll);
router.get('/:id', vehicleController.getById);

// Admin
router.post('/', authMiddleware, vehicleController.create);
router.put('/:id', authMiddleware, vehicleController.update);
router.delete('/:id', authMiddleware, vehicleController.delete);

module.exports = router;
