import Stripe from "stripe";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";
import { stripePaymentsCollection } from "../models/StripePaymentModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// * Get My Payments History
export const getMyPaymentsHistory = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).send({ message: "email required" });
    }

    const myBookings = await stripePaymentsCollection()
      .find({ userEmail: userEmail })
      .toArray();

    res.send(myBookings);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch" });
  }
};

// CREATE CHECKOUT SESSION
export const createCheckoutSession = async (req, res) => {
  try {
    const { bookingId, userId, userEmail } = req.body;

    // Get booking details from DB
    const booking = await servicesBookingsCollection().findOne({
      _id: new ObjectId(bookingId),
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: booking.service_name,
              images: [booking.service_image],
            },
            unit_amount: booking.cost * 100, // BDT → paisa
          },
          quantity: 1,
        },
      ],

      // store metadata we can update DB later
      metadata: {
        bookingId,
        userId,
        userEmail,
      },

      success_url: `${process.env.CLIENT_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/my-bookings`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// SAVE PAYMENT INFO AFTER SUCCESS

export const savePaymentInfo = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    // Check if payment already stored
    const existing = await stripePaymentsCollection().findOne({
      transactionId: session.id,
    });

    if (existing) {
      return res.json({ message: "Already saved" });
    }

    // Save transaction in DB
    await stripePaymentsCollection().insertOne({
      transactionId: session.id,
      amount: session.amount_total / 100, // convert paisa → BDT
      userEmail: session.metadata.userEmail,
      bookingId: session.metadata.bookingId,
      status: session.payment_status,
      date: new Date(),
    });

    // Update booking paid status
    await servicesBookingsCollection().updateOne(
      { _id: new ObjectId(session.metadata.bookingId) },
      { $set: { paid: true, status: "Completed" } }
    );

    res.send({ message: "Payment saved successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
