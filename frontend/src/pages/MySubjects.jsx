import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { getSubjects, getSubjectStudents } from "../services/api";

export default function MySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [subjectStudentsData, setSubjectStudentsData] = useState({ students: [], count: 0 });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const handleSelectSubject = async (subject) => {
    setSelectedSubject(subject);
    if (subject && subject.id) {
      setLoading(true);
      try {
        const data = await getSubjectStudents(subject.id);
        setSubjectStudentsData(data);
      } catch (error) {
        console.error(error);
        setSubjectStudentsData({ students: [], count: 0 });
      } finally {
        setLoading(false);
      }
    }
  };

  const subjectStudents = subjectStudentsData.students;
  const studentCount = subjectStudentsData.count;

  return (
    <div>
      <h1 className="page-title">My Subjects</h1>

      <div className="cards-grid">
        {subjects.map((subject) => (
          <SectionCard
            key={subject.id}
            title={subject.name}
            buttonText="View Subject"
            onButtonClick={() => handleSelectSubject(subject)}
          >
            <p><strong>Code:</strong> {subject.code}</p>
            <p><strong>Semester:</strong> {subject.semester}</p>
            <p><strong>Faculty:</strong> {subject.faculty}</p>
          </SectionCard>
        ))}
      </div>

      {selectedSubject && (
        <div className="details-wrapper">
          <h2 className="details-title">
            {selectedSubject.name} ({studentCount} students)
          </h2>

          <div className="info-card">
            <p><strong>Code:</strong> {selectedSubject.code}</p>
            <p><strong>Semester:</strong> {selectedSubject.semester}</p>
            <p><strong>Department:</strong> {selectedSubject.department}</p>
            <p><strong>Faculty:</strong> {selectedSubject.faculty}</p>
          </div>

          <div className="table-card">
            <h3 className="student-list-title">Units</h3>
            <ul className="units-list">
              {selectedSubject.units?.map((unit, index) => (
                <li key={index}>{unit}</li>
              ))}
            </ul>
          </div>

          <div className="table-card">
            <h3 className="student-list-title">Students</h3>
            {loading ? (
              <div className="no-data">Loading students...</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectStudents.length > 0 ? (
                    subjectStudents.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.roll}</td>
                        <td>{student.branch}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No students found for this subject</td>
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

