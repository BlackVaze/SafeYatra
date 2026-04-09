import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import pinimage from "./pin.jpeg";
import mapimage from "./mapp.jpg";
import helpimage from "./danger.jpg";

const G = "#10b981";

const CSS = `
  @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }

  *{box-sizing:border-box;margin:0;padding:0;}
  .sy{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}

  .fu {animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both;}
  .fu1{animation:fadeUp .55s .07s cubic-bezier(.22,1,.36,1) both;}
  .fu2{animation:fadeUp .55s .14s cubic-bezier(.22,1,.36,1) both;}
  .fu3{animation:fadeUp .55s .21s cubic-bezier(.22,1,.36,1) both;}
  .fu4{animation:fadeUp .55s .28s cubic-bezier(.22,1,.36,1) both;}
  .fu5{animation:fadeUp .55s .35s cubic-bezier(.22,1,.36,1) both;}
  .fu6{animation:fadeUp .55s .42s cubic-bezier(.22,1,.36,1) both;}

  /* Feature card */
  .feat-card{
    border-radius:16px; padding:28px 24px; cursor:pointer;
    transition: transform .25s cubic-bezier(.22,1,.36,1),
                box-shadow .25s, border-color .25s, background .25s;
    position:relative; overflow:hidden;
  }
  .feat-card:hover{ transform:translateY(-4px); }
  .feat-card.dark{ background:rgba(15,28,50,.80); border:1px solid rgba(255,255,255,.08); }
  .feat-card.dark:hover{ border-color:rgba(16,185,129,.35); box-shadow:0 16px 48px rgba(0,0,0,.45),0 0 0 1px rgba(16,185,129,.12); }
  .feat-card.light{ background:#fff; border:1px solid rgba(0,0,0,.08); box-shadow:0 4px 16px rgba(0,0,0,.07); }
  .feat-card.light:hover{ border-color:rgba(16,185,129,.4); box-shadow:0 16px 40px rgba(0,0,0,.12); }

  /* Expanded detail */
  .card-detail{
    overflow:hidden; transition:max-height .35s cubic-bezier(.22,1,.36,1), opacity .3s;
    max-height:0; opacity:0;
  }
  .card-detail.open{ max-height:200px; opacity:1; }

  /* Icon circle */
  .icon-circle{
    width:48px;height:48px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:rgba(16,185,129,.14);font-size:20px;
    transition:background .25s, transform .25s;
    flex-shrink:0;
  }
  .feat-card:hover .icon-circle{ background:rgba(16,185,129,.22); transform:scale(1.08); }

  /* Stat counter */
  .stat-val{
    font-size:clamp(2rem,5vw,3rem); font-weight:800;
    color:#10b981; line-height:1; letter-spacing:-.04em;
    animation:countUp .6s cubic-bezier(.22,1,.36,1) both;
  }

  /* Mission image card */
  .img-card{
    border-radius:16px; overflow:hidden; cursor:pointer;
    transition:transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
  }
  .img-card:hover{ transform:translateY(-4px); }
  /* Image wrapper holds the overlay */
  .img-card .img-wrap{
    position:relative; overflow:hidden; border-radius:12px; margin:10px 10px 0;
  }
  .img-card .img-wrap img{
    width:100%; height:180px; object-fit:cover; display:block;
    border-radius:12px;
    transition:transform .4s cubic-bezier(.22,1,.36,1);
  }
  .img-card:hover .img-wrap img{ transform:scale(1.04); }
  .img-card .overlay{
    position:absolute;inset:0;border-radius:12px;
    background:linear-gradient(to top,rgba(6,13,26,.88) 0%,rgba(6,13,26,.2) 60%,transparent 100%);
    opacity:0; transition:opacity .35s cubic-bezier(.22,1,.36,1);
    display:flex;align-items:flex-end;padding:14px;
  }
  .img-card:hover .overlay{ opacity:1; }

  /* Nav link */
  .nav-link{
    font-size:14px;font-weight:600;color:#7fa898;text-decoration:none;
    transition:color .2s; position:relative; padding-bottom:2px;
  }
  .nav-link::after{
    content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;
    background:#10b981;transform:scaleX(0);transition:transform .25s cubic-bezier(.22,1,.36,1);
    transform-origin:left;
  }
  .nav-link:hover{ color:#e8f4f0; }
  .nav-link:hover::after{ transform:scaleX(1); }

  /* Modebtn */
  .modebtn{ transition:background .22s,border-color .22s; }

  /* Tab pill */
  .tab-pill{
    padding:7px 18px;border-radius:99px;font-size:13px;font-weight:600;
    cursor:pointer;transition:all .2s;border:1.5px solid transparent;
    font-family:inherit;
  }

  /* CTA button */
  .cta-btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 28px;border-radius:12px;border:none;
    font-size:14px;font-weight:700;cursor:pointer;
    font-family:inherit;letter-spacing:.03em;
    transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s;
    position:relative;overflow:hidden;
  }
  .cta-btn:hover{ transform:translateY(-2px); box-shadow:0 10px 28px rgba(16,185,129,.38); }
  .cta-btn:active{ transform:scale(.97); }

  /* Section divider */
  .sect-divider{ height:1px;background:rgba(255,255,255,.07);border-radius:99px;margin:60px 0; }
  .sect-divider.light{ background:rgba(0,0,0,.07); }

  /* Accordion arrow */
  .arrow{ transition:transform .3s cubic-bezier(.22,1,.36,1); display:inline-block; }
  .arrow.open{ transform:rotate(180deg); }

  @media(max-width:640px){
    .feat-card{ padding:20px 18px; }
    .stats-grid{ grid-template-columns:1fr 1fr !important; }
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
      const horizon = h * 0.52,
        vp = { x: w / 2, y: horizon };
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
        const lx = vp.x - (spread / 2) * (j / rows),
          rx = vp.x + (spread / 2) * (j / rows);
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
        h = canvas.height,
        p = 0.5 + 0.5 * Math.sin(t * 0.5);
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

/* ── Animated stat counter ── */
function StatCounter({ target, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref} className="stat-val">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Data ── */
const FEATURES = [
  {
    icon: "📚",
    title: "Route Safety Mapping",
    desc: "Tracks the safest routes using community feedback and official data.",
    detail:
      "Our algorithm processes thousands of data points daily — reported incidents, crowd-sourced feedback, and official law enforcement data — to compute the safest path between any two points in the city.",
    tag: "Navigation",
  },
  {
    icon: "📍",
    title: "Safe Locations",
    desc: "Find police stations, hospitals, and other safe zones nearby.",
    detail:
      "A live-updated database of verified safe zones: police stations, hospitals, fire departments, and community shelters. Filter by type and get turn-by-turn directions instantly.",
    tag: "Discovery",
  },
  {
    icon: "🚨",
    title: "Emergency Alerts",
    desc: "Stay informed with real-time emergency alerts.",
    detail:
      "Push notifications powered by official city emergency feeds. Get alerts the moment something happens in your area, with clear guidance on the safest action to take.",
    tag: "Safety",
  },
];

const STATS = [
  { value: 52000, suffix: "+", label: "Routes mapped" },
  { value: 98, suffix: "%", label: "Report accuracy" },
  { value: 1200, suffix: "+", label: "Safe zones listed" },
  { value: 34, suffix: "k", label: "Active users" },
];

const MISSION_ITEMS = [
  {
    img: mapimage,
    text: "Maps & Routing",
    detail: "Real-time route computation using live safety data.",
  },
  {
    img: pinimage,
    text: "Safe Locations",
    detail: "Verified safe zone database updated daily.",
  },
  {
    img: helpimage,
    text: "Emergency Alerts",
    detail: "Instant notifications from official city feeds.",
  },
];

const AboutUs = () => {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [hoveredMission, setHoveredMission] = useState(null);

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
              position: "relative",
            }}
          >
            <Link
              to="/LandingPage2"
              style={{
                fontWeight: 800,
                fontSize: 20,
                color: t1,
                textDecoration: "none",
                letterSpacing: "-.5px",
              }}
            >
              Safe<span style={{ color: G }}>Yatra</span>
            </Link>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Mobile menu btn */}
              <button
                onClick={() => setMenuOpen((m) => !m)}
                style={{
                  display: "none",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: "transparent",
                  color: t1,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                className="menu-btn"
              >
                {menuOpen ? "Close" : "Menu"}
              </button>

              {/* Dark/light toggle */}
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
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  ...glass,
                  padding: "20px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  zIndex: 50,
                  animation: "scaleIn .2s cubic-bezier(.22,1,.36,1) both",
                }}
              >
                <Link
                  to="/how"
                  style={{
                    color: t2,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  to="/file"
                  style={{
                    color: t2,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  File a Report
                </Link>
                <Link
                  to="/about-us"
                  style={{
                    color: G,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
            )}
          </nav>

          {/* ── MAIN ── */}
          <main
            style={{
              flex: 1,
              maxWidth: 960,
              margin: "0 auto",
              width: "100%",
              padding: "12px 24px 80px",
            }}
          >
            {/* ── Hero ── */}
            <header
              className="fu"
              style={{ textAlign: "center", padding: "32px 0 52px" }}
            >
              <h1
                style={{
                  fontSize: "clamp(2rem,5vw,3rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: "0 0 14px",
                  letterSpacing: "-.04em",
                }}
              >
                About <span style={{ color: G }}>Us</span>
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: t2,
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto 28px",
                }}
              >
                We help you navigate safely through your city with real-time
                data, community intelligence, and instant emergency alerts.
              </p>
            </header>

            {/* ── Stats ── */}
            {/* <div className="fu1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 16, marginBottom: 64 }} >
              {STATS.map((s, i) => (
                <div key={i} style={{ borderRadius: 16, padding: '24px 20px', textAlign: 'center', ...glass, transition: 'border-color .25s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = border}
                >
                  <StatCounter target={s.value} suffix={s.suffix} />
                  <p style={{ fontSize: 12, color: t3, marginTop: 6, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
            </div> */}
            <div
              className="fu1"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: 16,
                marginBottom: 64,
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 16,
                    padding: "24px 20px",
                    textAlign: "center",
                    ...glass,
                    transition: "border-color .25s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(16,185,129,.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = border)
                  }
                >
                  <StatCounter target={s.value} suffix={s.suffix} />
                  <p
                    style={{
                      fontSize: 12,
                      color: t3,
                      marginTop: 6,
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Feature cards ── */}
            <div className="fu2" style={{ marginBottom: 12 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  color: G,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                What we offer
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.4rem,3vw,1.9rem)",
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  marginBottom: 32,
                }}
              >
                Built for your safety
              </h2>
            </div>

            <div
              className="fu3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: 18,
                marginBottom: 64,
              }}
            >
              {FEATURES.map((f, i) => {
                const isOpen = expanded === i;
                return (
                  <div
                    key={i}
                    className={`feat-card ${dark ? "dark" : "light"}`}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    {/* Tag */}
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: G,
                        background: "rgba(16,185,129,.1)",
                        padding: "3px 10px",
                        borderRadius: 99,
                        display: "inline-block",
                        marginBottom: 16,
                      }}
                    >
                      {f.tag}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        marginBottom: 14,
                      }}
                    >
                      <div className="icon-circle">
                        <span style={{ fontSize: 20 }}>{f.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: t1,
                            marginBottom: 6,
                            lineHeight: 1.3,
                          }}
                        >
                          {f.title}
                        </h3>
                        <p
                          style={{ fontSize: 13, color: t2, lineHeight: 1.65 }}
                        >
                          {f.desc}
                        </p>
                      </div>
                      <span
                        className={`arrow ${isOpen ? "open" : ""}`}
                        style={{
                          fontSize: 16,
                          color: t3,
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      >
                        ↓
                      </span>
                    </div>

                    {/* Expandable detail */}
                    <div className={`card-detail ${isOpen ? "open" : ""}`}>
                      <div
                        style={{
                          paddingTop: 12,
                          borderTop: `1px solid ${border}`,
                        }}
                      >
                        <p
                          style={{ fontSize: 13, color: t2, lineHeight: 1.75 }}
                        >
                          {f.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Divider ── */}
            <div className={`sect-divider ${dark ? "" : "light"}`} />

            {/* ── Mission ── */}
            <div className="fu4" style={{ marginBottom: 32 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  color: G,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Our mission
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.4rem,3vw,1.9rem)",
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  marginBottom: 14,
                }}
              >
                Safer cities through data
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: t2,
                  lineHeight: 1.8,
                  maxWidth: 580,
                  marginBottom: 36,
                }}
              >
                We aim to make urban navigation safer by combining real-time
                incident data with local community feedback — giving every
                citizen an informed, confident path through their city.
              </p>
            </div>

            <div
              className="fu5"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                gap: 18,
                marginBottom: 64,
              }}
            >
              {MISSION_ITEMS.map(({ img, text, detail }, i) => (
                <div
                  key={i}
                  className="img-card"
                  style={{
                    border: `1px solid ${hoveredMission === i ? "rgba(16,185,129,.35)" : border}`,
                    background: dark ? "rgba(15,28,50,.82)" : "#fff",
                    transition:
                      "border-color .25s, transform .25s, box-shadow .25s",
                    paddingBottom: 14,
                  }}
                  onMouseEnter={() => setHoveredMission(i)}
                  onMouseLeave={() => setHoveredMission(null)}
                >
                  {/* Image + overlay live inside img-wrap so overlay doesn't escape */}
                  <div className="img-wrap">
                    <img src={img} alt={text} />
                    <div className="overlay">
                      <div>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          {text}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,.8)",
                            lineHeight: 1.55,
                          }}
                        >
                          {detail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Text below image — never overlapped */}
                  <div style={{ padding: "12px 14px 0" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: t1 }}>
                      {text}
                    </p>
                    <p style={{ fontSize: 12, color: t3, marginTop: 4 }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div className={`sect-divider ${dark ? "" : "light"}`} />

            {/* ── Values ── */}
            <div
              className="fu6"
              style={{ textAlign: "center", padding: "0 0 16px" }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  color: G,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Our values
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.4rem,3vw,1.9rem)",
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  marginBottom: 40,
                }}
              >
                What drives us
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: "🔒",
                    title: "Privacy first",
                    desc: "All reports are encrypted. We never sell your data.",
                  },
                  {
                    icon: "🤝",
                    title: "Community-led",
                    desc: "Real safety intelligence comes from the people who live it.",
                  },
                  {
                    icon: "⚡",
                    title: "Always real-time",
                    desc: "Stale data is dangerous. Our feeds update every minute.",
                  },
                  {
                    icon: "🌍",
                    title: "Accessible to all",
                    desc: "Safety tools should be free and available to every citizen.",
                  },
                ].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 14,
                      padding: "24px 20px",
                      textAlign: "left",
                      ...glass,
                      transition: "border-color .25s,transform .2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(16,185,129,.3)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <span
                      style={{
                        fontSize: 24,
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      {v.icon}
                    </span>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: t1,
                        marginBottom: 8,
                      }}
                    >
                      {v.title}
                    </p>
                    <p style={{ fontSize: 13, color: t2, lineHeight: 1.65 }}>
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* ── FOOTER ── */}
          <footer
            style={{
              borderTop: `1px solid ${border}`,
              padding: "16px 32px",
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
            <span style={{ color: border }}>·</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
