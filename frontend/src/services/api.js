const BASE_URL = "http://localhost:5000/api";

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
}

async function postData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to add data to ${endpoint}`);
  }

  return response.json();
}

async function putData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update ${endpoint}`);
  }

  return response.json();
}

// Dashboard
export const getStats = () => fetchData("stats");
export const getTimetable = () => fetchData("timetable");

// Profile
export const getProfile = () => fetchData("profile");
export const updateProfile = (data) => putData("profile", data);

// Main pages
export const getDepartments = () => fetchData("departments");
export const getClasses = () => fetchData("classes");
export const getSubjects = () => fetchData("subjects");
export const getStudents = () => fetchData("students");
export const getClassStudents = (classId) => fetchData(`classes/${classId}/students`);
export const getSubjectStudents = (subjectId) => fetchData(`subjects/${subjectId}/students`);
export const addStudent = (data) => postData("students", data);
export const getAttendance = () => fetchData("attendance");
export const postAttendance = (data) => postData("attendance", data);
export const getAssignments = () => fetchData("assignments");
export const addAssignment = (data) => postData("assignments", data);

// Materials
export const getMaterials = () => fetchData("materials");
export const addMaterial = (data) => postData("materials", data);
export const uploadMaterial = (formData) => {
  return fetch(`${BASE_URL}/materials/upload`, {
    method: 'POST',
    body: formData
  }).then(res => {
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  });
};

// Announcements
export const getAnnouncements = () => fetchData("announcements");
export const addAnnouncement = (data) => postData("announcements", data);