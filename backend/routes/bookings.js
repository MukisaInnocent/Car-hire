const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

// Public
router.post('/', bookingController.create);

// Admin
router.get('/', authMiddleware, bookingController.getAll);
router.patch('/:id', authMiddleware, bookingController.updateStatus);

module.exports = router;
