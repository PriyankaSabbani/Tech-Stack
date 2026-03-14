const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  fullText: String,
  date: String
}, {
  timestamps: true
});

module.exports = mongoose.model('AnnouncementFaculty', announcementSchema);

