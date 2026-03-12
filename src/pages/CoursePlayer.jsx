import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function CoursePlayer() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPart, setSelectedPart] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/courses");
        const foundCourse = response.data.find((c) => String(c.id) === id);
        if (!foundCourse) {
          setError("Course not found.");
          setCourse(null);
        } else {
          setCourse(foundCourse);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load course.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    setSelectedPart(0);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [course?.id]);

  useEffect(() => {
    const v = searchParams.get("v");
    const idx = v == null ? null : Number(v);
    if (idx == null || Number.isNaN(idx)) return;
    if (idx < 0) return;
    setSelectedPart(idx);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [searchParams]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration && !Number.isNaN(duration)) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handlePartClick = (index) => {
    setSelectedPart(index);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("v", String(index));
      return next;
    });
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!course) return <p>No course found.</p>;

  const parts = course.videos || course.parts || course.lessons || [];
  const currentPart = Array.isArray(parts) ? parts[selectedPart] : null;

  const currentVideoUrl =
    (currentPart &&
      (currentPart.url || currentPart.video || currentPart.src)) ||
    course.video ||
    course.url;

  return (
    <div style={styles.page}>
      <div style={styles.playerContainer}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{course.title}</h1>
            <p style={styles.meta}>
              {course.instructor && (
                <>
                  <strong>Instructor:</strong> {course.instructor}
                </>
              )}
              {course.duration && (
                <>
                  {" "}
                  | <strong>Duration:</strong> {course.duration}
                </>
              )}
              {course.level && (
                <>
                  {" "}
                  | <strong>Level:</strong> {course.level}
                </>
              )}
            </p>
          </div>
        </div>

        {currentVideoUrl ? (
          <div style={styles.videoWrapper}>
            <video
              ref={videoRef}
              style={styles.video}
              src={currentVideoUrl}
              controls
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        ) : (
          <p>video available.</p>
        )}

        <div style={styles.progressContainer}>
          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>
          <span style={styles.progressLabel}>
            {Math.round(progress)}% completed
          </span>
        </div>
      </div>

      {Array.isArray(parts) && parts.length > 0 && (
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Course Content</h2>
          <ul style={styles.partList}>
            {parts.map((part, index) => {
              const label =
                typeof part === "string"
                  ? part
                  : part.title || part.name || `Part ${index + 1}`;

              return (
                <li
                  key={index}
                  style={{
                    ...styles.partItem,
                    backgroundColor:
                      index === selectedPart ? "#eef2ff" : "transparent",
                    fontWeight: index === selectedPart ? 600 : 400,
                  }}
                  onClick={() => handlePartClick(index)}
                >
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    gap: "1.5rem",
    padding: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },
  playerContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.6rem",
    color: "#111827",
  },
  meta: {
    margin: "0.4rem 0 0",
    fontSize: "0.95rem",
    color: "#6b7280",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: "#000",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  progressContainer: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  progressTrack: {
    flex: 1,
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #2563eb)",
  },
  progressLabel: {
    fontSize: "0.85rem",
    color: "#4b5563",
    minWidth: "80px",
    textAlign: "right",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  sidebarTitle: {
    margin: "0 0 0.75rem 0",
    fontSize: "1.1rem",
    color: "#111827",
  },
  partList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  partItem: {
    padding: "0.6rem 0.75rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "#111827",
    transition: "background-color 0.15s ease, transform 0.05s ease",
  },
};
