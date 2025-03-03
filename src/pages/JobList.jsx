import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../index.css';

const jobCategories = [
  {
    name: "IT Jobs",
    jobs: [
      { title: "Software Developer", query: "Software Developer Addis Ababa", location: "Addis Ababa", company: "TechCo", contact: "+251 911 234 567", salary: "$1000", description: "Develop and maintain web applications" },
      { title: "Web Developer", query: "Web Developer Addis Ababa", location: "Addis Ababa", company: "WebTech", contact: "+251 911 123 456", salary: "$950", description: "Build and maintain websites" },
      { title: "Systems Administrator", query: "Systems Administrator Addis Ababa", location: "Addis Ababa", company: "NetOps", contact: "+251 911 333 777", salary: "$1200", description: "Manage company servers and network infrastructure" },
      { title: "Network Engineer", query: "Network Engineer Addis Ababa", location: "Addis Ababa", company: "ComNet", contact: "+251 911 555 888", salary: "$1100", description: "Design and maintain network systems" },
      { title: "Data Scientist", query: "Data Scientist Addis Ababa", location: "Addis Ababa", company: "DataPro", contact: "+251 911 777 555", salary: "$1300", description: "Analyze large datasets to uncover business insights" },
      { title: "IT Support Technician", query: "IT Support Technician Addis Ababa", location: "Addis Ababa", company: "SupportIT", contact: "+251 911 888 666", salary: "$800", description: "Provide technical support for hardware and software issues" },
    ]
  },
  {
    name: "Teaching Jobs",
    jobs: [
      { title: "Teacher", query: "Teacher Addis Ababa", location: "Addis Ababa", company: "EduWorld", contact: "+251 911 987 654", salary: "$800", description: "Teach English to high school students" },
      { title: "Math Teacher", query: "Math Teacher Addis Ababa", location: "Addis Ababa", company: "MathCo", contact: "+251 911 111 222", salary: "$850", description: "Teach mathematics to middle school students" },
      { title: "Science Teacher", query: "Science Teacher Addis Ababa", location: "Addis Ababa", company: "ScienceWorld", contact: "+251 911 333 444", salary: "$900", description: "Teach science subjects to students" },
    ]
  },
  {
    name: "Healthcare Jobs",
    jobs: [
      { title: "Nurse", query: "Nurse Addis Ababa", location: "Addis Ababa", company: "HealthPlus", contact: "+251 911 555 123", salary: "$600", description: "Provide healthcare services in clinics" },
      { title: "Doctor", query: "Doctor Addis Ababa", location: "Addis Ababa", company: "MediCare", contact: "+251 911 222 333", salary: "$1500", description: "Diagnose and treat patients in the clinic" },
      { title: "Pharmacist", query: "Pharmacist Addis Ababa", location: "Addis Ababa", company: "PharmaCo", contact: "+251 911 444 555", salary: "$1200", description: "Dispense medications and advise patients on their use" },
    ]
  },
  // Add more categories here...
];

const externalJobSources = [
  { name: "Ethiojobs", url: "https://www.ethiojobs.net", description: "A comprehensive job portal listing various vacancies across different sectors in Ethiopia." },
  { name: "Ethiopiawork.com", url: "https://www.ethiopiawork.com", description: "Offers job listings in Addis Ababa, including positions in administration, marketing, and more." },
  { name: "Ethiopian Reporter Jobs", url: "https://www.ethiopianreporterjobs.com", description: "Provides job vacancies in Ethiopia, including positions in Addis Ababa." },
  { name: "GeezJobs", url: "https://www.geezjobs.com", description: "Lists the latest job vacancies in Ethiopia, including opportunities in Addis Ababa." },
  { name: "UNjobs", url: "https://www.unjobs.org", description: "Features vacancies in Addis Ababa, including positions with the United Nations and other international organizations." },
];

const JobList = () => {
  const [selectedCategory, setSelectedCategory] = useState(jobCategories[0].name); // Default category: IT Jobs
  const [selectedJob, setSelectedJob] = useState(jobCategories[0].jobs[0].query); // Default job
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.03, 38.74]); // Default center Addis Ababa

  const fetchJobData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedJob} Addis Ababa`);
      if (response.data && response.data.length > 0) {
        const job = response.data[0];
        const lat = parseFloat(job.lat);
        const lon = parseFloat(job.lon);

        // Job info
        const jobInfo = {
          title: selectedJob,
          description: jobCategories
            .find(category => category.name === selectedCategory)
            .jobs.find(j => j.query === selectedJob).description,
          location: job.display_name,
          contact: jobCategories
            .find(category => category.name === selectedCategory)
            .jobs.find(j => j.query === selectedJob).contact,
          salary: jobCategories
            .find(category => category.name === selectedCategory)
            .jobs.find(j => j.query === selectedJob).salary,
          company: jobCategories
            .find(category => category.name === selectedCategory)
            .jobs.find(j => j.query === selectedJob).company,
          latitude: lat,
          longitude: lon,
          googleMapsLink: `https://www.google.com/maps?q=${lat},${lon}`,
        };

        setJobData(jobInfo);
        setMapCenter([lat, lon]); // Move map
      } else {
        setJobData(null);
        alert("No job found.");
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      alert("Error fetching job data. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobData();
  }, [selectedJob]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="media col-md-6 bg-light">
            <h2>Select a Category and Job</h2>

            <div className="mb-3">
              <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                {jobCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <select className="form-select" onChange={(e) => setSelectedJob(e.target.value)} value={selectedJob}>
                {jobCategories
                  .find(category => category.name === selectedCategory)
                  .jobs.map((job, index) => (
                    <option key={index} value={job.query}>
                      {job.title}
                    </option>
                  ))}
              </select>
            </div>

            <button className="btn btn-primary w-100 mb-3" onClick={fetchJobData} disabled={loading} style={{background:'#343a40'}}>
              {loading ? "Loading..." : "Search"}
            </button>

            <MapContainer center={mapCenter} zoom={15} style={{ height: "350px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapMover center={mapCenter} />
              {jobData && (
                <Marker position={[jobData.latitude, jobData.longitude]}>
                  <Popup>
                    <strong>{jobData.title}</strong>
                    <br />
                    {jobData.location}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          {jobData && (
            <div className="col-md-6 bg-light">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{jobData.title}</h4>
                  <p><strong>Description:</strong> {jobData.description}</p>
                  <p><strong>Location:</strong> {jobData.location}</p>
                  <p><strong>Contact:</strong> {jobData.contact}</p>
                  <p><strong>Salary:</strong> {jobData.salary}</p>
                  <p><strong>Company:</strong> {jobData.company}</p>
                  <a href={jobData.googleMapsLink} className="btn btn-outline-primary w-100 text-light" target="_blank" rel="noopener noreferrer" style={{background:'#343a40'}}>
                    📍 View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="external-sources bg-light " style={{marginLeft:"50%", marginTop:'auto'}}>
          <h3>Job Search Portals</h3>
          <ul>
            {externalJobSources.map((source, index) => (
              <li key={index}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>: {source.description}
              </li>
            ))}
          </ul>
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

export default JobList;
