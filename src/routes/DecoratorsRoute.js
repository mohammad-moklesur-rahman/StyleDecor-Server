import express from "express";
import {
  assignDecorator,
  getAvailableDecorators,
} from "../controllers/DecoratorsControllers.js";

const router = express.Router();

// Get route for all available decorators
router.get("/", getAvailableDecorators);

// Patch route to assign a decorator to a booking
router.patch("/assign-decorator", assignDecorator);

export default router;
