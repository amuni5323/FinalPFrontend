// src/components/Logout.jsx
import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 // Assuming you have a logout action

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the logout action to clear the user data
    dispatch(logout());

    // Redirect to the home page or login page after logging out
    setTimeout(() => {
      navigate('/login'); // or '/home' if you want to redirect to the homepage
    }, 2000); // Redirect after 2 seconds to show a message

  }, [dispatch, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging you out...</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
