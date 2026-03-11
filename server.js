const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load data from db.json
const dbPath = path.join(__dirname, 'src', 'db.json');
let db;

try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (err) {
    console.error('Error loading db.json:', err);
    db = {};
}

// Dashboard APIs
app.get('/api/dashboard', (req, res) => {
    res.json(db.dashboard);
});

app.get('/api/dashboard/recent-payments', (req, res) => {
    res.json(db.dashboard.recentPayments);
});

app.get('/api/dashboard/monthly-data', (req, res) => {
    res.json(db.dashboard.monthlyData);
});

app.get('/api/dashboard/stats', (req, res) => {
    res.json(db.dashboard.stats);
});

// Fee Collection APIs
app.get('/api/fee-collection', (req, res) => {
    res.json(db.feeCollection.fees);
});

app.post('/api/fee-collection', (req, res) => {
    const newFee = { ...req.body, id: Date.now().toString() };
    db.feeCollection.fees.unshift(newFee);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.feeCollection.fees);
});

// Fee Structure APIs
app.get('/api/fee-structure', (req, res) => {
    res.json(db.feeStructure.structures);
});

app.post('/api/fee-structure', (req, res) => {
    const newStructure = { ...req.body, id: Date.now() };
    db.feeStructure.structures.push(newStructure);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.feeStructure.structures);
});

app.put('/api/fee-structure/:id', (req, res) => {
    const { id } = req.params;
    const index = db.feeStructure.structures.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        db.feeStructure.structures[index] = { ...db.feeStructure.structures[index], ...req.body };
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    }
    res.json(db.feeStructure.structures);
});

app.delete('/api/fee-structure/:id', (req, res) => {
    const { id } = req.params;
    db.feeStructure.structures = db.feeStructure.structures.filter(s => s.id !== parseInt(id));
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.feeStructure.structures);
});

// Payment Reports APIs
app.get('/api/payment-reports', (req, res) => {
    res.json({
        monthlyData: db.paymentReports.monthlyData,
        deptData: db.paymentReports.deptData,
        pendingStudents: db.paymentReports.pendingStudents
    });
});

// Expenses APIs
app.get('/api/expenses', (req, res) => {
    res.json(db.expenses.expenses);
});

app.get('/api/expenses/categories', (req, res) => {
    res.json(db.expenses.categories);
});

app.post('/api/expenses', (req, res) => {
    const newExpense = { ...req.body, id: Date.now(), status: 'Pending' };
    db.expenses.expenses.unshift(newExpense);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.expenses.expenses);
});

// Salary APIs
app.get('/api/salary', (req, res) => {
    res.json(db.salary.staff);
});

app.post('/api/salary', (req, res) => {
    const newStaff = { ...req.body, id: Date.now().toString(), status: 'Pending' };
    db.salary.staff.unshift(newStaff);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.salary.staff);
});

// Transport APIs
app.get('/api/transport/routes', (req, res) => {
    res.json(db.transport.routes);
});

app.get('/api/transport/registrations', (req, res) => {
    res.json(db.transport.registrations);
});

app.post('/api/transport/registrations', (req, res) => {
    db.transport.registrations.unshift(req.body);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.transport.registrations);
});

// Scholarships APIs
app.get('/api/scholarships/schemes', (req, res) => {
    res.json(db.scholarships.schemes);
});

app.get('/api/scholarships/students', (req, res) => {
    res.json(db.scholarships.students);
});

// Receipt APIs
app.get('/api/receipts', (req, res) => {
    res.json(db.receipt.receipts);
});

app.post('/api/receipts', (req, res) => {
    db.receipt.receipts.unshift(req.body);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.receipt.receipts);
});

// Student Ledger APIs
app.get('/api/ledger/students', (req, res) => {
    res.json(db.ledger.students);
});

app.get('/api/ledger/transactions/:studentId', (req, res) => {
    const { studentId } = req.params;
    res.json(db.ledger.transactions[studentId] || []);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
