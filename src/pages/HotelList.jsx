import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import { DataContext } from '../context/DataContext';
import BackButton from "../components/BackButton";
import { fetchImageByName } from "../utils/api"; // Import the image fetching function
import '../index.css'
const hotelsList = [
  { name: "Sheraton Addis", query: "Sheraton Addis", contact: "+251 116 61 12 12", email: "info@sheratonaddis.com" },
  { name: "Radisson Blu Hotel Addis Ababa", query: "Radisson Blu Hotel Addis Ababa", contact: "+251 11 517 17 17", email: "info.addisababa@radissonblu.com" },
  { name: "Hyatt Regency Addis Ababa", query: "Hyatt Regency Addis Ababa", contact: "+251 11 551 1234", email: "info.addisababa@hyatt.com" },
  { name: "Elilly International Hotel", query: "Elilly International Hotel", contact: "+251 116 61 43 43", email: "info@elilly.com" },
  { name: "Golden Tulip Addis Ababa", query: "Golden Tulip Addis Ababa", contact: "+251 11 515 23 23", email: "info@goldentulipaddisababa.com" }
];

const HotelList = () => {
  const [selectedHotel, setSelectedHotel] = useState(hotelsList[0].query);
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa
  const { hotels } = useContext(DataContext);
  
  const fetchHotelData = async () => {
    setLoading(true);
    console.log("Fetching data for:", selectedHotel); // Debugging line
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedHotel} Addis Ababa`);
      if (response.data.length > 0) {
        const hotel = response.data[0]; // First result
        const lat = parseFloat(hotel.lat);
        const lon = parseFloat(hotel.lon);
        
        // Get hotel info and assign static data for email, etc.
        const hotelInfo = {
          name: selectedHotel,
          description: `A luxurious hotel offering top-class services in the heart of Addis Ababa. (${selectedHotel})`,
          location: hotel.display_name,
          contact: hotelsList.find(hotel => hotel.query === selectedHotel).contact,
          email: hotelsList.find(hotel => hotel.query === selectedHotel).email,
          roomsAvailable: Math.floor(Math.random() * 50) + 10, // Random rooms
          pricePerNight: Math.floor(Math.random() * 300) + 100, // Random price
          amenities: selectedHotel === "Sheraton Addis" ? ["Free WiFi", "Swimming Pool", "Spa", "Gym", "Restaurant"] : ["Free WiFi", "Business Center", "Bar", "Parking", "Restaurant"], // Different amenities
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating 3.0 - 5.0
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        };
        
        // Fetch hotel image by name
        const imageUrl = await fetchImageByName(selectedHotel);
        hotelInfo.image = imageUrl || "https://via.placeholder.com/400x300.png?text=Hotel+Image"; // Fallback if image is not available
        
        setHotelData(hotelInfo);
        setMapCenter([lat, lon]); // Move map
        console.log("Hotel data:", hotelInfo); // Debugging line
      } else {
        alert("No hotel found.");
        setHotelData(null);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      alert("Error fetching hotel data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotelData();
  }, [selectedHotel]);

  return (
    <>
     
      <div className="container-fluid  d-flex justify-content-center align-items-center mt-2 " >
        <div className=" media row text-dark bg-light" >
          {/* Left Side: Map & Hotel Selection */}
          <div className=" media col-md-6">
            <h2>Select a Hotel</h2>
            <div className="mb-3" >
              <select className="form-select" onChange={(e) => setSelectedHotel(e.target.value)} value={selectedHotel}>
                {hotelsList.map((hotel, index) => (
                  <option key={index} value={hotel.query}>{hotel.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary w-100 mb-3" onClick={fetchHotelData} disabled={loading} style={{ background: "#343a40" }}>
              {loading ? "Loading..." : "Search"}
            </button>

            <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapMover center={mapCenter} />
              {hotelData && (
                <Marker position={[hotelData.latitude, hotelData.longitude]}>
                  <Popup>
                    <strong>{hotelData.name}</strong>
                    <br />
                    {hotelData.location}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          {/* Right Side: Hotel Details */}
          {hotelData && (
            <div className="col-md-6">
              <div className="card text-dark bg-light" >
                <div className="card-body" >
                  <h4 className="card-title">{hotelData.name}</h4>
                  <p className="card-text"><strong>Description:</strong> {hotelData.description}</p>
                  <p><strong>Location:</strong> {hotelData.location}</p>
                  <p><strong>Contact:</strong> {hotelData.contact}</p>
                  <p><strong>Email:</strong> {hotelData.email}</p>
                  <p><strong>Rooms Available:</strong> {hotelData.roomsAvailable}</p>
                  <p><strong>Price Per Night:</strong> ${hotelData.pricePerNight}</p>
                  <p><strong>Amenities:</strong> {Array.isArray(hotelData.amenities) ? hotelData.amenities.join(", ") : "N/A"}</p>
                  <p><strong>Rating:</strong> ⭐ {hotelData.rating}</p>
                  <a href={hotelData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer" style={{ background: "#343a40" }}>
                    📍 View on Google Maps
                  </a>
                </div>

                <div className="card-footer">
                  <img
                    src={hotelData.image}
                    alt="Hotel"
                    className="img-fluid"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Moves map to new location when hotel is selected
const MapMover = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

export default HotelList;
