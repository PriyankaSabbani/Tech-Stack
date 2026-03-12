import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaPhoneAlt, FaEnvelope, FaEdit, FaTrash, FaTimes, FaPlus, FaEye } from 'react-icons/fa';
import { staffApi } from '../api';

const emptyStaff = { name: '', design: 'Assistant Prof.', dept: 'Computer Science', phone: '', email: '', experience: '', qualification: '', imgColor: '#17a2b8' };
const colors = ['#17a2b8','#28a745','#ffc107','#dc3545','#0d6efd','#6f42c1','#fd7e14','#20c997'];

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

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewStaff, setViewStaff] = useState(null);
  const [editStaff, setEditStaff] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState(emptyStaff);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '12px' };
  const labelStyle = { fontSize: '0.85rem', fontWeight: '600', color: '#555', marginBottom: '4px', display: 'block' };

  useEffect(() => {
    staffApi.getAll().then(data => { setStaff(data); setLoading(false); })
      .catch(() => { showToast('⚠️ Could not connect. Run: npm run server'); setLoading(false); });
  }, []);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleDelete = async (id) => {
    await staffApi.delete(id);
    setStaff(prev => prev.filter(s => s.id !== id));
    showToast('Staff member removed!');
  };

  const handleSaveEdit = async () => {
    const updated = await staffApi.update(editStaff.id, editStaff);
    setStaff(prev => prev.map(s => s.id === updated.id ? updated : s));
    setEditStaff(null);
    showToast('Staff updated!');
  };

  const handleAdd = async () => {
    const newStaff = await staffApi.create(formData);
    setStaff(prev => [...prev, newStaff]);
    setFormData(emptyStaff);
    setShowAdd(false);
    showToast('Staff member added!');
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#1a365d', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 99999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontWeight: '500' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontWeight: '600', margin: 0 }}>Staff Directory</h2>
        <button onClick={() => { setFormData(emptyStaff); setShowAdd(true); }}
          style={{ backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}>
          <FaPlus /> Add Staff
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
          <div className="spinner-border text-primary" role="status"></div>
          <div style={{ marginTop: '10px' }}>Loading staff data...</div>
        </div>
      ) : (
        <div className="row">
          {staff.map(s => (
            <div className="col-md-4 mb-4" key={s.id}>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: s.imgColor, color: '#fff', fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
                  {getInitials(s.name)}
                </div>
                <h5 style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>{s.name}</h5>
                <p style={{ color: '#0d6efd', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '500' }}>{s.design}</p>
                <div style={{ backgroundColor: '#f4f7f6', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', color: '#555', textAlign: 'left', marginBottom: '12px' }}>
                  <div style={{ marginBottom: '5px' }}><FaChalkboardTeacher style={{ marginRight: '6px', color: '#666' }} />{s.dept}</div>
                  <div style={{ marginBottom: '5px' }}><FaPhoneAlt style={{ marginRight: '6px', color: '#666' }} />{s.phone}</div>
                  <div><FaEnvelope style={{ marginRight: '6px', color: '#666' }} />{s.email}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button onClick={() => setViewStaff(s)} style={{ backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><FaEye /> View</button>
                  <button onClick={() => setEditStaff({ ...s })} style={{ backgroundColor: '#0d6efd', color: '#fff', border: 'none', borderRadius: '5px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(s.id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><FaTrash /> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewStaff && (
        <Modal title={`Staff Details — ${viewStaff.name}`} onClose={() => setViewStaff(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: viewStaff.imgColor, color: '#fff', fontSize: '1.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>{getInitials(viewStaff.name)}</div>
            <h4 style={{ fontWeight: '700', color: '#333', margin: 0 }}>{viewStaff.name}</h4>
            <p style={{ color: '#0d6efd', margin: 0 }}>{viewStaff.design} — {viewStaff.dept}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Phone', viewStaff.phone], ['Email', viewStaff.email], ['Experience', viewStaff.experience], ['Qualification', viewStaff.qualification]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '4px', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontWeight: '600', color: '#333' }}>{v || '—'}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setViewStaff(null)} style={{ marginTop: '20px', backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: '500' }}>Close</button>
        </Modal>
      )}

      {/* Edit Modal */}
      {editStaff && (
        <Modal title="Edit Staff" onClose={() => setEditStaff(null)}>
          {[['Name', 'name', 'text'], ['Phone', 'phone', 'text'], ['Email', 'email', 'email'], ['Experience', 'experience', 'text'], ['Qualification', 'qualification', 'text']].map(([label, key, type]) => (
            <div key={key}><label style={labelStyle}>{label}</label><input type={type} value={editStaff[key]} onChange={e => setEditStaff(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} /></div>
          ))}
          <label style={labelStyle}>Designation</label>
          <select value={editStaff.design} onChange={e => setEditStaff(p => ({ ...p, design: e.target.value }))} style={inputStyle}>
            {['Professor', 'Associate Prof.', 'Assistant Prof.', 'HOD', 'Lab Assistant', 'Librarian'].map(d => <option key={d}>{d}</option>)}
          </select>
          <label style={labelStyle}>Department</label>
          <select value={editStaff.dept} onChange={e => setEditStaff(p => ({ ...p, dept: e.target.value }))} style={inputStyle}>
            {['Computer Science', 'Information Tech', 'Mechanical Engg.', 'Electronics & Comm.', 'Electrical Engg.', 'Central Library'].map(d => <option key={d}>{d}</option>)}
          </select>
          <label style={labelStyle}>Avatar Color</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {colors.map(c => <div key={c} onClick={() => setEditStaff(p => ({ ...p, imgColor: c }))} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: editStaff.imgColor === c ? '3px solid #333' : '3px solid transparent' }} />)}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSaveEdit} style={{ flex: 1, backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Save Changes</button>
            <button onClick={() => setEditStaff(null)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Add Staff Modal */}
      {showAdd && (
        <Modal title="Add New Staff Member" onClose={() => setShowAdd(false)}>
          {[['Full Name', 'name', 'text'], ['Phone', 'phone', 'text'], ['Email', 'email', 'email'], ['Experience', 'experience', 'text'], ['Qualification', 'qualification', 'text']].map(([label, key, type]) => (
            <div key={key}><label style={labelStyle}>{label}</label><input type={type} value={formData[key]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} placeholder={`Enter ${label}`} /></div>
          ))}
          <label style={labelStyle}>Designation</label>
          <select value={formData.design} onChange={e => setFormData(p => ({ ...p, design: e.target.value }))} style={inputStyle}>
            {['Professor', 'Associate Prof.', 'Assistant Prof.', 'HOD', 'Lab Assistant', 'Librarian'].map(d => <option key={d}>{d}</option>)}
          </select>
          <label style={labelStyle}>Department</label>
          <select value={formData.dept} onChange={e => setFormData(p => ({ ...p, dept: e.target.value }))} style={inputStyle}>
            {['Computer Science', 'Information Tech', 'Mechanical Engg.', 'Electronics & Comm.', 'Electrical Engg.', 'Central Library'].map(d => <option key={d}>{d}</option>)}
          </select>
          <label style={labelStyle}>Avatar Color</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {colors.map(c => <div key={c} onClick={() => setFormData(p => ({ ...p, imgColor: c }))} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: formData.imgColor === c ? '3px solid #333' : '3px solid transparent' }} />)}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAdd} style={{ flex: 1, backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Add Staff</button>
            <button onClick={() => setShowAdd(false)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Staff;
