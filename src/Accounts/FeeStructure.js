import React, { useState } from 'react';

const initialStructures = [
  { id: 1, course: 'B.Tech', dept: 'Engineering', semester: 'Sem 1', tuition: 45000, library: 2000, lab: 3000, exam: 1500, total: 51500 },
  { id: 2, course: 'B.Tech', dept: 'Engineering', semester: 'Sem 2', tuition: 45000, library: 2000, lab: 3000, exam: 1500, total: 51500 },
  { id: 3, course: 'MBA', dept: 'Management', semester: 'Sem 1', tuition: 60000, library: 3000, lab: 0, exam: 2000, total: 65000 },
  { id: 4, course: 'B.Com', dept: 'Commerce', semester: 'Sem 1', tuition: 25000, library: 1500, lab: 0, exam: 1000, total: 27500 },
  { id: 5, course: 'MCA', dept: 'Computer Sci', semester: 'Sem 1', tuition: 35000, library: 2000, lab: 4000, exam: 1500, total: 42500 },
  { id: 6, course: 'B.Sc', dept: 'Science', semester: 'Sem 1', tuition: 20000, library: 1500, lab: 2500, exam: 1000, total: 25000 },
];

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

export default function FeeStructure() {
  const [structures, setStructures] = useState(initialStructures);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ course: '', dept: '', semester: 'Sem 1', tuition: '', library: '', lab: '', exam: '' });

  const total = (f) => (parseInt(f.tuition) || 0) + (parseInt(f.library) || 0) + (parseInt(f.lab) || 0) + (parseInt(f.exam) || 0);

  const handleSave = () => {
    if (editId) {
      setStructures(structures.map(s => s.id === editId ? { ...form, id: editId, tuition: +form.tuition, library: +form.library, lab: +form.lab, exam: +form.exam, total: total(form) } : s));
    } else {
      setStructures([...structures, { ...form, id: Date.now(), tuition: +form.tuition, library: +form.library, lab: +form.lab, exam: +form.exam, total: total(form) }]);
    }
    setShowForm(false); setEditId(null);
    setForm({ course: '', dept: '', semester: 'Sem 1', tuition: '', library: '', lab: '', exam: '' });
  };

  const handleEdit = (s) => { setForm({ course: s.course, dept: s.dept, semester: s.semester, tuition: s.tuition, library: s.library, lab: s.lab, exam: s.exam }); setEditId(s.id); setShowForm(true); };
  const handleDelete = (id) => setStructures(structures.filter(s => s.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>📋 Fee Structure Management</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Define and manage fee structures for each course and semester</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} style={{ padding: '11px 22px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
          + Create Fee Structure
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Courses', value: [...new Set(structures.map(s => s.course))].length, bg: '#eff6ff', color: '#1d4ed8' },
          { label: 'Fee Structures', value: structures.length, bg: '#f0fdf4', color: '#059669' },
          { label: 'Highest Fee', value: `₹${Math.max(...structures.map(s => s.total)).toLocaleString('en-IN')}`, bg: '#faf5ff', color: '#7c3aed' },
          { label: 'Lowest Fee', value: `₹${Math.min(...structures.map(s => s.total)).toLocaleString('en-IN')}`, bg: '#fff7ed', color: '#ea580c' },
        ].map((c) => (
          <div key={c.label} style={{ background: c.bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>{editId ? '✏️ Edit' : '➕ Create'} Fee Structure</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <div><Label>Course Name</Label><Input value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} placeholder="e.g. B.Tech" /></div>
            <div><Label>Department</Label><Input value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} placeholder="e.g. Engineering" /></div>
            <div><Label>Semester</Label>
              <Select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}>
                {['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'].map(s => <option key={s}>{s}</option>)}
              </Select>
            </div>
            <div><Label>Tuition Fee (₹)</Label><Input type="number" value={form.tuition} onChange={e => setForm({ ...form, tuition: e.target.value })} placeholder="0" /></div>
            <div><Label>Library Fee (₹)</Label><Input type="number" value={form.library} onChange={e => setForm({ ...form, library: e.target.value })} placeholder="0" /></div>
            <div><Label>Lab Fee (₹)</Label><Input type="number" value={form.lab} onChange={e => setForm({ ...form, lab: e.target.value })} placeholder="0" /></div>
            <div><Label>Exam Fee (₹)</Label><Input type="number" value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })} placeholder="0" /></div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>TOTAL FEE</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669' }}>₹{total(form).toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleSave} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Save Structure</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #0f172a, #1e3a5f)' }}>
                {['Course', 'Department', 'Semester', 'Tuition Fee', 'Library Fee', 'Lab Fee', 'Exam Fee', 'Total Fee', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {structures.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>{s.course}</td>
                  <td style={{ padding: '14px 16px', color: '#475569', fontSize: '13px' }}>{s.dept}</td>
                  <td style={{ padding: '14px 16px' }}><span style={{ padding: '3px 10px', borderRadius: '20px', background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: 700 }}>{s.semester}</span></td>
                  <td style={{ padding: '14px 16px', color: '#1e293b', fontWeight: 600, fontSize: '13px' }}>₹{s.tuition.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 16px', color: '#1e293b', fontSize: '13px' }}>₹{s.library.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 16px', color: '#1e293b', fontSize: '13px' }}>₹{s.lab.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 16px', color: '#1e293b', fontSize: '13px' }}>₹{s.exam.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>₹{s.total.toLocaleString('en-IN')}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(s)} style={{ padding: '5px 14px', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>Edit</button>
                      <button onClick={() => handleDelete(s.id)} style={{ padding: '5px 14px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>Delete</button>
                    </div>
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
