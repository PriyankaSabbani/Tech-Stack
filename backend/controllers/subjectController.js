const Subject = require('../models/Subject');
const Student = require('../models/Student');

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().limit(50).sort({ createdAt: -1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get students for specific subject
exports.getSubjectStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const subjectItem = await Subject.findById(id);
    if (!subjectItem) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    const students = await Student.find({
      semester: subjectItem.semester,
      $or: [
        { branch: subjectItem.department },
        { department: { $regex: subjectItem.department, $options: 'i' } }
      ]
    }).sort({ roll: 1 });

    res.json({
      students,
      count: students.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create subject
exports.createSubject = async (req, res) => {
  try {
    const subjectItem = new Subject(req.body);
    await subjectItem.save();
    res.status(201).json(subjectItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

