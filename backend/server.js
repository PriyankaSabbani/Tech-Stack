const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/transport", require("./routes/transportRoutes"));

app.get("/", (req, res) => {
  res.send("Student Dashboard API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
