import { getDB } from "../config/StyleDecor.config.js";

export const decoratorsCollection = () => {
  const db = getDB();
  return db.collection("Decorators");
};
