import { getDB } from "../config/StyleDecor.config.js";

export const servicesCollection = () => {
  const db = getDB();
  return db.collection("Services");
};
