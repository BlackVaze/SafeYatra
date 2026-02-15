import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import darkMapBg from './assets/darkmapbg.jpg';
import lightMapBg from './lightmapbg.png';
import profileIcon from './profileicon.png';
import { motion } from 'framer-motion';

// Translations for all text content
const translations = {
  en: {
    howItWorks: "How it Works",
    fileReport: "File a Report",
    aboutUs: "About Us",
    login: "Login",
    signUp: "Sign Up",
    title: "SafeYatra",
    mission: "Our mission is to help you travel with confidence",
    getDirections: "Get Directions",
    footer: "Designed and developed by team Gradient Gang",
    safetyTip: "Safety Tip:",
    english: "English",
    hindi: "हिंदी"
  },
  hi: {
    howItWorks: "यह कैसे काम करता है",
    fileReport: "रिपोर्ट दर्ज करें",
    aboutUs: "हमारे बारे में",
    login: "लॉग इन करें",
    signUp: "साइन अप करें",
    title: "सेफयात्रा",
    mission: "हमारा मिशन आपको विश्वास के साथ यात्रा करने में मदद करना है",
    getDirections: "दिशा-निर्देश प्राप्त करें",
    footer: "टीम ग्रेडिएंट गैंग द्वारा डिज़ाइन और विकसित",
    safetyTip: "सुरक्षा टिप:",
    english: "English",
    hindi: "हिंदी"
  }
};

// Safety tips in both languages
const safetyTips = {
  en: [
    "Stay aware of your surroundings while traveling",
    "Share your location with trusted contacts",
    "Keep emergency numbers saved offline",
    "Stick to well-lit and populated routes",
    "Trust your instincts - if something feels off, take a different path",
    "Plan your route ahead of time",
    "Keep your valuables secure and out of sight",
    "Stay in contact with friends or family during travel"
  ],
  hi: [
    "यात्रा करते समय अपने आस-पास के वातावरण के प्रति सचेत रहें",
    "विश्वसनीय संपर्कों के साथ अपना स्थान साझा करें",
    "आपातकालीन नंबर ऑफ़लाइन सेव करें",
    "अच्छी रोशनी वाले और भीड़-भाड़ वाले मार्गों पर चलें",
    "अपनी अंतर्ज्ञान पर भरोसा करें - अगर कुछ गलत लगता है, तो दूसरा रास्ता चुनें",
    "पहले से अपना रास्ता तय करें",
    "अपनी कीमती वस्तुओं को सुरक्षित और दृष्टि से दूर रखें",
    "यात्रा के दौरान दोस्तों या परिवार के संपर्क में रहें"
  ]
};

const CloseIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 4L4 12M4 4L12 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const SafetyTipsPopup = ({ isLightMode, currentLang }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % safetyTips[currentLang].length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentLang]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 left-4 max-w-xs p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      isLightMode 
        ? 'bg-gray-400 text-gray-800 shadow-gray-200' 
        : 'bg-gray-900 text-white shadow-black/20'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`text-sm font-semibold mb-1 ${
            isLightMode ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {translations[currentLang].safetyTip}
          </h4>
          <div className="relative h-15">
            <p className={`text-sm absolute w-full transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
            } ${isLightMode ? 'text-blue-00' : 'text-gray-300'}`}>
              {safetyTips[currentLang][currentTipIndex]}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={`ml-2 p-1 rounded-full transition-colors ${
            isLightMode 
              ? 'hover:bg-gray-100 text-gray-600' 
              : 'hover:bg-gray-800 text-gray-300'
          }`}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="mt-3 h-1 w-50 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            isLightMode ? 'bg-blue-500' : 'bg-yellow-500'
          }`}
          style={{
            width: `${((currentTipIndex % safetyTips[currentLang].length) / (safetyTips[currentLang].length - 1)) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

const MissionPathAnimation = ({ isLightMode }) => {
  return (
    <div className="absolute inset-0 h-[500px] pointer-events-none z-10">
      <svg
        className="absolute top-11/60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px]"
        viewBox="0 0 300 150"
      >
        <motion.path
          d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
          fill="none"
          stroke={isLightMode ? '#0000FF' : '#FFDD00'}
          strokeWidth="2.5"
          strokeDasharray="10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <circle cx="20" cy="140" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
        <circle cx="280" cy="60" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
      </svg>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); // Default language set to English

  const t = translations[currentLang];

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 relative ${isLightMode ? "bg-gray-100" : "bg-[#0A0F1F]"}`}>
      {/* Background elements */}
      {!isLightMode && (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${darkMapBg})` }}></div>
          <MissionPathAnimation isLightMode={isLightMode} />
        </>
      )}
      {isLightMode && (
        <>
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${lightMapBg})` }}></div>
          <MissionPathAnimation isLightMode={isLightMode} />
        </>
      )}

      {/* Navigation Menu */}
      <div className="absolute top-2 left-125 right-0 flex items-center p-4 z-30 text-xl">
        <div className="flex space-x-10">
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/how")}
          >
            {t.howItWorks}
          </button>
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/file")}
          >
            {t.fileReport}
          </button>
          <button
            className={`font-medium transition-all duration-300 
              ${isLightMode 
                ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
                : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => navigate("/aboutus")}
          >
            {t.aboutUs}
          </button>
        </div>
      </div>

      {/* Logo */}
      <div className={`absolute top-5 left-7 text-3xl font-extrabold transition-all z-30 ${isLightMode ? "text-gray-900" : "text-[#EAEAEA]"}`}>
        {t.title}
      </div>

      {/* User Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-4 z-30">
        <button
          className={`w-20 h-8 text-sm rounded-md transition font-medium
            ${isLightMode
              ? "bg-[#D8B4FE] text-black hover:bg-[#C084FC]"
              : "bg-gradient-to-b from-[#A855F7] to-[#7C3AED] text-white hover:from-[#C084FC] hover:to-[#9333EA]"
            }`}
          onClick={() => navigate("/login")}
        >
          {t.login}
        </button>
        <button
          className={`w-20 h-8 text-sm rounded-md transition font-medium
            ${isLightMode
              ? "bg-[#D8B4FE] text-black hover:bg-[#C084FC]"
              : "bg-gradient-to-b from-[#A855F7] to-[#7C3AED] text-white hover:from-[#C084FC] hover:to-[#9333EA]"
            }`}
          onClick={() => navigate("/signup")}
        >
          {t.signUp}
        </button>
        <button
          onClick={() => navigate("/accounts")}
          className={`p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 
            ${isLightMode ? 'bg-[#D8B4FE] hover:bg-[#C084FC]' : 'bg-purple-800 hover:bg-purple-900'}`}
        >
          <img src={profileIcon} alt='profile' className="w-full h-full object-cover rounded-full" />
        </button>
        <button
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? "bg-[#D8B4FE]" : "bg-[#7C3AED]"}`}
          onClick={() => setIsLightMode(!isLightMode)}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isLightMode ? "translate-x-6" : "translate-x-0"}`}></div>
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center text-center px-6 ${isLightMode ? "bg-gray-100" : "bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A]"}`}>
        <h1 className={`text-5xl font-bold transition-all z-20 ${isLightMode ? "text-gray-900" : "text-gray-300"}`}>
          {t.title}
        </h1>
        <p className={`mt-3 text-xl transition-all z-20 ${isLightMode ? "text-gray-700" : "text-gray-400"}`}>
          {t.mission}
        </p>
        
        <button
          className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20
            ${isLightMode
              ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
              : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
            }`}
          onClick={() => navigate("/map")}
        >
          {t.getDirections}
        </button>
      </div>

      {/* Safety Tips Component */}
      <SafetyTipsPopup isLightMode={isLightMode} currentLang={currentLang} />

      {/* Footer */}
      <footer className={`w-full text-center py-3 mt-5 z-60 ${isLightMode ? "bg-gray-200 text-gray-800" : "bg-[#1C1C1C] text-gray-400"}`}>
  <div className="flex justify-center items-center space-x-4">
    <p>{t.footer}</p>
    <div className="flex space-x-2">
      <button 
        onClick={() => setCurrentLang('en')} 
        className="text-gray-500 hover:underline hover:text-gray-700 transition">
        English
      </button>
      <button 
        onClick={() => setCurrentLang('hi')} 
        className="text-gray-500 hover:underline hover:text-gray-700 transition">
        हिंदी
      </button>
    </div>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;