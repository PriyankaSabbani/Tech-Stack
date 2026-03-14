import React from 'react';
import './Hamburger.css'; // Will create this

export default function Hamburger({ isOpen, toggleSidebar }) {
  return (
    <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
      <div className={`hamburger-line line1 ${isOpen ? 'open' : ''}`}></div>
      <div className={`hamburger-line line2 ${isOpen ? 'open' : ''}`}></div>
      <div className={`hamburger-line line3 ${isOpen ? 'open' : ''}`}></div>
    </button>
  );
}

