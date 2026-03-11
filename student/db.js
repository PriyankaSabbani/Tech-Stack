// Data service module to fetch data from db.json

const DB_URL = '/db.json';

// Cache for storing fetched data
let cache = null;

/**
 * Fetch all data from db.json
 */
export async function fetchAllData() {
    if (cache) {
        return cache;
    }

    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        cache = await response.json();
        return cache;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

/**
 * Get student data
 */
export async function getStudent() {
    const data = await fetchAllData();
    return data.student;
}

/**
 * Get login credentials
 */
export async function getLoginCredentials() {
    const data = await fetchAllData();
    return data.login;
}

/**
 * Validate login credentials
 */
export async function validateLogin(studentId, password) {
    const credentials = await getLoginCredentials();
    return credentials.studentId === studentId && credentials.password === password;
}

/**
 * Get attendance data
 */
export async function getAttendance() {
    const data = await fetchAllData();
    return data.attendance;
}

/**
 * Get attendance dates
 */
export async function getAttendanceDates() {
    const data = await fetchAllData();
    return data.attendanceDates;
}

/**
 * Get courses data
 */
export async function getCourses() {
    const data = await fetchAllData();
    return data.courses;
}

/**
 * Get upcoming assignments
 */
export async function getUpcomingAssignments() {
    const data = await fetchAllData();
    return data.upcomingAssignments;
}

/**
 * Get recent results
 */
export async function getRecentResults() {
    const data = await fetchAllData();
    return data.recentResults;
}

/**
 * Get quick links
 */
export async function getQuickLinks() {
    const data = await fetchAllData();
    return data.quickLinks;
}

/**
 * Get dashboard stats
 */
export async function getDashboardStats() {
    const data = await fetchAllData();
    return data.dashboardStats;
}

/**
 * Get today's schedule
 */
export async function getTodaySchedule() {
    const data = await fetchAllData();
    return data.todaySchedule;
}

/**
 * Get fee history
 */
export async function getFeeHistory() {
    const data = await fetchAllData();
    return data.feeHistory;
}

/**
 * Get due items
 */
export async function getDueItems() {
    const data = await fetchAllData();
    return data.dueItems;
}

/**
 * Get fee breakdown
 */
export async function getFeeBreakdown() {
    const data = await fetchAllData();
    return data.feeBreakdown;
}

/**
 * Get borrowed books
 */
export async function getBorrowedBooks() {
    const data = await fetchAllData();
    return data.borrowedBooks;
}

/**
 * Get available books
 */
export async function getAvailableBooks() {
    const data = await fetchAllData();
    return data.availableBooks;
}

/**
 * Get notifications
 */
export async function getNotifications() {
    const data = await fetchAllData();
    return data.notifications;
}

/**
 * Get semester results
 */
export async function getSemResults() {
    const data = await fetchAllData();
    return data.semResults;
}

/**
 * Get CGPA data
 */
export async function getCGPA() {
    const data = await fetchAllData();
    return data.cgpa;
}

/**
 * Get study materials
 */
export async function getStudyMaterials() {
    const data = await fetchAllData();
    return data.studyMaterials;
}

/**
 * Get material subjects
 */
export async function getMaterialSubjects() {
    const data = await fetchAllData();
    return data.materialSubjects;
}

/**
 * Get transport schedule
 */
export async function getTransportSchedule() {
    const data = await fetchAllData();
    return data.transportSchedule;
}

/**
 * Get transport route
 */
export async function getTransportRoute() {
    const data = await fetchAllData();
    return data.transportRoute;
}

/**
 * Get transport notices
 */
export async function getTransportNotices() {
    const data = await fetchAllData();
    return data.transportNotices;
}

/**
 * Get transport details
 */
export async function getTransportDetails() {
    const data = await fetchAllData();
    return data.transportDetails;
}

// Export default
export default {
    fetchAllData,
    getStudent,
    getLoginCredentials,
    validateLogin,
    getAttendance,
    getAttendanceDates,
    getCourses,
    getUpcomingAssignments,
    getRecentResults,
    getQuickLinks,
    getDashboardStats,
    getTodaySchedule,
    getFeeHistory,
    getDueItems,
    getFeeBreakdown,
    getBorrowedBooks,
    getAvailableBooks,
    getNotifications,
    getSemResults,
    getCGPA,
    getStudyMaterials,
    getMaterialSubjects,
    getTransportSchedule,
    getTransportRoute,
    getTransportNotices,
    getTransportDetails
};

gi