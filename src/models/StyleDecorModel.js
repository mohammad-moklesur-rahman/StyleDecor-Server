import { getDB } from "../config/StyleDecor.config.js";

export const eBooksCollection = () => {
  const db = getDB();
  return db.collection("Services");
};
