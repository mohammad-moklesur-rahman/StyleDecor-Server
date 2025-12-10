import express from "express";
import { createService, getAllService } from "../controllers/StyleDecorController.js";

const router = express.Router();

// Get Route for All services
router.get("/", getAllService)

// Post Route for creating a service
router.post("/", createService);


export default router;
