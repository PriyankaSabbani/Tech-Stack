import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import {
  getStats,
  getTimetable,
  getAnnouncements,
  getAssignments,
} from "../services/api";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, timetableData, announcementData, assignmentData] =
          await Promise.all([
            getStats(),
            getTimetable(),
            getAnnouncements(),
            getAssignments(),
          ]);

        setStats(statsData);
        setTimetable(timetableData);
        setAnnouncements(announcementData);
        setAssignments(assignmentData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="page-title">Faculty Dashboard Home</h1>

      <div className="stats-grid">
        <StatCard title="Total Classes" value={stats.totalClasses} subtitle="This semester" />
        <StatCard title="My Subjects" value={stats.subjects} subtitle="Assigned subjects" />
        <StatCard title="Students" value={stats.students} subtitle="Across all sections" />
        <StatCard title="Today Classes" value={stats.todayClasses} subtitle="Scheduled today" />
      </div>

      <div className="cards-grid">
        <SectionCard
          title="Today's Schedule"
          buttonText="View Timetable"
          onButtonClick={() => setActiveSection("timetable")}
        >
          {timetable.slice(0, 3).map((item) => (
            <p key={item.id}>
              {item.time} - {item.subject} - {item.className}
            </p>
          ))}
        </SectionCard>

        <SectionCard
          title="Recent Announcements"
          buttonText="Open Notices"
          onButtonClick={() => setActiveSection("notices")}
        >
          {announcements.slice(0, 3).map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </SectionCard>

        <SectionCard
          title="Pending Work"
          buttonText="Check Assignments"
          onButtonClick={() => setActiveSection("assignments")}
        >
          {assignments.slice(0, 3).map((item) => (
            <p key={item.id}>{item.title} - {item.className}</p>
          ))}
        </SectionCard>
      </div>

      {activeSection === "timetable" && (
        <div className="details-wrapper">
          <h2 className="details-title">Today Timetable</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
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
      )}

      {activeSection === "notices" && (
        <div className="details-wrapper">
          <h2 className="details-title">Recent Notices</h2>
          <div className="cards-grid">
            {announcements.map((item) => (
              <div className="notice-card" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "assignments" && (
        <div className="details-wrapper">
          <h2 className="details-title">Pending Assignments</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Assignment</th>
                  <th>Class</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.className}</td>
                    <td>{item.due}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}