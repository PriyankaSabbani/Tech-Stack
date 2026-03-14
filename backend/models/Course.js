const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: String,
  instructor: String,
  credits: Number
});

module.exports = mongoose.model("Course", courseSchema);
