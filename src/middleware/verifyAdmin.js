import { usersCollection } from "../models/UsersModel.js";

export const verifyAdmin = async (req, res, next) => {
  const email = req.tokenEmail;
  const user = await usersCollection().findOne({ email });
  if (user?.role !== "admin")
    return res
      .status(403)
      .send({ message: "Admin only Actions!", role: user?.role });

  next();
};
