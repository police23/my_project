const express = require('express');
const TestController = require('../controllers/testController');

const router = express.Router();

// Định nghĩa các routes
router.get('/', TestController.getAllTests);
router.get('/:id', TestController.getTestById);
router.post('/', TestController.createTest); // Thêm route POST

module.exports = router;
