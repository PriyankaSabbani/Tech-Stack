const mongoose = require('mongoose');

const scholarshipSchemeSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  amount: Number,
  criteria: String,
  beneficiaries: Number,
  budget: Number
});

module.exports = mongoose.model('ScholarshipScheme', scholarshipSchemeSchema);