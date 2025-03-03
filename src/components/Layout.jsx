import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import Footer
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ flexGrow: 1, marginLeft: "40px", padding: "20px" }}>
        <Outlet /> {/* This will render the content of each page */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
