const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  marks: Number,
  grade: String
});

module.exports = mongoose.model("Result", resultSchema);
