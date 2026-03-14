import React, { useEffect, useState } from "react";
import { getAttendance, postAttendance } from "../services/api";

export default function Attendance() {
  const [classesData, setClassesData] = useState([]); 

  useEffect(() => {
    getAttendance().then(setClassesData).catch(console.error);
  }, []);
  const [selectedClassId, setSelectedClassId] = useState(1);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const selectedClass = classesData.find(
    (item) => item.id === Number(selectedClassId)
  ) || { students: [], className: '', subject: '' };

  const handleStatusChange = (studentId, newStatus) => {
    const updatedClasses = classesData.map((cls) => {
      if (cls.id === Number(selectedClassId)) {
        return {
          ...cls,
          students: cls.students.map((student) =>
            student.id === studentId
              ? { ...student, status: newStatus }
              : student
          ),
        };
      }
      return cls;
    });

    setClassesData(updatedClasses);
  };

  const presentCount = selectedClass.students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = selectedClass.students.filter(
    (student) => student.status === "Absent"
  ).length;

const handleSaveAttendance = async () => {
    try {
      await postAttendance({
        className: selectedClass.className,
        subject: selectedClass.subject,
        date: attendanceDate,
        students: selectedClass.students,
      });
      alert('Attendance saved successfully!');
      // Refetch to update list
      const updatedData = await getAttendance();
      setClassesData(updatedData);
    } catch (error) {
      alert('Failed to save attendance: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="page-title">Attendance Management</h1>

      <div className="attendance-topbar">
        <div className="attendance-field">
          <label>Select Class</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            {classesData.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.className} - {cls.subject}
              </option>
            ))}
          </select>
        </div>

        <div className="attendance-field">
          <label>Select Date</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
      </div>

      <div className="attendance-summary">
        <div className="summary-box">
          <h3>Total Students</h3>
          <p>{selectedClass.students.length}</p>
        </div>
        <div className="summary-box">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>
        <div className="summary-box">
          <h3>Absent</h3>
          <p>{absentCount}</p>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass.students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.roll}</td>
                <td>{student.name}</td>
                <td>
                  <div className="attendance-actions">
                    <button
                      className={
                        student.status === "Present"
                          ? "attendance-btn present active-present"
                          : "attendance-btn present"
                      }
                      onClick={() =>
                        handleStatusChange(student.id, "Present")
                      }
                    >
                      Present
                    </button>

                    <button
                      className={
                        student.status === "Absent"
                          ? "attendance-btn absent active-absent"
                          : "attendance-btn absent"
                      }
                      onClick={() =>
                        handleStatusChange(student.id, "Absent")
                      }
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="save-btn" onClick={handleSaveAttendance}>
          Save Attendance
        </button>
      </div>
    </div>
  );
}