import React, { useState } from 'react';

const StaffScheduling = ({ staff = [], schedules = [] }) => {
  const [viewMode, setViewMode] = useState('day');

  const getStaffName = (id) => staff.find(s => s.id === id)?.name || 'Unknown';
  const getStaffRole = (id) => staff.find(s => s.id === id)?.role || '';

  return (
    <div className="staff-scheduling">
      <div className="section-header">
        <h2>Staff Scheduling</h2>
      </div>

      <div className="schedule-controls">
        <div className="view-toggle">
          <button 
            className={viewMode === 'day' ? 'active' : ''} 
            onClick={() => setViewMode('day')}
          >
            Day View
          </button>
          <button 
            className={viewMode === 'week' ? 'active' : ''} 
            onClick={() => setViewMode('week')}
          >
            Week View
          </button>
        </div>
        <div className="date-navigation">
          <button>Previous</button>
          <input type="date" defaultValue="2024-01-15" />
          <button>Next</button>
        </div>
        <button className="btn btn-primary">Add Shift</button>
      </div>

      <div className="day-view">
        <h3>Monday, January 15, 2024</h3>
        <div className="time-grid">
          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
            <div key={time} className="time-slot-row">
              <div className="time-label">{time}</div>
              <div className="slot-content">
                {schedules
                  .filter(s => s.shiftStart <= time && s.shiftEnd > time)
                  .map(s => (
                    <div key={s.id} className="schedule-card-mini">
                      <strong>{getStaffName(s.staffId)}</strong>
                      <span>{s.location}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="upcoming-shifts">
        <h3>Upcoming Shifts</h3>
        <div className="shifts-list">
          {schedules.map(schedule => (
            <div key={schedule.id} className="shift-card">
              <div className="shift-info">
                <strong>{getStaffName(schedule.staffId)}</strong>
                <span className="shift-role">{getStaffRole(schedule.staffId)}</span>
              </div>
              <div className="shift-details">
                <span> {schedule.date}</span>
                <span> {schedule.shiftStart} - {schedule.shiftEnd}</span>
                <span> {schedule.location}</span>
              </div>
              <button className="btn-small">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffScheduling;

