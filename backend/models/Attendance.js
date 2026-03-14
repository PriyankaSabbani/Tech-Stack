const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  course: String,
  percentage: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema);
