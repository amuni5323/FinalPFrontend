import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/shelters">Shelters</Link></li>
        <li><Link to="/hospitals">Hospitals</Link></li>
        <li><Link to="/courts">Courts</Link></li>
        <li><Link to="/police">Police</Link></li>
        <li><Link to="/government">Government</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li><Link to="/headoffices">Head Offices</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/emergencies">emergency Number</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
