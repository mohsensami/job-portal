const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");
const Application = require("../models/applicationModel");

//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName email");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//delete job by id
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.job_id);

    if (!job) {
      return next(new ErrorResponse("Job not found", 404));
    }

    await Job.findByIdAndDelete(req.params.job_id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.showJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // filter jobs by category ids
  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });

  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //const count = await Job.find({}).estimatedDocumentCount();
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();

  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
    });
  } catch (error) {
    next(error);
  }
};

// لیست متقاضیان یک شغل برای کارفرما/ادمین
exports.getJobApplicants = async (req, res, next) => {
  try {
    const jobId = req.params.job_id;
    const job = await Job.findById(jobId);

    if (!job) {
      return next(new ErrorResponse("شغل پیدا نشد", 404));
    }

    // فقط ادمین یا صاحب این آگهی (کارفرما) بتواند متقاضیان را ببیند
    // role === 0: کارجو (دسترسی ندارد)
    // role === 1: کارفرما (فقط آگهی‌های خودش)
    // role > 1: ادمین (دسترسی کامل)
    if (req.user.role === 0) {
      return next(
        new ErrorResponse("کارجویان اجازه مشاهده متقاضیان را ندارند", 403)
      );
    }

    // اگر کارفرما است (role === 1)، باید صاحب این آگهی باشد
    if (
      req.user.role === 1 &&
      job.user.toString() !== req.user._id.toString()
    ) {
      return next(
        new ErrorResponse(
          "شما فقط می‌توانید متقاضیان آگهی‌های خود را ببینید",
          403
        )
      );
    }

    const applicants = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate("applicant", "firstName lastName email");

    res.status(200).json({
      success: true,
      jobId,
      applicants,
    });
  } catch (error) {
    next(error);
  }
};

// لیست همه متقاضیان از همه شغل‌ها (فقط برای ادمین)
exports.getAllApplicants = async (req, res, next) => {
  try {
    // فقط ادمین (role > 1) یا کارفرما (role === 1) می‌تواند این لیست را ببیند
    if (req.user.role === 0) {
      return next(
        new ErrorResponse("کارجویان اجازه مشاهده این لیست را ندارند", 403)
      );
    }

    // اگر کارفرما است، فقط متقاضیان آگهی‌های خودش را ببیند
    let filter = {};
    if (req.user.role === 1) {
      // پیدا کردن همه شغل‌های این کارفرما
      const userJobs = await Job.find({ user: req.user._id }).select("_id");
      const jobIds = userJobs.map((job) => job._id);
      filter = { job: { $in: jobIds } };
    }

    const applicants = await Application.find(filter)
      .sort({ createdAt: -1 })
      .populate("applicant", "firstName lastName email")
      .populate({
        path: "job",
        select: "title location salary",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      });

    res.status(200).json({
      success: true,
      applicants,
      count: applicants.length,
    });
  } catch (error) {
    next(error);
  }
};

// تایید یا رد کردن رزومه متقاضی
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // بررسی معتبر بودن status
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return next(
        new ErrorResponse(
          "وضعیت نامعتبر است. باید یکی از این موارد باشد: accepted, rejected, pending",
          400
        )
      );
    }

    // پیدا کردن Application
    const application = await Application.findById(applicationId).populate(
      "job",
      "user title"
    );

    if (!application) {
      return next(new ErrorResponse("درخواست پیدا نشد", 404));
    }

    // چک کردن دسترسی: فقط ادمین یا کارفرمای صاحب آگهی می‌تواند وضعیت را تغییر دهد
    if (req.user.role === 0) {
      return next(
        new ErrorResponse("کارجویان اجازه تغییر وضعیت را ندارند", 403)
      );
    }

    // اگر کارفرما است (role === 1)، باید صاحب این آگهی باشد
    if (
      req.user.role === 1 &&
      application.job.user.toString() !== req.user._id.toString()
    ) {
      return next(
        new ErrorResponse(
          "شما فقط می‌توانید وضعیت متقاضیان آگهی‌های خود را تغییر دهید",
          403
        )
      );
    }

    // آپدیت کردن Application
    application.status = status;
    await application.save();

    // آپدیت کردن jobsHistory کاربر (اگر jobId در jobsHistory وجود دارد)
    const User = require("../models/userModel");
    const applicant = await User.findById(application.applicant);

    if (applicant && applicant.jobsHistory) {
      // پیدا کردن آیتم مربوطه در jobsHistory
      const jobHistoryItem = applicant.jobsHistory.find(
        (item) =>
          item.job && item.job.toString() === application.job._id.toString()
      );

      if (jobHistoryItem) {
        jobHistoryItem.applicationStatus = status;
        await applicant.save();
      }
    }

    // برگرداندن Application آپدیت شده با populate
    const updatedApplication = await Application.findById(applicationId)
      .populate("applicant", "firstName lastName email")
      .populate({
        path: "job",
        select: "title location salary",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      });

    res.status(200).json({
      success: true,
      message: `وضعیت درخواست با موفقیت به "${
        status === "accepted"
          ? "تایید شده"
          : status === "rejected"
          ? "رد شده"
          : "در انتظار"
      }" تغییر یافت`,
      application: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};
