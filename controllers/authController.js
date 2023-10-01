import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { UserRole } from "../utils/constants.js";
import { UnautheticatedError } from "../errors/customErrors.js";
import { generateToken } from "../utils/tokenUtils.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Check if is the first account, if it is, set the role to admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  req.body.role = isFirstAccount
    ? [UserRole.USER, UserRole.ADMIN]
    : [UserRole.USER];

  // Create user
  const { name, email, password, lastName, location, role } = req.body;
  const user = await new User({
    name,
    email,
    password,
    lastName,
    location,
    role,
  }).save();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "User created" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const [auth, user] = await User.authenticate(email, password);
  if (!auth) {
    throw new UnautheticatedError("Invalid email or password");
  }
  console.log(user);
  const token = generateToken({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.send({ token });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send({ message: "User logged out" });
});
