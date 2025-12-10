import express from "express";
import {
  createServiceBookings,
  getMyBookings,
} from "../controllers/ServiceBookingsControllers.js";

const router = express.Router();

// Get Route for Getting My Bookings
router.get("/", getMyBookings);

// Post Route for creating a service Bookings
router.post("/", createServiceBookings);

export default router;
