import express from "express";
import { getAvailableDecorators } from "../controllers/DecoratorsControllers.js";


const router = express.Router();

// Get route for all available decorators
router.get("/", getAvailableDecorators);


export default router;
