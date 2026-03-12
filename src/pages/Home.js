import "../styles/Home.css";
import college from "../assets/college.jpg";

function Home() {
return ( <div>

```
  {/* ANNOUNCEMENT BAR */}
  <div className="announcement-bar">
    <div className="announcement-text">
      Admissions Open for 2026 Batch | AI Workshop this Friday | Campus Placement Drive Next Week | National Hackathon Registrations Started
    </div>
  </div>

  {/* HERO SECTION */}
  <div id="home" className="hero">
    <img src={college} alt="college" className="hero-image" />

    <div className="hero-text">
      <h1>MRIET Solutions</h1>
      <p>Smart Digital Platform for College Management</p>
    </div>
  </div>

  {/* ABOUT SECTION */}
  <div id="about" className="about-section">

    <h2>About the College</h2>

    <p>
      Malla Reddy Institute of Engineering and Technology (MRIET) is one of the
      leading engineering institutions in Hyderabad, focusing on innovation,
      research, and industry collaboration.
    </p>

    <p>
      The institute provides modern laboratories, experienced faculty, and
      strong placement support to prepare students for future technological
      challenges.
    </p>

  </div>

  {/* FACULTY SECTION */}
  <div className="faculty-section">

    <h2>Our Faculty</h2>

    <div className="faculty-container">

      <div className="faculty-card">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="faculty"/>
        <h3>Dr. Ramesh Kumar</h3>
        <p>Professor – Computer Science</p>
      </div>

      <div className="faculty-card">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="faculty"/>
        <h3>Dr. Sneha Reddy</h3>
        <p>Associate Professor – AI & ML</p>
      </div>

      <div className="faculty-card">
        <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="faculty"/>
        <h3>Dr. Rajesh Sharma</h3>
        <p>Assistant Professor – Data Science</p>
      </div>

    </div>

  </div>

  {/* DEPARTMENTS */}
  <div id="departments" className="department-section">

    <h2>Departments</h2>

    <div className="department-container">

      <div className="department-card">
        <img
          src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
          alt="cse"
        />
        <h3>Computer Science Engineering</h3>
        <p>Focus on AI, ML, Data Science and Software Development.</p>
      </div>

      <div className="department-card">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60"
          alt="ece"
        />
        <h3>Electronics & Communication</h3>
        <p>Advanced learning in communication systems.</p>
      </div>

      <div className="department-card">
        <img
          src="https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg"
          alt="mech"
        />
        <h3>Mechanical Engineering</h3>
        <p>Manufacturing, robotics and mechanical design.</p>
      </div>

    </div>

  </div>

  {/* PLACEMENTS */}
  <div id="placements" className="placement-section">

    <h2>Placements</h2>

    <div className="placement-container">

      <div className="placement-card">
        <h3>1200+</h3>
        <p>Students Placed</p>
      </div>

      <div className="placement-card">
        <h3>45 LPA</h3>
        <p>Highest Package</p>
      </div>

      <div className="placement-card">
        <h3>350+</h3>
        <p>Recruiting Companies</p>
      </div>

    </div>

  </div>

  {/* CONTACT */}
  <div id="contact" className="contact-section">

    <h2>Contact Us</h2>

    <p>
      Malla Reddy Institute of Engineering & Technology  
      Maisammaguda, Hyderabad, Telangana
    </p>

    <p>
      Phone: +91 9293949566
    </p>

    <p>
      Email: info@mriet.ac.in
    </p>

  </div>

  {/* LATEST UPDATES */}
  <div className="updates-section">

    <h2>Latest Updates</h2>

    <div className="updates-box">
      <p>New AI Research Lab inaugurated at MRIET campus</p>
      <p>Admissions open for B.Tech 2026 batch</p>
      <p>National level hackathon conducted for engineering students</p>
      <p>Campus placement drive scheduled next week</p>
    </div>

  </div>

</div>

);
}

export default Home;
