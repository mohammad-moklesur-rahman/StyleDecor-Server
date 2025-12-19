import { ObjectId } from "mongodb";
import { decoratorsCollection } from "../models/DecoratorsModel.js";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";

// Get My Assigned Projects
export const getMyAssignedProjects = async (req, res) => {
  try {
    const projects = await servicesBookingsCollection()
      .find({
        decoratorAssigned: true,
      })
      .toArray();

    res.send(projects);
  } catch (error) {
    res.status(500).send({
      message: "Failed to load assigned projects",
    });
  }
};

// Get Today Schedule
export const getTodaySchedule = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayJobs = await servicesBookingsCollection()
      .find({
        decoratorAssigned: true,
        assigned_date: today,
      })
      .toArray();

    res.send(todayJobs);
  } catch {
    res.status(500).send({ message: "Failed to load schedule" });
  }
};

// Get all available decorators
export const getAvailableDecorators = async (req, res) => {
  const decorators = await decoratorsCollection()
    .find({ isAvailable: true })
    .toArray();

  res.send(decorators);
};

// Get All Decorators
export const getAllDecorators = async (req, res) => {
  const decorators = await decoratorsCollection()
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  res.send(decorators);
};

// Approve decorator
export const approveDecorator = async (req, res) => {
  const { decoratorId } = req.params;

  await decoratorsCollection().updateOne(
    { _id: new ObjectId(decoratorId) },
    {
      $set: {
        status: "approved",
        isAvailable: true,
      },
    }
  );

  res.send({ success: true });
};

// Disable Decorator
export const disableDecorator = async (req, res) => {
  const { decoratorId } = req.params;

  await decoratorsCollection().updateOne(
    { _id: new ObjectId(decoratorId) },
    {
      $set: {
        status: "disabled",
        isAvailable: false,
      },
    }
  );

  res.send({ success: true });
};

// Assign a decorator to a booking
export const assignDecorator = async (req, res) => {
  const { bookingId, decoratorId } = req.body;
  const today = new Date().toISOString().split("T")[0];

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
        assigned_date: today,
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
