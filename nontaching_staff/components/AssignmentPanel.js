import React, { useState } from 'react';

const AssignmentPanel = ({ staff = [], classes = [], assignments = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [newAssignment, setNewAssignment] = useState({
    staffId: '',
    classId: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  const getStaffName = (id) => staff.find(s => s.id === parseInt(id))?.name || 'Unassigned';
  const getClassName = (id) => classes.find(c => c.id === parseInt(id))?.name || 'Unknown';

  const getStatusColor = (status) => {
    const colors = {
      'active': '#10b981',
      'completed': '#3b82f6',
      'cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignment = {
      ...newAssignment,
      id: assignmentsList.length + 1,
      status: 'active'
    };
    setAssignmentsList([...assignmentsList, assignment]);
    setShowForm(false);
    setNewAssignment({ staffId: '', classId: '', date: '', startTime: '', endTime: '', notes: '' });
  };

  const handleStatusChange = (id, newStatus) => {
    setAssignmentsList(assignmentsList.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  return (
    <div className="assignment-panel">
      <div className="section-header">
        <h2>Assignments</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          New Assignment
        </button>
      </div>

      {showForm && (
        <div className="assignment-form">
          <h3>Create New Assignment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Staff Member</label>
                <select 
                  value={newAssignment.staffId}
                  onChange={(e) => setNewAssignment({...newAssignment, staffId: e.target.value})}
                  required
                >
                  <option value="">Select Staff</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Class</label>
                <select 
                  value={newAssignment.classId}
                  onChange={(e) => setNewAssignment({...newAssignment, classId: e.target.value})}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.subject}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={newAssignment.date}
                  onChange={(e) => setNewAssignment({...newAssignment, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input 
                  type="time" 
                  value={newAssignment.startTime}
                  onChange={(e) => setNewAssignment({...newAssignment, startTime: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input 
                  type="time" 
                  value={newAssignment.endTime}
                  onChange={(e) => setNewAssignment({...newAssignment, endTime: e.target.value})}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea 
                  value={newAssignment.notes}
                  onChange={(e) => setNewAssignment({...newAssignment, notes: e.target.value})}
                  placeholder="Add any additional notes..."
                  rows="3"
                />
              </div>
            </div>
            <button type="submit" className="btn-submit">Create Assignment</button>
          </form>
        </div>
      )}

      <div className="summary-cards">
        <div className="summary-card">
          <h4>Assignment Summary</h4>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="count">{assignmentsList.length}</span>
              <span className="label">Total</span>
            </div>
            <div className="summary-stat">
              <span className="count" style={{ color: '#10b981' }}>
                {assignmentsList.filter(a => a.status === 'active').length}
              </span>
              <span className="label">Active</span>
            </div>
            <div className="summary-stat">
              <span className="count" style={{ color: '#3b82f6' }}>
                {assignmentsList.filter(a => a.status === 'completed').length}
              </span>
              <span className="label">Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="assignments-grid">
        {assignmentsList.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <span className="assignment-id">#{assignment.id}</span>
              <span 
                className="assignment-status" 
                style={{ backgroundColor: getStatusColor(assignment.status) }}
              >
                {assignment.status}
              </span>
            </div>
            <div className="assignment-body">
              <div className="assignment-detail">
                <span className="detail-icon"></span>
                <div>
                  <strong>Staff</strong>
                  <p>{getStaffName(assignment.staffId)}</p>
                </div>
              </div>
              <div className="assignment-detail">
                <span className="detail-icon"></span>
                <div>
                  <strong>Class</strong>
                  <p>{getClassName(assignment.classId)}</p>
                </div>
              </div>
              <div className="assignment-detail">
                <span className="detail-icon"></span>
                <div>
                  <strong>Time</strong>
                  <p>{assignment.date} | {assignment.startTime} - {assignment.endTime}</p>
                </div>
              </div>
              {assignment.notes && (
                <div className="assignment-notes">
                  <strong>Notes</strong>
                  <p>{assignment.notes}</p>
                </div>
              )}
            </div>
            <div className="assignment-actions">
              {assignment.status === 'active' && (
                <>
                  <button 
                    className="btn-complete"
                    onClick={() => handleStatusChange(assignment.id, 'completed')}
                  >
                    Complete
                  </button>
                  <button 
                    className="btn-cancel"
                    onClick={() => handleStatusChange(assignment.id, 'cancelled')}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentPanel;

