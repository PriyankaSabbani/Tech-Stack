import React, { useState } from 'react';

const attendance = [
  { subject: 'Data Structures', code: 'CS301', faculty: 'Dr. Ramesh Kumar', total: 48, attended: 45, recent: ['P','P','P','A','P','P','P','P','A','P'] },
  { subject: 'Database Systems', code: 'CS302', faculty: 'Prof. Sunita Nair', total: 42, attended: 38, recent: ['P','P','A','P','P','P','A','P','P','P'] },
  { subject: 'Computer Networks', code: 'CS303', faculty: 'Dr. Arjun Singh', total: 40, attended: 29, recent: ['P','A','A','P','P','A','P','A','P','P'] },
  { subject: 'Mathematics III', code: 'MA301', faculty: 'Prof. Meera Iyer', total: 36, attended: 34, recent: ['P','P','P','P','A','P','P','P','P','P'] },
  { subject: 'Operating Systems', code: 'CS304', faculty: 'Dr. Venkat Rao', total: 44, attended: 40, recent: ['P','P','P','P','P','A','P','P','A','P'] },
  { subject: 'Software Engineering', code: 'CS305', faculty: 'Prof. Lakshmi', total: 38, attended: 32, recent: ['A','P','P','P','A','P','P','A','P','P'] },
];

const DATES = ['28 Feb','1 Mar','3 Mar','4 Mar','5 Mar','6 Mar','7 Mar','8 Mar','10 Mar','11 Mar'];

export default function Attendance() {
  const [view, setView] = useState('cards');

  const pct = (a, t) => Math.round(a / t * 100);
  const status = (p) => p >= 85 ? { label: 'Good', c: '#34d399', bg: 'rgba(52,211,153,0.1)' }
    : p >= 75 ? { label: 'Avg', c: '#fbbf24', bg: 'rgba(251,191,36,0.1)' }
    : { label: 'Low ⚠️', c: '#f87171', bg: 'rgba(248,113,113,0.1)' };

  const overall = Math.round(attendance.reduce((a, s) => a + s.attended, 0) / attendance.reduce((a, s) => a + s.total, 0) * 100);
  const low = attendance.filter(s => pct(s.attended, s.total) < 75);

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['Overall Attendance', `${overall}%`, overall >= 75 ? '#34d399' : '#f87171', overall >= 75 ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)'],
          ['Total Subjects', attendance.length, '#60a5fa', 'rgba(96,165,250,0.1)'],
          ['Classes Attended', attendance.reduce((a, s) => a + s.attended, 0), '#a78bfa', 'rgba(167,139,250,0.1)'],
          ['Subjects < 75%', low.length, '#f87171', 'rgba(248,113,113,0.1)'],
        ].map(([l, v, c, bg]) => (
          <div key={l} style={{ background: bg, border: `1px solid ${c}30`, borderRadius: 14, padding: '18px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 5 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Warning */}
      {low.length > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <div style={{ color: '#f87171', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>Low Attendance Warning</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>
              You have attendance below 75% in: <strong style={{ color: '#fca5a5' }}>{low.map(s => s.subject).join(', ')}</strong>. Please attend regularly to avoid de-barment.
            </div>
          </div>
        </div>
      )}

      {/* Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['cards', '⊞ Card View'], ['table', '☰ Table View']].map(([key, label]) => (
          <button key={key} onClick={() => setView(key)} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: view === key ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'rgba(255,255,255,0.05)', color: view === key ? '#fff' : '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{label}</button>
        ))}
      </div>

      {view === 'cards' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {attendance.map((s, i) => {
            const p = pct(s.attended, s.total);
            const st = status(p);
            const needed = p < 75 ? Math.ceil((0.75 * s.total - s.attended) / 0.25) : 0;
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${st.c},${st.c}44)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15 }}>{s.subject}</div>
                    <div style={{ color: '#475569', fontSize: 11, marginTop: 3 }}>{s.code} · {s.faculty}</div>
                  </div>
                  <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, color: st.c, background: st.bg }}>{st.label}</span>
                </div>
                {/* Big % */}
                <div style={{ textAlign: 'center', margin: '10px 0' }}>
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
                    <circle cx="45" cy="45" r="38" fill="none" stroke={st.c} strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 38 * p / 100} ${2 * Math.PI * 38 * (1 - p / 100)}`}
                      strokeDashoffset={2 * Math.PI * 38 * 0.25} />
                    <text x="45" y="49" textAnchor="middle" fontSize="16" fontWeight="900" fill={st.c}>{p}%</text>
                  </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 14 }}>
                  {[['Total', s.total], ['Attended', s.attended], ['Absent', s.total - s.attended]].map(([l, v]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18 }}>{v}</div>
                      <div style={{ color: '#475569', fontSize: 10, fontWeight: 700 }}>{l}</div>
                    </div>
                  ))}
                </div>
                {/* Recent */}
                <div>
                  <div style={{ color: '#475569', fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>Recent Classes</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.recent.map((r, j) => (
                      <div key={j} title={DATES[j]} style={{ width: 22, height: 22, borderRadius: 6, background: r === 'P' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)', border: `1px solid ${r === 'P' ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: r === 'P' ? '#34d399' : '#f87171', fontWeight: 800 }}>{r}</div>
                    ))}
                  </div>
                </div>
                {needed > 0 && <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(239,68,68,0.08)', borderRadius: 8, fontSize: 12, color: '#f87171' }}>Need to attend <strong>{needed}</strong> more classes to reach 75%</div>}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {['Subject', 'Code', 'Faculty', 'Total', 'Attended', 'Absent', 'Percentage', 'Status'].map(h => (
                    <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendance.map((s, i) => {
                  const p = pct(s.attended, s.total);
                  const st = status(p);
                  return (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '13px 16px', color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{s.subject}</td>
                      <td style={{ padding: '13px 16px', color: '#60a5fa', fontWeight: 700, fontSize: 12 }}>{s.code}</td>
                      <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{s.faculty}</td>
                      <td style={{ padding: '13px 16px', color: '#94a3b8', fontWeight: 700 }}>{s.total}</td>
                      <td style={{ padding: '13px 16px', color: '#34d399', fontWeight: 700 }}>{s.attended}</td>
                      <td style={{ padding: '13px 16px', color: '#f87171', fontWeight: 700 }}>{s.total - s.attended}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, minWidth: 80 }}>
                            <div style={{ height: '100%', width: `${p}%`, background: st.c, borderRadius: 3 }} />
                          </div>
                          <span style={{ fontWeight: 800, color: st.c, fontSize: 13 }}>{p}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, color: st.c, background: st.bg }}>{st.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
