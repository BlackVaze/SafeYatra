// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster

import LandingPage from "./LandingPage";
import LandingPage2 from "./LandingPage2";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Map from "./Map";
import FileReport from "./FileReport";
import Seereportt from "./Seereport";
import Accounts from "./Accounts";
import HowItWorks from "./HowitWorks";
import AboutUs from "./AboutUs";
import BotpressChat from "./components/botpressChat";
import LocationForm from "./LocationForm"; // Import the new LocationForm component

function App() {
  return (
    <Router>
      {/* Global Botpress Chat */}
      <BotpressChat />

      {/* Global Toaster */}
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "16px",
          },
        }}
      /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000, // 4 seconds
          style: {
            fontSize: "16px",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e", // green
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444", // red
              color: "#fff",
            },
          },
          // info or neutral can use default gray if needed
        }}
      />


      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage2" element={<LandingPage2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/file" element={<FileReport />} />
        <Route path="/report" element={<Seereportt />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/location" element={<LocationForm />} /> {/* New Route for Location Form */}
      </Routes>
    </Router>
  );
}

export default App;
