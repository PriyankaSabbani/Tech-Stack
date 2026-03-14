import React, { useState, useEffect } from 'react';
import { getTransportSchedule, getTransportRoute, getTransportNotices, getTransportDetails } from '../data/db';

export default function Transport() {
  const [schedule, setSchedule] = useState([]);
  const [fullRoute, setFullRoute] = useState([]);
  const [notices, setNotices] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTransportSchedule(), getTransportRoute(), getTransportNotices(), getTransportDetails()])
      .then(([scheduleData, routeData, noticesData, detailsData]) => {
        setSchedule(scheduleData);
        setFullRoute(routeData);
        setNotices(noticesData);
        setDetails(detailsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading transport data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !details) {
    return <div style={{ color: '#6b7280', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Bus Card */}
      <div style={{
        background: 'linear-gradient(135deg,#3b82f6,#1e40af)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: 20,
        padding: '24px 20px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
        color: '#fff'
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 90, opacity: 0.08 }}>🚌</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9, marginBottom: 6, textTransform: 'uppercase' }}>Your Transport</div>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>{details.route}</div>
            <div style={{ fontSize: 12, marginBottom: 2, opacity: 0.9 }}>🚌 {details.busNo} · {details.driver}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>📞 {details.driverContact}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '14px 16px', textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 22, fontWeight: 900, opacity: 0.9 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 12, marginTop: 4 }}>{details.status}</div>
            <div style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>{details.academicYear}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 10, marginTop: 20 }}>
          {[
            ['Stop', details.yourStop],
            ['Pickup', details.pickupTime],
            ['College', details.arrivalCollege],
            ['Fee', `₹${details.annualFee}`],
            ['Dist.', `${details.distance}km`],
          ].map(([l, v]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 10px' }}>
              <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.9, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontWeight: 700, marginTop: 2, fontSize: 12 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
        {/* Route Timeline */}
        <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, padding: '22px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#111827', fontWeight: 800, fontSize: 15, marginBottom: 18 }}>🗺️ Route Stops</div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: 20, bottom: 0, width: 2, background: '#e5e7eb' }} />
            {fullRoute.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16, position: 'relative', alignItems: 'flex-start' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: s.you ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : '#f3f4f6',
                  border: `2px solid ${s.you ? '#60a5fa' : '#e5e7eb'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.you ? 11 : 9,
                  color: s.you ? '#fff' : '#6b7280', fontWeight: 800,
                  flexShrink: 0
                }}>
                  {s.you ? '👤' : (i + 1)}
                </div>
                <div style={{ flex: 1, paddingTop: 5 }}>
                  <div style={{ color: s.you ? '#2563eb' : '#111827', fontWeight: s.you ? 800 : 600, fontSize: 13 }}>{s.stop}</div>
                  <div style={{ color: '#6b7280', fontSize: 11, marginTop: 2 }}>⏰ {s.time} · {s.dist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live & Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Status */}
          <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, padding: '22px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <div style={{ color: '#111827', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📡 Live Status</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
              <div>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: 13 }}>Bus ON TIME</div>
                <div style={{ color: '#6b7280', fontSize: 11, marginTop: 2 }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
            {[['Departed', 'Koramangala', '7:52'], ['Picked', '6th Block', '8:01'], ['Next', 'BTM', '8:15']].map(([status, stop, time], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(0,0,0,0.02)', borderRadius: 8, marginBottom: 6, alignItems: 'center', fontSize: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#111827', fontWeight: 600 }}>{stop}</div>
                  <div style={{ color: '#6b7280' }}>{status}</div>
                </div>
                <div style={{ color: '#3b82f6', fontWeight: 700 }}>{time}</div>
              </div>
            ))}
          </div>

          {/* Notices */}
          <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, padding: '22px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <div style={{ color: '#111827', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📢 Notices</div>
            {notices.slice(0, 3).map((n, i) => (
              <div key={i} style={{ padding: '14px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, marginBottom: 10 }}>
                <div style={{ color: '#d97706', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>📅 {n.date}</div>
                <div style={{ color: '#111827', fontSize: 13 }}>{n.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <div style={{ color: '#111827', fontWeight: 800, fontSize: 15, padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>📅 Weekly Schedule</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.04)' }}>
                {['Day', 'Pickup', 'Stop', 'Route', 'ETA', 'Bus'].map(h => (
                  <th key={h} style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 700, color: '#6b7280', fontSize: 11, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '14px 10px', color: '#111827', fontWeight: 700 }}>{s.day}</td>
                  <td style={{ padding: '14px 10px', color: '#10b981', fontWeight: 700 }}>{s.time}</td>
                  <td style={{ padding: '14px 10px', color: '#3b82f6' }}>{s.stop}</td>
                  <td style={{ padding: '14px 10px', color: '#6b7280' }}>{s.route}</td>
                  <td style={{ padding: '14px 10px', color: '#f59e0b', fontWeight: 700 }}>{s.eta}</td>
                  <td style={{ padding: '14px 10px', color: '#6b7280', fontFamily: 'monospace' }}>{s.busNo}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(239,68,68,0.05)' }}>
                <td style={{ padding: '14px 10px', color: '#dc2626', fontWeight: 700 }}>Saturday</td>
                <td colSpan="5" style={{ padding: '14px 10px', color: '#6b7280' }}>No service</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
