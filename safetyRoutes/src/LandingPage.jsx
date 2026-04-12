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
    login: "Login",
    signUp: "Sign Up",
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
    login: "लॉग इन",
    signUp: "साइन अप",
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


/* ── Mobile Menu ── */
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
  const divider = light ? "border-gray-100" : "border-white/10";

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
              <div className={`mx-4 my-2 border-t ${divider}`} />
              {[
                { l: t.login, p: "/login" },
                { l: t.signUp, p: "/signup" },
              ].map(({ l, p }, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
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
const LandingPage = () => {
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
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease } },
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
      <nav
        className={`fixed top-0 left-0 right-0 z-40 w-full flex-shrink-0 ${navBg} transition-all duration-300`}
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
            <span
              style={{
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-.5px",
                color: light ? "#0f172a" : "#e8f4f0",
              }}
            >
              Safe<span style={{ color: "#10b981" }}>Yatra</span>
            </span>
          </motion.div>


          {/* RIGHT: Controls */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Auth pill — desktop only */}
            <div
              className={`hidden md:flex items-center rounded-xl p-1 gap-1 ${light ? "bg-black/5" : "bg-white/8 border border-white/10"}`}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                className={`h-7 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  light
                    ? "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.login}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className={`h-7 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  light ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
              >
                {t.signUp}
              </motion.button>
            </div>

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
      </nav>

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

export default LandingPage;
