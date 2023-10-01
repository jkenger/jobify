import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";
import { query } from "express";

// let jobs = [
//   {
//     id: nanoid(),
//     title: "Frontend Developer",
//     description: "Develop the frontend of the application",
//     salary: 50000,
//     company: "Google",
//   },
//   {
//     id: nanoid(),
//     title: "Backend Developer",
//     description: "Develop the backend of the application",
//     salary: 50000,
//     company: "Facebook",
//   },
// ];
export const getAllJobs = asyncHandler(async (req, res) => {
  const { search, sort } = req.query;
  let { jobStatus, jobType } = req.query;

  // Setup Query Object
  const queryObject = {
    createdBy: req.user.userId,
  };

  // Search
  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  // Setup Job Status and Job Type
  if (jobStatus) jobStatus = jobStatus.split(",");

  if (jobType) jobType = jobType.split(",");
  // Filter Job Status
  if (jobStatus?.length) {
    queryObject.jobStatus = { $in: jobStatus };
  }
  if (jobType?.length) {
    queryObject.jobType = { $in: jobType };
  }
  console.log(queryObject);
  // Sort
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // Page 2: (2 - 1) * 10 = 10
  const jobs = await Job.find(queryObject)
    .sort(sortOptions[sort])
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  const totalJobs = await Job.countDocuments(queryObject).exec();
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({
    success: true,
    message: { jobs, totalJobs, numOfPages, currentPage: page },
  });
});

export const getSingleJob = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id).lean().exec();
  res.status(StatusCodes.OK).json({ success: true, message: job });
});

export const createJob = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { company, position, createdBy } = req.body;
  const job = await new Job({ company, position, createdBy }).save();
  res.status(StatusCodes.CREATED).json({ success: true, message: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { company, position, jobStatus, jobType, jobLocation } = req.body;
  const job = await Job.findOne({ _id: id }).exec();
  job.company = company;
  job.position = position;
  job.jobStatus = jobStatus;
  job.jobType = jobType;
  job.jobLocation = jobLocation;
  await job.save();
  res.status(StatusCodes.OK).json({ success: "true", message: "Job updated" });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const job = await Job.findByIdAndDelete(id).exec();
  res.status(StatusCodes.OK).json({ success: "true", message: "Job deleted" });
});

export const showStats = asyncHandler(async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, stat) => {
    const { _id: title, count } = stat;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    rejected: stats.rejected || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((stat) => {
      const {
        _id: { year, month },
        count,
      } = stat;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");

      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
});
