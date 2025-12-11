import { getDB } from "../config/StyleDecor.config.js";

export const stripePaymentsCollection = () => {
  const db = getDB();
  return db.collection("StripeTransactions");
};