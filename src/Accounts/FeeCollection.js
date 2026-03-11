import React, { useState } from 'react';

const initialFees = [
  { id: 'STU001', name: 'Arjun Sharma', course: 'B.Tech CSE', dept: 'Engineering', semester: 'Sem 1', feeType: 'Tuition', total: 50000, paid: 50000, pending: 0, date: '2025-03-10', mode: 'UPI', status: 'Paid' },
  { id: 'STU002', name: 'Priya Nair', course: 'MBA Finance', dept: 'Management', semester: 'Sem 2', feeType: 'Tuition', total: 65000, paid: 40000, pending: 25000, date: '2025-03-10', mode: 'Card', status: 'Partial' },
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Com', dept: 'Commerce', semester: 'Sem 3', feeType: 'Tuition', total: 30000, paid: 30000, pending: 0, date: '2025-03-09', mode: 'Cash', status: 'Paid' },
  { id: 'STU004', name: 'Sneha Patel', course: 'B.Tech ECE', dept: 'Engineering', semester: 'Sem 1', feeType: 'Hostel', total: 45000, paid: 0, pending: 45000, date: '-', mode: '-', status: 'Pending' },
  { id: 'STU005', name: 'Kiran Reddy', course: 'MCA', dept: 'Computer Science', semester: 'Sem 2', feeType: 'Tuition', total: 40000, paid: 40000, pending: 0, date: '2025-03-08', mode: 'Card', status: 'Paid' },
  { id: 'STU006', name: 'Amit Kumar', course: 'B.Tech ME', dept: 'Engineering', semester: 'Sem 4', feeType: 'Transport', total: 12000, paid: 6000, pending: 6000, date: '2025-02-20', mode: 'UPI', status: 'Partial' },
];

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif", ...props.style }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

export default function FeeCollection() {
  const [fees, setFees] = useState(initialFees);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', course: '', dept: '', semester: 'Sem 1', feeType: 'Tuition', total: '', paid: '', date: '', mode: 'UPI' });

  const filtered = fees.filter(f =>
    (filterStatus === 'All' || f.status === filterStatus) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = () => {
    const total = parseInt(form.total) || 0;
    const paid = parseInt(form.paid) || 0;
    const pending = total - paid;
    const status = pending === 0 ? 'Paid' : paid === 0 ? 'Pending' : 'Partial';
    setFees([{ ...form, total, paid, pending, status }, ...fees]);
    setShowForm(false);
    setForm({ id: '', name: '', course: '', dept: '', semester: 'Sem 1', feeType: 'Tuition', total: '', paid: '', date: '', mode: 'UPI' });
  };

  const statusColor = (s) => s === 'Paid' ? { bg: '#dcfce7', text: '#16a34a' } : s === 'Pending' ? { bg: '#fef2f2', text: '#dc2626' } : { bg: '#fef9c3', text: '#ca8a04' };

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[['Total Fees Due', `₹${fees.reduce((a, f) => a + f.total, 0).toLocaleString('en-IN')}`, '#eff6ff', '#1d4ed8'],
          ['Total Collected', `₹${fees.reduce((a, f) => a + f.paid, 0).toLocaleString('en-IN')}`, '#f0fdf4', '#059669'],
          ['Total Pending', `₹${fees.reduce((a, f) => a + f.pending, 0).toLocaleString('en-IN')}`, '#fef2f2', '#dc2626'],
          ['Paid Students', fees.filter(f => f.status === 'Paid').length, '#f5f3ff', '#7c3aed'],
        ].map(([label, val, bg, color]) => (
          <div key={label} style={{ flex: '1 1 160px', background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color }}>{val}</div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Input placeholder="🔍 Search by student name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: '1 1 220px' }} />
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ flex: '0 0 150px' }}>
            <option>All</option><option>Paid</option><option>Pending</option><option>Partial</option>
          </Select>
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Nunito', sans-serif" }}>
            + Record Payment
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>📝 Record New Fee Payment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[['Student ID', 'id'], ['Student Name', 'name'], ['Course', 'course'], ['Department', 'dept']].map(([l, k]) => (
              <div key={k}><Label>{l}</Label><Input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={l} /></div>
            ))}
            <div><Label>Semester</Label>
              <Select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}>
                {['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'].map(s => <option key={s}>{s}</option>)}
              </Select>
            </div>
            <div><Label>Fee Type</Label>
              <Select value={form.feeType} onChange={e => setForm({ ...form, feeType: e.target.value })}>
                {['Tuition','Hostel','Transport','Library','Lab','Exam'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </div>
            <div><Label>Total Fee (₹)</Label><Input type="number" value={form.total} onChange={e => setForm({ ...form, total: e.target.value })} placeholder="0" /></div>
            <div><Label>Paid Amount (₹)</Label><Input type="number" value={form.paid} onChange={e => setForm({ ...form, paid: e.target.value })} placeholder="0" /></div>
            <div><Label>Payment Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div><Label>Payment Mode</Label>
              <Select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
                {['UPI','Cash','Card','Bank Transfer','DD'].map(m => <option key={m}>{m}</option>)}
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleSubmit} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Save Payment</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Fee Payment Records ({filtered.length})</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student ID', 'Name', 'Course', 'Semester', 'Fee Type', 'Total Fee', 'Paid', 'Pending', 'Date', 'Mode', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const sc = statusColor(r.status);
                return (
                  <tr key={i} style={{ borderTop: '1px solid #f1f5f9', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 14px', fontSize: '13px', color: '#3b82f6', fontWeight: 700 }}>{r.id}</td>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>{r.name}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b' }}>{r.course}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b' }}>{r.semester}</td>
                    <td style={{ padding: '13px 14px' }}><span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: '#eff6ff', color: '#1d4ed8' }}>{r.feeType}</span></td>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>₹{r.total.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 700, color: '#059669' }}>₹{r.paid.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 700, color: r.pending > 0 ? '#dc2626' : '#94a3b8' }}>₹{r.pending.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{r.date}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#475569' }}>{r.mode}</td>
                    <td style={{ padding: '13px 14px' }}><span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: sc.bg, color: sc.text }}>● {r.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
