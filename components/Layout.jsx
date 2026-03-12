import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaMoneyCheckAlt } from 'react-icons/fa';

const Layout = () => {
  const activeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold',
  };

  const navLinkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: '"Inter", "Roboto", sans-serif', overflowX: 'hidden' }}>
      {/* Top Navbar matched from image (Dark Blue) */}
      <nav style={{ backgroundColor: '#1a365d', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaGraduationCap size={24} />
          <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>MRIET</h4>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <NavLink to="/dashboard" style={({ isActive }) => isActive ? { ...navLinkStyle, ...activeStyle } : navLinkStyle}>
            <FaGraduationCap /> Dashboard
          </NavLink>
          <NavLink to="/students" style={({ isActive }) => isActive ? { ...navLinkStyle, ...activeStyle } : navLinkStyle}>
            <FaUserGraduate /> Students
          </NavLink>
          <NavLink to="/staff" style={({ isActive }) => isActive ? { ...navLinkStyle, ...activeStyle } : navLinkStyle}>
            <FaChalkboardTeacher /> Staff
          </NavLink>
          <NavLink to="/fees" style={({ isActive }) => isActive ? { ...navLinkStyle, ...activeStyle } : navLinkStyle}>
            <FaMoneyCheckAlt /> Fees
          </NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="https://ui-avatars.com/api/?name=Principal&background=random" alt="Principal" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          <span>Principal</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
