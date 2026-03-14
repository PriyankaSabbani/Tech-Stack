const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  department: String,
  employeeId: String,
  email: String,
  phone: String
}, {
  timestamps: true
});

module.exports = mongoose.model('ProfileFaculty', profileSchema);

