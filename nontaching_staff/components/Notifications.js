import React, { useState } from 'react';

const Notifications = ({ notifications = [] }) => {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'all' 
    ? notificationsList 
    : notificationsList.filter(n => n.priority === filter);

  const handleMarkAsRead = (id) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotificationsList(notificationsList.filter(n => n.id !== id));
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'urgent': '',
      'high': '',
      'normal': '',
      'low': ''
    };
    return icons[priority] || '';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="section-header">
        <h2>Notifications</h2>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={handleMarkAllRead}>
              Mark All as Read
            </button>
          )}
          <button className="btn btn-primary">Add Notification</button>
        </div>
      </div>

      <div className="notification-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All <span className="filter-count">{notificationsList.length}</span>
        </button>
        <button 
          className={filter === 'urgent' ? 'active' : ''}
          onClick={() => setFilter('urgent')}
        >
          Urgent <span className="filter-count">{notificationsList.filter(n => n.priority === 'urgent').length}</span>
        </button>
        <button 
          className={filter === 'high' ? 'active' : ''}
          onClick={() => setFilter('high')}
        >
          High <span className="filter-count">{notificationsList.filter(n => n.priority === 'high').length}</span>
        </button>
        <button 
          className={filter === 'normal' ? 'active' : ''}
          onClick={() => setFilter('normal')}
        >
          Normal <span className="filter-count">{notificationsList.filter(n => n.priority === 'normal').length}</span>
        </button>
        <button 
          className={filter === 'low' ? 'active' : ''}
          onClick={() => setFilter('low')}
        >
          Low <span className="filter-count">{notificationsList.filter(n => n.priority === 'low').length}</span>
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-card ${notification.read ? '' : 'unread'} priority-${notification.priority}`}
          >
            <div className="notification-icon">
              {getPriorityIcon(notification.priority)}
            </div>
            <div className="notification-content">
              <div className="notification-header">
                <h4>{notification.title}</h4>
                <span className={`priority-badge priority-${notification.priority}`}>
                  {notification.priority}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>
              <div className="notification-meta">
                <span className="meta-item"> {formatTime(notification.timestamp)}</span>
                {notification.relatedClass && (
                  <span className="meta-item"> {notification.relatedClass}</span>
                )}
                {notification.relatedFaculty && (
                  <span className="meta-item"> {notification.relatedFaculty}</span>
                )}
              </div>
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button 
                  className="btn-icon" 
                  onClick={() => handleMarkAsRead(notification.id)}
                  title="Mark as read"
                >
                  
                </button>
              )}
              <button 
                className="btn-icon delete" 
                onClick={() => handleDelete(notification.id)}
                title="Delete"
              >
                
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="empty-state">
          <p>No notifications found.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;

