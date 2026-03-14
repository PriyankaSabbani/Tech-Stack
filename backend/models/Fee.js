const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: String,
  totalFees: Number,
  paidFees: Number,
  pendingFees: Number
});

module.exports = mongoose.model("Fee", feeSchema);
