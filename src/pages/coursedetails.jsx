import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams(); // Get course id from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/courses/${id}`);
        setCourse(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch course details:", err);
        setError("Could not load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div style={styles.container}>
      <h1>{course.title}</h1>
      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <p>
        <strong>Duration:</strong> {course.duration} | <strong>Level:</strong> {course.level}
      </p>
      {course.image && (
        <img src={course.image} alt={course.title} style={styles.image} />
      )}
      <p style={styles.description}>{course.description}</p>

      {Array.isArray(course.videos) && course.videos.length > 0 && (
        <>
          <div style={styles.actions}>
            <button
              style={styles.primaryButton}
              onClick={() => navigate(`/courseplayer/${course.id}`)}
            >
              Play course
            </button>
          </div>

          <h2>Videos</h2>
          <ul style={styles.videoList}>
            {course.videos.map((v, idx) => (
              <li key={idx} style={styles.videoItem}>
                <span>{v.title || `Part ${idx + 1}`}</span>
                <button
                  style={styles.smallButton}
                  onClick={() => navigate(`/courseplayer/${course.id}?v=${idx}`)}
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 8,
    marginBottom: "1rem",
  },
  description: {
    fontSize: 18,
    marginBottom: "1.5rem",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9
    height: 0,
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: "2rem",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    margin: "1rem 0",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "0.6rem 1rem",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  videoList: {
    listStyle: "none",
    padding: 0,
    margin: "0.75rem 0 0",
  },
  videoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.6rem 0.75rem",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    marginBottom: "0.6rem",
  },
  smallButton: {
    backgroundColor: "#111827",
    color: "#fff",
    border: "none",
    padding: "0.45rem 0.75rem",
    borderRadius: 8,
    cursor: "pointer",
  },
};