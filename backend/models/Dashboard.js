const mongoose = require('mongoose');

const recentPaymentSchema = new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  amount: String,
  mode: String,
  date: String,
  status: String
}, { _id: false });

const monthlyDataSchema = new mongoose.Schema({
  month: String,
  fees: Number,
  expenses: Number
}, { _id: false });

const dashboardSchema = new mongoose.Schema({
  recentPayments: [recentPaymentSchema],
  monthlyData: [monthlyDataSchema],
  stats: {
    totalFeesCollected: Number,
    pendingFees: Number,
    totalExpenses: Number,
    netBalance: Number,
    staffSalaryPaid: Number,
    scholarshipsGiven: Number,
    totalStudents: Number,
    feesCollectedToday: Number,
    pendingInvoices: Number,
    activeScholarships: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);