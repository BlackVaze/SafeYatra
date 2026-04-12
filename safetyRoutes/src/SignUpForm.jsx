// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from "./api/axios";

// const SignUpForm = () => {
//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLightMode, setIsLightMode] = useState(true);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) {
//       newErrors.username = 'Full name is required';
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }
//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     if (!formData.username || !formData.email || !formData.password) {
//       console.log("missing fields")
//       return;
//     }
//     try {
//       const res = await API.post('/api/auth/register', {
//         username: formData.username,
//          email: formData.email,
//           password: formData.password
//       });
//       navigate('/login');

//     } catch (error) {
//       console.error('Submission error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }


//   return (
//     <div className="relative">
//       <form onSubmit={handleSubmit} className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg mx-auto">
//         <div
//           className={`fixed top-5 left-7 text-3xl font-extrabold transition-all z-30
//           ${"text-[#EAEAEA] drop-shadow-[0_0_2px_rgba(255,255,255,0.09)]"}`}
//         >
//           SafeYatra
//         </div>

//         <h1 className="text-2xl font-bold text-white text-center">Create an account</h1>
//         <p className="text-gray-400 text-center mb-6">Join us by signing up</p>

//         {/* Name Field */}
//         <div className="flex flex-col mb-3">
//           <label className="text-white mb-1">Full Name</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your name"
//             value={formData.username}
//             onChange={handleChange}
//             className="p-2 w-93 rounded-md bg-black text-white border border-gray-600 outline-none"
//           />
//           {errors.fullName && (
//             <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
//           )}
//         </div>

//         {/* Email Field */}
//         <div className="flex flex-col mb-3">
//           <label className="text-white mb-1">Email address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
//           />
//           {errors.email && (
//             <span className="text-red-500 text-sm mt-1">{errors.email}</span>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="flex flex-col mb-3">
//           <label className="text-white mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//             className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
//           />
//           {errors.password && (
//             <span className="text-red-500 text-sm mt-1">{errors.password}</span>
//           )}
//         </div>

//         {/* Sign Up Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Processing...' : 'Sign Up'}
//         </button>

//         {/* Already have an account? */}
//         <p className="text-gray-400 text-sm text-center mt-4">
//           Already have an account? <a onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer">Log In</a>
//         </p>
//       </form>

//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      fill="url(#shieldGrad2)"
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="shieldGrad2" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

const FloatingDot = ({ style }) => (
  <div style={{
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(16,185,129,0.15)",
    animation: "floatDot 6s ease-in-out infinite",
    ...style,
  }} />
);

const StrengthBar = ({ password }) => {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 4,
            background: i <= strength ? colors[strength] : "rgba(255,255,255,0.08)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <p style={{ fontSize: 11, color: colors[strength], fontWeight: 600 }}>
        {labels[strength]}
      </p>
    </div>
  );
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");
  const [serverError, setServerError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.password.trim()) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await API.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }

        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-ring2 {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        .signup-page {
          min-height: 100vh;
          width: 100%;
          background: #060910;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .card-inner {
          background: rgba(13, 18, 30, 0.9);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 24px;
          padding: 40px 36px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(16,185,129,0.05);
        }

        @media (max-width: 480px) {
          .card-inner { padding: 28px 20px; }
        }

        .logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          margin-left: 1px;
          box-shadow: 0 0 8px #3b82f6;
          animation: pulse-ring2 2s ease-out infinite;
        }

        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .subheading {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 28px;
          font-weight: 400;
        }

        .field-wrap { margin-bottom: 14px; }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 7px;
        }

        .input-wrap { position: relative; }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .input-icon.active { color: #3b82f6; }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 14px 13px 42px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #f1f5f9;
          outline: none;
          transition: all 0.2s;
        }
        .field-input::placeholder { color: #334155; }
        .field-input:focus {
          border-color: rgba(16,185,129,0.5);
          background: rgba(16,185,129,0.05);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .field-input.has-error {
          border-color: rgba(239,68,68,0.4);
          background: rgba(239,68,68,0.04);
        }
        .field-input.has-right-btn { padding-right: 42px; }

        .error-text {
          font-size: 12px;
          color: #f87171;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .server-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #fca5a5;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pass-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          padding: 0;
          display: flex;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: #94a3b8; }

        .perks {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .perk {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #475569;
          font-weight: 500;
        }
        .perk-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(34,197,94,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(16,185,129,0.3);
          margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.4);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 12px; color: #334155; font-weight: 500; }

        .login-row { text-align: center; font-size: 14px; color: #475569; }
        .login-link {
          color: #3b82f6;
          cursor: pointer;
          font-weight: 600;
          background: none;
          border: none;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
          padding: 0;
        }
        .login-link:hover { color: #60a5fa; }

        .terms {
          text-align: center;
          font-size: 11px;
          color: #334155;
          margin-top: 16px;
          line-height: 1.5;
        }
        .terms a { color: #475569; text-decoration: underline; cursor: pointer; }
      `}</style>

      <div className="signup-page">
        <div className="grid-bg" />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", top: -100, right: -100 }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", bottom: -50, left: -50 }} />
        <FloatingDot style={{ width: 8, height: 8, top: "15%", right: "15%", animationDelay: "0s" }} />
        <FloatingDot style={{ width: 5, height: 5, top: "65%", right: "8%", animationDelay: "2s" }} />
        <FloatingDot style={{ width: 6, height: 6, top: "40%", left: "10%", animationDelay: "1s" }} />
        <FloatingDot style={{ width: 4, height: 4, bottom: "20%", left: "18%", animationDelay: "3.5s" }} />

        <div className="card">
          <div className="card-inner">
            {/* Logo */}
            <div className="logo-row">
              <ShieldIcon />
              <span className="logo-text">SafeYatra</span>
              <div className="logo-dot" />
            </div>

            <h1 className="heading">Create your account</h1>
            <p className="subheading">Join thousands traveling safer every day</p>

            {/* Perks */}
            <div className="perks">
              {["SOS alerts", "Safe routing", "Community reports"].map(p => (
                <div className="perk" key={p}>
                  <div className="perk-dot">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  {p}
                </div>
              ))}
            </div>

            {serverError && (
              <div className="server-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="field-wrap">
                <label className="field-label">Full Name</label>
                <div className="input-wrap">
                  <span className={`input-icon ${focused === "username" ? "active" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </span>
                  <input
                    className={`field-input ${errors.username ? "has-error" : ""}`}
                    type="text"
                    name="username"
                    placeholder="Your full name"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocused("username")}
                    onBlur={() => setFocused("")}
                    autoComplete="name"
                  />
                </div>
                {errors.username && (
                  <p className="error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="field-wrap">
                <label className="field-label">Email address</label>
                <div className="input-wrap">
                  <span className={`input-icon ${focused === "email" ? "active" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/>
                    </svg>
                  </span>
                  <input
                    className={`field-input ${errors.email ? "has-error" : ""}`}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <span className={`input-icon ${focused === "password" ? "active" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    className={`field-input has-right-btn ${errors.password ? "has-error" : ""}`}
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    autoComplete="new-password"
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                <StrengthBar password={formData.password} />
                {errors.password && (
                  <p className="error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.password}
                  </p>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><div className="spinner" /> Creating account…</>
                ) : (
                  <>Create Account <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                )}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">Already have an account?</span>
              <div className="divider-line" />
            </div>

            <div className="login-row">
              <button className="login-link" onClick={() => navigate("/login")}>
                Sign in instead →
              </button>
            </div>

            <p className="terms">
              By signing up you agree to our <a>Terms of Service</a> and <a>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}