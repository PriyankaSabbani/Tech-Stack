const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  receiptNo: String,
  studentId: String,
  studentName: String,
  course: String,
  amount: Number,
  paymentDate: String,
  paymentMode: String,
  feeType: String
}, { timestamps: true });

module.exports = mongoose.model('Receipt', receiptSchema);