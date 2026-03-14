import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { getDepartments } from "../services/api";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error);
  }, []);

  const handleViewDepartment = (dept) => {
    setSelectedDepartment(dept);
  };

  return (
    <div>
      <h1 className="page-title">Departments</h1>

      <div className="cards-grid">
        {departments.length === 0 ? (
          <p>Loading departments...</p>
        ) : (
          departments.map((dept) => (
            <SectionCard
              key={dept.id || dept._id}
              title={`${dept.code || 'N/A'} Department`}
              buttonText="View Department"
              onButtonClick={() => handleViewDepartment(dept)}
            >
              <p><strong>Name:</strong> {dept.name}</p>
              <p><strong>HOD:</strong> {dept.hod}</p>
              <p><strong>Total Students:</strong> {dept.totalStudents}</p>
              <p><strong>Total Classes:</strong> {dept.totalClasses}</p>
            </SectionCard>
          ))
        )}
      </div>

      {selectedDepartment && (
        <div className="department-details-wrapper">
          <h2 className="details-title">
            {selectedDepartment.name} ({selectedDepartment.code})
          </h2>

          <div className="department-info-card">
            <p><strong>Department Code:</strong> {selectedDepartment.code}</p>
            <p><strong>HOD:</strong> {selectedDepartment.hod}</p>
            <p><strong>Total Students:</strong> {selectedDepartment.totalStudents}</p>
            <p><strong>Total Classes:</strong> {selectedDepartment.totalClasses}</p>
            <p>
              <strong>Semesters:</strong> {selectedDepartment.semesters.join(", ")}
            </p>
          </div>

          <div className="table-card">
            <h3 className="student-list-title">Department Classes List</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Class Name</th>
                  <th>Year</th>
                  <th>Section</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {selectedDepartment.classesList && selectedDepartment.classesList.length > 0 ? (
                  selectedDepartment.classesList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.className}</td>
                      <td>{item.year}</td>
                      <td>{item.section}</td>
                      <td>{item.students}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No classes data available</td>
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