import { ObjectId } from "mongodb";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";

// Get paid bookings where decorator is NOT assigned - Admin
export const getPaidUnassignedBookings = async (req, res) => {
  try {
    const bookings = await servicesBookingsCollection()
      .find({
        status: "Completed",
        $or: [
          { dec_status: { $exists: false } },
          { dec_status: "Not Assigned" },
        ],
      })
      .toArray();

    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: "Failed to load bookings" });
  }
};

// Get All Paid Bookings - Admin
export const getAllPaidBookings = async (req, res) => {
  try {
    const { status } = req.query;

    // Build query dynamically
    const query = { dec_status: { $ne: "assigned" } };

    if (status) {
      query.dec_status = status; // "not assigned"
    }

    const bookings = await servicesBookingsCollection().find(query).toArray();

    res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: "Failed to load bookings" });
  }
};

// Get All Bookings - Admin
export const getAllBookings = async (req, res) => {
  const bookings = await servicesBookingsCollection()
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  res.send(bookings);
};

// * Get My Bookings
export const getMyBookings = async (req, res) => {
  try {
    const userEmail = req.tokenEmail;

    if (!userEmail) {
      return res.status(400).send({ message: "email required" });
    }

    const myBookings = await servicesBookingsCollection()
      .find({ userEmail: userEmail })
      .toArray();

    res.send(myBookings);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch" });
  }
};

// * Add Services Bookings
export const createServiceBookings = async (req, res) => {
  const doc = req.body;
  const result = await servicesBookingsCollection().insertOne(doc);
  res.send(result);
};

// * Delete or Cancel Booking
export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  const result = await servicesBookingsCollection().deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};
