import express from "express";
import { createServiceBookings } from "../controllers/ServiceBookingsControllers.js";

const router = express.Router();

// Post Route for creating a service Bookings
router.post("/", createServiceBookings);

export default router;