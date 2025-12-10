import { ObjectId } from "mongodb";
import { servicesCollection } from "../models/StyleDecorModel.js";

// * Get Service By id
export const getServiceById = async (req, res) => {
  const { id } = req.params;
  const result = await servicesCollection().findOne({ _id: new ObjectId(id) });
  res.send(result);
};

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
