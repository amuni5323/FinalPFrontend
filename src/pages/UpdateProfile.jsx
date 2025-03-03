import React, { useState } from 'react';  // Import useState
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Please log in first.');
      return;
    }

    try {
      const response = await fetch('https://finalpbackend-2.onrender.com/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        navigate('/profile'); // Navigate to the profile page or another page after successful update
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateProfile;
