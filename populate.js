import mongoose from "mongoose";
import { readFile } from "fs/promises";
import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: "john.doe@example.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockJob.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Data imported");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
