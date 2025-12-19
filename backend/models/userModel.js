const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jobsHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    description: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    interviewDate: {
      type: Date,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    // کاربری که این درخواست را ثبت کرده (همان کارجو)
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    // رفرنس به شغل مربوطه تا بتوانیم بعداً از روی Job همه متقاضیان را پیدا کنیم
    job: {
      type: ObjectId,
      ref: "Job",
    },
  },
  { timestamps: true }
);

const workExperienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, "نام شرکت الزامی است"],
      maxlength: [100, "نام شرکت نباید بیشتر از 100 کاراکتر باشد"],
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "عنوان شغلی الزامی است"],
      maxlength: [100, "عنوان شغلی نباید بیشتر از 100 کاراکتر باشد"],
    },
    startYear: {
      type: Number,
      required: [true, "سال شروع الزامی است"],
      min: [1950, "سال شروع باید معتبر باشد"],
      max: [
        new Date().getFullYear(),
        "سال شروع نمی‌تواند از سال جاری بیشتر باشد",
      ],
    },
    endYear: {
      type: Number,
      min: [1950, "سال پایان باید معتبر باشد"],
      max: [
        new Date().getFullYear() + 1,
        "سال پایان نمی‌تواند از سال جاری بیشتر باشد",
      ],
      validate: {
        validator: function (value) {
          // اگر endYear وجود دارد، باید از startYear بزرگتر یا مساوی باشد
          if (value && this.startYear) {
            return value >= this.startYear;
          }
          return true;
        },
        message: "سال پایان باید از سال شروع بزرگتر یا مساوی باشد",
      },
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "نام الزامی است"],
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "نام خانوادگی الزامی است"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "ایمیل الزامی است"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "لطفاً یک ایمیل معتبر وارد کنید",
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],
    aboutMe: {
      type: String,
      trim: true,
      maxlength: [2000, "متن درباره من نباید بیشتر از 2000 کاراکتر باشد"],
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married"],
      trim: true,
    },
    birthYear: {
      type: Number,
      min: [1950, "سال تولد باید معتبر باشد"],
      max: [
        new Date().getFullYear(),
        "سال تولد نمی‌تواند از سال جاری بیشتر باشد",
      ],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      trim: true,
    },
    militaryServiceStatus: {
      type: String,
      enum: ["exempt", "completed", "ongoing", "liable"],
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, "آدرس نباید بیشتر از 500 کاراکتر باشد"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "رمز عبور الزامی است"],
      minlength: [6, "رمز عبور باید حداقل ۶ کاراکتر داشته باشد"],
    },

    jobsHistory: [jobsHistorySchema],
    workExperience: [workExperienceSchema],

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
