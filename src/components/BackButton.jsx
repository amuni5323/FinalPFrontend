import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons"; // Bootstrap Icon

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button"      >
      <button
        className="btn btn-outline-white d-flex align-items-center m-2 bg-light"    
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="me-2" size={20} /> Back
      </button>
    </div>
  );
};

export default BackButton;
