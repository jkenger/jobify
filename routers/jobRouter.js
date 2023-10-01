import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  showStats,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateJob,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJob, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, validateJob, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
