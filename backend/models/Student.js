const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roll: {
    type: String,
    required: true,
    unique: true
  },
  department: String,
  branch: String,
  semester: String,
  section: String,
  attendance: String
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentFaculty', studentSchema);

