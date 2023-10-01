import express from "express";

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import { UserRole } from "../utils/constants.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions(UserRole.ADMIN), getApplicationStats);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUser,
    updateUser
  );

export default router;
