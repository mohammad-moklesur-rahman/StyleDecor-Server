import express from "express";
import {
  createCheckoutSession,
  getMyPaymentsHistory,
  savePaymentInfo,
} from "../controllers/StripePaymentControllers.js";

const router = express.Router();

// Get → My Payments History
router.get("/payment-history", getMyPaymentsHistory)

// GET → Called after successful payment
router.get("/payment-info", savePaymentInfo);

// POST → Create Stripe session
router.post("/create-checkout-session", createCheckoutSession);

export default router;
