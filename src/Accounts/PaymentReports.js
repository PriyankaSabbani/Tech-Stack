import React, { useState } from 'react';

const monthlyData = [
  { month: 'October 2024', collected: 1820000, count: 210, pending: 380000 },
  { month: 'November 2024', collected: 2250000, count: 245, pending: 320000 },
  { month: 'December 2024', collected: 1540000, count: 180, pending: 420000 },
  { month: 'January 2025', collected: 3500000, count: 380, pending: 280000 },
  { month: 'February 2025', collected: 2850000, count: 310, pending: 310000 },
  { month: 'March 2025', collected: 2500000, count: 270, pending: 500000 },
];

const deptData = [
  { dept: 'Engineering', total: 5400000, paid: 4800000, pending: 600000, students: 520 },
  { dept: 'Management', total: 3200000, paid: 2900000, pending: 300000, students: 210 },
  { dept: 'Commerce', total: 1800000, paid: 1650000, pending: 150000, students: 340 },
  { dept: 'Computer Science', total: 2100000, paid: 1950000, pending: 150000, students: 280 },
  { dept: 'Science', total: 1200000, paid: 1100000, pending: 100000, students: 195 },
];

const pendingStudents = [
  { id: 'STU004', name: 'Sneha Patel', dept: 'Engineering', pending: 45000, daysOverdue: 15 },
  { id: 'STU009', name: 'Ravi Teja', dept: 'Management', pending: 25000, daysOverdue: 8 },
  { id: 'STU015', name: 'Anjali Singh', dept: 'Commerce', pending: 12000, daysOverdue: 22 },
  { id: 'STU021', name: 'Dev Malhotra', dept: 'Computer Science', pending: 35000, daysOverdue: 5 },
  { id: 'STU033', name: 'Nisha Iyer', dept: 'Engineering', pending: 50000, daysOverdue: 30 },
];

const tabs = ['Monthly Collection', 'Department-wise', 'Pending Fees', 'Daily Report'];

export default function PaymentReports() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>📈 Payment Reports</h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Comprehensive financial reports and analytics</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          ['Total Revenue', '₹1.46 Cr', '#eff6ff', '#1d4ed8'],
          ['Total Collected', '₹1.35 Cr', '#f0fdf4', '#059669'],
          ['Total Pending', '₹12.1 L', '#fef2f2', '#dc2626'],
          ['Collection Rate', '92.4%', '#faf5ff', '#7c3aed'],
          ['Avg/Student', '₹41,800', '#fff7ed', '#ea580c'],
        ].map(([l, v, bg, c]) => (
          <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '0', flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px',
              background: 'none', color: tab === i ? '#1d4ed8' : '#64748b',
              borderBottom: tab === i ? '2px solid #1d4ed8' : '2px solid transparent',
              marginBottom: '-2px', transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif"
            }}>{t}</button>
          ))}
        </div>

        {tab === 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>Monthly Fee Collection Report</h3>
              <button style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>⬇ Export CSV</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Month', 'Students Paid', 'Amount Collected', 'Pending Amount', 'Collection Rate', 'Progress'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((m, i) => {
                    const rate = Math.round(m.collected / (m.collected + m.pending) * 100);
                    return (
                      <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>{m.month}</td>
                        <td style={{ padding: '14px 16px', color: '#475569', fontSize: '13px' }}>{m.count}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 800, color: '#059669', fontSize: '13px' }}>₹{(m.collected / 100000).toFixed(2)}L</td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#dc2626', fontSize: '13px' }}>₹{(m.pending / 100000).toFixed(2)}L</td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: rate >= 90 ? '#059669' : '#d97706', fontSize: '13px' }}>{rate}%</td>
                        <td style={{ padding: '14px 16px', minWidth: '140px' }}>
                          <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px' }}>
                            <div style={{ height: '100%', width: `${rate}%`, background: `linear-gradient(90deg, #3b82f6, #06b6d4)`, borderRadius: '4px' }}></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>Department-wise Collection</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {deptData.map((d, i) => {
                const rate = Math.round(d.paid / d.total * 100);
                const colors = ['#3b82f6', '#059669', '#f59e0b', '#8b5cf6', '#06b6d4'];
                return (
                  <div key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{d.dept}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{d.students} students enrolled</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: colors[i] }}>{rate}%</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>collected</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      {[['Total', d.total, '#1e293b'], ['Paid', d.paid, '#059669'], ['Pending', d.pending, '#dc2626']].map(([l, v, c]) => (
                        <div key={l}>
                          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{l}</div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: c }}>₹{(v / 100000).toFixed(1)}L</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px' }}>
                      <div style={{ height: '100%', width: `${rate}%`, background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}88)`, borderRadius: '5px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>Pending Fee Report</h3>
              <button style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #dc2626, #f87171)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>📧 Send Reminders</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fef2f2' }}>
                  {['Student ID', 'Name', 'Department', 'Pending Amount', 'Days Overdue', 'Priority'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingStudents.map((s, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #fde8e8' }}>
                    <td style={{ padding: '14px 16px', color: '#dc2626', fontWeight: 700, fontSize: '13px' }}>{s.id}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>{s.name}</td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '13px' }}>{s.dept}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#dc2626', fontSize: '14px' }}>₹{s.pending.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 16px', color: s.daysOverdue > 20 ? '#dc2626' : s.daysOverdue > 10 ? '#d97706' : '#64748b', fontWeight: 700, fontSize: '13px' }}>{s.daysOverdue} days</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: s.daysOverdue > 20 ? '#fef2f2' : s.daysOverdue > 10 ? '#fef9c3' : '#f0fdf4', color: s.daysOverdue > 20 ? '#dc2626' : s.daysOverdue > 10 ? '#ca8a04' : '#059669' }}>
                        {s.daysOverdue > 20 ? '🔴 High' : s.daysOverdue > 10 ? '🟡 Medium' : '🟢 Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 3 && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>Daily Collection — March 10, 2025</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {[['Today\'s Collection', '₹1,24,000', '#f0fdf4', '#059669'], ['Transactions', '14', '#eff6ff', '#1d4ed8'], ['Avg Transaction', '₹8,857', '#faf5ff', '#7c3aed']].map(([l, v, bg, c]) => (
                <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {[['UPI Payments', '8 txns', '₹72,000', '#3b82f6'], ['Cash', '4 txns', '₹32,000', '#f59e0b'], ['Card', '2 txns', '₹20,000', '#8b5cf6']].map(([mode, txns, amt, c]) => (
                  <div key={mode} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', borderLeft: `4px solid ${c}` }}>
                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '14px' }}>{mode}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{txns}</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: c, marginTop: '8px' }}>{amt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
