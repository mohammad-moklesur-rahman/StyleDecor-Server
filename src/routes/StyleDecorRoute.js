import express from "express";
import { createService, getAllService, getServiceById } from "../controllers/StyleDecorController.js";

const router = express.Router();

// Get Route for All services
router.get("/", getAllService)

// Get Route for Service by id
router.get("/:id", getServiceById)

// Post Route for creating a service
router.post("/", createService);


export default router;
