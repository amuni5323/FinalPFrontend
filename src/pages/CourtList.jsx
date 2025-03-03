import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../components/BackButton";
import { fetchImageByName } from "../utils/api"; 
import '../index.css'
const courtsList = [
  { name: "Federal Supreme Court", query: "Federal Supreme Court Addis Ababa", contact: "+251 11 123 45 67", email: "supremecourt@ethiopia.gov.et" },
  { name: "Federal High Court", query: "Federal High Court Addis Ababa", contact: "+251 11 234 56 78", email: "highcourt@ethiopia.gov.et" },
  { name: "Federal First Instance Court", query: "Federal First Instance Court Addis Ababa", contact: "+251 11 416 7234", email: "firstinstance@ethiopia.gov.et" },
  { name: "Addis Ababa City Court", query: "Addis Ababa City Court", contact: "+251 11 345 67 89", email: "citycourt@addisababa.gov.et" },
  { name: "Federal Supreme Sharia Court", query: "Federal Supreme Sharia Court Addis Ababa", contact: "+251 11 456 78 90", email: "shariacourt@ethiopia.gov.et" },
  { name: "Labour Relations Board", query: "Labour Relations Board Addis Ababa", contact: "+251 11 567 89 01", email: "labourboard@ethiopia.gov.et" },
  { name: "Tax Appeal Commission", query: "Tax Appeal Commission Addis Ababa", contact: "+251 11 678 90 12", email: "taxappeal@ethiopia.gov.et" },
  { name: "Customs Appeal Commission", query: "Customs Appeal Commission Addis Ababa", contact: "+251 11 789 01 23", email: "customsappeal@ethiopia.gov.et" },
  { name: "Social Security Appeal Tribunal", query: "Social Security Appeal Tribunal Addis Ababa", contact: "+251 11 890 12 34", email: "socialsecurity@ethiopia.gov.et" },
  { name: "Public Procurement and Property Disposal Tribunal", query: "Public Procurement and Property Disposal Tribunal Addis Ababa", contact: "+251 11 901 23 45", email: "procurementtribunal@ethiopia.gov.et" }
];

const CourtsList = () => {
  const [selectedCourt, setSelectedCourt] = useState(courtsList[0]);
  const [courtData, setCourtData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default to Addis Ababa

  useEffect(() => {
    fetchCourtData(selectedCourt);
  }, [selectedCourt]);

  const fetchCourtData = async (court) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${court.query}`);
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];

        const imageResponse = await axios.get(`/api/courts/image/${court.name}`); // API to fetch image by court name

        setCourtData({
          name: court.name,
          location: display_name,
          contact: court.contact,
          email: court.email,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`,
          imageUrl: imageResponse.data.imageUrl // Store the fetched image URL
        });

        const imageUrl = await fetchImageByName(selectedCourt);
        setCourtData(prevData => ({
          ...prevData,
          imageUrl: imageUrl || "https://via.placeholder.com/400x300.png?text=Court+Image" // Fallback if no image
        })); // Fallback if image is not available
        

        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        setCourtData({ ...court, location: "Location not found", latitude: 9.03, longitude: 38.74 });
      }
    } catch (error) {
      console.error("Error fetching court data:", error);
      alert("Error fetching court data. Try again.");
    }
    setLoading(false);
  };

  return (
    <>  
   
      <div
        className="container-fluid d-flex justify-content-center align-items-center  pt-5"
       >  
        <div className="media  row  ">
          <div className="col-md-6 text-dark bg-light " >
            <h2>Select a Court</h2>
            <select className="form-select" onChange={(e) => setSelectedCourt(courtsList.find(c => c.name === e.target.value))} value={selectedCourt.name}>
              {courtsList.map((court, index) => (
                <option key={index} value={court.name}>{court.name}</option>
              ))}
            </select>
            <button className="btn btn-primary w-100 my-3" onClick={() => fetchCourtData(selectedCourt)} disabled={loading} style={{ background: "#343a40" }}>
              {loading ? "Loading..." : "Search"}
            </button>

            <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {courtData && (
                <Marker position={[courtData.latitude, courtData.longitude]}>
                  <Popup>
                    <strong>{courtData.name}</strong>
                    <br />
                    {courtData.location}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          {courtData && (
            <div className="col-md-6" >
              <div className="card text-dark bg-light" >
                <div className="card-body">
                  <h4 className="card-title">{courtData.name}</h4>
                  <p><strong>Location:</strong> {courtData.location}</p>
                  <p><strong>Contact:</strong> {courtData.contact}</p>
                  <p><strong>Email:</strong> {courtData.email}</p>
                  {courtData.imageUrl && <img src={courtData.imageUrl} alt={courtData.name} className="img-fluid my-3" />}
                  <a href={courtData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer" style={{ background: "#343a40" }}>
                    📍 View on Google Maps
                  </a>
                </div>
                <div className="card-footer">
                  <img
                    src={courtData.image}
                    alt="Court"
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

export default CourtsList;
