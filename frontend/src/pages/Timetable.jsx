import React, { useEffect, useState } from "react";
import { getTimetable } from "../services/api";

export default function Timetable() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    getTimetable().then(setTimetable).catch(console.error);
  }, []);
  if (timetable.length === 0) {
    return (
      <div>
        <h1 className="page-title">Timetable</h1>
        <p>Loading timetable...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Timetable</h1>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, index) => (
              <tr key={index}>
                <td>{item.day || 'N/A'}</td>
                <td>{item.time}</td>
                <td>{item.subject}</td>
                <td>{item.className}</td>
                <td>{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}