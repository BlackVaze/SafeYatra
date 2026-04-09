import React, { useState, useEffect, useRef } from 'react';

const G = '#10b981';

const CSS = `
  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
  @keyframes dotPop  { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.6);opacity:1} }

  *{box-sizing:border-box;margin:0;padding:0;}

  .sy{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
  .fu {animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
  .fu1{animation:fadeUp .5s .07s cubic-bezier(.22,1,.36,1) both;}
  .fu2{animation:fadeUp .5s .13s cubic-bezier(.22,1,.36,1) both;}
  .fu3{animation:fadeUp .5s .19s cubic-bezier(.22,1,.36,1) both;}
  .fu4{animation:fadeUp .5s .25s cubic-bezier(.22,1,.36,1) both;}
  .si {animation:scaleIn .32s cubic-bezier(.22,1,.36,1) both;}
  .dp {animation:dotPop 1.5s ease-in-out infinite;}

  .pill{transition:background .22s,border-color .22s,color .22s,transform .18s;}
  .pill:hover{transform:translateY(-1px);}
  .abtn{transition:border-color .2s,transform .15s,box-shadow .2s;cursor:pointer;}
  .abtn:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.25);}
  .abtn:active{transform:scale(.97);}
  .nbtn{transition:opacity .18s;cursor:pointer;}
  .nbtn:hover:not(:disabled){opacity:.82;}
  .pbar{transition:width .5s cubic-bezier(.22,1,.36,1);}
  .modebtn{transition:background .22s,border-color .22s,color .22s;}
  .langbtn{transition:background .18s,color .18s;}
  .stepdot{transition:background .3s;cursor:pointer;border:none;padding:0;}
  .stepline{transition:background .4s cubic-bezier(.22,1,.36,1);}

  @media(max-width:700px){
    .pill-row{flex-direction:column !important;}
    .pill{width:100% !important;flex:unset !important;justify-content:flex-start !important;}
    .detail-grid{grid-template-columns:140px 1fr !important;}
    .detail-left{padding:24px 16px !important;}
    .detail-right{padding:24px 20px !important;}
    .stepmap{display:none !important;}
    .action-grid{grid-template-columns:1fr !important;}
  }
  @media(min-width:701px) and (max-width:900px){
    .pill-row{flex-direction:column !important;}
    .pill{width:100% !important;flex:unset !important;}
    .action-grid{grid-template-columns:1fr 1fr !important;}
    .detail-grid{grid-template-columns:200px 1fr !important;}
  }
`;

function use3DCanvas(canvasRef, dark) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Perspective grid
    function drawGrid(t) {
      const w = canvas.width, h = canvas.height;
      const horizon = h * 0.52;
      const vp = { x: w / 2, y: horizon };
      const alpha = dark ? 0.15 : 0.09;
      const lineCol = dark ? '16,185,129' : '15,118,110';
      const cols = 14, rows = 10;
      const spread = w * 1.2;

      for (let i = 0; i <= cols; i++) {
        const x0 = vp.x - spread/2 + (spread/cols)*i;
        ctx.beginPath();
        ctx.moveTo(vp.x + (x0 - vp.x)*0.01, horizon);
        ctx.lineTo(x0, h + 40);
        const a = alpha + 0.05*Math.sin(t*0.4 + i*0.4);
        ctx.strokeStyle = `rgba(${lineCol},${Math.max(0,a)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let j = 1; j <= rows; j++) {
        const ep = Math.pow(j/rows, 2.2);
        const y  = horizon + (h + 40 - horizon)*ep;
        const lx = vp.x - (spread/2)*(j/rows);
        const rx = vp.x + (spread/2)*(j/rows);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.strokeStyle = `rgba(${lineCol},${alpha*(j/rows)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Glowing blobs
    function drawBlobs(t) {
      const w = canvas.width, h = canvas.height;
      const p = 0.5 + 0.5*Math.sin(t*0.5);
      const blobs = dark ? [
        {x:.15,y:.15,r:.35,c:'16,185,129',a:.10},
        {x:.85,y:.28,r:.28,c:'37,99,235',  a:.08},
        {x:.4, y:.78,r:.22,c:'124,58,237', a:.07},
      ] : [
        {x:.15,y:.15,r:.30,c:'16,185,129',a:.07},
        {x:.88,y:.25,r:.25,c:'37,99,235',  a:.05},
        {x:.45,y:.78,r:.20,c:'124,58,237', a:.04},
      ];
      for (const b of blobs) {
        const gr = ctx.createRadialGradient(b.x*w,b.y*h,0,b.x*w,b.y*h,b.r*Math.min(w,h)*(1+.07*p));
        gr.addColorStop(0, `rgba(${b.c},${b.a+.03*p})`);
        gr.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(0,0,w,h);
      }
    }

    // Wireframe rotating cube
    const VERTS = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const EDGES = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

    function project(v, rx, ry, cx, cy, size) {
      let [x,y,z] = v;
      // rotate Y
      let tx = x*Math.cos(ry) - z*Math.sin(ry);
      let tz = x*Math.sin(ry) + z*Math.cos(ry);
      x=tx; z=tz;
      // rotate X
      let ty = y*Math.cos(rx) - z*Math.sin(rx);
      tz = y*Math.sin(rx) + z*Math.cos(rx);
      y=ty; z=tz;
      const fov=5, d=fov/(fov+z+3);
      return [cx + x*size*d, cy + y*size*d];
    }

    const cubeStates = [
      {cx:.10,cy:.18,sz:22,rx:.3, ry:.6, drx:.007,dry:.011,col:dark?'16,185,129':'15,118,110',a:dark?.40:.22},
      {cx:.88,cy:.15,sz:16,rx:.8, ry:.2, drx:.009,dry:.007,col:dark?'37,99,235':'29,78,216', a:dark?.35:.18},
      {cx:.06,cy:.60,sz:13,rx:1.2,ry:.9, drx:.011,dry:.006,col:dark?'124,58,237':'109,40,217',a:dark?.30:.16},
      {cx:.92,cy:.55,sz:18,rx:.5, ry:1.1,drx:.008,dry:.009,col:dark?'16,185,129':'15,118,110',a:dark?.25:.14},
      {cx:.50,cy:.05,sz:11,rx:.1, ry:.4, drx:.013,dry:.005,col:dark?'16,185,129':'15,118,110',a:dark?.28:.15},
    ];

    function drawCubes() {
      for (const c of cubeStates) {
        c.rx += c.drx; c.ry += c.dry;
        const px = c.cx * canvas.width;
        const py = c.cy * canvas.height;
        ctx.strokeStyle = `rgba(${c.col},${c.a})`;
        ctx.lineWidth = 1.2;
        for (const [a,b] of EDGES) {
          const [ax,ay] = project(VERTS[a],c.rx,c.ry,px,py,c.sz);
          const [bx,by] = project(VERTS[b],c.rx,c.ry,px,py,c.sz);
          ctx.beginPath();
          ctx.moveTo(ax,ay);
          ctx.lineTo(bx,by);
          ctx.stroke();
        }
      }
    }

    // Floating particles
    const particles = Array.from({length:40},(_,i)=>({
      x:Math.random(), y:Math.random(),
      r:1.2+Math.random()*2,
      speed:0.0002+Math.random()*0.0004,
      phase:Math.random()*Math.PI*2,
      col: dark
        ? (i%5===0?'37,99,235': i%7===0?'124,58,237':'16,185,129')
        : (i%5===0?'29,78,216': i%7===0?'109,40,217':'15,118,110'),
      maxAlpha: dark ? 0.65 : 0.30,
    }));

    let t = 0;
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawBlobs(t);
      drawGrid(t);
      drawCubes();
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -0.02) p.y = 1.02;
        const alpha = (0.25 + 0.4*Math.sin(t*1.3+p.phase)) * (p.maxAlpha / 0.65);
        ctx.beginPath();
        ctx.arc(p.x*canvas.width, p.y*canvas.height, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.col},${Math.max(0,alpha)})`;
        ctx.fill();
      }
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [dark]);
}

function Background({ dark }) {
  const ref = useRef(null);
  use3DCanvas(ref, dark);
  return (
    <canvas ref={ref} style={{
      position:'absolute', inset:0, width:'100%', height:'100%',
      pointerEvents:'none', zIndex:0,
    }} />
  );
}

const STEPS = [
  {
    num:'01', title:'Open the search bar',
    detail:'Tap the search bar at the top of the map screen. A route planning dialog slides up, ready for your journey details.',
    tip:'You can also long-press any point on the map to instantly set it as your destination.',
    Icon:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    num:'02', title:'Enter starting point',
    detail:'Type your current location, a nearby landmark, or any address. Live suggestions appear as you type — tap one to confirm.',
    tip:'Tap "Use my location" to let SafeYatra auto-detect where you are using GPS.',
    Icon:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    num:'03', title:'Enter destination',
    detail:'Type where you want to go — city, neighbourhood, or full address. SafeYatra avoids high-risk zones while calculating.',
    tip:'Save frequent destinations like home or work for one-tap selection next time.',
    Icon:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  },
  {
    num:'04', title:'Get your safe route',
    detail:'SafeYatra computes the safest route using real-time safety data and displays it on the live map with turn-by-turn guidance.',
    tip:'Multiple route options are shown, each ranked by a safety score so you can choose what suits you.',
    Icon:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
];

const ACTIONS = [
  {
    id:'help', label:'Help',
    desc:'Sends an emergency alert with your live GPS location to every saved contact instantly.',
    accent:'#dc2626', bg:'rgba(220,38,38,.09)',
    Icon:()=><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  },
  {
    id:'contacts', label:'Contacts',
    desc:'Quick access to your emergency contacts list for one-tap calling without leaving the app.',
    accent:'#2563eb', bg:'rgba(37,99,235,.09)',
    Icon:()=><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    id:'police', label:'Police stations',
    desc:'Pins the nearest police stations on the live map so you always know where help is.',
    accent:'#7c3aed', bg:'rgba(124,58,237,.09)',
    Icon:()=><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
];

export default function HowItWorks() {
  const [dark, setDark]       = useState(true);
  const [active, setActive]   = useState(0);
  const [hovered, setHovered] = useState(null);

  const bg      = dark ? '#060d1a' : '#eef4f7';
  const surface = dark ? 'rgba(15,28,50,.82)' : '#ffffff';
  const surf2   = dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.02)';
  const border  = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.09)';
  const t1      = dark ? '#e8f4f0' : '#0f172a';
  const t2      = dark ? '#7fa898' : '#64748b';
  const t3      = dark ? '#3d5a52' : '#94a3b8';
  const Gsoft   = dark ? 'rgba(16,185,129,.1)' : 'rgba(16,185,129,.07)';

  const step = STEPS[active];
  const pct  = `${((active+1)/STEPS.length)*100}%`;

  const glass = {
    background: surface,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: `1px solid ${border}`,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="sy" style={{ background:bg, minHeight:'100vh', display:'flex', flexDirection:'column', color:t1, transition:'background .3s,color .3s', position:'relative', overflow:'hidden' }}>

        <Background dark={dark} />

        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', minHeight:'100vh' }}>

          {/* NAV */}
          <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 32px' }}>
            <a href="/LandingPage2" style={{ fontWeight:800, fontSize:20, color:t1, textDecoration:'none', letterSpacing:'-.5px' }}>
              Safe<span style={{ color:G }}>Yatra</span>
            </a>
            <button className="modebtn" onClick={() => setDark(d => !d)}
              style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:99,
                ...glass, color:t2, fontSize:13, cursor:'pointer' }}>
              <span style={{ fontSize:14 }}>{dark ? '🌙' : '☀️'}</span>
              {dark ? 'Dark' : 'Light'}
            </button>
          </nav>

          <main style={{ flex:1, maxWidth:920, margin:'0 auto', width:'100%', padding:'0 20px 64px' }}>

            {/* HERO */}
            <header style={{ textAlign:'center', padding:'32px 0 44px', maxWidth:560, margin:'0 auto' }}>
              <p className="fu" style={{ fontSize:11, fontWeight:700, letterSpacing:'.14em', color:G, textTransform:'uppercase', marginBottom:10 }}>How it works</p>
              <h1 className="fu1" style={{ fontSize:'clamp(1.7rem,4vw,2.5rem)', fontWeight:800, lineHeight:1.2, margin:'0 0 14px', letterSpacing:'-.03em' }}>
                Get directions in <span style={{ color:G }}>4 steps</span>
              </h1>
              <p className="fu2" style={{ fontSize:15, color:t2, lineHeight:1.75 }}>
                SafeYatra routes you through the safest path — not just the fastest. Select a step to learn more.
              </p>
            </header>

            {/* PROGRESS */}
            <div className="fu2" style={{ height:2, background:border, borderRadius:99, marginBottom:22, overflow:'hidden' }}>
              <div className="pbar" style={{ height:'100%', background:G, borderRadius:99, width:pct, boxShadow:`0 0 10px ${G}` }} />
            </div>

            {/* PILLS — vertical on mobile/tablet, row on desktop */}
            <div className="fu2 pill-row" style={{ display:'flex', flexDirection:'row', gap:8, marginBottom:22 }}>
              {STEPS.map((s,i) => {
                const done = i<active, on = i===active;
                return (
                  <button key={i} className="pill" onClick={() => setActive(i)}
                    style={{
                      display:'flex', alignItems:'center', gap:7,
                      padding:'9px 14px', borderRadius:12, flex:1,
                      border:`1.5px solid ${on ? G : done ? 'rgba(16,185,129,.4)' : border}`,
                      background: on ? Gsoft : surface,
                      backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
                      color: on ? G : done ? G : t2,
                      fontSize:13, fontWeight: on ? 700 : 500, cursor:'pointer',
                    }}>
                    <span style={{ width:20, height:20, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, fontWeight:800, flexShrink:0,
                      background: on ? G : done ? 'rgba(16,185,129,.25)' : border,
                      color: on ? '#fff' : done ? G : t2 }}>
                      {done ? '✓' : s.num}
                    </span>
                    <span style={{ display:'flex', alignItems:'center', gap:5, overflow:'hidden' }}>
                      <span style={{ display:'flex', opacity: on ? 1 : .5, flexShrink:0 }}><s.Icon /></span>
                      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* DETAIL CARD */}
            <div key={active} className="si fu3 detail-grid"
              style={{ display:'grid', gridTemplateColumns:'260px 1fr', borderRadius:20, overflow:'hidden', marginBottom:16, minHeight:280, ...glass }}>

              <div className="detail-left" style={{ background:surf2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 28px', gap:20, borderRight:`1px solid ${border}` }}>
                <div style={{ width:76, height:76, borderRadius:'50%', border:`2px solid ${border}`,
                  background: dark ? 'rgba(16,185,129,.06)' : '#fff',
                  display:'flex', alignItems:'center', justifyContent:'center', color:G, position:'relative',
                  boxShadow: dark ? '0 0 24px rgba(16,185,129,.2)' : 'none' }}>
                  <span style={{ transform:'scale(1.5)', display:'flex' }}><step.Icon /></span>
                  <div style={{ position:'absolute', inset:-8, borderRadius:'50%', border:`1px solid ${border}` }} />
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:10, fontWeight:700, color:t3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:6 }}>Step {step.num} of {STEPS.length}</p>
                  <p style={{ fontWeight:700, fontSize:16, color:t1, lineHeight:1.3 }}>{step.title}</p>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  {STEPS.map((_,i) => (
                    <button key={i} className={`stepdot${i===active?' dp':''}`} onClick={()=>setActive(i)}
                      style={{ width:i===active?20:7, height:7, borderRadius:99,
                        background:i===active?G:i<active?'rgba(16,185,129,.4)':border,
                        transition:'width .3s,background .3s',
                        boxShadow:i===active?`0 0 6px ${G}`:'none' }} />
                  ))}
                </div>
              </div>

              {/* <div className="detail-right" style={{ padding:'36px 32px', display:'flex', flexDirection:'column', justifyContent:'center', gap:18 }}>
                <p style={{ fontSize:15, lineHeight:1.82, color:t2 }}>{step.detail}</p>
                <div style={{ display:'flex', gap:11, alignItems:'flex-start', background:surf2, borderRadius:12, padding:'13px 15px', border:`1px solid ${border}` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:2 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <p style={{ fontSize:13, color:t2, lineHeight:1.65 }}>{step.tip}</p>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="nbtn" disabled={active===0} onClick={()=>setActive(a=>Math.max(0,a-1))}
                    style={{ flex:1, padding:'9px 0', borderRadius:10, border:`1px solid ${border}`,
                      background:'transparent', color:t1, fontSize:13, fontWeight:600,
                      opacity:active===0?.3:1, cursor:'pointer' }}>
                    ← Prev
                  </button>
                  <button className="nbtn" disabled={active===STEPS.length-1} onClick={()=>setActive(a=>Math.min(STEPS.length-1,a+1))}
                    style={{ flex:2, padding:'9px 0', borderRadius:10, border:'none',
                      background:G, color:'#fff', fontSize:13, fontWeight:700,
                      opacity:active===STEPS.length-1?.4:1, cursor:'pointer',
                      boxShadow:active===STEPS.length-1?'none':'0 4px 18px rgba(16,185,129,.4)' }}>
                    Next step →
                  </button>
                </div>
              </div> */}
              <div className="detail-right" style={{ padding:'28px 24px', display:'flex', flexDirection:'column', justifyContent:'center', gap:18, minHeight:220 }}>
  <p style={{ fontSize:15, lineHeight:1.82, color:t2 }}>{step.detail}</p>
  <div style={{ display:'flex', gap:11, alignItems:'flex-start', background:surf2, borderRadius:12, padding:'13px 15px', border:`1px solid ${border}` }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:2 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
    <p style={{ fontSize:13, color:t2, lineHeight:1.65 }}>{step.tip}</p>
  </div>
  <div style={{ display:'flex', gap:8 }}>
    <button className="nbtn" disabled={active===0} onClick={()=>setActive(a=>Math.max(0,a-1))}
      style={{ flex:1, padding:'9px 0', borderRadius:10, border:`1px solid ${border}`,
        background:'transparent', color:t1, fontSize:13, fontWeight:600,
        opacity:active===0?.3:1, cursor:'pointer' }}>
      ← Prev
    </button>
    <button className="nbtn" disabled={active===STEPS.length-1} onClick={()=>setActive(a=>Math.min(STEPS.length-1,a+1))}
      style={{ flex:2, padding:'9px 0', borderRadius:10, border:'none',
        background:G, color:'#fff', fontSize:13, fontWeight:700,
        opacity:active===STEPS.length-1?.4:1, cursor:'pointer',
        boxShadow:active===STEPS.length-1?'none':'0 4px 18px rgba(16,185,129,.4)' }}>
      Next step →
    </button>
  </div>
</div>
            </div>

            {/* STEP MAP */}
            <div className="stepmap fu3"
              style={{ display:'flex', alignItems:'center', borderRadius:16, padding:'20px 28px', marginBottom:40, ...glass }}>
              {STEPS.map((s,i) => (
                <React.Fragment key={i}>
                  <button onClick={()=>setActive(i)}
                    style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', padding:'0 8px', flex:'0 0 auto' }}>
                    <div style={{ width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                      background:i<=active?G:border, color:i<=active?'#fff':t3,
                      border:i===active?`2px solid ${G}`:'2px solid transparent', boxSizing:'border-box',
                      transition:'background .3s', boxShadow:i<=active?'0 0 14px rgba(16,185,129,.35)':'none' }}>
                      {i<active
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : <s.Icon />}
                    </div>
                    <span style={{ fontSize:11, color:i===active?t1:t3, fontWeight:i===active?600:400, whiteSpace:'nowrap' }}>{s.title}</span>
                  </button>
                  {i<STEPS.length-1 && (
                    <div className="stepline" style={{ flex:1, height:1.5, background:i<active?G:border, margin:'0 4px 20px',
                      boxShadow:i<active?`0 0 5px ${G}`:'none' }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="fu4">
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <p style={{ fontSize:11, fontWeight:700, color:t3, letterSpacing:'.1em', textTransform:'uppercase' }}>Additional buttons</p>
                <div style={{ flex:1, height:1, background:border }} />
              </div>
              <div className="action-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:12 }}>
                {ACTIONS.map(a => (
                  <div key={a.id} className="abtn"
                    onMouseEnter={()=>setHovered(a.id)}
                    onMouseLeave={()=>setHovered(null)}
                    style={{ borderRadius:16, ...glass,
                      border:`1px solid ${hovered===a.id?a.accent:border}`,
                      background:hovered===a.id?a.bg:surface,
                      padding:'20px 18px' }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:a.bg, display:'flex', alignItems:'center', justifyContent:'center', color:a.accent, marginBottom:14 }}>
                      <a.Icon />
                    </div>
                    <p style={{ fontWeight:700, fontSize:14, marginBottom:6, color:t1 }}>{a.label}</p>
                    <p style={{ fontSize:13, color:t2, lineHeight:1.65 }}>{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <footer style={{ borderTop:`1px solid ${border}`, padding:'14px 32px', display:'flex', justifyContent:'center', alignItems:'center', gap:20, flexWrap:'wrap', fontSize:12, color:t3 }}>
            <span>© 2025 SafeYatra. All rights reserved.</span>
          </footer>
        </div>
      </div>
    </>
  );
}