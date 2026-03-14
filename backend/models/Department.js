const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    uppercase: true
  },
  hod: {
    type: String,
    required: true
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  totalClasses: {
    type: Number,
    default: 0
  },
  semesters: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('DepartmentFaculty', departmentSchema);

