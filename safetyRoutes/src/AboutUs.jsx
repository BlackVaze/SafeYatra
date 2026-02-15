import React, { useState } from 'react';
import { Link } from "react-router-dom";
import pinimage from './pin.jpeg';
import mapimage from './mapp.jpg';
import helpimage from './danger.jpg';

const AboutUs = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  return (
    <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white' : 'bg-[#0F172A]'}`}>
      {/* Navbar */}
      <nav className="absolute top-2 left-0 right-0 flex items-center justify-between p-4 z-30 text-lg md:text-xl bg-opacity-80 backdrop-blur-md">
        {/* Logo */}
        <Link to="/LandingPage2" className={`text-2xl md:text-3xl font-extrabold ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
          SafeYatra
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 relative right-12">
          <Link to="/how" className={`font-medium text-gray-600 cursor-pointer hover:underline hover:underline-offset-4 hover:text-yellow-500 hover:decoration-yellow-500 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>How it Works</Link>
          <Link to="/file" className={`font-medium text-gray-600 cursor-pointer hover:underline hover:underline-offset-4 hover:text-yellow-500 hover:decoration-yellow-500 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>File a Report</Link>
          <Link to="/about-us" className={`font-medium text-gray-600 cursor-pointer hover:underline hover:underline-offset-4 hover:text-yellow-500 hover:decoration-yellow-500 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>About Us</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-lg border px-3 py-1 rounded"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {/* Mobile Dropdown */}
        <div
          className={`absolute top-16 left-0 w-full bg-gray-900 text-white text-center py-6 space-y-6 md:hidden transition-all duration-300 ${menuOpen ? 'block' : 'hidden'
            }`}
        >
          <Link to="/how-it-works" className="block" onClick={() => setMenuOpen(false)}>How it Works</Link>
          <Link to="/file" className="block" onClick={() => setMenuOpen(false)}>File a Report</Link>
          <Link to="/about-us" className="block" onClick={() => setMenuOpen(false)}>About Us</Link>
        </div>

        {/* Theme Toggle */}
        <button
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? 'bg-[#D8B4FE]' : 'bg-[#7C3AED]'}`}
          onClick={() => setIsLightMode(!isLightMode)}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isLightMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>About Us</h1>
          <p className={`text-base md:text-lg ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
            We help you navigate safely through your city with real-time data and recommendations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {[
            { icon: "📚", title: "Route Safety Mapping", desc: "Tracks the safest routes using community feedback and official data." },
            { icon: "📍", title: "Safe Locations", desc: "Find police stations, hospitals, and other safe zones nearby." },
            { icon: "🚨", title: "Emergency Alerts", desc: "Stay informed with real-time emergency alerts." },
          ].map(({ icon, title, desc }, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 md:p-8 transform transition-transform duration-300 hover:scale-108 cursor-pointer ${isLightMode ? 'bg-white shadow-lg' : 'bg-[#1E293B]'
                }`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl">{icon}</span>
                <h2 className={`text-lg md:text-xl font-semibold ml-3 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>{title}</h2>
              </div>
              <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>{desc}</p>
            </div>
          ))}
        </div>


        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>Our Mission</h2>
          <p className={`text-base md:text-lg mb-12 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
            We aim to make urban navigation safer by using real-time data and integrating local community feedback.
          </p>

          {/* Icons Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[{ img: mapimage, text: "Maps & Routing" },
            { img: pinimage, text: "Safe Locations" },
            { img: helpimage, text: "Emergency Alerts" },
            ].map(({ img, text }, index) => (
              <div key={index} className={`p-4 md:p-6 shadow-md rounded-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-108 cursor-pointer  ${isLightMode ? 'bg-white' : 'bg-[#1E293B]'}`}>
                <img src={img} alt={text} className="w-24 h-24 object-cover rounded-lg mb-4" />
                <p className={isLightMode ? 'text-gray-600' : 'text-gray-300'}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;