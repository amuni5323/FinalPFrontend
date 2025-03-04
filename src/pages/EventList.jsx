import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import axios from 'axios';
import { Dropdown, Button, Form } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import BackButton from "../components/BackButton";

const EventList = () => {
  const { data, fetchApprovedEvents } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(data);
  const [bookingInfo, setBookingInfo] = useState({ fullName: '', email: '', qrCodeImage: '' });

  useEffect(() => {
    fetchApprovedEvents(); // ✅ Call the correct fetch function
  }, [fetchApprovedEvents]);
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(data);
    }
  }, [searchQuery, data]);

  const handleBooking = async (eventId) => {
    if (!bookingInfo.fullName || !bookingInfo.email) {
        alert('Please enter your full name and email.');
        return;
    }

    try {
        // Step 1: Check if the email has already booked this event
        const checkResponse = await axios.get('https://finalpbackend-2.onrender.com/api/booking/check', {
            params: { eventId, email: bookingInfo.email }
        });

        if (checkResponse.data.alreadyBooked) {
            alert('You have already booked this event with this email.');
            return;
        }

        // Step 2: Proceed with booking
        const response = await axios.post('https://finalpbackend-2.onrender.com/api/booking', {
            fullName: bookingInfo.fullName,
            email: bookingInfo.email,
        }, {
            params: { eventId }
        });

        if (response.status === 201) {
            alert('Booking successful! Check your email for confirmation.');

            // Generate and set the QR Code
            const qrCodeData = response.data.qrCodeImage;
            setBookingInfo({ ...bookingInfo, qrCodeImage: qrCodeData });
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                alert('You have already booked this event with this email.');
            } else {
                alert(error.response.data.message || 'Booking failed. Please try again.');
            }
        } else {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        }
    }
};

  
  
  return (
    <>
    <div className="container-fluid vh-100 d-flex flex-column"  >
      <h2 className="text-center mb-4  ">Event List</h2>

      <div className="row mb-4 "  >
        <div className="col-md-6 offset-md-3"  >
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row"  >
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="col-md-4 mb-3  " >
              <div className="card mx-5" style={{ width: '80%', fontWeight:"5%" ,background: "#f8f9fa"}}>
                <div className="card-body d-flex justify-content-center align-item-center ">
                  <h5 className="card-title text-dark" style={{color:"#11112991"}}>{event.title}</h5>
                  <p className="card-text ">{event.description}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                  <p><strong>Location:</strong> {event.location}</p>

                  {/* Booking Form */}
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ background: "#343a40"}} >
                      Book Now
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ background: "#f8f9fa", color:"#999777"}}>
                      <Form className="p-3" style={{ background: "#f8f9fa"}}>
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Your full name"
                            onChange={(e) => {
                              setBookingInfo({ ...bookingInfo, fullName: e.target.value });
                            }}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Your Email"
                            onChange={(e) => {
                              setBookingInfo({ ...bookingInfo, email: e.target.value });
                            }}
                          />
                        </Form.Group >
                        <Button
                          className="mt-2 w-100"
                        
                          onClick={() => handleBooking(event._id)}
                          style={{ background: "#343a40"}}
                        >
                          Confirm Booking
                        </Button>
                      </Form>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No events found</p>
          </div>
        )}
      </div>

      {/* Display QR Code */}
      {bookingInfo.qrCodeImage && (
        <div className="text-center mt-4">
          <h3>Your Booking QR Code:</h3>
          <QRCode value={bookingInfo.qrCodeImage} style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
    </>
  );
};

export default EventList;
