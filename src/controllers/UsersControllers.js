import { ObjectId } from "mongodb";
import { usersCollection } from "../models/UsersModel.js";
import { decoratorsCollection } from "../models/DecoratorsModel.js";

// * get a user's role
export const getUsersRole = async (req, res) => {
  const result = await usersCollection().findOne({ email: req.tokenEmail });
  res.send({ role: result?.role });
};

// * get All users
export const getAllUsers = async (req, res) => {
  const users = await usersCollection().find().toArray();
  res.send(users);
};

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

// * Update user role
export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  // Update role in users collection
  const user = await usersCollection().findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role } }
  );

  // If role is decorator → create decorator profile
  if (role === "decorator") {
    const existingDecorator = await decoratorsCollection().findOne({
      userId: new ObjectId(userId),
    });

    if (!existingDecorator) {
      await decoratorsCollection().insertOne({
        userId: new ObjectId(userId),
        name: user.name,
        email: user.email,
        photo: user.photo,

        status: "pending",
        isAvailable: false,
        createdAt: new Date(),
      });
    }
  }

  res.send({ success: true });
};
