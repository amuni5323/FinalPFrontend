import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import axios from 'axios';
import { Dropdown, Button, Form } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventList = () => {
  const { data, fetchApprovedEvents } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [date, setDate] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetchApprovedEvents();
  }, [fetchApprovedEvents]);

  useEffect(() => {
    const now = new Date();
    const upcoming = data.filter(event => new Date(event.date) >= now);
    const past = data.filter(event => new Date(event.date) < now);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
    setFilteredEvents(upcoming);
  }, [data]);

  useEffect(() => {
    let filtered = upcomingEvents;
    if (searchQuery) {
      filtered = data.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (date) {
      filtered = data.filter(event => new Date(event.date).toDateString() === date.toDateString());
    }
    setFilteredEvents(filtered);
  }, [searchQuery, date, data]);

  return (
    <div className="container-fluid vh-100">
      <h2 className="text-center mb-4">Event List</h2>

      <div className="row">
        {/* Left Side - Calendar & Search */}
        <div className="col-md-3 d-flex flex-column align-items-center">
          <Calendar onChange={setDate} value={date} className="mb-3 w-100" />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="mt-2 bg-secondary" onClick={() => { setSearchQuery(''); setDate(null); setFilteredEvents(upcomingEvents); }}>
            Clear Search
          </Button>
        </div>

        {/* Right Side - Events */}
        <div className="col-md-9">
          <h3>Upcoming Events</h3>
          <div className="row">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event._id} className="col-md-4 mb-3">
                  <div className="card mx-2">
                    {event.image && <img src={event.image} className="card-img-top" alt="Event" />}
                    <div className="card-body">
                      <h5>{event.title}</h5>
                      <p>{event.description}</p>
                      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events found.</p>
            )}
          </div>

          <h3 className="mt-5">Past Events</h3>
          <div className="row">
            {pastEvents.length > 0 && !searchQuery && !date ? (
              pastEvents.map(event => (
                <div key={event._id} className="col-md-4 mb-3">
                  <div className="card mx-2">
                    <div className="card-body">
                      <h5>{event.title}</h5>
                      <p>{event.description}</p>
                      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
