const mongoose = require('mongoose');

const scholarshipStudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  cgpa: Number,
  scholarship: String,
  amount: Number,
  status: String,
  date: String
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipStudent', scholarshipStudentSchema);