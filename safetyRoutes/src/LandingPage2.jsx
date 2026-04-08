// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import darkMapBg from './assets/darkmapbg.jpg';
// import lightMapBg from './lightmapbg.png';
// import profileIcon from './profileicon.png';
// import { motion } from 'framer-motion';

// // Translations for all text content
// const translations = {
//   en: {
//     howItWorks: "How it Works",
//     fileReport: "File a Report",
//     aboutUs: "About Us",
//     login: "Login",
//     signUp: "Sign Up",
//     title: "SafeYatra",
//     mission: "Our mission is to help you travel with Confidence",
//     getDirections: "Get Directions",
//     footer: "Designed and developed by team Gradient Gang",
//     safetyTip: "Safety Tip:",
//     english: "English",
//     hindi: "हिंदी"
//   },
//   hi: {
//     howItWorks: "यह कैसे काम करता है",
//     fileReport: "रिपोर्ट दर्ज करें",
//     aboutUs: "हमारे बारे में",
//     login: "लॉग इन करें",
//     signUp: "साइन अप करें",
//     title: "सेफयात्रा",
//     mission: "हमारा मिशन आपको विश्वास के साथ यात्रा करने में मदद करना है",
//     getDirections: "दिशा-निर्देश प्राप्त करें",
//     footer: "टीम ग्रेडिएंट गैंग द्वारा डिज़ाइन और विकसित",
//     safetyTip: "सुरक्षा टिप:",
//     english: "English",
//     hindi: "हिंदी"
//   }
// };

// // Safety tips in both languages
// const safetyTips = {
//   en: [
//     "Stay aware of your surroundings while traveling",
//     "Share your location with trusted contacts",
//     "Keep emergency numbers saved offline",
//     "Stick to well-lit and populated routes",
//     "Trust your instincts - if something feels off, take a different path",
//     "Plan your route ahead of time",
//     "Keep your valuables secure and out of sight",
//     "Stay in contact with friends or family during travel"
//   ],
//   hi: [
//     "यात्रा करते समय अपने आस-पास के वातावरण के प्रति सचेत रहें",
//     "विश्वसनीय संपर्कों के साथ अपना स्थान साझा करें",
//     "आपातकालीन नंबर ऑफ़लाइन सेव करें",
//     "अच्छी रोशनी वाले और भीड़-भाड़ वाले मार्गों पर चलें",
//     "अपनी अंतर्ज्ञान पर भरोसा करें - अगर कुछ गलत लगता है, तो दूसरा रास्ता चुनें",
//     "पहले से अपना रास्ता तय करें",
//     "अपनी कीमती वस्तुओं को सुरक्षित और दृष्टि से दूर रखें",
//     "यात्रा के दौरान दोस्तों या परिवार के संपर्क में रहें"
//   ]
// };

// const CloseIcon = () => (
//   <svg 
//     width="16" 
//     height="16" 
//     viewBox="0 0 16 16" 
//     fill="none" 
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path 
//       d="M12 4L4 12M4 4L12 12" 
//       stroke="currentColor" 
//       strokeWidth="2" 
//       strokeLinecap="round" 
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const SafetyTipsPopup = ({ isLightMode, currentLang }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [currentTipIndex, setCurrentTipIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setCurrentTipIndex((prev) => (prev + 1) % safetyTips[currentLang].length);
//         setIsTransitioning(false);
//       }, 500);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [currentLang]);

//   if (!isVisible) return null;

//   return (
//     <div className={`fixed bottom-24 left-4 max-w-xs p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
//       isLightMode 
//         ? 'bg-gray-400 text-gray-800 shadow-gray-200' 
//         : 'bg-gray-900 text-white shadow-black/20'
//     }`}>
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <h4 className={`text-sm font-semibold mb-1 ${
//             isLightMode ? 'text-gray-900' : 'text-gray-100'
//           }`}>
//             {translations[currentLang].safetyTip}
//           </h4>
//           <div className="relative h-15">
//             <p className={`text-sm absolute w-full transition-all duration-500 ${
//               isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
//             } ${isLightMode ? 'text-blue-00' : 'text-gray-300'}`}>
//               {safetyTips[currentLang][currentTipIndex]}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={() => setIsVisible(false)}
//           className={`ml-2 p-1 rounded-full transition-colors ${
//             isLightMode 
//               ? 'hover:bg-gray-100 text-gray-600' 
//               : 'hover:bg-gray-800 text-gray-300'
//           }`}
//         >
//           <CloseIcon />
//         </button>
//       </div>
//       <div className="mt-3 h-1 w-50 bg-gray-200 rounded-full overflow-hidden">
//         <div 
//           className={`h-full transition-all duration-300 ${
//             isLightMode ? 'bg-blue-500' : 'bg-yellow-500'
//           }`}
//           style={{
//             width: `${((currentTipIndex % safetyTips[currentLang].length) / (safetyTips[currentLang].length - 1)) * 100}%`
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// const MissionPathAnimation = ({ isLightMode }) => {
//   return (
//     <div className="absolute inset-0 h-[500px] pointer-events-none z-10">
//       <svg
//         className="absolute top-11/60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px]"
//         viewBox="0 0 300 150"
//       >
//         <motion.path
//           d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
//           fill="none"
//           stroke={isLightMode ? '#0000FF' : '#FFDD00'}
//           strokeWidth="2.5"
//           strokeDasharray="10"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//         />
//         <circle cx="20" cy="140" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
//         <circle cx="280" cy="60" r="5" fill={isLightMode ? '#0000FF' : '#FFDD00'} />
//       </svg>
//     </div>
//   );
// };

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [currentLang, setCurrentLang] = useState('en'); // Default language set to English

//   const t = translations[currentLang];

//   return (
//     <div className={`flex flex-col min-h-screen transition-colors duration-300 relative ${isLightMode ? "bg-gray-100" : "bg-[#0A0F1F]"}`}>
//       {/* Background elements */}
//       {!isLightMode && (
//         <>
//           <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${darkMapBg})` }}></div>
//           <MissionPathAnimation isLightMode={isLightMode} />
//         </>
//       )}
//       {isLightMode && (
//         <>
//           <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${lightMapBg})` }}></div>
//           <MissionPathAnimation isLightMode={isLightMode} />
//         </>
//       )}

//       {/* Navigation Menu */}
//       <div className="absolute top-2 left-125 right-0 flex items-center p-4 z-30 text-xl">
//         <div className="flex space-x-10">
//           <button
//             className={`font-medium transition-all duration-300 
//               ${isLightMode 
//                 ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
//                 : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
//             }`}
//             onClick={() => navigate("/how")}
//           >
//             {t.howItWorks}
//           </button>
//           <button
//             className={`font-medium transition-all duration-300 
//               ${isLightMode 
//                 ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
//                 : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
//             }`}
//             onClick={() => navigate("/file")}
//           >
//             {t.fileReport}
//           </button>
//           <button
//             className={`font-medium transition-all duration-300 
//               ${isLightMode 
//                 ? 'text-black hover:text-lg hover:underline hover:underline-offset-4 hover:text-blue-400 hover:scale-105 hover:shadow-lg' 
//                 : 'text-white hover:text-lg hover:underline hover:underline-offset-4 hover:text-yellow-300 hover:scale-105 hover:shadow-lg'
//             }`}
//             onClick={() => navigate("/aboutus")}
//           >
//             {t.aboutUs}
//           </button>
//         </div>
//       </div>

//       {/* Logo */}
//       <div className={`absolute top-5 left-7 text-3xl font-extrabold transition-all z-30 ${isLightMode ? "text-gray-900" : "text-[#EAEAEA]"}`}>
//         {t.title}
//       </div>

//       {/* User Controls */}
//       <div className="absolute top-4 right-4 flex items-center space-x-4 z-30">
       
       
//         <button
//           onClick={() => navigate("/accounts")}
//           className={`p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 
//             ${isLightMode ? 'bg-[#D8B4FE] hover:bg-[#C084FC]' : 'bg-purple-800 hover:bg-purple-900'}`}
//         >
//           <img src={profileIcon} alt='profile' className="w-full h-full object-cover rounded-full" />
//         </button>
//         <button
//           className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isLightMode ? "bg-[#D8B4FE]" : "bg-[#7C3AED]"}`}
//           onClick={() => setIsLightMode(!isLightMode)}
//         >
//           <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isLightMode ? "translate-x-6" : "translate-x-0"}`}></div>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className={`flex-1 flex flex-col items-center justify-center text-center px-6 ${isLightMode ? "bg-gray-100" : "bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A]"}`}>
//         <h1 className={`text-5xl font-bold transition-all z-20 ${isLightMode ? "text-gray-900" : "text-gray-300"}`}>
//           {t.title}
//         </h1>
//         <p className={`mt-3 text-xl transition-all z-20 ${isLightMode ? "text-gray-700" : "text-gray-400"}`}>
//           {t.mission}
//         </p>
        
//         <button
//           className={`mt-6 px-20 py-2 text-sm font-semibold rounded-md transition-all z-20
//             ${isLightMode
//               ? "bg-[#6EE7B7] text-black hover:bg-[#34D399]"
//               : "bg-gradient-to-b from-[#00FFC6] to-[#008F5F] text-white hover:from-[#66FFA9] hover:to-[#006B4F] shadow-lg shadow-cyan-500/15"
//             }`}
//           onClick={() => navigate("/map")}
//         >
//           {t.getDirections}
//         </button>
//       </div>

//       {/* Safety Tips Component */}
//       <SafetyTipsPopup isLightMode={isLightMode} currentLang={currentLang} />

//       {/* Footer */}
//       <footer className={`w-full text-center py-3 mt-5 z-60 ${isLightMode ? "bg-gray-200 text-gray-800" : "bg-[#1C1C1C] text-gray-400"}`}>
//   <div className="flex justify-center items-center space-x-4">
//     <p>{t.footer}</p>
//     <div className="flex space-x-2">
//       <button 
//         onClick={() => setCurrentLang('en')} 
//         className="text-gray-500 hover:underline hover:text-gray-700 transition">
//         English
//       </button>
//       <button 
//         onClick={() => setCurrentLang('hi')} 
//         className="text-gray-500 hover:underline hover:text-gray-700 transition">
//         हिंदी
//       </button>
//     </div>
//   </div>
// </footer>

//     </div>
//   );
// };

// export default LandingPage;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import darkMapBg from "./assets/darkmapbg.jpg";
import lightMapBg from "./lightmapbg.png";
import profileIcon from "./profileicon.png";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  en: {
    howItWorks: "How it Works",
    fileReport: "File a Report",
    aboutUs: "About Us",
    title: "SafeYatra",
    mission: "SafeYatra",
    missionSub:
      "Real-time safety insights, community reports, and smart routing — all in one place.",
    getDirections: "Explore the Map",
    footer: "Crafted by team Gradient Gang",
    safetyTip: "Safety Tip",
    english: "EN",
    hindi: "हि",
  },
  hi: {
    howItWorks: "यह कैसे काम करता है",
    fileReport: "रिपोर्ट दर्ज करें",
    aboutUs: "हमारे बारे में",
    title: "सेफयात्रा",
    mission: "विश्वास के साथ यात्रा करें।",
    missionSub: "रीयल-टाइम सुरक्षा जानकारी, समुदाय रिपोर्ट और स्मार्ट रूटिंग।",
    getDirections: "मानचित्र देखें",
    footer: "टीम ग्रेडिएंट गैंग द्वारा निर्मित",
    safetyTip: "सुरक्षा टिप",
    english: "EN",
    hindi: "हि",
  },
};

const safetyTips = {
  en: [
    "Stay aware of your surroundings while traveling",
    "Share your location with trusted contacts",
    "Keep emergency numbers saved offline",
    "Stick to well-lit and populated routes",
    "Trust your instincts — if something feels off, take a different path",
    "Plan your route ahead of time",
    "Keep your valuables secure and out of sight",
    "Stay in contact with friends or family during travel",
  ],
  hi: [
    "यात्रा करते समय आस-पास के वातावरण के प्रति सचेत रहें",
    "विश्वसनीय संपर्कों के साथ अपना स्थान साझा करें",
    "आपातकालीन नंबर ऑफ़लाइन सेव करें",
    "अच्छी रोशनी वाले मार्गों पर चलें",
    "अंतर्ज्ञान पर भरोसा करें — कुछ गलत लगे तो दूसरा रास्ता चुनें",
    "पहले से अपना रास्ता तय करें",
    "कीमती वस्तुओं को सुरक्षित रखें",
    "यात्रा के दौरान परिवार के संपर्क में रहें",
  ],
};

const ease = [0.25, 0.1, 0.25, 1];

/* ── Animated Route SVG ── */
const RouteAnimation = ({ light }) => {
  const stroke = light ? "#2563EB" : "#F59E0B";
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg
        style={{
          position: "absolute",
          left: "28%",
          top: "6%",
          width: "clamp(220px, 52vw, 660px)",
          height: "auto",
        }}
        viewBox="0 0 300 150"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.12}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.5,
            ease,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.3,
          }}
        />
        <motion.path
          d="M20,140 L80,100 L140,140 L200,100 L260,140 L280,60"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="8 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            ease,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.3,
            opacity: { duration: 0.4 },
          }}
        />
        <motion.circle
          cx="20"
          cy="140"
          r="4"
          fill={stroke}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.circle
          cx="20"
          cy="140"
          r="4"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          animate={{ r: [4, 10], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.circle
          cx="280"
          cy="60"
          r="4"
          fill={stroke}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{
            duration: 0.5,
            delay: 2.3,
            repeat: Infinity,
            repeatDelay: 2.8,
          }}
        />
        <motion.circle
          cx="280"
          cy="60"
          r="4"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          animate={{ r: [4, 11], opacity: [0.7, 0] }}
          transition={{
            duration: 1.6,
            delay: 2.4,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      </svg>
    </div>
  );
};

/* ── Profile Dropdown ── */
const ProfileMenu = ({ light, t, navigate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const panel = light
    ? "bg-white/96 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-black/12"
    : "bg-[#0e1420]/96 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60";

  const itemBase =
    "w-full text-left px-3 py-2.5 text-sm font-medium transition-all duration-150 flex items-center gap-3 rounded-xl";
  const itemCls = light
    ? `${itemBase} text-gray-700 hover:bg-gray-50`
    : `${itemBase} text-gray-300 hover:bg-white/6`;
  const divider = light ? "border-gray-100" : "border-white/8";

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className={`w-9 h-9 rounded-full overflow-hidden transition-all duration-200 ${
          open
            ? `ring-2 ${light ? "ring-gray-900 ring-offset-1" : "ring-white ring-offset-1 ring-offset-transparent"}`
            : `ring-2 ${light ? "ring-gray-200 hover:ring-gray-400" : "ring-white/20 hover:ring-white/50"}`
        }`}
      >
        <img
          src={profileIcon}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ duration: 0.18, ease }}
            className={`absolute right-0 top-full mt-3 w-56 rounded-2xl p-2 ${panel}`}
          >
            {/* Account header */}
            <div
              className={`flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl ${light ? "bg-gray-50" : "bg-white/5"}`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                <img
                  src={profileIcon}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${light ? "text-gray-900" : "text-white"}`}
                >
                  My Account
                </p>
                <p
                  className={`text-xs truncate ${light ? "text-gray-400" : "text-gray-500"}`}
                >
                  View profile
                </p>
              </div>
            </div>

            <button
              className={itemCls}
              onClick={() => {
                navigate("/accounts");
                setOpen(false);
              }}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${light ? "bg-gray-100" : "bg-white/8"}`}
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <circle
                    cx="7.5"
                    cy="5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M2 13c0-2.8 2.46-5 5.5-5s5.5 2.2 5.5 5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Profile
            </button>

            <button
              className={itemCls}
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${light ? "bg-gray-100" : "bg-white/8"}`}
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.9 2.9l1.1 1.1M11 11l1.1 1.1M2.9 12.1L4 11M11 4l1.1-1.1"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Settings
            </button>

            <div className={`my-1.5 border-t ${divider}`} />

            <button
              className={`${itemBase} text-sm font-medium transition-all duration-150 ${light ? "text-red-500 hover:bg-red-50" : "text-red-400 hover:bg-red-900/20"}`}
              onClick={() => setOpen(false)}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${light ? "bg-red-50" : "bg-red-900/20"}`}
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M5 2H2v11h3M10 4l3.5 3.5L10 11M5.5 7.5h8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Mobile Menu (no Login/SignUp) ── */
const MobileMenu = ({ light, t, navigate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const panel = light
    ? "bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-black/10"
    : "bg-gray-950/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50";
  const itemCls = light
    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    : "text-gray-300 hover:text-white hover:bg-white/5";

  return (
    <div ref={ref} className="relative md:hidden z-50">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className={`w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-xl transition-all duration-200 ${light ? "hover:bg-black/5" : "hover:bg-white/10"}`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={
              open
                ? i === 1
                  ? { opacity: 0, scaleX: 0 }
                  : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 7 : -7 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
            className={`block w-[18px] h-[1.5px] rounded-full origin-center ${light ? "bg-gray-800" : "bg-white"}`}
          />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease }}
            className={`absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden ${panel}`}
          >
            <div className="py-2">
              {/* Nav links only — no Login / Sign Up */}
              {[
                { l: t.howItWorks, p: "/how" },
                { l: t.fileReport, p: "/file" },
                { l: t.aboutUs, p: "/aboutus" },
              ].map(({ l, p }, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    navigate(p);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-all duration-150 ${itemCls}`}
                >
                  {l}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Safety Tip Card ── */
const SafetyTip = ({ light, lang }) => {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const tips = safetyTips[lang];
  const t = translations[lang];

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % tips.length), 4500);
    return () => clearInterval(id);
  }, [lang, tips.length]);

  if (!visible) return null;

  const card = light
    ? "bg-white/90 backdrop-blur-xl border border-black/8 shadow-xl shadow-black/10 text-gray-800"
    : "bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40 text-white";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease }}
      className={`fixed bottom-14 left-3 right-3 sm:left-5 sm:right-auto sm:w-60 rounded-2xl p-3.5 z-50 ${card}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${light ? "bg-blue-500" : "bg-amber-400"}`}
          />
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${light ? "text-blue-600" : "text-amber-400"}`}
          >
            {t.safetyTip}
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${light ? "hover:bg-black/8 text-gray-400" : "hover:bg-white/10 text-gray-500"}`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M8 2L2 8M2 2l6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="relative min-h-[2.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${lang}-${idx}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className={`text-xs leading-relaxed ${light ? "text-gray-600" : "text-gray-300"}`}
          >
            {tips[idx]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1 mt-2.5">
        {tips.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === idx ? 14 : 4,
              opacity: i === idx ? 1 : 0.3,
            }}
            transition={{ duration: 0.35 }}
            className={`h-1 rounded-full ${light ? "bg-blue-500" : "bg-amber-400"}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const stats = [
  { value: "2M+", label: "Travelers Protected" },
  { value: "50K+", label: "Safety Reports" },
  { value: "120+", label: "Cities Covered" },
];

/* ── Main Component ── */
const LandingPageAuth = () => {
  const navigate = useNavigate();
  const [light, setLight] = useState(false);
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    setMounted(true);
  }, []);

  const bg = light ? "bg-gray-50" : "bg-[#080C14]";
  const navBg = light
    ? "bg-white/80 backdrop-blur-xl border-b border-black/8"
    : "bg-transparent";
  const logoColor = light ? "text-gray-900" : "text-white";
  const navLink = light
    ? "text-gray-600 hover:text-gray-900"
    : "text-gray-400 hover:text-white";
  const heroTitle = light ? "text-gray-900" : "text-white";
  const heroSub = light ? "text-gray-500" : "text-gray-400";

  const primaryBtn = light
    ? "bg-gray-900 text-white hover:bg-gray-700 shadow-lg shadow-gray-900/20"
    : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10";

  const toggleBg = light ? "bg-gray-200" : "bg-white/15";

  const statCard = light
    ? "bg-white/80 border border-gray-100 shadow-sm"
    : "bg-white/5 border border-white/8";

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <div
      className={`relative flex flex-col font-sans transition-colors duration-500 ${bg}`}
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      {/* ── Background ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={light ? "l" : "d"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${light ? lightMapBg : darkMapBg})` }}
        />
      </AnimatePresence>
      {!light && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080C14]/70 via-[#080C14]/40 to-[#080C14]/90 pointer-events-none" />
      )}
      {light && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-transparent to-white/60 pointer-events-none" />
      )}

      <RouteAnimation light={light} />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className={`relative z-40 w-full flex-shrink-0 ${navBg} transition-all duration-300`}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14
    flex items-center justify-between
    md:grid md:grid-cols-3 md:items-center"
        >
          {/* LEFT: Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${light ? "bg-gray-900" : "bg-white/15 border border-white/20"}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L2 3v4c0 3 2.5 5 5 6 2.5-1 5-3 5-6V3L7 1z"
                  fill="white"
                />
              </svg>
            </div>
            <span className={`text-lg font-bold tracking-tight ${logoColor}`}>
              {t.title}
            </span>
          </motion.div>

          {/* CENTRE: Nav links — desktop only */}
          <div className="hidden md:flex items-center justify-center gap-7">
            {[
              { l: t.howItWorks, p: "/how" },
              { l: t.fileReport, p: "/file" },
              { l: t.aboutUs, p: "/aboutus" },
            ].map(({ l, p }) => (
              <motion.button
                key={p}
                whileHover={{ y: -1 }}
                onClick={() => navigate(p)}
                className={`text-sm font-medium transition-all duration-200 whitespace-nowrap ${navLink}`}
              >
                {l}
              </motion.button>
            ))}
          </div>

          {/* RIGHT: Controls — NO Login/SignUp pill */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Theme toggle */}
            <button
              onClick={() => setLight(!light)}
              aria-label="Toggle theme"
              className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors duration-300 ${toggleBg}`}
            >
              <motion.div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full ${light ? "bg-gray-900" : "bg-white"}`}
                animate={{ x: light ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            </button>

            {/* Profile — desktop dropdown */}
            <div className="hidden md:block">
              <ProfileMenu light={light} t={t} navigate={navigate} />
            </div>

            {/* Mobile: profile icon + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/accounts")}
                className={`w-8 h-8 rounded-full overflow-hidden ring-2 transition-all duration-200 ${light ? "ring-gray-200 hover:ring-gray-400" : "ring-white/20 hover:ring-white/50"}`}
              >
                <img
                  src={profileIcon}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </motion.button>
              <MobileMenu light={light} t={t} navigate={navigate} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 min-h-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="w-full max-w-3xl mx-auto"
        >
          <motion.div variants={item} className="flex justify-center mb-4">
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border ${
                light
                  ? "bg-white/80 border-gray-200 text-gray-600"
                  : "bg-white/8 border-white/15 text-gray-300"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${light ? "bg-emerald-500" : "bg-emerald-400"}`}
              />
              Live Safety Data Active
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-3 ${heroTitle}`}
          >
            {t.mission}
          </motion.h1>

          <motion.p
            variants={item}
            className={`text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-7 ${heroSub}`}
          >
            {t.missionSub}
          </motion.p>

          <motion.div
            variants={item}
            className="flex justify-center items-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/map")}
              className={`h-11 px-7 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${primaryBtn}`}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  fill="currentColor"
                />
              </svg>
              {t.getDirections}
            </motion.button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-3 max-w-sm mx-auto"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className={`rounded-xl p-3 text-center transition-colors duration-300 ${statCard}`}
              >
                <div
                  className={`text-lg sm:text-xl font-bold tracking-tight ${heroTitle}`}
                >
                  {value}
                </div>
                <div className={`text-xs mt-0.5 leading-tight ${heroSub}`}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <AnimatePresence>
        <SafetyTip light={light} lang={lang} />
      </AnimatePresence>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={`relative z-30 w-full flex-shrink-0 py-2.5 px-4 transition-all duration-300 ${
          light
            ? "bg-white/80 backdrop-blur-xl border-t border-black/8"
            : "bg-[#080C14]/80 backdrop-blur-xl border-t border-white/8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          {/* Left: credit */}
          <p className={light ? "text-gray-400" : "text-gray-500"}>
            {t.footer}
          </p>

          {/* Centre: language toggle */}
          <div
            className={`flex items-center gap-0.5 rounded-lg p-1 font-semibold ${light ? "bg-gray-100" : "bg-white/8 border border-white/10"}`}
          >
            {["en", "hi"].map((l) => (
              <motion.button
                key={l}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 ${
                  lang === l
                    ? light
                      ? "bg-white text-gray-900 shadow-sm"
                      : "bg-white/20 text-white"
                    : light
                      ? "text-gray-500 hover:text-gray-700"
                      : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {l === "en" ? "EN" : "हि"}
              </motion.button>
            ))}
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <button
                key={link}
                className={`transition-colors duration-200 ${light ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"}`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPageAuth;