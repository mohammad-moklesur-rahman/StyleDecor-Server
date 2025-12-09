import express from "express";
import { createService } from "../controllers/StyleDecorController.js";

const router = express.Router();

// Post Route
router.post("/", createService);


export default router;
