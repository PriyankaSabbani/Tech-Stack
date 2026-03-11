import React, { useState } from 'react';
import Dashboard from './Accounts/Dashboard';
import FeeCollection from './Accounts/FeeCollection';
import FeeStructure from './Accounts/FeeStructure';
import PaymentReports from './Accounts/PaymentReports';
import Expenses from './Accounts/Expenses';
import SalaryManagement from './Accounts/SalaryManagement';
import TransportFees from './Accounts/TransportFees';
import Scholarships from './Accounts/Scholarships';
import Receipt from './Accounts/Receipt';
import StudentLedger from './Accounts/StudentLedger';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'feeCollection', label: 'Fee Collection', icon: '💰' },
  { key: 'feeStructure', label: 'Fee Structure', icon: '📋' },
  { key: 'paymentReports', label: 'Payment Reports', icon: '📈' },
  { key: 'expenses', label: 'Expenses', icon: '💸' },
  { key: 'salary', label: 'Salary Management', icon: '👔' },
  { key: 'transport', label: 'Transport Fees', icon: '🚌' },
  { key: 'scholarships', label: 'Scholarships', icon: '🎓' },
  { key: 'receipt', label: 'Receipt Generator', icon: '🧾' },
  { key: 'ledger', label: 'Student Ledger', icon: '📒' },
];

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (active) {
      case 'dashboard': return <Dashboard />;
      case 'feeCollection': return <FeeCollection />;
      case 'feeStructure': return <FeeStructure />;
      case 'paymentReports': return <PaymentReports />;
      case 'expenses': return <Expenses />;
      case 'salary': return <SalaryManagement />;
      case 'transport': return <TransportFees />;
      case 'scholarships': return <Scholarships />;
      case 'receipt': return <Receipt />;
      case 'ledger': return <StudentLedger />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Nunito', sans-serif", background: '#f0f4ff' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '260px' : '70px',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 60%, #0f2744 100%)',
        transition: 'width 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
        zIndex: 100,
        position: 'fixed', top: 0, left: 0, bottom: 0, overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🏛️</div>
          {sidebarOpen && <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '15px', lineHeight: 1 }}>EduFinance</div>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '3px' }}>College CMS</div>
          </div>}
        </div>
        {/* Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '10px 16px', textAlign: sidebarOpen ? 'right' : 'center', fontSize: '16px', transition: '0.2s' }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => setActive(item.key)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
              padding: sidebarOpen ? '12px 20px' : '12px', justifyContent: sidebarOpen ? 'flex-start' : 'center',
              background: active === item.key ? 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(59,130,246,0.1))' : 'transparent',
              border: 'none', borderLeft: active === item.key ? '3px solid #3b82f6' : '3px solid transparent',
              color: active === item.key ? '#60a5fa' : '#94a3b8', cursor: 'pointer',
              fontSize: '13.5px', fontWeight: active === item.key ? 700 : 500,
              transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif"
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        {sidebarOpen && <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>AC</div>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700 }}>Accounts Admin</div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>admin@college.edu</div>
            </div>
          </div>
        </div>}
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '260px' : '70px', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Topbar */}
        <div style={{ background: '#fff', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              {navItems.find(n => n.key === active)?.icon} {navItems.find(n => n.key === active)?.label}
            </h1>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>College Management System — Accounts Department</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              📅 {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>AC</div>
          </div>
        </div>
        {/* Page */}
        <div style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
