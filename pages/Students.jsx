import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { studentsApi } from '../api';

const emptyStudent = { name: '', grade: 'B.Tech CS', semester: 'Sem 1', rollNo: '', phone: '', email: '', attendance: 75, feeStatus: 'Due', statusColor: '#dc3545' };

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '540px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ backgroundColor: '#1a365d', color: '#fff', padding: '16px 20px', borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5 style={{ margin: 0, fontWeight: '600' }}>{title}</h5>
        <FaTimes style={{ cursor: 'pointer' }} onClick={onClose} />
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  </div>
);

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState(emptyStudent);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    studentsApi.getAll().then(data => { setStudents(data); setLoading(false); })
      .catch(() => { showToast('⚠️ Could not connect to server. Run: npm run server'); setLoading(false); });
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    await studentsApi.delete(id);
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast('Student removed successfully!');
  };

  const handleSaveEdit = async () => {
    const updated = await studentsApi.update(editStudent.id, editStudent);
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    setEditStudent(null);
    showToast('Student updated successfully!');
  };

  const handleAdd = async () => {
    const feeColor = formData.feeStatus === 'Paid' ? '#28a745' : formData.feeStatus === 'Partial' ? '#ffc107' : '#dc3545';
    const newStudent = await studentsApi.create({ ...formData, statusColor: feeColor });
    setStudents(prev => [...prev, newStudent]);
    setFormData(emptyStudent);
    setShowAdd(false);
    showToast('Student added successfully!');
  };

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '12px' };
  const labelStyle = { fontSize: '0.85rem', fontWeight: '600', color: '#555', marginBottom: '4px', display: 'block' };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#1a365d', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 99999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontWeight: '500' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontWeight: '600', margin: 0 }}>Student Management</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '0.85rem' }} />
            <input type="text" placeholder="Search by name, branch, roll no..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '32px', width: '300px', marginBottom: 0 }} />
          </div>
          <button onClick={() => { setFormData(emptyStudent); setShowAdd(true); }}
            style={{ backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}>
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}></div>
            <div style={{ marginTop: '10px' }}>Loading student data...</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover" style={{ verticalAlign: 'middle', margin: 0 }}>
              <thead style={{ backgroundColor: '#1a365d', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '12px 15px', fontWeight: '500' }}>Roll No</th>
                  <th style={{ padding: '12px 15px', fontWeight: '500' }}>Student Name</th>
                  <th style={{ padding: '12px 15px', fontWeight: '500' }}>Branch / Semester</th>
                  <th style={{ padding: '12px 15px', fontWeight: '500' }}>Attendance</th>
                  <th style={{ padding: '12px 15px', fontWeight: '500' }}>Fee Status</th>
                  <th style={{ padding: '12px 15px', fontWeight: '500', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#aaa' }}>No students found.</td></tr>
                ) : filtered.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px', color: '#888', fontSize: '0.85rem' }}>{student.rollNo}</td>
                    <td style={{ padding: '15px', fontWeight: '500', color: '#444' }}>{student.name}</td>
                    <td style={{ padding: '15px', color: '#666' }}>{student.grade} – {student.semester}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, backgroundColor: '#e9ecef', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${student.attendance}%`, backgroundColor: student.attendance >= 85 ? '#28a745' : student.attendance >= 75 ? '#ffc107' : '#dc3545', height: '100%' }}></div>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: '#666', minWidth: '35px' }}>{student.attendance}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ backgroundColor: student.statusColor, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button onClick={() => setViewStudent(student)} title="View" style={{ background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', marginRight: '5px', cursor: 'pointer' }}><FaEye /></button>
                      <button onClick={() => setEditStudent({ ...student })} title="Edit" style={{ background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', marginRight: '5px', cursor: 'pointer' }}><FaEdit /></button>
                      <button onClick={() => handleDelete(student.id)} title="Delete" style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '10px', color: '#888', fontSize: '0.85rem' }}>Showing {filtered.length} of {students.length} students</div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewStudent && (
        <Modal title={`Student Details — ${viewStudent.name}`} onClose={() => setViewStudent(null)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['Roll No', viewStudent.rollNo], ['Name', viewStudent.name], ['Branch', viewStudent.grade], ['Semester', viewStudent.semester], ['Phone', viewStudent.phone], ['Email', viewStudent.email], ['Attendance', `${viewStudent.attendance}%`], ['Fee Status', viewStudent.feeStatus]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k}</div>
                <div style={{ fontWeight: '600', color: '#333' }}>{v}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setViewStudent(null)} style={{ marginTop: '20px', backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: '500' }}>Close</button>
        </Modal>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <Modal title="Edit Student" onClose={() => setEditStudent(null)}>
          {[['Name', 'name', 'text'], ['Roll No', 'rollNo', 'text'], ['Phone', 'phone', 'text'], ['Email', 'email', 'email'], ['Attendance (%)', 'attendance', 'number']].map(([label, key, type]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type={type} value={editStudent[key]} onChange={e => setEditStudent(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
          <label style={labelStyle}>Fee Status</label>
          <select value={editStudent.feeStatus} onChange={e => setEditStudent(p => ({ ...p, feeStatus: e.target.value, statusColor: e.target.value === 'Paid' ? '#28a745' : e.target.value === 'Partial' ? '#ffc107' : '#dc3545' }))} style={inputStyle}>
            <option>Due</option><option>Paid</option><option>Partial</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSaveEdit} style={{ flex: 1, backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Save Changes</button>
            <button onClick={() => setEditStudent(null)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      {showAdd && (
        <Modal title="Add New Student" onClose={() => setShowAdd(false)}>
          {[['Full Name', 'name', 'text'], ['Roll No', 'rollNo', 'text'], ['Phone', 'phone', 'text'], ['Email', 'email', 'email']].map(([label, key, type]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type={type} value={formData[key]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} placeholder={`Enter ${label}`} />
            </div>
          ))}
          <label style={labelStyle}>Branch</label>
          <select value={formData.grade} onChange={e => setFormData(p => ({ ...p, grade: e.target.value }))} style={inputStyle}>
            {['B.Tech CS', 'B.Tech IT', 'B.Tech ME', 'B.Tech ECE', 'B.Tech EE'].map(b => <option key={b}>{b}</option>)}
          </select>
          <label style={labelStyle}>Semester</label>
          <select value={formData.semester} onChange={e => setFormData(p => ({ ...p, semester: e.target.value }))} style={inputStyle}>
            {['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'].map(s => <option key={s}>{s}</option>)}
          </select>
          <label style={labelStyle}>Fee Status</label>
          <select value={formData.feeStatus} onChange={e => setFormData(p => ({ ...p, feeStatus: e.target.value }))} style={inputStyle}>
            <option>Due</option><option>Paid</option><option>Partial</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAdd} style={{ flex: 1, backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Add Student</button>
            <button onClick={() => setShowAdd(false)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Students;
