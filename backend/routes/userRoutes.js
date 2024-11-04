const express = require('express');
const router = express.Router();
const { allUsers, singleUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);

module.exports = router;
