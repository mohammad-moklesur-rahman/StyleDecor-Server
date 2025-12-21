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

const router = express.Router();

// Get route for Decorator Profile
router.get("/my-profile", verifyJWT, getDecoratorProfile);

// Get route for Decorator Earnings Summary
router.get("/earnings-summary", verifyJWT, getDecoratorEarningsSummary);

// Get route for My Assigned projects
router.get("/my-projects", getMyAssignedProjects);

// Get route for Today schedule
router.get("/today-schedule", getTodaySchedule);

// Get route for all decorators
router.get("/", getAllDecorators);

// Get route for all available decorators
router.get("/available", getAvailableDecorators);

// Patch route for update availability
router.patch("/:id/availability", verifyJWT, updateAvailability);

// Patch route for approve decorator
router.patch("/approve/:decoratorId", approveDecorator);

// Patch route for disable decorator
router.patch("/disable/:decoratorId", disableDecorator);

// Patch route to assign a decorator to a booking
router.patch("/assign-decorator", verifyJWT, assignDecorator);

// Patch route for decorator can update the project status
router.patch("/update-status/:id", updateProjectStatus);

export default router;
