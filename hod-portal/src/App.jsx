import { useState, useEffect, useContext, createContext } from "react";

// ─── DATA FETCHING HOOK ───────────────────────────────────────────────────────
// Reads everything from /db.json at runtime — nothing is hardcoded here.
function useDB() {
  const [db, setDb]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load db.json (HTTP ${res.status})`);
        return res.json();
      })
      .then(data => { setDb(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  return { db, loading, error };
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
const RouterCtx = createContext(null);
function Router({ children }) {
  const [path, setPath] = useState(window.location.hash.replace("#", "") || "/login");
  const navigate = (to) => { window.location.hash = to; setPath(to); };
  useEffect(() => {
    const h = () => setPath(window.location.hash.replace("#", "") || "/login");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return <RouterCtx.Provider value={{ path, navigate }}>{children}</RouterCtx.Provider>;
}
function useNavigate() { return useContext(RouterCtx).navigate; }
function useLocation()  { return useContext(RouterCtx).path; }

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthCtx = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login  = (u) => setUser(u);
  const logout = ()  => setUser(null);
  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}
function useAuth() { return useContext(AuthCtx); }

// ─── DB CONTEXT (share loaded data across all pages) ─────────────────────────
const DBCtx = createContext(null);
function useDBCtx() { return useContext(DBCtx); }

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = {
  Eye:       ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Mail:      ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Lock:      ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Dashboard: ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Faculty:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Attend:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Materials: ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Results:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Bell:      ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Logout:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Menu:      ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:     ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Upload:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  Download:  ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>,
  Shield:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  GradCap:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Check:     ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Warning:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Spinner:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #08306B;
  --bg2:       #0a3d80;
  --bg3:       #0c4899;
  --bg4:       #1056b0;
  --border:    rgba(255,255,255,0.12);
  --border2:   rgba(255,255,255,0.20);
  --gold:      #f0c040;
  --gold2:     #f7d870;
  --gold-dim:  rgba(240,192,64,0.15);
  --gold-bdr:  rgba(240,192,64,0.35);
  --sky:       #7dd3fc;
  --sky-dim:   rgba(125,211,252,0.12);
  --sky-bdr:   rgba(125,211,252,0.35);
  --white:     #f0f6ff;
  --muted:     #93b8d8;
  --muted2:    #bbd4ea;
  --red:       #f87171;
  --green:     #4ade9a;
  --purple:    #c4b5fd;
  --sidebar:   240px;
  --topbar:    66px;
  --r:         14px;
  --r-sm:      9px;
}

html, body, #root { height: 100%; }
body { font-family: Arial, sans-serif; background: var(--bg); color: var(--white); -webkit-font-smoothing: antialiased; }
h1,h2,h3,h4 { font-family: Arial, sans-serif; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 3px; }

/* ── LOADING / ERROR SCREEN ── */
.screen-center {
  height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: var(--bg);
}
.spin-icon { width: 36px; height: 36px; color: var(--gold); animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.screen-msg { font-size: 15px; color: var(--muted); }
.screen-err { font-size: 14px; color: var(--red); background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3); padding: 16px 24px; border-radius: var(--r-sm); max-width: 400px; text-align: center; }

/* ══════════════════════════════
   LOGIN
══════════════════════════════ */
.login-root {
  min-height: 100vh; display: grid;
  grid-template-columns: 1fr 1fr; overflow: hidden;
}
@media(max-width:820px){ .login-root { grid-template-columns: 1fr; } }

.login-left {
  position: relative;
  background: linear-gradient(145deg, #08306B 0%, #0a3d80 50%, #0c4899 100%);
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 48px; overflow: hidden;
}
@media(max-width:820px){ .login-left { display: none; } }

.login-left::before {
  content: ''; position: absolute; top: -120px; right: -120px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(240,192,64,0.10) 0%, transparent 70%);
  pointer-events: none;
}
.login-left::after {
  content: ''; position: absolute; bottom: -80px; left: -80px;
  width: 380px; height: 380px; border-radius: 50%;
  background: radial-gradient(circle, rgba(125,211,252,0.09) 0%, transparent 70%);
  pointer-events: none;
}
.geo-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}

.login-brand { position: relative; z-index: 2; }
.brand-badge { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 48px; }
.brand-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, var(--gold), #c8920a);
  display: flex; align-items: center; justify-content: center;
  font-family: Arial, sans-serif; font-weight: 900; font-size: 18px;
  color: #08306B; box-shadow: 0 8px 32px rgba(240,192,64,0.45);
}
.brand-name { font-size: 20px; font-weight: 700; color: var(--white); }
.brand-tag  { font-size: 12px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }

.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; text-transform: uppercase; letter-spacing: 2px;
  color: var(--sky); margin-bottom: 20px; font-weight: 600;
}
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sky); animation: pulse-dot 2s ease-in-out infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

.hero-h1 {
  font-size: clamp(34px, 4vw, 50px); font-weight: 900; line-height: 1.1;
  color: var(--white); margin-bottom: 20px; letter-spacing: -0.5px;
}
.hero-h1 span { color: var(--gold); }
.hero-p { font-size: 15px; color: var(--muted2); line-height: 1.7; max-width: 380px; font-weight: 300; }

.login-features { margin-top: 48px; position: relative; z-index: 2; }
.feat-item { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid var(--border); }
.feat-item:last-child { border-bottom: 1px solid var(--border); }
.feat-icon { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.feat-icon svg { width: 16px; height: 16px; }
.fi-gold { background: var(--gold-dim); color: var(--gold); }
.fi-sky  { background: var(--sky-dim);  color: var(--sky);  }
.fi-pur  { background: rgba(196,181,253,0.12); color: var(--purple); }
.feat-label { font-size: 13px; color: var(--muted2); }
.feat-label strong { color: var(--white); font-weight: 600; }
.login-footer-txt { position: relative; z-index: 2; font-size: 12px; color: var(--muted); }

/* RIGHT */
.login-right {
  background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  padding: 48px 40px; position: relative;
}
.login-right::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}

.login-form-wrap {
  width: 100%; max-width: 420px; position: relative; z-index: 1;
  animation: slideIn 0.5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes slideIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

.login-form-header { margin-bottom: 32px; }
.lf-eyebrow {
  font-size: 11px; text-transform: uppercase; letter-spacing: 2px;
  color: var(--sky); font-weight: 600; margin-bottom: 12px;
  display: flex; align-items: center; gap: 6px;
}
.lf-eyebrow svg { width: 13px; height: 13px; }
.lf-title { font-size: 30px; font-weight: 900; color: var(--white); line-height: 1.15; }
.lf-title span { color: var(--gold); }
.lf-sub { font-size: 14px; color: var(--muted); margin-top: 8px; line-height: 1.5; }

.cred-hint {
  background: var(--sky-dim); border: 1px solid var(--sky-bdr);
  border-radius: var(--r-sm); padding: 12px 16px;
  margin-bottom: 26px; display: flex; gap: 10px; align-items: flex-start;
}
.cred-hint svg { width: 14px; height: 14px; color: var(--sky); flex-shrink: 0; margin-top: 2px; }
.cred-hint-text { font-size: 12px; color: var(--muted2); line-height: 1.6; }
.cred-hint-text strong { color: var(--sky); font-weight: 600; }

.field { margin-bottom: 18px; }
.field-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 7px; }
.field-wrap {
  position: relative; border: 1px solid var(--border2);
  border-radius: var(--r-sm); overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: rgba(255,255,255,0.04);
}
.field-wrap:focus-within { border-color: var(--gold-bdr); box-shadow: 0 0 0 3px rgba(240,192,64,0.10); }
.field-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; transition: color 0.2s; }
.field-ico svg { width: 17px; height: 17px; }
.field-wrap:focus-within .field-ico { color: var(--gold); }
.field-input {
  width: 100%; padding: 14px 44px;
  background: none; border: none; outline: none;
  color: var(--white); font-size: 14px; font-family: Arial, sans-serif;
}
.field-input::placeholder { color: var(--muted); }
.field-eye {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: var(--muted);
  cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color 0.15s;
}
.field-eye:hover { color: var(--white); }
.field-eye svg { width: 17px; height: 17px; }
.field-err { font-size: 12px; color: var(--red); margin-top: 5px; display: flex; align-items: center; gap: 5px; }
.field-err svg { width: 13px; height: 13px; }

.global-err {
  background: rgba(248,113,113,0.10); border: 1px solid rgba(248,113,113,0.30);
  border-radius: var(--r-sm); padding: 12px 16px; color: var(--red);
  font-size: 13px; display: flex; align-items: center; gap: 8px;
  margin-bottom: 18px; animation: shake 0.4s ease;
}
.global-err svg { width: 16px; height: 16px; flex-shrink: 0; }
@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }

.login-btn {
  width: 100%; padding: 15px;
  background: linear-gradient(135deg, var(--gold), #c8920a);
  border: none; border-radius: var(--r-sm);
  color: #08306B; font-size: 15px; font-weight: 700;
  font-family: Arial, sans-serif; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px;
  margin-top: 26px; position: relative; overflow: hidden;
  box-shadow: 0 6px 24px rgba(240,192,64,0.35);
}
.login-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(240,192,64,0.45); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.login-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%); transition: transform 0.5s ease;
}
.login-btn:hover::before { transform: translateX(100%); }
.login-spinner { width: 18px; height: 18px; border: 2px solid rgba(8,48,107,0.3); border-top-color: #08306B; border-radius: 50%; animation: spin 0.7s linear infinite; }

.lf-footer {
  margin-top: 28px; padding-top: 22px; border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
}
.lf-footer span { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 5px; }
.lf-footer svg { width: 12px; height: 12px; color: var(--green); }

.success-wrap { text-align: center; padding: 32px; }
.success-circle {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, var(--green), #22c55e);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; animation: pop 0.4s cubic-bezier(.16,1,.3,1) both;
  box-shadow: 0 8px 32px rgba(74,222,154,0.35);
}
.success-circle svg { width: 32px; height: 32px; color: white; }
@keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
.success-title { font-size: 18px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
.success-sub   { font-size: 14px; color: var(--muted); }

/* ══════════════════════════════
   DASHBOARD SHELL
══════════════════════════════ */
.app { display: flex; height: 100vh; overflow: hidden; }

.sidebar {
  width: var(--sidebar); min-width: var(--sidebar);
  background: var(--bg2); border-right: 1px solid var(--border);
  display: flex; flex-direction: column; height: 100vh; z-index: 200;
  transition: transform 0.3s ease;
}
.sb-logo { padding: 22px 20px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
.sb-logo-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, var(--gold), #c8920a);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 14px; color: #08306B; flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(240,192,64,0.35);
}
.sb-logo-text .t1 { font-size: 14px; font-weight: 700; color: var(--white); }
.sb-logo-text .t2 { font-size: 10px; color: var(--muted); letter-spacing: 0.8px; margin-top: 1px; }

.sb-dept { padding: 14px 18px; background: var(--gold-dim); border-bottom: 1px solid var(--gold-bdr); }
.sb-dept-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); font-weight: 700; }
.sb-dept-name  { font-size: 12px; color: var(--white); font-weight: 600; margin-top: 3px; line-height: 1.3; }

.sb-nav { flex: 1; padding: 16px 10px; overflow-y: auto; }
.sb-section-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); padding: 8px 10px 5px; font-weight: 700; }
.sb-item {
  display: flex; align-items: center; gap: 11px;
  padding: 11px 12px; border-radius: var(--r-sm);
  cursor: pointer; color: var(--muted); font-size: 13.5px; font-weight: 500;
  transition: all 0.15s; margin-bottom: 2px;
  border: 1px solid transparent; position: relative;
}
.sb-item:hover { background: rgba(255,255,255,0.06); color: var(--white); }
.sb-item.active { background: var(--gold-dim); color: var(--gold); border-color: var(--gold-bdr); }
.sb-item.active::before { content:''; position:absolute; left:0; top:25%; bottom:25%; width:3px; background:var(--gold); border-radius:0 3px 3px 0; }
.sb-item-icon { width: 17px; height: 17px; flex-shrink: 0; }
.sb-item-icon svg { width: 17px; height: 17px; }

.sb-foot { padding: 14px 10px; border-top: 1px solid var(--border); }
.sb-profile {
  display: flex; align-items: center; gap: 10px; padding: 10px;
  border-radius: var(--r-sm); margin-bottom: 8px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
}
.sb-avatar {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #4a90d9, var(--purple));
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: white;
}
.sb-profile-name { font-size: 12.5px; font-weight: 600; color: var(--white); }
.sb-profile-role { font-size: 10px; color: var(--muted); margin-top: 1px; }
.sb-logout {
  display: flex; align-items: center; gap: 9px; width: 100%;
  padding: 10px 12px; border-radius: var(--r-sm);
  background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);
  color: var(--red); font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.15s; font-family: Arial, sans-serif;
}
.sb-logout:hover { background: rgba(248,113,113,0.16); }
.sb-logout svg { width: 15px; height: 15px; }

.topbar {
  height: var(--topbar); background: var(--bg2);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; padding: 0 26px; gap: 14px; flex-shrink: 0;
}
.topbar-menu {
  width: 34px; height: 34px; border-radius: 8px;
  background: none; border: 1px solid var(--border2);
  color: var(--muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.15s;
}
.topbar-menu:hover { background: rgba(255,255,255,0.06); color: var(--white); }
.topbar-menu svg { width: 17px; height: 17px; }
.topbar-title { flex: 1; }
.topbar-page  { font-size: 18px; font-weight: 700; color: var(--white); }
.topbar-crumb { font-size: 11.5px; color: var(--muted); margin-top: 2px; }
.topbar-actions { display: flex; align-items: center; gap: 8px; }
.topbar-notif {
  width: 36px; height: 36px; border-radius: 9px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border);
  color: var(--muted); cursor: pointer; position: relative;
  display: flex; align-items: center; justify-content: center; transition: all 0.15s;
}
.topbar-notif:hover { color: var(--white); background: rgba(255,255,255,0.08); }
.topbar-notif svg { width: 17px; height: 17px; }
.notif-pip { position: absolute; top: 8px; right: 8px; width: 7px; height: 7px; border-radius: 50%; background: var(--gold); border: 2px solid var(--bg2); }
.topbar-user {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 12px 6px 6px; border-radius: 30px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border);
}
.topbar-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #4a90d9, var(--purple)); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: white; }
.topbar-uname  { font-size: 12.5px; font-weight: 600; color: var(--white); }

.main-wrap { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.content   { flex: 1; overflow-y: auto; padding: 28px; background: var(--bg); }

.pg-head { margin-bottom: 28px; }
.pg-head h2 { font-size: 26px; font-weight: 900; color: var(--white); letter-spacing: -0.3px; }
.pg-head p  { font-size: 14px; color: var(--muted); margin-top: 5px; }

/* STAT CARDS */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; margin-bottom: 28px; }
.stat-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--r); padding: 22px;
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: fadeUp 0.45s ease both;
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.35); }
.stat-card::after { content:''; position:absolute; top:0; left:0; right:0; height:2px; }
.sc-gold::after   { background: linear-gradient(90deg, var(--gold), var(--gold2)); }
.sc-sky::after    { background: linear-gradient(90deg, var(--sky), #bae6fd); }
.sc-green::after  { background: linear-gradient(90deg, var(--green), #86efb8); }
.sc-purple::after { background: linear-gradient(90deg, var(--purple), #ddd6fe); }
.sc-red::after    { background: linear-gradient(90deg, var(--red), #fca5a5); }

.stat-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
.stat-ico  { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.stat-ico svg { width: 21px; height: 21px; }
.sic-gold   { background: var(--gold-dim);             color: var(--gold);   }
.sic-sky    { background: var(--sky-dim);              color: var(--sky);    }
.sic-green  { background: rgba(74,222,154,0.12);       color: var(--green);  }
.sic-purple { background: rgba(196,181,253,0.12);      color: var(--purple); }
.sic-red    { background: rgba(248,113,113,0.12);      color: var(--red);    }

.stat-badge { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.3px; }
.sb-up   { background: rgba(74,222,154,0.15);  color: var(--green); }
.sb-down { background: rgba(248,113,113,0.15); color: var(--red);   }
.sb-neu  { background: var(--gold-dim);        color: var(--gold);  }

.stat-val { font-size: 34px; font-weight: 900; color: var(--white); line-height: 1; margin-bottom: 5px; letter-spacing: -1.5px; }
.stat-lbl { font-size: 13px; color: var(--muted); }

/* TABLE CARD */
.tcard { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; animation: fadeUp 0.45s ease 0.1s both; }
.tcard-head { padding: 18px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.tcard-title { font-size: 16px; font-weight: 700; color: var(--white); }
.tcard-sub   { font-size: 12px; color: var(--muted); margin-top: 3px; }
.tcard-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.tbl { width: 100%; border-collapse: collapse; }
.tbl thead tr { border-bottom: 1px solid var(--border); }
.tbl th { padding: 11px 16px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); font-weight: 700; white-space: nowrap; }
.tbl td { padding: 13px 16px; font-size: 13.5px; color: rgba(240,246,255,0.75); border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
.tbl tbody tr:last-child td { border-bottom: none; }
.tbl tbody tr:hover { background: rgba(255,255,255,0.025); }
.cn     { font-weight: 600; color: var(--white); }
.ce     { font-family: monospace; font-size: 12px; color: var(--muted2); }
.cn-idx { font-size: 11px; color: var(--muted); }

.badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; }
.badge::before { content:''; width:6px; height:6px; border-radius:50%; }
.b-active   { background: rgba(74,222,154,0.12);  color: var(--green);  } .b-active::before   { background: var(--green);  }
.b-leave    { background: var(--gold-dim);         color: var(--gold);   } .b-leave::before    { background: var(--gold);   }
.b-inactive { background: rgba(248,113,113,0.12); color: var(--red);    } .b-inactive::before { background: var(--red);    }
.b-approved { background: rgba(74,222,154,0.12);  color: var(--green);  } .b-approved::before { background: var(--green);  }
.b-pending  { background: var(--gold-dim);         color: var(--gold);   } .b-pending::before  { background: var(--gold);   }

.pbar-wrap  { display: flex; align-items: center; gap: 10px; min-width: 150px; }
.pbar-track { flex: 1; height: 5px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
.pbar-fill  { height: 100%; border-radius: 3px; transition: width 0.7s ease; }
.pbar-pct   { font-size: 13px; font-weight: 600; min-width: 44px; text-align: right; }

.mchip { font-weight: 700; font-size: 15px; }
.mh { color: var(--green); } .mm { color: var(--gold); } .ml { color: var(--red); }

.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 9px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: Arial, sans-serif; border: none; }
.btn svg { width: 14px; height: 14px; }
.btn-primary { background: linear-gradient(135deg, var(--gold), #c8920a); color: #08306B; }
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-ghost   { background: rgba(255,255,255,0.05); color: var(--muted); border: 1px solid var(--border2); }
.btn-ghost:hover { background: rgba(255,255,255,0.09); color: var(--white); }
.btn-dl      { padding: 5px 12px; font-size: 12px; background: var(--sky-dim); color: var(--sky); border: 1px solid var(--sky-bdr); border-radius: 7px; }
.btn-dl:hover { background: rgba(125,211,252,0.2); }

.srch { background: rgba(255,255,255,0.04); border: 1px solid var(--border2); border-radius: 8px; color: var(--white); font-size: 13px; padding: 8px 14px; font-family: Arial, sans-serif; outline: none; transition: border-color 0.15s; width: 200px; }
.srch::placeholder { color: var(--muted); }
.srch:focus { border-color: var(--gold-bdr); }

.upzone { border: 2px dashed var(--gold-bdr); border-radius: var(--r); padding: 48px 24px; text-align: center; background: var(--gold-dim); cursor: pointer; transition: all 0.2s; margin-bottom: 22px; }
.upzone:hover { border-color: var(--gold); background: rgba(240,192,64,0.20); }
.upzone-icon  { width: 48px; height: 48px; color: var(--gold); margin: 0 auto 14px; }
.upzone-title { font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
.upzone-sub   { font-size: 13px; color: var(--muted); }

.dash2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
@media(max-width:900px){ .dash2 { grid-template-columns: 1fr; } }

.alert-warn { background: var(--gold-dim); border: 1px solid var(--gold-bdr); border-radius: var(--r); padding: 14px 18px; margin-bottom: 22px; display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: var(--gold); font-weight: 500; animation: fadeUp 0.3s ease both; }
.alert-warn svg { width: 18px; height: 18px; flex-shrink: 0; }

.sb-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 150; }
.sb-overlay.show { display: block; }

@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
.fu1{animation-delay:0.05s;opacity:0} .fu2{animation-delay:0.10s;opacity:0}
.fu3{animation-delay:0.15s;opacity:0} .fu4{animation-delay:0.20s;opacity:0}
.fu5{animation-delay:0.25s;opacity:0}

@media(max-width:768px){
  .sidebar { position: fixed; top:0; left:0; bottom:0; transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .stats-grid { grid-template-columns: repeat(2,1fr); }
  .content { padding: 16px; }
  .topbar { padding: 0 14px; }
  .topbar-user { display: none; }
}
@media(max-width:480px){ .stats-grid { grid-template-columns: 1fr; } }
`;

// ─── SHARED MINI COMPONENTS ───────────────────────────────────────────────────
function PBar({ pct }) {
  const c = pct >= 75 ? 'var(--green)' : pct >= 60 ? 'var(--gold)' : 'var(--red)';
  return (
    <div className="pbar-wrap">
      <div className="pbar-track"><div className="pbar-fill" style={{ width: `${pct}%`, background: c }} /></div>
      <span className="pbar-pct" style={{ color: c }}>{pct.toFixed(1)}%</span>
    </div>
  );
}
function SBadge({ s }) {
  const m = { Active:'b-active', 'On Leave':'b-leave', Inactive:'b-inactive', Approved:'b-approved', Pending:'b-pending' };
  return <span className={`badge ${m[s] || ''}`}>{s}</span>;
}
function MChip({ v }) {
  return <span className={`mchip ${v >= 75 ? 'mh' : v >= 50 ? 'mm' : 'ml'}`}>{v}</span>;
}
function Loader({ msg = "Loading data…" }) {
  return (
    <div className="screen-center">
      <div className="spin-icon"><Ic.Spinner /></div>
      <p className="screen-msg">{msg}</p>
    </div>
  );
}
function DBError({ msg }) {
  return (
    <div className="screen-center">
      <div className="screen-err">⚠ {msg}<br /><small style={{ opacity: 0.7 }}>Make sure db.json is in your /public folder.</small></div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function DashPage() {
  const { faculty, attendance, materials, results, stats } = useDBCtx();

  const lowAtt = attendance.filter(s => s.pct < 75).slice(0, 4);
  const recent = faculty.slice(0, 4);
  const pendingCount = results.filter(r => r.status === 'Pending').length;
  const avgAtt = stats?.avgAttendance ?? (
    (attendance.reduce((a, s) => a + s.pct, 0) / attendance.length).toFixed(1) + '%'
  );

  const cards = [
    { lbl: "Total Students",  val: stats?.totalStudents ?? '—',   ico: <Ic.GradCap/>, c: "sc-gold",   ic: "sic-gold",   b: stats?.studentTrend   ?? '—', bt: "sb-up"   },
    { lbl: "Total Faculty",   val: faculty.length,                ico: <Ic.Faculty/>, c: "sc-sky",    ic: "sic-sky",    b: "Stable",                     bt: "sb-neu"  },
    { lbl: "Avg. Attendance", val: avgAtt,                        ico: <Ic.Attend/>,  c: "sc-green",  ic: "sic-green",  b: stats?.attendanceTrend ?? '—', bt: "sb-up"   },
    { lbl: "Materials",       val: materials.length,              ico: <Ic.Materials/>,c:"sc-purple", ic: "sic-purple", b: `↑ ${materials.length}`,      bt: "sb-up"   },
    { lbl: "Pending Results", val: pendingCount,                  ico: <Ic.Results/>, c: "sc-red",    ic: "sic-red",    b: "Action",                     bt: "sb-down" },
  ];

  return (
    <div>
      <div className="pg-head">
        <h2>Department Overview</h2>
        <p>Welcome back — Computer Science &amp; Engineering</p>
      </div>
      <div className="stats-grid">
        {cards.map((s, i) => (
          <div key={i} className={`stat-card ${s.c} fu${i + 1}`}>
            <div className="stat-row">
              <div className={`stat-ico ${s.ic}`}>{s.ico}</div>
              <span className={`stat-badge ${s.bt}`}>{s.b}</span>
            </div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
      <div className="dash2">
        <div className="tcard">
          <div className="tcard-head">
            <div><div className="tcard-title">Faculty Overview</div><div className="tcard-sub">Active members</div></div>
          </div>
          <table className="tbl">
            <thead><tr><th>Name</th><th>Subject</th><th>Status</th></tr></thead>
            <tbody>{recent.map(f => (
              <tr key={f.id}><td className="cn">{f.name}</td><td>{f.subject}</td><td><SBadge s={f.status} /></td></tr>
            ))}</tbody>
          </table>
        </div>
        <div className="tcard">
          <div className="tcard-head">
            <div><div className="tcard-title">Low Attendance Alert</div><div className="tcard-sub">Below 75% threshold</div></div>
          </div>
          <table className="tbl">
            <thead><tr><th>Student</th><th>Subject</th><th>Attendance</th></tr></thead>
            <tbody>{lowAtt.length ? lowAtt.map(s => (
              <tr key={s.id}><td className="cn">{s.name}</td><td>{s.subject}</td><td><PBar pct={s.pct} /></td></tr>
            )) : <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>All students above threshold ✓</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FacultyPage() {
  const { faculty } = useDBCtx();
  const [q, setQ] = useState("");
  const rows = faculty.filter(f =>
    f.name.toLowerCase().includes(q.toLowerCase()) ||
    f.subject.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="pg-head"><h2>Faculty Management</h2><p>Manage all department faculty members</p></div>
      <div className="tcard">
        <div className="tcard-head">
          <div><div className="tcard-title">Faculty Directory</div><div className="tcard-sub">{faculty.length} members registered</div></div>
          <div className="tcard-actions">
            <input className="srch" placeholder="Search faculty…" value={q} onChange={e => setQ(e.target.value)} />
            <button className="btn btn-primary"><Ic.Faculty /> Add Faculty</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead><tr><th>#</th><th>Name</th><th>Subject</th><th>Email</th><th>Phone</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((f, i) => (
                <tr key={f.id}>
                  <td className="cn-idx">{String(i + 1).padStart(2, '0')}</td>
                  <td className="cn">{f.name}</td>
                  <td>{f.subject}</td>
                  <td className="ce">{f.email}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted2)' }}>{f.phone}</td>
                  <td><SBadge s={f.status} /></td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>No results found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AttPage() {
  const { attendance } = useDBCtx();
  const [q, setQ] = useState("");
  const rows = attendance.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.subject.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="pg-head"><h2>Student Attendance</h2><p>Track attendance records across all subjects</p></div>
      <div className="tcard">
        <div className="tcard-head">
          <div>
            <div className="tcard-title">Attendance Records</div>
            <div className="tcard-sub">{attendance.filter(s => s.pct < 75).length} students below 75% threshold</div>
          </div>
          <div className="tcard-actions">
            <input className="srch" placeholder="Search student…" value={q} onChange={e => setQ(e.target.value)} />
            <button className="btn btn-ghost">Export</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead><tr><th>#</th><th>Student Name</th><th>Subject</th><th>Attended</th><th>Total</th><th>Attendance</th></tr></thead>
            <tbody>{rows.map((s, i) => (
              <tr key={s.id}>
                <td className="cn-idx">{String(i + 1).padStart(2, '0')}</td>
                <td className="cn">{s.name}</td>
                <td>{s.subject}</td>
                <td style={{ fontWeight: 700 }}>{s.attended}</td>
                <td style={{ color: 'var(--muted)' }}>{s.total}</td>
                <td><PBar pct={s.pct} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MatPage() {
  const { materials } = useDBCtx();
  const [q, setQ] = useState("");
  const rows = materials.filter(m =>
    m.subject.toLowerCase().includes(q.toLowerCase()) ||
    m.file.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="pg-head"><h2>Study Materials</h2><p>Manage and distribute course resources</p></div>
      <div className="upzone">
        <div className="upzone-icon"><Ic.Upload /></div>
        <div className="upzone-title">Drop files here or click to upload</div>
        <div className="upzone-sub">PDF, DOCX, PPTX, ZIP — max 50 MB per file</div>
      </div>
      <div className="tcard">
        <div className="tcard-head">
          <div><div className="tcard-title">Uploaded Materials</div><div className="tcard-sub">{materials.length} files available</div></div>
          <div className="tcard-actions">
            <input className="srch" placeholder="Search files…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead><tr><th>#</th><th>Subject</th><th>File Name</th><th>Uploaded By</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>{rows.map((m, i) => (
              <tr key={m.id}>
                <td className="cn-idx">{String(i + 1).padStart(2, '0')}</td>
                <td>{m.subject}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted2)' }}>{m.file}</td>
                <td className="cn">{m.uploadedBy}</td>
                <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{m.date}</td>
                <td><button className="btn btn-dl"><Ic.Download /> Download</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResPage() {
  const { results } = useDBCtx();
  const [q, setQ] = useState("");
  const rows = results.filter(r =>
    r.name.toLowerCase().includes(q.toLowerCase()) ||
    r.subject.toLowerCase().includes(q.toLowerCase())
  );
  const pending = results.filter(r => r.status === 'Pending').length;
  const grade = m => m >= 90 ? 'O' : m >= 75 ? 'A+' : m >= 60 ? 'A' : m >= 50 ? 'B' : 'F';
  return (
    <div>
      <div className="pg-head"><h2>Student Results</h2><p>Review and approve examination results</p></div>
      {pending > 0 && (
        <div className="alert-warn">
          <Ic.Warning />
          <span><strong>{pending} result{pending > 1 ? 's' : ''}</strong> awaiting your approval — please review below.</span>
        </div>
      )}
      <div className="tcard">
        <div className="tcard-head">
          <div><div className="tcard-title">Results Register</div><div className="tcard-sub">{results.length} entries total</div></div>
          <div className="tcard-actions">
            <input className="srch" placeholder="Search student…" value={q} onChange={e => setQ(e.target.value)} />
            <button className="btn btn-primary">Approve All</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead><tr><th>#</th><th>Student Name</th><th>Subject</th><th>Marks</th><th>Grade</th><th>Status</th></tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={r.id}>
                <td className="cn-idx">{String(i + 1).padStart(2, '0')}</td>
                <td className="cn">{r.name}</td>
                <td>{r.subject}</td>
                <td><MChip v={r.marks} /></td>
                <td style={{ fontWeight: 700, color: 'var(--muted2)' }}>{grade(r.marks)}</td>
                <td><SBadge s={r.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
  { path: '/hod/dashboard',  label: 'Dashboard',  Icon: Ic.Dashboard },
  { path: '/hod/faculty',    label: 'Faculty',     Icon: Ic.Faculty   },
  { path: '/hod/attendance', label: 'Attendance',  Icon: Ic.Attend    },
  { path: '/hod/materials',  label: 'Materials',   Icon: Ic.Materials },
  { path: '/hod/results',    label: 'Results',     Icon: Ic.Results   },
];
const TITLES = {
  '/hod/dashboard':  'Dashboard',
  '/hod/faculty':    'Faculty Management',
  '/hod/attendance': 'Student Attendance',
  '/hod/materials':  'Materials Management',
  '/hod/results':    'Results',
};

// ─── DASHBOARD SHELL ─────────────────────────────────────────────────────────
function DashShell() {
  const { user, logout } = useAuth();
  const { db }           = useDBCtx();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [open, setOpen]  = useState(false);

  const hodName    = db?.credentials?.name     ?? user?.name ?? 'HOD';
  const hodInit    = db?.credentials?.initials ?? 'H';
  const department = db?.credentials?.department ?? 'Department';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="app">
      <div className={`sb-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sb-logo">
          <div className="sb-logo-icon">CS</div>
          <div className="sb-logo-text">
            <div className="t1">EduPortal</div>
            <div className="t2">HOD Management</div>
          </div>
        </div>
        <div className="sb-dept">
          <div className="sb-dept-label">Department</div>
          <div className="sb-dept-name">{department}</div>
        </div>
        <nav className="sb-nav">
          <div className="sb-section-label">Navigation</div>
          {NAV.map(({ path, label, Icon }) => (
            <div key={path} className={`sb-item ${location === path ? 'active' : ''}`}
              onClick={() => { navigate(path); setOpen(false); }}>
              <span className="sb-item-icon"><Icon /></span>{label}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="sb-profile">
            <div className="sb-avatar">{hodInit}</div>
            <div>
              <div className="sb-profile-name">{hodName}</div>
              <div className="sb-profile-role">Head of Department</div>
            </div>
          </div>
          <button className="sb-logout" onClick={handleLogout}>
            <Ic.Logout /> Sign Out
          </button>
        </div>
      </aside>

      <div className="main-wrap">
        <nav className="topbar">
          <button className="topbar-menu" onClick={() => setOpen(!open)}>
            {open ? <Ic.Close /> : <Ic.Menu />}
          </button>
          <div className="topbar-title">
            <div className="topbar-page">{TITLES[location] || 'Dashboard'}</div>
            <div className="topbar-crumb">HOD Portal · {TITLES[location] || 'Dashboard'}</div>
          </div>
          <div className="topbar-actions">
            <button className="topbar-notif"><Ic.Bell /><span className="notif-pip" /></button>
            <div className="topbar-user">
              <div className="topbar-avatar">{hodInit}</div>
              <span className="topbar-uname">{hodName}</span>
            </div>
          </div>
        </nav>
        <main className="content">
          {location === '/hod/dashboard'  && <DashPage />}
          {location === '/hod/faculty'    && <FacultyPage />}
          {location === '/hod/attendance' && <AttPage />}
          {location === '/hod/materials'  && <MatPage />}
          {location === '/hod/results'    && <ResPage />}
        </main>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage() {
  const { db }           = useDBCtx();
  const { login }        = useAuth();
  const navigate         = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(false);
  const [touched,  setTouched]  = useState({ email: false, password: false });

  const emailErr = touched.email && !email           ? 'Email is required'
                 : touched.email && !/\S+@\S+\.\S+/.test(email) ? 'Enter a valid email' : '';
  const passErr  = touched.password && !password     ? 'Password is required'
                 : touched.password && password.length < 4 ? 'Password too short' : '';

  const creds = db?.credentials;

  const handleSubmit = async () => {
    setTouched({ email: true, password: true });
    if (!email || !password || emailErr || passErr) return;
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 1300));
    if (creds && email === creds.email && password === creds.password) {
      setSuccess(true);
      login({ name: creds.name, email, initials: creds.initials });
      await new Promise(r => setTimeout(r, 1000));
      navigate('/hod/dashboard');
    } else {
      setError(`Invalid credentials. Use ${creds?.email ?? 'hod@cse.edu'} / ${creds?.password ?? 'hod@123'}`);
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* LEFT */}
      <div className="login-left">
        <div className="geo-grid" />
        <div className="login-brand">
          <div className="brand-badge">
            <div className="brand-icon">CS</div>
            <div>
              <div className="brand-name">EduPortal</div>
              <div className="brand-tag">College Management System</div>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="hero-eyebrow"><span className="hero-dot" /> HOD Administrative Portal</div>
            <h1 className="hero-h1">Manage Your<br />Department<br /><span>Effortlessly.</span></h1>
            <p className="hero-p">A unified control centre for Heads of Department — oversee faculty, track attendance, distribute materials and approve results from one place.</p>
          </div>
          <div className="login-features">
            {[
              { icon: <Ic.Faculty />,   c: 'fi-gold', label: <><strong>Faculty Management</strong> — track and manage all staff</> },
              { icon: <Ic.Attend />,    c: 'fi-sky',  label: <><strong>Attendance Analytics</strong> — monitor student presence</> },
              { icon: <Ic.Results />,   c: 'fi-pur',  label: <><strong>Results Approval</strong> — review and sign off marks</> },
            ].map((f, i) => (
              <div className="feat-item" key={i}>
                <div className={`feat-icon ${f.c}`}>{f.icon}</div>
                <div className="feat-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="login-footer-txt">© 2025 EduPortal. All rights reserved.</div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-form-wrap">
          {success ? (
            <div className="success-wrap">
              <div className="success-circle"><Ic.Check /></div>
              <div className="success-title">Login Successful!</div>
              <div className="success-sub">Redirecting to your dashboard…</div>
            </div>
          ) : (
            <>
              <div className="login-form-header">
                <div className="lf-eyebrow"><Ic.Shield /> Secure Access</div>
                <h2 className="lf-title">HOD <span>Sign In</span></h2>
                <p className="lf-sub">Enter your department credentials to access the portal.</p>
              </div>

              {creds && (
                <div className="cred-hint">
                  <Ic.Shield />
                  <div className="cred-hint-text">
                    Demo — Email: <strong>{creds.email}</strong> · Password: <strong>{creds.password}</strong>
                  </div>
                </div>
              )}

              {error && (
                <div className="global-err"><Ic.Warning /> {error}</div>
              )}

              <div className="field">
                <label className="field-label">Email Address</label>
                <div className="field-wrap">
                  <span className="field-ico"><Ic.Mail /></span>
                  <input className="field-input" type="email" placeholder="hod@cse.edu"
                    value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                </div>
                {emailErr && <div className="field-err"><Ic.Warning />{emailErr}</div>}
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <span className="field-ico"><Ic.Lock /></span>
                  <input className="field-input" type={showPass ? 'text' : 'password'} placeholder="Enter your password"
                    value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                    onBlur={() => setTouched(t => ({ ...t, password: true }))}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                  <button className="field-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                    {showPass ? <Ic.EyeOff /> : <Ic.Eye />}
                  </button>
                </div>
                {passErr && <div className="field-err"><Ic.Warning />{passErr}</div>}
              </div>

              <button className="login-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <><span className="login-spinner" /> Authenticating…</> : <><Ic.Shield /> Sign In</>}
              </button>

              <div className="lf-footer">
                <span>HOD Portal v2.5</span>
                <span><Ic.Check /> SSL Secured</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function AppInner() {
  const { user }   = useAuth();
  const location   = useLocation();
  const navigate   = useNavigate();
  const { db, loading, error } = useDB();

  // Redirect logic
  useEffect(() => {
    if (location.startsWith('/hod/') && !user) navigate('/login');
    if (location === '/login' && user)          navigate('/hod/dashboard');
    if (location === '/')                        navigate(user ? '/hod/dashboard' : '/login');
  }, [location, user]);

  if (loading) return <Loader msg="Loading portal data from db.json…" />;
  if (error)   return <DBError msg={error} />;

  const ctx = {
    db,
    faculty:    db?.faculty    ?? [],
    attendance: db?.attendance ?? [],
    materials:  db?.materials  ?? [],
    results:    db?.results    ?? [],
    stats:      db?.stats      ?? {},
  };

  if (location.startsWith('/hod/') && !user) return null;

  return (
    <DBCtx.Provider value={ctx}>
      {(location === '/login' || location === '/') && <LoginPage />}
      {location.startsWith('/hod/') && user && <DashShell />}
    </DBCtx.Provider>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Router>
        <AuthProvider>
          <AppInner />
        </AuthProvider>
      </Router>
    </>
  );
}
