import { usersCollection } from "../models/UsersModel.js";

export const verifyDecorator = async (req, res, next) => {
  const email = req.tokenEmail;
  const user = await usersCollection().findOne({ email });
  if (user?.role !== "seller")
    return res
      .status(403)
      .send({ message: "Seller only Actions!", role: user?.role });

  next();
};
