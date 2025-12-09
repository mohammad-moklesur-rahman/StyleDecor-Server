import { servicesCollection } from "../models/StyleDecorModel.js";

// * Add Services
export const createService = async (req, res) => {
  const doc = req.body;
  const result = await servicesCollection().insertOne(doc);
  res.send(result);
};
