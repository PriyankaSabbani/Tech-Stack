import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { addMaterial, getMaterials, uploadMaterial } from "../services/api";

export default function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "PDF",
    subject: "",
    date: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (
      !formData.title.trim() ||
      !formData.subject.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      alert("Please fill all fields");
      setIsUploading(false);
      return;
    }

    try {
      let newMaterial;
      if (file) {
        // Upload file
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('file', file);

        newMaterial = await uploadMaterial(formDataToSend);
      } else {
        // JSON for links/notes
        newMaterial = {
          ...formData,
          uploadedBy: "Faculty",
        };
        await addMaterial(newMaterial);
      }

      await loadMaterials();
      setFormData({
        title: "",
        type: "PDF",
        subject: "",
        date: "",
        description: "",
      });
      setFile(null);
      alert("Material added successfully!");
    } catch (error) {
      alert("Failed to add material: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Study Materials</h1>

      <form onSubmit={handleAddMaterial} className="material-form-card material-form">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="PDF">PDF</option>
          <option value="PPT">PPT</option>
          <option value="Link">Link</option>
          <option value="Notes">Notes</option>
          <option value="Video">Video</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
          className="file-input"
        />
        <button type="submit" className="primary-btn" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Add Material'}
        </button>
      </form>

      <div className="cards-grid">
{materials.map((item, index) => (
          <SectionCard
            key={item._id || item.id || index}
            title={item.title}
            buttonText="Open Material"
            onButtonClick={() => {
              if (item.filePath) {
                window.open('http://localhost:5000' + item.filePath, '_blank');
              } else {
                setSelectedMaterial(item);
              }
            }}

          >
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Subject:</strong> {item.subject}</p>
            <p><strong>Date:</strong> {item.date}</p>
          </SectionCard>
        ))}
      </div>

      {selectedMaterial && (
        <div className="details-wrapper">
          <h2 className="details-title">{selectedMaterial.title}</h2>

          <div className="info-card">
            <p><strong>Type:</strong> {selectedMaterial.type}</p>
            <p><strong>Subject:</strong> {selectedMaterial.subject}</p>
            <p><strong>Date:</strong> {selectedMaterial.date}</p>
            <p><strong>Uploaded By:</strong> {selectedMaterial.uploadedBy}</p>
            <p><strong>Description:</strong> {selectedMaterial.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}