// src/LocationForm.jsx
import React, { useState } from "react";
import axios from "axios";

const LocationForm = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const getCoordinates = async (location) => {
    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: GOOGLE_API_KEY,
        },
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        setError(null);
      } else {
        setError("Location not found.");
        setCoordinates(null);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setCoordinates(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      getCoordinates(location);
    }
  };



  return (
    <div>
      <h1>Enter Location to Get Coordinates</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Coordinates</button>
      </form>

      {coordinates && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default LocationForm;