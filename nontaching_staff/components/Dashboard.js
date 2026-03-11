import React from 'react';

const Dashboard = ({ onNavigate, staff = [], classes = [], assignments = [], notifications = [] }) => {
  const activeAssignments = assignments.filter(a => a.status === 'active').length;
  const pendingNotifications = notifications.filter(n => !n.read).length;
  const availableStaff = staff.filter(s => s.availability === 'available').length;
  const classesNeedingMonitoring = classes.filter(c => c.needsMonitoring).length;

  const stats = [
    { label: 'Total Staff', value: staff.length, color: 'blue', icon: '' },
    { label: 'Available', value: availableStaff, color: 'green', icon: '' },
    { label: 'Need Monitoring', value: classesNeedingMonitoring, color: 'red', icon: '' },
    { label: 'Active Assignments', value: activeAssignments, color: 'purple', icon: '' },
    { label: 'Notifications', value: pendingNotifications, color: 'orange', icon: '' },
    { label: 'Total Classes', value: classes.length, color: 'cyan', icon: '' },
  ];

  const handleAddStaff = () => {
    if (onNavigate) {
      onNavigate('staff');
    }
  };

  const handleViewSchedule = () => {
    if (onNavigate) {
      onNavigate('scheduling');
    }
  };

  const handleViewAlerts = () => {
    if (onNavigate) {
      onNavigate('notifications');
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-sections">
        <div className="recent-activity">
          <h3 className="section-title">Recent Activity</h3>
          <div className="activity-list">
            {assignments.slice(0, 5).map((assignment, index) => {
              const assignedStaff = staff.find(s => s.id === assignment.staffId);
              const assignedClass = classes.find(c => c.id === assignment.classId);
              return (
                <div key={index} className="activity-item">
                  <span className="activity-icon"></span>
                  <span className="activity-text">
                    {assignedStaff?.name} to {assignedClass?.name}
                  </span>
                  <span className="activity-time">{assignment.date}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="quick-actions">
          <h3 className="section-title">Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={handleAddStaff}>
              Add New Staff
            </button>
            <button className="action-btn secondary" onClick={handleViewSchedule}>
              View Schedule
            </button>
            <button className="action-btn secondary" onClick={handleViewAlerts}>
              View Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

