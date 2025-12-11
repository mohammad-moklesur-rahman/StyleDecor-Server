import express from "express";
import { createCheckoutSession } from "../controllers/StripePaymentControllers.js";

const router = express.Router();

// Post route for creating checkout session
router.post("/create-checkout-session", createCheckoutSession);

export default router;
