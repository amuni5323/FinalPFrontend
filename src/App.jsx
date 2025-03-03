import React,  { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EventList from './pages/EventList';
import JobList from './pages/JobList';
import ShelterList from './pages/ShelterList';
import HospitalList from './pages/HospitalList';
import CourtList from './pages/CourtList';
import PoliceList from './pages/PoliceList';
import GovernmentList from './pages/GovernmentList';
import EmergencyList from './pages/EmergencyList';
import AboutUs from './pages/AboutUs';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HotelList from './pages/HotelList';
import HeadOfficeList from './pages/HeadOfficeList';
import BookList from './pages/BookList';
import Feedback from './pages/Feedback';
import ProtectedRoute from './components/ProtectedRoute';
import { DataContextProvider } from './context/DataContext'; 
import Layout from "./components/Layout"; // Corrected import
import './index.css';
import CreatePage from "./pages/CreatePage";
import AdminCreatePage from "./pages/AdminCreatePage";
import Logout from './pages/logout';
import UpdateProfile from './pages/UpdateProfile';



function App() {
  return (
    <DataContextProvider> 
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Layout Wrapper */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<EventList />} />
            <Route path='books' element={<BookList/>} />
            <Route path="jobs" element={<JobList />} />
            <Route path="shelters" element={<ShelterList />} />
            <Route path="hospitals" element={<HospitalList />} />
            <Route path="courts" element={<CourtList />} />
            <Route path="police" element={<PoliceList />} />
            <Route path="government" element={<GovernmentList />} />
            <Route path="hotels" element={<HotelList />} />
            <Route path="headoffice" element={<HeadOfficeList />} />
            <Route path="bookings" element={<BookList />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="user/create" element={<CreatePage />} />
            <Route path="/profile" element={<UpdateProfile/>} />
            <Route path="admin/create" element={<AdminCreatePage />} />
            <Route path="emergencies" element={<EmergencyList />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="/logout" element={<Logout />} />

          
            {/* Protected Route */}
            <Route path="admin/dashboard" element={
  <ProtectedRoute isAuthenticated={!!localStorage.getItem("adminToken")}>
    <AdminDashboard />
  </ProtectedRoute>
} />
          </Route>
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;
