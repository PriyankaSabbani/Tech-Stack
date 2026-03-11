import React, { useState } from 'react';

const card = (icon, label, value, sub, color1, color2) => (
  <div style={{ background: `linear-gradient(135deg, ${color1}, ${color2})`, borderRadius: '16px', padding: '24px', color: '#fff', flex: '1 1 200px', minWidth: '180px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.15 }}>{icon}</div>
    <div style={{ fontSize: '28px', marginBottom: '6px' }}>{icon}</div>
    <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>{value}</div>
    <div style={{ fontSize: '13px', fontWeight: 700, opacity: 0.9, marginTop: '4px' }}>{label}</div>
    <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '4px' }}>{sub}</div>
  </div>
);

const recentPayments = [
  { id: 'STU001', name: 'Arjun Sharma', course: 'B.Tech CSE', amount: '₹45,000', mode: 'UPI', date: '10 Mar 2025', status: 'Paid' },
  { id: 'STU002', name: 'Priya Nair', course: 'MBA Finance', amount: '₹38,000', mode: 'Card', date: '10 Mar 2025', status: 'Paid' },
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Com', amount: '₹22,000', mode: 'Cash', date: '09 Mar 2025', status: 'Paid' },
  { id: 'STU004', name: 'Sneha Patel', course: 'B.Tech ECE', amount: '₹45,000', mode: 'UPI', date: '09 Mar 2025', status: 'Pending' },
  { id: 'STU005', name: 'Kiran Reddy', course: 'MCA', amount: '₹30,000', mode: 'Card', date: '08 Mar 2025', status: 'Paid' },
];

const monthlyData = [
  { month: 'Oct', fees: 18, expenses: 8 },
  { month: 'Nov', fees: 22, expenses: 10 },
  { month: 'Dec', fees: 15, expenses: 12 },
  { month: 'Jan', fees: 35, expenses: 9 },
  { month: 'Feb', fees: 28, expenses: 11 },
  { month: 'Mar', fees: 25, expenses: 7 },
];

export default function Dashboard() {
  const maxVal = 40;
  return (
    <div>
      {/* Summary Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        {card('💰', 'Total Fees Collected', '₹25,00,000', '↑ 12% vs last month', '#1d4ed8', '#3b82f6')}
        {card('⏳', 'Pending Fees', '₹5,00,000', '48 students pending', '#dc2626', '#f87171')}
        {card('💸', 'Total Expenses', '₹12,00,000', 'This academic year', '#d97706', '#f59e0b')}
        {card('📈', 'Net Balance', '₹13,00,000', 'After all deductions', '#059669', '#34d399')}
        {card('👔', 'Staff Salary Paid', '₹8,50,000', 'Feb 2025 Payroll', '#7c3aed', '#a78bfa')}
        {card('🎓', 'Scholarships Given', '₹1,20,000', '15 students benefited', '#0891b2', '#22d3ee')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Bar Chart */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>📊 Monthly Revenue vs Expenses (₹ Lakhs)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', height: '180px', paddingBottom: '30px', position: 'relative', borderBottom: '2px solid #e2e8f0' }}>
            {monthlyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '100%', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '150px' }}>
                  <div style={{ flex: 1, background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '4px 4px 0 0', height: `${(d.fees / maxVal) * 150}px`, transition: 'height 0.5s' }} title={`Fees: ₹${d.fees}L`}></div>
                  <div style={{ flex: 1, background: 'linear-gradient(180deg, #f87171, #dc2626)', borderRadius: '4px 4px 0 0', height: `${(d.expenses / maxVal) * 150}px`, transition: 'height 0.5s' }} title={`Exp: ₹${d.expenses}L`}></div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '6px' }}>{d.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3b82f6', display: 'inline-block' }}></span>Fee Collection</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#dc2626', display: 'inline-block' }}></span>Expenses</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>🥧 Fee Collection by Department</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="55" fill="none" stroke="#3b82f6" strokeWidth="28" strokeDasharray="138 207" strokeDashoffset="0" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#10b981" strokeWidth="28" strokeDasharray="82 207" strokeDashoffset="-138" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#f59e0b" strokeWidth="28" strokeDasharray="62 207" strokeDashoffset="-220" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#8b5cf6" strokeWidth="28" strokeDasharray="45 207" strokeDashoffset="-282" />
              <text x="75" y="78" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">₹25L</text>
              <text x="75" y="92" textAnchor="middle" fontSize="9" fill="#64748b">Total</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {[['B.Tech', '₹10.2L', '#3b82f6', '40%'], ['MBA', '₹6.5L', '#10b981', '26%'], ['B.Com', '₹5.1L', '#f59e0b', '20%'], ['MCA', '₹3.2L', '#8b5cf6', '14%']].map(([dept, amt, color, pct]) => (
                <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: color, flexShrink: 0 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>{dept}</span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color }}>{pct}</span>
                    </div>
                    <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '3px' }}>
                      <div style={{ height: '100%', width: pct, background: color, borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{amt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>🕐 Recent Transactions</h3>
          <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 700, cursor: 'pointer' }}>View All →</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student ID', 'Name', 'Course', 'Amount', 'Mode', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#3b82f6', fontWeight: 700 }}>{r.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{r.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{r.course}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 800, color: '#059669' }}>{r.amount}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: r.mode === 'UPI' ? '#eff6ff' : r.mode === 'Card' ? '#f0fdf4' : '#fefce8', color: r.mode === 'UPI' ? '#1d4ed8' : r.mode === 'Card' ? '#059669' : '#d97706' }}>{r.mode}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{r.date}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: r.status === 'Paid' ? '#dcfce7' : '#fef2f2', color: r.status === 'Paid' ? '#16a34a' : '#dc2626' }}>● {r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
        {[
          { label: 'Total Students', value: '2,450', icon: '👨‍🎓', color: '#eff6ff', text: '#1d4ed8' },
          { label: 'Fees Collected Today', value: '₹1,24,000', icon: '📅', color: '#f0fdf4', text: '#059669' },
          { label: 'Pending Invoices', value: '48', icon: '📌', color: '#fef2f2', text: '#dc2626' },
          { label: 'Active Scholarships', value: '15', icon: '🏅', color: '#faf5ff', text: '#7c3aed' },
        ].map((s, i) => (
          <div key={i} style={{ background: s.color, borderRadius: '12px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '28px' }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: s.text }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
