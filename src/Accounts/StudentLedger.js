import React, { useState } from 'react';

const students = [
  { id: 'STU001', name: 'Arjun Sharma', course: 'B.Tech CSE', dept: 'Engineering', semester: 'Sem 3', totalFee: 153000, paid: 153000, pending: 0 },
  { id: 'STU002', name: 'Priya Nair', course: 'MBA Finance', dept: 'Management', semester: 'Sem 2', totalFee: 130000, paid: 78000, pending: 52000 },
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Com', dept: 'Commerce', semester: 'Sem 3', totalFee: 82500, paid: 82500, pending: 0 },
  { id: 'STU004', name: 'Sneha Patel', course: 'B.Tech ECE', dept: 'Engineering', semester: 'Sem 1', totalFee: 51500, paid: 0, pending: 51500 },
  { id: 'STU005', name: 'Kiran Reddy', course: 'MCA', dept: 'Computer Sci', semester: 'Sem 2', totalFee: 85000, paid: 85000, pending: 0 },
];

const transactions = {
  STU001: [
    { date: '2024-08-10', desc: 'Tuition Fee - Sem 1', type: 'Fee', debit: 51500, credit: 0, mode: 'UPI', ref: 'RCP-2024-1001' },
    { date: '2024-08-10', desc: 'Payment Received', type: 'Payment', debit: 0, credit: 51500, mode: 'UPI', ref: 'TXN-UPI-4521' },
    { date: '2025-01-08', desc: 'Tuition Fee - Sem 2', type: 'Fee', debit: 51500, credit: 0, mode: '-', ref: 'RCP-2025-1045' },
    { date: '2025-01-08', desc: 'Payment Received', type: 'Payment', debit: 0, credit: 51500, mode: 'Card', ref: 'TXN-CARD-7892' },
    { date: '2025-03-01', desc: 'Tuition Fee - Sem 3', type: 'Fee', debit: 51500, credit: 0, mode: '-', ref: 'RCP-2025-3210' },
    { date: '2025-03-01', desc: 'Payment Received', type: 'Payment', debit: 0, credit: 51500, mode: 'UPI', ref: 'TXN-UPI-9031' },
  ],
  STU002: [
    { date: '2024-08-15', desc: 'Tuition Fee - Sem 1', type: 'Fee', debit: 65000, credit: 0, mode: '-', ref: 'RCP-2024-1102' },
    { date: '2024-08-15', desc: 'Partial Payment', type: 'Payment', debit: 0, credit: 40000, mode: 'Card', ref: 'TXN-CARD-2210' },
    { date: '2025-02-10', desc: 'Tuition Fee - Sem 2', type: 'Fee', debit: 65000, credit: 0, mode: '-', ref: 'RCP-2025-2088' },
    { date: '2025-03-10', desc: 'Partial Payment', type: 'Payment', debit: 0, credit: 38000, mode: 'Card', ref: 'TXN-CARD-5511' },
    { date: '2025-01-20', desc: 'Merit Scholarship Applied', type: 'Discount', debit: 0, credit: 0, mode: '-', ref: 'SCH-2025-001' },
  ],
};

export default function StudentLedger() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  const txns = selectedStudent ? (transactions[selectedStudent.id] || []) : [];
  let running = 0;
  const txnsWithBalance = txns.map(t => { running = running + t.debit - t.credit; return { ...t, balance: running }; });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>📒 Student Ledger</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Complete financial transaction history for each student</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Student List */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Select Student</h3>
          <input
            placeholder="🔍 Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '12px', fontFamily: "'Nunito', sans-serif" }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map(s => (
              <div key={s.id} onClick={() => setSelectedStudent(s)} style={{
                padding: '14px', borderRadius: '10px', cursor: 'pointer', border: '1.5px solid',
                borderColor: selectedStudent?.id === s.id ? '#3b82f6' : '#e2e8f0',
                background: selectedStudent?.id === s.id ? '#eff6ff' : '#fafbff',
                transition: 'all 0.15s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, marginTop: '2px' }}>{s.id}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>{s.course} · {s.semester}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: s.pending > 0 ? '#dc2626' : '#059669' }}>
                      {s.pending > 0 ? `-₹${s.pending.toLocaleString('en-IN')}` : '✅ Clear'}
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Balance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger */}
        <div>
          {selectedStudent ? (
            <div>
              {/* Student Card */}
              <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', borderRadius: '16px', padding: '22px', marginBottom: '16px', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>{selectedStudent.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{selectedStudent.id} · {selectedStudent.course} · {selectedStudent.dept}</div>
                    <div style={{ color: '#60a5fa', fontSize: '12px', marginTop: '4px' }}>Current: {selectedStudent.semester}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {[['Total Fee', `₹${selectedStudent.totalFee.toLocaleString('en-IN')}`, '#60a5fa'], ['Paid', `₹${selectedStudent.paid.toLocaleString('en-IN')}`, '#34d399'], ['Pending', `₹${selectedStudent.pending.toLocaleString('en-IN')}`, selectedStudent.pending > 0 ? '#f87171' : '#34d399']].map(([l, v, c]) => (
                      <div key={l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: c }}>{v}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Progress */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Payment Progress</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>{Math.round(selectedStudent.paid / selectedStudent.totalFee * 100)}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <div style={{ height: '100%', width: `${Math.round(selectedStudent.paid / selectedStudent.totalFee * 100)}%`, background: 'linear-gradient(90deg, #34d399, #10b981)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Transaction History</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Date', 'Description', 'Type', 'Debit (₹)', 'Credit (₹)', 'Balance (₹)', 'Mode', 'Ref No.'].map(h => (
                          <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {txnsWithBalance.map((t, i) => (
                        <tr key={i} style={{ borderTop: '1px solid #f1f5f9', background: t.type === 'Discount' ? '#faf5ff' : '' }}>
                          <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{t.date}</td>
                          <td style={{ padding: '12px 14px', fontSize: '13px', color: '#1e293b', fontWeight: 600 }}>{t.desc}</td>
                          <td style={{ padding: '12px 14px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, background: t.type === 'Fee' ? '#fef2f2' : t.type === 'Payment' ? '#f0fdf4' : '#faf5ff', color: t.type === 'Fee' ? '#dc2626' : t.type === 'Payment' ? '#059669' : '#7c3aed' }}>{t.type}</span>
                          </td>
                          <td style={{ padding: '12px 14px', fontWeight: 700, color: t.debit > 0 ? '#dc2626' : '#94a3b8', fontSize: '13px' }}>{t.debit > 0 ? t.debit.toLocaleString('en-IN') : '—'}</td>
                          <td style={{ padding: '12px 14px', fontWeight: 700, color: t.credit > 0 ? '#059669' : '#94a3b8', fontSize: '13px' }}>{t.credit > 0 ? t.credit.toLocaleString('en-IN') : '—'}</td>
                          <td style={{ padding: '12px 14px', fontWeight: 800, color: t.balance > 0 ? '#dc2626' : '#059669', fontSize: '13px' }}>{t.balance.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '12px 14px', fontSize: '12px', color: '#475569' }}>{t.mode}</td>
                          <td style={{ padding: '12px 14px', fontSize: '11px', color: '#3b82f6', fontFamily: 'monospace' }}>{t.ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📒</div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#64748b' }}>Select a student to view their ledger</div>
              <div style={{ fontSize: '13px', marginTop: '8px' }}>Click on any student from the list on the left</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
