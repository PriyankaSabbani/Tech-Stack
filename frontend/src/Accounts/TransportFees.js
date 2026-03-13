
import React, { useState, useEffect } from 'react';
import { getTransportRoutes, getTransportRegistrations, addTransportRegistration } from '../data/db';

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

export default function TransportFees() {
  const [tab, setTab] = useState('routes');
  const [showForm, setShowForm] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const routesData = await getTransportRoutes();
      const regData = await getTransportRegistrations();
      setRoutes(routesData);
      setRegistrations(regData);
    };
    fetchData();
  }, []);

  const handleRegister = async () => {
    await addTransportRegistration({});
    const regData = await getTransportRegistrations();
    setRegistrations(regData);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>🚌 Transport Fee Management</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Manage bus routes, transport registrations and fee collection</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '11px 22px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>+ Register Student</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[['Total Routes', routes.length, '#eff6ff', '#1d4ed8'], ['Total Students', registrations.length, '#f0fdf4', '#059669'],
        ['Revenue', `₹${registrations.reduce((a, r) => a + r.paid, 0).toLocaleString('en-IN')}`, '#faf5ff', '#7c3aed'],
        ['Pending', `₹${registrations.reduce((a, r) => a + (r.fee - r.paid), 0).toLocaleString('en-IN')}`, '#fef2f2', '#dc2626']].map(([l, v, bg, c]) => (
          <div key={l} style={{ background: bg, borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[['routes', '🗺️ Bus Routes'], ['registrations', '👥 Registrations']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', background: tab === key ? 'linear-gradient(135deg, #10b981, #059669)' : '#f1f5f9', color: tab === key ? '#fff' : '#64748b', fontFamily: "'Nunito', sans-serif" }}>{label}</button>
        ))}
      </div>

      {/* Registration Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '20px', border: '2px solid #10b981' }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>➕ Register Student for Transport</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <div><Label>Student ID</Label><Input placeholder="e.g. STU025" /></div>
            <div><Label>Student Name</Label><Input placeholder="Full Name" /></div>
            <div><Label>Course</Label><Input placeholder="e.g. B.Tech" /></div>
            <div><Label>Select Route</Label>
              <Select>
                {routes.map(r => <option key={r.id} value={r.id}>{r.name} — ₹{r.fee.toLocaleString('en-IN')}/yr</option>)}
              </Select>
            </div>
            <div><Label>Boarding Stop</Label><Input placeholder="e.g. BTM Layout" /></div>
            <div><Label>Payment Mode</Label>
              <Select><option>UPI</option><option>Cash</option><option>Card</option></Select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleRegister} style={{ padding: '11px 28px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>💾 Register & Pay</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '11px 28px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {tab === 'routes' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {routes.map((r, i) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
            return (
              <div key={r.id} style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderTop: `4px solid ${colors[i]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>{r.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>🚏 {r.stops}</div>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, background: `${colors[i]}22`, color: colors[i] }}>{r.id}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  {[['📏 Distance', r.distance], ['🚌 Buses', r.buses], ['👥 Students', r.students], ['👤 Driver', r.driver]].map(([l, v]) => (
                    <div key={l} style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{l}</div>
                      <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 700, marginTop: '2px' }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${colors[i]}11`, padding: '10px 14px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Annual Fee per Student</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: colors[i] }}>₹{r.fee.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'registrations' && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Student ID', 'Name', 'Course', 'Route', 'Stop', 'Annual Fee', 'Paid', 'Balance', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrations.map((r, i) => (
                  <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '13px 14px', color: '#10b981', fontWeight: 700, fontSize: '13px' }}>{r.id}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>{r.name}</td>
                    <td style={{ padding: '13px 14px', color: '#64748b', fontSize: '12px' }}>{r.course}</td>
                    <td style={{ padding: '13px 14px' }}><span style={{ padding: '2px 10px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>{r.route}</span></td>
                    <td style={{ padding: '13px 14px', color: '#475569', fontSize: '12px' }}>{r.stop}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>₹{r.fee.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: '#059669', fontSize: '13px' }}>₹{r.paid.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: r.fee - r.paid > 0 ? '#dc2626' : '#94a3b8', fontSize: '13px' }}>₹{(r.fee - r.paid).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: r.status === 'Active' ? '#dcfce7' : r.status === 'Pending' ? '#fef2f2' : '#fef9c3', color: r.status === 'Active' ? '#16a34a' : r.status === 'Pending' ? '#dc2626' : '#ca8a04' }}>● {r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

