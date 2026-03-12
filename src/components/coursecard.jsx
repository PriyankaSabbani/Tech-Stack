import React from "react";
import { useNavigate } from "react-router-dom";
import "./coursecard.css";

const CourseCard = ({ id, image, title, description, price }) => {
  const navigate = useNavigate();

  const handlePlayVideo = () => {
    // Navigate to course video player page with course id
    navigate(`/courseplayer/${id}`);
  };

  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {price && <p>Price: {price}</p>}

      <img
        src={image}
        alt={title}
        className="course-thumbnail"
        style={{ cursor: "pointer" }}
        onClick={handlePlayVideo}
      />
      <button onClick={handlePlayVideo}>Play Video</button>
    </div>
  );
};

export default CourseCard;