import express from "express";
import { createUsers } from "../controllers/UsersControllers.js";

const router = express.Router();

// Post route for creating a user
router.post("/", createUsers);

export default router;
