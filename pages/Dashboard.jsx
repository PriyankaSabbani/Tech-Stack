import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api';

const data = [
  { name: 'Tuition Fees', value: 400, color: '#28a745' },
  { name: 'Hostel Fees', value: 300, color: '#dc3545' },
  { name: 'Transport Fees', value: 300, color: '#fd7e14' },
  { name: 'Mess Fees', value: 200, color: '#007bff' },
];

const recentReports = [
  { id: 1, name: 'TechLab Equipment', amount: 1000, status: 'Approved', statusColor: '#28a745', dueDate: 'Nov 28, 2023' },
  { id: 2, name: 'Campus Wi-Fi Renewal', amount: 5000, status: 'Pending', statusColor: '#ffc107', dueDate: 'Nov 15, 2023' },
  { id: 3, name: 'Exam Stationary', amount: 1500, status: 'Cleared', statusColor: '#17a2b8', dueDate: 'Nov 10, 2023' },
  { id: 4, name: 'Hostel Maintenance', amount: 1500, status: 'Overdue', statusColor: '#dc3545', dueDate: 'Nov 17, 2023' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStudents: '...', totalStaff: '...', pendingFees: '...', attendance: '...' });

  useEffect(() => {
    dashboardApi.getStats()
      .then(data => { if (data && data[0]) setStats(data[0]); })
      .catch(() => {});
  }, []);

  const cardStyle = {
    color: '#fff',
    borderRadius: '10px',
    padding: '20px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '120px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const handleHover = (e, enter) => {
    e.currentTarget.style.transform = enter ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = enter ? '0 8px 20px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)';
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      
      {/* Stats Cards — Clickable with Redirect */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        
        {/* Total Students → /students */}
        <div
          style={{ ...cardStyle, backgroundColor: '#17a2b8' }}
          onClick={() => navigate('/students')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Total Students</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', alignSelf: 'flex-end', marginTop: '10px' }}>{stats.totalStudents}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>Click to view →</div>
        </div>

        {/* Total Staff → /staff */}
        <div
          style={{ ...cardStyle, backgroundColor: '#28a745' }}
          onClick={() => navigate('/staff')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Total Staff</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', alignSelf: 'flex-end', marginTop: '10px' }}>{stats.totalStaff}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>Click to view →</div>
        </div>

        {/* Pending Fees → /fees */}
        <div
          style={{ ...cardStyle, backgroundColor: '#dc3545' }}
          onClick={() => navigate('/fees')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Pending Fees</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', alignSelf: 'flex-end', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>₹</span>{stats.pendingFees !== '...' ? Number(stats.pendingFees).toLocaleString() : '...'}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>Click to view →</div>
        </div>

        {/* Attendance → /students */}
        <div
          style={{ ...cardStyle, backgroundColor: '#0d6efd' }}
          onClick={() => navigate('/students')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Attendance</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', alignSelf: 'flex-end', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             {stats.attendance !== '...' ? `${stats.attendance}%` : '...'}
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopColor: '#fff', transform: 'rotate(45deg)' }}></div>
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>Click to view →</div>
        </div>

      </div>

      <div className="row">
        {/* Recent Reports Table */}
        <div className="col-md-8 mb-4">
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: '100%' }}>
            <h5 style={{ marginBottom: '20px', color: '#555', fontWeight: '600' }}>Recent Reports</h5>
            <div className="table-responsive">
              <table className="table table-borderless" style={{ verticalAlign: 'middle' }}>
                <thead style={{ borderBottom: '2px solid #eee' }}>
                  <tr style={{ color: '#888', fontSize: '0.9rem' }}>
                    <th>Student Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map(report => (
                    <tr key={report.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={{ fontWeight: '500', color: '#444' }}>{report.name}</td>
                      <td style={{ color: '#666' }}>₹ {report.amount}</td>
                      <td>
                        <span style={{ backgroundColor: report.statusColor, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', opacity: 0.85, fontWeight: '500' }}>
                          {report.status}
                        </span>
                      </td>
                      <td style={{ color: '#666', fontSize: '0.9rem' }}>{report.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Fee Overview Chart */}
        <div className="col-md-4 mb-4">
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: '100%', minHeight: '300px' }}>
            <h5 style={{ marginBottom: '20px', color: '#555', fontWeight: '600' }}>Fee Overview</h5>
            <div style={{ height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
