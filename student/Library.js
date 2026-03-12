import React, { useState, useEffect } from 'react';
import { getBorrowedBooks, getAvailableBooks } from '../data/db';

export default function Library() {
  const [search, setSearch] = useState('');
  const [reserved, setReserved] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBorrowedBooks(), getAvailableBooks()])
      .then(([borrowed, avail]) => {
        setBorrowedBooks(borrowed);
        setAvailable(avail);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading library data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  const filtered = available.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  const fine = borrowedBooks.filter(b => b.status === 'Overdue').length * 5;

  const handleReserve = (title) => setReserved(r => ({ ...r, [title]: true }));

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['Books Borrowed', borrowedBooks.length, '#60a5fa', 'rgba(96,165,250,0.1)'],
          ['Due This Month', borrowedBooks.filter(b => b.status === 'On Time').length, '#34d399', 'rgba(52,211,153,0.1)'],
          ['Overdue Books', borrowedBooks.filter(b => b.status === 'Overdue').length, '#f87171', 'rgba(248,113,113,0.1)'],
          ['Fine Due', `₹${fine}`, fine > 0 ? '#f87171' : '#34d399', fine > 0 ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)'],
        ].map(([l, v, c, bg]) => (
          <div key={l} style={{ background: bg, border: `1px solid ${c}30`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Overdue Warning */}
      {borrowedBooks.some(b => b.status === 'Overdue') && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, color: '#f87171', fontWeight: 700, fontSize: 14 }}>
          ⚠️ You have overdue books. A fine of ₹5/day is applicable. Please return at the earliest.
        </div>
      )}

      {/* Borrowed Books */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22, marginBottom: 20 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 16 }}>📚 Currently Borrowed</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
          {borrowedBooks.map((b, i) => {
            const isOverdue = b.status === 'Overdue';
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isOverdue ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, padding: 18, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 14, right: 14 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800, color: isOverdue ? '#f87171' : '#34d399', background: isOverdue ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)' }}>
                    {isOverdue ? '⚠️ Overdue' : '✓ On Time'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 56, borderRadius: 8, background: isOverdue ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{b.cover}</div>
                  <div>
                    <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{b.title}</div>
                    <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{b.author}</div>
                    <div style={{ color: '#334155', fontSize: 11, marginTop: 3 }}>ISBN: {b.isbn}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[['Book ID', b.id], ['Issued', b.issued], ['Due Date', b.due], ['Fine', isOverdue ? `₹${fine}` : 'None']].map(([l, v]) => (
                    <div key={l} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '6px 10px' }}>
                      <div style={{ color: '#475569', fontSize: 10, fontWeight: 700 }}>{l}</div>
                      <div style={{ color: l === 'Fine' && isOverdue ? '#f87171' : '#94a3b8', fontWeight: 700, fontSize: 12, marginTop: 1 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#64748b', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  🔄 Renew Book
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Browse */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15 }}>🔍 Browse & Reserve Books</div>
          <input
            placeholder="Search by title or author..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 13, outline: 'none', width: 260, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
          {filtered.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
              <div style={{ width: 40, height: 50, borderRadius: 6, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{b.cover}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{b.title}</div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{b.author}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <span style={{ color: b.available > 0 ? '#34d399' : '#f87171', fontSize: 11, fontWeight: 700 }}>{b.available > 0 ? `${b.available} Available` : 'Not Available'}</span>
                  <button onClick={() => handleReserve(b.title)} disabled={reserved[b.title] || b.available === 0} style={{ padding: '3px 10px', borderRadius: 6, border: 'none', background: reserved[b.title] ? 'rgba(52,211,153,0.2)' : b.available === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(59,130,246,0.2)', color: reserved[b.title] ? '#34d399' : b.available === 0 ? '#475569' : '#60a5fa', cursor: b.available === 0 ? 'default' : 'pointer', fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    {reserved[b.title] ? '✓ Reserved' : 'Reserve'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
