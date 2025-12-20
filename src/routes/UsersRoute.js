import express from "express";
import {
  createUsers,
  getAllUsers,
  getUsersRole,
  updateUserRole,
} from "../controllers/UsersControllers.js";
import verifyJWT from "../middleware/jwtAuthMiddleware.js";

const router = express.Router();

// Get route for all users
router.get("/", getAllUsers);

// Get route for users role
router.get("/role", verifyJWT, getUsersRole);

// Patch route for updating user role
router.patch("/role/:userId", updateUserRole);

// Post route for creating a user
router.post("/", createUsers);

export default router;
