const mongoose = require('mongoose');

const ledgerTransactionSchema = new mongoose.Schema({
  studentId: { type: String, ref: 'LedgerStudent', required: true },
  date: String,
  desc: String,
  type: String,
  debit: Number,
  credit: Number,
  mode: String,
  ref: String
}, { timestamps: true });

module.exports = mongoose.model('LedgerTransaction', ledgerTransactionSchema);