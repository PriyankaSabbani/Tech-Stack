const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  time: String,
  subject: String,
  className: String,
  room: String
}, {
  timestamps: true
});

module.exports = mongoose.model('TimetableFaculty', timetableSchema);

