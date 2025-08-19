// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getUser, forgotPassword, resetPassword  } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth /register
// @desc    Register a new user
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate a user & get token
router.post('/login', login);
//router.get('/user', auth, getUser);
router.post('/forgot-password', forgotPassword); // <-- NEW ROUTE
router.get('/user', auth, getUser); // <-- EXISTING ROUTE
router.put('/reset-password/:token', resetPassword);
module.exports = router;