import React, { useState } from 'react';

const AttendanceTracking = ({ classes = [], staff = [], students = [] }) => {
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || 1);
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [attendance, setAttendance] = useState({});
  const [showReport, setShowReport] = useState(false);

  const currentClass = classes.find(c => c.id === selectedClass);

  const handleMarkAttendance = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status
    });
  };

  const handleMarkAllPresent = () => {
    const newAttendance = {};
    students.forEach(s => {
      newAttendance[s.id] = 'present';
    });
    setAttendance(newAttendance);
  };

  const handleClearAll = () => {
    setAttendance({});
  };

  const presentCount = students.length > 0 
    ? Object.values(attendance).filter(s => s === 'present').length 
    : 0;
  const absentCount = students.length > 0 
    ? Object.values(attendance).filter(s => s === 'absent').length 
    : 0;
  const lateCount = students.length > 0 
    ? Object.values(attendance).filter(s => s === 'late').length 
    : 0;
  
  const totalMarked = presentCount + absentCount + lateCount;
  const attendancePercentage = totalMarked > 0 
    ? Math.round((presentCount / totalMarked) * 100) 
    : 0;

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div className="header-info">
          <h2>Attendance Tracking</h2>
          <p>Track and manage student attendance for each class</p>
        </div>
        <div className="header-actions">
          <button 
            className={`btn-tab ${!showReport ? 'active' : ''}`}
            onClick={() => setShowReport(false)}
          >
            Mark Attendance
          </button>
          <button 
            className={`btn-tab ${showReport ? 'active' : ''}`}
            onClick={() => setShowReport(true)}
          >
            View Report
          </button>
        </div>
      </div>

      {!showReport ? (
        <div className="attendance-marking-section">
          <div className="selection-panel">
            <div className="selection-card">
              <div className="selection-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <div className="selection-content">
                <label>Class</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(parseInt(e.target.value))}
                  className="selection-select"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="selection-card">
              <div className="selection-icon date">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="selection-content">
                <label>Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="selection-input"
                />
              </div>
            </div>
          </div>

          <div className="class-info-banner">
            <div className="class-info-item">
              <span className="label">Class</span>
              <span className="value">{currentClass?.name || 'N/A'}</span>
            </div>
            <div className="class-info-item">
              <span className="label">Subject</span>
              <span className="value">{currentClass?.subject || 'N/A'}</span>
            </div>
            <div className="class-info-item">
              <span className="label">Total Students</span>
              <span className="value">{students.length}</span>
            </div>
            <div className="class-info-item highlight">
              <span className="label">Attendance Rate</span>
              <span className="value">{attendancePercentage}%</span>
            </div>
          </div>

          <div className="quick-actions-bar">
            <button className="action-pill present" onClick={handleMarkAllPresent}>
              <span className="pill-icon">P</span>
              Mark All Present
            </button>
            <button className="action-pill clear" onClick={handleClearAll}>
              <span className="pill-icon">X</span>
              Clear All
            </button>
          </div>

          <div className="students-list-container">
            <div className="list-header">
              <h3>Students ({students.length})</h3>
              <div className="progress-indicator">
                <span>{totalMarked} / {students.length} marked</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(totalMarked / students.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="students-grid">
              {students.map(student => (
                <div 
                  key={student.id} 
                  className={`student-card ${attendance[student.id] ? attendance[student.id] : ' unmarked'}`}
                >
                  <div className="student-avatar">
                    {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="student-info">
                    <span className="student-name">{student.name}</span>
                    <span className="student-status">
                      {attendance[student.id] ? attendance[student.id].toUpperCase() : 'NOT MARKED'}
                    </span>
                  </div>
                  <div className="status-toggle-group">
                    <button 
                      className={`toggle-btn present ${attendance[student.id] === 'present' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(student.id, 'present')}
                      title="Present"
                    >
                      P
                    </button>
                    <button 
                      className={`toggle-btn absent ${attendance[student.id] === 'absent' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(student.id, 'absent')}
                      title="Absent"
                    >
                      A
                    </button>
                    <button 
                      className={`toggle-btn late ${attendance[student.id] === 'late' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(student.id, 'late')}
                      title="Late"
                    >
                      L
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="attendance-tally">
            <div className="tally-card present">
              <div className="tally-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="tally-info">
                <span className="tally-count">{presentCount}</span>
                <span className="tally-label">Present</span>
              </div>
            </div>
            <div className="tally-card absent">
              <div className="tally-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div className="tally-info">
                <span className="tally-count">{absentCount}</span>
                <span className="tally-label">Absent</span>
              </div>
            </div>
            <div className="tally-card late">
              <div className="tally-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="tally-info">
                <span className="tally-count">{lateCount}</span>
                <span className="tally-label">Late</span>
              </div>
            </div>
          </div>

          <div className="save-section">
            <button className="btn-save-attendance">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Attendance
            </button>
          </div>
        </div>
      ) : (
        <div className="attendance-report-section">
          <div className="report-header">
            <h3>Attendance Report</h3>
            <div className="report-filters">
              <select className="report-select">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>This Semester</option>
              </select>
              <button className="btn-export-report">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </button>
            </div>
          </div>

          <div className="report-overview">
            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-title">Overall Attendance</span>
                <span className="overview-percentage">85%</span>
              </div>
              <div className="overview-chart">
                <div className="donut-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle present" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle absent" strokeDasharray="15, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle late" strokeDasharray="10, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                </div>
                <div className="legend">
                  <div className="legend-item">
                    <span className="legend-color present"></span>
                    <span>Present (75%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color absent"></span>
                    <span>Absent (15%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color late"></span>
                    <span>Late (10%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overview-stats">
              <div className="stat-card-large">
                <div className="stat-icon-large present">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-number">127</span>
                  <span className="stat-text">Total Present</span>
                </div>
              </div>
              <div className="stat-card-large">
                <div className="stat-icon-large absent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-number">18</span>
                  <span className="stat-text">Total Absent</span>
                </div>
              </div>
              <div className="stat-card-large">
                <div className="stat-icon-large late">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="stat-content">
                  <span className="stat-number">12</span>
                  <span className="stat-text">Total Late</span>
                </div>
              </div>
            </div>
          </div>

          <div className="report-table-container">
            <h4>Daily Breakdown</h4>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-15</td>
                  <td>CSE-A</td>
                  <td>4</td>
                  <td>1</td>
                  <td>0</td>
                  <td><span className="rate-badge high">80%</span></td>
                </tr>
                <tr>
                  <td>2024-01-14</td>
                  <td>ECE-A</td>
                  <td>5</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span className="rate-badge high">100%</span></td>
                </tr>
                <tr>
                  <td>2024-01-13</td>
                  <td>AIML-A</td>
                  <td>3</td>
                  <td>2</td>
                  <td>0</td>
                  <td><span className="rate-badge medium">60%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracking;

