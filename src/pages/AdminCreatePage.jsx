import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FaRegWindowMinimize, FaRegWindowRestore } from "react-icons/fa"; // Import icons
import { DataContext } from "../context/DataContext";
import BackButton from "../components/BackButton";

const AdminCreatePage = () => {
  const [category, setCategory] = useState("Hotel");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [Name, setName] = useState('');
  
  const [image, setImage] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    contact: "",
    organizerEmail: "",
  });

  // Form visibility states
  const [toggle1, setToggle1] = useState(false); // Category Form
  const [toggle2, setToggle2] = useState(false); // Event Form
  const [toggle3, setToggle3] = useState(false); // Image Form

  const { fetchData } = useContext(DataContext);

  const BASE_URL = "https://finalpbackend-2.onrender.com/";
  const apiRoutes = {
    Hotel: `${BASE_URL}/api/hotels`,
    Job: `${BASE_URL}/api/jobs`,
    Hospital: `${BASE_URL}/api/hospitals`,
    Court: `${BASE_URL}/api/courts`,
    GovernmentOffice: `${BASE_URL}/api/government-offices`,
    HeadOffice: `${BASE_URL}/api/head-offices`,
    PoliceStation: `${BASE_URL}/api/police-stations`,
    Shelter: `${BASE_URL}/api/shelters`,
    Emergency: `${BASE_URL}/api/emergencies`,
    Feedback: `${BASE_URL}/api/feedbacks`,
    Book: `${BASE_URL}/api/books`,
  };

  const formFields = {
    Hotel: ["name", "description", "location", "contact", "email", "roomsAvailable", "pricePerNight", "amenities", "rating", "image"],
    Job: ["title", "description", "requirements", "location", "company", "salary", "contact", "image"],
    Hospital: ["name", "type", "location", "phone", "email", "rating", "image"],
    Court: ["name", "location", "contact", "email", "image"],
    GovernmentOffice: ["name", "location", "contact", "email", "image"],
    HeadOffice: ["name", "location", "contact", "email", "image"],
    PoliceStation: ["name", "location", "contact", "email", "image"],
    Shelter: ["name", "location", "contact", "email", "image"],
    Emergency: ["service", "contact", "description"],
    Feedback: ["serviceId", "userId", "rating", "comment"],
    Book: ["title", "author", "description", "category", "ISBN", "image"]
  };

  useEffect(() => {
    // Update the form visibility when the category is changed
    setToggle2(false);
    setToggle3(false);
    
    if (category === "Hotel" || category === "Job" || category === "Hospital" || category === "Court") {
      setToggle3(true); // Image form is required for Hotel, Job, Hospital, and Court
    } else if (category === "Event") {
      setToggle2(true); // Event form is for events
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageSave = async (event) => {
    event.preventDefault();
  
    if (!Name || !image) {
      alert("Please provide a name and select an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("image", image);
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://finalpbackend-2.onrender.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert("Image uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };




  const handleeventSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://finalpbackend-2.onrender.com/api/events/create", eventData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response.headers['content-type'].includes('application/json')) {
        alert("Event Created Successfully!");
        fetchData('events');
        setEventData({ title: "", description: "", date: "", startTime: "", endTime: "", location: "", contact: "", organizerEmail: "" });
      } else {
        throw new Error("Response is not JSON.");
      }
    } catch (error) {
      alert("Error creating event");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    console.log(e.target); 
    // setImage(event.target.files[0]);
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      // setImage(URL.createObjectURL(files[0])); 
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else  {
      setFormData({
        ...formData,
        [name]: value || '',
      });
    }
  };

  const handleEventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    console.log("Form Data:", formData);
    const requiredFields = formFields[category];
    if (!requiredFields) {
      setError(`Invalid category: ${category}`);
      setLoading(false);
      return;
    }
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Missing fields: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(apiRoutes[category], formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response);
      setMessage("Data saved successfully!");
      setFormData({});
    } catch (error) {
      console.error("Error in submission:", error); // Log the error for better debugging
      setError("Failed to save data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
       
    <div
    className="container-fluid d-flex justify-content-center align-items-center  g-3 my-5"
    
  >  
      <div className="row" >
        {/* Category Form */}
        <div className="col-md-4  "  >
          <div className="card bg-light text-dark p-4 shadow-lg"  >
            <h2 className="text-center mb-4">Select Category</h2>

            {/* Category Toggle */}
            <button type="button" className="btn btn-secondary w-100 mb-3"     style={{ background: "#343a40"}}  onClick={() => setToggle1(!toggle1)}>
              {toggle1 ? <FaRegWindowMinimize /> : <FaRegWindowRestore />} Toggle Category Form
            </button>

            {/* Category Form */}
            {toggle1 && (
              <div className="mb-3"  >
                <select className="form-select" onChange={handleCategoryChange} value={category}  >
                  {Object.keys(apiRoutes).map((key) => (
                    <option  key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Category-Specific Form Fields */}
        <div className="col-md-8"   >
          <div className="row"  >
            {/* Display category-specific form fields */}
            {toggle1 && (
              <div className="col-md-12" >
                <div className="card bg-secondary text-white p-4 shadow-lg" >
                  <h2 className="text-center mb-4">Fill in {category} Details</h2>
                  <form onSubmit={handleSubmit} className="bg-light text-secondary p-4 rounded" >
  {formFields[category].map((field) => (
    <div key={field} className="mb-3"  >
      <label className="form-label fw-bold"  >{field.charAt(0).toUpperCase() + field.slice(1)}</label>

      {field === "image" ? (
        <input
          type="file"
          name={field}
          className="form-control"
          onChange={handleChange}  // handleChange will handle file selection
          required
        />
      ) : (
        <input
          type="text"
          name={field}
          className="form-control"
          value={formData[field] || ''}
          onChange={handleChange}
          required
        />
      )}
    </div>
  ))}
  <button type="submit" className="btn btn-secondary w-100 fw-bold"  disabled={loading}>
    {loading ? "Saving..." : "Submit"}
  </button>
</form>

                </div>
              </div>
            )}
          </div>

          {/* Event and Image Form */}
          <div className="row"  >
            {/* Event Form */}
            <div className="col-md-6"   >
              <div className="card bg-light  text-dark p-4 shadow-lg"   >
                <h2 className="text-center mb-4">Create Event</h2>
                <button type="button"   className="btn btn-dark w-100 mb-3" onClick={() => setToggle2(!toggle2)}>
                  {toggle2 ? <FaRegWindowMinimize /> : <FaRegWindowRestore />} Toggle Event Form
                </button>

                {/* Event Form */}
                {toggle2 && (
                  <form className="bg-light text-secondary p-4 rounded" onSubmit={handleeventSubmit}   >
                    <div className="mb-3">
                      <label className="form-label fw-bold">Title</label>
                      <input type="text" name="title" className="form-control" value={eventData.title} onChange={handleEventChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Description</label>
                      <textarea name="description" className="form-control" value={eventData.description} onChange={handleEventChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Date</label>
                      <input type="date" name="date" className="form-control" value={eventData.date} onChange={handleEventChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Start Time</label>
                      <input type="time" name="startTime" className="form-control" value={eventData.startTime} onChange={handleEventChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">End Time</label>
                      <input type="time" name="endTime" className="form-control" value={eventData.endTime} onChange={handleEventChange} required />
                    </div>
                    <div className="mb-3">
              <label className="form-label fw-bold">Location</label>
              <input type="text" name="location" className="form-control" placeholder="Enter event location" value={eventData.location} onChange={handleEventChange} required />
            </div>

            {/* <div className="row"> */}
              <div className=" mb-3">
                <label className="form-label fw-bold">Contact Number</label>
                <input type="text" name="contact" className="form-control" placeholder="Enter contact number" value={eventData.contact} onChange={handleEventChange}required />
              </div>

              <div className=" mb-3">
                <label className="form-label fw-bold">Organizer Email</label>
                <input type="email" name="organizerEmail" className="form-control" placeholder="Enter email" value={eventData.organizerEmail} onChange={handleEventChange} required />
              </div>
                    <button type="submit" className="btn btn-secondary w-100 fw-bold" disabled={loading}   >
                      {loading ? "Saving..." : "Submit Event"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Hotel Image Form */}
            <div className="col-md-6"   >
              <div className="card bg-light tex-dark p-4 shadow-lg" >
                <h2 className="text-center mb-4">Upload Hotel Image</h2>
                <button type="button" className="btn btn-secondary w-100 mb-3"   style={{ background: "#343a40"}} onClick={() => setToggle3(!toggle3)}>
                  {toggle3 ? <FaRegWindowMinimize /> : <FaRegWindowRestore />} Toggle Image Form
                </button>

                {toggle3 && (
                  <form className="bg-light text-secondary p-4 rounded" onSubmit={handleImageSave}   >
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input type="text" name="hotelName" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Uplod Image</label>
                      <input type="file" name="image" className="form-control" onChange={ handleImageChange} required />
                    </div>
                    <button type="submit"    style={{ background: "#343a40"}}className="btn btn-secondary w-100 fw-bold" disabled={loading}>
                      {loading ? "Saving..." : "Submit Image"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminCreatePage;
