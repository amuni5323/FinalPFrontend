import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../components/BackButton";
import '../index.css'
const policeList = [
  { name: "Addis Ababa Police Station", query: "Addis Ababa Police Station", contact: "+251 11 123 45 67", email: "police@addisababa.gov.et" },
  { name: "Bole Police Station", query: "Bole Police Station Addis Ababa", contact: "+251 11 234 56 78", email: "bolepolice@addisababa.gov.et" },
  { name: "Arada Police Station", query: "Arada Police Station Addis Ababa", contact: "+251 11 345 67 89", email: "aradapolice@addisababa.gov.et" },
  { name: "Nifas Silk Police Station", query: "Nifas Silk Police Station Addis Ababa", contact: "+251 11 456 78 90", email: "nifaspolice@addisababa.gov.et" },
  { name: "Kolfe Keranio Police Station", query: "Kolfe Keranio Police Station Addis Ababa", contact: "+251 11 567 89 01", email: "kolfepolice@addisababa.gov.et" }
];

const PoliceList = () => {
  const [selectedPolice, setSelectedPolice] = useState(policeList[0].query);
  const [policeData, setPoliceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa

  const fetchPoliceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedPolice.replace(' Addis Ababa', '')}`);
      if (response.data.length > 0) {
        const police = response.data[0];
        const lat = parseFloat(police.lat);
        const lon = parseFloat(police.lon);

        const policeInfo = {
          name: selectedPolice,
          description: `Police station located in Addis Ababa. (${selectedPolice})`,
          location: police.display_name,
          contact: policeList.find(p => p.query === selectedPolice)?.contact || "No contact available",
          email: policeList.find(p => p.query === selectedPolice)?.email || "No email available",
          image: "https://source.unsplash.com/400x300/?police",
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        };

        setPoliceData(policeInfo);
        setMapCenter([lat, lon]);
      } else {
        alert("No police station found.");
        setPoliceData(null);
        setMapCenter([9.03, 38.74]);
      }
    } catch (error) {
      console.error("Error fetching police data:", error);
      alert("Error fetching police data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPoliceData();
  }, [selectedPolice]);

  return (
    <>
    <div
    className="container-fluid d-flex justify-content-center align-items-center "
   
  >
      <div className=" row ">
        <div className=" media col-md-6 bg-light" >
          <h2>Select a Police Station</h2>
          <div className="mb-3">
            <select className="form-select" onChange={(e) => setSelectedPolice(e.target.value)} value={selectedPolice}>
              {policeList.map((police, index) => (
                <option key={index} value={police.query}>{police.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={fetchPoliceData} disabled={loading} style={{ background: "#343a40" }}>
            {loading ? "Loading..." : "Search"}
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapMover center={mapCenter} />
            {policeData && (
              <Marker position={[policeData.latitude, policeData.longitude]}>
                <Popup>
                  <strong>{policeData.name}</strong>
                  <br />
                  {policeData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {policeData && (
          <div className="col-md-6 bg-light" >
            <div className="card bg-light" >
              <div className="card-body" >
                <h4 className="card-title">{policeData.name}</h4>
                <p className="card-text"><strong>Description:</strong> {policeData.description}</p>
                <p><strong>Location:</strong> {policeData.location}</p>
                <p><strong>Contact:</strong> {policeData.contact}</p>
                <p><strong>Email:</strong> {policeData.email}</p>
                <a href={policeData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer" style={{ background: "#343a40" }}>
                  📍 View on Google Maps
                </a>
              </div>

              <div className="card-footer">
                <img
                  src={policeData.image || "https://via.placeholder.com/400x300.png?text=Police+Station+Image"}
                  alt="Police"
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

export default PoliceList;
