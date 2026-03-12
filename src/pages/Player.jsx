// Player.jsx
import React, { useState } from "react";

// Props: course = {id, title, instructor, duration, level, image, video, lessons}
const Player = ({ course }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (!course) return <p>No course selected.</p>;

  return (
    <div style={styles.container}>
      {/* Course Info */}
      <div style={styles.header}>
        <img src={course.image} alt={course.title} style={styles.thumbnail} />
        <div>
          <h2 style={styles.title}>{course.title}</h2>
          <p style={styles.instructor}>
            Instructor: <strong>{course.instructor}</strong>
          </p>
          <p style={styles.details}>
            Duration: {course.duration} | Level: {course.level}
          </p>
        </div>
      </div>

      {/* Video Player */}
      <div style={styles.videoWrapper}>
        <iframe
          style={styles.iframe}
          src={course.video + "?rel=0"}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Lessons List */}
      {course.lessons && course.lessons.length > 0 && (
        <div style={styles.lessons}>
          <h3>Lessons</h3>
          <ul style={styles.lessonList}>
            {course.lessons.map((lesson, index) => (
              <li
                key={index}
                style={{
                  ...styles.lessonItem,
                  backgroundColor:
                    selectedLesson === index ? "#f0f0f0" : "transparent",
                }}
                onClick={() => setSelectedLesson(index)}
              >
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "1rem",
  },
  thumbnail: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  title: {
    fontSize: "1.8rem",
    margin: "0 0 0.5rem 0",
    color: "#333",
  },
  instructor: {
    margin: "0 0 0.3rem 0",
    color: "#555",
  },
  details: {
    margin: 0,
    fontStyle: "italic",
    color: "#777",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9 ratio
    height: 0,
    overflow: "hidden",
    marginBottom: "1rem",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  },
  lessons: {
    marginTop: "1rem",
  },
  lessonList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  lessonItem: {
    padding: "0.5rem 1rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.2s",
  },
};

export default Player;