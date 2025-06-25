import React, { useState, useEffect, useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import AboutUs from './AboutUs';
import { DataContext } from '../context/DataContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'

const Home = () => {
  const [image, setImage] = useState({ src: '/images/court.jpg', name: 'Court' });
  // const [email, setEmail] = useState('');
  // const [responseMessage, setResponseMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toggleSection, setToggleSection] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const { fetchFeedback,feedback } = useContext(DataContext); 
  const [currentIndex, setCurrentIndex] = useState(0);
 

  const images = [
    { src: '/images/court.jpg', name: 'Court' },
    { src: '/images/headoffice.jpg', name: 'Head Office' },
    { src: '/images/government.jpg', name: 'Government Office' }
  ];

  const changeImage = () => {
    const currentIndex = images.findIndex((img) => img.src === image.src);
    const nextIndex = (currentIndex + 1) % images.length;
    setImage(images[nextIndex]);
  };

  useEffect(() => {
    fetchFeedback(); // Fetch feedback data on mount
  }, []); // Empty array means it runs only once on mount

  // Automatically cycle through feedback every 5 seconds
  useEffect(() => {
    if (feedback.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
      }, 5000); // 5 seconds interval

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [feedback]);

  useEffect(() => {
    const interval = setInterval(changeImage, 2000);
    return () => clearInterval(interval);
  }, [image]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShowForm = () => {
    setShowForm(true); // Show form when the button is clicked
  };

    // Apply the 360-degree rotation effect
    // const inputElement = document.querySelector('.form-control');
    // const buttonElement = document.querySelector('.btn');
    // inputElement.classList.add('rotate-effect');
    // buttonElement.classList.add('rotate-effect');
    
    // Remove the effect after animation
    // setTimeout(() => {
    //   inputElement.classList.remove('rotate-effect');
    //   buttonElement.classList.remove('rotate-effect');
    // }, 1000); // Duration of the animation (1 second)
  

    const handleSubscribe = async (e) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setResponseMessage('Please enter a valid email address.');
        return;
      }
      try {
        const response = await fetch('https://finalpbackend-2.onrender.com/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json(); // Read response body
  
        console.log("Response Status:", response.status);
        console.log("Response Data:", data);
  
        if (response.ok) {
          setResponseMessage(data.message || 'Thank you for subscribing!');
          setEmail('');
        } else {
          setResponseMessage(data.error || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseMessage('Error connecting to the server.');
      }
  };
  

  return (
    <>
   
    <div className=" container-fluid vh-100 d-flex flex-column  bg-light" >
     
    <section className="hero text-black text-center py-5 animate__animated animate__fadeIn h-75 bg-info">
      <h1 className="display-4 ">Welcome to Local Server and Event Finder</h1>
      <p className="lead">Discover the best events, jobs, and services in your area</p>
      <a href="/events" className="btn btn-light btn-lg mt-3">Explore Events</a>
    </section>



      

      <section className="features text-end py-5  d-flex justify-content-end"  >
  <div className="container w-75" >
    <h2 className="text-black">Our Services</h2>
    <div className="row">
      <div className="col-md-4 service-card">
        <div className="card shadow-lg animate__animated animate__fadeIn">
          <img src="/images/events.jpg" className="card-img-top" alt="Events" />
          <div className="card-body text-black"  >
            <h5 className="card-title text-black">Events</h5>
            <p className="card-text ">Discover and participate in local events.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 service-card">
        <img src={image.src} alt={image.name} className="img-fluid service-img animate__animated animate__fadeIn" />
      </div>
      <div className="col-md-4 service-card">
        <div className="card shadow-lg animate__animated animate__fadeIn">
          <img src="/images/jobs.jpg" className="card-img-top" alt="Jobs" />
          <div className="card-body" style={{ background: '#AFDDE5c' }}>
            <h5 className="card-title ">Jobs</h5>
            <p className="card-text ">Find and apply for jobs in your area.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="how-it-works py-5  text-center" >
      <div className="container"  >
        <h2 className="text-center">How It Works</h2>
        <div className="row justify-content-center"  >
          <div className="col-md-4"  >
            <div className="step rotate-on-hover text-black"style={{   border:"2px solid black"  }} >
              <h4>1. Search</h4>
              <p>Search for events, jobs, or services in your local area.</p>
            </div>
          </div>
          <div className="col-md-4"  >
            <div className="step rotate-on-hover text-black " style={{ border:"2px solid black" }}>
              <h4>2. Explore</h4>
              <p>Explore various opportunities and services that interest you.</p>
            </div>
          </div>
          <div className="col-md-4"  >
            <div className="step rotate-on-hover text-black" style={{   border:"2px solid black" }} >
              <h4>3. Connect</h4>
              <p>Connect with the organizers or employers directly for more details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id='users-say' className="testimonials py-5 text-black text-center" >
  <h2>WHAT OUR USERS SAY</h2>
  <div className="testimonials-container bg-light mb-1">
    {feedback && feedback.length > 0 ? (
      <div className="testimonial">
        {/* Image Section */}
        <div className="feedback-image">
          {feedback[currentIndex].image ? (
            <img
              src={feedback[currentIndex].image}
              alt={feedback[currentIndex].name}
              className="feedback-img"
            />
          ) : (
            <div className="default-image">
              {feedback[currentIndex].name?.[0]}
            </div> // Default circle with name's first letter
          )}
        </div>

        {/* Comment Section */}
        <p className="feedback-comment">
          "{feedback[currentIndex].comment || 'No comment available'}"
        </p>

        {/* Rating Section */}
        <p className="feedback-rate">Rating: {feedback[currentIndex].rating}</p>

        {/* Name Section */}
        <p className="feedback-name">{feedback[currentIndex].name || 'Anonymous'}</p>
      </div>
    ) : (
      <p>No feedback available.</p>
    )}

    {/* Pagination Dots Section */}
    <div className="pagination mb-3">
      {feedback.map((_, index) => (
        <span
          key={index}
          className={`circle-dot ${index === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  </div>
</section>


      {/* Subscribe Form Section */}
      <section className="newsletters py-5 text-center">
        {/* Subscription logic */}
      </section>

    <section className="newsletters py-5 text-center">
      <h2 className="mb-3">Stay Updated!</h2>
      <p className="mb-4">Sign up for our newsletter to get the latest events, job postings, and news!</p>
      
      {/* Stay Updated Button */}
      {!showForm && (
        <button onClick={handleShowForm} className="btn btn-primary" style={{ background: "linear-gradient(to right, #111111, #17999c)"}}>
          Stay Updated
        </button>
      )}

      {/* Subscribe Form */}
      {showForm && (
        <form
          className="d-flex justify-content-center flex-column align-items-center animated-form"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            className="form-control w-50 mb-2"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="btn btn-secondary" style={{ background: "linear-gradient(to right, #111111, #17999c)"}}>Subscribe</button>
        </form>
      )}

      {/* Display success or error message */}
      {responseMessage && <p className="mt-3">{responseMessage}</p>}
    </section>
    
     <AboutUs/>

{/* <section id="Contact" className='row  bg-light text-dark' style={{  padding: '90px', borderRadius: '10px' , width:'100vw'}}> */}
  
  {/* <div className="col-md-6" >
    <h5>Contact Us</h5>
    <p>If you have any questions or feedback, feel free to reach out to us:</p>
    <ul className="list-unstyled">
      <li><FaPhone /> +123-456-7890</li>
      <li><FaEnvelope /> <a href="mailto:amuni11.hamai@gmail.com" className="electric-link" style={{ color: '#00E6E6' }}>amuni11.hamai@gmail.com</a></li>
      <li><FaMapMarkerAlt /> 123 Anywhere St., Any City</li>
      <li><FaGlobe /> <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00E6E6' }}>www.reallygreatsite.com</a></li>
    </ul>
    <p style={{ textAlign: 'center' }}>@reallygreatsite</p>
  </div> */}

  {/* <div className="col-md-6 w-100" >
    <h5>Send Us a Message</h5>
    <p>If you'd like to get in touch, please fill out the form below:</p>

    <form>
      <div className="form-group ">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Your Name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Your Email" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
</section> */}
<section id="Contact" className='row bg-light text-dark' style={{ padding: '90px', borderRadius: '10px', width: '100vw' }}>
  <div className="col-md-6">
    <h5>Send Us a Message</h5>
    <p>If you'd like to get in touch, please fill out the form below:</p>

    <form action="https://formsubmit.co/amuni11.hamai@gmail.com" method="POST">
      <div className="form-group ">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" name="name" placeholder="Your Name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" name="message" rows="4" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
</section>


      
    
      
    </div>
    </>
  );
};

export default Home;
