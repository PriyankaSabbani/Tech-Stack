import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { getClasses, getClassStudents } from "../services/api";

export default function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classStudents, setClassStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const classesData = await getClasses();
        setClasses(classesData);
      } catch (error) {
        console.error(error);
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const loadClassStudents = async () => {
        setLoading(true);
        try {
          const data = await getClassStudents(selectedClass._id || selectedClass.id);
          setClassStudents(data.students);
          setStudentCount(data.count);
        } catch (error) {
          console.error(error);
          setClassStudents([]);
          setStudentCount(0);
        } finally {
          setLoading(false);
        }
      };
      loadClassStudents();
    } else {
      setClassStudents([]);
      setStudentCount(0);
    }
  }, [selectedClass]);

  return (
    <div>
      <h1 className="page-title">My Classes</h1>

      <div className="cards-grid">
        {classes.map((item, index) => (
          <SectionCard
            key={`class-${item._id || item.id || index}`}
            title={`${item.semester} - Section ${item.section}`}
            buttonText="View Class"
            onButtonClick={() => setSelectedClass(item)}
          >
            <p><strong>Year:</strong> {item.year}</p>
            <p><strong>Students:</strong> {item.students || 'N/A'}</p>
            <p><strong>Department:</strong> {item.department}</p>
            <p><strong>Room:</strong> {item.room}</p>
            <p><strong>Class Teacher:</strong> {item.classTeacher}</p>
          </SectionCard>
        ))}
      </div>

      {selectedClass && (
        <div className="details-wrapper">
          <h2 className="details-title">
            {selectedClass.semester} - Section {selectedClass.section} ({studentCount} students)
          </h2>

          <div className="info-card">
            <p><strong>Year:</strong> {selectedClass.year}</p>
            <p><strong>Department:</strong> {selectedClass.department}</p>
            <p><strong>Room:</strong> {selectedClass.room}</p>
            <p><strong>Class Teacher:</strong> {selectedClass.classTeacher}</p>
          </div>

          <div className="table-card">
            <h3 className="student-list-title">Students List</h3>
            {loading ? (
              <p>Loading students...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Branch</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.length > 0 ? (
                    classStudents.map((student, index) => (
                      <tr key={student._id || student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.roll}</td>
                        <td>{student.branch}</td>
                        <td>{student.attendance}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

