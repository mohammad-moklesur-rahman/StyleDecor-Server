import { servicesBookingsCollection } from "../models/ServiceBookings.js";

// * Add Services Bookings
export const createServiceBookings = async (req, res) => {
  const doc = req.body;
  const result = await servicesBookingsCollection().insertOne(doc);
  res.send(result);
};
