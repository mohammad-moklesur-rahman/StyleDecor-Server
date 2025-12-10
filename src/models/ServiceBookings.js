import { getDB } from "../config/StyleDecor.config.js";

export const servicesBookings = () => {
  const db = getDB();
  return db.collection("Service Bookings");
};
