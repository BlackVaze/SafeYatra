// import React, { useState, useRef, useEffect } from "react";
// import Toast from "./toast";

// const HelpButton = () => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const panelRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (panelRef.current && !panelRef.current.contains(e.target)) {
//         setShowDialog(false);
//       }
//     };
//     if (showDialog) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showDialog]);

//   const sendMessage = async () => {
//     if (!phoneNumber.trim()) {
//       Toast.error("Please enter a phone number.");
//       return;
//     }
//     setIsSending(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/send-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           to: phoneNumber,
//           message: "I am in trouble. SEND HELP!",
//         }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         Toast.success("Message sent successfully!");
//         setShowDialog(false);
//         setPhoneNumber("");
//       } else {
//         Toast.error("Error sending message: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Toast.error("An error occurred while sending the message.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="relative inline-flex flex-col items-center" ref={panelRef}>
//       {/* Popup Panel */}
//       <div
//         className={`
//           absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[320px]
//           bg-white dark:bg-zinc-900 rounded-2xl shadow-xl
//           border border-zinc-200 dark:border-zinc-700
//           p-5 z-30
//           transition-all duration-200 origin-bottom
//           ${showDialog
//             ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
//             : "opacity-0 scale-95 translate-y-2 pointer-events-none"
//           }
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
//           <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
//             <svg className="w-[18px] h-[18px] text-red-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//               <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
//               <line x1="12" y1="9" x2="12" y2="13"/>
//               <line x1="12" y1="17" x2="12.01" y2="17"/>
//             </svg>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-zinc-900 dark:text-white">Request Emergency Help</p>
//             <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">A distress message will be sent immediately</p>
//           </div>
//           <button
//             onClick={() => setShowDialog(false)}
//             className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//             aria-label="Close"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
//               <line x1="18" y1="6" x2="6" y2="18"/>
//               <line x1="6" y1="6" x2="18" y2="18"/>
//             </svg>
//           </button>
//         </div>

//         {/* Phone input */}
//         <div className="mb-3">
//           <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
//             Recipient phone number
//           </label>
//           <input
//             type="tel"
//             placeholder="+1 (555) 000-0000"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             className="
//               w-full px-3 py-2.5 text-sm rounded-xl
//               bg-zinc-50 dark:bg-zinc-800
//               border border-zinc-200 dark:border-zinc-700
//               text-zinc-900 dark:text-white
//               placeholder-zinc-400 dark:placeholder-zinc-600
//               focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-400
//               transition
//             "
//           />
//         </div>

//         {/* Message preview */}
//         <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 mb-4">
//           <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//           </svg>
//           <span className="text-xs text-red-700 dark:text-red-300 font-medium">"I am in trouble. SEND HELP!"</span>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             onClick={sendMessage}
//             disabled={isSending}
//             className="
//               flex-1 flex items-center justify-center gap-2
//               bg-red-600 hover:bg-red-700 active:scale-[0.98]
//               disabled:opacity-60 disabled:cursor-not-allowed
//               text-white text-sm font-semibold
//               px-4 py-2.5 rounded-xl transition-all duration-150
//             "
//           >
//             {isSending ? (
//               <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
//               </svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//                 <line x1="22" y1="2" x2="11" y2="13"/>
//                 <polygon points="22 2 15 22 11 13 2 9 22 2"/>
//               </svg>
//             )}
//             {isSending ? "Sending…" : "Send SOS"}
//           </button>
//           <button
//             onClick={() => setShowDialog(false)}
//             className="
//               px-4 py-2.5 rounded-xl text-sm font-medium
//               text-zinc-600 dark:text-zinc-300
//               border border-zinc-200 dark:border-zinc-700
//               hover:bg-zinc-100 dark:hover:bg-zinc-800
//               transition-colors
//             "
//           >
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* FAB */}
//       <div className="relative flex flex-col items-center">
//         <span className="text-[10px] font-semibold tracking-widest text-zinc-400 mb-2 uppercase">SOS</span>
//         <button
//           onClick={() => setShowDialog((v) => !v)}
//           aria-label="Request emergency help"
//           className="
//             w-16 h-16 rounded-full
//             bg-red-600 hover:bg-red-700
//             flex items-center justify-center
//             shadow-lg shadow-red-500/30
//             animate-pulse-ring
//             transition-all duration-150 hover:scale-105 active:scale-95
//           "
//         >
//           <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
//             <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
//             <line x1="12" y1="9" x2="12" y2="13"/>
//             <line x1="12" y1="17" x2="12.01" y2="17"/>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HelpButton;
import React, { useState, useRef, useEffect } from "react";
import Toast from "./toast";

const HelpButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [panelBottom, setPanelBottom] = useState(0);
  const fabRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (showDialog && fabRef.current) {
      const rect = fabRef.current.getBoundingClientRect();
      setPanelBottom(window.innerHeight - rect.top + 12);
    }
  }, [showDialog]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        fabRef.current &&
        !fabRef.current.contains(e.target)
      ) {
        setShowDialog(false);
      }
    };
    if (showDialog) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDialog]);

  const sendMessage = async () => {
    if (!phoneNumber.trim()) {
      Toast.error("Please enter a phone number.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phoneNumber,
          message: "I am in trouble. SEND HELP!",
        }),
      });
      const data = await response.json();
      if (data.success) {
        Toast.success("Message sent successfully!");
        setShowDialog(false);
        setPhoneNumber("");
      } else {
        Toast.error("Error sending message: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.error("An error occurred while sending the message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Panel — fixed to viewport */}
      <div
        ref={panelRef}
        className={`
          fixed right-3 sm:right-4 z-50
          w-[min(320px,calc(100vw-1.5rem))]
          bg-white dark:bg-zinc-900 rounded-2xl shadow-xl
          border border-zinc-200 dark:border-zinc-700
          p-5
          transition-all duration-200 origin-bottom
          ${showDialog
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        style={{ bottom: panelBottom }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg
              className="w-[18px] h-[18px] text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Request Emergency Help
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              A distress message will be sent immediately
            </p>
          </div>
          <button
            onClick={() => setShowDialog(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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

        {/* Phone input */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Recipient phone number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="
              w-full px-3 py-2.5 text-sm rounded-xl
              bg-zinc-50 dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              text-zinc-900 dark:text-white
              placeholder-zinc-400 dark:placeholder-zinc-600
              focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-400
              transition
            "
          />
        </div>

        {/* Message preview */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 mb-4">
          <svg
            className="w-3.5 h-3.5 text-red-500 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-xs text-red-700 dark:text-red-300 font-medium">
            "I am in trouble. SEND HELP!"
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={sendMessage}
            disabled={isSending}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-red-600 hover:bg-red-700 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white text-sm font-semibold
              px-4 py-2.5 rounded-xl transition-all duration-150
            "
          >
            {isSending ? (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
            {isSending ? "Sending…" : "Send SOS"}
          </button>
          <button
            onClick={() => setShowDialog(false)}
            className="
              px-4 py-2.5 rounded-xl text-sm font-medium
              text-zinc-600 dark:text-zinc-300
              border border-zinc-200 dark:border-zinc-700
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-colors
            "
          >
            Cancel
          </button>
        </div>
      </div>

      {/* FAB */}
      <div ref={fabRef} className="relative flex flex-col items-center">
        <span className="text-[10px] font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
          SOS
        </span>
        <button
          onClick={() => setShowDialog((v) => !v)}
          aria-label="Request emergency help"
          className="
            w-14 h-14 sm:w-16 sm:h-16 rounded-full
            bg-red-600 hover:bg-red-700
            flex items-center justify-center
            shadow-lg shadow-red-500/30
            transition-all duration-150 hover:scale-105 active:scale-95
          "
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HelpButton;