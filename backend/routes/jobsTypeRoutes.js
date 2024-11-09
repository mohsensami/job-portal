const express = require('express');
const router = express.Router();
const { createJobType, allJobsType } = require('../controllers/jobsTypeController');
const { isAuthenticated } = require('../middleware/auth');

//job type routes

// /api/type/create
router.post('/type/create', isAuthenticated, createJobType);
// /api/type/jobs
router.get('/type/jobs', allJobsType);
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType);

module.exports = router;
