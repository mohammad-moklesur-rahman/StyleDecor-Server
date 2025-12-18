import { ObjectId } from "mongodb";
import { decoratorsCollection } from "../models/DecoratorsModel.js";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";

// Get all available decorators
export const getAvailableDecorators = async (req, res) => {
  const decorators = await decoratorsCollection()
    .find({ isAvailable: true })
    .toArray();

  res.send(decorators);
};

// 
export const getAllDecorators = async (req, res) => {
  const decorators = await decoratorsCollection()
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  res.send(decorators);
};

// Assign a decorator to a booking
export const assignDecorator = async (req, res) => {
  const { bookingId, decoratorId } = req.body;

  // Get booking
  const booking = await servicesBookingsCollection().findOne({
    _id: new ObjectId(bookingId),
  });

  // Check payment
  if (!booking || booking.status !== "Completed") {
    return res.status(403).send({
      message: "Payment not completed. Cannot assign decorator.",
    });
  }

  // Assign decorator
  await servicesBookingsCollection().updateOne(
    { _id: new ObjectId(bookingId) },
    {
      $set: {
        decoratorId: new ObjectId(decoratorId),
        decoratorAssigned: true,
        dec_status: "assigned",
      },
    }
  );

  // Mark decorator unavailable
  await decoratorsCollection().updateOne(
    { _id: new ObjectId(decoratorId) },
    { $set: { isAvailable: false } }
  );

  res.send({ success: true });
};
