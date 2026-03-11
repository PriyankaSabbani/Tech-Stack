# 🏛️ EduFinance CMS — Accounts Dashboard

A **professional College Management System** Accounts Dashboard built with **React**.

---

## 📁 Project Structure

```
cms-accounts/
├── public/
│   └── index.html
├── src/
│   ├── App.js                    ← Main app with sidebar navigation
│   ├── index.js
│   └── Accounts/
│       ├── Dashboard.js          ← Financial analytics & overview
│       ├── FeeCollection.js      ← Record & manage student fee payments
│       ├── FeeStructure.js       ← Create/edit fee structures per course
│       ├── PaymentReports.js     ← Monthly, dept-wise, pending reports
│       ├── Expenses.js           ← College expense tracking
│       ├── SalaryManagement.js   ← Staff salary & salary slips
│       ├── TransportFees.js      ← Bus routes & transport fee management
│       ├── Scholarships.js       ← Scholarship schemes & student tracking
│       ├── Receipt.js            ← Fee receipt generator
│       └── StudentLedger.js      ← Full transaction history per student
└── package.json
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Steps

```bash
# 1. Navigate to project folder
cd cms-accounts

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

Open **http://localhost:3000** in your browser.

---

## ✨ Features

| Module | Features |
|--------|----------|
| 📊 Dashboard | KPI cards, revenue vs expense chart, dept-wise donut chart, recent transactions |
| 💰 Fee Collection | Record payments, filter by status, add new payments, running stats |
| 📋 Fee Structure | CRUD for course fee structures, auto-total calculation |
| 📈 Payment Reports | Monthly, department-wise, pending fee, daily collection tabs |
| 💸 Expenses | Add/categorize expenses, category breakdown, status tracking |
| 👔 Salary Management | Staff salary records, salary slip generator with modal |
| 🚌 Transport Fees | Bus routes management, student registrations |
| 🎓 Scholarships | Scholarship schemes, apply to students, tracking |
| 🧾 Receipt Generator | Generate official receipts with amount-in-words, download/email |
| 📒 Student Ledger | Full debit/credit ledger per student, payment progress |

---

## 🎨 Design

- **Color palette:** Navy blue + vibrant accents
- **Font:** Nunito (Google Fonts)
- **Layout:** Fixed sidebar with collapsible nav + sticky topbar
- **Style:** Professional, modern, card-based UI

---

## 🔧 Customization

- Replace `EduFinance College` with your college name in `App.js` and `Receipt.js`
- Add real API calls to replace the sample data arrays
- Add authentication layer to the App.js wrapper
- Integrate with a backend (Node.js/Django/Laravel) for persistent data
