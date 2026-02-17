import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import RouteForm from './components/RouteForm';
import HelpButton from './HelpButton';
import axios from 'axios';
import { List } from "lucide-react";
import PoliceStationsPopup from "./PoliceStationsPopup";
import Toast from "./toast";


const Map = () => {
  //const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [map, setMap] = useState(null);
  const [L, setL] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  // const [showPolicePopup, setShowPolicePopup] = useState(false);

  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [coordString, setCoordString] = useState('');
  const [parsedCoords, setParsedCoords] = useState(null);
  const [response, setResponse] = useState(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_GEOCODE_KEY;

  // --- START OF CHANGES FOR CRIME HOTSPOTS ---

  // State to manage hotspot visibility and layer reference
  const [hotspotsVisible, setHotspotsVisible] = useState(false);
  const [hotspotLayer, setHotspotLayer] = useState(null);
  // --- END OF CHANGES FOR CRIME HOTSPOTS ---


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
        const coords = [lat, lng];
        setCoordinates({ lat, lng });
        setError(null);
        console.log(coords);
        // return coords;
      } else {
        setError("Location not found.");
        setCoordinates(null);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setCoordinates(null);
    }
  };



  // Popup states
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [showRecentPopup, setShowRecentPopup] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [showPolicePopup, setShowPolicePopup] = useState(false);


  // Demo data
  const [savedAddresses, setSavedAddresses] = useState([
    '', '', '', '', ''  // 5 empty slots
  ]);


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


  // --- START OF CHANGES FOR CRIME HOTSPOTS ---
  // Replaced original handleClick with a toggle function
  const handleHotspotToggle = () => {
    // If markers are already visible, remove them and reset state
    if (hotspotsVisible) {
      if (hotspotLayer && map) {
        map.removeLayer(hotspotLayer);
      }
      setHotspotLayer(null);
      setHotspotsVisible(false);
      return; // Exit function
    }

    // If markers are NOT visible, create and add them
    const clusters = [
      [41.7505, -87.6018],
      [41.9163, -87.6559],
      [41.7751, -87.6794],
      [41.9072, -87.7440],
      [41.8000, -87.6200],
      [41.8300, -87.6500],
    ];

    // Create an array of Leaflet layers
    const markerLayers = clusters.map(cluster => {
      return L.circleMarker(cluster, {
        color: 'red',
        weight: 1,
        radius: 10,
        fillColor: 'red',
        fillOpacity: 0.4,
        opacity: 0.8,
        className: 'pulsing-hotspot' // Add this class name
      });
    });

    // Create a single LayerGroup to manage all markers at once
    const newLayerGroup = L.layerGroup(markerLayers).addTo(map);

    // Update state to track the new layer and its visibility
    setHotspotLayer(newLayerGroup);
    setHotspotsVisible(true);
  };
  // --- END OF CHANGES FOR CRIME HOTSPOTS ---


  // Handle form submission and POST request to FastAPI
  const handleSubmit = async (e) => {
    setShowRouteDialog(false)
    e.preventDefault();

    if (location.trim()) {
      getCoordinates(startLocation);
    }

    // let startCoords = startLocation || null; 
    let startCoords = startLocation.split(",").map(x => parseFloat(x.trim()));
    // let endCoords = endLocation;
    try {
      // Parse coordinates from input string
      try {

        if (startCoords != null) {
          // startCoords= await getCoordinates(startCoords);
        }
        else {
          // Get user GPS coordinates for starting location
          if ((!startCoords || !startCoords.trim()) && navigator.geolocation) {
            await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  startCoords = [parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)];
                  resolve();
                },
                (error) => {
                  console.error("Error getting start location:", error);
                  reject(error);
                },
                { enableHighAccuracy: true }
              );
            });
          }
        }
      }
      catch (error) {
        console.error("Error handling form submission:", error);
      }


      console.log(startCoords);
      // console.log(endLocation);
      // const parsed_end = await getCoordinates(endLocation);


      let parsed_end = endLocation.split(",").map(x => parseFloat(x.trim()));
      console.log(parsed_end);
      //setParsedCoords(parsed); // Store parsed coordinates
      setError(''); // Reset any previous errors

      // Send the parsed coordinates to the FastAPI backend
      const response = await fetch("https://subham-28-safeyatra-fastapi.hf.space/safe_route",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start: startCoords, end: parsed_end }),
  }
);

      const alt_response = await fetch("https://subham-28-safeyatra-fastapi.hf.space/alt_route",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start: startCoords, end: parsed_end }),
  }
);
    
      const alt_data = await alt_response.json();
      let alt_route = [];
      if (Object.keys(alt_data).length == 1) {
        alt_route.push(alt_data["alternate_routes"]);
      }

      else if (Object.keys(alt_data).length == 2) {
        alt_route.push(alt_data["route-1"]);
        alt_route.push(alt_data["route-2"]);
      }

      else if (Object.keys(alt_data).length == 3) {
        alt_route.push(alt_data["route-1"]);
        alt_route.push(alt_data["route-2"]);
        alt_route.push(alt_data["route-3"]);
      }

      else if (Object.keys(alt_data).length == 0) {
        alt_route.push([]);
      }

      console.log(alt_route.length);
      // Parse the response JSON


      const text = await response.text();
      console.log(text);
      const data = JSON.parse(text);
      // console.log(data);
      let safe_route = data["safest_route"];
      // console.log(safe_route);



      // Create a polyline using the coordinates and add it to the map
      var endLat = parsed_end[0];  // Example: San Francisco
      var endLng = parsed_end[1];


      // Initialize the user path polyline
      var fixedRoute = safe_route;
      // console.log(fixedRoute);


      // Draw the fixed route on the map
      var routePolyline = L.polyline(fixedRoute, { color: 'green', weight: 6, opacity: 0.8 }).addTo(map);
      //var altroutePolyline = L.polyline(alt_route, { color: 'blue', weight: 4, opacity:0.7 }).addTo(map);
      // alt_route.forEach((route)=>
      // {
      //   L.polyline(route, { color: 'blue', weight: 4, fillOpacity:0.7 }).addTo(map);
      // });
      if (alt_route.length == 1) {
        var altp = L.polyline(alt_route[0], { color: 'blue', weight: 4, fillOpacity: 0.4 }).addTo(map);
      }
      else if (alt_route.length == 2) {

        var altp = L.polyline(alt_route[0], { color: 'blue', weight: 4, fillOpacity: 0.4 }).addTo(map);
        var altp1 = L.polyline(alt_route[1], { color: 'blue', weight: 4, fillOpacity: 0.4 }).addTo(map);

      }
      else if (alt_route.length == 3) {

        var altp = L.polyline(alt_route[0], { color: '#6a7fdb', weight: 4, fillOpacity: 0.4 }).addTo(map);
        var altp1 = L.polyline(alt_route[1], { color: '#c38d94', weight: 4, fillOpacity: 0.4 }).addTo(map);
        var altp2 = L.polyline(alt_route[2], { color: '#7b4b94', weight: 4, fillOpacity: 0.4 }).addTo(map);

      }


      // Marker for the user


      var userMarker = L.circleMarker([0, 0]).addTo(map);
      // Polyline for the user's movement (blue)
      var userPolyline = L.polyline([], { color: 'blue', weight: 4 }).addTo(map);


      // Track user’s movement
      function updateUserLocation(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var userPos = [lat, lon];

        // Update marker position
        userMarker.setLatLng(userPos).setPopupContent(`You are here<br>Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`);

        // Update user polyline (append only if moving along the fixed route)
        userPolyline.addLatLng(userPos);

        // Move map to user's location

      }



      function handleLocationError(error) {
        console.error("Error getting location: ", error);
      }

      // Start tracking user
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updateUserLocation, handleLocationError, {
          enableHighAccuracy: true,
          maximumAge: 0
        });
      } else {
        // alert("Geolocation is not supported by this browser.");
        Toast.error("Geolocation is not supported by this browser.");
      }

      // Add a marker at the start (first coordinate)
      const startMarker = L.circleMarker(safe_route[0],
        {
          colorFill: 'red'
        }
      ).addTo(map)
        .bindPopup('Start Point')
        .openPopup();

      const endMarker = L.marker(safe_route[safe_route.length - 1],
        {
          colorFill: 'blue'
        }
      ).addTo(map)
        .bindPopup(endLocation)
        .openPopup();

      // Add a marker at the end (last coordinate)


      map.fitBounds(routePolyline.getBounds());

      // Add a marker at the end (last coordinate)


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



  const [recentAddresses] = useState([
    "123 Main St, Austin, TX",
    "456 Park Ave, Houston, TX",
    "789 Oak Rd, Dallas, TX"
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState([
    "911",
    "512-555-0123",
    "713-555-0456",
    "214-555-0789",
    "832-555-0321"
  ]);
  useEffect(() => {
    // Initialize Leaflet only on client side
    const initMap = async () => {
      const L = await import('leaflet');
      setL(L);

      // const mapInstance = L.map("map", {
      //   zoomControl: false,
      //   maxBounds: [[33.5, -119.0], [34.5, -117.5]], // Northeast corner
      //   maxBoundsViscosity: 0.0
      //   // Keeps user inside the bounds
      // }).setView([34.0522, -118.2437], 12); // Center on LA
      const mapInstance = L.map("map", {
        zoomControl: false,
        maxBounds: [[41.73, -87.85], [42.02, -87.45]], // ~20 km radius around downtown Chicago
        maxBoundsViscosity: 0.0 // Keeps user inside the bounds
      }).setView([41.8781, -87.6298], 12); // Center on Downtown Chicago





      // Define tile layers for both themes
      const lightTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      // const darkTiles = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      // });
      const darkTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }
);



      // Add the appropriate layer based on current theme
      if (darkMode) {
        darkTiles.addTo(mapInstance);
      } else {
        lightTiles.addTo(mapInstance);
      }

      // Store both layers in the map instance for later use
      mapInstance.lightTiles = lightTiles;
      mapInstance.darkTiles = darkTiles;

      L.control.zoom({
        position: "topright",
      }).addTo(mapInstance);

      const zoomControl = document.querySelector(".leaflet-control-zoom");
      zoomControl.style.position = "absolute";
      zoomControl.style.top = "60px";
      zoomControl.style.right = "1px";
      zoomControl.style.zIndex = "10000";

      setMap(mapInstance);
    };

    initMap();

    // Cleanup
    return () => {
      if (map) map.remove();
    };
  }, []); // Initial map setup



  // Add a separate useEffect to handle theme changes
  useEffect(() => {
    if (map && map.lightTiles && map.darkTiles) {
      if (darkMode) {
        if (map.hasLayer(map.lightTiles)) {
          map.removeLayer(map.lightTiles);
        }
        map.darkTiles.addTo(map);
      } else {
        if (map.hasLayer(map.darkTiles)) {
          map.removeLayer(map.darkTiles);
        }
        map.lightTiles.addTo(map);
      }
    }
  }, [darkMode, map]);

  const handleRoutePlan = async (e) => {
    e.preventDefault();

    if (!map || !L) return;

    // Remove existing route if any
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLocation};${endLocation}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = L.geoJSON(data.routes[0].geometry, {
          style: {
            color: '#0066CC',
            weight: 6,
            opacity: 0.7
          }
        }).addTo(map);

        setRouteLayer(route);
        map.fitBounds(route.getBounds(), { padding: [50, 50] });
        setShowRouteDialog(false);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      // alert('Error calculating route. Please check your coordinates and try again.');
      Toast.error('Error calculating route. Please check your coordinates and try again.');
    }


  };

  const handleSaveAddress = (index, address) => {
    const newAddresses = [...savedAddresses];
    newAddresses[index] = address;
    setSavedAddresses(newAddresses);
  };

  const handleUpdatePhone = (index, number) => {
    const newNumbers = [...phoneNumbers];
    newNumbers[index] = number;
    setPhoneNumbers(newNumbers);
  };

  // Popup Components
  const SavedPopup = ({ darkMode }) => (
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Saved Locations</h2>
        <button onClick={() => setShowSavedPopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
      </div>
      <div className="space-y-3">
        {savedAddresses.map((address, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={address}
              onChange={(e) => handleSaveAddress(index, e.target.value)}
              placeholder={`Saved Location ${index + 1}`}
              className={`w-full p-2 border rounded ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
            />
          </div>
        ))}
      </div>
    </div>

  );
  const RecentPopup = ({ darkMode }) => (
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Locations</h2>
        <button onClick={() => setShowRecentPopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
      </div>
      <div className="space-y-2">
        {recentAddresses.map((address, index) => (
          <div key={index} className={`p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
            {address}
          </div>
        ))}
      </div>
    </div>
  );

  const PhonePopup = ({ darkMode }) => (
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96 border`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Emergency Contacts</h2>
        <button onClick={() => setShowPhonePopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
      </div>
      <div className="space-y-3">
        {phoneNumbers.map((number, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={number}
              onChange={(e) => handleUpdatePhone(index, e.target.value)}
              className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // const PoliceStationsPopup = ({ darkMode }) => (
  // <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  //   ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
  //   p-6 rounded-lg shadow-lg z-50 w-96 border`}>
  //   <div className="flex justify-between items-center mb-4">
  //     <h2 className="text-lg font-semibold">Nearby Police Stations</h2>
  //     <button onClick={() => setShowPolicePopup(false)} className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
  //   </div>
  //   <div className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
  //     <p>Fetching nearby police stations...</p>
  //     <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>This feature would integrate with a real police station API</p>
  //   </div>
  // </div>
  // );

  // Update the Route Planning Dialog with dark mode
  {
    showRouteDialog && (
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} 
  p-6 rounded-lg shadow-lg z-50 w-96`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Plan Your Route</h2>
          <button onClick={() => setShowRouteDialog(false)}
            className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>✖</button>
        </div>
      </div>
    )
  }
  const handleClosePolicePopup = () => {
    setShowPolicePopup(false);
  };

  // Update the popup references in the return statement to pass the darkMode prop
  { showSavedPopup && <SavedPopup darkMode={darkMode} /> }
  { showRecentPopup && <RecentPopup darkMode={darkMode} /> }
  { showPhonePopup && <PhonePopup darkMode={darkMode} /> }
  // { showPolicePopup && (
  //  <PoliceStationsPopup 
  //   darkMode={darkMode} 
  //   onClose={handleClosePolicePopup} 
  //   />
  //  )}



  return (
    <div className="relative w-full h-screen">
      {/* Search Bar */}
      <div
        className={`absolute top-0 left-0 w-full p-2 flex items-center shadow-md z-50 transition-all duration-300 ${sidebarOpen ? "w-52" : "w-16"
          } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className={`p-2 text-xl self-end ${darkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"
            }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter your destination"
          className={`ml-7 p-2 w-[600px] border rounded-lg cursor-pointer z-30 transition-all ${darkMode
            ? "bg-gray-800 text-white border-gray-600 opacity-80"
            : "bg-white text-black border-gray-300 opacity-75"
            }`}
          onClick={() => setShowRouteDialog(true)}
          readOnly
        />
      </div>

      {/* Route Planning Dialog */}
      <div>
        {/* A button to open the form */}
        <button
          onClick={() => setShowRouteDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Plan Your Route
        </button>

        {/* Conditionally render RouteForm when showRouteDialog is true */}
        {showRouteDialog && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Plan Your Route</h2>
              <button onClick={() => setShowRouteDialog(false)} className="text-gray-500 hover:text-gray-700">✖</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Starting Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your starting location
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
                  Destination location
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
        )}
      </div>

      {/* Dark Mode Toggle
      <div className="absolute top-2 right-5 z-40">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center px-1 rounded-full transition-all ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}
          ></div>
        </button>
      </div> */}

      <div className="absolute top-2 right-5 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center px-1 rounded-full transition-all ${darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-0" : "translate-x-7"
              }`}
          ></div>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`absolute top-0 left-0 h-full p-2 flex items-center shadow-md z-40 flex-col py-4 transition-all duration-300 
${sidebarOpen ? "w-52" : "w-18"} 
${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>

        {/* Sidebar Toggle Button */}
        <button className="p-2 text-xl self-start" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Menu */}
        <nav className="flex flex-col w-full p-2">
          <Link
            to="/LandingPage2"
            className={`p-3 flex items-center w-full transition-colors duration-200 z-20 
        ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
          >
            🏠 {sidebarOpen && <span className="ml-2">Home</span>}
          </Link>
          <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            onClick={() => setShowSavedPopup(true)}>
            ⭐ {sidebarOpen && <span className="ml-2">Saved</span>}
          </button>
          <button className={`p-3 flex items-center w-full transition-colors duration-200 
    ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            onClick={() => setShowRecentPopup(true)}>
            🕘 {sidebarOpen && <span className="ml-2">Recent</span>}
          </button>
          <button className={`p-3 flex items-center w-full transition-colors duration-200 
  ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            onClick={() => setShowPhonePopup(true)}>
            📞 {sidebarOpen && <span className="ml-2">Phone</span>}
          </button>
          <button
            className={`p-3 flex items-center w-full transition-colors duration-200 
            ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            onClick={() => setShowPolicePopup(true)}>
            🚔 {sidebarOpen && <span className="ml-2">Police Stations</span>}
          </button>

          {/* --- START OF CHANGES FOR CRIME HOTSPOTS --- */}
          <button
            className={`p-3 flex items-center w-full transition-colors duration-200 
            ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-900"}`}
            onClick={handleHotspotToggle}> {/* Changed to call the new toggle function */}
            🎯 {sidebarOpen && <span className="ml-2">Crime Hotspots</span>}
          </button>
          {/* --- END OF CHANGES FOR CRIME HOTSPOTS --- */}

        </nav>
      </div>

      {/* Popups */}
      {showSavedPopup && <SavedPopup />}
      {showRecentPopup && <RecentPopup />}
      {showPhonePopup && <PhonePopup />}
      {showPolicePopup && (
        <PoliceStationsPopup
          darkMode={darkMode}
          onClose={handleClosePolicePopup}
        />
      )}

      {/* Map Container */}
      <div id="map" className="w-full h-full z-10" />

      {/* Bottom Right Buttons */}
      {/* Bottom Right Buttons */}
      <div className="absolute bottom-7 right-5 flex flex-col gap-4 z-20">
        {/* HELP Button */}
        {/* <button
  //onClick={() => setShowRouteDialog(false)}
    className={`relative w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent 
    ${!darkMode ? "border-b-red-600 text-white" : "border-b-[#FFFF00] text-black"} animate-pulse z-20`}
  >
    <span className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
      <b>!</b>
    </span>
  </button> */}
        <HelpButton />


        <div className="flex flex-col px-8 py-2 gap-2 z-20">
          {/* Map Button */}
          <button
            className={`p-2 shadow-md rounded-lg border-2 ${darkMode ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-800"
              }`}
          >
            🗺
          </button>

          {/* Satellite Button */}
          <button
            className={`p-2 shadow-md rounded-lg border-2 ${darkMode ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-800"
              }`}
          >
            🛰
          </button>
        </div>
      </div>

    </div>
  );
};

export default Map;