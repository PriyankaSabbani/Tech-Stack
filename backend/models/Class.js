const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    default: 0
  },
  classTeacher: String,
  room: String,
  department: String
}, {
  timestamps: true
});

module.exports = mongoose.model('ClassFaculty', classSchema);

