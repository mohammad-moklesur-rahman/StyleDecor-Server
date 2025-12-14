import { usersCollection } from "../models/UsersModel.js";

// * Add new user or update last_loggedIn if user exists
export const createUsers = async (req, res) => {
  const userData = req.body;
  userData.created_at = new Date().toISOString();
  userData.last_loggedIn = new Date().toISOString();
  userData.role = "user"; // default role

  const query = { email: userData.email };

  const alreadyExists = await usersCollection().findOne(query);

  if (alreadyExists) {
    const result = await usersCollection().updateOne(query, {
      $set: { last_loggedIn: new Date().toISOString() },
    });
    return res.send(result);
  }

  const result = await usersCollection().insertOne(userData);
  res.send(result);
};
