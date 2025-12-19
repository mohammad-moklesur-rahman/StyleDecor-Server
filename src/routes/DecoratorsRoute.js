import express from "express";
import {
  approveDecorator,
  assignDecorator,
  disableDecorator,
  getAllDecorators,
  getAvailableDecorators,
  getMyAssignedProjects,
  getTodaySchedule,
} from "../controllers/DecoratorsControllers.js";

const router = express.Router();

// Get route for My Assigned projects
router.get("/my-projects", getMyAssignedProjects);

// Get route for Today schedule
router.get("/today-schedule", getTodaySchedule);

// Get route for all decorators
router.get("/", getAllDecorators);

// Get route for all available decorators
router.get("/available", getAvailableDecorators);

// Patch route for approve decorator
router.patch("/approve/:decoratorId", approveDecorator);

// Patch route for disable decorator
router.patch("/disable/:decoratorId", disableDecorator);

// Patch route to assign a decorator to a booking
router.patch("/assign-decorator", assignDecorator);

export default router;
