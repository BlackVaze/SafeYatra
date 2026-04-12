import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      fill="url(#shieldGrad)"
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="shieldGrad"
        x1="3"
        y1="2"
        x2="21"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

const FloatingDot = ({ style }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(16,185,129,0.15)",
      animation: "floatDot 6s ease-in-out infinite",
      ...style,
    }}
  />
);

export default function LoginForm() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/api/auth/login", input);
      if (res.data.success) {
        setInput({ email: "", password: "" });
        navigate("/LandingPage2");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-page {
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
          max-width: 420px;
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
          margin-bottom: 32px;
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
          animation: pulse-ring 2s ease-out infinite;
        }

        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .subheading {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .field-wrap {
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .input-wrap {
          position: relative;
        }

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

        .field-input.has-right-btn { padding-right: 42px; }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 16px;
        }

        .forgot-link {
          font-size: 13px;
          color: #3b82f6;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .forgot-link:hover { color: #60a5fa; }

        .error-box {
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
          position: relative;
          overflow: hidden;
          margin-top: 8px;
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
          margin: 24px 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 12px;
          color: #334155;
          font-weight: 500;
        }

        .signup-row {
          text-align: center;
          font-size: 14px;
          color: #475569;
        }
        .signup-link {
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
        .signup-link:hover { color: #60a5fa; }

        .trust-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #334155;
          font-weight: 500;
        }
      `}</style>

      <div className="login-page">
        {/* Background */}
        <div className="grid-bg" />
        <div
          className="glow-orb"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            top: -100,
            left: -100,
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            bottom: -50,
            right: -50,
          }}
        />
        <FloatingDot
          style={{
            width: 8,
            height: 8,
            top: "20%",
            left: "15%",
            animationDelay: "0s",
          }}
        />
        <FloatingDot
          style={{
            width: 5,
            height: 5,
            top: "60%",
            left: "8%",
            animationDelay: "1.5s",
          }}
        />
        <FloatingDot
          style={{
            width: 6,
            height: 6,
            top: "35%",
            right: "12%",
            animationDelay: "3s",
          }}
        />
        <FloatingDot
          style={{
            width: 4,
            height: 4,
            bottom: "25%",
            right: "20%",
            animationDelay: "0.8s",
          }}
        />

        <div className="card">
          <div className="card-inner">
            {/* Logo */}
            <div className="logo-row">
              <ShieldIcon />
              <span className="logo-text">SafeYatra</span>
              <div className="logo-dot" />
            </div>

            <h1 className="heading">Welcome back</h1>
            <p className="subheading">
              Sign in to continue keeping your journey safe
            </p>

            {error && (
              <div className="error-box">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={loginHandler}>
              {/* Email */}
              <div className="field-wrap">
                <label className="field-label">Email address</label>
                <div className="input-wrap">
                  <span
                    className={`input-icon ${focused === "email" ? "active" : ""}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                  </span>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={input.email}
                    onChange={handleInput}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <span
                    className={`input-icon ${focused === "password" ? "active" : ""}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    className="field-input has-right-btn"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={input.password}
                    onChange={handleInput}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="forgot-row">
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner" /> Signing in…
                  </>
                ) : (
                  <>
                    Sign In{" "}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">New to SafeYatra?</span>
              <div className="divider-line" />
            </div>

            <div className="signup-row">
              <button
                className="signup-link"
                onClick={() => navigate("/signup")}
              >
                Create a free account →
              </button>
            </div>

            {/* Trust badges */}
            <div className="trust-badges">
              <div className="badge">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure login
              </div>
              <div className="badge">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                256-bit encrypted
              </div>
              <div className="badge">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Privacy first
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
