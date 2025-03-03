import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import BackButton from "../components/BackButton";
import '../index.css'
const emergencyList = [
  { name: "Police Emergency", query: "Police Emergency Addis Ababa", contact: "+251 11 111 11 11", email: "police@addisababa.gov.et" },
  { name: "Ambulance (Ethiopian Red Cross)", query: "Ambulance Addis Ababa", contact: "+251 11 123 45 67", email: "ambulance@redcross.org.et" },
  { name: "Fire Department", query: "Fire Department Addis Ababa", contact: "+251 11 234 56 78", email: "fire@addisababa.gov.et" },
  { name: "Ethiopian Disaster Risk Management", query: "Ethiopian Disaster Risk Management Addis Ababa", contact: "+251 11 345 67 89", email: "disaster@addisababa.gov.et" },
  { name: "Addis Ababa City Traffic Police", query: "Addis Ababa City Traffic Police", contact: "+251 11 456 78 90", email: "traffic@addisababa.gov.et" },
  { name: "Addis Ababa Health Emergency", query: "Addis Ababa Health Emergency Addis Ababa", contact: "+251 11 567 89 01", email: "health@addisababa.gov.et" },
  { name: "Water Emergency", query: "Water Emergency Addis Ababa", contact: "+251 11 678 90 12", email: "water@addisababa.gov.et" },
  { name: "Electricity Emergency", query: "Electricity Emergency Addis Ababa", contact: "+251 11 789 01 23", email: "electricity@addisababa.gov.et" },
  { name: "Red Crescent Society Emergency", query: "Red Crescent Society Emergency Addis Ababa", contact: "+251 11 890 12 34", email: "redcrescent@addisababa.gov.et" },
  { name: "General Emergency Hotline", query: "General Emergency Addis Ababa", contact: "+251 11 901 23 45", email: "emergency@addisababa.gov.et" }
];

const EmergencyList = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(emergencyList[0].query);
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa

  const fetchEmergencyData = async () => {
    setLoading(true);
    console.log("Fetching data for:", selectedEmergency); // Debugging line
    try {
      // Remove "Addis Ababa" from the query for better results
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedEmergency.replace(' Addis Ababa', '')}`);
      
      // Debugging: log the API response to check what's being returned
      console.log("API Response:", response.data);

      if (response.data.length > 0) {
        const emergency = response.data[0];
        const lat = parseFloat(emergency.lat);
        const lon = parseFloat(emergency.lon);

        const emergencyInfo = {
          name: selectedEmergency,
          description: `Emergency service available in Addis Ababa. (${selectedEmergency})`,
          location: emergency.display_name,
          contact: emergencyList.find(e => e.query === selectedEmergency)?.contact || "No contact available",
          email: emergencyList.find(e => e.query === selectedEmergency)?.email || "No email available",
          image: "https://source.unsplash.com/400x300/?emergency,help",
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        };

        setEmergencyData(emergencyInfo);
        setMapCenter([lat, lon]);
      } else {
        alert("No emergency service found.");
        setEmergencyData(null);
        setMapCenter([9.03, 38.74]); // Reset map to default location
      }
    } catch (error) {
      console.error("Error fetching emergency data:", error);
      alert("Error fetching emergency data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmergencyData();  // Fetch data whenever `selectedEmergency` changes
  }, [selectedEmergency]);

  return (
    <>
    <div
    className="container-fluid d-flex justify-content-center align-items-center "
  >
      <div className="row "   >
        <div className=" media col-md-6 bg-light"    >
          <h2>Select an Emergency Service</h2>
          <div className="mb-3"  >
            <select className="form-select" onChange={(e) => setSelectedEmergency(e.target.value)} value={selectedEmergency}>
              {emergencyList.map((emergency, index) => (
                <option key={index} value={emergency.query}>{emergency.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={fetchEmergencyData} disabled={loading}    style={{ background: "#343a40" }}>
            {loading ? "Loading..." : "Search"}
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapMover center={mapCenter} />
            {emergencyData && (
              <Marker position={[emergencyData.latitude, emergencyData.longitude]}>
                <Popup>
                  <strong>{emergencyData.name}</strong>
                  <br />
                  {emergencyData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {emergencyData && (
          <div className="col-md-6"    >
            <div className="card bg-light"    >
              <div className="card-body"    >
                <h4 className="card-title">{emergencyData.name}</h4>
                <p className="card-text"><strong>Description:</strong> {emergencyData.description}</p>
                <p><strong>Location:</strong> {emergencyData.location}</p>
                <p><strong>Contact:</strong> {emergencyData.contact}</p>
                <p><strong>Email:</strong> {emergencyData.email}</p>
                <a href={emergencyData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer"    style={{ background: "#343a40" }}>
                  📍 View on Google Maps
                </a>
              </div>

              <div className="card-footer">
                <img
                  src={emergencyData.image || "https://via.placeholder.com/400x300.png?text=Emergency+Image"}
                  alt="Emergency"
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

const MapMover = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

export default EmergencyList;
