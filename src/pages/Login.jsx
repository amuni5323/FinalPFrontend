import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullame] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      const response = await axios.post(
        "https://finalpbackend-2.onrender.com/api/users/login",
        { email: email.trim().toLowerCase(), password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", response.data); // Log response data

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);

        // Check if user is an admin
        if (response.data.role === "admin" || response.data.isAdmin === true) {
          navigate("/admin/create");
        } else {
          navigate("/user/create?type=event");
        }
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
      console.error("Login Error:", error);
    }
  };

  const handleRegister = async (e) => {
        e.preventDefault();
    
        // Reset error and success messages
        setErrorMessage('');
        setSuccessMessage('');
    
        // Validate password length before sending request
        if (password.length < 6) {
          setErrorMessage('Password must be at least 6 characters long.');
          return; // Stop the function if the password is too short
        }
    
        try {
          // Send registration request to the backend
          const response = await fetch('https://finalpbackend-2.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, fullname }),
          });
    
          console.log('Registration request sent');
    
          const data = await response.json();
    
          // If registration is successful
          if (response.ok) {
            setSuccessMessage(data.message);
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage('Network error, please try again later.');
        }
      };



  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(null);
    setSuccessMessage("");
  };

  return (
    <div className="container-login d-flex justify-content-center align-items-center vh-100">
      <div className="auth-container row shadow-lg rounded overflow-hidden">
        <style>
          {`
            .overlay {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding: 20px;
              transition: all 0.5s ease-in-out;
              background: #e9ecef;
            }
            .form-container {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
            }

            /* Mobile responsiveness */
            @media (max-width: 768px) {
              .auth-container {
                flex-direction: column;
              }
              .col-md-6 {
                width: 100%;
                padding: 15px;
              }
              .overlay h2 {
                font-size: 1.5rem;
              }
              .overlay p {
                font-size: 1rem;
              }
              .form-container form {
                width: 100%;
              }
              .btn {
                padding: 10px;
                font-size: 1rem;
              }
              .form-control {
                padding: 12px;
                font-size: 1rem;
              }
            }

            @media (max-width: 480px) {
              .auth-container {
                padding: 10px;
              }
              .overlay h2 {
                font-size: 1.3rem;
              }
              .form-container h3 {
                font-size: 1.2rem;
              }
              .btn {
                font-size: 0.9rem;
                padding: 8px;
              }
              .form-control {
                padding: 10px;
                font-size: 1rem;
              }
            }
          `}
        </style>

        {isSignIn ? (
          <>
            <div className="col-md-6 form-container">
              <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary w-100" style={{ background: "#343a40" }}>
                  SIGN IN
                </button>
              </form>
            </div>
            <div className="col-md-6 overlay">
              <h2>Hello, Friend!</h2>
              <p>Enter your details to start your journey</p>
              <button className="btn btn-dark mt-3" onClick={toggleForm}>
                SIGN UP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6 overlay">
              <h2>Welcome Back!</h2>
              <p>Please log in to stay connected</p>
              <button className="btn text-white mt-3" onClick={toggleForm} style={{ background: "#343a40" }}>
                SIGN IN
              </button>
            </div>
            <div className="col-md-6 form-container">
              <form onSubmit={handleRegister}>
                <h3>Create Account</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={fullname}  // Fixed this field (previously incorrect)
                  onChange={(e) => setFullame(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary w-100" style={{ background: "#343a40" }}>
                  REGISTER
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
