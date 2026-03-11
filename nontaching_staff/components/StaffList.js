import React, { useState } from 'react';

const StaffList = ({ staff = [] }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staff.filter(s => {
    const matchesFilter = filter === 'all' || s.availability === filter;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  const getAvailabilityClass = (status) => {
    const classes = {
      'available': 'status-available',
      'on-duty': 'status-on-duty',
      'off-duty': 'status-off-duty',
      'on-leave': 'status-on-leave'
    };
    return classes[status] || '';
  };

  return (
    <div className="staff-management">
      <div className="section-header">
        <h2>Staff Management</h2>
        <div className="header-stats">
          <span className="stat">Total: <strong>{staff.length}</strong></span>
          <span className="stat">Available: <strong>{staff.filter(s => s.availability === 'available').length}</strong></span>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <span className="search-icon"></span>
          <input 
            type="text" 
            placeholder="Search staff..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'available' ? 'active' : ''} 
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={filter === 'on-duty' ? 'active' : ''} 
            onClick={() => setFilter('on-duty')}
          >
            On Duty
          </button>
          <button 
            className={filter === 'off-duty' ? 'active' : ''} 
            onClick={() => setFilter('off-duty')}
          >
            Off Duty
          </button>
        </div>
      </div>

      <div className="staff-grid">
        {filteredStaff.map(member => (
          <div key={member.id} className="staff-card">
            <div className="staff-avatar">{getInitials(member.name)}</div>
            <div className="staff-info">
              <h3>{member.name}</h3>
              <div className="staff-role">{member.role}</div>
              <div className="staff-specialization"> {member.specialization}</div>
              <div className="staff-contact"> {member.email}</div>
              <div className="staff-contact"> {member.phone}</div>
              <span className={`status-badge ${getAvailabilityClass(member.availability)}`}>
                {member.availability}
              </span>
            </div>
            <div className="staff-actions">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="empty-state">
          <p>No staff members found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StaffList;

