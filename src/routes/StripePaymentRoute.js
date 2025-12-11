import express from "express";
import {
  createCheckoutSession,
  savePaymentInfo,
} from "../controllers/StripePaymentControllers.js";

const router = express.Router();

// GET → Called after successful payment
router.get("/payment-info", savePaymentInfo);

// POST → Create Stripe session
router.post("/create-checkout-session", createCheckoutSession);

export default router;
