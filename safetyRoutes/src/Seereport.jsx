// import React, { useState, useEffect } from 'react';
// import API from './api/axios';
// import { Link } from 'react-router-dom';

// const Seereport = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [reports, setReports] = useState([]); // State to hold fetched reports

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await API.get('/api/reports/all');
//         setReports(response.data);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header */}
//       <div className="flex justify-between items-center p-4">
//         {/* SafeYatra Logo */}
//         <Link
//           to="/LandingPage2"
//           className={`absolute top-5 left-7 text-3xl cursor-pointer font-extrabold z-30 ${darkMode ? 'text-white' : 'text-gray-800'
//             }`}
//         >
//           SafeYatra
//         </Link>

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="ml-290 w-14 h-7 relative rounded-full transition-colors duration-300 focus:outline-none"
//         >
//           <div
//             className={`absolute inset-0 rounded-full transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'
//               }`}
//           ></div>
//           <div
//             className={`absolute w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${darkMode ? 'translate-x-1' : 'translate-x-8'
//               } top-1`}
//           ></div>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-xl mx-auto mt-16 px-4">
//         <h2
//           className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'
//             }`}
//         >
//           PREVIOUS REPORTS
//         </h2>

//         {/* Reports List */}
//         <div className="space-y-6"> 
//   {reports.length > 0 ? (
//     reports.map((report) => (
//       <div
//         key={report._id}
//         className={`p-4 rounded-lg border transition-transform cursor-pointer duration-300 transform hover:scale-106 ${
//           darkMode
//             ? 'bg-gray-800 border-gray-600 text-white'
//             : 'bg-white border-gray-300 text-gray-900'
//         }`}
//       >
//         <p className="text-gray-300">Location: {report.location}</p>
//         <p className="text-gray-300">Time: {report.time}</p>
//         <p className="text-gray-300">Crime Type: {report.crime}</p>
//         <p className="text-gray-300">{report.description}</p>
//       </div>
//     ))
//   ) : (
//     <p
//       className={`text-center transition-colors duration-300 ${
//         darkMode ? 'text-gray-400' : 'text-gray-600'
//       }`}
//     >
//       No reports available.
//     </p>
//   )}
// </div>

//       </div>
//     </div>
//   );
// };

// export default Seereport;
import React, { useState, useEffect } from "react";
import API from "./api/axios";
import { Link } from "react-router-dom";

const G = "#10b981";

const CSS = `
  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  @keyframes shimmer { from{background-position:200% center} to{background-position:-200% center} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }

  *{box-sizing:border-box;margin:0;padding:0;}
  .sy{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}

  .fu {animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
  .fu1{animation:fadeUp .5s .06s cubic-bezier(.22,1,.36,1) both;}
  .fu2{animation:fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both;}
  .fu3{animation:fadeUp .5s .18s cubic-bezier(.22,1,.36,1) both;}
  .fu4{animation:fadeUp .5s .24s cubic-bezier(.22,1,.36,1) both;}
  .fu5{animation:fadeUp .5s .30s cubic-bezier(.22,1,.36,1) both;}

  .report-card{
    transition: border-color .25s, transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s;
    cursor: default;
  }
  .report-card:hover{
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0,0,0,.28);
  }

  .toggle-track{ transition: background .3s; }
  .toggle-thumb{ transition: transform .3s cubic-bezier(.34,1.56,.64,1); }

  .badge{
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  .search-input{
    transition: border-color .2s, box-shadow .2s;
    outline: none;
  }
  .search-input:focus{
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16,185,129,.15);
  }

  @media(max-width:640px){
    .report-meta{ flex-direction:column !important; gap:6px !important; }
    .page-header{ flex-direction:column !important; align-items:flex-start !important; gap:12px !important; }
  }
`;

const crimeColor = (crime) => {
  const c = (crime || "").toLowerCase();
  if (c.includes("assault") || c.includes("battery") || c.includes("robbery"))
    return { bg: "rgba(239,68,68,.12)", text: "#f87171", dot: "#ef4444" };
  if (c.includes("theft") || c.includes("burglary") || c.includes("motor"))
    return { bg: "rgba(245,158,11,.12)", text: "#fbbf24", dot: "#f59e0b" };
  if (c.includes("narcotic") || c.includes("drug") || c.includes("liquor"))
    return { bg: "rgba(139,92,246,.12)", text: "#a78bfa", dot: "#8b5cf6" };
  return { bg: "rgba(16,185,129,.12)", text: "#34d399", dot: "#10b981" };
};

const Spinner = () => (
  <svg
    width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: "spin .7s linear infinite", display: "block" }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const Seereport = () => {
  const [dark, setDark] = useState(true);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const bg      = dark ? "#060d1a" : "#eef4f7";
  const surface = dark ? "rgba(15,28,50,.82)" : "#ffffff";
  const border  = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.09)";
  const t1      = dark ? "#e8f4f0" : "#0f172a";
  const t2      = dark ? "#7fa898" : "#64748b";
  const t3      = dark ? "#3d5a52" : "#94a3b8";

  const glass = {
    background: surface,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: `1px solid ${border}`,
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/api/reports/all");
        setReports(res.data);
      } catch (e) {
        console.error("Error fetching reports:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const crimeTypes = ["All", ...Array.from(new Set(reports.map((r) => r.crime).filter(Boolean)))];

  const filtered = reports.filter((r) => {
    const matchSearch =
      search === "" ||
      [r.location, r.crime, r.description, r.time]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.crime === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <style>{CSS}</style>
      <div
        className="sy"
        style={{
          background: bg,
          minHeight: "100vh",
          color: t1,
          transition: "background .3s, color .3s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle bg grid */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: dark
            ? "radial-gradient(circle at 20% 20%, rgba(16,185,129,.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16,185,129,.04) 0%, transparent 50%)"
            : "radial-gradient(circle at 20% 20%, rgba(16,185,129,.08) 0%, transparent 50%)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ── NAV ── */}
          <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: dark ? "rgba(6,13,26,.85)" : "rgba(238,244,247,.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: `1px solid ${border}`,
          }}>
            <Link
              to="/LandingPage2"
              style={{ fontWeight: 800, fontSize: 20, color: t1, textDecoration: "none", letterSpacing: "-.5px" }}
            >
              Safe<span style={{ color: G }}>Yatra</span>
            </Link>

            {/* Toggle */}
            <button
              className="toggle-track"
              onClick={() => setDark(!dark)}
              style={{
                width: 44, height: 24, borderRadius: 99, border: "none",
                cursor: "pointer", padding: 3, position: "relative",
                background: dark ? G : "rgba(0,0,0,.15)",
                display: "flex", alignItems: "center",
              }}
            >
              <div
                className="toggle-thumb"
                style={{
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  position: "absolute",
                  transform: dark ? "translateX(20px)" : "translateX(0px)",
                  boxShadow: "0 1px 4px rgba(0,0,0,.3)",
                }}
              />
            </button>
          </nav>

          {/* ── MAIN ── */}
          <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 80px" }}>

            {/* Page header */}
            <div className="fu page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.2 }}>
                  Community <span style={{ color: G }}>Reports</span>
                </h1>
                <p style={{ fontSize: 13, color: t2, marginTop: 4 }}>
                  {reports.length} incident{reports.length !== 1 ? "s" : ""} reported in your area
                </p>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.2)",
                borderRadius: 99, padding: "5px 12px",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: G, animation: "pulse 2s infinite", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: G }}>Live</span>
              </div>
            </div>

            {/* Search + filter */}
            <div className="fu1" style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t3} strokeWidth="2"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports…"
                  style={{
                    width: "100%", paddingLeft: 36, paddingRight: 14,
                    paddingTop: 10, paddingBottom: 10,
                    borderRadius: 10, border: `1.5px solid ${border}`,
                    background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
                    color: t1, fontSize: 14, fontFamily: "inherit",
                  }}
                />
              </div>

              {/* Filter dropdown */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: "10px 14px", borderRadius: 10,
                  border: `1.5px solid ${border}`,
                  background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
                  color: t1, fontSize: 13, fontFamily: "inherit",
                  cursor: "pointer", outline: "none", minWidth: 120,
                }}
              >
                {crimeTypes.map((c) => (
                  <option key={c} value={c} style={{ background: dark ? "#0f1c2e" : "#fff" }}>{c}</option>
                ))}
              </select>
            </div>

            {/* ── Reports ── */}
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
                <Spinner />
              </div>
            ) : filtered.length === 0 ? (
              <div className="fu2" style={{
                textAlign: "center", padding: "60px 20px",
                borderRadius: 16, ...glass,
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={t3} strokeWidth="1.5" style={{ margin: "0 auto 12px" }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p style={{ color: t2, fontSize: 15, fontWeight: 600 }}>No reports found</p>
                <p style={{ color: t3, fontSize: 13, marginTop: 4 }}>Try adjusting your search or filter</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filtered.map((report, i) => {
                  const cc = crimeColor(report.crime);
                  return (
                    <div
                      key={report._id}
                      className={`report-card fu${Math.min(i + 2, 6)}`}
                      style={{ borderRadius: 16, padding: "20px 22px", ...glass }}
                    >
                      {/* Top row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                        <div className="badge" style={{ background: cc.bg, color: cc.text }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cc.dot, display: "inline-block", flexShrink: 0 }} />
                          {report.crime || "Unknown"}
                        </div>
                        <span style={{ fontSize: 12, color: t3, flexShrink: 0 }}>
                          {report.time || "—"}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="report-meta" style={{ display: "flex", gap: 18, marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                          </svg>
                          <span style={{ fontSize: 13, color: t2 }}>{report.location || "Unknown location"}</span>
                        </div>
                      </div>

                      {/* Description */}
                      {report.description && (
                        <p style={{
                          fontSize: 13, color: t2, lineHeight: 1.65,
                          paddingTop: 12, borderTop: `1px solid ${border}`,
                        }}>
                          {report.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Count */}
            {!loading && filtered.length > 0 && (
              <p style={{ textAlign: "center", fontSize: 12, color: t3, marginTop: 28 }}>
                Showing {filtered.length} of {reports.length} reports
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Seereport;