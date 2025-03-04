import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState([]); 
  // ✅ Added feedback state

  // Fetch all events
  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://finalpbackend-2.onrender.com/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data.");
      setLoading(false);
    }
  };

  // Fetch approved events
  const fetchApprovedEvents = async () => {
    try {
      const response = await axios.get("https://finalpbackend-2.onrender.com/api/events/approve");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching approved events:", error);
    }
  };

  // Fetch feedback from API
  const fetchFeedback = async () => {
    try {
      const response = await axios.get("https://finalpbackend-2.onrender.com/api/feedback");
      console.log(response.data);
      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData("events");
    fetchApprovedEvents();
    fetchFeedback(); // ✅ Fetch feedback on load
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchApprovedEvents, events, loading, error, fetchData, feedback, fetchFeedback }}>
      {children}
    </DataContext.Provider>
  );
};
