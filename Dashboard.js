import React, { useState, useEffect } from 'react';
import { getUpcomingAssignments, getRecentResults, getQuickLinks, getDashboardStats, getTodaySchedule } from '../data/db';

const card = (icon, label, value, sub, c1, c2) => (
  <div style={{ background: `linear-gradient(135deg,${c1},${c2})`, borderRadius: 16, padding: 22, position: 'relative', overflow: 'hidden', flex: '1 1 170px', minWidth: 150 }}>
    <div style={{ position: 'absolute', top: -18, right: -18, fontSize: 72, opacity: 0.12 }}>{icon}</div>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginTop: 5 }}>{label}</div>
    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{sub}</div>
  </div>
);

const S = {
  sec: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22, marginBottom: 20 },
  secTitle: { color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 },
  tag: (c, bg) => ({ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: c, background: bg }),
};

export default function Dashboard({ student, setPage }) {
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [stats, setStats] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getUpcomingAssignments(),
      getRecentResults(),
      getQuickLinks(),
      getDashboardStats(),
      getTodaySchedule()
    ])
      .then(([assignments, results, links, dashboardStats, schedule]) => {
        setUpcomingAssignments(assignments);
        setRecentResults(results);
        setQuickLinks(links);
        setStats(dashboardStats);
        setTodaySchedule(schedule);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading dashboard data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }
  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg,#0f2a4a,#1e3a6f)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: '28px 30px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(59,130,246,0.08)' }} />
        <div style={{ position: 'absolute', right: 40, top: 20, fontSize: 80, opacity: 0.07 }}>🎓</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
            {student.avatar}
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}>Good Morning 👋</div>
            <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 22 }}>{student.name}</div>
            <div style={{ color: '#60a5fa', fontSize: 13, marginTop: 3 }}>{student.course} · {student.semester} · {student.rollNo}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['CGPA', stats.cgpa], ['Attendance', stats.avgAttendance], ['Due Fees', stats.dueFees]].map(([l, v]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 16px', textAlign: 'center' }}>
                <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 18 }}>{v}</div>
                <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
        {card('📚', 'Enrolled Courses', stats.enrolledCourses, 'Current semester', '#1d4ed8', '#3b82f6')}
        {card('✅', 'Avg Attendance', stats.avgAttendance, '3 subjects below 75%', '#059669', '#10b981')}
        {card('📝', 'Assignments Due', stats.assignmentsDue, 'Submit before deadline', '#b45309', '#f59e0b')}
        {card('🏆', 'Current CGPA', stats.cgpa, 'Excellent performance', '#7c3aed', '#8b5cf6')}
        {card('📖', 'Library Books', stats.libraryBooks, 'Books borrowed', '#0e7490', '#06b6d4')}
      </div>

      {/* Quick Nav */}
      <div style={S.sec}>
        <div style={S.secTitle}>⚡ Quick Access</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 12 }}>
          {quickLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)} style={{ background: `${l.color}14`, border: `1px solid ${l.color}30`, borderRadius: 14, padding: '18px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.18s', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${l.color}25`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${l.color}14`; e.currentTarget.style.transform = ''; }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{l.icon}</div>
              <div style={{ color: l.color, fontWeight: 700, fontSize: 12 }}>{l.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Upcoming Assignments */}
        <div style={S.sec}>
          <div style={S.secTitle}>📝 Upcoming Assignments</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcomingAssignments.map((a, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{a.title}</div>
                  <div style={{ color: '#475569', fontSize: 11, marginTop: 3 }}>{a.subject} · 📅 {a.due}</div>
                </div>
                <span style={S.tag(a.status === 'Submitted' ? '#34d399' : '#fbbf24', a.status === 'Submitted' ? 'rgba(52,211,153,0.12)' : 'rgba(251,191,36,0.12)')}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div style={S.sec}>
          <div style={S.secTitle}>🏆 Recent Results</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentResults.map((r, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{r.subject}</div>
                  <div style={{ marginTop: 6, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, width: 160 }}>
                    <div style={{ height: '100%', width: `${r.marks}%`, background: r.marks >= 90 ? '#34d399' : r.marks >= 75 ? '#60a5fa' : '#fbbf24', borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16 }}>{r.marks}/{r.total}</div>
                  <span style={S.tag(r.grade.includes('+') ? '#34d399' : '#60a5fa', r.grade.includes('+') ? 'rgba(52,211,153,0.12)' : 'rgba(96,165,250,0.12)')}>{r.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={S.sec}>
        <div style={S.secTitle}>🗓️ Today's Classes — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {todaySchedule.map((c, i) => (
            <div key={i} style={{ flex: '0 0 170px', background: `${c.color}12`, border: `1px solid ${c.color}30`, borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${c.color}` }}>
              <div style={{ color: c.color, fontWeight: 800, fontSize: 12 }}>{c.time}</div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, marginTop: 6 }}>{c.sub}</div>
              <div style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>📍 {c.room}</div>
              <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>👤 {c.faculty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
