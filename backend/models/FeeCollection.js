const mongoose = require('mongoose');

const feeCollectionSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  dept: String,
  semester: String,
  feeType: String,
  total: Number,
  paid: Number,
  date: String,
  mode: String,
  pending: Number,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('FeeCollection', feeCollectionSchema);