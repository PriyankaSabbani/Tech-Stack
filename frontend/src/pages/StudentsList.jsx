import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addStudent, getStudents, getClassStudents } from "../services/api";

export default function StudentsList() {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId');
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [classTitle, setClassTitle] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    department: "",
    branch: "",
    semester: "",
    section: "",
    attendance: "90%"
  });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    try {
      if (classId) {
        const data = await getClassStudents(classId);
        setStudents(data.students);
        setCount(data.count);
        setClassTitle(`Class Students (${data.count})`);
      } else {
        const data = await getStudents();
        setStudents(data);
        setCount(data.length);
        setClassTitle(`All Students (${data.length})`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [classId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    if (!formData.name.trim() || !formData.roll.trim() || !formData.department.trim()) {
      alert("Please fill required fields");
      setIsAdding(false);
      return;
    }

    try {
      await addStudent(formData);
      await loadStudents();
      setFormData({
        name: "",
        roll: "",
        department: "",
        branch: "",
        semester: "",
        section: "",
        attendance: "90%"
      });
      alert("Student added successfully!");
    } catch (error) {
      alert("Failed to add student: " + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">{classTitle || 'Students List'}</h1>

      <form onSubmit={handleAddStudent} className="material-form-card">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Student Name"
          required
        />
        <input
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          placeholder="Roll Number"
          required
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Branch"
        />
        <input
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
        />
        <input
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
        />
        <input
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          placeholder="Attendance %"
        />
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Student"}
        </button>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Section</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">Loading...</td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id || student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.branch}</td>
                  <td>{student.semester}</td>
                  <td>{student.section}</td>
                  <td>{student.attendance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}