import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from "./toast"

const FileReport = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [crime, setCrime] = useState('');
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reportData = { location, time, crime, description };
      const response = await axios.post('http://localhost:5000/api/reports/submit', reportData);
      // alert(response.data.message);
      Toast.success(response.data.message);

      // Reset form fields
      setLocation('');
      setTime('');
      setCrime('');
      setDescription('');
      fetchReports();
    } catch (error) {
      // alert('Error submitting report');
      Toast.error('Error submitting report');
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/all');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 transition-colors duration-300">
        <a
          href="/LandingPage2"
          className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${!darkMode ? 'text-gray-800' : 'text-white'}`}
        >
          SafeYatra
        </a>

        {/* Theme Toggle Switch */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-290 w-14 h-7 relative rounded-full transition-colors duration-300 focus:outline-none"
        >
          <div
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
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
          FILE YOUR REPORT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Input */}
          <div>
            <label
              className={`block text-sm mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Enter Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full p-2.5 rounded-lg border transition-colors duration-300 ${darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                placeholder="Enter location"
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                📍
              </button>
            </div>
          </div>

          {/* Time Input */}
          <div>
            <label
              className={`block text-sm mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full p-2.5 rounded-lg border transition-colors duration-300 ${darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              placeholder="Enter time"
            />
          </div>

          {/* Crime Dropdown */}
          <div>
            <label
              className={`block text-sm mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Crime
            </label>
            <select
              value={crime}
              onChange={(e) => setCrime(e.target.value)}
              className={`w-full p-2.5 rounded-lg border appearance-none transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
            >
              <option value="" disabled>
                Select crime type
              </option>
         
              <option value="Homicide">Homicide</option>
              <option value="Crim Sexual Assault">Crim Sexual Assault</option>
              <option value="Criminal Sexual Assault">Criminal Sexual Assault</option>
              <option value="Kidnapping">Kidnapping</option>
              <option value="Human Trafficking">Human Trafficking</option>

          
              <option value="Robbery">Robbery</option>
              <option value="Arson">Arson</option>
              <option value="Assault">Assault</option>
              <option value="Battery">Battery</option>
              <option value="Weapons Violation">Weapons Violation</option>
              <option value="Intimidation">Intimidation</option>
              <option value="Stalking">Stalking</option>

            
              <option value="Burglary">Burglary</option>
              <option value="Motor Vehicle Theft">Motor Vehicle Theft</option>
              <option value="Theft">Theft</option>
              <option value="Criminal Damage">Criminal Damage</option>
              <option value="Criminal Trespass">Criminal Trespass</option>

              
              <option value="Offense Involving Children">Offense Involving Children</option>
              <option value="Sex Offense">Sex Offense</option>
              <option value="Prostitution">Prostitution</option>
              <option value="Narcotics">Narcotics</option>
              <option value="Liquor Law Violation">Liquor Law Violation</option>
              <option value="Gambling">Gambling</option>
              <option value="Public Peace Violation">Public Peace Violation</option>
              <option value="Obscenity">Obscenity</option>
              <option value="Public Indecency">Public Indecency</option>
              <option value="Concealed Carry License Violation">Concealed Carry License Violation</option>

              
              <option value="Deceptive Practice">Deceptive Practice</option>
              <option value="Interference With Public Officer">Interference With Public Officer</option>
              <option value="Other Offense">Other Offense</option>
              <option value="Other Narcotic Violation">Other Narcotic Violation</option>
              <option value="Non-Criminal">Non-Criminal</option>
              <option value="Ritualism">Ritualism</option>

            </select>
          </div>

          {/* Description Input */}
          <div>
            <label
              className={`block text-sm mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-1.5 rounded-lg border transition-colors duration-300 ${darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              placeholder="Please describe what happened"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mb-8 w-full py-2.5 rounded-lg font-medium transition-colors duration-300 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileReport;