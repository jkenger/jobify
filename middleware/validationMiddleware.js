import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JobStatus, JobType, UserRole } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Job not")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("You are not the owner")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// Job validation
export const validateJob = withValidationErrors([
  body("company").notEmpty().withMessage("Company name is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus")
    .isIn(Object.values(JobStatus))
    .withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JobType)).withMessage("Invalid job type"),
]);

// Id param validation
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);

    if (!isValid) throw new BadRequestError("Invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError("Job not found");
    const isAdmin = req.user.role.includes(UserRole.ADMIN);
    const isOwner = job.createdBy.toString() === req.user.userId;
    if (!isAdmin && !isOwner) {
      throw new BadRequestError("You are not the owner of this job");
    }
  }),
]);

// Register validation
export const validateRegister = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const lEmail = email.toLowerCase(); // lowercase email
      const emailExist = await User.findOne({ email: lEmail });
      if (emailExist) throw new BadRequestError("Email already exists");
    })
    .isLength({ max: 50, min: 3 })
    .withMessage("Email must be between 3 and 50 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be between 3 and 50 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("Last name must be between 3 and 50 characters"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 50 })
    .withMessage("Last name must be between 3 and 50 characters"),
]);

// Login validation
export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
]);

// Update user validation
export const validateUpdateUser = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email, { req }) => {
      const lEmail = email.toLowerCase(); // lowercase email
      const emailExist = await User.findOne({ email: lEmail });
      if (emailExist && emailExist._id.toString() !== req.user.userId)
        throw new BadRequestError("Email already exists");
    })
    .isLength({ max: 50, min: 3 })
    .withMessage("Email must be between 3 and 50 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50, min: 3 })
    .withMessage("Last name must be between 3 and 50 characters"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 50 })
    .withMessage("Last name must be between 3 and 50 characters"),
]);
