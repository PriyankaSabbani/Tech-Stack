import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { addAnnouncement, getAnnouncements } from "../services/api";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullText: "",
  });

  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.fullText.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAnnouncement = {
      ...formData,
      date: new Date().toLocaleDateString(),
    };

    await addAnnouncement(newAnnouncement);
    await loadAnnouncements();

    setFormData({
      title: "",
      description: "",
      fullText: "",
    });
  };

  return (
    <div>
      <h1 className="page-title">Announcements</h1>

      <form onSubmit={handleAddAnnouncement} className="announcement-form-card announcement-form">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
        />
        <textarea
          name="fullText"
          value={formData.fullText}
          onChange={handleChange}
          placeholder="Full text"
        />
        <button type="submit" className="primary-btn">Add Announcement</button>
      </form>

      <div className="cards-grid">
        {announcements.map((item) => (
          <SectionCard
            key={item.id}
            title={item.title}
            buttonText="Read More"
            onButtonClick={() => setSelectedAnnouncement(item)}
          >
            <p>{item.description}</p>
            <p><strong>Date:</strong> {item.date}</p>
          </SectionCard>
        ))}
      </div>

      {selectedAnnouncement && (
        <div className="details-wrapper">
          <h2 className="details-title">{selectedAnnouncement.title}</h2>

          <div className="info-card">
            <p><strong>Date:</strong> {selectedAnnouncement.date}</p>
            <p><strong>Description:</strong> {selectedAnnouncement.description}</p>
            <p><strong>Full Details:</strong> {selectedAnnouncement.fullText}</p>
          </div>
        </div>
      )}
    </div>
  );
}