
import React, { useState, useEffect } from 'react';
import { getSalaryData, addStaffSalary } from '../data/db';

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

export default function SalaryManagement() {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSlip, setShowSlip] = useState(null);
  const [form, setForm] = useState({ id: '', name: '', dept: '', role: '', basic: '', hra: '', da: '', pf: '', tax: '', month: 'February 2025' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalaryData();
      setStaff(data);
    };
    fetchData();
  }, []);

  const net = (f) => (parseInt(f.basic) || 0) + (parseInt(f.hra) || 0) + (parseInt(f.da) || 0) - (parseInt(f.pf) || 0) - (parseInt(f.tax) || 0);

  const handleSave = async () => {
    const newStaff = { ...form, basic: +form.basic, hra: +form.hra, da: +form.da, pf: +form.pf, tax: +form.tax, net: net(form), status: 'Pending' };
    const updated = await addStaffSalary(newStaff);
    setStaff(updated);
    setShowForm(false);
    setForm({ id: '', name: '', dept: '', role: '', basic: '', hra: '', da: '', pf: '', tax: '', month: 'February 2025' });
  };

  const totalPaid = staff.filter(s => s.status === 'Paid').reduce((a, s) => a + s.net, 0);
  const totalPending = staff.filter(s => s.status === 'Pending').reduce((a, s) => a + s.net, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>👔 Staff Salary Management</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Manage faculty and staff payroll</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>⚡ Process All Salaries</button>
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>+ Add Staff</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[['Total Staff', staff.length, '#eff6ff', '#1d4ed8'], ['Salary Paid', `₹${(totalPaid / 100000).toFixed(2)}L`, '#f0fdf4', '#059669'],
        ['Pending', `₹${(totalPending / 100000).toFixed(2)}L`, '#fef9c3', '#ca8a04'], ['Total Payroll', `₹${((totalPaid + totalPending) / 100000).toFixed(2)}L`, '#faf5ff', '#7c3aed']].map(([l, v, bg, c]) => (
          <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Salary Slip Modal */}
      {showSlip && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '480px', maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏛️</div>
              <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>EduFinance College</h2>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Salary Slip — {showSlip.month}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {[['Employee ID', showSlip.id], ['Name', showSlip.name], ['Department', showSlip.dept], ['Designation', showSlip.role]].map(([l, v]) => (
                  <div key={l} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                    <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 700, marginTop: '2px' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#059669', fontSize: '13px' }}>Earnings</span>
                </div>
                {[['Basic Salary', showSlip.basic], ['HRA', showSlip.hra], ['DA', showSlip.da]].map(([l, v]) => (
                  <div key={l} style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{l}</span>
                    <span style={{ fontWeight: 700, color: '#059669', fontSize: '13px' }}>₹{v.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{ background: '#fef2f2', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '13px' }}>Deductions</span>
                </div>
                {[['PF', showSlip.pf], ['Income Tax', showSlip.tax]].map(([l, v]) => (
                  <div key={l} style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{l}</span>
                    <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '13px' }}>-₹{v.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{ background: 'linear-gradient(90deg, #0f172a, #1e3a5f)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '14px' }}>NET SALARY</span>
                  <span style={{ fontWeight: 800, color: '#34d399', fontSize: '16px' }}>₹{showSlip.net.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>⬇ Download PDF</button>
              <button onClick={() => setShowSlip(null)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #8b5cf6' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>➕ Add Staff Salary Record</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {[['Staff ID', 'id'], ['Full Name', 'name'], ['Department', 'dept'], ['Role', 'role']].map(([l, k]) => (
              <div key={k}><Label>{l}</Label><Input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={l} /></div>
            ))}
            {[['Basic Salary', 'basic'], ['HRA', 'hra'], ['DA', 'da'], ['PF Deduction', 'pf'], ['Income Tax', 'tax']].map(([l, k]) => (
              <div key={k}><Label>{l} (₹)</Label><Input type="number" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder="0" /></div>
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>NET SALARY</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669' }}>₹{net(form).toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleSave} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Save</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0f172a, #1e3a5f)' }}>
                {['Staff ID', 'Name', 'Department', 'Role', 'Basic', 'HRA+DA', 'Deductions', 'Net Salary', 'Month', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                  <td style={{ padding: '12px 14px', color: '#7c3aed', fontWeight: 700, fontSize: '12px' }}>{s.id}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1e293b', fontSize: '13px', whiteSpace: 'nowrap' }}>{s.name}</td>
                  <td style={{ padding: '12px 14px', color: '#475569', fontSize: '12px' }}>{s.dept}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#475569' }}>{s.role}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>₹{s.basic.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700, fontSize: '13px' }}>₹{(s.hra + s.da).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 14px', color: '#dc2626', fontWeight: 700, fontSize: '13px' }}>₹{(s.pf + s.tax).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>₹{s.net.toLocaleString('en-IN')}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px', whiteSpace: 'nowrap' }}>{s.month}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: s.status === 'Paid' ? '#dcfce7' : '#fef9c3', color: s.status === 'Paid' ? '#16a34a' : '#ca8a04' }}>● {s.status}</span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button onClick={() => setShowSlip(s)} style={{ padding: '5px 12px', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, fontFamily: "'Nunito', sans-serif", whiteSpace: 'nowrap' }}>📄 Slip</button>
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

