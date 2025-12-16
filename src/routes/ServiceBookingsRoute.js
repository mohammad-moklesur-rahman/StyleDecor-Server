import express from "express";
import {
  createServiceBookings,
  deleteBooking,
  getAllBookings,
  getMyBookings,
} from "../controllers/ServiceBookingsControllers.js";

const router = express.Router();

// Get Route for Admin to Get All Bookings
router.get("/", getAllBookings)

// Get Route for Getting My Bookings
router.get("/", getMyBookings);

// Post Route for creating a service Bookings
router.post("/", createServiceBookings);

// Delete Route for Canceling a Booking
router.delete("/:id", deleteBooking);

export default router;
