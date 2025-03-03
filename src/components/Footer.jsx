import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin, FaGithub, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-light py-5 position-relative">
      <div className="container">
        <div className="row">

          {/* Contact Info */}
          <div className="col-12  mb-md-0" style={{marginRight:"20px"}}>
            <h5 className="text-uppercase">Contact Info</h5>
            <ul className="list-unstyled">
              <li><FaPhone className="me-2" /> +251972300601</li>
              <li><FaEnvelope className="me-2" /> <a href="mailto:amuni11.hamai@gmail.com" className="text-info">amuni11.hamai@gmail.com</a></li>
              <li><FaMapMarkerAlt className="me-2" /> @LocalServer Website</li>
              <li><FaGlobe className="me-2" /> <a href="https://www.LocalServer.com" target="_blank" rel="noopener noreferrer" className="text-info">www.LocalServer.com</a></li>
            </ul>
          </div>

        </div>

        {/* Services, Company, and Legal */}
        <div className="row">
          {/* Services */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase">Services</h5>
            <ul className="list-unstyled">
              <li><Link to="/event" className="text-secondary">Event</Link></li>
              <li><Link to="/hospitals" className="text-secondary">Hospitals</Link></li>
              <li><Link to="/hotels" className="text-secondary">Marketing</Link></li>
              <li><Link to="/courts" className="text-secondary">Courts</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-secondary">About Us</Link></li>
              <li><Link to="#contact" className="text-secondary">Contact</Link></li>
              <li><Link to="/jobs" className="text-secondary">Jobs</Link></li>
              <li><Link to="/emergencies" className="text-secondary">Emergency</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase">Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/terms" className="text-secondary">Terms of Use</Link></li>
              <li><Link to="/privacy-policy" className="text-secondary">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-secondary">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="row justify-content-center ">
          <div className="text-center mt-4">
            <p className="m-0">📚 Local Server <br />&copy; 2025 My Project. All rights reserved.</p>
          </div>
        </div>

        {/* Social Media Icons at Bottom-Right */}
        <div className="position-absolute bottom-0 end-0 p-4">
          <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
            <FaLinkedin size={30} />
          </Link>
          <Link to="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
            <FaGithub size={30} />
          </Link>
          <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
            <FaTwitter size={30} />
          </Link>
        </div>

      </div>

      {/* Media Query for Responsiveness */}
      {/* <style jsx>{`
        @media (max-width: 767px) {
          .position-absolute {
            position: static;
            margin-top: 20px;
            text-align: center;
          }
          .position-absolute a {
            margin: 10px 15px;
          }
        }
      `}</style> */}
    </footer>
  );
};

export default Footer;
