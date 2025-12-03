
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
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
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'نام الزامی است'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'نام خانوادگی الزامی است'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'ایمیل الزامی است'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'لطفاً یک ایمیل معتبر وارد کنید'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'رمز عبور الزامی است'],
        minlength: [6, 'رمز عبور باید حداقل ۶ کاراکتر داشته باشد'],
    },

    jobsHistory: [jobsHistorySchema],

    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}



module.exports = mongoose.model("User", userSchema);