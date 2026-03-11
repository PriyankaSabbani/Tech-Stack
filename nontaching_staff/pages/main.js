import React, { useState, useEffect } from 'react';
import './main.css';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StaffList from './components/StaffList';
import ClassMonitoring from './components/ClassMonitoring';
import AssignmentPanel from './components/AssignmentPanel';
import StaffScheduling from './components/StaffScheduling';
import AttendanceTracking from './components/AttendanceTracking';
import Notifications from './components/Notifications';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({
    staff: [],
    classes: [],
    assignments: [],
    schedules: [],
    notifications: [],
    branches: [],
    faculty: [],
    students: [],
    attendanceClasses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/db.json`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={setActiveTab} 
            staff={data.staff}
            classes={data.classes}
            assignments={data.assignments}
            notifications={data.notifications}
          />
        );
      case 'staff':
        return <StaffList staff={data.staff} />;
      case 'classes':
        return (
          <ClassMonitoring 
            classes={data.classes}
            branches={data.branches}
            faculty={data.faculty}
          />
        );
      case 'assignments':
        return (
          <AssignmentPanel 
            staff={data.staff}
            classes={data.classes}
            assignments={data.assignments}
          />
        );
      case 'scheduling':
        return (
          <StaffScheduling 
            staff={data.staff}
            schedules={data.schedules}
          />
        );
      case 'attendance':
        return (
          <AttendanceTracking 
            classes={data.attendanceClasses}
            staff={data.staff}
            students={data.students}
          />
        );
      case 'notifications':
        return <Notifications notifications={data.notifications} />;
      default:
        return (
          <Dashboard 
            onNavigate={setActiveTab} 
            staff={data.staff}
            classes={data.classes}
            assignments={data.assignments}
            notifications={data.notifications}
          />
        );
    }
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      staff: 'Staff Management',
      classes: 'Class Monitoring',
      assignments: 'Assignments',
      scheduling: 'Staff Scheduling',
      attendance: 'Attendance',
      notifications: 'Notifications'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} getPageTitle={getPageTitle()}>
      {renderContent()}
    </Layout>
  );
}

export default App;

