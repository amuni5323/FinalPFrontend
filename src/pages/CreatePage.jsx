import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { FaRegWindowMinimize, FaRegWindowRestore } from "react-icons/fa"; // Import the icons
import BackButton from "../components/BackButton"
const CreatePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "event"; 
  const [role, setRole] = useState(null);
  const { fetchData } = useContext(DataContext);
  
  // Event state
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

  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle the form visibility

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleTypeChange = (e) => {
    setSearchParams({ type: e.target.value });
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://finalpbackend-2.onrender.com/api/events/create", {
        ...eventData,
        status: "pending"  // New status indicating pending approval
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (response.headers['content-type'].includes('application/json')) {
        alert("Event Created Successfully, awaiting approval!");
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


  



  

  return (
    <>  

    <div className="container-fluid d-flex justify-content-center align-items-center " >
      <div className="card  text-dark p-4 shadow-lg bg-light m-5" >
        <h2 className="text-center mb-4">Create {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

        {role === "admin" && (
          <div className="mb-3">
            <label className="form-label fw-bold">Select Type</label>
            <select className="form-select" value={type} onChange={handleTypeChange}>
              <option value="event">Event</option>
              <option value="hotel">Hotel</option>
              <option value="product">Product</option>
              <option value="blog">Blog</option>
            </select>
          </div>
        )}

        {/* Toggle Icon for Form Visibility */}
        <div className="mb-3 text-center">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setIsFormVisible(!isFormVisible)}
           
          >
            {isFormVisible ? <FaRegWindowMinimize /> : <FaRegWindowRestore />} Toggle Form
          </button>
        </div>

        {isFormVisible && type === "event" && (
          <form className="bg-light text-secondary p-4 rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Event Name</label>
              <input type="text" name="title" className="form-control" placeholder="Enter event name" value={eventData.title} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea name="description" className="form-control" rows="3" placeholder="Enter event details" value={eventData.description} onChange={handleChange}></textarea>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Event Date</label>
                <input type="date" name="date" className="form-control" value={eventData.date} onChange={handleChange} required />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label fw-bold">Start Time</label>
                <input type="time" name="startTime" className="form-control" value={eventData.startTime} onChange={handleChange} required />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label fw-bold">End Time</label>
                <input type="time" name="endTime" className="form-control" value={eventData.endTime} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Location</label>
              <input type="text" name="location" className="form-control" placeholder="Enter event location" value={eventData.location} onChange={handleChange} required />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Contact Number</label>
                <input type="text" name="contact" className="form-control" placeholder="Enter contact number" value={eventData.contact} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Organizer Email</label>
                <input type="email" name="organizerEmail" className="form-control" placeholder="Enter email" value={eventData.organizerEmail} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="btn btn-secondary w-100 fw-bold" style={{ background: "linear-gradient(to right, #111111, #17999c)" }}>
              Create Event
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default CreatePage;
