const Class = require('../models/Class');
const Student = require('../models/Student');

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().limit(50).sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get students for specific class
exports.getClassStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const classItem = await Class.findById(id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const students = await Student.find({
      semester: classItem.semester,
      section: classItem.section,
      $or: [
        { branch: classItem.department },
        { department: { $regex: classItem.department, $options: 'i' } }
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

// Create class
exports.createClass = async (req, res) => {
  try {
    const classItem = new Class(req.body);
    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

