import React, { useState, useEffect } from 'react';
import { getSemResults, getCGPA } from '../data/db';

const gradeColor = { 'A+': '#34d399', 'A': '#60a5fa', 'B+': '#a78bfa', 'B': '#fbbf24', 'C': '#f87171' };

export default function Results() {
  const [sem, setSem] = useState('Sem 5 (Current)');
  const [semResults, setSemResults] = useState({});
  const [cgpa, setCgpa] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSemResults(), getCGPA()])
      .then(([results, cgpaData]) => {
        setSemResults(results);
        setCgpa(cgpaData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading results:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const results = semResults[sem];
  const totalMarks = results.reduce((a, r) => a + r.total, 0);
  const maxMarks = results.reduce((a, r) => a + r.max, 0);
  const pct = Math.round(totalMarks / maxMarks * 100);

  return (
    <div>
      {/* SGPA Banner */}
      <div style={{ background: 'linear-gradient(135deg,#0f2a4a,#1e3a6f)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Academic Performance</div>
          <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 22, marginTop: 6 }}>Overall CGPA: <span style={{ color: '#34d399' }}>8.7</span></div>
          <div style={{ color: '#60a5fa', fontSize: 13, marginTop: 4 }}>Class Rank: 12 / 180 students</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {Object.entries(cgpa).map(([s, g]) => (
            <div key={s} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 18px' }}>
              <div style={{ color: '#34d399', fontWeight: 900, fontSize: 20 }}>{g}</div>
              <div style={{ color: '#64748b', fontSize: 10, fontWeight: 700 }}>{s.split(' ')[0]} {s.split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Semester tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {Object.keys(semResults).map(s => (
          <button key={s} onClick={() => setSem(s)} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: sem === s ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'rgba(255,255,255,0.05)', color: sem === s ? '#fff' : '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s}</button>
        ))}
      </div>

      {/* Stats for selected sem */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 20 }}>
        {[
          ['SGPA', cgpa[sem], '#34d399'],
          ['Total Marks', `${totalMarks}/${maxMarks}`, '#60a5fa'],
          ['Percentage', `${pct}%`, '#a78bfa'],
          ['Subjects', results.length, '#fbbf24'],
        ].map(([l, v, c]) => (
          <div key={l} style={{ background: `${c}12`, border: `1px solid ${c}25`, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Results Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Subject', 'Code', 'Internal (50)', 'External (100)', 'Total (150)', 'Grade', 'Grade Points', 'Performance'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const pct = Math.round(r.total / r.max * 100);
                return (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '13px 16px', color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{r.subject}</td>
                    <td style={{ padding: '13px 16px', color: '#60a5fa', fontWeight: 700, fontSize: 12 }}>{r.code}</td>
                    <td style={{ padding: '13px 16px', color: '#94a3b8', fontWeight: 600 }}>{r.internal}</td>
                    <td style={{ padding: '13px 16px', color: '#94a3b8', fontWeight: 600 }}>{r.external}</td>
                    <td style={{ padding: '13px 16px', color: '#f1f5f9', fontWeight: 800, fontSize: 14 }}>{r.total}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 900, color: gradeColor[r.grade] || '#94a3b8', background: `${gradeColor[r.grade]}18` }}>{r.grade}</span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#fbbf24', fontWeight: 800, fontSize: 14 }}>{r.points}</td>
                    <td style={{ padding: '13px 16px', minWidth: 140 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${gradeColor[r.grade] || '#60a5fa'},${gradeColor[r.grade] || '#60a5fa'}88)`, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#475569', fontWeight: 700 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid rgba(255,255,255,0.1)', background: 'rgba(59,130,246,0.06)' }}>
                <td colSpan={4} style={{ padding: '14px 16px', color: '#60a5fa', fontWeight: 800, fontSize: 13 }}>TOTAL / SGPA</td>
                <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 900, fontSize: 15 }}>{totalMarks}/{maxMarks}</td>
                <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 900, fontSize: 15 }}>{cgpa[sem]}</td>
                <td colSpan={2} style={{ padding: '14px 16px', color: '#94a3b8', fontSize: 13 }}>{pct}% overall</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Grade Distribution */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 16 }}>📊 Grade Distribution — {sem}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['A+', 'A', 'B+', 'B'].map(g => {
            const count = results.filter(r => r.grade === g).length;
            return count > 0 ? (
              <div key={g} style={{ flex: '1 1 100px', background: `${gradeColor[g]}12`, border: `1px solid ${gradeColor[g]}30`, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: gradeColor[g] }}>{count}</div>
                <div style={{ color: gradeColor[g], fontWeight: 800, fontSize: 14 }}>{g}</div>
                <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>subject{count > 1 ? 's' : ''}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
