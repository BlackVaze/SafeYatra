import React, { useState } from 'react';
import Toast from "./toast"

const HelpButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const sendMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to:phoneNumber,
          message: "I am in trouble. SEND HELP!"
        }),
      });
      const data = await response.json();
      if (data.success) {
        // alert("Message sent successfully!");
        Toast.success("Message sent successfully!");
        setShowDialog(false);
      } else {
        // alert("Error sending message: " + data.error);
        Toast.error("Error sending message: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("An error occurred while sending the message.");
      Toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDialog(true)}
        className={`relative w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent 
        ${!darkMode ? "border-b-red-600 text-white" : "border-b-[#FFFF00] text-black"} animate-pulse z-20 mb-35`}
      >
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
          <b>!</b>
        </span>
      </button>

      {showDialog && (
        <div className="absolute bottom-0 mb-[-5] right-6  p-4 bg-white rounded shadow-lg z-30">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={sendMessage}
              className="w-38 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Ask for Help
            </button>
            <button
              onClick={() => setShowDialog(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpButton;