import React, { useState } from 'react';

const Layout = ({ children, activeTab, setActiveTab, getPageTitle }) => {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <h1>NTMS</h1>
          <p>Staff Management</p>
        </div>
        <nav className="nav-menu">
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Dashboard</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Staff</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Classes</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Assignments</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'scheduling' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduling')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Scheduling</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Attendance</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="nav-icon"></span>
            <span className="nav-text">Notifications</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-content">
            <h2>{getPageTitle}</h2>
            <div className="header-right">
              <div className="search-box">
                <span className="search-icon"></span>
                <input type="text" placeholder="Search..." />
              </div>
              <div className="user-profile">
                <div className="user-avatar">A</div>
                <div className="user-info">
                  <span className="user-name">Admin</span>
                  <span className="user-role">Manager</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

