import { getDB } from "../config/StyleDecor.config.js";

export const usersCollection = () => {
  const db = getDB();
  return db.collection("Users");
};
