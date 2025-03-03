import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        "https://finalpbackend-2.onrender.com/api/admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials");
        console.log("Entered Password:", password); // Debugging entered password
        console.log("Response:", response.data); // Debugging full response
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
      console.error("Login Error:", error); // Log the error for debugging
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-secondary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
