const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");

//load all users
exports.allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//show single user
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//edit user
exports.editUser = async (req, res, next) => {
  try {
    // فقط کاربر می‌تواند اطلاعات خودش را ویرایش کند
    if (req.params.id !== req.user._id.toString()) {
      return next(
        new ErrorResponse("شما فقط می‌توانید اطلاعات خود را ویرایش کنید", 403)
      );
    }

    // فیلدهای قابل ویرایش
    const allowedFields = ["firstName", "lastName", "email", "phone"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // اگر ایمیل تغییر کرده، چک می‌کنیم که تکراری نباشد
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse("این ایمیل قبلاً استفاده شده است", 400));
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      user,
      message: "اطلاعات با موفقیت به‌روزرسانی شد",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "کاربر حذف شد",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//jobs history (apply for a job)
exports.createUserJobsHistory = async (req, res, next) => {
  const { title, description, salary, location, jobId } = req.body;

  try {
    const currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser) {
      return next(new ErrorResponse("باید وارد شوید", 401));
    }

    // اگر jobId فرستاده شده، مطمئن شو شغل وجود دارد
    let job = null;
    if (jobId) {
      job = await Job.findById(jobId);
      if (!job) {
        return next(new ErrorResponse("شغل مورد نظر پیدا نشد", 404));
      }
    }

    const addJobHistory = {
      title,
      description,
      salary,
      location,
      user: req.user._id,
      job: job ? job._id : undefined,
    };

    currentUser.jobsHistory.push(addJobHistory);
    await currentUser.save();

    // اگر jobId داریم، یک Application مستقل هم برای این شغل ثبت کنیم
    // اما اول چک می‌کنیم که قبلاً برای این شغل Application نساخته باشیم
    if (job) {
      const existingApplication = await Application.findOne({
        job: job._id,
        applicant: req.user._id,
      });

      if (!existingApplication) {
        await Application.create({
          job: job._id,
          applicant: req.user._id,
          status: "pending",
        });
      }
    }

    res.status(200).json({
      success: true,
      currentUser,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// public stats for homepage (only employers & jobseekers)
exports.getStats = async (req, res, next) => {
  try {
    const [employers, jobseekers] = await Promise.all([
      User.countDocuments({ role: 1 }),
      User.countDocuments({ role: 0 }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        employers,
        jobseekers,
      },
    });
    next();
  } catch (error) {
    return next(error);
  }
};
