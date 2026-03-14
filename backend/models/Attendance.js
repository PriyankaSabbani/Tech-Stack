const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  id: Number,
  roll: String,
  name: String,
  status: String
});

const attendanceSchema = new mongoose.Schema({
  className: String,
  subject: String,
  date: String,
  students: [studentAttendanceSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('AttendanceFaculty', attendanceSchema);

