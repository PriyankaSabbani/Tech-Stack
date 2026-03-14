const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  totalClasses: Number,
  subjects: Number,
  students: Number,
  todayClasses: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('StatsFaculty', statsSchema);

