import React, { useState } from 'react';

const initScholarships = [
  { id: 'SCH001', name: 'Merit Scholarship', type: 'Merit', amount: 25000, criteria: 'CGPA >= 9.0', beneficiaries: 5, budget: 125000 },
  { id: 'SCH002', name: 'Sports Excellence Award', type: 'Sports', amount: 15000, criteria: 'National/State level player', beneficiaries: 3, budget: 45000 },
  { id: 'SCH003', name: 'Need Based Scholarship', type: 'Need-based', amount: 20000, criteria: 'Family income < 3LPA', beneficiaries: 8, budget: 160000 },
  { id: 'SCH004', name: 'SC/ST Scholarship', type: 'Government', amount: 30000, criteria: 'SC/ST Category', beneficiaries: 6, budget: 180000 },
];

const initStudents = [
  { id: 'STU003', name: 'Rahul Verma', course: 'B.Tech', cgpa: 9.2, scholarship: 'SCH001', amount: 25000, status: 'Approved', date: '2025-01-15' },
  { id: 'STU007', name: 'Anjali Mishra', course: 'MBA', cgpa: 9.5, scholarship: 'SCH001', amount: 25000, status: 'Approved', date: '2025-01-15' },
  { id: 'STU012', name: 'Mohan Lal', course: 'B.Com', cgpa: 8.1, scholarship: 'SCH003', amount: 20000, status: 'Approved', date: '2025-01-20' },
  { id: 'STU018', name: 'Deepa R', course: 'MCA', cgpa: 7.8, scholarship: 'SCH004', amount: 30000, status: 'Pending', date: '2025-02-10' },
  { id: 'STU025', name: 'Vikram S', course: 'B.Tech', cgpa: 8.9, scholarship: 'SCH002', amount: 15000, status: 'Approved', date: '2025-01-28' },
];

const typeColors = { Merit: '#3b82f6', Sports: '#10b981', 'Need-based': '#f59e0b', Government: '#8b5cf6' };

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;

export default function Scholarships() {
  const [tab, setTab] = useState('scholarships');
  const [showForm, setShowForm] = useState(false);

  const totalGiven = initStudents.filter(s => s.status === 'Approved').reduce((a, s) => a + s.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>🎓 Scholarship & Discount Management</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Manage student scholarships, discounts and concessions</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '11px 22px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>+ Add Scholarship</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[['Total Schemes', initScholarships.length, '#faf5ff', '#7c3aed'], ['Beneficiaries', initStudents.length, '#eff6ff', '#1d4ed8'],
          ['Approved', initStudents.filter(s => s.status === 'Approved').length, '#f0fdf4', '#059669'],
          ['Total Disbursed', `₹${(totalGiven / 100000).toFixed(1)}L`, '#fef9c3', '#ca8a04']].map(([l, v, bg, c]) => (
          <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[['scholarships', '🏆 Scholarship Schemes'], ['students', '👨‍🎓 Scholarship Students']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', background: tab === key ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '#f1f5f9', color: tab === key ? '#fff' : '#64748b', fontFamily: "'Nunito', sans-serif" }}>{label}</button>
        ))}
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #8b5cf6' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>➕ Create New Scholarship</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <div><Label>Scholarship Name</Label><Input placeholder="e.g. Merit Scholarship 2025" /></div>
            <div><Label>Type</Label>
              <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>
                <option>Merit</option><option>Need-based</option><option>Sports</option><option>Government</option>
              </select>
            </div>
            <div><Label>Amount Per Student (₹)</Label><Input type="number" placeholder="0" /></div>
            <div><Label>Max Beneficiaries</Label><Input type="number" placeholder="0" /></div>
            <div style={{ gridColumn: '1 / -1' }}><Label>Eligibility Criteria</Label><Input placeholder="e.g. CGPA >= 9.0, First generation student, etc." /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Save</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {tab === 'scholarships' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {initScholarships.map((s) => (
            <div key={s.id} style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${typeColors[s.type]}, ${typeColors[s.type]}88)` }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{s.name}</div>
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: `${typeColors[s.type]}22`, color: typeColors[s.type], display: 'inline-block', marginTop: '6px' }}>{s.type}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: typeColors[s.type] }}>₹{s.amount.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>per student</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                <strong>Criteria:</strong> {s.criteria}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>{s.beneficiaries}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Students</div>
                </div>
                <div style={{ width: '1px', background: '#e2e8f0' }}></div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: typeColors[s.type] }}>₹{(s.budget / 100000).toFixed(1)}L</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Budget</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'students' && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Student ID', 'Name', 'Course', 'CGPA', 'Scholarship', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {initStudents.map((s, i) => {
                const sch = initScholarships.find(sc => sc.id === s.scholarship);
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '13px 14px', color: '#7c3aed', fontWeight: 700, fontSize: '13px' }}>{s.id}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>{s.name}</td>
                    <td style={{ padding: '13px 14px', color: '#64748b', fontSize: '12px' }}>{s.course}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: s.cgpa >= 9 ? '#059669' : '#d97706', fontSize: '13px' }}>{s.cgpa}</td>
                    <td style={{ padding: '13px 14px' }}>
                      {sch && <span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: `${typeColors[sch.type]}22`, color: typeColors[sch.type] }}>{sch.name}</span>}
                    </td>
                    <td style={{ padding: '13px 14px', fontWeight: 800, color: '#7c3aed', fontSize: '14px' }}>₹{s.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', color: '#64748b', fontSize: '12px' }}>{s.date}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: s.status === 'Approved' ? '#dcfce7' : '#fef9c3', color: s.status === 'Approved' ? '#16a34a' : '#ca8a04' }}>● {s.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
