import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Seereport = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [reports, setReports] = useState([]); // State to hold fetched reports

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports/all');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        {/* SafeYatra Logo */}
        <Link
          to="/LandingPage2"
          className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${darkMode ? 'text-white' : 'text-gray-800'
            }`}
        >
          SafeYatra
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-290 w-14 h-7 relative rounded-full transition-colors duration-300 focus:outline-none"
        >
          <div
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
          ></div>
          <div
            className={`absolute w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${darkMode ? 'translate-x-1' : 'translate-x-8'
              } top-1`}
          ></div>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto mt-16 px-4">
        <h2
          className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'
            }`}
        >
          PREVIOUS REPORTS
        </h2>

        {/* Reports List */}
        <div className="space-y-6"> 
  {reports.length > 0 ? (
    reports.map((report) => (
      <div
        key={report._id}
        className={`p-4 rounded-lg border transition-transform cursor-pointer duration-300 transform hover:scale-106 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <p className="text-gray-300">Location: {report.location}</p>
        <p className="text-gray-300">Time: {report.time}</p>
        <p className="text-gray-300">Crime Type: {report.crime}</p>
        <p className="text-gray-300">{report.description}</p>
      </div>
    ))
  ) : (
    <p
      className={`text-center transition-colors duration-300 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      No reports available.
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default Seereport;