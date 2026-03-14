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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    getStudent().then(data => {
      setStudent(data);
    }).catch(err => {
      console.error('Error loading student data:', err);
    });
  }, []);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    if (!student) {
      return <div style={{ color: '#6b7280', textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }
    switch (page) {
      case 'dashboard': return <Dashboard student={student} setPage={setPage} />; // Use Dashboard.responsive.js
      case 'courses': return <Courses student={student} />;
      case 'materials': return <StudyMaterials />;
      case 'attendance': return <Attendance />;
      case 'results': return <Results />;
      case 'fees': return <FeeDetails student={student} />;
      case 'transport': return <Transport />; // Use Transport.responsive.js
      case 'library': return <Library />;
      case 'notifications': return <Notifications />;
      default: return <Dashboard student={student} setPage={setPage} />;
    }
  };

  const S = {
    app: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' },
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 250,
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.25s ease, visibility 0.25s ease',
      ...(isMobile && !collapsed && { opacity: 1, visibility: 'visible' }),
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: isMobile ? '280px' : (collapsed ? 70 : 248),
      background: '#ffffff',
      borderRight: isMobile ? 'none' : '1px solid #e5e7eb',
      boxShadow: isMobile ? '0 0 20px rgba(0,0,0,0.1)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 300,
      transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
      transform: isMobile ? (collapsed ? 'translateX(-100%)' : 'translateX(0)') : 'translateX(0)',
      overflow: 'hidden',
    },
    logoRow: {
      padding: ((collapsed && !isMobile) ? '20px 0' : '22px 20px'),
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      justifyContent: ((collapsed && !isMobile) ? 'center' : 'flex-start'),
    },
    logoOrb: {
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, fontWeight: 900, color: '#fff',
    },
    logoText: { lineHeight: 1 },
    logoMain: { color: '#111827', fontWeight: 800, fontSize: 15 },
    logoSub: { color: '#6b7280', fontSize: 10, marginTop: 2 },
    toggleBtn: {
      background: 'rgba(0,0,0,0.05)',
      border: 'none', cursor: 'pointer',
      padding: '8px 12px', color: '#6b7280', fontSize: 16,
      borderRadius: 8,
      transition: 'all 0.2s',
      marginLeft: 'auto',
    },
    nav: { flex: 1, overflowY: 'auto', padding: '10px 0' },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center',
      gap: ((collapsed && !isMobile) ? 0 : 12),
      padding: ((collapsed && !isMobile) ? '13px 0' : '12px 18px'),
      justifyContent: ((collapsed && !isMobile) ? 'center' : 'flex-start'),
      cursor: 'pointer', border: 'none',
      width: '100%', textAlign: 'left',
      background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
      borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
      color: active ? '#2563eb' : '#6b7280',
      fontSize: 13, fontWeight: active ? 700 : 500,
      transition: 'all 0.18s',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }),
    navIcon: { fontSize: 17, flexShrink: 0 },
    userCard: {
      padding: ((collapsed && !isMobile) ? '14px 0' : '16px 18px'),
      borderTop: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center', gap: 10,
      justifyContent: ((collapsed && !isMobile) ? 'center' : 'flex-start'),
    },
    avatar: {
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: 13,
    },
    main: {
      flex: 1,
      marginLeft: isMobile ? 0 : (collapsed ? 70 : 248),
      transition: 'margin-left 0.25s cubic-bezier(.4,0,.2,1)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      backgroundColor: '#f8fafc',
    },
    topbar: {
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e5e7eb',
      padding: (isMobile ? '12px 16px' : '14px 28px'),
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    hamburger: {
      background: 'none', border: 'none', fontSize: 24, color: '#374151',
      cursor: 'pointer', padding: 4, borderRadius: 4,
      display: isMobile ? 'flex' : 'none',
      width: 40, height: 40,
      alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.2s',
    },
    topbarTitle: {
      color: '#111827', fontWeight: 800,
      fontSize: (isMobile ? 16 : 18),
      display: (isMobile ? 'flex' : 'block'),
      flexDirection: 'column',
    },
    topbarSub: { color: '#6b7280', fontSize: 11, marginTop: 2 },
    content: { flex: 1, padding: (isMobile ? '16px' : '28px'), overflowY: 'auto' },
  };

  const currentNav = NAV.find(n => n.key === page) || NAV[0];
  // hamburgerIcon removed - now static '☰' for mobile open

  return (
    <>
      <button
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 250,
          opacity: isMobile && !collapsed ? 1 : 0,
          visibility: isMobile && !collapsed ? 'visible' : 'hidden',
          transition: 'opacity 0.25s ease, visibility 0.25s ease',
          border: 'none',
        }}
        onClick={() => setCollapsed(true)}
      />
      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.logoRow}>
          <div style={S.logoOrb}>
            <button style={S.toggleBtn} onClick={() => setCollapsed(!collapsed)} title="Close menu">
              ☰
            </button>
          </div>
          {!collapsed && (
            <div>
              <div style={S.logoText}>
                <div style={S.logoMain}>EduPortal</div>
                <div style={S.logoSub}>Student Portal</div>
              </div>

            </div>
          )}
          {!collapsed && (
            <button style={S.toggleBtn} onClick={() => setCollapsed(c => !c)} title="Close menu">
              ✕
            </button>
          )}
        </div>
        <nav style={S.nav}>
          {NAV.map(n => (
            <button key={n.key} style={S.navItem(page === n.key)} onClick={() => { setPage(n.key); if (isMobile) setCollapsed(true); }}>
              <span style={S.navIcon}>{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
              {n.key === 'notifications' && notifCount > 0 && !collapsed && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifCount}</span>
              )}
            </button>

          ))}
        </nav>
        <button onClick={() => { setLoggedIn(false); if (isMobile) setCollapsed(true); }} style={{
          ...S.navItem(false),
          padding: (collapsed && !isMobile) ? '13px 0' : '12px 18px',
          color: '#ef4444', borderTop: '1px solid #e5e7eb',
          justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start'
        }}>
          <span style={S.navIcon}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
        <div style={S.userCard}>
          <div style={S.avatar}>{student ? student.avatar : '...'}</div>
          {!collapsed && <div>
            <div style={{ color: '#111827', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>{student ? student.name : 'Loading...'}</div>
            <div style={{ color: '#6b7280', fontSize: 10, marginTop: 3 }}>{student ? student.id : '...'}</div>
          </div>}
        </div>
      </aside>
      {/* MAIN */}
      <main style={S.main}>
        <div style={S.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={S.hamburger} onClick={() => setCollapsed(c => !c)} title="Open menu">
              ☰
            </button>
            <div style={S.topbarTitle}>
              <div>{currentNav.icon} {currentNav.label}</div>
              <div style={S.topbarSub}>College Management System — Student Portal</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
              padding: '6px 14px', borderRadius: 20, fontSize: 12, color: '#2563eb', fontWeight: 600
            }}>
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
    </>
  );
}
