import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from '../components/BackButton';

const bookLocationsList = [
  { name: 'Jafer Books', address: 'Addis Ababa, Ethiopia', contact: '+251-11-123-45-67', email: 'info@jaferbooks.com' },
  { name: 'Ethiobooks', address: 'Addis Ababa, Ethiopia', contact: '+251-11-222-33-44', email: 'info@ethiobooks.com' },
  { name: 'BookSite', address: 'Addis Ababa, Ethiopia', contact: '+251-11-555-66-77', email: 'info@booksite.com' },
  { name: 'HaHu Books', address: 'Addis Ababa, Ethiopia', contact: '+251-11-888-99-00', email: 'info@hahu.com' },
  { name: 'Book World', address: 'Addis Ababa, Ethiopia', contact: '+251-11-444-55-66', email: 'info@bookworld.com' },
];

const BookList = () => {
  const [selectedBookstore, setSelectedBookstore] = useState(bookLocationsList[0]);
  const [bookstoreData, setBookstoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default: Addis Ababa

  useEffect(() => {
    fetchBookstoreData(selectedBookstore);
  }, [selectedBookstore]);

  const fetchBookstoreData = async (bookstore) => {
    setLoading(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: bookstore.address, format: 'json', addressdetails: 1, limit: 1 },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setBookstoreData({
          ...bookstore,
          location: display_name,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`,
        });
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        setBookstoreData({ ...bookstore, location: 'Location not found', latitude: 9.03, longitude: 38.74 });
      }
    } catch (error) {
      console.error('Error fetching bookstore data:', error);
      alert('Error fetching bookstore data. Try again.');
    }
    setLoading(false);
  };

  return (
    <> 
    <div className="container-fluid vh-100 d-flex flex-column">
  <div className="row bg-light">
    {/* Left Section: Dropdown and Map */}
    <div className="col-md-6">
      <h2>Select a Bookstore</h2>
      <select
        className="form-select"
        onChange={(e) => setSelectedBookstore(bookLocationsList.find((b) => b.name === e.target.value))}
        value={selectedBookstore.name}
      >
        {bookLocationsList.map((bookstore, index) => (
          <option key={index} value={bookstore.name}>
            {bookstore.name}
          </option>
        ))}
      </select>
      <button className="btn btn-primary w-100 my-3" onClick={() => fetchBookstoreData(selectedBookstore)} disabled={loading} style={{background:'#343a40'}}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      <MapContainer center={mapCenter} zoom={15} style={{ height: '350px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        {bookstoreData && (
          <Marker position={[bookstoreData.latitude, bookstoreData.longitude]}>
            <Popup>
              <strong>{bookstoreData.name}</strong>
              <br />
              {bookstoreData.location}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>

    {/* Right Section: Bookstore Info */}
    {bookstoreData && (
      <div className="col-md-6 mt-4"> {/* Added mt-4 to create space */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{bookstoreData.name}</h4>
            <p><strong>Location:</strong> {bookstoreData.location}</p>
            <p><strong>Contact:</strong> {bookstoreData.contact}</p>
            <p><strong>Email:</strong> {bookstoreData.email}</p>
            <a href={bookstoreData.googleMapsLink} className="btn btn-outline-primary w-100" target="_blank" rel="noopener noreferrer">
              📍 View on Google Maps
            </a>
          </div>
          
        </div>
      </div>
    )}
  </div>
</div>
</>
  );
};




export default BookList;
