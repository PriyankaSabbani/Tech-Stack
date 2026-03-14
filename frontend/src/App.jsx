import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import DashboardHome from "./pages/DashboardHome";
import Department from "./pages/Department";
import MyClasses from "./pages/MyClasses";
import MySubjects from "./pages/MySubjects";
import Timetable from "./pages/Timetable";
import StudentsList from "./pages/StudentsList";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import StudyMaterials from "./pages/StudyMaterials";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";

function Navbar() {
  const [offcanvas, setOffcanvas] = useState(null);

  const toggleOffcanvas = () => {
    const offcanvasElement = document.getElementById('sidebarOffcanvas');
    if (offcanvasElement) {
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
      bsOffcanvas.toggle();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="container-fluid">
        <button 
          className="navbar-toggler shadow-none" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
          onClick={toggleOffcanvas}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-brand mx-auto fw-bold fs-3 flex-fill text-center">
          Faculty Portal
        </div>
        <button className="navbar-toggler d-lg-none d-none"></button>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="d-flex">
          <Sidebar />
          <main className="flex-grow-1 p-4">
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/departments" element={<Department />} />
                <Route path="/classes" element={<MyClasses />} />
                <Route path="/subjects" element={<MySubjects />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/students" element={<StudentsList />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/materials" element={<StudyMaterials />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

