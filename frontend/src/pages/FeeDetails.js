import React, { useState, useEffect } from 'react';
import { getFeeHistory, getDueItems, getFeeBreakdown } from '../data/db';

export default function FeeDetails({ student }) {
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMode, setPayMode] = useState('UPI');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [feeHistory, setFeeHistory] = useState([]);
  const [dueItems, setDueItems] = useState([]);
  const [feeBreakdown, setFeeBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFeeHistory(), getDueItems(), getFeeBreakdown()])
      .then(([history, due, breakdown]) => {
        setFeeHistory(history);
        setDueItems(due);
        setFeeBreakdown(breakdown);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading fee data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const totalPaid = feeHistory.reduce((a, f) => a + f.amount, 0);
  const totalDue = dueItems.reduce((a, d) => a + d.amount, 0);

  const modeColor = { UPI: '#60a5fa', Card: '#a78bfa', Cash: '#fbbf24', 'Bank Transfer': '#34d399' };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); setShowPayModal(false); }, 2000);
  };

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['Total Paid', `₹${totalPaid.toLocaleString('en-IN')}`, '#34d399', 'rgba(52,211,153,0.1)'],
          ['Amount Due', `₹${paid ? 0 : totalDue.toLocaleString('en-IN')}`, paid ? '#34d399' : '#f87171', paid ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)'],
          ['Transactions', feeHistory.length, '#60a5fa', 'rgba(96,165,250,0.1)'],
          ['Scholarship', '₹0', '#a78bfa', 'rgba(167,139,250,0.1)'],
        ].map(([l, v, c, bg]) => (
          <div key={l} style={{ background: bg, border: `1px solid ${c}30`, borderRadius: 14, padding: '18px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 5 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Due Now */}
      {!paid && totalDue > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>⚠️ Payment Due</div>
              {dueItems.map((d, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: 13 }}>
                  {d.desc} — <strong style={{ color: '#fca5a5' }}>₹{d.amount.toLocaleString('en-IN')}</strong> &nbsp;·&nbsp; Due: {d.dueDate}
                </div>
              ))}
            </div>
            <button onClick={() => setShowPayModal(true)} style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(59,130,246,0.35)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              💳 Pay Now — ₹{totalDue.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      )}
      {paid && (
        <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 20, color: '#34d399', fontWeight: 700 }}>
          ✅ Payment successful! All dues cleared for this semester.
        </div>
      )}

      {/* Fee Breakdown */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22, marginBottom: 20 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 16 }}>📋 Semester 5 Fee Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {feeBreakdown.map((f, i) => {
            const isPaid = f.paid >= f.amount || (paid && f.label === 'Transport Fee');
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, marginTop: 6, width: 180 }}>
                    <div style={{ height: '100%', width: isPaid ? '100%' : '0%', background: '#34d399', borderRadius: 3, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 20 }}>
                  <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14 }}>₹{f.amount.toLocaleString('en-IN')}</div>
                  <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800, color: isPaid ? '#34d399' : '#f87171', background: isPaid ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)' }}>
                    {isPaid ? 'Paid ✓' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15 }}>🧾 Payment History</div>
          <button style={{ padding: '7px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>⬇ Export</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                {['Receipt No.', 'Date', 'Description', 'Amount', 'Mode', 'Transaction ID', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeHistory.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '13px 16px', color: '#60a5fa', fontWeight: 700, fontSize: 12, fontFamily: 'monospace' }}>{r.receipt}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{r.date}</td>
                  <td style={{ padding: '13px 16px', color: '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{r.desc}</td>
                  <td style={{ padding: '13px 16px', color: '#34d399', fontWeight: 800, fontSize: 14 }}>₹{r.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '13px 16px' }}><span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: modeColor[r.mode] || '#94a3b8', background: `${modeColor[r.mode]}18` }}>{r.mode}</span></td>
                  <td style={{ padding: '13px 16px', color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>{r.txn}</td>
                  <td style={{ padding: '13px 16px' }}><span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.1)' }}>✓ {r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: 420, maxWidth: '95vw', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 20, marginBottom: 6 }}>💳 Pay Now</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Transport Fee — ₹8,000</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 10 }}>Select Payment Mode</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['UPI', 'Card', 'Net Banking', 'Cash'].map(m => (
                  <button key={m} onClick={() => setPayMode(m)} style={{ padding: '12px', borderRadius: 10, border: `2px solid ${payMode === m ? '#3b82f6' : 'rgba(255,255,255,0.08)'}`, background: payMode === m ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)', color: payMode === m ? '#60a5fa' : '#64748b', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m}</button>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#64748b', fontSize: 13 }}>Transport Fee</span>
                <span style={{ color: '#f1f5f9', fontWeight: 700 }}>₹8,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 8 }}>
                <span style={{ color: '#f1f5f9', fontWeight: 800 }}>Total</span>
                <span style={{ color: '#34d399', fontWeight: 900, fontSize: 16 }}>₹8,000</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handlePay} style={{ flex: 1, padding: '13px', background: paying ? 'rgba(52,211,153,0.2)' : 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {paying ? '⏳ Processing...' : `🔒 Pay ₹8,000`}
              </button>
              <button onClick={() => setShowPayModal(false)} style={{ padding: '13px 18px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 10, color: '#64748b', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
