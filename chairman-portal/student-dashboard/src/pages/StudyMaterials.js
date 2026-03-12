import React, { useState, useEffect } from 'react';
import { getStudyMaterials, getMaterialSubjects } from '../data/db';

const typeStyle = {
  PDF: { bg: 'rgba(239,68,68,0.12)', c: '#f87171', icon: '📄' },
  PPT: { bg: 'rgba(249,115,22,0.12)', c: '#fb923c', icon: '📊' },
  VIDEO: { bg: 'rgba(139,92,246,0.12)', c: '#a78bfa', icon: '🎬' },
};

export default function StudyMaterials() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [type, setType] = useState('All');
  const [downloaded, setDownloaded] = useState({});
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStudyMaterials(), getMaterialSubjects()])
      .then(([materialsData, subjectsData]) => {
        setMaterials(materialsData || []);
        setSubjects(['All', ...(subjectsData || [])]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading study materials:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const types = ['All', 'PDF', 'PPT', 'VIDEO'];

  const filtered = materials.filter(m =>
    (subject === 'All' || m?.subject === subject) &&
    (type === 'All' || m?.type === type) &&
    (
      (m?.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (m?.subject || '').toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleDownload = (material) => {
    if (!material) return;

    setDownloaded(d => ({ ...d, [material.id]: true }));

    if (material.url) {
      const link = document.createElement('a');
      link.href = material.url;
      link.download = material.title || 'file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setTimeout(() => {
      setDownloaded(d => ({ ...d, [material.id]: false }));
    }, 2000);
  };

  const Sel = ({ children, value, onChange }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '9px 14px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94a3b8',
        fontSize: 13,
        outline: 'none',
        cursor: 'pointer',
        fontFamily: "'Plus Jakarta Sans',sans-serif"
      }}
    >
      {children}
    </select>
  );

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 24 }}>
        {[['Total Materials', materials.length, '#60a5fa'],
        ['PDFs', materials.filter(m => m?.type === 'PDF').length, '#f87171'],
        ['Presentations', materials.filter(m => m?.type === 'PPT').length, '#fb923c'],
        ['Videos', materials.filter(m => m?.type === 'VIDEO').length, '#a78bfa']].map(([l, v, c]) => (
          <div key={l} style={{ background: `${c}12`, border: `1px solid ${c}25`, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>

        <input
          placeholder="🔍  Search materials..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 220px',
            padding: '10px 16px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#f1f5f9',
            fontSize: 13,
            outline: 'none',
            fontFamily: "'Plus Jakarta Sans',sans-serif"
          }}
        />

        <Sel value={subject} onChange={setSubject}>
          {subjects.map(s => (
            <option key={s} style={{ background: '#1e293b' }}>{s}</option>
          ))}
        </Sel>

        <Sel value={type} onChange={setType}>
          {types.map(t => (
            <option key={t} style={{ background: '#1e293b' }}>{t}</option>
          ))}
        </Sel>

        <div style={{ color: '#475569', fontSize: 12, marginLeft: 'auto' }}>
          {filtered.length} results
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 16 }}>
        {filtered.map(m => {
          const ts = typeStyle[m?.type] || typeStyle.PDF;
          const done = downloaded[m?.id];

          return (
            <div
              key={m?.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: 20,
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = '';
              }}
            >

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: ts.bg,
                  border: `1px solid ${ts.c}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}>
                  {ts.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, lineHeight: 1.4 }}>
                    {m?.title}
                  </div>
                  <div style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>
                    {m?.subject}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {m?.tags?.map(t => (
                  <span key={t} style={{
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.05)',
                    color: '#64748b',
                    fontSize: 10,
                    fontWeight: 700
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <div style={{ color: '#475569', fontSize: 11 }}>
                    👤 {m?.faculty}
                  </div>
                  <div style={{ color: '#334155', fontSize: 11, marginTop: 2 }}>
                     {m?.date} · {m?.size}
                  </div>
                </div>

                <span style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  color: ts.c,
                  background: ts.bg
                }}>
                  {m?.type}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>

                <button
                  onClick={() => m?.url && window.open(m.url, '_blank')}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans',sans-serif"
                  }}
                >
                   View
                </button>

                <button
                  onClick={() => handleDownload(m)}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: 8,
                    border: 'none',
                    background: done
                      ? 'linear-gradient(135deg,#059669,#34d399)'
                      : 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    transition: 'all 0.3s',
                    fontFamily: "'Plus Jakarta Sans',sans-serif"
                  }}
                >
                  {done ? '✅ Downloaded' : '⬇️ Download'}
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}></div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>No materials found</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Try adjusting your search or filters</div>
        </div>
      )}

    </div>
  );
}