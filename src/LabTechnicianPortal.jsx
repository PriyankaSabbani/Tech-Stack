import { useState, useEffect, useCallback } from "react";

// ─── THEME & CONSTANTS ───────────────────────────────────────────────────────
const PRIMARY = "#08306B";
const PRIMARY_DARK = "#051f47";
const PRIMARY_LIGHT = "#0d4a9e";
const ACCENT = "#1565C0";
const GOLD = "#FFC107";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Arial', sans-serif;
    background: #f0f4f8;
    color: #1a2332;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f0f4f8; }
  ::-webkit-scrollbar-thumb { background: #c8d8ee; border-radius: 3px; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.08); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-up   { animation: fadeSlideUp  0.45s ease both; }
  .animate-fade { animation: fadeIn       0.35s ease both; }
  .animate-right { animation: slideInRight 0.35s ease both; }

  .card-hover {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(8,48,107,0.18) !important;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: ${PRIMARY} !important;
    box-shadow: 0 0 0 3px rgba(8,48,107,0.1) !important;
  }

  .sidebar-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 18px;
    color: rgba(255,255,255,0.62);
    text-decoration: none;
    font-size: 0.855rem;
    font-weight: 500;
    border-radius: 0;
    cursor: pointer;
    position: relative;
    transition: color 0.18s, background 0.18s;
    border: none; background: transparent; width: 100%; text-align: left;
  }
  .sidebar-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .sidebar-link.active {
    color: #fff; background: rgba(255,255,255,0.13); font-weight: 600;
  }
  .sidebar-link.active::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: ${GOLD}; border-radius: 0 3px 3px 0;
  }
  .sidebar-link.logout { color: rgba(255,100,100,0.75); margin-top:2px; }
  .sidebar-link.logout:hover { color: #ff7070; background: rgba(220,60,60,0.1); }

  .tab-btn {
    padding: 8px 18px; border: none; background: transparent;
    font-size: 0.875rem; font-weight: 600; cursor: pointer;
    border-bottom: 3px solid transparent;
    color: #8a99ad; transition: color 0.18s, border-color 0.18s;
  }
  .tab-btn.active { color: ${PRIMARY}; border-bottom-color: ${PRIMARY}; }

  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 100px;
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .badge-good      { background: rgba(25,135,84,0.12);  color: #198754; }
  .badge-fair      { background: rgba(253,126,20,0.12); color: #c76300; }
  .badge-poor      { background: rgba(220,53,69,0.12);  color: #dc3545; }
  .badge-available { background: rgba(13,202,240,0.12); color: #0891b2; }
  .badge-issued    { background: rgba(8,48,107,0.12);   color: ${PRIMARY}; }
  .badge-returned  { background: rgba(25,135,84,0.12);  color: #198754; }
  .badge-overdue   { background: rgba(220,53,69,0.12);  color: #dc3545; }
  .badge-pending   { background: rgba(253,126,20,0.12); color: #c76300; }
  .badge-progress  { background: rgba(8,48,107,0.12);   color: ${PRIMARY}; }
  .badge-resolved  { background: rgba(25,135,84,0.12);  color: #198754; }
  .badge-high      { background: rgba(220,53,69,0.12);  color: #dc3545; }
  .badge-medium    { background: rgba(253,126,20,0.12); color: #c76300; }
  .badge-low       { background: rgba(13,202,240,0.12); color: #0891b2; }

  .progress-bar {
    height: 6px; border-radius: 3px; background: #e8eef5; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, ${PRIMARY}, ${ACCENT});
    transition: width 0.6s ease;
  }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .sidebar-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 899;
    }
  }
  @media print {
    .no-print { display: none !important; }
    body { background: white; }
  }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];

function Toast({ toasts, remove }) {
  const colors = { success: "#198754", danger: "#dc3545", warning: "#fd7e14", info: PRIMARY };
  const icons  = { success: "✓", danger: "✕", warning: "⚠", info: "ℹ" };
  return (
    <div style={{ position:"fixed", top:76, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} className="animate-right" style={{
          background:"white", borderLeft:`4px solid ${colors[t.type]}`,
          borderRadius:10, padding:"12px 16px",
          boxShadow:"0 4px 24px rgba(0,0,0,0.13)",
          display:"flex", alignItems:"center", gap:10,
          minWidth:260, maxWidth:340, fontSize:"0.875rem",
        }}>
          <span style={{ color:colors[t.type], fontWeight:700, fontSize:"1rem" }}>{icons[t.type]}</span>
          <span style={{ flex:1, color:"#1a2332" }}>{t.message}</span>
          <button onClick={() => remove(t.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#aab5c5", fontSize:"1.1rem", lineHeight:1 }}>×</button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);
  const remove = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}

// ─── SHARED LAYOUT ───────────────────────────────────────────────────────────
const MENU = [
  { key:"dashboard",   label:"Dashboard",             icon:"⊞" },
  { key:"inventory",   label:"Lab Equipment Inventory",icon:"⊡" },
  { key:"issue",       label:"Issue Equipment",        icon:"↗" },
  { key:"return",      label:"Equipment Return",       icon:"↙" },
  { key:"maintenance", label:"Maintenance Records",    icon:"⚙" },
  { key:"schedule",    label:"Lab Schedule",           icon:"◫" },
  { key:"damage",      label:"Damage Reports",         icon:"⚠" },
  { key:"reports",     label:"Reports",                icon:"▦" },
];

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
      <aside style={{
        width:252, background:PRIMARY_DARK,
        position:"fixed", top:62, left:0, bottom:0,
        overflowY:"auto", overflowX:"hidden",
        zIndex:900,
        borderRight:"1px solid rgba(255,255,255,0.06)",
        transition:"transform 0.25s ease",
        transform: mobileOpen ? "translateX(0)" : undefined,
      }}>
        <div style={{ padding:"18px 18px 6px", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"2px", color:"rgba(255,255,255,0.32)", fontWeight:600 }}>
          Main Menu
        </div>
        {MENU.slice(0,4).map(m => (
          <button key={m.key} className={`sidebar-link ${page===m.key?"active":""}`}
            onClick={() => { setPage(m.key); setMobileOpen(false); }}>
            <span style={{ width:20, textAlign:"center", fontSize:"1rem" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
        <div style={{ padding:"18px 18px 6px", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"2px", color:"rgba(255,255,255,0.32)", fontWeight:600 }}>
          Records
        </div>
        {MENU.slice(4).map(m => (
          <button key={m.key} className={`sidebar-link ${page===m.key?"active":""}`}
            onClick={() => { setPage(m.key); setMobileOpen(false); }}>
            <span style={{ width:20, textAlign:"center", fontSize:"1rem" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
        <div style={{ padding:"18px 18px 6px", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"2px", color:"rgba(255,255,255,0.32)", fontWeight:600 }}>
          Account
        </div>
        {/* eslint-disable-next-line no-restricted-globals */}
        <button className="sidebar-link logout" onClick={() => { if(confirm("Logout?")) setPage("login"); }}>
          <span style={{ width:20, textAlign:"center" }}>⇦</span> Logout
        </button>
      </aside>
    </>
  );
}

function Navbar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, height:62, zIndex:1000,
      background:`linear-gradient(90deg, ${PRIMARY_DARK}, ${PRIMARY})`,
      display:"flex", alignItems:"center", padding:"0 20px",
      boxShadow:"0 2px 16px rgba(0,0,0,0.28)",
      borderBottom:"1px solid rgba(255,255,255,0.08)",
    }}>
      <button className="no-print" onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:8, width:36, height:36, cursor:"pointer", color:"white", fontSize:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center", marginRight:12 }}>
        ☰
      </button>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:34, height:34, background:"rgba(255,255,255,0.15)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>⚗</div>
        <div>
<div style={{ fontFamily:"'Arial', sans-serif", color:"white", fontSize:"1rem", fontWeight:700, lineHeight:1.1 }}>LabPortal Pro</div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"1.5px" }}>Lab Technician Module</div>
        </div>
      </div>
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
        <button style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", color:"white", fontSize:"0.95rem", position:"relative" }}>
          🔔
          <span style={{ position:"absolute", top:-3, right:-3, width:16, height:16, background:GOLD, borderRadius:"50%", fontSize:"0.58rem", color:PRIMARY_DARK, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>3</span>
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", borderRadius:100, padding:"4px 12px 4px 4px", border:"1px solid rgba(255,255,255,0.14)", cursor:"pointer" }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:GOLD, display:"flex", alignItems:"center", justifyContent:"center", color:PRIMARY_DARK, fontSize:"0.72rem", fontWeight:700 }}>RT</div>
          <div>
            <div style={{ color:"white", fontSize:"0.78rem", fontWeight:600, lineHeight:1.1 }}>Ravi Technician</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.62rem" }}>Lab Technician</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function PageShell({ title, breadcrumb, actions, children }) {
  return (
    <div className="animate-up" style={{ padding:"24px" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
<h1 style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.7rem", color:PRIMARY, marginBottom:3, lineHeight:1.2 }}>{title}</h1>
          <div style={{ fontSize:"0.78rem", color:"#8a99ad" }}>{breadcrumb}</div>
        </div>
        {actions && <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{actions}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Card({ style={}, children, className="" }) {
  return (
    <div className={`card-hover ${className}`} style={{
      background:"white", borderRadius:14,
      boxShadow:"0 2px 12px rgba(8,48,107,0.09)",
      border:"1px solid #e8eef5", overflow:"hidden",
      ...style
    }}>{children}</div>
  );
}

function CardHeader({ title, icon, right }) {
  return (
    <div style={{ padding:"14px 18px", borderBottom:"1px solid #e8eef5", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, background:"linear-gradient(135deg,#fafcff,white)" }}>
<div style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.05rem", color:PRIMARY, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ color:ACCENT }}>{icon}</span> {title}
      </div>
      {right}
    </div>
  );
}

function Btn({ children, onClick, variant="primary", size="md", style={} }) {
  const bases = {
    primary:  { background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", border:"none" },
    success:  { background:"#198754", color:"white", border:"none" },
    danger:   { background:"rgba(220,53,69,0.1)", color:"#dc3545", border:"none" },
    warning:  { background:"rgba(255,193,7,0.12)", color:"#996600", border:"none" },
    outline:  { background:"white", color:PRIMARY, border:`2px solid ${PRIMARY}` },
    ghost:    { background:"transparent", color:"#8a99ad", border:"1px solid #e8eef5" },
  };
  const sizes = {
    sm: { padding:"5px 12px", fontSize:"0.75rem", borderRadius:7 },
    md: { padding:"8px 18px", fontSize:"0.82rem", borderRadius:8 },
    lg: { padding:"12px 28px", fontSize:"0.95rem", borderRadius:10 },
  };
  return (
    <button onClick={onClick} style={{
      ...bases[variant], ...sizes[size],
      cursor:"pointer", fontWeight:600, display:"inline-flex", alignItems:"center", gap:5,
      transition:"all 0.2s", letterSpacing:"0.3px",
      ...style
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.opacity="0.92"; }}
    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.opacity=""; }}>
      {children}
    </button>
  );
}

function Input({ label, type="text", value, onChange, placeholder, required, id, options }) {
  const base = {
    width:"100%", border:"2px solid #e8eef5", borderRadius:9, padding:"9px 12px",
fontSize:"0.875rem", fontFamily:"'Arial', sans-serif", background:"#fafcff",
    transition:"border-color 0.18s, box-shadow 0.18s", color:"#1a2332",
  };
  return (
    <div>
      {label && <label style={{ display:"block", fontSize:"0.72rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.8px", color:"#5a6a82", marginBottom:5 }}>{label}{required && <span style={{color:"#dc3545"}}> *</span>}</label>}
      {type==="select" ? (
        <select value={value} onChange={onChange} style={base} required={required}>
          {options?.map(o => <option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
        </select>
      ) : type==="textarea" ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} required={required} style={{ ...base, resize:"vertical" }} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} id={id} style={base} />
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color, sub }) {
  const colors = {
    blue:   { bg:"rgba(8,48,107,0.1)",   icon:PRIMARY,     bar:PRIMARY },
    green:  { bg:"rgba(25,135,84,0.1)",  icon:"#198754",   bar:"#198754" },
    orange: { bg:"rgba(253,126,20,0.1)", icon:"#fd7e14",   bar:"#fd7e14" },
    red:    { bg:"rgba(220,53,69,0.1)",  icon:"#dc3545",   bar:"#dc3545" },
  };
  const c = colors[color];
  return (
    <Card className="card-hover" style={{ padding:"18px 20px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:c.bar, borderRadius:"0 0 14px 14px" }} />
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:52, height:52, borderRadius:13, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0, color:c.icon }}>
          {icon}
        </div>
        <div>
<div style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.9rem", fontWeight:700, color:c.icon, lineHeight:1 }}>{value}</div>
          <div style={{ fontSize:"0.72rem", color:"#8a99ad", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px", marginTop:2 }}>{label}</div>
          {sub && <div style={{ fontSize:"0.7rem", color:"#aab5c5", marginTop:1 }}>{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

function Table({ cols, rows, emptyMsg="No records found." }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.key??c.label} style={{
                background:PRIMARY, color:"white", fontWeight:600, fontSize:"0.7rem",
                textTransform:"uppercase", letterSpacing:"0.8px", padding:"12px 14px",
                whiteSpace:"nowrap", textAlign:c.center?"center":"left",
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={cols.length} style={{ textAlign:"center", padding:"32px", color:"#aab5c5", fontSize:"0.875rem" }}>{emptyMsg}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} style={{ borderBottom:"1px solid #f0f4f8", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#f7faff"}
              onMouseLeave={e=>e.currentTarget.style.background=""}>
              {cols.map(c => (
                <td key={c.key??c.label} style={{ padding:"12px 14px", verticalAlign:"middle", color:"#2d3a4a", fontSize:"0.86rem", textAlign:c.center?"center":"left" }}>
                  {c.render ? c.render(row[c.key], row, i) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function FormSection({ title, icon, children, onSubmit, submitLabel="Submit" }) {
  return (
    <Card style={{ marginBottom:24 }}>
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif", display:"flex", alignItems:"center", gap:8 }}>
        {icon} {title}
      </div>
      <form onSubmit={onSubmit} style={{ padding:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
          {children}
        </div>
        <div style={{ marginTop:16 }}>
          <Btn variant="primary">{submitLabel}</Btn>
        </div>
      </form>
    </Card>
  );
}

const conditionBadge = c => {
  const m = { Good:"badge-good", Fair:"badge-fair", Poor:"badge-poor" };
  return <span className={`badge ${m[c]||"badge-fair"}`}>{c}</span>;
};

const statusBadge = s => {
  const m = { Issued:"badge-issued", Overdue:"badge-overdue", Returned:"badge-returned", Pending:"badge-pending", "In Progress":"badge-progress", Resolved:"badge-resolved", Scheduled:"badge-available", Ongoing:"badge-issued", Maintenance:"badge-fair" };
  return <span className={`badge ${m[s]||"badge-pending"}`}>{s}</span>;
};

const severityBadge = s => {
  const m = { High:"badge-high", Medium:"badge-medium", Low:"badge-low" };
  return <span className={`badge ${m[s]||"badge-medium"}`}>{s}</span>;
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim()) errs.email = "Email or username is required";
    if (!password.trim()) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1400);
  };

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 45%, ${ACCENT} 100%)`, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      {/* Decorative circles */}
      <div style={{ position:"absolute", top:"-20%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-25%", left:"-8%",  width:420, height:420, borderRadius:"50%", background:"rgba(255,255,255,0.03)", pointerEvents:"none" }} />

      {/* Nav */}
      <nav style={{ background:"rgba(255,255,255,0.07)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.1)", padding:"14px 28px", display:"flex", alignItems:"center", gap:12, zIndex:10 }}>
        <div style={{ width:40, height:40, background:"white", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:PRIMARY, fontSize:"1.2rem" }}>⚗</div>
        <div>
<div style={{ fontFamily:"'Arial', sans-serif", color:"white", fontSize:"1.15rem", fontWeight:700 }}>LabPortal Pro</div>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"2px" }}>Student Management System</div>
        </div>
        <div style={{ marginLeft:"auto", color:"rgba(255,255,255,0.5)", fontSize:"0.78rem" }}>🔒 Secure Access</div>
      </nav>

      {/* Main */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", zIndex:10 }}>
        <div style={{ width:"100%", maxWidth:920, display:"flex", gap:60, alignItems:"center", justifyContent:"center", flexWrap:"wrap" }}>

          {/* Left panel */}
          <div style={{ flex:1, minWidth:280, maxWidth:380, color:"white" }} className="animate-up hide-mobile">
            <div style={{ width:52, height:4, background:GOLD, borderRadius:2, marginBottom:24 }} />
<h1 style={{ fontFamily:"'Arial', sans-serif", fontSize:"2.4rem", lineHeight:1.15, marginBottom:16 }}>Lab Management Made Simple</h1>
            <p style={{ color:"rgba(255,255,255,0.62)", lineHeight:1.75, fontSize:"0.9rem", marginBottom:32 }}>
              Track equipment, manage student assignments, and maintain lab schedules — all in one unified college lab portal.
            </p>
            {[["⊡","Equipment Inventory","Real-time tracking of all lab assets"],["↗↙","Issue & Return","Seamless student equipment management"],["⚙","Maintenance Logs","Schedule and track all repairs & services"]].map(([ic,title,desc]) => (
              <div key={title} style={{ display:"flex", gap:12, marginBottom:16, alignItems:"flex-start" }}>
                <div style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1rem" }}>{ic}</div>
                <div>
                  <div style={{ fontWeight:600, marginBottom:2 }}>{title}</div>
                  <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.5)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="animate-up" style={{ background:"white", borderRadius:20, boxShadow:"0 24px 64px rgba(0,0,0,0.28)", width:"100%", maxWidth:420, overflow:"hidden", animationDelay:"0.1s" }}>
            <div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, padding:"28px 24px 20px", textAlign:"center", color:"white" }}>
              <div style={{ width:68, height:68, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"3px solid rgba(255,255,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:"2rem" }}>👤</div>
<h2 style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.5rem", marginBottom:4 }}>Lab Technician Login</h2>
              <p style={{ opacity:0.7, fontSize:"0.82rem" }}>Sign in to access your lab dashboard</p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding:"24px" }}>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:"0.72rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.8px", color:"#5a6a82", marginBottom:6 }}>Email / Username <span style={{color:"#dc3545"}}>*</span></label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#8a99ad", fontWeight:600 }}>U</span>
                  <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email or username"
                    style={{ width:"100%", border:`2px solid ${errors.email?"#dc3545":"#e8eef5"}`, borderRadius:9, padding:"10px 12px 10px 36px", fontSize:"0.875rem", background:"#fafcff" }} />
                </div>
                {errors.email && <div style={{ fontSize:"0.75rem", color:"#dc3545", marginTop:4 }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <label style={{ fontSize:"0.72rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.8px", color:"#5a6a82" }}>Password <span style={{color:"#dc3545"}}>*</span></label>
                  <button type="button" onClick={()=>{}} style={{ background:"none", border:"none", cursor:"pointer", color:ACCENT, fontSize:"0.8rem", fontWeight:500 }}>Forgot password?</button>
                </div>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#8a99ad", fontWeight:600 }}>P</span>
                  <input type={showPwd?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"
                    style={{ width:"100%", border:`2px solid ${errors.password?"#dc3545":"#e8eef5"}`, borderRadius:9, padding:"10px 40px 10px 36px", fontSize:"0.875rem", background:"#fafcff" }} />
                  <button type="button" onClick={()=>setShowPwd(!showPwd)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#8a99ad", fontSize:"0.9rem" }}>
                    {showPwd ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.password && <div style={{ fontSize:"0.75rem", color:"#dc3545", marginTop:4 }}>{errors.password}</div>}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
                <input type="checkbox" id="rem" style={{ accentColor:PRIMARY }} />
                <label htmlFor="rem" style={{ fontSize:"0.83rem", color:"#5a6a82" }}>Remember me for 30 days</label>
              </div>

              <button type="submit" disabled={loading} style={{
                width:"100%", background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`,
                border:"none", color:"white", padding:"12px", borderRadius:10,
                fontWeight:700, fontSize:"0.9rem", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                opacity:loading?0.85:1,
              }}>
                {loading ? <><span style={{ width:16, height:16, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"white", animation:"spin 0.7s linear infinite", display:"inline-block" }} />Authenticating...</> : <>→ Sign In to Dashboard</>}
              </button>

              <div style={{ marginTop:16, textAlign:"center", background:"#f7faff", border:"1px solid #e8eef5", borderRadius:9, padding:"11px", fontSize:"0.78rem", color:"#5a6a82" }}>
                ℹ️ Contact your <strong style={{color:PRIMARY}}>System Administrator</strong> if you're unable to login
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"12px", color:"rgba(255,255,255,0.32)", fontSize:"0.72rem", zIndex:10 }}>
        © 2025 LabPortal Pro · Student Management System
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ setPage, db }) {
  const inventory   = db?.inventory   || [];
  const issued      = db?.issued      || [];
  const maintenance = db?.maintenance || [];

  const totalEquipment     = inventory.reduce((a,c)=>a + (c.qty || 0), 0);
  const availableEquipment = inventory.reduce((a,c)=>a + (c.available || 0), 0);
  const issuedCount        = issued.filter(i=>i.status==="Issued" || i.status==="Overdue").length;
  const underMaintenance   = maintenance.filter(m=>m.status!=="Resolved").length;

  const recentIssued = issued.slice(0,3);

  const activity = [
    { color:"#198754", text:<>Rahul Sharma issued <strong>Digital Oscilloscope</strong></>, time:"09:32 AM · Electronics Lab" },
    { color:"#dc3545", text:<>Damage reported on <strong>Compound Microscope</strong></>,  time:"08:15 AM · Biology Lab" },
    { color:"#fd7e14", text:<>Maintenance scheduled for <strong>Centrifuge</strong></>,       time:"Yesterday · Biology Lab" },
    { color:PRIMARY,   text:<>Priya Patel returned <strong>Spectrophotometer</strong></>,     time:"Yesterday · Chemistry Lab" },
    { color:"#0dcaf0", text:<>5 new units added to <strong>Electronics Lab</strong></>,       time:"2 days ago" },
  ];

  return (
    <PageShell title="Dashboard" breadcrumb="Home / Dashboard"
      actions={<>
        <Btn variant="primary" size="sm">⬇ Export Report</Btn>
        <Btn variant="outline" size="sm">↺ Refresh</Btn>
      </>}>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:24 }}>
        <StatCard label="Total Equipment"       value={totalEquipment}     icon="⊡" color="blue"   sub="Across all labs" />
        <StatCard label="Available Equipment"   value={availableEquipment} icon="✓" color="green"  sub="Ready for issue" />
        <StatCard label="Issued Equipment"      value={issuedCount}        icon="↗" color="orange" sub="Currently out" />
        <StatCard label="Under Maintenance"     value={underMaintenance}   icon="⚙" color="red"    sub="Needs attention" />
      </div>

      {/* Quick Actions */}
      <Card style={{ marginBottom:24 }}>
        <CardHeader title="Quick Actions" icon="⚡" />
        <div style={{ padding:16, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 }}>
          {[["⊡","Add Equipment","inventory"],["↗","Issue Equipment","issue"],["⚙","Log Maintenance","maintenance"],["⚠","Report Damage","damage"]].map(([ic,label,pg]) => (
            <button key={label} onClick={() => setPage(pg)} style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              padding:"16px 10px", background:"#fafcff", border:"2px solid #e8eef5", borderRadius:10,
              cursor:"pointer", gap:8, transition:"all 0.2s", color:PRIMARY,
            }}
            onMouseEnter={e => { e.currentTarget.style.background=PRIMARY; e.currentTarget.style.color="white"; e.currentTarget.style.borderColor=PRIMARY; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(8,48,107,0.25)`; }}
            onMouseLeave={e => { e.currentTarget.style.background=""; e.currentTarget.style.color=PRIMARY; e.currentTarget.style.borderColor=""; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              <span style={{ fontSize:"1.5rem" }}>{ic}</span>
              <span style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20, marginBottom:24 }}>

        {/* Activity */}
        <Card>
          <CardHeader title="Recent Activity" icon="🕐" right={<span style={{fontSize:"0.78rem",color:ACCENT,cursor:"pointer"}}>View all →</span>} />
          <div style={{ padding:"4px 0" }}>
            {activity.map((a,i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:"12px 18px", borderBottom:i<activity.length-1?"1px solid #f0f4f8":"" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:a.color, marginTop:7, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.82rem", color:"#3a4a5c", lineHeight:1.4 }}>{a.text}</div>
<div style={{ fontSize:"0.7rem", color:"#aab5c5", fontFamily:"'Arial', sans-serif", marginTop:2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Lab Stats */}
        <Card>
          <CardHeader title="Equipment by Lab" icon="📊" right={<span className="badge badge-available">Live</span>} />
          <div style={{ padding:18 }}>
            {[["Electronics Lab","82 units",75,PRIMARY],["Biology Lab","96 units",88,"#198754"],["Chemistry Lab","70 units",64,"#fd7e14"]].map(([lab,units,pct,color])=>(
              <div key={lab} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:"0.84rem", fontWeight:600, color }}>{lab}</span>
                  <span style={{ fontSize:"0.78rem", color:"#8a99ad" }}>{units}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${color},${color}aa)` }} /></div>
              </div>
            ))}
            <div style={{ borderTop:"1px solid #e8eef5", paddingTop:14, marginTop:6, display:"flex", gap:20 }}>
              {[["74%","Good Condition","#198754"],["19%","Fair Condition","#fd7e14"],["7%","Poor / Repair","#dc3545"]].map(([pct,lbl,color])=>(
                <div key={lbl} style={{ textAlign:"center" }}>
<div style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.5rem", color, fontWeight:700 }}>{pct}</div>
                  <div style={{ fontSize:"0.65rem", color:"#8a99ad", textTransform:"uppercase", letterSpacing:"0.5px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Issued */}
      <Card>
        <CardHeader title="Recently Issued Equipment" icon="↗"
          right={<Btn size="sm" onClick={()=>setPage("issue")}>View All →</Btn>} />
        <Table
          cols={[
{ label:"Student",     key:"student",    render:(v,r)=><><strong>{v}</strong><br/><small style={{color:"#8a99ad",fontSize:"0.72rem",fontFamily:"'Arial', sans-serif"}}>{r.sid}</small></> },
            { label:"Equipment",   key:"equipment" },
            { label:"Lab",         key:"lab" },
            { label:"Issue Date",  key:"issueDate" },
            { label:"Return Date", key:"returnDate" },
            { label:"Status",      key:"status",     render:statusBadge },
          ]}
          rows={recentIssued}
        />
      </Card>
    </PageShell>
  );
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────
function Inventory({ toast, initialData }) {
  const [data, setData] = useState(initialData || []);
  const [search, setSearch] = useState("");
  const [labFilter, setLabFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", lab:"", qty:"", purchaseDate:"", condition:"Good", desc:"" });

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  const filtered = data.filter(d =>
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()) || d.lab.toLowerCase().includes(search.toLowerCase())) &&
    (!labFilter || d.lab === labFilter)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.lab || !form.qty) { toast.add("Please fill all required fields.", "danger"); return; }
    const newItem = { id:`EQ-00${data.length+1}`, name:form.name, lab:form.lab, qty:+form.qty, available:+form.qty, condition:form.condition };
    setData(p => [newItem, ...p]);
    setForm({ name:"", lab:"", qty:"", purchaseDate:"", condition:"Good", desc:"" });
    setShowForm(false);
    toast.add("Equipment added successfully!", "success");
  };

  // eslint-disable-next-line no-restricted-globals
  const deleteItem = (id) => { if(confirm(`Delete ${id}?`)) { setData(p=>p.filter(d=>d.id!==id)); toast.add("Equipment deleted.", "danger"); } };

  const labs = ["Electronics Lab","Biology Lab","Chemistry Lab","Physics Lab","Computer Lab"];
  const conditions = ["Good","Fair","Poor"];

  return (
    <PageShell title="Lab Equipment Inventory" breadcrumb="Home / Inventory"
      actions={<Btn onClick={()=>setShowForm(!showForm)}>+ {showForm?"Hide Form":"Add Equipment"}</Btn>}>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="Total Items"  value={data.reduce((a,c)=>a+c.qty,0)} icon="⊡" color="blue" />
        <StatCard label="Available"    value={data.reduce((a,c)=>a+c.available,0)} icon="✓" color="green" />
        <StatCard label="In Good Cond" value={data.filter(d=>d.condition==="Good").length} icon="★" color="orange" />
        <StatCard label="Needs Repair" value={data.filter(d=>d.condition==="Poor").length} icon="⚠" color="red" />
      </div>

      {/* Add Form */}
      {showForm && (
        <Card style={{ marginBottom:20 }} className="animate-up">
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif", display:"flex", alignItems:"center", gap:8 }}>
            ⊡ Add New Equipment
          </div>
          <form onSubmit={handleSubmit} style={{ padding:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:16 }}>
              <Input label="Equipment Name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Digital Oscilloscope" required />
              <Input label="Lab Name" type="select" value={form.lab} onChange={e=>setForm(p=>({...p,lab:e.target.value}))} required
                options={[{value:"",label:"Select Lab"},...labs.map(l=>({value:l,label:l}))]} />
              <Input label="Quantity" type="number" value={form.qty} onChange={e=>setForm(p=>({...p,qty:e.target.value}))} placeholder="0" required />
              <Input label="Purchase Date" type="date" value={form.purchaseDate} onChange={e=>setForm(p=>({...p,purchaseDate:e.target.value}))} />
              <Input label="Condition" type="select" value={form.condition} onChange={e=>setForm(p=>({...p,condition:e.target.value}))} options={conditions} />
              <Input label="Description" type="textarea" value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} placeholder="Notes..." />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="primary">+ Add Equipment</Btn>
              <Btn variant="ghost" onClick={()=>setShowForm(false)}>Cancel</Btn>
            </div>
          </form>
        </Card>
      )}

      {/* Table */}
      <Card>
        <CardHeader title="Equipment List" icon="⊞"
          right={
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#8a99ad", fontSize:"0.8rem" }}>🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{ border:"2px solid #e8eef5", borderRadius:8, padding:"7px 12px 7px 30px", fontSize:"0.82rem", width:200 }} />
              </div>
              <select value={labFilter} onChange={e=>setLabFilter(e.target.value)} style={{ border:"2px solid #e8eef5", borderRadius:8, padding:"7px 12px", fontSize:"0.82rem" }}>
                <option value="">All Labs</option>
                {labs.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
          }
        />
        <Table
          cols={[
{ label:"Equipment ID", key:"id",        render:v=><span style={{fontFamily:"'Arial', sans-serif",fontSize:"0.75rem",color:"#8a99ad"}}>{v}</span> },
            { label:"Equipment Name",key:"name",     render:v=><strong>{v}</strong> },
            { label:"Lab Name",     key:"lab" },
            { label:"Quantity",     key:"qty",       center:true, render:v=><strong>{v}</strong> },
            { label:"Available",    key:"available", center:true, render:v=><strong style={{color:v===0?"#dc3545":"#198754"}}>{v}</strong> },
            { label:"Condition",    key:"condition", render:conditionBadge },
            { label:"Actions",      key:"id",        render:(_,row)=>(
              <div style={{ display:"flex", gap:5 }}>
                <Btn size="sm" variant="warning" onClick={()=>toast.add(`Editing ${row.id}…`, "info")}>✏ Edit</Btn>
                <Btn size="sm" variant="danger" onClick={()=>deleteItem(row.id)}>🗑 Del</Btn>
              </div>
            )},
          ]}
          rows={filtered}
        />
        <div style={{ padding:"10px 16px", borderTop:"1px solid #e8eef5", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#fafcff" }}>
          <span style={{ fontSize:"0.78rem", color:"#8a99ad" }}>Showing {filtered.length} of {data.length} records</span>
          <div style={{ display:"flex", gap:6 }}>
            <Btn size="sm" variant="outline">← Prev</Btn>
            <Btn size="sm">Next →</Btn>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}

// ─── ISSUE EQUIPMENT ──────────────────────────────────────────────────────────
function IssueEquipment({ toast, initialIssued }) {
  const [issued, setIssued] = useState(initialIssued || []);
  const [tab, setTab] = useState("issue");
  const [returns, setReturns] = useState((initialIssued || []).map(i=>({...i})));
  const [form, setForm] = useState({ sid:"", student:"", equipment:"", lab:"", issueDate:today(), returnDate:"", notes:"" });

  const equipmentList = ["Digital Oscilloscope","Centrifuge Machine","Spectrophotometer","Microscope (Compound)","Function Generator","Bunsen Burner","Power Supply Unit"];
  const labs = ["Electronics Lab","Biology Lab","Chemistry Lab","Physics Lab"];

  useEffect(() => {
    setIssued(initialIssued || []);
    setReturns((initialIssued || []).map(i=>({...i})));
  }, [initialIssued]);

  const handleIssue = (e) => {
    e.preventDefault();
    if(!form.sid||!form.student||!form.equipment||!form.lab||!form.returnDate) { toast.add("Please fill all required fields.", "danger"); return; }
    const entry = { ...form, id:`ISS-00${issued.length+1}`, status:"Issued" };
    setIssued(p=>[entry,...p]);
    setReturns(p=>[{...entry},...p]);
    setForm({ sid:"", student:"", equipment:"", lab:"", issueDate:today(), returnDate:"", notes:"" });
    toast.add("Equipment issued successfully!", "success");
  };

  const markReturned = (idx) => {
    setReturns(p => p.map((r,i) => i===idx ? {...r, status:"Returned"} : r));
    toast.add("Equipment marked as returned!", "success");
  };

  return (
    <PageShell title="Issue & Return Equipment" breadcrumb="Home / Issue Equipment">
      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"2px solid #e8eef5", marginBottom:20 }}>
        <button className={`tab-btn ${tab==="issue"?"active":""}`} onClick={()=>setTab("issue")}>↗ Issue Equipment</button>
        <button className={`tab-btn ${tab==="return"?"active":""}`} onClick={()=>setTab("return")}>↙ Equipment Return</button>
      </div>

      {tab==="issue" && (
        <>
          <Card style={{ marginBottom:20 }} className="animate-up">
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif", display:"flex", alignItems:"center", gap:8 }}>
              📋 Issue Equipment to Student
            </div>
            <form onSubmit={handleIssue} style={{ padding:20 }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:16 }}>
                <Input label="Student ID" value={form.sid} onChange={e=>setForm(p=>({...p,sid:e.target.value}))} placeholder="e.g. STU-2022-001" required />
                <Input label="Student Name" value={form.student} onChange={e=>setForm(p=>({...p,student:e.target.value}))} placeholder="Full name" required />
                <Input label="Equipment Name" type="select" value={form.equipment} onChange={e=>setForm(p=>({...p,equipment:e.target.value}))} required
                  options={[{value:"",label:"Select Equipment"},...equipmentList.map(e=>({value:e,label:e}))]} />
                <Input label="Lab Name" type="select" value={form.lab} onChange={e=>setForm(p=>({...p,lab:e.target.value}))} required
                  options={[{value:"",label:"Select Lab"},...labs.map(l=>({value:l,label:l}))]} />
                <Input label="Issue Date" type="date" value={form.issueDate} onChange={e=>setForm(p=>({...p,issueDate:e.target.value}))} required />
                <Input label="Expected Return Date" type="date" value={form.returnDate} onChange={e=>setForm(p=>({...p,returnDate:e.target.value}))} required />
                <Input label="Notes / Purpose" type="textarea" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Reason for issuing..." />
              </div>
              <Btn variant="primary">✓ Issue Equipment</Btn>
            </form>
          </Card>

          <Card className="animate-up">
            <CardHeader title="Issued Equipment Records" icon="⊞"
              right={<Btn size="sm" variant="outline">⬇ Export</Btn>} />
            <Table
              cols={[
{ label:"Issue ID",   key:"id",        render:v=><span style={{fontFamily:"'Arial', sans-serif",fontSize:"0.75rem",color:"#8a99ad"}}>{v}</span> },
{ label:"Student",    key:"student",   render:(v,r)=><><strong>{v}</strong><br/><small style={{color:"#8a99ad",fontFamily:"'Arial', sans-serif",fontSize:"0.7rem"}}>{r.sid}</small></> },
                { label:"Equipment",  key:"equipment" },
                { label:"Lab",        key:"lab" },
                { label:"Issue Date", key:"issueDate" },
                { label:"Return Date",key:"returnDate" },
                { label:"Status",     key:"status",    render:statusBadge },
              ]}
              rows={issued}
            />
          </Card>
        </>
      )}

      {tab==="return" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12, marginBottom:20 }}>
            <StatCard label="Currently Issued" value={returns.filter(r=>r.status==="Issued").length}   icon="↗" color="blue" />
            <StatCard label="Overdue Returns"  value={returns.filter(r=>r.status==="Overdue").length}  icon="⏰" color="red" />
            <StatCard label="Returned Today"   value={returns.filter(r=>r.status==="Returned").length} icon="✓" color="green" />
          </div>

          <Card className="animate-up">
            <CardHeader title="Equipment Return Status" icon="↙"
              right={<Btn size="sm" variant="outline">⬇ Export</Btn>} />
            <Table
              cols={[
                { label:"Equipment",   key:"equipment" },
                { label:"Student",     key:"student" },
                { label:"Issue Date",  key:"issueDate" },
                { label:"Return Date", key:"returnDate" },
                { label:"Status",      key:"status",  render:statusBadge },
                { label:"Action",      key:"status",  render:(_,row,i)=> row.status==="Returned"
                  ? <span style={{color:"#8a99ad",fontSize:"0.78rem"}}>✓ Completed</span>
                  : <Btn size="sm" variant="success" onClick={()=>markReturned(i)}>✓ Mark Returned</Btn>
                },
              ]}
              rows={returns}
            />
          </Card>
        </>
      )}
    </PageShell>
  );
}

// ─── MAINTENANCE ──────────────────────────────────────────────────────────────
function Maintenance({ toast, initialRecords }) {
  const [records, setRecords] = useState(initialRecords || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ equipment:"", tech:"", date:today(), status:"Pending", problem:"" });

  const equipmentList = ["Digital Oscilloscope","Centrifuge Machine","Spectrophotometer","Microscope (Compound)","Function Generator","pH Meter","Bunsen Burner","Power Supply Unit"];
  const techs = ["Ravi Kumar","Suresh T.","Anand M."];

  useEffect(() => {
    setRecords(initialRecords || []);
  }, [initialRecords]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.equipment||!form.tech||!form.problem) { toast.add("Please fill all required fields.", "danger"); return; }
    setRecords(p=>[{ ...form }, ...p]);
    setForm({ equipment:"", tech:"", date:today(), status:"Pending", problem:"" });
    setShowForm(false);
    toast.add("Maintenance record added!", "success");
  };

  const resolve = (idx) => {
    setRecords(p=>p.map((r,i)=>i===idx?{...r,status:"Resolved"}:r));
    toast.add("Marked as resolved!", "success");
  };

  const pending    = records.filter(r=>r.status==="Pending").length;
  const inProgress = records.filter(r=>r.status==="In Progress").length;
  const resolved   = records.filter(r=>r.status==="Resolved").length;

  return (
    <PageShell title="Maintenance Records" breadcrumb="Home / Maintenance"
      actions={<Btn onClick={()=>setShowForm(!showForm)}>+ {showForm?"Hide":"Report Maintenance"}</Btn>}>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="Pending"     value={pending}    icon="⏳" color="orange" />
        <StatCard label="In Progress" value={inProgress} icon="⚙" color="blue" />
        <StatCard label="Resolved"    value={resolved}   icon="✓" color="green" />
        <StatCard label="Total"       value={records.length} icon="⊡" color="red" />
      </div>

      {showForm && (
        <Card style={{ marginBottom:20 }} className="animate-up">
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif", display:"flex", alignItems:"center", gap:8 }}>
            ⚙ Report Maintenance Issue
          </div>
          <form onSubmit={handleSubmit} style={{ padding:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:16 }}>
              <Input label="Equipment Name" type="select" value={form.equipment} onChange={e=>setForm(p=>({...p,equipment:e.target.value}))} required
                options={[{value:"",label:"Select Equipment"},...equipmentList.map(eq=>({value:eq,label:eq}))]} />
              <Input label="Technician Assigned" type="select" value={form.tech} onChange={e=>setForm(p=>({...p,tech:e.target.value}))} required
                options={[{value:"",label:"Select Technician"},...techs.map(t=>({value:t,label:t}))]} />
              <Input label="Date Reported" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required />
              <Input label="Initial Status" type="select" value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}
                options={["Pending","In Progress"]} />
              <Input label="Problem Description" type="textarea" value={form.problem} onChange={e=>setForm(p=>({...p,problem:e.target.value}))} placeholder="Describe the issue in detail..." required />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="primary">⚙ Submit Report</Btn>
              <Btn variant="ghost" onClick={()=>setShowForm(false)}>Cancel</Btn>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader title="Maintenance Log" icon="📋"
          right={<Btn size="sm" variant="outline">🖨 Print</Btn>} />
        <Table
          cols={[
            { label:"Equipment",    key:"equipment", render:v=><strong>{v}</strong> },
            { label:"Problem",      key:"problem",   render:v=><span style={{maxWidth:220,display:"inline-block"}}>{v}</span> },
            { label:"Date Reported",key:"date" },
            { label:"Status",       key:"status",    render:statusBadge },
            { label:"Technician",   key:"tech" },
            { label:"Action",       key:"status",    render:(_,row,i)=> row.status==="Resolved"
              ? <span style={{color:"#8a99ad",fontSize:"0.78rem"}}>✓ Done</span>
              : <Btn size="sm" variant="success" onClick={()=>resolve(i)}>✓ Resolve</Btn>
            },
          ]}
          rows={records}
        />
      </Card>
    </PageShell>
  );
}

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
function Schedule({ toast, initialSchedule }) {
  const [schedule, setSchedule] = useState(initialSchedule || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ lab:"", day:"", time:"", subject:"", faculty:"", students:"", status:"Scheduled" });

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const labs  = ["Electronics Lab","Biology Lab","Chemistry Lab","Physics Lab","Computer Lab"];
  const statuses = ["Scheduled","Ongoing","Cancelled","Maintenance"];

  useEffect(() => {
    setSchedule(initialSchedule || []);
  }, [initialSchedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.lab||!form.day||!form.subject) { toast.add("Please fill required fields.", "danger"); return; }
    setSchedule(p=>[{ ...form }, ...p]);
    setForm({ lab:"", day:"", time:"", subject:"", faculty:"", students:"", status:"Scheduled" });
    setShowForm(false);
    toast.add("Schedule entry added!", "success");
  };

  return (
    <PageShell title="Lab Schedule" breadcrumb="Home / Lab Schedule"
      actions={<Btn onClick={()=>setShowForm(!showForm)}>+ {showForm?"Hide":"Add Schedule"}</Btn>}>

      {showForm && (
        <Card style={{ marginBottom:20 }} className="animate-up">
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif" }}>
            ◫ Add Schedule Entry
          </div>
          <form onSubmit={handleSubmit} style={{ padding:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:16 }}>
              <Input label="Lab Name" type="select" value={form.lab} onChange={e=>setForm(p=>({...p,lab:e.target.value}))} required
                options={[{value:"",label:"Select Lab"},...labs.map(l=>({value:l,label:l}))]} />
              <Input label="Day" type="select" value={form.day} onChange={e=>setForm(p=>({...p,day:e.target.value}))} required
                options={[{value:"",label:"Select Day"},...days.map(d=>({value:d,label:d}))]} />
              <Input label="Time Slot" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} placeholder="e.g. 09:00–12:00" />
              <Input label="Subject / Class" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} placeholder="Subject name" required />
              <Input label="Faculty" value={form.faculty} onChange={e=>setForm(p=>({...p,faculty:e.target.value}))} placeholder="Prof. Name" />
              <Input label="Students" type="number" value={form.students} onChange={e=>setForm(p=>({...p,students:e.target.value}))} placeholder="Count" />
              <Input label="Status" type="select" value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))} options={statuses} />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="primary">+ Add Entry</Btn>
              <Btn variant="ghost" onClick={()=>setShowForm(false)}>Cancel</Btn>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader title="This Week's Lab Schedule" icon="◫"
          right={<Btn size="sm" variant="outline">🖨 Print</Btn>} />
        <Table
          cols={[
            { label:"Lab Name",     key:"lab",      render:v=><strong>{v}</strong> },
            { label:"Day",          key:"day" },
{ label:"Time",         key:"time",     render:v=><span style={{fontFamily:"'Arial', sans-serif",fontSize:"0.8rem"}}>{v}</span> },
            { label:"Subject / Class",key:"subject" },
            { label:"Faculty",      key:"faculty" },
            { label:"Students",     key:"students", center:true },
            { label:"Status",       key:"status",   render:statusBadge },
          ]}
          rows={schedule}
        />
      </Card>
    </PageShell>
  );
}

// ─── DAMAGE REPORTS ───────────────────────────────────────────────────────────
function DamageReports({ toast, initialDamage }) {
  const [records, setRecords] = useState(initialDamage || []);
  const [form, setForm] = useState({ equipment:"", reportedBy:"", description:"", date:today(), severity:"High" });

  const equipmentList = ["Digital Oscilloscope","Centrifuge Machine","Spectrophotometer","Microscope (Compound)","Function Generator","pH Meter","Bunsen Burner","Power Supply Unit"];

  useEffect(() => {
    setRecords(initialDamage || []);
  }, [initialDamage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.equipment||!form.reportedBy||!form.description) { toast.add("Please fill all required fields.", "danger"); return; }
    setRecords(p=>[{ ...form }, ...p]);
    setForm({ equipment:"", reportedBy:"", description:"", date:today(), severity:"High" });
    toast.add("Damage report submitted!", "warning");
  };

  return (
    <PageShell title="Damage Reports" breadcrumb="Home / Damage Reports">

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="High Severity"   value={records.filter(r=>r.severity==="High").length}   icon="🔴" color="red" />
        <StatCard label="Med Severity"    value={records.filter(r=>r.severity==="Medium").length} icon="🟠" color="orange" />
        <StatCard label="Low Severity"    value={records.filter(r=>r.severity==="Low").length}    icon="🟡" color="blue" />
        <StatCard label="Total Reports"   value={records.length}                                   icon="⚠" color="green" />
      </div>

      {/* Form */}
      <Card style={{ marginBottom:20 }}>
<div style={{ background:`linear-gradient(135deg,${PRIMARY},${PRIMARY_LIGHT})`, color:"white", padding:"12px 18px", fontSize:"0.95rem", fontFamily:"'Arial', sans-serif", display:"flex", alignItems:"center", gap:8 }}>
          ⚠ Submit Damage Report
        </div>
        <form onSubmit={handleSubmit} style={{ padding:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:16 }}>
            <Input label="Equipment Name" type="select" value={form.equipment} onChange={e=>setForm(p=>({...p,equipment:e.target.value}))} required
              options={[{value:"",label:"Select Equipment"},...equipmentList.map(eq=>({value:eq,label:eq}))]} />
            <Input label="Reported By" value={form.reportedBy} onChange={e=>setForm(p=>({...p,reportedBy:e.target.value}))} placeholder="Name of reporter" required />
            <Input label="Date of Damage" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required />
            <Input label="Severity Level" type="select" value={form.severity} onChange={e=>setForm(p=>({...p,severity:e.target.value}))}
              options={[{value:"High",label:"🔴 High — Non-functional"},{value:"Medium",label:"🟠 Medium — Partial"},{value:"Low",label:"🟡 Low — Minor"}]} />
            <Input label="Damage Description" type="textarea" value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="Describe the damage in detail..." required />
          </div>
          <Btn variant="danger" style={{ background:"#dc3545", color:"white", border:"none" }}>⚠ Submit Damage Report</Btn>
        </form>
      </Card>

      <Card>
        <CardHeader title="Damage Report Records" icon="📋"
          right={<Btn size="sm" variant="outline">⬇ Export</Btn>} />
        <Table
          cols={[
            { label:"Equipment",    key:"equipment",  render:v=><strong>{v}</strong> },
            { label:"Reported By",  key:"reportedBy" },
            { label:"Description",  key:"description",render:v=><span style={{maxWidth:220,display:"inline-block"}}>{v}</span> },
            { label:"Date",         key:"date" },
            { label:"Severity",     key:"severity",   render:severityBadge },
          ]}
          rows={records}
        />
      </Card>
    </PageShell>
  );
}

// ─── REPORTS ─────────────────────────────────────────────────────────────────
function Reports({ db }) {
  const inventory   = db?.inventory   || [];
  const issued      = db?.issued      || [];
  const maintenance = db?.maintenance || [];
  const damage      = db?.damage      || [];
  const usageData   = db?.usageData   || [];

  const totalEquipment = inventory.reduce((a,c)=>a + (c.qty || 0), 0);
  const totalIssued    = issued.length;
  const maintenanceCnt = maintenance.length;
  const damageCnt      = damage.length;

  const highDamage   = damage.filter(r=>r.severity==="High").length;
  const mediumDamage = damage.filter(r=>r.severity==="Medium").length;
  const lowDamage    = damage.filter(r=>r.severity==="Low").length;

  return (
    <PageShell title="Reports" breadcrumb="Home / Reports"
      actions={<>
        <Btn size="sm" onClick={()=>window.print()}>🖨 Print</Btn>
        <Btn size="sm" variant="success">📄 Export PDF</Btn>
        <Btn size="sm" variant="outline">📊 Export Excel</Btn>
      </>}>

      {/* Report header */}
      <Card style={{ marginBottom:20, textAlign:"center" }}>
        <div style={{ padding:"24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:8 }}>
            <div style={{ width:48, height:48, background:PRIMARY, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:"1.4rem" }}>⚗</div>
            <div style={{ textAlign:"left" }}>
<h3 style={{ fontFamily:"'Arial', sans-serif", color:PRIMARY, marginBottom:2 }}>LabPortal Pro — Lab Management Report</h3>
              <p style={{ color:"#8a99ad", fontSize:"0.8rem" }}>Generated: March 2025 · Electronics, Biology & Chemistry Labs</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12, marginBottom:24 }}>
        <StatCard label="Total Equipment" value={totalEquipment} icon="⊡" color="blue" />
        <StatCard label="Total Issued"    value={totalIssued}    icon="↗" color="orange" />
        <StatCard label="Maintenance"     value={maintenanceCnt} icon="⚙" color="red" />
        <StatCard label="Damage Reports"  value={damageCnt}      icon="⚠" color="green" />
      </div>

      {/* Equipment Usage */}
      <Card style={{ marginBottom:20 }}>
        <CardHeader title="Equipment Usage Summary" icon="📈" right={<span style={{fontSize:"0.78rem",color:"#8a99ad"}}>March 2025</span>} />
        <Table
          cols={[
            { label:"Equipment",    key:"name",    render:v=><strong>{v}</strong> },
            { label:"Lab",          key:"lab" },
            { label:"Total Qty",    key:"qty",     center:true },
            { label:"Times Issued", key:"issued",  center:true },
            { label:"Currently Out",key:"current", center:true },
            { label:"Utilization",  key:"util",    render:v=>(
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div className="progress-bar" style={{ flex:1, minWidth:80 }}><div className="progress-fill" style={{ width:`${v}%` }} /></div>
                <span style={{ fontSize:"0.75rem", color:"#8a99ad", width:32 }}>{v}%</span>
              </div>
            )},
          ]}
          rows={usageData}
        />
      </Card>

      {/* Maintenance Summary */}
      <Card style={{ marginBottom:20 }}>
        <CardHeader title="Maintenance Logs Summary" icon="⚙" />
        <Table
          cols={[
            { label:"Equipment",     key:"equipment", render:v=><strong>{v}</strong> },
            { label:"Issue",         key:"problem" },
            { label:"Reported",      key:"date" },
            { label:"Days Taken",    key:"days",   render:v=><span style={{fontWeight:600,color:v.includes("+")||+v>5?"#fd7e14":"#198754"}}>{v}</span> },
            { label:"Technician",    key:"tech" },
            { label:"Status",        key:"status", render:statusBadge },
          ]}
          rows={[
            { equipment:"pH Meter",             problem:"Calibration failure",    date:"2025-03-01", days:"9+ days", tech:"Ravi Kumar", status:"Pending" },
            { equipment:"Centrifuge Machine",   problem:"Unusual vibration",      date:"2025-03-03", days:"7+ days", tech:"Suresh T.",  status:"In Progress" },
            { equipment:"Digital Oscilloscope", problem:"Screen flickering",      date:"2025-02-25", days:"5 days",  tech:"Ravi Kumar", status:"Resolved" },
            { equipment:"Bunsen Burner",        problem:"Gas valve stuck",        date:"2025-03-05", days:"5+ days", tech:"Anand M.",   status:"Pending" },
          ]}
        />
      </Card>

      {/* Damage Summary */}
      <Card>
        <CardHeader title="Damage Reports Summary" icon="⚠" />
        <Table
          cols={[
            { label:"Equipment",   key:"equipment",  render:v=><strong>{v}</strong> },
            { label:"Reported By", key:"reportedBy" },
            { label:"Date",        key:"date" },
            { label:"Severity",    key:"severity",   render:severityBadge },
            { label:"Description", key:"description" },
          ]}
          rows={damage}
        />
        <div style={{ padding:"14px 18px", borderTop:"1px solid #e8eef5", background:"#fafcff", display:"flex", gap:32, justifyContent:"center" }}>
          {[
            [highDamage,  "High Severity",  "#dc3545"],
            [mediumDamage,"Medium Severity","#fd7e14"],
            [lowDamage,   "Low Severity",   "#0dcaf0"],
          ].map(([v,l,c])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Arial', sans-serif", fontSize:"1.75rem", color:c, fontWeight:700 }}>{v}</div>
              <div style={{ fontSize:"0.65rem", color:"#8a99ad", textTransform:"uppercase", letterSpacing:"0.5px" }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const toast = useToast();
  const [db, setDb] = useState(null);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/db.json");
        if (!res.ok) throw new Error("Failed to load db.json");
        const json = await res.json();
        setDb(json);
      } catch (e) {
        console.error(e);
        setDataError(e.message || "Failed to load data");
      }
    };
    loadData();
  }, []);

  if (page === "login") {
    return (
      <>
        <style>{globalCss}</style>
        <LoginPage onLogin={() => setPage("dashboard")} />
        <Toast toasts={toast.toasts} remove={toast.remove} />
      </>
    );
  }

  const pageMap = {
    dashboard:   <Dashboard setPage={setPage} db={db} />,
    inventory:   <Inventory toast={toast} initialData={db?.inventory || []} />,
    issue:       <IssueEquipment toast={toast} initialIssued={db?.issued || []} />,
    return:      <IssueEquipment toast={toast} initialIssued={db?.issued || []} />,
    maintenance: <Maintenance toast={toast} initialRecords={db?.maintenance || []} />,
    schedule:    <Schedule toast={toast} initialSchedule={db?.schedule || []} />,
    damage:      <DamageReports toast={toast} initialDamage={db?.damage || []} />,
    reports:     <Reports db={db} />,
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div style={{ marginLeft:252, marginTop:62, minHeight:"calc(100vh - 62px)" }}>
        {dataError && !db
          ? <div style={{ padding:24, color:"#dc3545" }}>Failed to load data: {dataError}</div>
          : (pageMap[page] || <Dashboard setPage={setPage} db={db} />)
        }
      </div>

      <Toast toasts={toast.toasts} remove={toast.remove} />
    </>
  );
}
