import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from '../components/BackButton';

const headOfficesList = [
  { name: 'Commercial Bank of Ethiopia', address: 'Ras Desta Damtew St, Addis Ababa, Ethiopia', contact: '+251-11-122-87-55', email: 'info@cbe.com.et' },
  { name: 'Wegagen Bank Headquarters', address: 'Ras Mekonnen St, Addis Ababa, Ethiopia', contact: '+251-11-552-38-00', email: 'info@wegagenbanksc.com' },
  { name: 'Dashen Bank Headquarters', address: 'Africa Ave, Addis Ababa, Ethiopia', contact: '+251-11-467-17-00', email: 'info@dashenbanksc.com' },
  { name: 'Ministry of Finance', address: 'Ministry of Finance, Addis Ababa, Ethiopia', contact: '+251-11-122-22-11', email: 'info@mof.gov.et' },
  { name: 'Ministry of Foreign Affairs', address: 'Gambia St, Addis Ababa, Ethiopia', contact: '+251-11-123-45-67', email: 'info@mfa.gov.et' },
  { name: 'Ethio Telecom Headquarters', address: 'Churchill Ave, Addis Ababa, Ethiopia', contact: '+251-11-550-44-44', email: 'info@ethiotelecom.et' },
  { name: 'National Bank of Ethiopia', address: 'Sudan St, Addis Ababa, Ethiopia', contact: '+251-11-551-74-00', email: 'info@nbe.gov.et' },
  { name: 'Addis Ababa Municipality', address: 'Arat Kilo, Addis Ababa, Ethiopia', contact: '+251-11-155-67-89', email: 'info@addisababa.gov.et' },
  { name: 'Ethiopian Airlines Headquarters', address: 'Bole International Airport, Addis Ababa, Ethiopia', contact: '+251-11-665-22-22', email: 'info@ethiopianairlines.com' },
  { name: 'Ethiopian Investment Commission', address: 'Kirkos Sub City, Addis Ababa, Ethiopia', contact: '+251-11-551-43-21', email: 'info@investment.gov.et' },
];

const HeadOfficesList = () => {
  const [selectedOffice, setSelectedOffice] = useState(headOfficesList[0]);
  const [officeData, setOfficeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default: Addis Ababa

  useEffect(() => {
    fetchOfficeData(selectedOffice);
  }, [selectedOffice]);

  const fetchOfficeData = async (office) => {
    setLoading(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: office.address, format: 'json', addressdetails: 1, limit: 1 },
        headers: { 'Content-Type': 'application/json',},
      });

      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setOfficeData({
          ...office,
          location: display_name,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`,
        });
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      } else {
        setOfficeData({ ...office, location: 'Location not found', latitude: 9.03, longitude: 38.74 });
      }
    } catch (error) {
      console.error('Error fetching office data:', error);
      alert('Error fetching office data. Try again.');
    }
    setLoading(false);
  };

  return (
    <> 
    <div className="container-fluid mt-4 ">
      <div className="row">
        <div className="col-md-6 bg-light">
          <h2>Select a Head Office</h2>
          <select
            className="form-select"
            onChange={(e) => setSelectedOffice(headOfficesList.find((o) => o.name === e.target.value))}
            value={selectedOffice.name}
          >
            {headOfficesList.map((office, index) => (
              <option key={index} value={office.name}>
                {office.name}
              </option>
            ))}
          </select>
          <button className="btn btn-primary w-100 my-3" onClick={() => fetchOfficeData(selectedOffice)} disabled={loading} style={{background:'#343a40'}}>
            {loading ? 'Loading...' : 'Search'}
          </button>

          <MapContainer center={mapCenter} zoom={15} style={{ height: '350px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
            {officeData && (
              <Marker position={[officeData.latitude, officeData.longitude]}>
                <Popup>
                  <strong>{officeData.name}</strong>
                  <br />
                  {officeData.location}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {officeData && (
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{officeData.name}</h4>
                <p>
                  <strong>Location:</strong> {officeData.location}
                </p>
                <p>
                  <strong>Contact:</strong> {officeData.contact}
                </p>
                <p>
                  <strong>Email:</strong> {officeData.email}
                </p>
                <a href={officeData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer" style={{background:'#343a40'}}>
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

export default HeadOfficesList;
