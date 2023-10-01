import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { BadRequestError } from "../errors/customErrors.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user.userId)
    .select("-password -__v -createdAt -updatedAt ")
    .lean()
    .exec();

  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: "User not found" });

  res.status(StatusCodes.OK).json({ success: true, message: user });
});
export const getApplicationStats = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ success: true, message: { users, jobs } });
});
export const updateUser = asyncHandler(async (req, res) => {
  delete req.body.password;

  // Check if file is sent
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    console.log(response);
    fs.unlink(req.file.path, (err) => {
      if (err) throw new BadRequestError("Failed deleting internal file");
    });
    req.body.avatar = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);

  // If user updated, delete previous avatar
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ success: true, message: "User updated" });
});
