const API_BASE = 'https://admin-panel-erp.onrender.com/api';

// Dashboard data
export const getDashboardData = async () => {
    const response = await fetch(`${API_BASE}/dashboard`);
    return response.json();
};

export const getRecentPayments = async () => {
    const response = await fetch(`${API_BASE}/dashboard/recent-payments`);
    return response.json();
};

export const getMonthlyData = async () => {
    const response = await fetch(`${API_BASE}/dashboard/monthly-data`);
    return response.json();
};

export const getDashboardStats = async () => {
    const response = await fetch(`${API_BASE}/dashboard/stats`);
    return response.json();
};

// Fee Collection data
export const getFeeCollectionData = async () => {
    const response = await fetch(`${API_BASE}/fee-collection`);
    return response.json();
};

export const addFeeRecord = async (fee) => {
    const response = await fetch(`${API_BASE}/fee-collection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fee)
    });
    return response.json();
};

// Fee Structure data
export const getFeeStructureData = async () => {
    const response = await fetch(`${API_BASE}/fee-structure`);
    return response.json();
};

export const addFeeStructure = async (structure) => {
    const response = await fetch(`${API_BASE}/fee-structure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(structure)
    });
    return response.json();
};

export const updateFeeStructure = async (id, data) => {
    const response = await fetch(`${API_BASE}/fee-structure/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteFeeStructure = async (id) => {
    const response = await fetch(`${API_BASE}/fee-structure/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};

// Payment Reports data
export const getPaymentReportsData = async () => {
    const response = await fetch(`${API_BASE}/payment-reports`);
    return response.json();
};

// Expenses data
export const getExpensesData = async () => {
    const response = await fetch(`${API_BASE}/expenses`);
    return response.json();
};

export const getExpenseCategories = async () => {
    const response = await fetch(`${API_BASE}/expenses/categories`);
    return response.json();
};

export const addExpense = async (expense) => {
    const response = await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    });
    return response.json();
};

// Salary data
export const getSalaryData = async () => {
    const response = await fetch(`${API_BASE}/salary`);
    return response.json();
};

export const addStaffSalary = async (staffMember) => {
    const response = await fetch(`${API_BASE}/salary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffMember)
    });
    return response.json();
};

// Transport data
export const getTransportRoutes = async () => {
    const response = await fetch(`${API_BASE}/transport/routes`);
    return response.json();
};

export const getTransportRegistrations = async () => {
    const response = await fetch(`${API_BASE}/transport/registrations`);
    return response.json();
};

export const addTransportRegistration = async (registration) => {
    const response = await fetch(`${API_BASE}/transport/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registration)
    });
    return response.json();
};

// Scholarships data
export const getScholarshipSchemes = async () => {
    const response = await fetch(`${API_BASE}/scholarships/schemes`);
    return response.json();
};

export const getScholarshipStudents = async () => {
    const response = await fetch(`${API_BASE}/scholarships/students`);
    return response.json();
};

// Receipt data
export const getReceipts = async () => {
    const response = await fetch(`${API_BASE}/receipts`);
    return response.json();
};

export const addReceipt = async (receipt) => {
    const response = await fetch(`${API_BASE}/receipts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receipt)
    });
    return response.json();
};

// Student Ledger data
export const getLedgerStudents = async () => {
    const response = await fetch(`${API_BASE}/ledger/students`);
    return response.json();
};

export const getStudentTransactions = async (studentId) => {
    const response = await fetch(`${API_BASE}/ledger/transactions/${studentId}`);
    return response.json();
};

