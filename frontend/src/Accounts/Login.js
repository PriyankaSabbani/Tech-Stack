// Simple Login Page Component
import { useState } from "react";

const LoginPage = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '40px', width: '360px', maxWidth: '90%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 15px' }}>🏛️</div>
          <h2 style={{ margin: '0 0 5px', color: '#0f172a', fontWeight: 800 }}>EduFinance</h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>College Management System — Accounts</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="admin@admin.com"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="••••••"
            />
          </div>
          {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;