const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');

// Public
router.get('/', serviceController.getAll);

// Admin
router.post('/', authMiddleware, serviceController.create);
router.put('/:id', authMiddleware, serviceController.update);

module.exports = router;
