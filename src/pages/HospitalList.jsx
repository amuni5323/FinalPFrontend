import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import '../index.css'
import BackButton from "../components/BackButton";
const MapMover = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const hospitalsList = [
  { name: "St. Paul's Hospital", query: "St. Paul's Hospital Addis Ababa", location: "Addis Ababa", phone: "+251 111 22 33 44", email: "info@stpauls.org", rating: "4.5" },
  { name: "Black Lion Hospital", query: "Black Lion Hospital Addis Ababa", location: "Addis Ababa", phone: "+251 11 111 22 33", email: "info@blacklion.org", rating: "4.0" },
];

const HospitalList = () => {
  const [selectedHospital, setSelectedHospital] = useState(hospitalsList[0].query);
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa

  const fetchHospitalData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedHospital} Addis Ababa`);
      if (response.data.length > 0) {
        const hospital = response.data[0];
        const lat = parseFloat(hospital.lat);
        const lon = parseFloat(hospital.lon);

        const hospitalInfo = {
          name: selectedHospital,
          location: hospital.display_name,
          phone: hospitalsList.find(h => h.query === selectedHospital).phone,
          email: hospitalsList.find(h => h.query === selectedHospital).email,
          rating: hospitalsList.find(h => h.query === selectedHospital).rating,
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        };

        setHospitalData(hospitalInfo);
        setMapCenter([lat, lon]); // Move map
      } else {
        alert("No hospital found.");
        setHospitalData(null);
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      alert("Error fetching hospital data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHospitalData();
  }, [selectedHospital]);

  return (
    <>
    <div
    className="container-fluid d-flex justify-content-center align-items-center mt-4"
  >
      <div className=" media row"    >
        <div className="col-md-6 text-dark bg-light"    >
          <h2>Select a Hospital</h2>
          <div className="mb-3"     >
            <select className="form-select" onChange={(e) => setSelectedHospital(e.target.value)} value={selectedHospital}>
              {hospitalsList.map((hospital, index) => (
                <option key={index} value={hospital.query}>{hospital.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={fetchHospitalData} disabled={loading}     style={{ background: "#343a40" }}>
            {loading ? "Loading..." : "Search"} 
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapMover center={mapCenter} />
            {hospitalData && (
              <Marker position={[hospitalData.latitude, hospitalData.longitude]}>
                <Popup>
                  <strong>{hospitalData.name}</strong>
                  <br />
                  {hospitalData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {hospitalData && (
          <div className="col-md-6"    >
            <div className="card text-dark bg-light"    >
              <div className="card-body"    >
                <h4 className="card-title">{hospitalData.name}</h4>
                <p><strong>Location:</strong> {hospitalData.location}</p>
                <p><strong>Phone:</strong> {hospitalData.phone}</p>
                <p><strong>Email:</strong> {hospitalData.email}</p>
                <p><strong>Rating:</strong> {hospitalData.rating} ⭐</p>
                <a href={hospitalData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer"     style={{ background: "#343a40" }}>
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

export default HospitalList;
