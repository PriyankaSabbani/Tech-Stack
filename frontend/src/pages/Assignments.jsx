import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { addAssignment, getAssignments } from "../services/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    className: "",
    due: "",
    status: "Active"
  });
  const [isAdding, setIsAdding] = useState(false);

  const loadAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    if (!formData.title.trim() || !formData.className.trim() || !formData.due) {
      alert("Please fill required fields");
      setIsAdding(false);
      return;
    }

    try {
      await addAssignment(formData);
      await loadAssignments();
      setFormData({
        title: "",
        className: "",
        due: "",
        status: "Active"
      });
      alert("Assignment added successfully!");
    } catch (error) {
      alert("Failed to add assignment: " + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Assignments</h1>

      <form onSubmit={handleAddAssignment} className="material-form-card">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Assignment Title"
          required
        />
        <input
          name="className"
          value={formData.className}
          onChange={handleChange}
          placeholder="Class (e.g., CSE 3A)"
          required
        />
        <input
          name="due"
          type="date"
          value={formData.due}
          onChange={handleChange}
          required
        />
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Assignment"}
        </button>
      </form>

      <div className="cards-grid">
        {assignments.map((item) => (
          <SectionCard
            key={item.id}
            title={item.title}
            buttonText="View Submissions"
            onButtonClick={() => setSelectedAssignment(item)}
          >
            <p><strong>Class:</strong> {item.className}</p>
            <p><strong>Deadline:</strong> {item.due}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </SectionCard>
        ))}
      </div>

      {selectedAssignment && (
        <div className="details-wrapper">
          <h2 className="details-title">{selectedAssignment.title} - Submissions</h2>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Status</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {selectedAssignment.submissions?.length > 0 ? (
                  selectedAssignment.submissions.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.roll}</td>
                      <td>{student.status}</td>
                      <td>{student.marks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No submissions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}