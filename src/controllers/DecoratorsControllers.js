import { decoratorsCollection } from "../models/DecoratorsModel.js";

// Get all available decorators
export const getAvailableDecorators = async (req, res) => {
  const decorators = await decoratorsCollection()
    .find({ isAvailable: true })
    .toArray();

  res.send(decorators);
};
