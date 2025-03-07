import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import axios from 'axios';
import { Dropdown, Button, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventList = () => {
  const { data, fetchApprovedEvents } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({ fullName: '', email: '' });
  const [date, setDate] = useState(null);
  
  useEffect(() => {
    fetchApprovedEvents();
  }, [fetchApprovedEvents]);

  useEffect(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(event.date).toLocaleDateString().includes(searchQuery)
      );
    }

    if (date) {
      filtered = filtered.filter(event => 
        new Date(event.date).toDateString() === new Date(date).toDateString()
      );
    }

    setUpcomingEvents(filtered.filter(event => new Date(event.date) >= new Date()));
    setPastEvents(filtered.filter(event => new Date(event.date) < new Date()));
  }, [searchQuery, date, data]);

  const handleBooking = async (eventId) => {
    if (!bookingInfo.fullName || !bookingInfo.email) {
        alert('Please enter your full name and email.');
        return;
    }

    try {
        const checkResponse = await axios.get('https://finalpbackend-2.onrender.com/api/booking/check', {
            params: { eventId, email: bookingInfo.email }
        });

        if (checkResponse.data.alreadyBooked) {
            alert('You have already booked this event with this email.');
            return;
        }

        const response = await axios.post('https://finalpbackend-2.onrender.com/api/booking', {
            fullName: bookingInfo.fullName,
            email: bookingInfo.email,
        }, {
            params: { eventId }
        });

        if (response.status === 201) {
            alert('Booking successful! Check your email for confirmation.');
        }
    } catch (error) {
        alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <h2 className="text-center mb-4">Event List</h2>
      <div className="row">
        <div className="col-md-3 d-flex flex-column align-items-center">
          <Calendar onChange={setDate} value={date} className="mb-3 w-100" />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-9">
          <h3>Upcoming Events</h3>
          <div className="row">
            {upcomingEvents.map(event => (
              <div key={event._id} className="col-md-4 mb-3">
                <div className="card mx-2" style={{ width: '100%' }}>
                  <div className="card-body">
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Book Now
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Form className="p-3">
                          <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Your full name" onChange={(e) => setBookingInfo({ ...bookingInfo, fullName: e.target.value })} />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Your Email" onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })} />
                          </Form.Group>
                          <Button className="mt-2 w-100" onClick={() => handleBooking(event._id)}>Confirm Booking</Button>
                        </Form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-4">Past Events</h3>
          <div className="row">
            {pastEvents.map(event => (
              <div key={event._id} className="col-md-4 mb-3">
                <div className="card mx-2 bg-light" style={{ width: '100%' }}>
                  <div className="card-body">
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;