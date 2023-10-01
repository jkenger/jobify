import mongoose from "mongoose";
import { JobStatus, JobType } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JobType),
      default: JobType.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "remote",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Jobs", JobSchema);

export default Job;
