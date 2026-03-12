import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
const [open, setOpen] = useState(false);

return ( <nav className="navbar"> <div className="logo-section"> <img src={logo} alt="logo" className="logo" /> <h2>MRIET Solutions</h2> </div>

  <ul className="nav-links">
    <li>
      <Link to="/">Home</Link>
    </li>

    <li>
      <a href="#about">About</a>
    </li>

    <li>
      <a href="#departments">Departments</a>
    </li>

    <li>
      <a href="#placements">Placements</a>
    </li>

    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>

  <div className="dropdown">
    <button
      className="portal-btn"
      onClick={() => setOpen(!open)}
    >
      Portal Login ▼
    </button>

    {open && (
      <div className="dropdown-menu">

        <Link
          to="/student-login"
          className="dropdown-item"
          onClick={() => setOpen(false)}
        >
          Student Login
        </Link>

        <Link
          to="/admin-login"
          className="dropdown-item"
          onClick={() => setOpen(false)}
        >
          Admin Login
        </Link>

        <Link
          to="/parent-login"
          className="dropdown-item"
          onClick={() => setOpen(false)}
        >
          Parent Login
        </Link>

      </div>
    )}
  </div>
</nav>

);
}

export default Navbar;
