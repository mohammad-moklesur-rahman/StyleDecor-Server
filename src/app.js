import express from "express";
import cors from "cors";
import { connectDB } from "./config/StyleDecor.config.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes

app.get("/", (req, res) => res.send("Welcome to backend server!"));

export default app;