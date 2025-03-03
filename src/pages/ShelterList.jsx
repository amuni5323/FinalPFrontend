import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../components/BackButton";
import '../index.css'
// List of shelters with actual locations
const sheltersList = [
  {
    name: "Administration for Refugee & Returnee Affairs (ARRA)",
    latitude: 9.0221,
    longitude: 38.7469,
    location: "Bole, Addis Ababa, Ethiopia",
    contact: "+251 11 155 1111",
    email: "info@arra.gov.et"
  },
  {
    name: "UNHCR Ethiopia",
    latitude: 9.0105,
    longitude: 38.7612,
    location: "Ethio-Chinese Friendship Road, Addis Ababa, Ethiopia",
    contact: "+251 905 012 823",
    email: "ethad@unhcr.org"
  },
  {
    name: "Jesuit Refugee Service Ethiopia",
    latitude: 9.0284,
    longitude: 38.7536,
    location: "Yeka, Addis Ababa, Ethiopia",
    contact: "+251 11 662 5940",
    email: "info@jrsethiopia.org"
  },
  {
    name: "International Organization for Migration (IOM)",
    latitude: 9.0408,
    longitude: 38.7484,
    location: "Kazanchis, Addis Ababa, Ethiopia",
    contact: "+251 11 130 2500",
    email: "iomethiopia@iom.int"
  }
];

const SheltersList = () => {
  const [selectedShelter, setSelectedShelter] = useState(sheltersList[0]);
  const [shelterData, setShelterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default to Addis Ababa

  useEffect(() => {
    fetchShelterData(selectedShelter);
  }, [selectedShelter]);

  const fetchShelterData = async (shelter) => {
    setLoading(true);
    try {
      // Fetch location from Nominatim API
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${shelter.location}`
      );
      console.log("API Response:", response.data); // Debugging

      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];

        setShelterData({
          name: shelter.name,
          location: display_name,
          contact: shelter.contact,
          email: shelter.email,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`
        });
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        // Use predefined coordinates if Nominatim fails
        setShelterData({
          ...shelter,
          googleMapsLink: `https://www.google.com/maps?q=${shelter.latitude},${shelter.longitude}`
        });
        setMapCenter([shelter.latitude, shelter.longitude]);
      }
    } catch (error) {
      console.error("Error fetching shelter data:", error);
      alert("Error fetching shelter data. Using stored location.");
      setShelterData({
        ...shelter,
        googleMapsLink: `https://www.google.com/maps?q=${shelter.latitude},${shelter.longitude}`
      });
      setMapCenter([shelter.latitude, shelter.longitude]);
    }
    setLoading(false);
  };

  return (
    <>
    <div
    className="container-fluid d-flex justify-content-center align-items-center "
   
  >
      <div className="row "  >
        <div className=" media col-md-6 bg-light" >
          <h2>Select a Shelter</h2>
          <select
            className="form-select"
            onChange={(e) => setSelectedShelter(sheltersList.find(s => s.name === e.target.value))}
            value={selectedShelter.name}
          >
            {sheltersList.map((shelter, index) => (
              <option key={index} value={shelter.name}>{shelter.name}</option>
            ))}
          </select>
          <button className="btn btn-primary w-100 my-3" onClick={() => fetchShelterData(selectedShelter)} disabled={loading}  style={{ background: "#343a40" }}>
            {loading ? "Loading..." : "Search"}
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {shelterData && (
              <Marker position={[shelterData.latitude, shelterData.longitude]}>
                <Popup>
                  <strong>{shelterData.name}</strong>
                  <br />
                  {shelterData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {shelterData && (
          <div className="col-md-6 bg-light"  >
            <div className="card text-dark bg-light"  >
              <div className="card-body"  >
                <h4 className="card-title">{shelterData.name}</h4>
                <p><strong>Location:</strong> {shelterData.location}</p>
                <p><strong>Contact:</strong> {shelterData.contact}</p>
                <p><strong>Email:</strong> {shelterData.email}</p>
                <a href={shelterData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer"  style={{ background: "#343a40" }}>
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

export default SheltersList;
