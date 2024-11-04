const express = require('express');
const { signup, signin, logout } = require('../controllers/authController');
const router = express.Router();

//auth routes
// api/signup
router.post('/signup', signup);
// api/signin
router.post('/signin', signin);
// api/signin
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);

module.exports = router;
