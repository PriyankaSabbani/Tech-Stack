const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  id: Number,
  course: String,
  dept: String,
  semester: String,
  tuition: Number,
  library: Number,
  lab: Number,
  exam: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('FeeStructure', feeStructureSchema);