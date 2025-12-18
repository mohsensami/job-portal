const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
