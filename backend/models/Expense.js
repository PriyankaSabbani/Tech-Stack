const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  amount: Number,
  date: String,
  vendor: String,
  bill: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);