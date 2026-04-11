import React, { useEffect, useState } from "react";

const PoliceStationsPopup = ({ darkMode, onClose }) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        if (!window.google) {
          setError("Google Maps API failed to load.");
          setLoading(false);
          return;
        }

        try {
          const { Place, SearchNearbyRankPreference } =
            await window.google.maps.importLibrary("places");

          const request = {
            fields: [
              "displayName",
              "formattedAddress",
              "location",
              "regularOpeningHours",
            ],
            locationRestriction: {
              center: { lat: latitude, lng: longitude },
              radius: 10000,
            },
            includedPrimaryTypes: ["police"],
            maxResultCount: 10,
            rankPreference: SearchNearbyRankPreference.DISTANCE,
          };

          const { places } = await Place.searchNearby(request);

          console.log("places result:", places);
          console.log("first place:", places?.[0]);

          if (places && places.length > 0) {
            const mapped = places.map((s) => {
              // handle both string and object variants of displayName
              const name =
                typeof s.displayName === "string"
                  ? s.displayName
                  : s.displayName?.text ?? "Unknown Station";

              const vicinity =
                s.formattedAddress ?? s.vicinity ?? "Address unavailable";

              const lat =
                typeof s.location.lat === "function"
                  ? s.location.lat()
                  : s.location.lat;

              const lng =
                typeof s.location.lng === "function"
                  ? s.location.lng()
                  : s.location.lng;

              return {
                name,
                vicinity,
                location: s.location,
                lat,
                lng,
                distance: getDistance(latitude, longitude, lat, lng),
              };
            });

            const nearest = mapped.sort((a, b) => a.distance - b.distance)[0];
            setStation(nearest);
          } else {
            setError("No nearby police stations found.");
          }
        } catch (err) {
          console.error("Places API error:", err);
          setError("Failed to fetch nearby police stations.");
        }

        setLoading(false);
      },
      () => {
        setError("Failed to retrieve your location.");
        setLoading(false);
      }
    );
  }, []);

  const getDirectionsUrl = () => {
    if (!station) return "#";
    return `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`
          relative w-full max-w-sm rounded-2xl shadow-xl z-10
          border transition-colors duration-200
          ${darkMode
            ? "bg-zinc-900 border-zinc-700 text-white"
            : "bg-white border-zinc-200 text-zinc-900"
          }
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b
          ${darkMode ? "border-zinc-800" : "border-zinc-100"}`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
              ${darkMode ? "bg-blue-900/50" : "bg-blue-50"}`}
            >
              <svg
                className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Nearest police station</span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors
            ${darkMode
              ? "text-zinc-400 hover:bg-zinc-800"
              : "text-zinc-400 hover:bg-zinc-100"
            }`}
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <svg
                className="w-6 h-6 animate-spin text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                Finding nearby stations…
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className={`flex items-start gap-3 p-3 rounded-xl
              ${darkMode
                ? "bg-red-950/40 border border-red-900/50"
                : "bg-red-50 border border-red-100"
              }`}
            >
              <svg
                className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className={`text-sm ${darkMode ? "text-red-400" : "text-red-700"}`}>
                {error}
              </p>
            </div>
          )}

          {/* Station data */}
          {!loading && !error && station && (
            <>
              <p className="text-[15px] font-semibold mb-1">{station.name}</p>
              <p className={`text-sm mb-4 leading-relaxed
                ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                {station.vicinity}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className={`rounded-xl p-3 ${darkMode ? "bg-zinc-800" : "bg-zinc-50"}`}>
                  <p className={`text-[11px] mb-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                    Distance
                  </p>
                  <p className="text-lg font-semibold">
                    {station.distance.toFixed(2)}
                    <span className={`text-xs font-normal ml-1
                      ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      km
                    </span>
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${darkMode ? "bg-zinc-800" : "bg-zinc-50"}`}>
                  <p className={`text-[11px] mb-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                    Est. drive
                  </p>
                  <p className="text-lg font-semibold">
                    {Math.round(station.distance / 0.5)}
                    <span className={`text-xs font-normal ml-1
                      ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      min
                    </span>
                  </p>
                </div>
              </div>

              <div className={`border-t mb-4 ${darkMode ? "border-zinc-800" : "border-zinc-100"}`} />

              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  Open 24 hours · Emergency services available
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2
                    py-2.5 rounded-xl text-sm font-semibold transition-opacity
                    ${darkMode
                      ? "bg-blue-900/50 text-blue-300 hover:opacity-80"
                      : "bg-blue-50 text-blue-700 hover:opacity-80"
                    }`}
                >
                  <svg
                    className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Get directions
                </a>
                
                <a
                  href="tel:100"
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold
                    border transition-colors
                    ${darkMode
                      ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                >
                  Call
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliceStationsPopup;
