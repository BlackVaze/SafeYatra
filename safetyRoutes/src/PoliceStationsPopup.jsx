
import React, { useEffect, useState } from "react";

// Use 'onClose' which is passed from the parent component
const PoliceStationsPopup = ({ darkMode, onClose }) => {
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (the rest of your useEffect and other functions remain the same)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Ensure the Google Maps API is loaded
          if (window.google) {
            const map = new window.google.maps.Map(document.createElement('div'), {
              center: { lat: latitude, lng: longitude },
              zoom: 12,
            });

            const request = {
              location: map.getCenter(),
              radius: 10000, // 10 km radius
              type: 'police',
            };

            const service = new window.google.maps.places.PlacesService(map);

            service.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // Map through the results and calculate distances
                const mappedStations = results.map((station) => {
                  const distance = getDistance(
                    latitude,
                    longitude,
                    station.geometry.location.lat(),
                    station.geometry.location.lng()
                  );
                  return { ...station, distance };
                });

                // Sort the stations by the smallest distance
                const nearestStation = mappedStations.sort((a, b) => a.distance - b.distance)[0];

                // Set only the nearest police station
                setPoliceStations([nearestStation]);
              } else {
                setError("No nearby police stations found.");
              }

              setLoading(false);
            });
          } else {
            setError("Google Maps API failed to load.");
            setLoading(false);
          }
        },
        (error) => {
          setError("Failed to retrieve location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);
  // Function to calculate the distance between two geographical coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"} 
      p-6 rounded-lg shadow-lg z-50 w-96 border`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Nearest Police Station</h2>
        {/* Call the 'onClose' function when the button is clicked */}
        <button
          onClick={()=>{
            console.log("close button clicked");
            onClose();
          }}
          
          className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
        >
          ✖
        </button>
      </div>

      <div className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {/* ... (rest of your JSX remains the same) */}
        {loading ? (
          <p>Loading nearby police stations...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            {policeStations.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold">{policeStations[0].name}</h3>
                <p className="text-sm">{policeStations[0].vicinity}</p>
                <p className="text-sm">Distance: {policeStations[0].distance.toFixed(2)} km</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceStationsPopup;