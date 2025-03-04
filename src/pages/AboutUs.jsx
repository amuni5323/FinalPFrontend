import React from 'react';

const AboutUs = () => {
  return (
    <div className="container-flluid py-5">
      <h1 className="text-center mb-4">About Us</h1>

      {/* Description with Image beside it */}
      <div className="row align-items-center mb-5">
        <div className="col-md-4">
          <img src="/src/assets/server-concept-illustration.avif" alt="Service Concept" className="img-fluid w-75 mx-5" />
        </div>
        <div className="col-md-8 ">
          <p>
            Welcome to Local Server, your go-to platform for discovering local events and finding services in Addis Ababa.
            Our mission is to connect you with hospitals, hotels, government offices, law enforcement, courts, and shelters
            in the city. Whether you're searching for a healthcare appointment, a hotel room, or a local event, we've got you covered!
          </p>
        </div>
      </div>

      <div className="row text-center m-3">
  {/* About Us Section */}
  <div className="col-md-5 mb-5 " style={{ border: '2px solid white' }}>
    <h4 className='my-3'>WHO WE ARE</h4>
    <p>We're a local service platform focused on connecting people with essential services in Addis Ababa. Since our inception, we’ve been dedicated to improving access to healthcare, hospitality, government services, and more, by providing an easy-to-use interface and streamlined solutions.</p>
    <p>We are proud of our innovative approach and commitment to quality. Our team is made up of passionate individuals who are committed to making a positive impact on the lives of people in our community.</p>
  </div>

  {/* We're Different Section */}
  <div className="col-md-6 mb-4 mx-5" style={{ border: '2px solid white' }}>
    <h4 className='m-3'>WE'RE DIFFERENT THAN THE REST</h4>
    <p>Unlike other platforms, we are deeply focused on improving user experience and access to services. We’ve combined cutting-edge technology with a user-first approach to ensure that our customers can easily find and access the services they need. Whether it’s healthcare, hospitality, or government services, we’ve tailored our platform to make life easier for individuals in Addis Ababa.</p>
    <p>Our journey began when we realized the challenges many faced in accessing essential services, so we created a solution that simplifies the process and ensures efficiency.</p>
  </div>

  {/* Other Sections */}
 

  
</div>


      {/* Another Image with Description Beside It */}
      <div className="row align-items-center mb-5" >
        <div className="col-md-4">
          <img src="/src/assets/image4.jpeg" alt="Business Illustration" className="img-fluid mx-5 w-75" />
        </div>
        <div className="col-md-8">
          <p>
            We’ve reached many milestones, and we continue to strive for excellence in connecting the community. 
            Through our platform, we aim to offer greater convenience and accessibility to essential services 
            for the residents of Addis Ababa.
          </p>
        </div>
      </div>

      <h3 className="text-center mt-5">Our Achievements</h3>
      <div className="row text-center mt-4">
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm p-3 mb-5 bg-white rounded">
      <h5>Events Created</h5>
      <p><strong>20+</strong></p>
    </div>
  </div>
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm p-3 mb-5 bg-white rounded">
      <h5>Bookings Made</h5>
      <p><strong>15+</strong></p>
    </div>
  </div>
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm p-3 mb-5 bg-white rounded">
      <h5>Subscriptions</h5>
      <p><strong>30+</strong></p>
    </div>
  </div>
</div>


      <h3 className="text-center mt-5 " style={{marginBottom:'5%'}}>By the Numbers</h3>
      <div className="row text-center ">
        {/* HubSpot By the Numbers */}
        <div className="col-md-3 text-secondary">
          <h5>12+ Global Offices</h5>
        </div>
        <div className="col-md-3 text-secondary">
          <h5>700+ Employees</h5>
        </div>
        <div className="col-md-3 text-secondary">
          <h5>205,000 Customers</h5>
        </div>
        <div className="col-md-3 text-secondary">
         <h5>Voted #1 in 318 Categories</h5>
        </div>
      </div >  <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center mt-5 w-75" style={{ gap: '20px', marginLeft: '10%', overflowX: 'auto', scrollbarWidth: 'none' }}>
  <img src="/images/shelterlogos.png" alt="Shelter Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
  <img src="/images/blue-hospital.png" alt="Hospital Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
  <img src="/images/headoffice.jpeg" alt="Hotel Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
  <img src="/images/govermentoffice.jpeg" alt="Government Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
  <img src="/images/policelogo.png" alt="Police Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
  <img src="/images/eventlogo.png" alt="Customer Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
  <img src="/images/joblog.jpeg" alt="Award Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
  <img src="/images/booklog.jpeg" alt="Employee Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
</div>
    







         
         
         
         
    </div>
  );
};

export default AboutUs;
