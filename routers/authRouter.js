import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

//@Desc    Register a new user
//@Route   POST /api/v1/auth/register
//@Access  Private
router.route("/register").post(validateRegister, registerUser);

//@Desc    Login a user
//@Route   POST /api/v1/auth/login
//@Access  Public
router.route("/login").post(validateLogin, loginUser);

// @Desc    Logout a user
// @Route   GET /api/v1/auth/logout
// @Access  Public
router.route("/logout").get(logoutUser);

export default router;
