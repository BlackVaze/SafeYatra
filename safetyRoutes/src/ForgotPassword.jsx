import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/axios";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      fill="url(#shieldGradFP)"
    />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="shieldGradFP" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/api/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 0.7; }
        }
        .fp-page {
          min-height: 100vh;
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
          background: rgba(13,18,30,0.9);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 24px;
          padding: 40px 36px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5);
        }
        @media(max-width:480px) { .card-inner { padding: 28px 20px; } }
        .logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }
        .logo-text { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .heading { font-size: 26px; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px; margin-bottom: 6px; }
        .subheading { font-size: 14px; color: #64748b; margin-bottom: 28px; line-height: 1.6; }
        .field-label {
          display: block; font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #94a3b8; margin-bottom: 8px;
        }
        .input-wrap { position: relative; margin-bottom: 16px; }
        .input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); color: #475569;
          pointer-events: none; display: flex; align-items: center;
        }
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
        .success-box {
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 14px;
          padding: 24px;
          text-align: center;
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
          box-shadow: 0 4px 24px rgba(59,130,246,0.3);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .back-btn {
          width: 100%; margin-top: 14px;
          background: none; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 13px;
          font-size: 14px; font-weight: 500;
          color: #64748b; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .back-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.15); }
        .float-dot {
          position: absolute; border-radius: 50%;
          background: rgba(16,185,129,0.15);
          animation: floatDot 6s ease-in-out infinite;
        }
      `}</style>

      <div className="fp-page">
        <div className="grid-bg" />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", top: -100, left: -100 }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", bottom: -50, right: -50 }} />
        <div className="float-dot" style={{ width: 8, height: 8, top: "20%", left: "15%", animationDelay: "0s" }} />
        <div className="float-dot" style={{ width: 5, height: 5, top: "60%", right: "10%", animationDelay: "2s" }} />

        <div className="card">
          <div className="card-inner">
            <div className="logo-row">
              <ShieldIcon />
              <span className="logo-text">SafeYatra</span>
            </div>

            {sent ? (
              <div className="success-box">
                <div style={{ fontSize: 40, marginBottom: 16 }}>📧</div>
                <h2 style={{ color: "#10b981", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  Check your inbox
                </h2>
                <p style={{ color: "#7fa898", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  We've sent a password reset link to <strong style={{ color: "#e8f4f0" }}>{email}</strong>.
                  It expires in 1 hour.
                </p>
                <button className="back-btn" onClick={() => navigate("/login")}>
                  ← Back to login
                </button>
              </div>
            ) : (
              <>
                <h1 className="heading">Forgot password?</h1>
                <p className="subheading">
                  Enter your email and we'll send you a link to reset your password.
                </p>

                {error && (
                  <div className="error-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <label className="field-label">Email address</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <><div className="spinner" /> Sending…</> : "Send reset link →"}
                  </button>
                </form>

                <button className="back-btn" onClick={() => navigate("/login")}>
                  ← Back to login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}