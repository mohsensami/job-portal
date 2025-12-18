const express = require("express");
const router = express.Router();
const {
  createJob,
  singleJob,
  updateJob,
  showJobs,
  deleteJob,
  getJobApplicants,
  getAllApplicants,
  updateApplicationStatus,
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

// لیست همه متقاضیان از همه شغل‌ها (فقط ادمین/کارفرما)
// /api/applicants/all
router.get("/applicants/all", isAuthenticated, isAdmin, getAllApplicants);

// تایید یا رد کردن رزومه متقاضی
// /api/application/:applicationId/status
router.put(
  "/application/:applicationId/status",
  isAuthenticated,
  isAdmin,
  updateApplicationStatus
);

module.exports = router;
