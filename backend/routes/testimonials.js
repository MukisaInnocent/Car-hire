const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/auth');

// Public
router.get('/', testimonialController.getAll);

// Admin
router.post('/', authMiddleware, testimonialController.create);
router.patch('/:id/toggle', authMiddleware, testimonialController.toggleVisibility);
router.delete('/:id', authMiddleware, testimonialController.delete);

module.exports = router;
