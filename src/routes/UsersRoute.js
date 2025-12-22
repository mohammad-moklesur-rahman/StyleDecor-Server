import express from "express";
import {
  createUsers,
  getAllUsers,
  getUserProfile,
  getUsersRole,
  updateUserProfile,
  updateUserRole,
} from "../controllers/UsersControllers.js";
import verifyJWT from "../middleware/jwtAuthMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// Get route for user Profile
router.get("/my-profile", verifyJWT, getUserProfile);

// Get route for all users
router.get("/", verifyJWT, verifyAdmin, getAllUsers);

// Get route for users role
router.get("/role", verifyJWT, getUsersRole);

// Patch route for updating user role
router.patch("/role/:userId", verifyJWT, verifyAdmin, updateUserRole);

// Get route for user Profile
router.put("/my-profile", verifyJWT, updateUserProfile);

// Post route for creating a user
router.post("/", createUsers);

export default router;
