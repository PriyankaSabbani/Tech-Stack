
import React, { useState, useEffect } from 'react';
import { getReceipts, addReceipt } from '../data/db';

const Label = ({ children }) => <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</label>;
const Input = (props) => <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif" }} />;
const Select = ({ children, ...props }) => <select {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', color: '#1e293b', background: '#fff', outline: 'none', fontFamily: "'Nunito', sans-serif" }}>{children}</select>;

const defaultForm = {
  receiptNo: `RCP-2025-${Math.floor(Math.random() * 9000) + 1000}`,
  studentId: '', studentName: '', course: '', dept: '', semester: 'Sem 1',
  feeType: 'Tuition Fee', amount: '', paymentDate: new Date().toISOString().split('T')[0],
  paymentMode: 'UPI', transactionId: '', academicYear: '2024-25', collectedBy: 'Accounts Dept'
};

export default function Receipt() {
  const [form, setForm] = useState(defaultForm);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReceipts();
      setReceipts(data);
    };
    fetchData();
  }, []);

  const handleGenerate = async () => {
    const newReceipt = { ...form, amount: parseInt(form.amount) || 0 };
    const updated = await addReceipt(newReceipt);
    setReceipts(updated);
    setShowReceipt(true);
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (num === 0) return 'Zero';
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
    return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>🧾 Receipt & Invoice Generator</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Generate official fee payment receipts</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>📝 Receipt Details</h3>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><Label>Receipt No.</Label><Input value={form.receiptNo} onChange={e => setForm({ ...form, receiptNo: e.target.value })} /></div>
              <div><Label>Academic Year</Label>
                <Select value={form.academicYear} onChange={e => setForm({ ...form, academicYear: e.target.value })}>
                  <option>2024-25</option><option>2025-26</option><option>2023-24</option>
                </Select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><Label>Student ID</Label><Input value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} placeholder="e.g. STU001" /></div>
              <div><Label>Student Name</Label><Input value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} placeholder="Full Name" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><Label>Course</Label><Input value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} placeholder="e.g. B.Tech CSE" /></div>
              <div><Label>Semester</Label>
                <Select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}>
                  {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'].map(s => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><Label>Fee Type</Label>
                <Select value={form.feeType} onChange={e => setForm({ ...form, feeType: e.target.value })}>
                  {['Tuition Fee', 'Hostel Fee', 'Transport Fee', 'Exam Fee', 'Library Fee', 'Lab Fee', 'Admission Fee'].map(t => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><Label>Payment Date</Label><Input type="date" value={form.paymentDate} onChange={e => setForm({ ...form, paymentDate: e.target.value })} /></div>
              <div><Label>Payment Mode</Label>
                <Select value={form.paymentMode} onChange={e => setForm({ ...form, paymentMode: e.target.value })}>
                  {['UPI', 'Cash', 'Card', 'Bank Transfer', 'DD'].map(m => <option key={m}>{m}</option>)}
                </Select>
              </div>
            </div>
            <div><Label>Transaction ID</Label><Input value={form.transactionId} onChange={e => setForm({ ...form, transactionId: e.target.value })} placeholder="UPI/Card Transaction ID (optional)" /></div>
            <button onClick={handleGenerate} style={{ padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
              🧾 Generate Receipt
            </button>
          </div>
        </div>

        {/* Receipt Preview */}
        <div>
          {showReceipt ? (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '2px solid #e2e8f0' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '3px double #1d4ed8', paddingBottom: '16px' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>🏛️</div>
                <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '1px', textTransform: 'uppercase' }}>EduFinance College</h2>
                <div style={{ fontSize: '12px', color: '#64748b' }}>123 Education Avenue, Bangalore - 560001, Karnataka</div>
                <div style={{ marginTop: '10px', background: 'linear-gradient(90deg, #0f172a, #1e3a5f)', color: '#fff', padding: '6px 20px', borderRadius: '4px', display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>FEE RECEIPT</div>
              </div>
              {/* Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '10px 14px', background: '#eff6ff', borderRadius: '8px' }}>
                <div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>RECEIPT NO.</div><div style={{ fontSize: '14px', fontWeight: 800, color: '#1d4ed8' }}>{form.receiptNo}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>DATE</div><div style={{ fontSize: '14px', fontWeight: 800, color: '#1d4ed8' }}>{form.paymentDate}</div></div>
              </div>
              {/* Student Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {[['Student ID', form.studentId], ['Student Name', form.studentName], ['Course', form.course], ['Semester', form.semester], ['Academic Year', form.academicYear], ['Payment Mode', form.paymentMode]].map(([l, v]) => (
                  <div key={l} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                    <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 700, marginTop: '2px' }}>{v || '—'}</div>
                  </div>
                ))}
              </div>
              {/* Amount */}
              <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>{form.feeType}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>₹{(parseInt(form.amount) || 0).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ padding: '12px 14px', background: 'linear-gradient(90deg, #0f172a, #1e3a5f)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Paid</span>
                  <span style={{ fontSize: '22px', fontWeight: 900, color: '#34d399' }}>₹{(parseInt(form.amount) || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', marginBottom: '14px', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
                Amount in words: <strong style={{ color: '#1e293b' }}>{numberToWords(parseInt(form.amount) || 0)} Rupees Only</strong>
              </div>
              {form.transactionId && <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>Transaction ID: <strong>{form.transactionId}</strong></div>}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>⬇ Download PDF</button>
                <button style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>📧 Email Receipt</button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧾</div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#64748b' }}>Receipt Preview</div>
              <div style={{ fontSize: '13px', marginTop: '8px' }}>Fill in details and click Generate Receipt</div>
            </div>
          )}

          {/* Recent Receipts */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginTop: '16px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>📋 Recent Receipts</h3>
            {receipts.slice(0, 4).map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>{r.receiptNo}</div>
                  <div style={{ fontSize: '12px', color: '#1e293b', fontWeight: 600 }}>{r.studentName}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.course} · {r.paymentDate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>₹{r.amount.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.paymentMode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

