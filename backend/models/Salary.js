const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  id: String,
  name: String,
  dept: String,
  role: String,
  basic: Number,
  hra: Number,
  da: Number,
  pf: Number,
  tax: Number,
  net: Number,
  month: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);