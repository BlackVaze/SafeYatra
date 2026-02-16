import React, { useState } from 'react';
import Toast from "../toast"
import API from '../api/axios'; // Import the API module
import axios from "axios";
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

const RouteForm = ({ setShowRouteDialog }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [coordString, setCoordString] = useState('');
  const [parsedCoords, setParsedCoords] = useState(null);
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  // Function to parse the coordinate string
  const parseCoordinates = (coordString) => {
    try {
      let coords = coordString.replace(/[()]/g, "").split(",");
      
      // Convert string values to float
      let lat = parseFloat(coords[0].trim());
      let lon = parseFloat(coords[1].trim());

      // Check if parsed values are valid numbers
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error("Invalid coordinate format");
      }

      return [lat, lon]; // Return as an array of floats
    } catch (error) {
      throw new Error("Invalid coordinate format");
    }
  };

  // Handle form submission and POST request to FastAPI
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Parse coordinates from input string
      const parsed_start = parseCoordinates(startLocation);
      const parsed_end = parseCoordinates(endLocation);
      //setParsedCoords(parsed); // Store parsed coordinates
      setError(''); // Reset any previous errors

      // Send the parsed coordinates to the FastAPI backend
      const response = await fetch("https://subham-28-safeyatra-fastapi.hf.space/safe_route",, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"start": parsed_start, "end": parsed_end }), // send the parsed coordinates as origin and destination
      });

      // Parse the response JSON
      const data = await response.json();
      let safe_route=data["route"];
      console.log(safe_route);

      // Assuming the response is a list of tuples, set the response
      if (data.route) {
        setResponse(data.route); // Store the received route
      } else {
        setError("Error receiving route data");
      }
    } catch (err) {
      setError(err.message); // Set error message if anything goes wrong
      setParsedCoords(null); // Reset parsed coordinates if error occurs
      setResponse(null); // Reset the response
    }
  };

  // Function to fetch coordinates for a place name
  const fetchCoordinates = async (place) => {
    const apiKey = 'AIzaSyC_UyL76JWgPVAba9PRaEPvwxhLFDQUKDM'; // Replace with your Google API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { lat, lng };
      } else {
        // alert('Location not found');
        Toast.error("Location not found!");
        return null;
      }
    } catch (error) {
      // alert('Error fetching location');
      Toast.error("Error fetching location!");
      return null;
    }
  };

  // Function to handle form submission
  const handleRoutePlan = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Fetch coordinates for start and end locations
    const startCoords = await fetchCoordinates(startLocation);
    const endCoords = await fetchCoordinates(endLocation);

    if (startCoords && endCoords) {
      setStartCoords(startCoords);
      setEndCoords(endCoords);

      // Display an alert with coordinates
      // alert(`Starting Location: ${startCoords.lat}, ${startCoords.lng}\nDestination: ${endCoords.lat}, ${endCoords.lng}`);
      Toast.success("Coordinates fetched successfully!");
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Plan Your Route</h2>
        <button onClick={() => setShowRouteDialog(false)} className="text-gray-500 hover:text-gray-700">✖</button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Starting Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Starting Location (e.g., New York)
          </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="e.g., New York"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ending Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination (e.g., Los Angeles)
          </label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="e.g., Los Angeles"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => setShowRouteDialog(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Get Directions
          </button>
        </div>
      </form>
    </div>
  );
};

export default RouteForm;