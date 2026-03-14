import React, { useState, useEffect } from 'react';
import { getUpcomingAssignments, getRecentResults, getQuickLinks, getDashboardStats, getTodaySchedule } from '../data/db';

const card = (icon, label, value, sub, c1, c2) => (
    <div style={{
        background: `linear-gradient(135deg,${c1},${c2})`,
        borderRadius: 16,
        padding: '20px 16px',
        position: 'relative',
        overflow: 'hidden',
        flex: '1 1 calc(50% - 7px)',
        minWidth: '140px',
        marginBottom: 8,
        '@media (max-width: 480px)': { flex: '1 1 100%', marginBottom: 8 }
    }}>
        <div style={{ position: 'absolute', top: -18, right: -18, fontSize: 48, opacity: 0.12 }}>{icon}</div>
        <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{sub}</div>
    </div>
);

const S = {
    sec: {
        background: 'rgba(248,250,252,0.6)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    secTitle: {
        color: '#111827',
        fontWeight: 800,
        fontSize: 15,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8
    },
    tag: (c, bg) => ({
        padding: '3px 12px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        color: c,
        background: bg
    }),
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
        return <div style={{ color: '#6b7280', textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <div>
            {/* Welcome Banner */}
            <div style={{
                background: 'linear-gradient(135deg,#3b82f6,#1e40af)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 20,
                padding: '24px 24px',
                marginBottom: 24,
                position: 'relative',
                overflow: 'hidden',
                '@media (max-width: 640px)': { padding: '20px 16px' }
            }}>
                <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', right: 20, top: 10, fontSize: 64, opacity: 0.08 }}>🎓</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18, flexShrink: 0, backdropFilter: 'blur(10px)' }}>
                        {student.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600 }}>Good Morning 👋</div>
                        <div style={{ color: '#fff', fontWeight: 900, fontSize: 20 }}> {student.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>{student.course} · {student.semester} · {student.rollNo}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {[['CGPA', stats.cgpa], ['Attendance', stats.avgAttendance], ['Due', `₹${stats.dueFees}`]].map(([l, v]) => (
                            <div key={l} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 12px', textAlign: 'center', minWidth: 80 }}>
                                <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{v}</div>
                                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 700 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
                {card('📚', 'Courses', stats.enrolledCourses, 'Enrolled', '#3b82f6', '#1d4ed8')}
                {card('✅', 'Attendance', stats.avgAttendance, 'Average', '#10b981', '#059669')}
                {card('📝', 'Due', stats.assignmentsDue, 'Assignments', '#f59e0b', '#b45309')}
                {card('🏆', 'CGPA', stats.cgpa, 'Current', '#8b5cf6', '#7c3aed')}
                {card('📖', 'Books', stats.libraryBooks, 'Library', '#06b6d4', '#0e7490')}
            </div>

            {/* Quick Nav */}
            <div style={S.sec}>
                <div style={S.secTitle}>⚡ Quick Access</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 12 }}>
                    {quickLinks.map(l => (
                        <button key={l.key} onClick={() => setPage(l.key)} style={{
                            background: `${l.color}12`,
                            border: `1px solid ${l.color}20`,
                            borderRadius: 14,
                            padding: '16px 12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.18s ease',
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${l.color}20`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = `${l.color}12`; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>{l.icon}</div>
                            <div style={{ color: l.color, fontWeight: 700, fontSize: 11 }}>{l.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
                {/* Upcoming Assignments */}
                <div style={S.sec}>
                    <div style={S.secTitle}>📝 Upcoming Assignments</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {upcomingAssignments.slice(0, 4).map((a, i) => (
                            <div key={i} style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.04)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: 13 }}>{a.title}</div>
                                    <div style={{ color: '#6b7280', fontSize: 11, marginTop: 3 }}>{a.subject} · 📅 {a.due}</div>
                                </div>
                                <span style={S.tag(a.status === 'Submitted' ? '#10b981' : '#f59e0b', a.status === 'Submitted' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)')}>
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
                        {recentResults.slice(0, 4).map((r, i) => (
                            <div key={i} style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.04)', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: 13 }}>{r.subject}</div>
                                    <div style={{ marginTop: 6, height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3, width: '100%', maxWidth: '140px' }}>
                                        <div style={{ height: '100%', width: `${r.marks}%`, background: r.marks >= 90 ? '#10b981' : r.marks >= 75 ? '#3b82f6' : '#f59e0b', borderRadius: 3 }} />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ color: '#111827', fontWeight: 800, fontSize: 15 }}>{r.marks}/{r.total}</div>
                                    <span style={S.tag(r.grade.includes('+') ? '#10b981' : '#3b82f6', r.grade.includes('+') ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)')}>{r.grade}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Today's Schedule */}
            <div style={S.sec}>
                <div style={S.secTitle}>🗓️ Today's Classes — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
                    {todaySchedule.map((c, i) => (
                        <div key={i} style={{
                            flex: '0 0 160px',
                            background: `${c.color}08`,
                            border: `1px solid ${c.color}20`,
                            borderRadius: 12,
                            padding: '14px 12px',
                            borderTop: `3px solid ${c.color}`,
                            minWidth: 150
                        }}>
                            <div style={{ color: c.color, fontWeight: 800, fontSize: 11 }}>{c.time}</div>
                            <div style={{ color: '#111827', fontWeight: 700, fontSize: 12, marginTop: 4 }}>{c.sub}</div>
                            <div style={{ color: '#6b7280', fontSize: 10, marginTop: 4 }}>📍 {c.room}</div>
                            <div style={{ color: '#6b7280', fontSize: 10, marginTop: 2 }}>👤 {c.faculty}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
