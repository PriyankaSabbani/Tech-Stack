import React from 'react';

const schedule = [
  { day: 'Mon–Fri', time: '8:15 AM', stop: 'BTM Layout (Stop 3)', route: 'Route 1 – Koramangala', eta: '8:45 AM', busNo: 'KA-01-F-1234' },
];

const fullRoute = [
  { stop: 'Koramangala 4th Block', time: '7:50 AM', dist: '0 km', you: false },
  { stop: 'Koramangala 6th Block', time: '8:00 AM', dist: '2.1 km', you: false },
  { stop: 'BTM Layout (Your Stop)', time: '8:15 AM', dist: '5.3 km', you: true },
  { stop: 'HSR Layout', time: '8:25 AM', dist: '8.1 km', you: false },
  { stop: 'Silk Board', time: '8:32 AM', dist: '10.2 km', you: false },
  { stop: 'College Gate', time: '8:45 AM', dist: '12.0 km', you: false },
];

const notices = [
  { date: '2025-03-10', msg: 'Bus will be 10 minutes late tomorrow due to road maintenance near Silk Board.' },
  { date: '2025-03-05', msg: 'No bus service on March 14 (Public Holiday). Make alternate arrangements.' },
];

export default function Transport() {
  return (
    <div>
      {/* Bus Card */}
      <div style={{ background: 'linear-gradient(135deg,#0c2340,#1a3a60)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: '26px 28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 120, opacity: 0.06 }}>🚌</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Your Transport Registration</div>
            <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 22, marginTop: 8 }}>Route 1 — Koramangala</div>
            <div style={{ color: '#60a5fa', fontSize: 14, marginTop: 4 }}>🚌 Bus No: KA-01-F-1234 &nbsp;·&nbsp; Driver: Suresh Kumar</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>📞 Driver Contact: +91 98765 43210</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px 20px', textAlign: 'center' }}>
            <div style={{ color: '#34d399', fontWeight: 900, fontSize: 28 }}>✅</div>
            <div style={{ color: '#34d399', fontWeight: 800, fontSize: 14, marginTop: 4 }}>Active</div>
            <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>2024-25</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12, marginTop: 20 }}>
          {[
            ['Your Stop', 'BTM Layout'],
            ['Pickup Time', '8:15 AM'],
            ['Arrival (College)', '8:45 AM'],
            ['Annual Fee', '₹8,000'],
            ['Fee Status', 'Pending ⚠️'],
            ['Distance', '12 km'],
          ].map(([l, v]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ color: '#475569', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Route Timeline */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
          <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 18 }}>🗺️ Route Stops</div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,0.06)' }} />
            {fullRoute.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.you ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'rgba(255,255,255,0.06)', border: s.you ? '2px solid #60a5fa' : '2px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s.you ? 14 : 10, color: s.you ? '#fff' : '#475569', fontWeight: 800, flexShrink: 0, zIndex: 1 }}>
                  {s.you ? '👤' : (i + 1)}
                </div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ color: s.you ? '#60a5fa' : '#f1f5f9', fontWeight: s.you ? 800 : 600, fontSize: 13 }}>{s.stop}</div>
                  <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>⏰ {s.time} &nbsp;·&nbsp; {s.dist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live & Notices */}
        <div>
          {/* Live Status */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📡 Today's Status</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399', marginTop: 4, flexShrink: 0, boxShadow: '0 0 8px #34d399' }} />
              <div>
                <div style={{ color: '#34d399', fontWeight: 700, fontSize: 13 }}>Bus is ON TIME</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Last updated: 8:08 AM today</div>
              </div>
            </div>
            {[['Departed', 'Koramangala 4th Block', '7:52 AM'], ['Picked Up', 'Koramangala 6th Block', '8:01 AM'], ['Expected Next', 'BTM Layout', '8:15 AM']].map(([status, stop, time]) => (
              <div key={stop} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 6, alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 600 }}>{stop}</div>
                  <div style={{ color: '#475569', fontSize: 11 }}>{status}</div>
                </div>
                <div style={{ color: '#60a5fa', fontWeight: 800, fontSize: 12 }}>{time}</div>
              </div>
            ))}
          </div>
          {/* Notices */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
            <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📢 Transport Notices</div>
            {notices.map((n, i) => (
              <div key={i} style={{ padding: '12px 14px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 10, marginBottom: 10 }}>
                <div style={{ color: '#fbbf24', fontSize: 11, fontWeight: 700, marginBottom: 5 }}>📅 {n.date}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{n.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Schedule */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📅 Weekly Schedule</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Days', 'Pickup Time', 'Your Stop', 'Route', 'ETA — College', 'Bus Number'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '14px 16px', color: '#f1f5f9', fontWeight: 700 }}>{s.day}</td>
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 800 }}>{s.time}</td>
                  <td style={{ padding: '14px 16px', color: '#60a5fa', fontWeight: 600 }}>{s.stop}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{s.route}</td>
                  <td style={{ padding: '14px 16px', color: '#fbbf24', fontWeight: 700 }}>{s.eta}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontFamily: 'monospace' }}>{s.busNo}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(239,68,68,0.05)' }}>
                <td style={{ padding: '14px 16px', color: '#f87171', fontWeight: 700 }}>Saturday</td>
                <td colSpan={5} style={{ padding: '14px 16px', color: '#475569', fontSize: 13 }}>No Service on Saturdays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
