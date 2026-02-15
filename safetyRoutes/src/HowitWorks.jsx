import React, { useState, useEffect } from 'react';

const HowItWorks = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeText, setActiveText] = useState('');
  const isLightMode = !darkMode;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.classList.add('dark');
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      document.body.classList.remove('dark');
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const DialogBox = () => (
    <div className={`border rounded-lg p-4 w-[400px] max-w-full transition-colors duration-300 ${
      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Plan Your Route</h2>
        <button className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Starting Location (e.g., New York)
          </label>
          <input
            type="text"
            placeholder="e.g., New York"
            className={`w-full p-2 border rounded transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
        </div>
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Destination (e.g., Los Angeles)
          </label>
          <input
            type="text"
            placeholder="e.g., Los Angeles"
            className={`w-full p-2 border rounded transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-black placeholder-gray-500'
            }`}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button className={`px-4 py-2 border rounded transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col min-h-screen`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 transition-colors duration-300">
        <a 
          href="/LandingPage2" 
          className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          SafeYatra
        </a>
      </div>

      <div className="max-w-6xl mx-auto p-6 w-full overflow-x-hidden">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div 
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? 'translate-x-6' : ''
            }`} />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
            HOW TO USE OUR WEBSITE TO GET DIRECTIONS
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Click the buttons below
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Left Column */}
          <div className="space-y-8 flex-1">
            <div className="flex flex-col items-center">
              <button
                className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20 ${
                  isMobile
                    ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
                    : isLightMode
                      ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
                      : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
                }`}
                onClick={() => setActiveText(activeText === 'directions' ? '' : 'directions')}
              >
                Get Directions
              </button>
              <div className={`transition-all duration-300 mt-2 ${activeText === 'directions' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Redirects you to the Map
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="Enter your destination"
                className={`w-[600px] max-w-full p-2 border rounded-lg cursor-pointer z-30 transition-all ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                onClick={() => setActiveText(activeText === 'search' ? '' : 'search')}
                readOnly
              />
              <div className={`transition-all duration-300 mt-2 ${activeText === 'search' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  The dialogue below appears, Kindly enter the start and end destination
                </p>
              </div>
            </div>

            {/* Route Planning and Dialog Section */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Route Planning Steps */}
              <div className="flex-1 w-full order-2 lg:order-1">
                <h3 className={`font-semibold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Plan Your Route:
                </h3>
                <div className="space-y-4">
                  {['location', 'destination', 'getDir'].map((step, index) => (
                    <div key={step}>
                      <button
                        className={`w-full text-left p-3 rounded-lg border transition-colors duration-300 ${
                          darkMode 
                            ? 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700' 
                            : 'border-gray-200 bg-white text-black hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveText(activeText === step ? '' : step)}
                      >
                        {index + 1}. {step === 'location' 
                          ? 'Enter Starting Location' 
                          : step === 'destination' 
                            ? 'Enter Destination' 
                            : 'Click on this button'}
                      </button>
                      <div className={`transition-all duration-300 ${activeText === step ? 'opacity-100' : 'opacity-0'}`}>
                        <p className={`text-sm ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step === 'location' 
                            ? 'Type in your current location or starting point'
                            : step === 'destination'
                              ? 'Type in where you want to go'
                              : 'Click to see the safest route to your destination'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dialog Box */}
              <div className="flex flex-col items-center order-1 lg:order-2" onClick={() => setActiveText(activeText === 'dialog' ? '' : 'dialog')}>
                <DialogBox />
                <div className={`transition-all duration-300 mt-2 ${activeText === 'dialog' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Fill the required fields
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Buttons Section */}
        <div className="mt-12">
          <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
            ADDITIONAL BUTTONS:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { id: 'help', icon: '⚠️', text: 'HELP', desc: 'Instantly sends an emergency alert' },
              { id: 'contacts', icon: '📞', text: 'CONTACTS', desc: 'Quick access to your emergency contacts' },
              { id: 'police', icon: '🏢', text: 'POLICE STATIONS', desc: 'Shows nearest police stations on the map' }
            ].map(button => (
              <div key={button.id} className="flex flex-col items-center">
                <button
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                    button.id === 'help'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : darkMode
                        ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                        : 'bg-white text-black border border-black hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveText(activeText === button.id ? '' : button.id)}
                >
                  {button.icon} {button.text}
                </button>
                <div className={`transition-all duration-300 mt-2 ${activeText === button.id ? 'opacity-100' : 'opacity-0'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {button.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`w-full text-center py-2 mt-5 z-60 ${isLightMode ? 'bg-gray-200 text-gray-800' : 'bg-[#1C1C1C] text-gray-400'} mt-auto`}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
          <p>© 2025 SafeYatra. All rights reserved.</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => console.log('Language switched to English')} 
              className="text-gray-500 hover:underline hover:text-gray-700 transition">
              English
            </button>
            <button 
              onClick={() => console.log('Language switched to Hindi')} 
              className="text-gray-500 hover:underline hover:text-gray-700 transition">
              हिंदी
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;