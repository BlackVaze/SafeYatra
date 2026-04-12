// import React, { useState, useEffect, useRef } from "react";
// import API from "./api/axios";
// import Toast from "./toast";

// const G = "#10b981";

// const CSS = `
//   @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
//   @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
//   @keyframes scaleIn  { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
//   @keyframes dotPop   { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.5);opacity:1} }
//   @keyframes shimmer  { from{background-position:200% center} to{background-position:-200% center} }
//   @keyframes float0   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
//   @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//   @keyframes checkPop { 0%{transform:scale(.7)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }

//   *{box-sizing:border-box;margin:0;padding:0;}

//   .sy{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}

//   .fu {animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
//   .fu1{animation:fadeUp .5s .06s cubic-bezier(.22,1,.36,1) both;}
//   .fu2{animation:fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both;}
//   .fu3{animation:fadeUp .5s .18s cubic-bezier(.22,1,.36,1) both;}
//   .fu4{animation:fadeUp .5s .24s cubic-bezier(.22,1,.36,1) both;}
//   .fu5{animation:fadeUp .5s .30s cubic-bezier(.22,1,.36,1) both;}
//   .fu6{animation:fadeUp .5s .36s cubic-bezier(.22,1,.36,1) both;}

//   /* Input focus ring — green glow */
//   .sy-input{
//     transition: border-color .2s, box-shadow .2s, background .2s;
//     outline: none;
//   }
//   .sy-input:focus{
//     border-color: #10b981 !important;
//     box-shadow: 0 0 0 3px rgba(16,185,129,.18), 0 0 14px rgba(16,185,129,.10);
//   }
//   .sy-input::placeholder{ transition: opacity .2s; }
//   .sy-input:focus::placeholder{ opacity: .4; }

//   /* Required dot */
//   .req-dot{
//     display: inline-block;
//     width: 5px; height: 5px; border-radius: 50%;
//     background: #10b981;
//     margin-left: 5px;
//     opacity: .55;
//     vertical-align: middle;
//     transform: translateY(-1px);
//   }

//   /* Field icon reacts to focus */
//   .field-wrap .field-icon{ transition: opacity .2s; opacity: .35; }
//   .field-wrap:focus-within .field-icon{ opacity: .75; }

//   /* Label float effect */
//   .field-wrap{ position:relative; }
//   .field-label{
//     transition: color .25s;
//     display:block; font-size:12px; font-weight:600;
//     letter-spacing:.06em; text-transform:uppercase; margin-bottom:8px;
//   }

//   /* Char progress bar */
//   .char-bar-track{
//     height: 3px; border-radius: 99px;
//     background: rgba(255,255,255,.07);
//     margin-top: 6px; overflow: hidden;
//   }
//   .char-bar-fill{
//     height: 100%; border-radius: 99px;
//     background: #10b981;
//     transition: width .25s cubic-bezier(.22,1,.36,1), background .25s;
//   }
//   .char-bar-fill.warn   { background: #f59e0b; }
//   .char-bar-fill.danger { background: #ef4444; }

//   /* Submit button */
//   .submit-btn{
//     position:relative; overflow:hidden;
//     transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .25s, opacity .2s;
//   }
//   .submit-btn:hover:not(:disabled){
//     transform:translateY(-2px);
//     box-shadow:0 10px 30px rgba(16,185,129,.45);
//   }
//   .submit-btn:active:not(:disabled){ transform:scale(.97); }
//   .submit-btn:disabled{ opacity:.55; cursor:not-allowed; }

//   /* Shimmer — more visible */
//   .submit-btn::after{
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(90deg,transparent 20%,rgba(255,255,255,.18) 50%,transparent 80%);
//     background-size:200% 100%;
//     animation:shimmer 1.8s linear infinite;
//   }

//   /* Success checkmark pop */
//   .success-check{ animation: checkPop .35s cubic-bezier(.22,1,.36,1) both; }

//   /* Nav toggle */
//   .toggle-track{ transition:background .3s; }
//   .toggle-thumb{ transition:transform .3s cubic-bezier(.34,1.56,.64,1), background .3s; }

//   /* Card hover on reports list */
//   .report-card{
//     transition: border-color .25s, transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s;
//   }
//   .report-card:hover{
//     transform:translateY(-2px);
//     box-shadow:0 12px 32px rgba(0,0,0,.22);
//   }

//   .modebtn{ transition:background .22s,border-color .22s; }

//   /* Select arrow custom */
//   .sy-select{ background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px !important; appearance:none; }

//   @media(max-width:640px){
//     .form-card{ padding:24px 18px !important; }
//   }
// `;
// function use3DCanvas(canvasRef, dark) {
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let raf;

//     function resize() {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     }
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);

//     function drawGrid(t) {
//       const w = canvas.width,
//         h = canvas.height;
//       const horizon = h * 0.52;
//       const vp = { x: w / 2, y: horizon };
//       const alpha = dark ? 0.15 : 0.09;
//       const lineCol = dark ? "16,185,129" : "15,118,110";
//       const cols = 14,
//         rows = 10,
//         spread = w * 1.2;
//       for (let i = 0; i <= cols; i++) {
//         const x0 = vp.x - spread / 2 + (spread / cols) * i;
//         ctx.beginPath();
//         ctx.moveTo(vp.x + (x0 - vp.x) * 0.01, horizon);
//         ctx.lineTo(x0, h + 40);
//         const a = alpha + 0.05 * Math.sin(t * 0.4 + i * 0.4);
//         ctx.strokeStyle = `rgba(${lineCol},${Math.max(0, a)})`;
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }
//       for (let j = 1; j <= rows; j++) {
//         const ep = Math.pow(j / rows, 2.2);
//         const y = horizon + (h + 40 - horizon) * ep;
//         const lx = vp.x - (spread / 2) * (j / rows);
//         const rx = vp.x + (spread / 2) * (j / rows);
//         ctx.beginPath();
//         ctx.moveTo(lx, y);
//         ctx.lineTo(rx, y);
//         ctx.strokeStyle = `rgba(${lineCol},${alpha * (j / rows)})`;
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }
//     }

//     function drawBlobs(t) {
//       const w = canvas.width,
//         h = canvas.height;
//       const p = 0.5 + 0.5 * Math.sin(t * 0.5);
//       const blobs = dark
//         ? [
//             { x: 0.15, y: 0.15, r: 0.35, c: "16,185,129", a: 0.1 },
//             { x: 0.85, y: 0.28, r: 0.28, c: "37,99,235", a: 0.08 },
//             { x: 0.4, y: 0.78, r: 0.22, c: "124,58,237", a: 0.07 },
//           ]
//         : [
//             { x: 0.15, y: 0.15, r: 0.3, c: "16,185,129", a: 0.07 },
//             { x: 0.88, y: 0.25, r: 0.25, c: "37,99,235", a: 0.05 },
//             { x: 0.45, y: 0.78, r: 0.2, c: "124,58,237", a: 0.04 },
//           ];
//       for (const b of blobs) {
//         const gr = ctx.createRadialGradient(
//           b.x * w,
//           b.y * h,
//           0,
//           b.x * w,
//           b.y * h,
//           b.r * Math.min(w, h) * (1 + 0.07 * p),
//         );
//         gr.addColorStop(0, `rgba(${b.c},${b.a + 0.03 * p})`);
//         gr.addColorStop(1, `rgba(${b.c},0)`);
//         ctx.fillStyle = gr;
//         ctx.fillRect(0, 0, w, h);
//       }
//     }

//     const VERTS = [
//       [-1, -1, -1],
//       [1, -1, -1],
//       [1, 1, -1],
//       [-1, 1, -1],
//       [-1, -1, 1],
//       [1, -1, 1],
//       [1, 1, 1],
//       [-1, 1, 1],
//     ];
//     const EDGES = [
//       [0, 1],
//       [1, 2],
//       [2, 3],
//       [3, 0],
//       [4, 5],
//       [5, 6],
//       [6, 7],
//       [7, 4],
//       [0, 4],
//       [1, 5],
//       [2, 6],
//       [3, 7],
//     ];

//     function project(v, rx, ry, cx, cy, sz) {
//       let [x, y, z] = v;
//       let tx = x * Math.cos(ry) - z * Math.sin(ry),
//         tz = x * Math.sin(ry) + z * Math.cos(ry);
//       x = tx;
//       z = tz;
//       let ty = y * Math.cos(rx) - z * Math.sin(rx);
//       tz = y * Math.sin(rx) + z * Math.cos(rx);
//       y = ty;
//       z = tz;
//       const fov = 5,
//         d = fov / (fov + z + 3);
//       return [cx + x * sz * d, cy + y * sz * d];
//     }

//     const cubeStates = [
//       {
//         cx: 0.1,
//         cy: 0.18,
//         sz: 22,
//         rx: 0.3,
//         ry: 0.6,
//         drx: 0.007,
//         dry: 0.011,
//         col: dark ? "16,185,129" : "15,118,110",
//         a: dark ? 0.4 : 0.22,
//       },
//       {
//         cx: 0.88,
//         cy: 0.15,
//         sz: 16,
//         rx: 0.8,
//         ry: 0.2,
//         drx: 0.009,
//         dry: 0.007,
//         col: dark ? "37,99,235" : "29,78,216",
//         a: dark ? 0.35 : 0.18,
//       },
//       {
//         cx: 0.06,
//         cy: 0.6,
//         sz: 13,
//         rx: 1.2,
//         ry: 0.9,
//         drx: 0.011,
//         dry: 0.006,
//         col: dark ? "124,58,237" : "109,40,217",
//         a: dark ? 0.3 : 0.16,
//       },
//       {
//         cx: 0.92,
//         cy: 0.55,
//         sz: 18,
//         rx: 0.5,
//         ry: 1.1,
//         drx: 0.008,
//         dry: 0.009,
//         col: dark ? "16,185,129" : "15,118,110",
//         a: dark ? 0.25 : 0.14,
//       },
//       {
//         cx: 0.5,
//         cy: 0.05,
//         sz: 11,
//         rx: 0.1,
//         ry: 0.4,
//         drx: 0.013,
//         dry: 0.005,
//         col: dark ? "16,185,129" : "15,118,110",
//         a: dark ? 0.28 : 0.15,
//       },
//     ];

//     function drawCubes() {
//       for (const c of cubeStates) {
//         c.rx += c.drx;
//         c.ry += c.dry;
//         const px = c.cx * canvas.width,
//           py = c.cy * canvas.height;
//         ctx.strokeStyle = `rgba(${c.col},${c.a})`;
//         ctx.lineWidth = 1.2;
//         for (const [a, b] of EDGES) {
//           const [ax, ay] = project(VERTS[a], c.rx, c.ry, px, py, c.sz);
//           const [bx, by] = project(VERTS[b], c.rx, c.ry, px, py, c.sz);
//           ctx.beginPath();
//           ctx.moveTo(ax, ay);
//           ctx.lineTo(bx, by);
//           ctx.stroke();
//         }
//       }
//     }

//     const particles = Array.from({ length: 40 }, (_, i) => ({
//       x: Math.random(),
//       y: Math.random(),
//       r: 1.2 + Math.random() * 2,
//       speed: 0.0002 + Math.random() * 0.0004,
//       phase: Math.random() * Math.PI * 2,
//       col: dark
//         ? i % 5 === 0
//           ? "37,99,235"
//           : i % 7 === 0
//             ? "124,58,237"
//             : "16,185,129"
//         : i % 5 === 0
//           ? "29,78,216"
//           : i % 7 === 0
//             ? "109,40,217"
//             : "15,118,110",
//       maxAlpha: dark ? 0.65 : 0.3,
//     }));

//     let t = 0;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawBlobs(t);
//       drawGrid(t);
//       drawCubes();
//       for (const p of particles) {
//         p.y -= p.speed;
//         if (p.y < -0.02) p.y = 1.02;
//         const alpha =
//           (0.25 + 0.4 * Math.sin(t * 1.3 + p.phase)) * (p.maxAlpha / 0.65);
//         ctx.beginPath();
//         ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${p.col},${Math.max(0, alpha)})`;
//         ctx.fill();
//       }
//       t += 0.016;
//       raf = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => {
//       cancelAnimationFrame(raf);
//       ro.disconnect();
//     };
//   }, [dark]);
// }

// function Background({ dark }) {
//   const ref = useRef(null);
//   use3DCanvas(ref, dark);
//   return (
//     <canvas
//       ref={ref}
//       style={{
//         position: "absolute",
//         inset: 0,
//         width: "100%",
//         height: "100%",
//         pointerEvents: "none",
//         zIndex: 0,
//       }}
//     />
//   );
// }

// /* ── Crime categories ── */
// const CRIMES = [
//   {
//     group: "Violent Crimes",
//     options: [
//       "Homicide",
//       "Crim Sexual Assault",
//       "Criminal Sexual Assault",
//       "Kidnapping",
//       "Human Trafficking",
//     ],
//   },
//   {
//     group: "Crimes Against Persons",
//     options: [
//       "Robbery",
//       "Arson",
//       "Assault",
//       "Battery",
//       "Weapons Violation",
//       "Intimidation",
//       "Stalking",
//     ],
//   },
//   {
//     group: "Property Crimes",
//     options: [
//       "Burglary",
//       "Motor Vehicle Theft",
//       "Theft",
//       "Criminal Damage",
//       "Criminal Trespass",
//     ],
//   },
//   {
//     group: "Other Offenses",
//     options: [
//       "Offense Involving Children",
//       "Sex Offense",
//       "Prostitution",
//       "Narcotics",
//       "Liquor Law Violation",
//       "Gambling",
//       "Public Peace Violation",
//       "Obscenity",
//       "Public Indecency",
//       "Concealed Carry License Violation",
//       "Deceptive Practice",
//       "Interference With Public Officer",
//       "Other Offense",
//       "Other Narcotic Violation",
//       "Non-Criminal",
//       "Ritualism",
//     ],
//   },
// ];

// /* ── Spinner icon ── */
// const Spinner = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     style={{
//       animation: "spin .7s linear infinite",
//       display: "inline-block",
//       verticalAlign: "middle",
//       marginRight: 8,
//     }}
//   >
//     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
//   </svg>
// );

// const FileReport = () => {
//   const [dark, setDark] = useState(true);
//   const [location, setLocation] = useState("");
//   const [time, setTime] = useState("");
//   const [crime, setCrime] = useState("");
//   const [description, setDesc] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   /* tokens — identical to HowItWorks */
//   const bg = dark ? "#060d1a" : "#eef4f7";
//   const surface = dark ? "rgba(15,28,50,.82)" : "#ffffff";
//   const border = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.09)";
//   const t1 = dark ? "#e8f4f0" : "#0f172a";
//   const t2 = dark ? "#7fa898" : "#64748b";
//   const t3 = dark ? "#3d5a52" : "#94a3b8";

//   const glass = {
//     background: surface,
//     backdropFilter: "blur(18px)",
//     WebkitBackdropFilter: "blur(18px)",
//     border: `1px solid ${border}`,
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "11px 14px",
//     borderRadius: 10,
//     border: `1.5px solid ${border}`,
//     background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
//     color: t1,
//     fontSize: 14,
//     fontFamily: "inherit",
//   };

//   const labelStyle = {
//     display: "block",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: ".1em",
//     textTransform: "uppercase",
//     color: t2,
//     marginBottom: 8,
//     transition: "color .25s",
//   };

//   /* Char bar helpers */
//   const charPct = (description.length / 1000) * 100;
//   const charBarClass =
//     description.length > 900
//       ? "char-bar-fill danger"
//       : description.length > 700
//         ? "char-bar-fill warn"
//         : "char-bar-fill";
//   const charCountColor =
//     description.length > 900
//       ? "#ef4444"
//       : description.length > 700
//         ? "#f59e0b"
//         : t3;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const response = await API.post("/api/reports/submit", {
//         location,
//         time,
//         crime,
//         description,
//       });
//       Toast.success(response.data.message);
//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 2800);
//       setLocation("");
//       setTime("");
//       setCrime("");
//       setDesc("");
//     } catch {
//       Toast.error("Error submitting report");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <style>{CSS}</style>
//       <div
//         className="sy"
//         style={{
//           background: bg,
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           color: t1,
//           transition: "background .3s,color .3s",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* ── Canvas 3D background ── */}
//         <Background dark={dark} />

//         <div
//           style={{
//             position: "relative",
//             zIndex: 1,
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//           }}
//         >
//           {/* ── NAV ── */}
//           <nav
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "18px 32px",
//             }}
//           >
//             <a
//               href="/LandingPage2"
//               style={{
//                 fontWeight: 800,
//                 fontSize: 20,
//                 color: t1,
//                 textDecoration: "none",
//                 letterSpacing: "-.5px",
//               }}
//             >
//               Safe<span style={{ color: G }}>Yatra</span>
//             </a>

//             <button
//               className="modebtn"
//               onClick={() => setDark((d) => !d)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: "7px 14px",
//                 borderRadius: 99,
//                 ...glass,
//                 color: t2,
//                 fontSize: 13,
//                 cursor: "pointer",
//               }}
//             >
//               <span style={{ fontSize: 14 }}>{dark ? "🌙" : "☀️"}</span>
//               {dark ? "Dark" : "Light"}
//             </button>
//           </nav>

//           {/* ── MAIN ── */}
//           <main
//             style={{
//               flex: 1,
//               maxWidth: 560,
//               margin: "0 auto",
//               width: "100%",
//               padding: "8px 20px 64px",
//             }}
//           >
//             {/* Hero label */}
//             <header
//               style={{
//                 textAlign: "center",
//                 padding: "24px 0 36px",
//                 animation: "fadeUp .5s cubic-bezier(.22,1,.36,1) both",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "clamp(1.5rem,4vw,2.1rem)",
//                   fontWeight: 800,
//                   lineHeight: 1.2,
//                   margin: "0 0 10px",
//                   letterSpacing: "-.03em",
//                 }}
//               >
//                 File a <span style={{ color: G }}>Report</span>
//               </h1>
//               <p style={{ fontSize: 14, color: t2, lineHeight: 1.7 }}>
//                 Help keep your community safe by reporting incidents. All
//                 reports are confidential.
//               </p>
//             </header>

//             {/* ── FORM CARD ── */}
//             <div
//               className="form-card fu1"
//               style={{
//                 borderRadius: 20,
//                 padding: "36px 32px",
//                 ...glass,
//                 boxShadow: dark
//                   ? "0 24px 64px rgba(0,0,0,.5), 0 0 0 1px rgba(16,185,129,.06)"
//                   : "0 8px 32px rgba(0,0,0,.08)",
//               }}
//             >
//               {/* Success flash */}
//               {submitted && (
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     background: "rgba(16,185,129,.12)",
//                     border: "1px solid rgba(16,185,129,.3)",
//                     borderRadius: 12,
//                     padding: "12px 16px",
//                     marginBottom: 24,
//                     animation: "scaleIn .3s cubic-bezier(.22,1,.36,1) both",
//                   }}
//                 >
//                   <svg
//                     className="success-check"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke={G}
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="20 6 9 17 4 12" />
//                   </svg>
//                   <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>
//                     Report submitted successfully!
//                   </span>
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit}
//                 style={{ display: "flex", flexDirection: "column", gap: 22 }}
//               >
//                 {/* Location */}
//                 <div className="fu2 field-wrap">
//                   <label className="field-label" style={labelStyle}>
//                     Location
//                     <span className="req-dot" title="required" />
//                   </label>
//                   <div style={{ position: "relative" }}>
//                     <input
//                       type="text"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       placeholder="Enter location of incident"
//                       required
//                       className="sy-input"
//                       style={{ ...inputStyle, paddingRight: 42 }}
//                     />
//                     <span
//                       className="field-icon"
//                       style={{
//                         position: "absolute",
//                         right: 13,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         fontSize: 16,
//                         lineHeight: 1,
//                       }}
//                     >
//                       📍
//                     </span>
//                   </div>
//                 </div>

//                 {/* Time */}
//                 <div className="fu3 field-wrap">
//                   <label className="field-label" style={labelStyle}>
//                     Time of Incident
//                     <span className="req-dot" title="required" />
//                   </label>
//                   <div style={{ position: "relative" }}>
//                     <input
//                       type="text"
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       placeholder="e.g. 10:30 PM, Yesterday evening"
//                       required
//                       className="sy-input"
//                       style={{ ...inputStyle, paddingRight: 42 }}
//                     />
//                     <svg
//                       className="field-icon"
//                       width="15"
//                       height="15"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke={t3}
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       style={{
//                         position: "absolute",
//                         right: 13,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         pointerEvents: "none",
//                       }}
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <polyline points="12 6 12 12 16 14" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Crime type */}
//                 <div className="fu4 field-wrap">
//                   <label className="field-label" style={labelStyle}>
//                     Crime Type
//                     <span className="req-dot" title="required" />
//                   </label>
//                   <select
//                     value={crime}
//                     onChange={(e) => setCrime(e.target.value)}
//                     required
//                     className="sy-input sy-select"
//                     style={{ ...inputStyle, cursor: "pointer" }}
//                   >
//                     <option value="" disabled>
//                       Select crime type
//                     </option>

//                     {CRIMES.flatMap((g) => g.options).map((o) => (
//                       <option key={o} value={o}>
//                         {o}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Description */}
//                 <div className="fu5 field-wrap">
//                   <label
//                     className="field-label"
//                     style={{
//                       ...labelStyle,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span>
//                       Description
//                       <span className="req-dot" title="required" />
//                     </span>
//                     <span
//                       style={{
//                         fontSize: 11,
//                         color: charCountColor,
//                         fontWeight: 500,
//                         textTransform: "none",
//                         letterSpacing: 0,
//                         transition: "color .25s",
//                       }}
//                     >
//                       {description.length} / 1000
//                     </span>
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDesc(e.target.value.slice(0, 1000))}
//                     placeholder="Please describe what happened in as much detail as possible…"
//                     rows={5}
//                     required
//                     className="sy-input"
//                     style={{
//                       ...inputStyle,
//                       resize: "vertical",
//                       minHeight: 120,
//                       lineHeight: 1.65,
//                     }}
//                   />
//                   {/* Progress bar */}
//                   <div className="char-bar-track">
//                     <div
//                       className={charBarClass}
//                       style={{ width: `${charPct}%` }}
//                     />
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div
//                   style={{ height: 1, background: border, borderRadius: 99 }}
//                 />

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="fu6 submit-btn"
//                   style={{
//                     width: "100%",
//                     padding: "13px 0",
//                     borderRadius: 12,
//                     border: "none",
//                     background: G,
//                     color: "#fff",
//                     fontSize: 14,
//                     fontWeight: 700,
//                     cursor: "pointer",
//                     letterSpacing: ".04em",
//                   }}
//                 >
//                   {submitting ? (
//                     <>
//                       <Spinner />
//                       Submitting…
//                     </>
//                   ) : submitted ? (
//                     "✓ Submitted!"
//                   ) : (
//                     "Submit Report →"
//                   )}
//                 </button>
//               </form>
//             </div>

//             {/* Bottom note */}
//             <p
//               className="fu6"
//               style={{
//                 textAlign: "center",
//                 fontSize: 12,
//                 color: t3,
//                 marginTop: 20,
//                 lineHeight: 1.6,
//               }}
//             >
//               Your report is encrypted and confidential. SafeYatra does not
//               share your information without consent.
//             </p>
//           </main>

//           {/* ── FOOTER ── */}
//           <footer
//             style={{
//               borderTop: `1px solid ${border}`,
//               padding: "14px 32px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 20,
//               flexWrap: "wrap",
//               fontSize: 12,
//               color: t3,
//             }}
//           >
//             <span>© 2025 SafeYatra. All rights reserved.</span>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FileReport;
import React, { useState, useEffect, useRef } from "react";
import API from "./api/axios";
import Toast from "./toast";

const G = "#10b981";

const CSS = `
  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
  @keyframes dotPop   { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.5);opacity:1} }
  @keyframes shimmer  { from{background-position:200% center} to{background-position:-200% center} }
  @keyframes float0   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes checkPop { 0%{transform:scale(.7)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }

  *{box-sizing:border-box;margin:0;padding:0;}

  .sy{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}

  .fu {animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
  .fu1{animation:fadeUp .5s .06s cubic-bezier(.22,1,.36,1) both;}
  .fu2{animation:fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both;}
  .fu3{animation:fadeUp .5s .18s cubic-bezier(.22,1,.36,1) both;}
  .fu4{animation:fadeUp .5s .24s cubic-bezier(.22,1,.36,1) both;}
  .fu5{animation:fadeUp .5s .30s cubic-bezier(.22,1,.36,1) both;}
  .fu6{animation:fadeUp .5s .36s cubic-bezier(.22,1,.36,1) both;}

  /* Input focus ring — green glow */
  .sy-input{
    transition: border-color .2s, box-shadow .2s, background .2s;
    outline: none;
  }
  .sy-input:focus{
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16,185,129,.18), 0 0 14px rgba(16,185,129,.10);
  }
  .sy-input::placeholder{ transition: opacity .2s; }
  .sy-input:focus::placeholder{ opacity: .4; }

  /* Required dot */
  .req-dot{
    display: inline-block;
    width: 5px; height: 5px; border-radius: 50%;
    background: #10b981;
    margin-left: 5px;
    opacity: .55;
    vertical-align: middle;
    transform: translateY(-1px);
  }

  /* Field icon reacts to focus */
  .field-wrap .field-icon{ transition: opacity .2s; opacity: .35; }
  .field-wrap:focus-within .field-icon{ opacity: .75; }

  /* Label float effect */
  .field-wrap{ position:relative; }
  .field-label{
    transition: color .25s;
    display:block; font-size:12px; font-weight:600;
    letter-spacing:.06em; text-transform:uppercase; margin-bottom:8px;
  }

  /* Char progress bar */
  .char-bar-track{
    height: 3px; border-radius: 99px;
    background: rgba(255,255,255,.07);
    margin-top: 6px; overflow: hidden;
  }
  .char-bar-fill{
    height: 100%; border-radius: 99px;
    background: #10b981;
    transition: width .25s cubic-bezier(.22,1,.36,1), background .25s;
  }
  .char-bar-fill.warn   { background: #f59e0b; }
  .char-bar-fill.danger { background: #ef4444; }

  /* Submit button */
  .submit-btn{
    position:relative; overflow:hidden;
    transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .25s, opacity .2s;
  }
  .submit-btn:hover:not(:disabled){
    transform:translateY(-2px);
    box-shadow:0 10px 30px rgba(16,185,129,.45);
  }
  .submit-btn:active:not(:disabled){ transform:scale(.97); }
  .submit-btn:disabled{ opacity:.55; cursor:not-allowed; }

  /* Shimmer — more visible */
  .submit-btn::after{
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent 20%,rgba(255,255,255,.18) 50%,transparent 80%);
    background-size:200% 100%;
    animation:shimmer 1.8s linear infinite;
  }

  /* Success checkmark pop */
  .success-check{ animation: checkPop .35s cubic-bezier(.22,1,.36,1) both; }

  /* Nav toggle */
  .toggle-track{ transition:background .3s; }
  .toggle-thumb{ transition:transform .3s cubic-bezier(.34,1.56,.64,1), background .3s; }

  /* Card hover on reports list */
  .report-card{
    transition: border-color .25s, transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s;
  }
  .report-card:hover{
    transform:translateY(-2px);
    box-shadow:0 12px 32px rgba(0,0,0,.22);
  }

  .modebtn{ transition:background .22s,border-color .22s; }

  /* Select arrow custom */
  .sy-select{ background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px !important; appearance:none; }

  @media(max-width:640px){
    .form-card{ padding:24px 18px !important; }
  }
`;
function use3DCanvas(canvasRef, dark) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawGrid(t) {
      const w = canvas.width,
        h = canvas.height;
      const horizon = h * 0.52;
      const vp = { x: w / 2, y: horizon };
      const alpha = dark ? 0.15 : 0.09;
      const lineCol = dark ? "16,185,129" : "15,118,110";
      const cols = 14,
        rows = 10,
        spread = w * 1.2;
      for (let i = 0; i <= cols; i++) {
        const x0 = vp.x - spread / 2 + (spread / cols) * i;
        ctx.beginPath();
        ctx.moveTo(vp.x + (x0 - vp.x) * 0.01, horizon);
        ctx.lineTo(x0, h + 40);
        const a = alpha + 0.05 * Math.sin(t * 0.4 + i * 0.4);
        ctx.strokeStyle = `rgba(${lineCol},${Math.max(0, a)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let j = 1; j <= rows; j++) {
        const ep = Math.pow(j / rows, 2.2);
        const y = horizon + (h + 40 - horizon) * ep;
        const lx = vp.x - (spread / 2) * (j / rows);
        const rx = vp.x + (spread / 2) * (j / rows);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.strokeStyle = `rgba(${lineCol},${alpha * (j / rows)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawBlobs(t) {
      const w = canvas.width,
        h = canvas.height;
      const p = 0.5 + 0.5 * Math.sin(t * 0.5);
      const blobs = dark
        ? [
            { x: 0.15, y: 0.15, r: 0.35, c: "16,185,129", a: 0.1 },
            { x: 0.85, y: 0.28, r: 0.28, c: "37,99,235", a: 0.08 },
            { x: 0.4, y: 0.78, r: 0.22, c: "124,58,237", a: 0.07 },
          ]
        : [
            { x: 0.15, y: 0.15, r: 0.3, c: "16,185,129", a: 0.07 },
            { x: 0.88, y: 0.25, r: 0.25, c: "37,99,235", a: 0.05 },
            { x: 0.45, y: 0.78, r: 0.2, c: "124,58,237", a: 0.04 },
          ];
      for (const b of blobs) {
        const gr = ctx.createRadialGradient(
          b.x * w,
          b.y * h,
          0,
          b.x * w,
          b.y * h,
          b.r * Math.min(w, h) * (1 + 0.07 * p),
        );
        gr.addColorStop(0, `rgba(${b.c},${b.a + 0.03 * p})`);
        gr.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, w, h);
      }
    }

    const VERTS = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];
    const EDGES = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    function project(v, rx, ry, cx, cy, sz) {
      let [x, y, z] = v;
      let tx = x * Math.cos(ry) - z * Math.sin(ry),
        tz = x * Math.sin(ry) + z * Math.cos(ry);
      x = tx;
      z = tz;
      let ty = y * Math.cos(rx) - z * Math.sin(rx);
      tz = y * Math.sin(rx) + z * Math.cos(rx);
      y = ty;
      z = tz;
      const fov = 5,
        d = fov / (fov + z + 3);
      return [cx + x * sz * d, cy + y * sz * d];
    }

    const cubeStates = [
      {
        cx: 0.1,
        cy: 0.18,
        sz: 22,
        rx: 0.3,
        ry: 0.6,
        drx: 0.007,
        dry: 0.011,
        col: dark ? "16,185,129" : "15,118,110",
        a: dark ? 0.4 : 0.22,
      },
      {
        cx: 0.88,
        cy: 0.15,
        sz: 16,
        rx: 0.8,
        ry: 0.2,
        drx: 0.009,
        dry: 0.007,
        col: dark ? "37,99,235" : "29,78,216",
        a: dark ? 0.35 : 0.18,
      },
      {
        cx: 0.06,
        cy: 0.6,
        sz: 13,
        rx: 1.2,
        ry: 0.9,
        drx: 0.011,
        dry: 0.006,
        col: dark ? "124,58,237" : "109,40,217",
        a: dark ? 0.3 : 0.16,
      },
      {
        cx: 0.92,
        cy: 0.55,
        sz: 18,
        rx: 0.5,
        ry: 1.1,
        drx: 0.008,
        dry: 0.009,
        col: dark ? "16,185,129" : "15,118,110",
        a: dark ? 0.25 : 0.14,
      },
      {
        cx: 0.5,
        cy: 0.05,
        sz: 11,
        rx: 0.1,
        ry: 0.4,
        drx: 0.013,
        dry: 0.005,
        col: dark ? "16,185,129" : "15,118,110",
        a: dark ? 0.28 : 0.15,
      },
    ];

    function drawCubes() {
      for (const c of cubeStates) {
        c.rx += c.drx;
        c.ry += c.dry;
        const px = c.cx * canvas.width,
          py = c.cy * canvas.height;
        ctx.strokeStyle = `rgba(${c.col},${c.a})`;
        ctx.lineWidth = 1.2;
        for (const [a, b] of EDGES) {
          const [ax, ay] = project(VERTS[a], c.rx, c.ry, px, py, c.sz);
          const [bx, by] = project(VERTS[b], c.rx, c.ry, px, py, c.sz);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }

    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2,
      speed: 0.0002 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      col: dark
        ? i % 5 === 0
          ? "37,99,235"
          : i % 7 === 0
            ? "124,58,237"
            : "16,185,129"
        : i % 5 === 0
          ? "29,78,216"
          : i % 7 === 0
            ? "109,40,217"
            : "15,118,110",
      maxAlpha: dark ? 0.65 : 0.3,
    }));

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBlobs(t);
      drawGrid(t);
      drawCubes();
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -0.02) p.y = 1.02;
        const alpha =
          (0.25 + 0.4 * Math.sin(t * 1.3 + p.phase)) * (p.maxAlpha / 0.65);
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${Math.max(0, alpha)})`;
        ctx.fill();
      }
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [dark]);
}

function Background({ dark }) {
  const ref = useRef(null);
  use3DCanvas(ref, dark);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Crime categories ── */
const CRIMES = [
  {
    group: "Violent Crimes",
    options: [
      "Homicide",
      "Crim Sexual Assault",
      "Criminal Sexual Assault",
      "Kidnapping",
      "Human Trafficking",
    ],
  },
  {
    group: "Crimes Against Persons",
    options: [
      "Robbery",
      "Arson",
      "Assault",
      "Battery",
      "Weapons Violation",
      "Intimidation",
      "Stalking",
    ],
  },
  {
    group: "Property Crimes",
    options: [
      "Burglary",
      "Motor Vehicle Theft",
      "Theft",
      "Criminal Damage",
      "Criminal Trespass",
    ],
  },
  {
    group: "Other Offenses",
    options: [
      "Offense Involving Children",
      "Sex Offense",
      "Prostitution",
      "Narcotics",
      "Liquor Law Violation",
      "Gambling",
      "Public Peace Violation",
      "Obscenity",
      "Public Indecency",
      "Concealed Carry License Violation",
      "Deceptive Practice",
      "Interference With Public Officer",
      "Other Offense",
      "Other Narcotic Violation",
      "Non-Criminal",
      "Ritualism",
    ],
  },
];

/* ── Spinner icon ── */
const Spinner = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{
      animation: "spin .7s linear infinite",
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 8,
    }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const FileReport = () => {
  const [dark, setDark] = useState(true);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [crime, setCrime] = useState("");
  const [description, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* tokens — identical to HowItWorks */
  const bg = dark ? "#060d1a" : "#eef4f7";
  const surface = dark ? "rgba(15,28,50,.82)" : "#ffffff";
  const border = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.09)";
  const t1 = dark ? "#e8f4f0" : "#0f172a";
  const t2 = dark ? "#7fa898" : "#64748b";
  const t3 = dark ? "#3d5a52" : "#94a3b8";

  const glass = {
    background: surface,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: `1px solid ${border}`,
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1.5px solid ${border}`,
    background: dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
    color: t1,
    fontSize: 14,
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: t2,
    marginBottom: 8,
    transition: "color .25s",
  };

  /* Char bar helpers */
  const charPct = (description.length / 1000) * 100;
  const charBarClass =
    description.length > 900
      ? "char-bar-fill danger"
      : description.length > 700
        ? "char-bar-fill warn"
        : "char-bar-fill";
  const charCountColor =
    description.length > 900
      ? "#ef4444"
      : description.length > 700
        ? "#f59e0b"
        : t3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await API.post("/api/reports/submit", {
        location,
        time,
        crime,
        description,
      });
      Toast.success(response.data.message);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2800);
      setLocation("");
      setTime("");
      setCrime("");
      setDesc("");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error submitting report";
      Toast.error(msg);
      console.error("Submit error:", err.response?.status, err.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div
        className="sy"
        style={{
          background: bg,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: t1,
          transition: "background .3s,color .3s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Canvas 3D background ── */}
        <Background dark={dark} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* ── NAV ── */}
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 32px",
            }}
          >
            <a
              href="/LandingPage2"
              style={{
                fontWeight: 800,
                fontSize: 20,
                color: t1,
                textDecoration: "none",
                letterSpacing: "-.5px",
              }}
            >
              Safe<span style={{ color: G }}>Yatra</span>
            </a>

            <button
              className="modebtn"
              onClick={() => setDark((d) => !d)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                borderRadius: 99,
                ...glass,
                color: t2,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 14 }}>{dark ? "🌙" : "☀️"}</span>
              {dark ? "Dark" : "Light"}
            </button>
          </nav>

          {/* ── MAIN ── */}
          <main
            style={{
              flex: 1,
              maxWidth: 560,
              margin: "0 auto",
              width: "100%",
              padding: "8px 20px 64px",
            }}
          >
            {/* Hero label */}
            <header
              style={{
                textAlign: "center",
                padding: "24px 0 36px",
                animation: "fadeUp .5s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(1.5rem,4vw,2.1rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: "0 0 10px",
                  letterSpacing: "-.03em",
                }}
              >
                File a <span style={{ color: G }}>Report</span>
              </h1>
              <p style={{ fontSize: 14, color: t2, lineHeight: 1.7 }}>
                Help keep your community safe by reporting incidents. All
                reports are confidential.
              </p>
            </header>

            {/* ── FORM CARD ── */}
            <div
              className="form-card fu1"
              style={{
                borderRadius: 20,
                padding: "36px 32px",
                ...glass,
                boxShadow: dark
                  ? "0 24px 64px rgba(0,0,0,.5), 0 0 0 1px rgba(16,185,129,.06)"
                  : "0 8px 32px rgba(0,0,0,.08)",
              }}
            >
              {/* Success flash */}
              {submitted && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(16,185,129,.12)",
                    border: "1px solid rgba(16,185,129,.3)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    marginBottom: 24,
                    animation: "scaleIn .3s cubic-bezier(.22,1,.36,1) both",
                  }}
                >
                  <svg
                    className="success-check"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={G}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>
                    Report submitted successfully!
                  </span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 22 }}
              >
                {/* Location */}
                <div className="fu2 field-wrap">
                  <label className="field-label" style={labelStyle}>
                    Location
                    <span className="req-dot" title="required" />
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location of incident"
                      required
                      className="sy-input"
                      style={{ ...inputStyle, paddingRight: 42 }}
                    />
                    <span
                      className="field-icon"
                      style={{
                        position: "absolute",
                        right: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      📍
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="fu3 field-wrap">
                  <label className="field-label" style={labelStyle}>
                    Time of Incident
                    <span className="req-dot" title="required" />
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 10:30 PM, Yesterday evening"
                      required
                      className="sy-input"
                      style={{ ...inputStyle, paddingRight: 42 }}
                    />
                    <svg
                      className="field-icon"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={t3}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        position: "absolute",
                        right: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>

                {/* Crime type */}
                <div className="fu4 field-wrap">
                  <label className="field-label" style={labelStyle}>
                    Crime Type
                    <span className="req-dot" title="required" />
                  </label>
                  <select
                    value={crime}
                    onChange={(e) => setCrime(e.target.value)}
                    required
                    className="sy-input sy-select"
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" disabled>
                      Select crime type
                    </option>

                    {CRIMES.flatMap((g) => g.options).map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="fu5 field-wrap">
                  <label
                    className="field-label"
                    style={{
                      ...labelStyle,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      Description
                      <span className="req-dot" title="required" />
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: charCountColor,
                        fontWeight: 500,
                        textTransform: "none",
                        letterSpacing: 0,
                        transition: "color .25s",
                      }}
                    >
                      {description.length} / 1000
                    </span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDesc(e.target.value.slice(0, 1000))}
                    placeholder="Please describe what happened in as much detail as possible…"
                    rows={5}
                    required
                    className="sy-input"
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 120,
                      lineHeight: 1.65,
                    }}
                  />
                  {/* Progress bar */}
                  <div className="char-bar-track">
                    <div
                      className={charBarClass}
                      style={{ width: `${charPct}%` }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{ height: 1, background: border, borderRadius: 99 }}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="fu6 submit-btn"
                  style={{
                    width: "100%",
                    padding: "13px 0",
                    borderRadius: 12,
                    border: "none",
                    background: G,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: ".04em",
                  }}
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      Submitting…
                    </>
                  ) : submitted ? (
                    "✓ Submitted!"
                  ) : (
                    "Submit Report →"
                  )}
                </button>
              </form>
            </div>

            {/* Bottom note */}
            <p
              className="fu6"
              style={{
                textAlign: "center",
                fontSize: 12,
                color: t3,
                marginTop: 20,
                lineHeight: 1.6,
              }}
            >
              Your report is encrypted and confidential. SafeYatra does not
              share your information without consent.
            </p>
          </main>

          {/* ── FOOTER ── */}
          <footer
            style={{
              borderTop: `1px solid ${border}`,
              padding: "14px 32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              fontSize: 12,
              color: t3,
            }}
          >
            <span>© 2025 SafeYatra. All rights reserved.</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default FileReport;