import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaFileExport, FaFileAlt, FaCheckCircle, FaBus } from 'react-icons/fa';
import { feesApi, transportApi } from '../api';

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ backgroundColor: '#1a365d', color: '#fff', padding: '16px 20px', borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5 style={{ margin: 0, fontWeight: '600' }}>{title}</h5>
        <FaTimes style={{ cursor: 'pointer' }} onClick={onClose} />
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  </div>
);

const Fees = () => {
  const [feeRecords, setFeeRecords] = useState([]);
  const [transport, setTransport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showExport, setShowExport] = useState(null);
  const [toast, setToast] = useState('');
  const [payForm, setPayForm] = useState({ name: '', rollNo: '', branch: 'B.Tech CS', amount: '', dueDate: '', status: 'Pending' });

  const showToast = (msg, color = '#28a745') => { setToast({ msg, color }); setTimeout(() => setToast(''), 3000); };

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '12px' };
  const labelStyle = { fontSize: '0.85rem', fontWeight: '600', color: '#555', marginBottom: '4px', display: 'block' };

  const handleAddPayment = async () => {
    const statusColor = payForm.status === 'Cleared' ? '#28a745' : payForm.status === 'Overdue' ? '#dc3545' : '#ffc107';
    const newRecord = await feesApi.create({ ...payForm, amount: Number(payForm.amount), statusColor });
    setFeeRecords(prev => [...prev, newRecord]);
    setShowAddPayment(false);
    setPayForm({ name: '', rollNo: '', branch: 'B.Tech CS', amount: '', dueDate: '', status: 'Pending' });
    showToast('Payment record added!');
  };

  const handleMarkCleared = async (id) => {
    const updated = await feesApi.patch(id, { status: 'Cleared', statusColor: '#28a745' });
    setFeeRecords(prev => prev.map(r => r.id === updated.id ? updated : r));
    showToast('Fee marked as Cleared!');
  };

  useEffect(() => {
    Promise.all([feesApi.getAll(), transportApi.getAll()])
      .then(([fees, trans]) => { setFeeRecords(fees); setTransport(trans); setLoading(false); })
      .catch(() => { showToast({ msg: '⚠️ Server not running. Run: npm run server', color: '#dc3545' }); setLoading(false); });
  }, []);

  const totalPending = feeRecords.filter(r => r.status === 'Pending' || r.status === 'Overdue').reduce((a, r) => a + r.amount, 0);
  const totalCleared = feeRecords.filter(r => r.status === 'Cleared').reduce((a, r) => a + r.amount, 0);

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: toast.color, color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 99999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontWeight: '500' }}>
          ✅ {toast.msg}
        </div>
      )}

      {/* Summary Stats */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1, background: '#dc3545', color: '#fff', borderRadius: '10px', padding: '16px 20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>Total Pending / Overdue</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹ {totalPending.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: '#28a745', color: '#fff', borderRadius: '10px', padding: '16px 20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>Total Cleared</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹ {totalCleared.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: '#1a365d', color: '#fff', borderRadius: '10px', padding: '16px 20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>Total Records</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{feeRecords.length}</div>
        </div>
      </div>

      {/* Fee Records Section */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#1a365d', color: '#fff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ margin: 0 }}>📋 Fee Records</h5>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setShowAddPayment(true)}
              style={{ backgroundColor: '#17a2b8', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}>
              <FaPlus /> Add Payment
            </button>
            <button onClick={() => setShowReport(true)}
              style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '7px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}>
              <FaFileAlt /> Generate Report
            </button>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div className="table-responsive">
            <table className="table" style={{ verticalAlign: 'middle' }}>
              <thead style={{ backgroundColor: '#f9f9f9' }}>
                <tr style={{ color: '#666', fontSize: '0.9rem' }}>
                  <th>Student Name</th><th>Roll No</th><th>Branch</th><th>Amount</th><th>Status</th><th>Due Date</th><th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {feeRecords.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: '500', color: '#444' }}>{record.name}</td>
                    <td style={{ color: '#888', fontSize: '0.85rem' }}>{record.rollNo}</td>
                    <td style={{ color: '#666' }}>{record.branch}</td>
                    <td style={{ color: '#333', fontWeight: '600' }}>₹ {Number(record.amount).toLocaleString()}</td>
                    <td>
                      <span style={{ backgroundColor: record.statusColor, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ color: '#666', fontSize: '0.85rem' }}>{record.dueDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        {record.status !== 'Cleared' && (
                          <button onClick={() => handleMarkCleared(record.id)}
                            style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <FaCheckCircle /> Mark Cleared
                          </button>
                        )}
                        <button onClick={() => setShowExport(record)}
                          style={{ backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <FaFileExport /> Export
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transport Details */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#1a365d', color: '#fff', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaBus style={{ color: '#ffc107', fontSize: '1.3rem' }} />
          <h5 style={{ margin: 0 }}>Transport Details</h5>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', fontSize: '0.95rem', color: '#555' }}>
              <div><strong>Bus Number:</strong> <span style={{ color: '#1a365d', fontWeight: '700' }}>12A</span></div>
              <div><strong>Route:</strong> Main City - Campus Route</div>
              <div><strong>Driver:</strong> Mr. Ramesh</div>
              <div><strong>Contact:</strong> 9876500001</div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-sm" style={{ margin: 0 }}>
              <thead style={{ backgroundColor: '#1a365d', color: '#fff' }}>
                <tr><th>Student Name</th><th>Roll No</th><th>Bus Stop</th><th>Bus No</th></tr>
              </thead>
              <tbody>
                {transport.map(t => (
                  <tr key={t.id}>
                    <td style={{ color: '#444' }}>{t.name}</td>
                    <td style={{ color: '#888' }}>{t.rollNo}</td>
                    <td style={{ color: '#666' }}>{t.stop}</td>
                    <td><span style={{ backgroundColor: '#1a365d', color: '#fff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>{t.bus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddPayment && (
        <Modal title="Add Payment Record" onClose={() => setShowAddPayment(false)}>
          {[['Student Name', 'name', 'text'], ['Roll No', 'rollNo', 'text'], ['Amount (₹)', 'amount', 'number'], ['Due Date', 'dueDate', 'date']].map(([label, key, type]) => (
            <div key={key}><label style={labelStyle}>{label}</label><input type={type} value={payForm[key]} onChange={e => setPayForm(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} placeholder={`Enter ${label}`} /></div>
          ))}
          <label style={labelStyle}>Branch</label>
          <select value={payForm.branch} onChange={e => setPayForm(p => ({ ...p, branch: e.target.value }))} style={inputStyle}>
            {['B.Tech CS', 'B.Tech IT', 'B.Tech ME', 'B.Tech ECE', 'B.Tech EE'].map(b => <option key={b}>{b}</option>)}
          </select>
          <label style={labelStyle}>Status</label>
          <select value={payForm.status} onChange={e => setPayForm(p => ({ ...p, status: e.target.value }))} style={inputStyle}>
            <option>Pending</option><option>Cleared</option><option>Overdue</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAddPayment} style={{ flex: 1, backgroundColor: '#17a2b8', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Add Record</button>
            <button onClick={() => setShowAddPayment(false)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Generate Report Modal */}
      {showReport && (
        <Modal title="Fee Report Summary" onClose={() => setShowReport(false)}>
          <div style={{ marginBottom: '16px' }}>
            <h6 style={{ fontWeight: '700', color: '#1a365d', marginBottom: '12px' }}>📊 B.Tech Fee Collection Report</h6>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {[['Total Records', feeRecords.length], ['Pending', feeRecords.filter(r => r.status === 'Pending').length], ['Overdue', feeRecords.filter(r => r.status === 'Overdue').length], ['Cleared', feeRecords.filter(r => r.status === 'Cleared').length], ['Total Pending (₹)', `₹${totalPending.toLocaleString()}`], ['Total Cleared (₹)', `₹${totalCleared.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#333' }}>{v}</div>
                </div>
              ))}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr style={{ backgroundColor: '#1a365d', color: '#fff' }}><th style={{ padding: '8px' }}>Student</th><th style={{ padding: '8px' }}>Amount</th><th style={{ padding: '8px' }}>Status</th></tr></thead>
              <tbody>
                {feeRecords.map(r => (<tr key={r.id} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px' }}>{r.name}</td><td style={{ padding: '8px' }}>₹{r.amount.toLocaleString()}</td><td style={{ padding: '8px' }}><span style={{ backgroundColor: r.statusColor, color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>{r.status}</span></td></tr>))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { window.print(); showToast('Report sent to printer!'); }} style={{ flex: 1, backgroundColor: '#1a365d', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>🖨️ Print Report</button>
            <button onClick={() => setShowReport(false)} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
          </div>
        </Modal>
      )}

      {/* Export Modal */}
      {showExport && (
        <Modal title={`Export Record — ${showExport.name}`} onClose={() => setShowExport(null)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[['Student Name', showExport.name], ['Roll No', showExport.rollNo], ['Branch', showExport.branch], ['Amount', `₹${Number(showExport.amount).toLocaleString()}`], ['Status', showExport.status], ['Due Date', showExport.dueDate]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontWeight: '600', color: '#333' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { showToast('Record exported as PDF!', '#1a365d'); setShowExport(null); }} style={{ flex: 1, backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>📄 Export as PDF</button>
            <button onClick={() => { showToast('Record exported as CSV!', '#28a745'); setShowExport(null); }} style={{ flex: 1, backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>📊 Export as CSV</button>
          </div>
          <button onClick={() => setShowExport(null)} style={{ marginTop: '8px', width: '100%', backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default Fees;
