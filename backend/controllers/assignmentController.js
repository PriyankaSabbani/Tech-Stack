const Assignment = require('../models/Assignment');

// Get all assignments (limit 50)
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().limit(50).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

