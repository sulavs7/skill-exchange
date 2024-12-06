const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



// Signup routes
router.get('/signup', authController.signupPage);
router.post('/signup', authController.handleSignup);
router.get('/signup-local', authController.signupPage);
router.post('/signup-local', authController.handleSignup);

// Login routes
router.get('/login', authController.loginPage);
router.post('/login', authController.handleLogin);
router.get('/login-local', authController.loginPage);
router.post('/login-local', authController.handleLogin);


module.exports = router;


