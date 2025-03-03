import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import BackButton from "../components/BackButton";
import '../index.css'
const governmentList = [
  { name: "Ministry of Finance", query: "Ministry of Finance Addis Ababa", contact: "+251 11 123 45 67", email: "finance@addisababa.gov.et" },
  { name: "Ministry of Health", query: "Ministry of Health Addis Ababa", contact: "+251 11 234 56 78", email: "health@addisababa.gov.et" },
  { name: "Ministry of Education", query: "Ministry of Education Addis Ababa", contact: "+251 11 345 67 89", email: "education@addisababa.gov.et" },
  { name: "Ethiopian Investment Commission", query: "Ethiopian Investment Commission Addis Ababa", contact: "+251 11 456 78 90", email: "investment@addisababa.gov.et" },
  { name: "Addis Ababa City Administration", query: "Addis Ababa City Administration", contact: "+251 11 567 89 01", email: "cityadmin@addisababa.gov.et" }
];

const GovernmentList = () => {
  const [selectedGovernment, setSelectedGovernment] = useState(governmentList[0].query);
  const [governmentData, setGovernmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa

  const fetchGovernmentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedGovernment.replace(' Addis Ababa', '')}`);
      if (response.data.length > 0) {
        const government = response.data[0];
        const lat = parseFloat(government.lat);
        const lon = parseFloat(government.lon);

        const governmentInfo = {
          name: selectedGovernment,
          description: `Government service available in Addis Ababa. (${selectedGovernment})`,
          location: government.display_name,
          contact: governmentList.find(g => g.query === selectedGovernment)?.contact || "No contact available",
          email: governmentList.find(g => g.query === selectedGovernment)?.email || "No email available",
          image: "https://source.unsplash.com/400x300/?government",
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        };

        setGovernmentData(governmentInfo);
        setMapCenter([lat, lon]);
      } else {
        alert("No government service found.");
        setGovernmentData(null);
        setMapCenter([9.03, 38.74]); // Reset map to default location
      }
    } catch (error) {
      console.error("Error fetching government data:", error);
      alert("Error fetching government data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGovernmentData();
  }, [selectedGovernment]);

  return (
    <> 
    <div
    className="container-fluid d-flex justify-content-center align-items-center "
  >
      <div className=" media row" >
        <div className="col-md-6 text-dark bg-light" >
          <h2>Select a Government Service</h2>
          <div className="mb-3" style={{ background: "linear-gradient(to right, #111111, #17999c)" }}>
            <select className="form-select" onChange={(e) => setSelectedGovernment(e.target.value)} value={selectedGovernment}>
              {governmentList.map((government, index) => (
                <option key={index} value={government.query}>{government.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={fetchGovernmentData} disabled={loading} style={{ background: "#343a40" }}>
            {loading ? "Loading..." : "Search"}
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapMover center={mapCenter} />
            {governmentData && (
              <Marker position={[governmentData.latitude, governmentData.longitude]}>
                <Popup>
                  <strong>{governmentData.name}</strong>
                  <br />
                  {governmentData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {governmentData && (
          <div className="col-md-6 text-light">
            <div className="card" >
              <div className="card-body text-dark bg-light" >
                <h4 className="card-title">{governmentData.name}</h4>
                <p className="card-text"><strong>Description:</strong> {governmentData.description}</p>
                <p><strong>Location:</strong> {governmentData.location}</p>
                <p><strong>Contact:</strong> {governmentData.contact}</p>
                <p><strong>Email:</strong> {governmentData.email}</p>
                <a href={governmentData.googleMapsLink} className="btn btn-outline-primary w-100 text-white" target="_blank" rel="noopener noreferrer" style={{ background: "#343a40" }}>
                  📍 View on Google Maps
                </a>
              </div>

              <div className="card-footer" >
                <img
                  src={governmentData.image || "https://via.placeholder.com/400x300.png?text=Government+Image"}
                  alt="Government"
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

export default GovernmentList;
