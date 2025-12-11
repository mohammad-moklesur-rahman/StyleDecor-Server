import Stripe from "stripe";
import dotenv from "dotenv";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";
import { ObjectId } from "mongodb";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { bookingId, userId } = req.body;

    // Get booking from DB
    const booking = await servicesBookingsCollection().findOne({
      _id: new ObjectId(bookingId),
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

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
            unit_amount: booking.cost * 100, // Stripe expects amount in **paisa** (1 BDT = 100 paisa)
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId,
        userId,
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?bookingId=${bookingId}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/my-bookings`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
