import express from "express";
import {
  approveDecorator,
  assignDecorator,
  disableDecorator,
  getAllDecorators,
  getAvailableDecorators,
  getDecoratorEarningsSummary,
  getDecoratorProfile,
  getMyAssignedProjects,
  getTodaySchedule,
  updateAvailability,
  updateProjectStatus,
} from "../controllers/DecoratorsControllers.js";
import verifyJWT from "../middleware/jwtAuthMiddleware.js";
import { verifyDecorator } from "../middleware/verifyDecorator.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// Get route for Decorator Profile
router.get("/my-profile", verifyJWT, getDecoratorProfile);

// Get route for Decorator Earnings Summary
router.get("/earnings-summary", verifyJWT, getDecoratorEarningsSummary);

// Get route for My Assigned projects
router.get("/my-projects", verifyJWT, verifyDecorator, getMyAssignedProjects);

// Get route for Today schedule
router.get("/today-schedule", verifyJWT, verifyDecorator, getTodaySchedule);

// Get route for all decorators
router.get("/", verifyJWT, getAllDecorators);

// Get route for all available decorators
router.get("/available", getAvailableDecorators);

// Patch route for update availability
router.patch("/:id/availability", verifyJWT, updateAvailability);

// Patch route for approve decorator
router.patch("/approve/:decoratorId", verifyJWT, verifyAdmin, approveDecorator);

// Patch route for disable decorator
router.patch("/disable/:decoratorId", verifyJWT, verifyAdmin, disableDecorator);

// Patch route to assign a decorator to a booking
router.patch("/assign-decorator", verifyJWT, verifyAdmin, assignDecorator);

// Patch route for decorator can update the project status
router.patch(
  "/update-status/:id",
  verifyJWT,
  verifyDecorator,
  updateProjectStatus
);

export default router;
