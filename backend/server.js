import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import busRoutes from "./routes/busRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend server running ");
});

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/students", studentRoutes);

// Port (safe fallback)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});