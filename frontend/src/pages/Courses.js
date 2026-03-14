import React, { useState, useEffect } from 'react';
import { getCourses } from '../data/db';

export default function Courses() {
  const [selected, setSelected] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading courses:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const totalCredits = courses.reduce((a, c) => a + c.credits, 0);

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['Enrolled Courses', courses.length, '#60a5fa', 'rgba(96,165,250,0.1)'],
          ['Total Credits', totalCredits, '#a78bfa', 'rgba(167,139,250,0.1)'],
          ['Core Subjects', courses.filter(c => c.type === 'Core').length, '#34d399', 'rgba(52,211,153,0.1)'],
          ['Avg Progress', `${Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length)}%`, '#fbbf24', 'rgba(251,191,36,0.1)'],
        ].map(([l, v, c, bg]) => (
          <div key={l} style={{ background: bg, border: `1px solid ${c}30`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
        {/* Course Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, alignContent: 'start' }}>
          {courses.map((c, i) => (
            <div key={i} onClick={() => setSelected(selected?.code === c.code ? null : c)} style={{ background: 'rgba(255,255,255,0.03)', border: `1.5px solid ${selected?.code === c.code ? c.color + '60' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = selected?.code === c.code ? c.color + '60' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = ''; }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.color }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <span style={{ padding: '2px 10px', borderRadius: 6, fontSize: 10, fontWeight: 800, color: c.color, background: `${c.color}18`, display: 'inline-block', marginBottom: 8 }}>{c.code}</span>
                  <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{c.name}</div>
                </div>
                <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: c.type === 'Core' ? '#34d399' : '#fbbf24', background: c.type === 'Core' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)', flexShrink: 0, marginLeft: 8 }}>{c.type}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 14 }}>👤 {c.faculty}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#475569', fontSize: 12 }}>Syllabus Coverage</span>
                <span style={{ color: c.color, fontWeight: 800, fontSize: 12 }}>{c.progress}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${c.progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}88)`, borderRadius: 3, transition: 'width 0.5s' }} />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                <span style={{ color: '#475569', fontSize: 11 }}>⚡ {c.credits} Credits</span>
                <span style={{ color: '#475569', fontSize: 11 }}>📍 {c.room}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${selected.color}30`, borderRadius: 16, padding: 24, position: 'sticky', top: 20, alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ color: selected.color, fontWeight: 800, fontSize: 12, marginBottom: 4 }}>{selected.code}</div>
                <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 17, lineHeight: 1.3 }}>{selected.name}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: 30, height: 30, color: '#64748b', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[['Faculty', selected.faculty], ['Credits', selected.credits], ['Schedule', selected.schedule], ['Room', selected.room], ['Type', selected.type], ['Progress', `${selected.progress}%`]].map(([l, v]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ color: '#475569', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 13, marginBottom: 12 }}>📋 Syllabus Topics</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.syllabus.map((topic, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${selected.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.color, fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ color: '#94a3b8', fontSize: 13 }}>{topic}</span>
                    {i < Math.round(selected.syllabus.length * selected.progress / 100) && (
                      <span style={{ marginLeft: 'auto', color: '#34d399', fontSize: 14 }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${selected.color},${selected.color}aa)`, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>📖 Materials</button>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>📝 Assignments</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
