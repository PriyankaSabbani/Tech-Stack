import React from "react";

export default function SectionCard({
  title,
  children,
  buttonText = "View",
  onButtonClick,
}) {
  return (
    <div className="section-card">
      <h3>{title}</h3>

      <div className="section-card-content">{children}</div>

      <button className="primary-btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}