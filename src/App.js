import { useState } from "react";

const DEPARTMENTS = [
  { id: 1, name: "Computer Science & Engineering", hod: "Dr. Ravi Kumar", students: 480, faculty: 28 },
  { id: 2, name: "Electronics & Communication", hod: "Dr. Sunita Rao", students: 360, faculty: 22 },
  { id: 3, name: "Mechanical Engineering", hod: "Dr. Arjun Nair", students: 420, faculty: 25 },
  { id: 4, name: "Civil Engineering", hod: "Dr. Priya Sharma", students: 310, faculty: 19 },
  { id: 5, name: "Information Technology", hod: "Dr. Kavitha Reddy", students: 390, faculty: 21 },
  { id: 6, name: "Electrical Engineering", hod: "Dr. Mohan Das", students: 270, faculty: 17 },
  { id: 7, name: "MBA", hod: "Dr. Ananya Krishnan", students: 180, faculty: 14 },
  { id: 8, name: "MCA", hod: "Dr. Suresh Babu", students: 120, faculty: 10 },
];
const FACULTY = [
  { id: 1, name: "Dr. Ravi Kumar", dept: "CSE", email: "ravi.kumar@mallareddy.edu.in", contact: "9876543210", designation: "Professor & HOD" },
  { id: 2, name: "Dr. Sunita Rao", dept: "ECE", email: "sunita.rao@mallareddy.edu.in", contact: "9876543211", designation: "Professor & HOD" },
  { id: 3, name: "Prof. Ramesh Naidu", dept: "CSE", email: "ramesh.n@mallareddy.edu.in", contact: "9876543212", designation: "Associate Professor" },
  { id: 4, name: "Dr. Lakshmi Devi", dept: "IT", email: "lakshmi.d@mallareddy.edu.in", contact: "9876543213", designation: "Assistant Professor" },
  { id: 5, name: "Prof. Venkat Rao", dept: "MECH", email: "venkat.rao@mallareddy.edu.in", contact: "9876543214", designation: "Associate Professor" },
  { id: 6, name: "Dr. Padma Priya", dept: "CIVIL", email: "padma.p@mallareddy.edu.in", contact: "9876543215", designation: "Professor" },
  { id: 7, name: "Prof. Srinivas Reddy", dept: "EEE", email: "srinivas.r@mallareddy.edu.in", contact: "9876543216", designation: "Assistant Professor" },
  { id: 8, name: "Dr. Meena Kumari", dept: "MBA", email: "meena.k@mallareddy.edu.in", contact: "9876543217", designation: "Associate Professor" },
];
const TEACHING_STAFF = [
  { id: 1, name: "Dr. Ravi Kumar", dept: "CSE", qualification: "Ph.D", experience: "15 yrs", status: "Active" },
  { id: 2, name: "Prof. Ramesh Naidu", dept: "CSE", qualification: "M.Tech", experience: "10 yrs", status: "Active" },
  { id: 3, name: "Dr. Sunita Rao", dept: "ECE", qualification: "Ph.D", experience: "18 yrs", status: "Active" },
  { id: 4, name: "Dr. Lakshmi Devi", dept: "IT", qualification: "Ph.D", experience: "12 yrs", status: "Active" },
  { id: 5, name: "Prof. Venkat Rao", dept: "MECH", qualification: "M.E", experience: "8 yrs", status: "Active" },
];
const NON_TEACHING_STAFF = [
  { id: 1, name: "K. Murthy", role: "Lab Technician", dept: "CSE", contact: "9876540001", status: "Active" },
  { id: 2, name: "S. Lakshmi", role: "Administrative Asst.", dept: "Admin", contact: "9876540002", status: "Active" },
  { id: 3, name: "P. Raju", role: "Librarian", dept: "Library", contact: "9876540003", status: "Active" },
  { id: 4, name: "M. Devi", role: "Accountant", dept: "Finance", contact: "9876540004", status: "Active" },
  { id: 5, name: "R. Kishore", role: "Security Head", dept: "Security", contact: "9876540005", status: "Active" },
];
const TRANSPORT = [
  { id: 1, bus: "MRC-01", route: "Secunderabad - College", driver: "K. Venkatesh", contact: "9988776601", students: 45 },
  { id: 2, bus: "MRC-02", route: "Dilsukhnagar - College", driver: "M. Raju", contact: "9988776602", students: 52 },
  { id: 3, bus: "MRC-03", route: "Kukatpally - College", driver: "S. Kumar", contact: "9988776603", students: 38 },
  { id: 4, bus: "MRC-04", route: "Uppal - College", driver: "P. Naidu", contact: "9988776604", students: 41 },
  { id: 5, bus: "MRC-05", route: "LB Nagar - College", driver: "R. Reddy", contact: "9988776605", students: 49 },
  { id: 6, bus: "MRC-06", route: "Ameerpet - College", driver: "T. Rao", contact: "9988776606", students: 36 },
];
const MONTHLY_FEES = [
  { month: "Jun", collected: 18.2, pending: 3.1 },
  { month: "Jul", collected: 22.5, pending: 2.8 },
  { month: "Aug", collected: 25.1, pending: 1.9 },
  { month: "Sep", collected: 20.8, pending: 3.4 },
  { month: "Oct", collected: 24.3, pending: 2.2 },
  { month: "Nov", collected: 19.6, pending: 4.1 },
];
const INITIAL_ANNOUNCEMENTS = [
  { id: 1, title: "Semester Exams Schedule Released", date: "2025-11-10", priority: "High", message: "End semester examinations will commence from December 1st, 2025. Timetable uploaded on the portal." },
  { id: 2, title: "Annual Day Celebration", date: "2025-11-05", priority: "Medium", message: "Annual Day will be celebrated on November 25th. All students and faculty are requested to participate." },
  { id: 3, title: "Fee Payment Deadline", date: "2025-11-01", priority: "High", message: "Last date for fee payment is November 20th. Late payments will attract a penalty of Rs.500/day." },
  { id: 4, title: "Sports Week", date: "2025-10-28", priority: "Low", message: "Sports week will be held from November 10-15. Students can register with their department coordinators." },
];

const CSS = `
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
  :root {
    --primary: #08306B;
    --primary-light: #1a5ca8;
    --primary-dark: #051f47;
    --primary-mid: #0d4a8a;
    --accent: #b8960c;
    --accent-light: #d4ac26;
    --sidebar-bg: #051f47;
    --sidebar-text: #9bb8d8;
    --content-bg: #eef2f7;
    --card-bg: #ffffff;
    --text-dark: #0a1929;
    --text-muted: #5a6e84;
    --border: #cdd8e6;
    --success-color: #1a7a40;
    --danger-color: #c0392b;
    --warning-color: #c47a10;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; background: var(--content-bg); color: var(--text-dark); }

  .login-page { min-height: 100vh; background: linear-gradient(135deg, #051f47 0%, #08306B 50%, #1a5ca8 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .login-page::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 30%, rgba(184,150,12,0.10) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(26,92,168,0.25) 0%, transparent 55%); }
  .login-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.32); max-width: 430px; width: 100%; position: relative; z-index: 1; border: 1px solid rgba(184,150,12,0.25); }
  .login-header { background: linear-gradient(135deg, #051f47, #08306B); padding: 34px 30px 26px; text-align: center; border-bottom: 3px solid var(--accent); }
  .login-logo { width: 72px; height: 72px; background: linear-gradient(135deg, var(--accent), var(--accent-light)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 22px; color: #051f47; box-shadow: 0 6px 20px rgba(184,150,12,0.35); font-weight: 800; font-family: Arial, sans-serif; }
  .login-title { font-family: Arial, sans-serif; font-size: 1.4rem; color: #fff; font-weight: 700; margin-bottom: 4px; }
  .login-subtitle { font-size: 0.75rem; color: var(--accent-light); letter-spacing: 1.4px; text-transform: uppercase; }
  .login-body { padding: 30px; }
  .login-welcome { text-align: center; margin-bottom: 22px; }
  .login-welcome h5 { font-family: Arial, sans-serif; color: var(--primary-dark); font-size: 1.08rem; font-weight: 700; margin-bottom: 4px; }
  .login-welcome p { font-size: 0.82rem; color: var(--text-muted); }
  .form-label { font-size: 0.76rem; font-weight: 700; color: var(--primary-dark); letter-spacing: 0.6px; text-transform: uppercase; display: block; margin-bottom: 6px; }
  .form-control { border: 1.5px solid var(--border); border-radius: 8px; padding: 10px 13px; font-size: 0.88rem; font-family: Arial, sans-serif; transition: all 0.2s; width: 100%; }
  .form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(8,48,107,0.13); outline: none; }
  .btn-login { background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: #fff; border: none; border-radius: 8px; padding: 11px; font-size: 0.90rem; font-weight: 700; font-family: Arial, sans-serif; width: 100%; transition: all 0.22s; cursor: pointer; box-shadow: 0 5px 18px rgba(8,48,107,0.30); }
  .btn-login:hover { transform: translateY(-2px); box-shadow: 0 9px 26px rgba(8,48,107,0.40); }
  .login-hint { font-size: 0.74rem; color: var(--text-muted); text-align: center; margin-top: 14px; }

  .app-layout { display: flex; min-height: 100vh; }

  .sidebar { width: 240px; min-height: 100vh; background: var(--sidebar-bg); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; box-shadow: 4px 0 18px rgba(0,0,0,0.22); }
  .sidebar-brand { padding: 18px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; gap: 11px; }
  .brand-logo { width: 38px; height: 38px; border-radius: 8px; background: linear-gradient(135deg, var(--accent), var(--accent-light)); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #051f47; flex-shrink: 0; font-family: Arial, sans-serif; }
  .brand-name { font-family: Arial, sans-serif; font-size: 0.90rem; color: #fff; font-weight: 700; line-height: 1.2; }
  .brand-role { font-size: 0.63rem; color: var(--accent-light); letter-spacing: 1px; text-transform: uppercase; }
  .sidebar-nav { flex: 1; overflow-y: auto; padding: 6px 0; }
  .nav-section-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(155,184,216,0.38); padding: 14px 16px 4px; font-family: Arial, sans-serif; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer; color: var(--sidebar-text); font-size: 0.82rem; font-family: Arial, sans-serif; transition: all 0.18s; border-left: 3px solid transparent; user-select: none; }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .nav-item.active { background: rgba(184,150,12,0.13); color: var(--accent-light); font-weight: 700; border-left-color: var(--accent); }
  .nav-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sidebar-text); flex-shrink: 0; opacity: 0.45; transition: all 0.18s; }
  .nav-item.active .nav-dot { background: var(--accent-light); opacity: 1; }
  .nav-item:hover .nav-dot { opacity: 0.85; background: #fff; }
  .sidebar-footer { padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.07); }
  .user-chip { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.06); border-radius: 8px; padding: 9px 11px; }
  .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-light)); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; color: #051f47; flex-shrink: 0; font-family: Arial, sans-serif; }
  .user-name { font-size: 0.76rem; color: #fff; font-weight: 700; line-height: 1.2; font-family: Arial, sans-serif; }
  .user-role { font-size: 0.64rem; color: var(--accent-light); font-family: Arial, sans-serif; }
  .logout-icon-btn { background: none; border: 1px solid rgba(155,184,216,0.3); cursor: pointer; color: rgba(155,184,216,0.7); font-size: 0.62rem; font-weight: 700; font-family: Arial, sans-serif; padding: 2px 7px; border-radius: 4px; transition: all 0.2s; }
  .logout-icon-btn:hover { background: rgba(192,57,43,0.22); color: #e57373; border-color: rgba(192,57,43,0.4); }

  .main-wrap { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

  .topbar { background: #fff; height: 58px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: sticky; top: 0; z-index: 50; border-bottom: 1px solid var(--border); box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
  .page-title { font-family: Arial, sans-serif; font-size: 1.12rem; color: var(--primary-dark); font-weight: 700; }
  .breadcrumb-text { font-size: 0.70rem; color: var(--text-muted); font-family: Arial, sans-serif; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .date-chip { background: var(--content-bg); border: 1px solid var(--border); border-radius: 6px; padding: 5px 11px; font-size: 0.72rem; color: var(--text-muted); font-weight: 600; font-family: Arial, sans-serif; }
  .logout-btn { background: linear-gradient(135deg, #c0392b, #a93226); color: #fff; border: none; border-radius: 7px; padding: 7px 14px; font-size: 0.74rem; font-weight: 700; font-family: Arial, sans-serif; cursor: pointer; transition: all 0.2s; }
  .logout-btn:hover { opacity: 0.85; }

  .content-area { padding: 22px; flex: 1; }

  .stat-card { background: var(--card-bg); border-radius: 12px; padding: 18px; border: 1px solid var(--border); box-shadow: 0 3px 14px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; height: 100%; }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 9px 26px rgba(0,0,0,0.09); }
  .stat-icon-box { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .stat-abbr { font-size: 0.60rem; font-weight: 800; color: #fff; font-family: Arial, sans-serif; letter-spacing: 0.8px; text-transform: uppercase; }
  .stat-value { font-family: Arial, sans-serif; font-size: 1.72rem; font-weight: 800; color: var(--text-dark); line-height: 1; margin-bottom: 4px; }
  .stat-label { font-size: 0.70rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-family: Arial, sans-serif; }
  .stat-trend { font-size: 0.68rem; margin-top: 8px; color: var(--success-color); font-weight: 700; font-family: Arial, sans-serif; }

  .section-card { background: var(--card-bg); border-radius: 12px; padding: 20px; border: 1px solid var(--border); box-shadow: 0 3px 14px rgba(0,0,0,0.05); margin-bottom: 20px; }
  .section-title { font-family: Arial, sans-serif; font-size: 1.02rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 2px; }
  .section-subtitle { font-size: 0.71rem; color: var(--text-muted); margin-bottom: 16px; font-family: Arial, sans-serif; }

  .custom-table { font-size: 0.81rem; width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }
  .custom-table thead th { background: var(--primary-dark); color: var(--accent-light); font-size: 0.66rem; letter-spacing: 0.8px; text-transform: uppercase; font-weight: 700; border: none; padding: 11px 12px; }
  .custom-table tbody td { padding: 10px 12px; vertical-align: middle; border-bottom: 1px solid var(--border); }
  .custom-table tbody tr:hover { background: rgba(8,48,107,0.04); }
  .badge-dept { font-size: 0.66rem; padding: 3px 9px; border-radius: 20px; font-weight: 700; display: inline-block; font-family: Arial, sans-serif; }
  .badge-active { background: rgba(26,122,64,0.13); color: #1a7a40; }
  .badge-high { background: rgba(192,57,43,0.12); color: #c0392b; }
  .badge-medium { background: rgba(196,122,16,0.12); color: #c47a10; }
  .badge-low { background: rgba(8,48,107,0.11); color: #08306B; }

  .chart-bar-wrap { display: flex; flex-direction: column; gap: 8px; }
  .chart-row { display: flex; align-items: center; gap: 10px; }
  .chart-month { width: 32px; font-size: 0.68rem; color: var(--text-muted); font-weight: 700; flex-shrink: 0; font-family: Arial, sans-serif; }
  .bar-track { flex: 1; background: var(--border); border-radius: 20px; overflow: hidden; height: 19px; }
  .bar-fill { height: 100%; border-radius: 20px; display: flex; align-items: center; padding-left: 8px; font-size: 0.63rem; font-weight: 700; color: #fff; font-family: Arial, sans-serif; }
  .bar-collected { background: linear-gradient(90deg, #051f47, #08306B); }
  .bar-pending { background: linear-gradient(90deg, #9a5e06, #c47a10); }
  .chart-val { width: 48px; font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-align: right; flex-shrink: 0; font-family: Arial, sans-serif; }

  .fee-card { border-radius: 12px; padding: 22px; color: #fff; text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.13); }
  .fee-amt { font-family: Arial, sans-serif; font-size: 1.85rem; font-weight: 800; }
  .fee-label { font-size: 0.74rem; opacity: 0.88; letter-spacing: 0.4px; margin-top: 4px; font-family: Arial, sans-serif; }

  .annc-item { border-left: 3px solid var(--primary); background: var(--content-bg); border-radius: 0 9px 9px 0; padding: 12px 14px; margin-bottom: 10px; transition: all 0.18s; }
  .annc-item:hover { background: #dde6f0; }
  .annc-title { font-weight: 700; font-size: 0.85rem; color: var(--primary-dark); font-family: Arial, sans-serif; }
  .annc-date { font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; font-family: Arial, sans-serif; }
  .annc-msg { font-size: 0.77rem; color: var(--text-muted); margin-top: 5px; font-family: Arial, sans-serif; }

  .report-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 22px 18px; text-align: center; transition: all 0.22s; cursor: pointer; box-shadow: 0 3px 14px rgba(0,0,0,0.05); }
  .report-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.10); border-color: var(--primary-light); }
  .report-icon-box { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 13px; }
  .report-abbr { font-size: 0.60rem; font-weight: 800; color: #fff; font-family: Arial, sans-serif; letter-spacing: 0.8px; }
  .report-name { font-family: Arial, sans-serif; font-size: 0.94rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 5px; }
  .report-desc { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 13px; font-family: Arial, sans-serif; }
  .btn-download { background: linear-gradient(135deg, #051f47, #08306B); color: #fff; border: none; border-radius: 7px; padding: 8px 17px; font-size: 0.76rem; font-weight: 700; font-family: Arial, sans-serif; cursor: pointer; transition: all 0.2s; }
  .btn-download:hover { opacity: 0.87; transform: translateY(-1px); }

  .add-annc-form { background: var(--content-bg); border-radius: 10px; padding: 16px; margin-bottom: 20px; border: 1px solid var(--border); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(8,48,107,0.18); border-radius: 10px; }
  select.form-control { appearance: auto; }
  textarea.form-control { resize: vertical; }
`;

const NAV_ITEMS = [
  { key: "dashboard",     label: "Dashboard",          section: "MAIN" },
  { key: "departments",   label: "Departments",         section: "ACADEMIC" },
  { key: "faculty",       label: "Faculty Management",  section: "ACADEMIC" },
  { key: "staff",         label: "Staff Management",    section: "ACADEMIC" },
  { key: "transport",     label: "Transport Overview",  section: "OPERATIONS" },
  { key: "fee",           label: "Fee Analytics",       section: "OPERATIONS" },
  { key: "announcements", label: "Announcements",       section: "COMMUNICATION" },
  { key: "reports",       label: "Reports",             section: "COMMUNICATION" },
];

const PAGE_TITLES = {
  dashboard: "Dashboard Overview", departments: "Departments", faculty: "Faculty Management",
  staff: "Staff Management", transport: "Transport Overview", fee: "Fee Analytics",
  announcements: "Announcements", reports: "Reports",
};

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      if (email === "chairman@mallareddy.edu.in" && password === "chairman@2025") { onLogin(); }
      else { setError("Invalid credentials. Please use the demo credentials shown below."); }
      setLoading(false);
    }, 800);
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">MR</div>
          <div className="login-title">Chairman Portal</div>
          <div className="login-subtitle">Malla Reddy College of Engineering</div>
        </div>
        <div className="login-body">
          <div className="login-welcome">
            <h5>Welcome, Mr. Malla Reddy</h5>
            <p>Sign in to access your Chairman Dashboard</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="chairman@mallareddy.edu.in"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div style={{ background: "#fdecea", color: "#c0392b", padding: "8px 12px", borderRadius: 7, fontSize: "0.79rem", marginBottom: 13, border: "1px solid #f5c6cb", fontFamily: "Arial, sans-serif" }}>{error}</div>}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In to Portal"}
            </button>
          </form>
          <div className="login-hint">Demo: chairman@mallareddy.edu.in / chairman@2025</div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, onNav, onLogout }) {
  let lastSection = null;
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">MR</div>
        <div>
          <div className="brand-name">Malla Reddy</div>
          <div className="brand-role">Chairman Portal</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const showSection = item.section !== lastSection;
          lastSection = item.section;
          return (
            <div key={item.key}>
              {showSection && <div className="nav-section-label">{item.section}</div>}
              <div className={`nav-item${active === item.key ? " active" : ""}`} onClick={() => onNav(item.key)}>
                <span className="nav-dot"></span>
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">MR</div>
          <div style={{ flex: 1 }}>
            <div className="user-name">Mr. Malla Reddy</div>
            <div className="user-role">Chairman</div>
          </div>
          <button className="logout-icon-btn" onClick={onLogout}>OUT</button>
        </div>
      </div>
    </div>
  );
}

function Topbar({ page, onLogout }) {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  return (
    <div className="topbar">
      <div>
        <div className="page-title">{PAGE_TITLES[page]}</div>
        <div className="breadcrumb-text">Chairman Portal / {PAGE_TITLES[page]}</div>
      </div>
      <div className="topbar-right">
        <div className="date-chip">{today}</div>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

function StatCard({ value, label, abbr, color, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-box" style={{ background: color }}>
        <span className="stat-abbr">{abbr}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {trend && <div className="stat-trend">+ {trend}</div>}
    </div>
  );
}

function DashboardPage() {
  const stats = [
    { label: "Total Students",  value: "2,530",    abbr: "STU", color: "#08306B", trend: "142 this year" },
    { label: "Total Faculty",   value: "156",       abbr: "FAC", color: "#1a5ca8", trend: "8 this sem" },
    { label: "Departments",     value: "8",         abbr: "DEP", color: "#0d4a8a", trend: "Stable" },
    { label: "Total Staff",     value: "84",        abbr: "STF", color: "#b8960c", trend: "5 this year" },
    { label: "Total Buses",     value: "6",         abbr: "BUS", color: "#1a7a40", trend: "All active" },
    { label: "Fee Collected",   value: "Rs.1.3Cr",  abbr: "FEE", color: "#c47a10", trend: "82% done" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 13, marginBottom: 20 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 20 }}>
        <div className="section-card" style={{ margin: 0 }}>
          <div className="section-title">Department Enrollment</div>
          <div className="section-subtitle">Students per department - AY 2025-26</div>
          <div className="chart-bar-wrap">
            {DEPARTMENTS.map((d, i) => (
              <div key={i} className="chart-row">
                <div className="chart-month" style={{ width: 38 }}>{d.name.split(" ")[0].slice(0, 4)}</div>
                <div className="bar-track">
                  <div className="bar-fill bar-collected" style={{ width: `${(d.students / 500) * 100}%` }}>
                    {d.students > 130 ? d.students : ""}
                  </div>
                </div>
                <div className="chart-val">{d.students}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-card" style={{ margin: 0 }}>
          <div className="section-title">Monthly Fee Collection</div>
          <div className="section-subtitle">In Lakhs (Rs.) - Jun to Nov 2025</div>
          <div className="chart-bar-wrap">
            {MONTHLY_FEES.map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: "0.66rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 2, fontFamily: "Arial" }}>{m.month} 2025</div>
                <div className="chart-row" style={{ marginBottom: 2 }}>
                  <div className="chart-month">Coll</div>
                  <div className="bar-track"><div className="bar-fill bar-collected" style={{ width: `${(m.collected / 30) * 100}%` }}>Rs.{m.collected}L</div></div>
                </div>
                <div className="chart-row" style={{ marginBottom: 6 }}>
                  <div className="chart-month">Pend</div>
                  <div className="bar-track"><div className="bar-fill bar-pending" style={{ width: `${(m.pending / 30) * 100}%` }}>Rs.{m.pending}L</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-card">
        <div className="section-title">Recent Announcements</div>
        <div className="section-subtitle">Latest college-wide communications</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 11 }}>
          {INITIAL_ANNOUNCEMENTS.slice(0, 4).map((a, i) => (
            <div key={i} className="annc-item" style={{ borderLeftColor: a.priority === "High" ? "#c0392b" : a.priority === "Medium" ? "#c47a10" : "#08306B" }}>
              <span className={`badge-dept badge-${a.priority.toLowerCase()}`}>{a.priority}</span>
              <div className="annc-title" style={{ marginTop: 4 }}>{a.title}</div>
              <div className="annc-date">{a.date}</div>
              <div className="annc-msg">{a.message.slice(0, 80)}...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DepartmentsPage() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 20 }}>
        {[["8","Departments","DEP","#08306B"],["2,530","Total Students","STU","#1a5ca8"],["156","Total Faculty","FAC","#0d4a8a"],["4","UG Programs","UG","#b8960c"]].map(([v,l,a,c]) => (
          <StatCard key={l} value={v} label={l} abbr={a} color={c} />
        ))}
      </div>
      <div className="section-card">
        <div className="section-title">All Departments</div>
        <div className="section-subtitle">Complete academic department details - AY 2025-26</div>
        <div style={{ overflowX: "auto" }}>
          <table className="custom-table">
            <thead>
              <tr><th>#</th><th>Department Name</th><th>HOD Name</th><th>Total Students</th><th>Total Faculty</th><th>Status</th></tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((d, i) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "0.74rem" }}>{String(i + 1).padStart(2, "0")}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary-dark)" }}>{d.name}</td>
                  <td>{d.hod}</td>
                  <td><strong>{d.students}</strong></td>
                  <td><strong>{d.faculty}</strong></td>
                  <td><span className="badge-dept badge-active">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FacultyPage() {
  const [search, setSearch] = useState("");
  const filtered = FACULTY.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.dept.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 20 }}>
        {[["156","Total Faculty","FAC","#08306B"],["48","Professors","PRF","#1a5ca8"],["62","Assoc. Professors","APC","#0d4a8a"],["46","Asst. Professors","ASP","#b8960c"]].map(([v,l,a,c]) => (
          <StatCard key={l} value={v} label={l} abbr={a} color={c} />
        ))}
      </div>
      <div className="section-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div className="section-title">Faculty Directory</div>
            <div className="section-subtitle">All faculty members across departments</div>
          </div>
          <input className="form-control" placeholder="Search faculty..." style={{ width: 200, fontSize: "0.81rem" }}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="custom-table">
            <thead><tr><th>#</th><th>Faculty Name</th><th>Designation</th><th>Department</th><th>Email</th><th>Contact</th></tr></thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={f.id}>
                  <td style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</td>
                  <td style={{ fontWeight: 700 }}>{f.name}</td>
                  <td style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{f.designation}</td>
                  <td><span style={{ background: "rgba(8,48,107,0.09)", color: "#08306B", fontSize: "0.66rem", padding: "3px 9px", borderRadius: 20, fontWeight: 700, fontFamily: "Arial" }}>{f.dept}</span></td>
                  <td style={{ fontSize: "0.77rem" }}>{f.email}</td>
                  <td style={{ fontWeight: 700 }}>{f.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StaffPage() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginBottom: 18 }}>
        <div className="section-card" style={{ margin: 0 }}>
          <div className="section-title">Teaching Staff</div>
          <div className="section-subtitle">Academic and instructional staff members</div>
          <table className="custom-table">
            <thead><tr><th>#</th><th>Name</th><th>Dept</th><th>Qualification</th><th>Experience</th><th>Status</th></tr></thead>
            <tbody>
              {TEACHING_STAFF.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.74rem" }}>{i + 1}</td>
                  <td style={{ fontWeight: 700 }}>{s.name}</td>
                  <td>{s.dept}</td>
                  <td style={{ fontSize: "0.75rem" }}>{s.qualification}</td>
                  <td style={{ fontSize: "0.75rem" }}>{s.experience}</td>
                  <td><span className="badge-dept badge-active">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="section-card" style={{ margin: 0 }}>
          <div className="section-title">Non-Teaching Staff</div>
          <div className="section-subtitle">Administrative, technical and support staff</div>
          <table className="custom-table">
            <thead><tr><th>#</th><th>Name</th><th>Role</th><th>Department</th><th>Contact</th><th>Status</th></tr></thead>
            <tbody>
              {NON_TEACHING_STAFF.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.74rem" }}>{i + 1}</td>
                  <td style={{ fontWeight: 700 }}>{s.name}</td>
                  <td style={{ fontSize: "0.77rem" }}>{s.role}</td>
                  <td style={{ fontSize: "0.75rem" }}>{s.dept}</td>
                  <td style={{ fontWeight: 700 }}>{s.contact}</td>
                  <td><span className="badge-dept badge-active">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13 }}>
        {[["156","Teaching Staff","TCH","#08306B"],["84","Non-Teaching","NTC","#1a5ca8"],["240","Total Staff","TOT","#0d4a8a"],["12","On Leave","OL","#b8960c"]].map(([v,l,a,c]) => (
          <StatCard key={l} value={v} label={l} abbr={a} color={c} />
        ))}
      </div>
    </div>
  );
}

function TransportPage() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 20 }}>
        {[["6","Total Buses","BUS","#08306B"],["261","Reg. Students","STU","#1a5ca8"],["6","Active Routes","RTE","#0d4a8a"],["0","Breakdowns Today","BRK","#c0392b"]].map(([v,l,a,c]) => (
          <StatCard key={l} value={v} label={l} abbr={a} color={c} />
        ))}
      </div>
      <div className="section-card">
        <div className="section-title">Transport Fleet Overview</div>
        <div className="section-subtitle">College bus routes and driver information</div>
        <div style={{ overflowX: "auto" }}>
          <table className="custom-table">
            <thead><tr><th>#</th><th>Bus Number</th><th>Route</th><th>Driver Name</th><th>Contact</th><th>Students</th><th>Status</th></tr></thead>
            <tbody>
              {TRANSPORT.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 700 }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 800, color: "#08306B", background: "rgba(8,48,107,0.08)", padding: "3px 9px", borderRadius: 5, fontFamily: "Arial", fontSize: "0.78rem" }}>{t.bus}</span></td>
                  <td>{t.route}</td>
                  <td>{t.driver}</td>
                  <td style={{ fontWeight: 700 }}>{t.contact}</td>
                  <td><strong>{t.students}</strong></td>
                  <td><span className="badge-dept badge-active">Operational</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FeePage() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 15, marginBottom: 20 }}>
        <div className="fee-card" style={{ background: "linear-gradient(135deg, #051f47, #08306B)" }}>
          <div className="fee-amt">Rs.1.82 Cr</div>
          <div className="fee-label">Total Fees to be Collected</div>
        </div>
        <div className="fee-card" style={{ background: "linear-gradient(135deg, #1a5c30, #1a7a40)" }}>
          <div className="fee-amt">Rs.1.30 Cr</div>
          <div className="fee-label">Total Fees Collected (82%)</div>
        </div>
        <div className="fee-card" style={{ background: "linear-gradient(135deg, #9a5e06, #c47a10)" }}>
          <div className="fee-amt">Rs.52 L</div>
          <div className="fee-label">Pending Fees (18%)</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
        <div className="section-card" style={{ margin: 0 }}>
          <div className="section-title">Monthly Fee Collection</div>
          <div className="section-subtitle">Collected vs Pending (in Lakhs)</div>
          <div className="chart-bar-wrap">
            {MONTHLY_FEES.map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 2, fontFamily: "Arial" }}>{m.month} 2025</div>
                <div className="chart-row" style={{ marginBottom: 2 }}>
                  <div className="chart-month">Coll.</div>
                  <div className="bar-track"><div className="bar-fill bar-collected" style={{ width: `${(m.collected / 30) * 100}%` }}>Rs.{m.collected}L</div></div>
                </div>
                <div className="chart-row" style={{ marginBottom: 7 }}>
                  <div className="chart-month">Pend.</div>
                  <div className="bar-track"><div className="bar-fill bar-pending" style={{ width: `${(m.pending / 30) * 100}%` }}>Rs.{m.pending}L</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-card" style={{ margin: 0, marginBottom: 15 }}>
            <div className="section-title">Dept. Collection Rate</div>
            <div className="section-subtitle">Fee collection percentage by department</div>
            <div className="chart-bar-wrap">
              {DEPARTMENTS.slice(0, 6).map((d, i) => {
                const pcts = [88, 76, 82, 91, 74, 85];
                return (
                  <div key={i} className="chart-row">
                    <div className="chart-month" style={{ width: 40, fontSize: "0.64rem" }}>{d.name.split(" ")[0].slice(0, 4)}</div>
                    <div className="bar-track"><div className="bar-fill bar-collected" style={{ width: `${pcts[i]}%` }}>{pcts[i]}%</div></div>
                    <div className="chart-val">{pcts[i]}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
            {[["Scholarship", "248"], ["Defaulters", "87"], ["Fully Paid", "1,843"], ["Partial Pay", "352"]].map(([l, v]) => (
              <div key={l} style={{ background: "var(--content-bg)", borderRadius: 9, padding: "11px 13px", border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 800, fontSize: "1.18rem", color: "#08306B", fontFamily: "Arial" }}>{v}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2, fontFamily: "Arial" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnouncementsPage() {
  const [list, setList] = useState(INITIAL_ANNOUNCEMENTS);
  const [form, setForm] = useState({ title: "", message: "", priority: "Medium" });
  const [success, setSuccess] = useState(false);
  const handleAdd = () => {
    if (!form.title || !form.message) return;
    setList([{ id: Date.now(), title: form.title, message: form.message, priority: form.priority, date: new Date().toISOString().split("T")[0] }, ...list]);
    setForm({ title: "", message: "", priority: "Medium" });
    setSuccess(true); setTimeout(() => setSuccess(false), 3000);
  };
  return (
    <div>
      <div className="section-card">
        <div className="section-title">Post New Announcement</div>
        <div className="section-subtitle">Broadcast a message to all students, faculty, and staff</div>
        <div className="add-annc-form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 12 }}>
            <div>
              <label className="form-label">Announcement Title</label>
              <input className="form-control" placeholder="e.g. Semester Exam Notification..."
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Priority</label>
              <select className="form-control" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label">Message</label>
            <textarea className="form-control" rows={3} placeholder="Write your announcement here..."
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="btn-download" onClick={handleAdd}>Post Announcement</button>
            {success && <span style={{ color: "#1a7a40", fontSize: "0.80rem", fontWeight: 700, fontFamily: "Arial" }}>Announcement posted successfully.</span>}
          </div>
        </div>
      </div>
      <div className="section-card">
        <div className="section-title">All Announcements</div>
        <div className="section-subtitle">{list.length} announcements total</div>
        {list.map(a => (
          <div key={a.id} className="annc-item" style={{ borderLeftColor: a.priority === "High" ? "#c0392b" : a.priority === "Medium" ? "#c47a10" : "#08306B" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
              <span className={`badge-dept badge-${a.priority.toLowerCase()}`}>{a.priority} Priority</span>
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "Arial" }}>{a.date}</span>
            </div>
            <div className="annc-title">{a.title}</div>
            <div className="annc-msg">{a.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    { name: "Student Report",         desc: "Enrollment, attendance and academic performance data",  abbr: "STU", color: "#08306B",  count: "2,530 records" },
    { name: "Faculty Report",         desc: "Faculty profiles, qualifications and appraisal summary", abbr: "FAC", color: "#1a5ca8", count: "156 records" },
    { name: "Staff Report",           desc: "Staff directory, roles, salaries and attendance data",   abbr: "STF", color: "#0d4a8a", count: "240 records" },
    { name: "Fee Collection Report",  desc: "Detailed fee collection and pending dues breakdown",     abbr: "FEE", color: "#b8960c", count: "AY 2025-26" },
    { name: "Transport Report",       desc: "Bus routes, driver details and maintenance records",     abbr: "TRP", color: "#1a7a40", count: "6 routes" },
    { name: "Annual Academic Report", desc: "Annual performance, results and institutional stats",   abbr: "ANN", color: "#c47a10", count: "AY 2024-25" },
  ];
  return (
    <div>
      <div className="section-card">
        <div className="section-title">Reports Center</div>
        <div className="section-subtitle">Download official institutional reports - Last updated: Nov 10, 2025</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 15 }}>
          {reports.map((r, i) => (
            <div key={i} className="report-card">
              <div className="report-icon-box" style={{ background: r.color }}>
                <span className="report-abbr">{r.abbr}</span>
              </div>
              <div className="report-name">{r.name}</div>
              <div className="report-desc">{r.desc}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: 12, fontFamily: "Arial" }}>{r.count}</div>
              <button className="btn-download" onClick={() => alert(`Downloading ${r.name}...`)}>Download Report</button>
            </div>
          ))}
        </div>
      </div>
      <div className="section-card">
        <div className="section-title">Generate Custom Report</div>
        <div className="section-subtitle">Configure and generate a tailored report</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 13, alignItems: "end" }}>
          <div>
            <label className="form-label">Report Type</label>
            <select className="form-control"><option>Student Report</option><option>Faculty Report</option><option>Fee Report</option><option>Attendance Report</option></select>
          </div>
          <div>
            <label className="form-label">Department</label>
            <select className="form-control"><option>All Departments</option>{DEPARTMENTS.map(d => <option key={d.id}>{d.name.split(" ")[0]}</option>)}</select>
          </div>
          <div>
            <label className="form-label">Format</label>
            <select className="form-control"><option>PDF</option><option>Excel</option><option>CSV</option></select>
          </div>
          <button className="btn-download" onClick={() => alert("Generating custom report...")}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const pages = {
    dashboard: <DashboardPage />, departments: <DepartmentsPage />, faculty: <FacultyPage />,
    staff: <StaffPage />, transport: <TransportPage />, fee: <FeePage />,
    announcements: <AnnouncementsPage />, reports: <ReportsPage />,
  };
  return (
    <>
      <style>{CSS}</style>
      {!loggedIn ? (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      ) : (
        <div className="app-layout">
          <Sidebar active={page} onNav={setPage} onLogout={() => setLoggedIn(false)} />
          <div className="main-wrap">
            <Topbar page={page} onLogout={() => setLoggedIn(false)} />
            <div className="content-area">{pages[page]}</div>
          </div>
        </div>
      )}
    </>
  );
}
