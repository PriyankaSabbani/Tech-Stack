import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyCourse from "./pages/MyCourse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CoursePlayer from "./pages/CoursePlayer";
import CourseDetails from "./pages/coursedetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/coursedetails/:id" element={<CourseDetails />} />
        <Route path="/courseplayer/:id" element={<CoursePlayer />} />
        <Route path="/player/:courseId" element={<div>Player Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
