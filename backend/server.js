require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Import models
const Dashboard = require('./models/Dashboard');
const FeeCollection = require('./models/FeeCollection');
const FeeStructure = require('./models/FeeStructure');
const PaymentReport = require('./models/PaymentReport');
const Expense = require('./models/Expense');
const ExpenseCategory = require('./models/ExpenseCategory');
const Salary = require('./models/Salary');
const TransportRoute = require('./models/TransportRoute');
const TransportRegistration = require('./models/TransportRegistration');
const ScholarshipScheme = require('./models/ScholarshipScheme');
const ScholarshipStudent = require('./models/ScholarshipStudent');
const Receipt = require('./models/Receipt');
const LedgerStudent = require('./models/LedgerStudent');
const LedgerTransaction = require('./models/LedgerTransaction');

const app = express();
const PORT = process.env.PORT || 10000; //optimised for render


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Locally'))
  .catch(err => console.error('MongoDB connection error:', err));

// ------------------- Dashboard APIs -------------------
app.get('/api/dashboard', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard/recent-payments', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    res.json(dashboard.recentPayments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard/monthly-data', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    res.json(dashboard.monthlyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    res.json(dashboard.stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Fee Collection APIs -------------------
app.get('/api/fee-collection', async (req, res) => {
  try {
    const fees = await FeeCollection.find().sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fee-collection', async (req, res) => {
  try {
    const newFee = new FeeCollection({
      ...req.body,
      id: Date.now().toString()
    });
    await newFee.save();
    const allFees = await FeeCollection.find().sort({ createdAt: -1 });
    res.json(allFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Fee Structure APIs -------------------
app.get('/api/fee-structure', async (req, res) => {
  try {
    const structures = await FeeStructure.find();
    res.json(structures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fee-structure', async (req, res) => {
  try {
    const maxIdDoc = await FeeStructure.findOne().sort({ id: -1 }).limit(1);
    const newId = maxIdDoc ? maxIdDoc.id + 1 : 1;
    const newStructure = new FeeStructure({ ...req.body, id: newId });
    await newStructure.save();
    const allStructures = await FeeStructure.find();
    res.json(allStructures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/fee-structure/:id', async (req, res) => {
  try {
    await FeeStructure.findOneAndUpdate({ id: req.params.id }, req.body);
    const allStructures = await FeeStructure.find();
    res.json(allStructures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/fee-structure/:id', async (req, res) => {
  try {
    await FeeStructure.findOneAndDelete({ id: req.params.id });
    const allStructures = await FeeStructure.find();
    res.json(allStructures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Payment Reports APIs -------------------
app.get('/api/payment-reports', async (req, res) => {
  try {
    const report = await PaymentReport.findOne();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Expenses APIs -------------------
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/expenses/categories', async (req, res) => {
  try {
    const categories = await ExpenseCategory.find();
    res.json(categories.map(c => c.name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const maxIdDoc = await Expense.findOne().sort({ id: -1 }).limit(1);
    const newId = maxIdDoc ? maxIdDoc.id + 1 : 1;
    const newExpense = new Expense({
      ...req.body,
      id: newId,
      status: 'Pending'
    });
    await newExpense.save();
    const allExpenses = await Expense.find().sort({ createdAt: -1 });
    res.json(allExpenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Salary APIs -------------------
app.get('/api/salary', async (req, res) => {
  try {
    const staff = await Salary.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/salary', async (req, res) => {
  try {
    const newStaff = new Salary({
      ...req.body,
      id: Date.now().toString(),
      status: 'Pending'
    });
    await newStaff.save();
    const allStaff = await Salary.find().sort({ createdAt: -1 });
    res.json(allStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Transport APIs -------------------
app.get('/api/transport/routes', async (req, res) => {
  try {
    const routes = await TransportRoute.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/transport/registrations', async (req, res) => {
  try {
    const registrations = await TransportRegistration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transport/registrations', async (req, res) => {
  try {
    const newReg = new TransportRegistration({
      ...req.body,
      id: req.body.id || Date.now().toString()
    });
    await newReg.save();
    const allRegs = await TransportRegistration.find().sort({ createdAt: -1 });
    res.json(allRegs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Scholarships APIs -------------------
app.get('/api/scholarships/schemes', async (req, res) => {
  try {
    const schemes = await ScholarshipScheme.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/scholarships/students', async (req, res) => {
  try {
    const students = await ScholarshipStudent.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Receipt APIs -------------------
app.get('/api/receipts', async (req, res) => {
  try {
    const receipts = await Receipt.find().sort({ createdAt: -1 });
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/receipts', async (req, res) => {
  try {
    const newReceipt = new Receipt(req.body);
    await newReceipt.save();
    const allReceipts = await Receipt.find().sort({ createdAt: -1 });
    res.json(allReceipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Student Ledger APIs -------------------
app.get('/api/ledger/students', async (req, res) => {
  try {
    const students = await LedgerStudent.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ledger/transactions/:studentId', async (req, res) => {
  try {
    const transactions = await LedgerTransaction.find({ studentId: req.params.studentId }).sort({ date: 1 });
    // Remove studentId field to match original format
    const txns = transactions.map(t => ({
      date: t.date,
      desc: t.desc,
      type: t.type,
      debit: t.debit,
      credit: t.credit,
      mode: t.mode,
      ref: t.ref
    }));
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});