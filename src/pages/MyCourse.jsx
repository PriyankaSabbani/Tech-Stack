import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- import here
import CourseCard from "../components/coursecard";

export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/courses");
        setCourses(response.data); // adjust if your API wraps data inside an object
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h1>My Course</h1>
      <div className="d-flex flex-wrap gap-3">
        {courses.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}                   // Pass id here
            image={item.image || item.thumbnail || item.img}
            title={item.title}
            description={item.instructor}
            price={item.price}
            video={item.video}             // Optional, if you want
          />
        ))}
      </div>
    </div>
  );
}