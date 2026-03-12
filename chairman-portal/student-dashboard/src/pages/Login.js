import React, { useState, useEffect } from 'react';
import { getLoginCredentials } from '../data/db';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    // Fetch login credentials from db.json
    getLoginCredentials().then(creds => {
      setCredentials(creds);
    }).catch(err => {
      console.error('Error loading credentials:', err);
    });
  }, []);

  const handleLogin = () => {
    setError('');
    if (!form.id || !form.password) { setError('Please enter your Student ID and Password.'); return; }
    if (!credentials) { setError('Loading credentials...'); return; }
    setLoading(true);
    setTimeout(() => {
      if (form.id === credentials.studentId && form.password === credentials.password) {
        onLogin();
      } else {
        setError(`Invalid Student ID or Password. Try ${credentials.studentId} / ${credentials.password}`);
        setLoading(false);
      }
    }, 1200);
  };

  const S = {
    root: {
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0d0f1a',
      position: 'relative', overflow: 'hidden',
    },
    bg1: { position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', top: '-150px', left: '-100px', pointerEvents: 'none' },
    bg2: { position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', bottom: '-100px', right: '-80px', pointerEvents: 'none' },
    grid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' },
    card: {
      position: 'relative', zIndex: 10,
      width: '100%', maxWidth: 420,
      background: 'rgba(15,18,33,0.95)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 24,
      padding: '40px 36px',
      boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(20px)',
    },
    badge: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
      borderRadius: 20, padding: '5px 14px', marginBottom: 24,
      fontSize: 12, color: '#60a5fa', fontWeight: 600,
    },
    orb: {
      width: 52, height: 52, borderRadius: 14, marginBottom: 20,
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 26,
    },
    h1: { fontSize: 26, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: 6 },
    sub: { color: '#475569', fontSize: 13, marginBottom: 32 },
    label: { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8, display: 'block' },
    inputWrap: { position: 'relative', marginBottom: 18 },
    input: {
      width: '100%', padding: '13px 16px', borderRadius: 12,
      background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)',
      color: '#f1f5f9', fontSize: 14, outline: 'none',
      transition: 'border-color 0.2s', boxSizing: 'border-box',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    eyeBtn: { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: 16 },
    forgotRow: { display: 'flex', justifyContent: 'flex-end', marginTop: -6, marginBottom: 24 },
    forgot: { color: '#3b82f6', fontSize: 12, cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none' },
    btn: {
      width: '100%', padding: '14px', borderRadius: 12, border: 'none',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer',
      transition: 'opacity 0.2s, transform 0.1s',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
    },
    error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '10px 14px', color: '#f87171', fontSize: 13, marginTop: 14, textAlign: 'center' },
    demo: { marginTop: 20, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 10, textAlign: 'center' },
    demoText: { color: '#475569', fontSize: 12 },
    demoVal: { color: '#60a5fa', fontWeight: 700 },
    divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
    line: { flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' },
    divTxt: { color: '#334155', fontSize: 11 },
  };

  return (
    <div style={S.root}>
      <div style={S.bg1} /><div style={S.bg2} /><div style={S.grid} />
      <div style={S.card}>
        <div style={S.orb}>🎓</div>
        <div style={S.badge}>🏛️ EduPortal CMS</div>
        <h1 style={S.h1}>Welcome back,<br /><em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Student!</em></h1>
        <p style={S.sub}>Sign in to access your personalized dashboard</p>

        <div style={S.inputWrap}>
          <label style={S.label}>Student ID</label>
          <input
            style={S.input}
            placeholder="e.g. STU001"
            value={form.id}
            onChange={e => setForm({ ...form, id: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <div style={S.inputWrap}>
          <label style={S.label}>Password</label>
          <input
            style={{ ...S.input, paddingRight: 44 }}
            type={showPass ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          <button style={S.eyeBtn} onClick={() => setShowPass(s => !s)}>{showPass ? '🙈' : '👁️'}</button>
        </div>
        <div style={S.forgotRow}>
          <button style={S.forgot}>Forgot Password?</button>
        </div>
        <button style={{ ...S.btn, opacity: loading ? 0.7 : 1 }} onClick={handleLogin} disabled={loading}>
          {loading ? '⏳ Signing In...' : '🚀 Sign In to Dashboard'}
        </button>
        {error && <div style={S.error}>⚠️ {error}</div>}
        <div style={S.divider}><div style={S.line} /><span style={S.divTxt}>DEMO CREDENTIALS</span><div style={S.line} /></div>
        <div style={S.demo}>
          <div style={S.demoText}>Student ID: <span style={S.demoVal}>{credentials ? credentials.studentId : 'Loading...'}</span> &nbsp;|&nbsp; Password: <span style={S.demoVal}>{credentials ? credentials.password : 'Loading...'}</span></div>
        </div>
      </div>
    </div>
  );
}
