const apiUrl = 'https://example.com/api/';

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
import axios from "axios";

export const fetchImageByName = async (name) => {
  try {
    const response = await axios.get(`https://finalpbackend-2.onrender.com/api/image/${name}`);
    return response.data.imageUrl || null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
