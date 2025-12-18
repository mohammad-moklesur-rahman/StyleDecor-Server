import express from "express";
import {
  assignDecorator,
  getAllDecorators,
  getAvailableDecorators,
} from "../controllers/DecoratorsControllers.js";

const router = express.Router();

//
router.get("/", getAllDecorators);

// Get route for all available decorators
router.get("/available", getAvailableDecorators);

// Patch route to assign a decorator to a booking
router.patch("/assign-decorator", assignDecorator);

export default router;
