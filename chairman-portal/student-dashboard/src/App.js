import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import Attendance from './pages/Attendance';
import Results from './pages/Results';
import FeeDetails from './pages/FeeDetails';
import Transport from './pages/Transport';
import Library from './pages/Library';
import Notifications from './pages/Notifications';
import Courses from './pages/Courses';
import { getStudent } from './data/db';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { key: 'courses', label: 'Courses', icon: '📚' },
  { key: 'materials', label: 'Study Materials', icon: '📖' },
  { key: 'attendance', label: 'Attendance', icon: '✅' },
  { key: 'results', label: 'Results & Grades', icon: '🏆' },
  { key: 'fees', label: 'Fee Details', icon: '💳' },
  { key: 'transport', label: 'Transport', icon: '🚌' },
  { key: 'library', label: 'Library', icon: '🏛️' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [notifCount] = useState(3);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data from db.json
    getStudent().then(data => {
      setStudent(data);
    }).catch(err => {
      console.error('Error loading student data:', err);
    });
  }, []);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    if (!student) {
      return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }
    switch (page) {
      case 'dashboard': return <Dashboard student={student} setPage={setPage} />;
      case 'courses': return <Courses student={student} />;
      case 'materials': return <StudyMaterials />;
      case 'attendance': return <Attendance />;
      case 'results': return <Results />;
      case 'fees': return <FeeDetails student={student} />;
      case 'transport': return <Transport />;
      case 'library': return <Library />;
      case 'notifications': return <Notifications />;
      default: return <Dashboard student={student} setPage={setPage} />;
    }
  };

  const S = {
    app: { display: 'flex', minHeight: '100vh', background: '#0d0f1a' },
    sidebar: {
      width: collapsed ? 70 : 248,
      background: 'linear-gradient(180deg, #0f1221 0%, #111827 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0,
      transition: 'width 0.25s cubic-bezier(.4,0,.2,1)',
      zIndex: 200, overflow: 'hidden',
    },
    logoRow: {
      padding: collapsed ? '20px 0' : '22px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 12,
      justifyContent: collapsed ? 'center' : 'flex-start',
    },
    logoOrb: {
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, fontWeight: 900, color: '#fff',
    },
    logoText: { lineHeight: 1 },
    logoMain: { color: '#f1f5f9', fontWeight: 800, fontSize: 15 },
    logoSub: { color: '#475569', fontSize: 10, marginTop: 2 },
    toggleBtn: {
      background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer',
      padding: '8px 0', color: '#64748b', fontSize: 12, textAlign: 'center',
      transition: 'color 0.2s',
    },
    nav: { flex: 1, overflowY: 'auto', padding: '10px 0' },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center',
      gap: collapsed ? 0 : 12,
      padding: collapsed ? '13px 0' : '12px 18px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      cursor: 'pointer', border: 'none',
      width: '100%', textAlign: 'left',
      background: active ? 'linear-gradient(90deg,rgba(59,130,246,.18),rgba(59,130,246,.06))' : 'transparent',
      borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
      color: active ? '#60a5fa' : '#64748b',
      fontSize: 13, fontWeight: active ? 700 : 500,
      transition: 'all 0.18s',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }),
    navIcon: { fontSize: 17, flexShrink: 0 },
    userCard: {
      padding: collapsed ? '14px 0' : '16px 18px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 10,
      justifyContent: collapsed ? 'center' : 'flex-start',
    },
    avatar: {
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: 13,
    },
    main: {
      flex: 1,
      marginLeft: collapsed ? 70 : 248,
      transition: 'margin-left 0.25s cubic-bezier(.4,0,.2,1)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
    },
    topbar: {
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,15,26,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    topbarTitle: { color: '#f1f5f9', fontWeight: 800, fontSize: 18 },
    topbarSub: { color: '#475569', fontSize: 12, marginTop: 2 },
    content: { flex: 1, padding: '28px', overflowY: 'auto' },
  };

  const currentNav = NAV.find(n => n.key === page) || NAV[0];

  return (
    <div style={S.app}>
      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.logoRow}>
          <div style={S.logoOrb}>E</div>
          {!collapsed && <div style={S.logoText}>
            <div style={S.logoMain}>EduPortal</div>
            <div style={S.logoSub}>Student Portal</div>
          </div>}
        </div>
        <button style={S.toggleBtn} onClick={() => setCollapsed(c => !c)}>
          {collapsed ? '▶' : '◀'}
        </button>
        <nav style={S.nav}>
          {NAV.map(n => (
            <button key={n.key} style={S.navItem(page === n.key)} onClick={() => setPage(n.key)}>
              <span style={S.navIcon}>{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
              {!collapsed && n.key === 'notifications' && notifCount > 0 && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifCount}</span>
              )}
            </button>
          ))}
        </nav>
        {/* Logout */}
        <button onClick={() => setLoggedIn(false)} style={{ ...S.navItem(false), padding: collapsed ? '13px 0' : '12px 18px', color: '#f87171', borderTop: '1px solid rgba(255,255,255,0.06)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <span style={S.navIcon}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
        <div style={S.userCard}>
          <div style={S.avatar}>{student ? student.avatar : '...'}</div>
          {!collapsed && <div>
            <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>{student ? student.name : 'Loading...'}</div>
            <div style={{ color: '#475569', fontSize: 10, marginTop: 3 }}>{student ? student.id : '...'}</div>
          </div>}
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        <div style={S.topbar}>
          <div>
            <div style={S.topbarTitle}>{currentNav.icon} {currentNav.label}</div>
            <div style={S.topbarSub}>College Management System — Student Portal</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', padding: '6px 14px', borderRadius: 20, fontSize: 12, color: '#60a5fa', fontWeight: 600 }}>
              📅 {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <button onClick={() => setPage('notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              {notifCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifCount}</span>}
            </button>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
              {student ? student.avatar : '...'}
            </div>
          </div>
        </div>
        <div style={S.content}>{renderPage()}</div>
      </main>
    </div>
  );
}
