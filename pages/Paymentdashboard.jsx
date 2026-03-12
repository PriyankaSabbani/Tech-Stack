import React, { useState } from 'react';
import db from '../db.json';

/* ══════════════════════════════════════════════
   PAYMENT GATEWAY MODAL
══════════════════════════════════════════════ */
function PaymentGatewayModal({ amount, student, onSuccess, onClose }) {
  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'netbanking'
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'done'

  // Card form
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  // UPI
  const [upiId, setUpiId] = useState('');
  // Netbanking
  const [bank, setBank] = useState('');

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank',
    'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank',
  ];

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    return v.length >= 3 ? v.slice(0, 2) + '/' + v.slice(2) : v;
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('done');
      setTimeout(() => onSuccess(), 1000);
    }, 2200);
  };

  const isFormValid = () => {
    if (method === 'card') return card.number.replace(/\s/g, '').length === 16 && card.name && card.expiry.length === 5 && card.cvv.length === 3;
    if (method === 'upi') return upiId.includes('@');
    if (method === 'netbanking') return bank !== '';
    return false;
  };

  const tabs = [
    { id: 'card', label: 'Credit / Debit Card', icon: 'bi bi-credit-card-2-front-fill' },
    { id: 'upi', label: 'UPI', icon: 'bi bi-phone-fill' },
    { id: 'netbanking', label: 'Net Banking', icon: 'bi bi-bank2' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ width: '100%', maxWidth: '520px', margin: '16px', animation: 'slideUp 0.3s ease' }}>

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-4 text-white" style={{ background: 'linear-gradient(135deg, #1a237e, #283593)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Secure Payment</div>
            <div className="fw-bolder fs-5 mt-1">₹ {amount.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Tuition Fee – {student.name}</div>
          </div>
          <div className="d-flex align-items-center gap-2 opacity-50" style={{ fontSize: '0.75rem' }}>
            <i className="bi bi-shield-lock-fill"></i> SSL Secured
          </div>
        </div>

        {/* Processing / Done overlay */}
        {step !== 'form' ? (
          <div className="text-center py-5 px-4">
            {step === 'processing' ? (
              <>
                <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h5 className="fw-bold text-dark">Processing Payment...</h5>
                <p className="text-muted mb-0">Please wait, do not close this window.</p>
              </>
            ) : (
              <>
                <div className="mb-3" style={{ fontSize: '3.5rem' }}>✅</div>
                <h5 className="fw-bold text-success">Payment Successful!</h5>
                <p className="text-muted mb-0">Generating receipt...</p>
              </>
            )}
          </div>
        ) : (
          <div className="p-4">

            {/* Method Tabs */}
            <div className="d-flex gap-2 mb-4">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setMethod(t.id)}
                  className={`btn btn-sm flex-grow-1 py-2 rounded-3 fw-semibold ${method === t.id ? 'text-white' : 'btn-outline-secondary text-muted'}`}
                  style={method === t.id ? { background: 'linear-gradient(135deg, #1a237e, #3949ab)', border: 'none' } : {}}
                >
                  <i className={`${t.icon} me-1`}></i>
                  <span className="d-none d-sm-inline">{t.label}</span>
                  <span className="d-inline d-sm-none">{t.id === 'card' ? 'Card' : t.id === 'upi' ? 'UPI' : 'Banking'}</span>
                </button>
              ))}
            </div>

            {/* Card Form */}
            {method === 'card' && (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>CARD NUMBER</label>
                  <input
                    className="form-control form-control-lg rounded-3"
                    placeholder="0000 0000 0000 0000"
                    value={card.number}
                    onChange={e => setCard({ ...card, number: formatCard(e.target.value) })}
                    maxLength={19}
                    style={{ letterSpacing: '2px', fontFamily: 'monospace' }}
                  />
                </div>
                <div>
                  <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>CARDHOLDER NAME</label>
                  <input
                    className="form-control rounded-3"
                    placeholder="As printed on card"
                    value={card.name}
                    onChange={e => setCard({ ...card, name: e.target.value })}
                  />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>EXPIRY DATE</label>
                    <input
                      className="form-control rounded-3"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      maxLength={5}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>CVV</label>
                    <input
                      className="form-control rounded-3"
                      placeholder="•••"
                      type="password"
                      value={card.cvv}
                      onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
                  <i className="bi bi-shield-check text-success"></i> Visa, Mastercard, RuPay accepted
                </div>
              </div>
            )}

            {/* UPI Form */}
            {method === 'upi' && (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>UPI ID</label>
                  <input
                    className="form-control form-control-lg rounded-3"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                  />
                  {upiId && !upiId.includes('@') && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.78rem' }}>⚠ Enter a valid UPI ID with @</div>
                  )}
                </div>
                <div className="bg-light rounded-3 p-3 d-flex flex-wrap gap-2">
                  {['@okaxis', '@ybl', '@paytm', '@okicici'].map(app => (
                    <span
                      key={app}
                      className="badge bg-white border text-muted px-3 py-2 rounded-pill"
                      style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                      onClick={() => setUpiId(upiId.split('@')[0] + app)}
                    >
                      {app}
                    </span>
                  ))}
                </div>
                <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
                  <i className="bi bi-shield-check text-success"></i> Supports BHIM, GPay, PhonePe, Paytm
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {method === 'netbanking' && (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>SELECT YOUR BANK</label>
                  <select
                    className="form-select form-select-lg rounded-3"
                    value={bank}
                    onChange={e => setBank(e.target.value)}
                  >
                    <option value="">-- Choose Bank --</option>
                    {banks.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="text-muted bg-light rounded-3 p-3" style={{ fontSize: '0.82rem' }}>
                  <i className="bi bi-info-circle me-1 text-primary"></i>
                  You will be redirected to your bank's secure page to complete the payment.
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              className="btn text-white w-100 py-3 fw-bold rounded-pill mt-4 shadow-sm"
              style={{ background: isFormValid() ? 'linear-gradient(90deg, #ed6c02, #ff9800)' : '#ccc', border: 'none', transition: '0.2s' }}
              onClick={handlePay}
              disabled={!isFormValid()}
            >
              <i className="bi bi-lock-fill me-2"></i>
              Pay ₹ {amount.toLocaleString()} Securely
            </button>

            {/* Cancel */}
            <button className="btn btn-link text-secondary d-block mx-auto mt-2" onClick={onClose} style={{ fontSize: '0.85rem' }}>
              Cancel &amp; Go Back
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const Paymentdashboard = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showGateway, setShowGateway] = useState(false);

  const [mockTransactions, setMockTransactions] = useState([]);

  React.useEffect(() => {
    if (user && user.type === 'parent' && user.student) {
      const parentBankRecords = db.paymentRecords.find(r => r.studentId === user.student.id);
      if (parentBankRecords && parentBankRecords.transactions) {
        setMockTransactions(parentBankRecords.transactions);
      }
    }
  }, [user]);

  if (!user || user.type !== 'parent') {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center p-4 rounded-4 shadow-sm">
          <i className="bi bi-exclamation-triangle-fill fs-3 d-block mb-2"></i>
          <h5 className="mb-0">Please login as a parent to view this page.</h5>
        </div>
      </div>
    );
  }

  const { student } = user;

  // Called after gateway confirms payment
  const handlePaymentSuccess = () => {
    const newTxn = {
      id: `TXN00${mockTransactions.length + 1}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      amount: student.feeDue,
      type: 'Tuition Fee - Term 2',
      status: 'Paid'
    };
    setMockTransactions(prev => [...prev, newTxn]);
    setSelectedTxn(newTxn);
    setShowGateway(false);
    setShowReceipt(true);
  };

  const handleViewReceipt = (txn) => {
    setSelectedTxn(txn);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedTxn(null);
  };

  const handlePrint = () => window.print();

  // ── Receipt View ──────────────────────────────────────────────
  if (showReceipt && selectedTxn) {
    return (
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '800px', margin: '0 auto', border: 'none' }}>
          <div className="card-header text-white p-4 text-center border-0" style={{ background: 'linear-gradient(135deg, #1a237e, #0d47a1)' }}>
            <h2 className="fw-bold mb-0 text-white"><i className="bi bi-shield-check me-2"></i> Payment Receipt</h2>
            <p className="mb-0 mt-2 text-white-50">Thank you for your payment!</p>
          </div>
          <div className="card-body p-5 bg-white">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px' }}>Student Details</h6>
                <p className="mb-1 fw-bold text-dark fs-5">{student.name}</p>
                <p className="mb-1 text-secondary">Student ID: {student.id}</p>
                <p className="mb-0 text-secondary">Grade/Class: {student.grade}</p>
              </div>
              <div className="col-sm-6 text-sm-end mt-4 mt-sm-0">
                <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px' }}>Receipt Info</h6>
                <p className="mb-1"><span className="text-secondary me-2">Receipt No:</span> <span className="fw-bold text-dark">{selectedTxn.id}</span></p>
                <p className="mb-1"><span className="text-secondary me-2">Date:</span> <span className="fw-bold text-dark">{selectedTxn.date}</span></p>
                <p className="mb-0">
                  <span className="text-secondary me-2">Status:</span>
                  <span className="badge bg-success px-2 py-1"><i className="bi bi-check-circle me-1"></i>SUCCESS</span>
                </p>
              </div>
            </div>

            <div className="table-responsive mb-5 rounded-3 border">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="pt-3 pb-3 ps-4 border-0 text-muted text-uppercase" style={{ fontSize: '0.85rem' }}>Description</th>
                    <th className="pt-3 pb-3 pe-4 border-0 text-end text-muted text-uppercase" style={{ fontSize: '0.85rem' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pt-4 pb-4 ps-4 border-0 fw-semibold text-dark fs-6">{selectedTxn.type}</td>
                    <td className="pt-4 pb-4 pe-4 border-0 text-end fw-bold text-dark fs-5">₹ {selectedTxn.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-light">
                  <tr>
                    <td className="pt-3 pb-3 ps-4 border-0 fw-bold text-dark text-uppercase">Total Paid</td>
                    <td className="pt-3 pb-3 pe-4 border-0 text-end fw-bold fs-4" style={{ color: '#1a237e' }}>₹ {selectedTxn.amount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="text-center mt-5 d-print-none">
              <button className="btn btn-outline-secondary px-4 py-2 me-3 rounded-pill fw-semibold shadow-sm hover-elevate" onClick={handleCloseReceipt}>
                <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
              </button>
              <button className="btn px-4 py-2 rounded-pill fw-semibold shadow-sm hover-elevate text-white" onClick={handlePrint} style={{ backgroundColor: '#1a237e', border: 'none' }}>
                <i className="bi bi-printer me-2"></i>Print / Download
              </button>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * { visibility: hidden; }
            .card, .card * { visibility: visible; }
            .card { position: absolute; left: 0; top: 0; width: 100%; max-width: 100% !important; box-shadow: none !important; border: none !important; }
            .d-print-none { display: none !important; }
            .card-header { background: #1a237e !important; -webkit-print-color-adjust: exact; color-adjust: exact; }
            .card-header h2, .card-header p { color: white !important; }
          }
          .hover-elevate { transition: transform 0.2s; }
          .hover-elevate:hover { transform: translateY(-2px); }
        `}} />
      </div>
    );
  }

  // ── Dashboard View ────────────────────────────────────────────
  const hasPending = !mockTransactions.some(t => t.type === 'Tuition Fee - Term 2');
  const displayFeeDue = hasPending ? student.feeDue : 0;

  return (
    <div className="container mt-4 mb-5 fade-in">
      {/* Payment Gateway Modal */}
      {showGateway && (
        <PaymentGatewayModal
          amount={student.feeDue}
          student={student}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowGateway(false)}
        />
      )}

      {/* Top Header */}
      <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm mb-4 border-start border-5" style={{ borderColor: '#1a237e' }}>
        <div>
          <h3 className="mb-1 fw-bold" style={{ color: '#1a237e' }}>Fee Management</h3>
          <p className="mb-0 text-secondary">Manage and track your child's fee payments securely.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Due Card */}
        <div className="col-lg-4">
          <div className="card h-100 border-0 shadow rounded-4 overflow-hidden position-relative" style={{ background: 'linear-gradient(145deg, #ffffff, #f8f9fa)' }}>
            <div className="position-absolute top-0 end-0 p-3 opacity-25">
              <i className="bi bi-wallet2" style={{ fontSize: '6rem', color: '#1a237e' }}></i>
            </div>
            <div className="card-body p-4 p-xl-5 text-center d-flex flex-column justify-content-center position-relative z-1">
              <div className="mx-auto bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-currency-rupee fs-1" style={{ color: '#1a237e' }}></i>
              </div>
              <h6 className="text-muted fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Total Fee Due</h6>
              <h1 className="fw-bolder mb-4 display-5" style={{ color: displayFeeDue > 0 ? '#d32f2f' : '#2e7d32' }}>
                ₹ {displayFeeDue.toLocaleString()}
              </h1>
              {displayFeeDue > 0 ? (
                <button
                  onClick={() => setShowGateway(true)}
                  className="btn text-white fw-bold w-100 py-3 rounded-pill shadow hover-elevate"
                  style={{ background: 'linear-gradient(90deg, #ed6c02, #ff9800)', border: 'none' }}
                >
                  <i className="bi bi-credit-card-fill me-2"></i> Proceed to Pay
                </button>
              ) : (
                <div className="alert alert-success border-0 rounded-pill py-3 fw-semibold mb-0 shadow-sm">
                  <i className="bi bi-check-circle-fill me-2"></i> All Dues Cleared
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow rounded-4 h-100 overflow-hidden">
            <div className="card-header bg-white border-bottom border-light p-4">
              <h5 className="fw-bold mb-0" style={{ color: '#1a237e' }}><i className="bi bi-clock-history me-2 opacity-75"></i>Payment History</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="text-muted" style={{ backgroundColor: '#f8f9fa', fontSize: '0.9rem' }}>
                    <tr>
                      <th className="ps-4 py-3 fw-semibold border-0 text-uppercase">Transaction ID</th>
                      <th className="py-3 fw-semibold border-0 text-uppercase">Date</th>
                      <th className="py-3 fw-semibold border-0 text-uppercase">Fee Type</th>
                      <th className="py-3 fw-semibold border-0 text-uppercase">Amount</th>
                      <th className="py-3 fw-semibold border-0 text-uppercase">Status</th>
                      <th className="pe-4 py-3 fw-semibold border-0 text-end text-uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {mockTransactions.slice().reverse().map((txn) => (
                      <tr key={txn.id} style={{ transition: 'all 0.2s' }}>
                        <td className="ps-4 py-4 fw-bold text-dark">{txn.id}</td>
                        <td className="py-4 text-secondary">{txn.date}</td>
                        <td className="py-4 text-dark fw-medium">{txn.type}</td>
                        <td className="py-4 fw-bold text-dark">₹ {txn.amount.toLocaleString()}</td>
                        <td className="py-4">
                          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold border border-success border-opacity-25">
                            <i className="bi bi-check-circle-fill me-1 small"></i> {txn.status}
                          </span>
                        </td>
                        <td className="pe-4 py-4 text-end">
                          <button onClick={() => handleViewReceipt(txn)} className="btn btn-sm btn-light px-3 py-2 rounded-pill fw-semibold text-primary border shadow-sm btn-hover-primary">
                            <i className="bi bi-file-earmark-text me-1"></i> Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                    {hasPending && (
                      <tr className="bg-warning bg-opacity-10">
                        <td className="ps-4 py-4 fw-bold text-danger">PENDING</td>
                        <td className="py-4 text-secondary">Upcoming</td>
                        <td className="py-4 text-dark fw-medium">Tuition Fee - Term 2</td>
                        <td className="py-4 fw-bold text-danger">₹ {student.feeDue.toLocaleString()}</td>
                        <td className="py-4">
                          <span className="badge bg-warning bg-opacity-25 text-dark px-3 py-2 rounded-pill fw-semibold border border-warning">
                            <i className="bi bi-hourglass-split me-1 small"></i> Pending
                          </span>
                        </td>
                        <td className="pe-4 py-4 text-end">
                          <button
                            onClick={() => setShowGateway(true)}
                            className="btn btn-sm text-white px-3 py-2 rounded-pill fw-bold shadow-sm hover-elevate"
                            style={{ background: 'linear-gradient(90deg, #ed6c02, #ff9800)', border: 'none' }}
                          >
                            Pay Now
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .btn-hover-primary:hover { background-color: #1a237e !important; color: white !important; border-color: #1a237e !important; }
        .hover-elevate { transition: transform 0.2s; }
        .hover-elevate:hover { transform: translateY(-2px); filter: brightness(1.05); }
      `}} />
    </div>
  );
};

export default Paymentdashboard;
