import express from "express";
import {
  createServiceBookings,
  deleteBooking,
  getAllBookings,
  getAllPaidBookings,
  getMyBookings,
} from "../controllers/ServiceBookingsControllers.js";
import verifyJWT from "../middleware/jwtAuthMiddleware.js";

const router = express.Router();

// Get Route for Getting My Bookings
router.get("/", getMyBookings);

// Get Route for Admin to Get All Bookings
router.get("/get-admin", getAllBookings);

// Get Route for admin to get all paid bookings
router.get("/paid", getAllPaidBookings);

// Post Route for creating a service Bookings
router.post("/", createServiceBookings);

// Delete Route for Canceling a Booking
router.delete("/:id", verifyJWT, deleteBooking);

export default router;
