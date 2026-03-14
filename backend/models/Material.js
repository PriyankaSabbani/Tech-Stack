const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['PDF', 'PPT', 'Link', 'Notes', 'Video', 'Image'],
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    default: 'Faculty'
  },
  filePath: {
    type: String // /uploads/filename.ext for files
  },
  originalName: String,
  mimeType: String,
  size: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('MaterialFaculty', materialSchema);
