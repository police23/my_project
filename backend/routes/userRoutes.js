const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

module.exports = router;
