import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      try {
        const dbEvents = await axios.get('https://finalpbackend-2.onrender.com/api/events/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setEvents(dbEvents.data);
      } catch (err) {
        setError('Failed to fetch events. Please check your server.');
      }
    };

    fetchEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) return;

      const response = await axios.post(
        `https://finalpbackend-2.onrender.com/api/events/approve/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.data.success) {
        setEvents(events.map(event =>
          event._id === eventId ? { ...event, approved: true } : event
        ));
      }
    } catch {
      setError('Failed to approve event.');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) return;

      const response = await axios.delete(
        `https://finalpbackend-2.onrender.com/api/events/delete/${eventId}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.data.message === "Event deleted successfully") {
        setEvents(events.map(event =>
          event._id === eventId ? { ...event, deleted: true } : event
        ));
      }
    } catch {
      setError('Failed to delete event.');
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      {/* Header */}
      <div className="bg-dark text-white py-3 mb-4">
        <div className="container">
          <h2 className="text-center">Admin Dashboard</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="container p-4 rounded shadow-lg ">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {events.length > 0 ? events.map(event => (
            <div key={event._id} className="col-md-4 mb-3">
              <div className="card" style={{ background: "#999991 "}}>
                <div className="card-body text-white">
                  <h5>{event.title}</h5>
                  <p className="mb-1">{event.description}</p>
                  <small className="text-muted">{event.date}</small>

                  <div className="mt-3">
                    {event.approved ? (
                      <span className="text-success">✅ Approved</span>
                    ) : event.deleted ? (
                      <span className="text-danger">❌ Deleted</span>
                    ) : (
                      <>
                        <span className="me-2">⬜</span>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(event._id)}>
                          Approve
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )) : <p className="text-center">No events available.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
