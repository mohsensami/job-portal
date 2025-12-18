const express = require("express");
const router = express.Router();
const {
  createJob,
  singleJob,
  updateJob,
  showJobs,
  deleteJob,
  getJobApplicants,
} = require("../controllers/jobsController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//jobs routes

// /api/job/create
router.post("/job/create", isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get("/job/:id", singleJob);
// /api/job/update/job_id
router.put("/job/update/:job_id", isAuthenticated, isAdmin, updateJob);
// /api/job/delete/job_id
router.delete("/job/delete/:job_id", isAuthenticated, isAdmin, deleteJob);
// /api/jobs/show
router.get("/jobs/show", showJobs);

// لیست متقاضیان یک شغل (فقط کارفرما/ادمین)
// /api/job/:job_id/applicants
router.get(
  "/job/:job_id/applicants",
  isAuthenticated,
  isAdmin,
  getJobApplicants
);

module.exports = router;
