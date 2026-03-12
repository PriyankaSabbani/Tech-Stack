import React, { useState, useEffect } from 'react';
import { getNotifications } from '../data/db';

const typeLabels = { All: 'All', fee: 'Fee', exam: 'Exam', attendance: 'Attendance', material: 'Study', result: 'Results', general: 'General', library: 'Library' };

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then(data => {
        setNotifs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading notifications:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const filtered = notifs.filter(n => filter === 'All' || n.type === filter);
  const unread = notifs.filter(n => !n.read).length;

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const deleteNotif = (id) => setNotifs(ns => ns.filter(n => n.id !== id));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, color: '#f1f5f9', fontWeight: 900, fontSize: 20 }}>
            🔔 Notifications {unread > 0 && <span style={{ background: '#ef4444', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: 13, fontWeight: 800, marginLeft: 8 }}>{unread}</span>}
          </h2>
          <p style={{ margin: '4px 0 0', color: '#475569', fontSize: 13 }}>Stay updated with announcements and alerts</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} style={{ padding: '9px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            ✓ Mark All Read
          </button>
        )}
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 24 }}>
        {[
          ['Total', notifs.length, '#60a5fa'],
          ['Unread', unread, '#f87171'],
          ['Warnings', notifs.filter(n => ['fee', 'attendance', 'library'].includes(n.type) && !n.read).length, '#fbbf24'],
        ].map(([l, v, c]) => (
          <div key={l} style={{ background: `${c}12`, border: `1px solid ${c}25`, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {Object.entries(typeLabels).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: filter === key ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'rgba(255,255,255,0.05)', color: filter === key ? '#fff' : '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {label} {key === 'All' ? `(${notifs.length})` : `(${notifs.filter(n => n.type === key).length})`}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#475569' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>No notifications in this category</div>
          </div>
        )}
        {filtered.map(n => (
          <div key={n.id} style={{ background: n.read ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', border: `1px solid ${n.read ? 'rgba(255,255,255,0.06)' : `${n.color}30`}`, borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'all 0.2s' }}>
            {/* Icon */}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${n.color}15`, border: `1px solid ${n.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ color: '#f1f5f9', fontWeight: n.read ? 600 : 800, fontSize: 14 }}>{n.title}</div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0 }} />}
                </div>
                <div style={{ color: '#334155', fontSize: 11, whiteSpace: 'nowrap', flexShrink: 0 }}>{n.time}</div>
              </div>
              <div style={{ color: n.read ? '#475569' : '#94a3b8', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{n.msg}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#64748b', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>✓ Mark Read</button>
                )}
                <button onClick={() => deleteNotif(n.id)} style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.06)', color: '#f87171', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>🗑 Dismiss</button>
                <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: n.color, background: `${n.color}12` }}>{typeLabels[n.type]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
