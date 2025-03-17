const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/send-otp', AuthController.sendOTP);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
