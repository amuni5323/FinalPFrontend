import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaBook, FaGavel, FaComment, FaBuilding, FaHospital, FaHotel, FaBriefcase, FaShieldAlt, FaHome, FaExclamationTriangle, FaUser, FaTachometerAlt,   } from 'react-icons/fa';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for the login state, default to false if not found
    return localStorage.getItem("isLoggedIn") === "true"
  });

  useEffect(() => {
    // Read login state from localStorage every time the component mounts
    const storedLoginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoginState);
  }, []);
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">📚 Local Server</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{marginLeft:"40%"}} >
          <Nav.Link as={Link} to="/aboutUs">About Us</Nav.Link>
           {/* <Nav.Link as={Link} to="#Contact">Contact Us</Nav.Link> */}
           <Nav.Link href="#Contact">Contact Us</Nav.Link>
           <Nav.Link href="#users-say">Users Say</Nav.Link>
           
          </Nav>

          <Nav >
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/login" onClick={handleLogout} className=" btn-logout d-flex align-items-center">
                <FaUser className="me-2" /> <span className=''>Logout</span>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" onClick={handleLogin} className="ms-5">
  Login/Register
</Nav.Link>

            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>

      {/* Sidebar */}
      <div
        className="sidebar position-fixed top-0 start-0 bg-light shadow-lg " 
        style={{
          width: isNavVisible ? '250px' : '60px',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          zIndex: 1050,
          color: "#DDD0C5",
          marginTop: "70px",
        }}
        onMouseEnter={() => setNavVisible(true)}
        onMouseLeave={() => setNavVisible(false)}
      >
        <nav className="d-flex flex-column p-3 bg-light" style={{  height: '100%' }}>
          <ul className="nav flex-column text-dark ">
            <li className="nav-item" >
              <Link className="nav-link" to="/events">
                <FaCalendarAlt /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Events</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                <FaBook /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Books</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courts">
                <FaGavel /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Courts</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">
                <FaComment /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Feedback</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/government">
                <FaBuilding /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Government</span>
              </Link>
            </li>
            <li className="nav-item">
  <Link className="nav-link" to="/headoffice">
    <FaTachometerAlt /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Head Office</span>
  </Link>
</li>

            <li className="nav-item">
              <Link className="nav-link" to="/hospitals">
                <FaHospital /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Hospitals</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                <FaHotel /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Hotels</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                <FaBriefcase /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Jobs</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/police">
                <FaShieldAlt /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Police</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shelters">
                <FaHome /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Shelters</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/emergencies">
                <FaExclamationTriangle /> <span className={`nav-text ${isNavVisible ? 'd-inline' : 'd-none'}`}>Emergency</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
