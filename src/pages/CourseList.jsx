import React, { useState } from "react";

// Sample courses JSON (or import from courses.json)
import coursesData from "./courses.json"; // Make sure you save your JSON as courses.json

function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div style={{ display: "flex", padding: "20px", gap: "30px" }}>
      {/* Courses List */}
      <div style={{ flex: 1 }}>
        <h2>Courses</h2>
        {coursesData.courses.map((course) => (
          <div
            key={course.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: selectedCourse?.id === course.id ? "#f0f8ff" : "#fff",
            }}
            onClick={() => {
              setSelectedCourse(course);
              setSelectedVideo(course.videos[0]); // select first video by default
            }}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{ width: "60px", marginRight: "15px" }}
            />
            <div>
              <h5>{course.title}</h5>
              <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                Instructor: {course.instructor} | Duration: {course.duration} | Level: {course.level}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player */}
      <div style={{ flex: 2 }}>
        {selectedCourse ? (
          <div>
            <h2>{selectedCourse.title} - Videos</h2>

            {/* Video list */}
            <ul>
              {selectedCourse.videos.map((video, idx) => (
                <li
                  key={idx}
                  style={{
                    cursor: "pointer",
                    color: selectedVideo === video ? "#007bff" : "#000",
                    marginBottom: "8px",
                  }}
                  onClick={() => setSelectedVideo(video)}
                >
                  {video.title}
                </li>
              ))}
            </ul>

            {/* Video player */}
            {selectedVideo && (
              <div style={{ marginTop: "20px" }}>
                {selectedVideo.url.includes("youtube") ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedVideo.url.replace("watch?v=", "embed/")}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video width="100%" height="400" controls>
                    <source src={selectedVideo.url} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Select a course to watch its videos</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;