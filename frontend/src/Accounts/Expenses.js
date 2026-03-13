import React, { useState, useEffect } from 'react';
import { getExpensesData, getExpenseCategories, addExpense } from '../data/db';

const catColors = { Electricity: '#f59e0b', Maintenance: '#ef4444', 'Staff Salary': '#8b5cf6', 'Lab Equipment': '#3b82f6', 'Library Books': '#06b6d4', Canteen: '#f97316', Security: '#64748b', Printing: '#6366f1', Events: '#ec4899', Transport: '#10b981' };

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ title: '', category: 'Electricity', amount: '', date: '', vendor: '', bill: '' });

  useEffect(() => {
    const fetchData = async () => {
      const expensesData = await getExpensesData();
      const categoriesData = await getExpenseCategories();
      setExpenses(expensesData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const filtered = expenses.filter(e => filter === 'All' || e.category === filter);
  const totalExpense = expenses.reduce((a, e) => a + e.amount, 0);

  const handleSave = async () => {
    const updated = await addExpense({ ...form, amount: parseInt(form.amount) || 0 });
    setExpenses(updated);
    setShowForm(false);
    setForm({ title: '', category: 'Electricity', amount: '', date: '', vendor: '', bill: '' });
  };

  const byCat = categories.map(c => ({ cat: c, total: expenses.filter(e => e.category === c).reduce((a, e) => a + e.amount, 0) })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>💸 Expense Management</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Track and manage all college expenditures</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '11px 22px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
          + Add Expense
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          ['Total Expenses', `₹${(totalExpense / 100000).toFixed(2)}L`, '#fff7ed', '#ea580c'],
          ['This Month', '₹3.78L', '#fef2f2', '#dc2626'],
          ['Approved', expenses.filter(e => e.status === 'Approved').length, '#f0fdf4', '#059669'],
          ['Pending Approval', expenses.filter(e => e.status === 'Pending').length, '#fef9c3', '#ca8a04'],
        ].map(([l, v, bg, c]) => (
          <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>📊 Expense by Category</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {byCat.map(({ cat, total }) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', borderLeft: `4px solid ${catColors[cat] || '#64748b'}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{cat}</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: catColors[cat] || '#64748b', marginTop: '2px' }}>₹{total.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{Math.round(total / totalExpense * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #f59e0b' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>➕ Add New Expense</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1' }}><Label>Expense Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Monthly Electricity Bill" /></div>
            <div><Label>Category</Label>
              <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </Select>
            </div>
            <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0" /></div>
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div><Label>Vendor Name</Label><Input value={form.vendor} onChange={e => setForm({ ...form, vendor: e.target.value })} placeholder="Vendor / Supplier" /></div>
            <div><Label>Bill / Invoice No.</Label><Input value={form.bill} onChange={e => setForm({ ...form, bill: e.target.value })} placeholder="e.g. INV-2025-01" /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleSave} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Save Expense</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>All Expenses ({filtered.length})</h3>
          <Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '180px' }}>
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Title', 'Category', 'Amount', 'Date', 'Vendor', 'Bill No.', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={e.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '13px 16px', fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>{e.title}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: `${catColors[e.category]}22`, color: catColors[e.category] || '#64748b' }}>{e.category}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontWeight: 800, color: '#ea580c', fontSize: '14px' }}>₹{e.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: '12px' }}>{e.date}</td>
                  <td style={{ padding: '13px 16px', color: '#475569', fontSize: '13px' }}>{e.vendor}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: '12px', fontFamily: 'monospace' }}>{e.bill}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: e.status === 'Approved' ? '#dcfce7' : '#fef9c3', color: e.status === 'Approved' ? '#16a34a' : '#ca8a04' }}>● {e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
