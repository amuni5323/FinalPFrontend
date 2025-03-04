import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../components/BackButton";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName]= useState("")
  const userId = "65b1234567abcde123456789";
  const serviceId = "65b9876543abcde987654321";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store base64 data of the image
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message

    const feedbackData = { comment: feedback, rating, userId, serviceId, image };

    try {
      const response = await fetch("https://finalpbackend-2.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Feedback submitted:", data);
      setFeedback("");
      setName("") // Clear input
      setRating(5); // Reset rating
      setImage(null); // Clear image after submit
      setMessage("✅ Feedback submitted successfully!"); // ✅ Show success message
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("❌ Error submitting feedback. Please try again."); // ✅ Show error message
    }
  };

  return (
    <>
     
      <div
        className=" feedback container-fluid d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card shadow-lg p-4 text-dark bg-light w-50" >
          <h2 className="text-center mb-4">Provide Feedback</h2>

          {/* ✅ Show success or error message */}
          {message && (
            <div className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"} text-center`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Feedback</label>
              <textarea
                className="form-control"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
                required
                rows="4"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rating (1-5)</label>
              <input
                type="number"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image (optional)</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Enter Your Name</label>
              <input type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}

              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" style={{ background: "#343a40" }}>
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
