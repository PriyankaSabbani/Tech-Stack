import React, { useState } from 'react';

const ClassMonitoring = ({ classes = [], branches = [], faculty = [] }) => {
  const [selectedBranch, setSelectedBranch] = useState('all');

  const filteredClasses = selectedBranch === 'all' 
    ? classes 
    : classes.filter(c => c.branch === selectedBranch);

  const getFacultyName = (id) => {
    const f = faculty.find(fac => fac.id === id);
    return f ? f.name : null;
  };

  const getFacultyInitials = (id) => {
    const name = getFacultyName(id);
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?';
  };

  const getBranchColor = (branch) => {
    const colors = {
      'CSE': '#3b82f6',
      'ECE': '#8b5cf6',
      'AIML': '#10b981',
      'IT': '#f59e0b',
      'DS': '#ef4444'
    };
    return colors[branch] || '#6b7280';
  };

  return (
    <div className="class-monitoring">
      <div className="section-header">
        <h2>Class Monitoring</h2>
        <div className="header-stats">
          <span className="stat">Total: <strong>{classes.length}</strong></span>
          <span className="stat warning">Need Monitoring: <strong>{classes.filter(c => c.needsMonitoring).length}</strong></span>
        </div>
      </div>

      <div className="filters">
        <div className="filter-buttons">
          <button 
            className={selectedBranch === 'all' ? 'active' : ''} 
            onClick={() => setSelectedBranch('all')}
          >
            All Branches
          </button>
          {branches.map(branch => (
            <button 
              key={branch.id}
              className={selectedBranch === branch.code ? 'active' : ''} 
              onClick={() => setSelectedBranch(branch.code)}
            >
              {branch.name}
            </button>
          ))}
        </div>
      </div>

      <div className="classes-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Faculty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map(cls => (
              <tr key={cls.id} className={cls.needsMonitoring ? 'highlight-row' : ''}>
                <td>
                  <div className="class-name">
                    <span className="class-icon"></span>
                    <span className="branch-badge" style={{ backgroundColor: getBranchColor(cls.branch) }}>
                      {cls.branch}
                    </span>
                    {cls.name}
                  </div>
                </td>
                <td>{cls.subject}</td>
                <td>
                  <div className="time-slot">
                    <span></span>
                    {cls.time}
                  </div>
                </td>
                <td>
                  {cls.facultyAssigned ? (
                    <div className="faculty-info">
                      <div className="faculty-avatar">{getFacultyInitials(cls.facultyAssigned)}</div>
                      {getFacultyName(cls.facultyAssigned)}
                    </div>
                  ) : (
                    <span className="not-assigned">Not Assigned</span>
                  )}
                </td>
                <td>
                  {cls.needsMonitoring ? (
                    <span className="status-badge needs-monitoring">Needs Monitoring</span>
                  ) : cls.facultyAssigned ? (
                    <span className="status-badge faculty-present">Faculty Present</span>
                  ) : (
                    <span className="status-badge no-faculty">No Faculty</span>
                  )}
                </td>
                <td>
                  <button className="btn-toggle active">
                    {cls.needsMonitoring ? 'Assign Staff' : 'View Details'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <h4>Branch Statistics</h4>
          <div className="quick-stats">
            {branches.map(branch => {
              const branchClasses = classes.filter(c => c.branch === branch.code);
              const needMonitoring = branchClasses.filter(c => c.needsMonitoring).length;
              return (
                <div key={branch.id} className="quick-stat">
                  <span className="stat-number" style={{ color: getBranchColor(branch.code) }}>
                    {branchClasses.length}
                  </span>
                  <span className="stat-desc">{branch.name}</span>
                  {needMonitoring > 0 && (
                    <span className="stat-desc text-danger">{needMonitoring} need monitor</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="info-card">
          <h4>Faculty Overview</h4>
          <ul>
            {faculty.map(f => {
              const assignedClasses = classes.filter(c => c.facultyAssigned === f.id).length;
              return (
                <li key={f.id}>
                  <strong>{f.name}</strong> - {assignedClasses} classes assigned
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassMonitoring;

