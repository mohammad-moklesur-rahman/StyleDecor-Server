import { ObjectId } from "mongodb";
import { decoratorsCollection } from "../models/DecoratorsModel.js";
import { servicesBookingsCollection } from "../models/ServiceBookingsModel.js";

//  get a Decorator profile
export const getDecoratorProfile = async (req, res) => {
  const result = await decoratorsCollection().findOne({
    email: req.tokenEmail,
  });
  res.send(result);
};

// Get Decorator Earnings Summary
export const getDecoratorEarningsSummary = async (req, res) => {
  try {
    const userEmail = req.tokenEmail;

    // Find decorator by email
    const decorator = await decoratorsCollection().findOne({
      email: userEmail,
    });
    if (!decorator) {
      return res.status(404).send({ message: "Decorator not found" });
    }

    const decoratorId = decorator._id;

    // Fetch completed & paid projects
    const projects = await servicesBookingsCollection()
      .aggregate([
        {
          $match: {
            decoratorId: decoratorId,
            dec_status: "Completed",
            paid: true,
          },
        },
        {
          $project: {
            service_name: 1,
            cost: 1,
            booking_date: 1,
            commission: { $multiply: ["$cost", 0.1] },
          },
        },
      ])
      .toArray();

    const totalProjects = projects.length;
    const totalCommission = projects.reduce((sum, p) => sum + p.commission, 0);

    res.send({
      totalProjects,
      totalCommission,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to load decorator dashboard" });
  }
};

// Get My Assigned Projects
export const getMyAssignedProjects = async (req, res) => {
  try {
    const email = req.tokenEmail;
    const projects = await servicesBookingsCollection()
      .find({
        dec_email: email,
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
    const email = req.tokenEmail;
    const today = new Date().toISOString().split("T")[0];
    const todayJobs = await servicesBookingsCollection()
      .find({
        dec_email: email,
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

// Update Availability
export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const decorator = await decoratorsCollection().findOne({
      _id: new ObjectId(id),
    });

    // role + ownership check
    if (decorator.email !== req.tokenEmail) {
      return res.status(403).send({ message: "Forbidden" });
    }

    const result = await decoratorsCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isAvailable } },
      { returnDocument: "after" }
    );

    res.send(result.value);
  } catch (err) {
    res.status(500).send({ message: "Availability update failed" });
  }
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

  // Get decorator to find email
  const decorator = await decoratorsCollection().findOne({
    _id: new ObjectId(decoratorId),
  });

  if (!decorator) {
    return res.status(404).send({ message: "Decorator not found" });
  }

  // Assign decorator
  await servicesBookingsCollection().updateOne(
    { _id: new ObjectId(bookingId) },
    {
      $set: {
        dec_email: decorator.email,
        decoratorId: new ObjectId(decoratorId),
        decoratorAssigned: true,
        dec_status: "Assigned",
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

// Update Project Status
export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { dec_status } = req.body;

    await servicesBookingsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { dec_status } }
    );

    res.send({ message: "Status updated successfully" });
  } catch {
    res.status(500).send({ message: "Update failed" });
  }
};
