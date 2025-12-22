import express from "express";
import {
  createCheckoutSession,
  getAllPayments,
  getMyPaymentsHistory,
  savePaymentInfo,
} from "../controllers/StripePaymentControllers.js";
import verifyJWT from "../middleware/jwtAuthMiddleware.js";

const router = express.Router();

// Get → Admin Revenue Route
router.get("/payments", verifyJWT, getAllPayments);

// Get → My Payments History
router.get("/payment-history", verifyJWT, getMyPaymentsHistory);

// GET → Called after successful payment
router.get("/payment-info", verifyJWT, savePaymentInfo);

// POST → Create Stripe session
router.post("/create-checkout-session", createCheckoutSession);

export default router;
