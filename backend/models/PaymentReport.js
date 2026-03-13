const mongoose = require('mongoose');

const monthlyDataSchema = new mongoose.Schema({
  month: String,
  collected: Number,
  count: Number,
  pending: Number
}, { _id: false });

const deptDataSchema = new mongoose.Schema({
  dept: String,
  total: Number,
  paid: Number,
  pending: Number,
  students: Number
}, { _id: false });

const pendingStudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  dept: String,
  pending: Number,
  daysOverdue: Number
}, { _id: false });

const paymentReportSchema = new mongoose.Schema({
  monthlyData: [monthlyDataSchema],
  deptData: [deptDataSchema],
  pendingStudents: [pendingStudentSchema]
}, { timestamps: true });

module.exports = mongoose.model('PaymentReport', paymentReportSchema);