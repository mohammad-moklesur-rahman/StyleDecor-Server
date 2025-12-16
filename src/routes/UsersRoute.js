import express from "express";
import {
  createUsers,
  getAllUsers,
  updateUserRole,
} from "../controllers/UsersControllers.js";

const router = express.Router();

// Get route for all users
router.get("/", getAllUsers);

// Patch route for updating user role
router.patch("/role/:userId", updateUserRole);

// Post route for creating a user
router.post("/", createUsers);

export default router;
