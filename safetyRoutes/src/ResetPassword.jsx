import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api/axios";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      fill="url(#shieldGradRP)"
    />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="shieldGradRP" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await API.post(`/api/auth/reset-password/${token}`, { password });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link.");
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
        .rp-page {
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
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .card {
          position: relative; z-index: 10;
          width: 100%; max-width: 420px;
          animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .card-inner {
          background: rgba(13,18,30,0.9);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 24px; padding: 40px 36px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5);
        }
        @media(max-width:480px) { .card-inner { padding: 28px 20px; } }
        .logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }
        .logo-text { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .heading { font-size: 26px; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px; margin-bottom: 6px; }
        .subheading { font-size: 14px; color: #64748b; margin-bottom: 28px; }
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
          padding: 13px 42px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #f1f5f9; outline: none; transition: all 0.2s;
        }
        .field-input::placeholder { color: #334155; }
        .field-input:focus {
          border-color: rgba(16,185,129,0.5);
          background: rgba(16,185,129,0.05);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .pass-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #475569; padding: 0; display: flex; transition: color 0.2s;
        }
        .pass-toggle:hover { color: #94a3b8; }
        .error-box {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: #fca5a5;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .success-box {
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 14px; padding: 24px; text-align: center;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #fff; border: none; border-radius: 12px;
          padding: 14px; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(59,130,246,0.3);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .login-btn {
          width: 100%; margin-top: 12px;
          background: none; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 13px;
          font-size: 14px; font-weight: 500;
          color: #64748b; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .login-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.15); }
      `}</style>

      <div className="rp-page">
        <div className="grid-bg" />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", top: -100, left: -100 }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", bottom: -50, right: -50 }} />

        <div className="card">
          <div className="card-inner">
            <div className="logo-row">
              <ShieldIcon />
              <span className="logo-text">SafeYatra</span>
            </div>

            {done ? (
              <div className="success-box">
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h2 style={{ color: "#10b981", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  Password reset!
                </h2>
                <p style={{ color: "#7fa898", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  Your password has been updated successfully.
                </p>
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Go to login →
                </button>
              </div>
            ) : (
              <>
                <h1 className="heading">Set new password</h1>
                <p className="subheading">Must be at least 6 characters.</p>

                {error && (
                  <div className="error-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* New password */}
                  <label className="field-label">New password</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoFocus
                    />
                    <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                      {showPass ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password && (
                    <div style={{ marginBottom: 16, marginTop: -8 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                        {[1,2,3,4,5].map(i => (
                          <div key={i} style={{
                            flex: 1, height: 3, borderRadius: 4,
                            background: i <= strength ? strengthColors[strength] : "rgba(255,255,255,0.08)",
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: strengthColors[strength], fontWeight: 600 }}>
                        {strengthLabels[strength]}
                      </p>
                    </div>
                  )}

                  {/* Confirm password */}
                  <label className="field-label">Confirm password</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      className="field-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <><div className="spinner" /> Resetting…</> : "Reset password →"}
                  </button>
                </form>

                <button className="login-btn" onClick={() => navigate("/login")}>
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