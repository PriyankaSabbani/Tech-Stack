import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: "My Classes", path: "/classes" },
    { name: "My Subjects", path: "/subjects" },
    { name: "Timetable", path: "/timetable" },
    { name: "Students List", path: "/students" },
    { name: "Attendance", path: "/attendance" },
    { name: "Assignments", path: "/assignments" },
    { name: "Study Materials", path: "/materials" },
    { name: "Announcements", path: "/announcements" },
    { name: "Profile", path: "/profile" },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const location = useLocation();

  return (
    <>
      {/* Mobile Offcanvas */}
      <div className="offcanvas offcanvas-start sidebar-offcanvas" tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarLabel">
        <div className="offcanvas-header sidebar-header pb-0">
          <h5 className="offcanvas-title fw-bold text-primary" id="sidebarLabel">
            Faculty Menu
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0 sidebar-content">
          <nav className="nav nav-pills flex-column gap-2 sidebar-menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-link menu-link rounded-3 ${location.pathname === item.path ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Fixed Sidebar */}
      <nav className="d-none d-lg-block sidebar-desktop bg-dark vh-100 position-sticky start-0" style={{width: '280px'}}>
        <div className="sidebar-content p-4 h-100 d-flex flex-column">
          <div className="sidebar-header mb-4 pb-3 border-bottom">
            <h5 className="text-white fw-bold mb-0">
              Faculty Menu
            </h5>
          </div>
          <nav className="nav nav-pills flex-column gap-2 flex-grow-1 sidebar-menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-link menu-link px-4 py-2 rounded-3 fw-semibold ${location.pathname === item.path ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </nav>
    </>
  );
}
