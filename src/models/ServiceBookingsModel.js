import { getDB } from "../config/StyleDecor.config.js";

export const servicesBookingsCollection = () => {
  const db = getDB();
  return db.collection("Service Bookings");
};
