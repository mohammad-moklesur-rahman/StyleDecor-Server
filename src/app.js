import express from "express";
import cors from "cors";
import { connectDB } from "./config/StyleDecor.config.js";
import StyleDecorRoute from "./routes/StyleDecorRoute.js";
import ServiceBookingsRoute from "./routes/ServiceBookingsRoute.js";
import StripePaymentRoute from "./routes/StripePaymentRoute.js";
import UsersRoute from "./routes/UsersRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/services", StyleDecorRoute);
app.use("/api/bookings", ServiceBookingsRoute);
app.use("/api/stripe", StripePaymentRoute);
app.use("/api/users", UsersRoute);

app.get("/", (req, res) => res.send("Welcome to backend server!"));

export default app;
