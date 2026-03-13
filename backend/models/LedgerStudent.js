const mongoose = require('mongoose');

const ledgerStudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  dept: String,
  semester: String,
  totalFee: Number,
  paid: Number,
  pending: Number
});

module.exports = mongoose.model('LedgerStudent', ledgerStudentSchema);