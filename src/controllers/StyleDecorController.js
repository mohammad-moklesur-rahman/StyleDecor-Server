import { servicesCollection } from "../models/StyleDecorModel.js";

// * Get All Services
export const getAllService = async (req, res) => {
  const result = await servicesCollection().find().toArray();
  res.send(result);
};

// * Add Services
export const createService = async (req, res) => {
  const doc = req.body;
  const result = await servicesCollection().insertOne(doc);
  res.send(result);
};
